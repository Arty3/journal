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

/**
 * When an entry was first created, taken from the commit that added
 * the file. Falls back to filesystem birth time (then mtime) for
 * files not yet committed.
 */
function createdAt(filePath: string | undefined): Date {
    if (!filePath) return new Date(0);
    try {
        const out = execFileSync(
            'git',
            ['log', '--follow', '--diff-filter=A', '-1', '--format=%ct', '--', filePath],
            { encoding: 'utf8' },
        ).trim();
        if (out) return new Date(Number(out) * 1000);
    } catch {
        // not a git checkout — fall through to filesystem times
    }
    try {
        const stat = statSync(filePath);
        return stat.birthtime.getTime() > 0 ? stat.birthtime : stat.mtime;
    } catch {
        return new Date(0);
    }
}

export type Entry = CollectionEntry<'entries'> & {
    created: Date;
    updated: Date;
};

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
 * All published entries, latest project first. The project date comes
 * from the `project` frontmatter, falling back to the `written` date and
 * then the git creation month when absent. Ties break by when the entry
 * was written: latest `written` date first, then git creation time.
 */
export async function sortedEntries(): Promise<Entry[]> {
    const entries = await getCollection('entries', ({ data }) => !data.draft);
    const monthOf = (date: Date) => date.getFullYear() * 12 + date.getMonth();
    const projectKey = (entry: Entry) =>
        approxDate(entry.data.project) ??
        approxDate(entry.data.written) ??
        monthOf(entry.created);
    const writtenKey = (entry: Entry) =>
        approxDate(entry.data.written) ?? monthOf(entry.created);
    return entries
        .map((entry) => ({
            ...entry,
            created: createdAt(entry.filePath),
            updated: lastUpdated(entry.filePath),
        }))
        .sort(
            (a, b) =>
                projectKey(b) - projectKey(a) ||
                writtenKey(b) - writtenKey(a) ||
                b.created.getTime() - a.created.getTime(),
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

/**
 * Estimated reading time in whole minutes, computed from the entry's
 * markdown body at ~150 words per minute (dense, technical prose).
 * Code blocks, links, and markup are reduced to their readable text
 * before counting.
 */
export function readingTime(entry: Entry): number {
    const text = (entry.body ?? '')
        // fenced code blocks read as skimmed, not word-for-word
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`[^`\n]*`/g, ' ')
        // keep link and image alt text, drop the URLs
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/<[^>]+>/g, ' ');
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 150));
    // minutes ending in 1 or 9 read as false precision; snap to the ten
    const rem = minutes % 10;
    if (rem === 1 || rem === 9) {
        return Math.max(1, Math.round(minutes / 10) * 10);
    }
    return minutes;
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
