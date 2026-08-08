import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * When an entry was last touched, taken from git history so no dates need
 * to be kept in frontmatter. Requires full history at build time
 * (the deploy workflow checks out with fetch-depth: 0).
 * Falls back to filesystem mtime for files not yet committed.
 */
function lastUpdated(filePath: string | undefined): Date {
    if (!filePath) return new Date(0);
    try {
        const out = execFileSync(
            'git',
            ['log', '-1', '--format=%ct', '--', filePath],
            { encoding: 'utf8' },
        ).trim();
        if (out) return new Date(Number(out) * 1000);
    } catch {
        // not a git checkout — fall through to mtime
    }
    try {
        return statSync(filePath).mtime;
    } catch {
        return new Date(0);
    }
}

export type Entry = CollectionEntry<'entries'> & { updated: Date };

/** All published entries, most recently updated first. */
export async function sortedEntries(): Promise<Entry[]> {
    const entries = await getCollection('entries', ({ data }) => !data.draft);
    return entries
        .map((entry) => ({ ...entry, updated: lastUpdated(entry.filePath) }))
        .sort((a, b) => b.updated.getTime() - a.updated.getTime());
}

/** Every tag in use, with the number of entries carrying it. */
export function tagCounts(entries: Entry[]): Map<string, number> {
    const counts = new Map<string, number>();
    for (const entry of entries) {
        for (const tag of entry.data.tags) {
            counts.set(tag, (counts.get(tag) ?? 0) + 1);
        }
    }
    return new Map([...counts.entries()].sort(([a], [b]) => a.localeCompare(b)));
}
