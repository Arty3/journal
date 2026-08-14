import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { getCollection } from 'astro:content';

/**
 * Build-time semantic tag colors.
 *
 * Every tag is embedded with a small sentence-transformer, the tags
 * are ordered by spectral seriation — the Fiedler vector of the
 * normalized Laplacian of their similarity graph, a 1D layout that
 * weighs every pairwise similarity — and the order is laid across the
 * hue spectrum. Related tags ("python", "machine learning") end up
 * with neighboring hues; unrelated ones sit far apart. Hue gaps blend
 * semantic distance with even spacing, so a small tag set spreads out
 * with high contrast and a growing one fills the spectrum in.
 *
 * Embeddings are cached in src/data/tag-embeddings.json (meant to be
 * committed) so the model only loads when a new tag appears.
 */

const CACHE_PATH = 'src/data/tag-embeddings.json';
const EMBEDDING_DIMS = 384;

/*
 * Embedding bare words is noisy ("paper" drifts toward the material,
 * "python" toward the snake); a short context sharpens the topical
 * sense. Bump CACHE_VERSION whenever the template changes so cached
 * embeddings are recomputed.
 */
const CACHE_VERSION = 3;
const contextualize = (tag: string) => `a blog post on the topic of ${tag}`;

type EmbeddingCache = Record<string, number[]>;

function readCache(): EmbeddingCache {
    try {
        const stored = JSON.parse(readFileSync(CACHE_PATH, 'utf8'));
        return stored.version === CACHE_VERSION ? stored.vectors : {};
    } catch {
        return {};
    }
}

function writeCache(cache: EmbeddingCache): void {
    mkdirSync('src/data', { recursive: true });
    writeFileSync(
        CACHE_PATH,
        JSON.stringify({ version: CACHE_VERSION, vectors: cache }) + '\n',
        'utf8',
    );
}

/**
 * Deterministic pseudo-embedding used when the model can't run (e.g.
 * no network on a fresh cache). Not semantic — just keeps the build
 * working and the tag visually distinct.
 */
function hashedEmbedding(tag: string): number[] {
    let state = 2166136261;
    for (const char of tag) {
        state = Math.imul(state ^ char.codePointAt(0)!, 16777619);
    }
    const vector: number[] = [];
    for (let i = 0; i < EMBEDDING_DIMS; i++) {
        state = Math.imul(state ^ (state >>> 15), 2246822519) >>> 0;
        vector.push((state / 0xffffffff) * 2 - 1);
    }
    return vector;
}

async function embedTags(tags: string[]): Promise<EmbeddingCache> {
    const cache = readCache();
    const missing = tags.filter((tag) => !cache[tag]);
    if (missing.length > 0) {
        try {
            const { pipeline } = await import('@huggingface/transformers');
            const extractor = await pipeline(
                'feature-extraction',
                'Xenova/all-MiniLM-L6-v2',
                { dtype: 'q8' },
            );
            for (const tag of missing) {
                const output = await extractor(contextualize(tag), {
                    pooling: 'mean',
                    normalize: true,
                });
                cache[tag] = [...(output.data as Float32Array)].map(
                    (x) => Math.round(x * 1e5) / 1e5,
                );
            }
            writeCache(cache);
        } catch (error) {
            console.warn(
                `[tag-colors] embedding failed for ${missing.length} tag(s), ` +
                    'using hashed fallback hues:',
                error,
            );
            for (const tag of missing) {
                cache[tag] = hashedEmbedding(tag);
            }
        }
    }
    return cache;
}

function normalize(vector: number[]): number[] {
    const norm = Math.sqrt(vector.reduce((sum, x) => sum + x * x, 0)) || 1;
    return vector.map((x) => x / norm);
}

/**
 * Eigendecomposition of a small symmetric matrix (cyclic Jacobi).
 * Returns eigenpairs sorted by ascending eigenvalue. Robust and
 * deterministic — tag counts are tiny, so cost is irrelevant.
 */
function jacobiEigen(matrix: number[][]): { value: number; vector: number[] }[] {
    const n = matrix.length;
    const a = matrix.map((row) => [...row]);
    const vectors = Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
    );
    for (let sweep = 0; sweep < 100; sweep++) {
        let off = 0;
        for (let p = 0; p < n; p++) {
            for (let q = p + 1; q < n; q++) off += a[p][q] ** 2;
        }
        if (off < 1e-20) break;
        for (let p = 0; p < n; p++) {
            for (let q = p + 1; q < n; q++) {
                if (Math.abs(a[p][q]) < 1e-15) continue;
                const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
                const t =
                    Math.sign(theta || 1) /
                    (Math.abs(theta) + Math.sqrt(theta * theta + 1));
                const c = 1 / Math.sqrt(t * t + 1);
                const s = t * c;
                for (let k = 0; k < n; k++) {
                    const akp = a[k][p];
                    const akq = a[k][q];
                    a[k][p] = c * akp - s * akq;
                    a[k][q] = s * akp + c * akq;
                }
                for (let k = 0; k < n; k++) {
                    const apk = a[p][k];
                    const aqk = a[q][k];
                    a[p][k] = c * apk - s * aqk;
                    a[q][k] = s * apk + c * aqk;
                }
                for (let k = 0; k < n; k++) {
                    const vkp = vectors[k][p];
                    const vkq = vectors[k][q];
                    vectors[k][p] = c * vkp - s * vkq;
                    vectors[k][q] = s * vkp + c * vkq;
                }
            }
        }
    }
    return a
        .map((row, i) => ({ value: row[i], vector: vectors.map((r) => r[i]) }))
        .sort((x, y) => x.value - y.value);
}

/**
 * Spectral seriation: order the tags by the Fiedler vector of the
 * normalized Laplacian of their similarity graph. The normalization
 * keeps hub tags (similar to everything) from distorting the layout;
 * squaring the similarities emphasizes strong bonds.
 */
function spectralOrder(vectors: number[][]): {
    order: number[];
    distance: (a: number, b: number) => number;
} {
    const unit = vectors.map(normalize);
    const n = unit.length;
    const similarity = (a: number, b: number) =>
        unit[a].reduce((sum, x, j) => sum + x * unit[b][j], 0);
    const distance = (a: number, b: number) => 1 - similarity(a, b);

    const weights = unit.map((_, i) =>
        unit.map((_, j) => (i === j ? 0 : Math.max(0, similarity(i, j)) ** 2)),
    );
    const degree = weights.map((row) => row.reduce((sum, w) => sum + w, 0));
    const invRoot = degree.map((d) => (d > 0 ? 1 / Math.sqrt(d) : 0));
    const laplacian = weights.map((row, i) =>
        row.map((w, j) => (i === j ? 1 : -w * invRoot[i] * invRoot[j])),
    );

    const fiedler = jacobiEigen(laplacian)[1].vector;
    /* undo the degree scaling to recover the random-walk embedding */
    const coordinate = fiedler.map((x, i) => x * invRoot[i]);
    const order = unit.map((_, i) => i).sort((a, b) => coordinate[a] - coordinate[b]);
    return { order, distance };
}

let huesPromise: Promise<Map<string, number>> | null = null;

/** Hue (degrees) for every tag in use, memoized for the build. */
export function allTagHues(): Promise<Map<string, number>> {
    huesPromise ??= computeHues();
    return huesPromise;
}

async function computeHues(): Promise<Map<string, number>> {
    const entries = await getCollection('entries', ({ data }) => !data.draft);
    const tags = [...new Set(entries.flatMap((entry) => entry.data.tags))].sort();
    if (tags.length === 0) return new Map();

    const embeddings = await embedTags(tags);
    if (tags.length === 1) return new Map([[tags[0], 220]]);

    const { order, distance } = spectralOrder(tags.map((tag) => embeddings[tag]));
    const n = order.length;

    /* The eigenvector's sign is arbitrary — orient deterministically. */
    if (tags[order[n - 1]].localeCompare(tags[order[0]]) < 0) order.reverse();

    /*
     * The order is an open path laid over 0..300° (no wrap, so the two
     * ends never share a color). Hue gaps between neighbors: half
     * evenly spaced (every tag stays distinguishable), half
     * proportional to semantic distance (tight clusters sit visibly
     * closer than unrelated tags).
     */
    const steps = order
        .slice(0, -1)
        .map((_, pos) => distance(order[pos], order[pos + 1]));
    const total = steps.reduce((sum, step) => sum + step, 0);
    const weights = steps.map(
        (step) => 0.5 / (n - 1) + 0.5 * (total > 0 ? step / total : 1 / (n - 1)),
    );

    const hues = new Map<string, number>();
    let position = 0;
    for (let pos = 0; pos < n; pos++) {
        hues.set(tags[order[pos]], Math.round(position * 300));
        if (pos < n - 1) position += weights[pos];
    }
    return hues;
}
