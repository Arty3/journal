import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { getCollection } from 'astro:content';

/**
 * Build-time semantic tag colors.
 *
 * Every tag is embedded with a small sentence-transformer, the tags
 * are ordered by seriation — the shortest open path through them by
 * cosine distance, so each tag sits next to its closest relatives —
 * and the order is laid across the hue spectrum. Related tags
 * ("python", "machine learning") end up with neighboring hues;
 * unrelated ones sit far apart. Hue gaps blend semantic distance with
 * even spacing, so a small tag set spreads out with high contrast and
 * a growing one fills the spectrum in.
 *
 * Embeddings are cached in src/data/tag-embeddings.json (meant to be
 * committed) so the model only loads when a new tag appears.
 */

const CACHE_PATH = 'src/data/tag-embeddings.json';
const EMBEDDING_DIMS = 384;

/*
 * Embedding bare words is noisy ("paper" drifts toward the material,
 * "python" toward the snake); a short context sharpens the topical
 * sense. Bump CACHE_VERSION whenever the template or the cache format
 * changes so cached embeddings are recomputed.
 */
const CACHE_VERSION = 4;

/*
 * The small model doesn't know the hardware jargon ("rtl", "asic",
 * "abi" all landed nearest each other at no better than chance) and
 * reads short ambiguous words the wrong way ("kernel" as kernel
 * methods, "unity" as the noun). A gloss spells out the intended
 * sense for those; every other tag goes through the template as is.
 * Only the embedding sees the gloss — the tag itself is unchanged.
 */
const GLOSSES: Record<string, string> = {
    abi: 'the ABI, the application binary interface and calling conventions of compiled C and C++ code',
    architectures: 'CPU architectures and instruction set architectures',
    asic: 'ASIC design, taking a digital chip from RTL through synthesis and physical implementation to tapeout',
    hardware: 'digital hardware design, chips, FPGAs and ASICs',
    kernel: 'the operating system kernel, Linux internals and system calls',
    python: 'the Python programming language',
    rtl: 'RTL, register-transfer level digital hardware design in Verilog and SystemVerilog',
    security: 'software security, exploits and memory safety',
    systemverilog: 'SystemVerilog, the hardware description language for RTL design and verification',
    tapeout: 'a chip tapeout, sending a finished ASIC design to the semiconductor foundry for fabrication',
    unity: 'the Unity game engine, rendering and shaders',
};

const contextualize = (tag: string) =>
    `a blog post on the topic of ${GLOSSES[tag] ?? tag}`;

/* the text that was embedded travels with the vector, so editing a
   gloss recomputes just that tag rather than needing a version bump */
type EmbeddingCache = Record<string, { text: string; vector: number[] }>;

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

async function embedTags(tags: string[]): Promise<Record<string, number[]>> {
    const cache = readCache();
    const missing = tags.filter((tag) => cache[tag]?.text !== contextualize(tag));
    if (missing.length > 0) {
        try {
            const { pipeline } = await import('@huggingface/transformers');
            const extractor = await pipeline(
                'feature-extraction',
                'Xenova/all-MiniLM-L6-v2',
                { dtype: 'q8' },
            );
            for (const tag of missing) {
                const text = contextualize(tag);
                const output = await extractor(text, {
                    pooling: 'mean',
                    normalize: true,
                });
                cache[tag] = {
                    text,
                    vector: [...(output.data as Float32Array)].map(
                        (x) => Math.round(x * 1e5) / 1e5,
                    ),
                };
            }
            writeCache(cache);
        } catch (error) {
            console.warn(
                `[tag-colors] embedding failed for ${missing.length} tag(s), ` +
                    'using hashed fallback hues:',
                error,
            );
            for (const tag of missing) {
                cache[tag] = { text: contextualize(tag), vector: hashedEmbedding(tag) };
            }
        }
    }
    return Object.fromEntries(tags.map((tag) => [tag, cache[tag].vector]));
}

function normalize(vector: number[]): number[] {
    const norm = Math.sqrt(vector.reduce((sum, x) => sum + x * x, 0)) || 1;
    return vector.map((x) => x / norm);
}

/**
 * Seriation as a shortest open path: the order minimizing the summed
 * cosine distance between neighbors, which is exactly what the hue
 * layout rewards — only adjacent tags share a region of the spectrum.
 * Nearest-neighbor tours from every start, each polished with 2-opt
 * (segment reversal) and or-opt (single relocation); the shortest
 * wins. Deterministic, and tag counts are tiny, so cost is irrelevant.
 *
 * A Fiedler-vector (spectral) layout was used before this. With every
 * tag embedded through the same context template, all pairs are
 * moderately similar, the similarity graph is nearly complete, and the
 * spectral order interleaved unrelated clusters ("rendering" between
 * "memory allocation" and "architectures"); the path objective keeps
 * them contiguous.
 */
function pathOrder(vectors: number[][]): {
    order: number[];
    distance: (a: number, b: number) => number;
} {
    const unit = vectors.map(normalize);
    const n = unit.length;
    const distance = (a: number, b: number) =>
        1 - unit[a].reduce((sum, x, j) => sum + x * unit[b][j], 0);
    const length = (path: number[]) =>
        path.slice(0, -1).reduce((sum, _, i) => sum + distance(path[i], path[i + 1]), 0);

    let best: number[] | null = null;
    for (let start = 0; start < n; start++) {
        const left = new Set(unit.map((_, i) => i));
        left.delete(start);
        const path = [start];
        while (left.size > 0) {
            const last = path[path.length - 1];
            let next = -1;
            for (const candidate of left) {
                if (next < 0 || distance(last, candidate) < distance(last, next)) {
                    next = candidate;
                }
            }
            left.delete(next);
            path.push(next);
        }

        let improved = true;
        while (improved) {
            improved = false;
            /* 2-opt: reverse a segment */
            for (let i = 0; i < n - 1; i++) {
                for (let k = i + 1; k < n; k++) {
                    const candidate = [
                        ...path.slice(0, i),
                        ...path.slice(i, k + 1).reverse(),
                        ...path.slice(k + 1),
                    ];
                    if (length(candidate) < length(path) - 1e-12) {
                        path.splice(0, n, ...candidate);
                        improved = true;
                    }
                }
            }
            /* or-opt: relocate a single tag */
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (i === j) continue;
                    const candidate = [...path];
                    const [moved] = candidate.splice(i, 1);
                    candidate.splice(j, 0, moved);
                    if (length(candidate) < length(path) - 1e-12) {
                        path.splice(0, n, ...candidate);
                        improved = true;
                    }
                }
            }
        }

        if (best === null || length(path) < length(best)) best = [...path];
    }
    return { order: best!, distance };
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

    const { order, distance } = pathOrder(tags.map((tag) => embeddings[tag]));
    const n = order.length;

    /*
     * A path reads the same both ways — orient deterministically, with
     * the alphabetically earlier endpoint last (so the spectrum runs
     * from the technical cluster down to the lighthearted tags).
     */
    if (tags[order[n - 1]].localeCompare(tags[order[0]]) > 0) order.reverse();

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
