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

const MONTHS = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
];

/**
 * Extracts a sortable month index from a loosely written date like
 * "Aug 2026", "2023-2024", or "2025-present" — the first year found,
 * refined by a month name when one directly precedes it. Returns null
 * when no year is present.
 */
function approxDate(text: string | undefined): number | null {
    if (!text) return null;
    const match = text.match(/(?:([A-Za-z]{3,9})\.?\s+)?(\d{4})/);
    if (!match) return null;
    const month = MONTHS.findIndex((m) =>
        match[1]?.toLowerCase().startsWith(m),
    );
    return Number(match[2]) * 12 + Math.max(month, 0);
}

/**
 * All published entries, oldest project first. Entries without a
 * project date fall back to their written date, then to the git
 * timestamp; ties break newest-updated first.
 */
export async function sortedEntries(): Promise<Entry[]> {
    const entries = await getCollection('entries', ({ data }) => !data.draft);
    const sortKey = (entry: Entry) =>
        approxDate(entry.data.project) ??
        approxDate(entry.data.written) ??
        (entry.updated.getFullYear() * 12 + entry.updated.getMonth());
    return entries
        .map((entry) => ({ ...entry, updated: lastUpdated(entry.filePath) }))
        .sort(
            (a, b) =>
                sortKey(a) - sortKey(b) ||
                b.updated.getTime() - a.updated.getTime(),
        );
}

/**
 * The most recently written entry, judged by the `written` date
 * (git timestamp as fallback), ties broken by last update.
 */
export function latestWritten(entries: Entry[]): Entry | undefined {
    const key = (entry: Entry) =>
        approxDate(entry.data.written) ??
        (entry.updated.getFullYear() * 12 + entry.updated.getMonth());
    return [...entries].sort(
        (a, b) => key(b) - key(a) || b.updated.getTime() - a.updated.getTime(),
    )[0];
}

/**
 * The status to display for an entry: only "Ongoing" is shown;
 * any other status stays internal metadata.
 */
export function visibleStatus(entry: Entry): string | undefined {
    const status = entry.data.status;
    return status?.toLowerCase() === 'ongoing' ? status : undefined;
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
