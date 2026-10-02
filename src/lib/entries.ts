import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { getCollection, type CollectionEntry } from 'astro:content';
import { formatDate, formatSpan, parseSpan, pointIndex, spanBounds } from './dates';

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
 * the file. A file in a git checkout with no such commit is an entry
 * still being drafted, so it counts as created now: the draft in
 * progress is by definition the newest. Outside git, filesystem birth
 * time (then mtime) stands in.
 */
function createdAt(filePath: string | undefined): Date {
    if (!filePath) return new Date(0);
    try {
        const out = execFileSync(
            'git',
            ['log', '--follow', '--diff-filter=A', '-1', '--format=%ct', '--', filePath],
            { encoding: 'utf8' },
        ).trim();
        return out ? new Date(Number(out) * 1000) : new Date();
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

const monthOf = (date: Date) => date.getFullYear() * 12 + date.getMonth();

/**
 * The month indices (year * 12 + month) an entry's project covers,
 * from the `project` frontmatter. Without one, the `written` date
 * stands in, and failing that the git creation month. A single date
 * covers just its own month; "present" runs to the current month.
 */
export function projectBounds(entry: Entry): { start: number; end: number } {
    const span = parseSpan(entry.data.project) ?? parseSpan(entry.data.written);
    if (span) return spanBounds(span);
    const created = monthOf(entry.created);
    return { start: created, end: created };
}

/**
 * Month index an entry's project sorts under: when it started. A
 * project begun later ranks as more recent, however long it runs.
 */
export function projectSortKey(entry: Entry): number {
    return projectBounds(entry).start;
}

/**
 * Month index an entry's writing sorts under: the `written` frontmatter,
 * falling back to the git creation month.
 */
export function writtenSortKey(entry: Entry): number {
    const span = parseSpan(entry.data.written);
    return span ? pointIndex(span.start) : monthOf(entry.created);
}

/**
 * All published entries, latest project first. Ties break by when the
 * entry was written: latest `written` date first, then git creation time.
 */
export async function sortedEntries(): Promise<Entry[]> {
    const entries = await getCollection('entries', ({ data }) => !data.draft);
    return entries
        .map((entry) => ({
            ...entry,
            created: createdAt(entry.filePath),
            updated: lastUpdated(entry.filePath),
        }))
        .sort(
            (a, b) =>
                projectSortKey(b) - projectSortKey(a) ||
                writtenSortKey(b) - writtenSortKey(a) ||
                b.created.getTime() - a.created.getTime(),
        );
}

/**
 * The most recently written entry, judged by the `written` date (git
 * creation month as fallback). Entries written the same month tie-break
 * on when they were added to the journal (git creation time), then on
 * the newest project — never on the last edit, which would let a typo
 * fix displace the actual latest entry.
 */
export function latestWritten(entries: Entry[]): Entry | undefined {
    return [...entries].sort(
        (a, b) =>
            writtenSortKey(b) - writtenSortKey(a) ||
            b.created.getTime() - a.created.getTime() ||
            projectSortKey(b) - projectSortKey(a),
    )[0];
}

/**
 * The status to display for an entry: only "ongoing" is shown
 * (capitalized); any other status stays internal metadata.
 */
export function visibleStatus(entry: Entry): string | undefined {
    return entry.data.status === 'ongoing' ? 'Ongoing' : undefined;
}

/**
 * The project dates for display: "Developed March – August 2026", or
 * "Started October 2026" for a project still running — the status
 * says it's ongoing, so a "– Present" would only repeat that.
 */
function projectLabel(entry: Entry): string | undefined {
    const span = parseSpan(entry.data.project);
    if (!span) return undefined;
    return span.end === 'present'
        ? `Started ${formatSpan({ start: span.start })}`
        : `Developed ${formatSpan(span)}`;
}

/**
 * The metadata line under an entry's description — "Developed
 * March – August 2026 · Written September 2026 · Ongoing" — with the
 * frontmatter dates rendered in display form. Undefined when the entry
 * has nothing to show.
 */
export function metaLine(entry: Entry): string | undefined {
    const written = formatDate(entry.data.written);
    const parts = [
        projectLabel(entry),
        written && `Written ${written}`,
        visibleStatus(entry),
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(' · ') : undefined;
}

/**
 * Estimated reading time in whole minutes, computed from the entry's
 * markdown body at ~150 words per minute (dense, technical prose).
 * Code blocks, math, tables, links, and markup are reduced to their
 * readable text before counting.
 */
export function readingTime(entry: Entry): number {
    const text = (entry.body ?? '')
        // fenced code blocks read as skimmed, not word-for-word
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`[^`\n]*`/g, ' ')
        // math blocks read as skimmed too, and LaTeX tokens aren't words
        .replace(/\$\$[\s\S]*?\$\$/g, ' ')
        .replace(/\$[^$\n]+\$/g, ' ')
        // tables are scanned, not read line by line
        .replace(/^[ \t]*\|.*$/gm, ' ')
        // keep link and image alt text, drop the URLs
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/<[^>]+>/g, ' ')
        // callout tags and structural markers (#, >, -, ---) aren't words
        .replace(/\[!\w+\]/g, ' ')
        .replace(/^[ \t]*(?:#{1,6}|>|[-*+]|(?:[-*_]\s*){3,})(?=\s|$)/gm, ' ');
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 150));
    // minutes ending in 1 or 9 read as false precision; snap to the ten
    const rem = minutes % 10;
    if (rem === 1 || rem === 9) {
        return Math.max(1, Math.round(minutes / 10) * 10);
    }
    return minutes;
}

/**
 * Reading time formatted for display: plain minutes under an hour
 * ("45 min"), hours with the minute remainder above ("3h 30 min", "2h").
 */
export function readingTimeLabel(entry: Entry): string {
    const minutes = readingTime(entry);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest ? `${hours}h ${rest} min` : `${hours}h`;
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
