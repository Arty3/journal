import { getCollection, type CollectionEntry } from 'astro:content';
import { formatSpan, parseSpan, spanBounds } from './dates';
/* git-derived created/updated times live in a plain Node module so the
   build config can share them (sitemap lastmod) */
import { createdAt, lastUpdated } from './gitDates.mjs';

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
 * Whether the project is still running: its `status` says so, or,
 * without a status, its `project` range ends in "present". Among
 * projects sorting under the same month, an ongoing one ranks as the
 * more recent.
 */
export function projectOngoing(entry: Entry): boolean {
    if (entry.data.status) return entry.data.status === 'ongoing';
    return parseSpan(entry.data.project)?.end === 'present';
}

/**
 * The month indices an entry's writing covers, from the `written`
 * frontmatter, falling back to the git creation month. A single date
 * covers just its own month; "present" runs to the current month.
 */
export function writtenBounds(entry: Entry): { start: number; end: number } {
    const span = parseSpan(entry.data.written);
    if (span) return spanBounds(span);
    const created = monthOf(entry.created);
    return { start: created, end: created };
}

/**
 * Month index an entry's writing sorts under: when it was last being
 * written. Unlike a project, an entry written over a range ranks by
 * the range's end, so one still in progress counts as the most recent.
 */
export function writtenSortKey(entry: Entry): number {
    return writtenBounds(entry).end;
}

/**
 * Whether the entry is still being written (a `written` range ending
 * in "present"). Among entries sorting under the same month, one in
 * progress ranks as the more recent.
 */
export function writingInProgress(entry: Entry): boolean {
    return parseSpan(entry.data.written)?.end === 'present';
}

/** Project order, latest first; ongoing wins within the same month. */
const byProject = (a: Entry, b: Entry) =>
    projectSortKey(b) - projectSortKey(a) ||
    Number(projectOngoing(b)) - Number(projectOngoing(a));

/** Writing order, latest first; in progress wins within the same month. */
const byWritten = (a: Entry, b: Entry) =>
    writtenSortKey(b) - writtenSortKey(a) ||
    Number(writingInProgress(b)) - Number(writingInProgress(a));

/**
 * All published entries, latest project first; among projects of the
 * same month, ongoing ones come before finished ones. Remaining ties
 * break by when the entry was written: latest `written` date first
 * (still being written before already written), then git creation time.
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
                byProject(a, b) ||
                byWritten(a, b) ||
                b.created.getTime() - a.created.getTime(),
        );
}

/**
 * The most recently written entry, judged by the `written` date (git
 * creation month as fallback). Among entries written the same month,
 * one still being written comes first. Several still being written
 * tie-break on the newest project: when each file was added says
 * nothing about which is being worked on now. The rest tie-break on
 * when they were added to the journal (git creation time), then on the
 * newest project — never on the last edit, which would let a typo fix
 * displace the actual latest entry.
 */
export function latestWritten(entries: Entry[]): Entry | undefined {
    return [...entries].sort(
        (a, b) =>
            byWritten(a, b) ||
            (writingInProgress(a) && writingInProgress(b) ? byProject(a, b) : 0) ||
            b.created.getTime() - a.created.getTime() ||
            byProject(a, b),
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
 * The writing dates for display: "Written September 2026", or
 * "Started writing in September 2026" for an entry still being
 * written (a range ending in "present").
 */
export function writtenLabel(entry: Entry): string | undefined {
    const span = parseSpan(entry.data.written);
    if (!span) return undefined;
    return span.end === 'present'
        ? `Started writing in ${formatSpan({ start: span.start })}`
        : `Written ${formatSpan(span)}`;
}

/**
 * The metadata line under an entry's description — "Developed
 * March – August 2026 · Written September 2026 · Ongoing" — with the
 * frontmatter dates rendered in display form. Undefined when the entry
 * has nothing to show.
 */
export function metaLine(entry: Entry): string | undefined {
    const parts = [
        projectLabel(entry),
        writtenLabel(entry),
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
