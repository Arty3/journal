/**
 * The loose date format used in entry frontmatter, and how it is
 * parsed, ordered and displayed.
 *
 * Written in lowercase with full month names. A point in time is a
 * year, optionally preceded by a month:
 *
 *     2024
 *     march 2026
 *
 * A hyphen between two points makes a range. The start may share the
 * end's year, and the end may be "present" for ongoing work:
 *
 *     2024 - 2025
 *     march - august 2026
 *     august 2024 - march 2025
 *     october 2026 - present
 */

export const MONTHS = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
] as const;

/** A year, refined to a month (0-11) when one was given. */
export interface DatePoint {
    year: number;
    month?: number;
}

/** A single point, or a range that ends at a point or at "present". */
export interface DateSpan {
    start: DatePoint;
    end?: DatePoint | 'present';
}

/* a hyphen, or either dash, with any spacing around it */
const RANGE_SEPARATOR = /\s*[-–—]\s*/;

function parsePoint(text: string): DatePoint | null {
    const match = text.match(/^(?:([a-z]+)\s+)?(\d{4})$/);
    if (!match) return null;
    const year = Number(match[2]);
    if (!match[1]) return { year };
    const month = MONTHS.indexOf(match[1] as (typeof MONTHS)[number]);
    return month < 0 ? null : { year, month };
}

/** Month index (year * 12 + month) a point sorts under. */
export function pointIndex(point: DatePoint, fill: 'first' | 'last' = 'first'): number {
    return point.year * 12 + (point.month ?? (fill === 'first' ? 0 : 11));
}

/**
 * Parses a frontmatter date. Case and surrounding whitespace are
 * ignored. Returns null for anything outside the format, including
 * ranges that run backwards.
 */
export function parseSpan(text: string | undefined | null): DateSpan | null {
    if (text === undefined || text === null) return null;
    const normalized = String(text).trim().toLowerCase();
    const parts = normalized.split(RANGE_SEPARATOR);
    if (parts.length === 1) {
        const start = parsePoint(parts[0]);
        return start ? { start } : null;
    }
    if (parts.length !== 2) return null;
    const [from, to] = parts;

    if (to === 'present') {
        const start = parsePoint(from);
        return start ? { start, end: 'present' } : null;
    }

    const end = parsePoint(to);
    if (!end) return null;

    /* "march - august 2026": the start month borrows the end's year */
    let start = parsePoint(from);
    if (!start && end.month !== undefined) {
        const month = MONTHS.indexOf(from as (typeof MONTHS)[number]);
        if (month >= 0) start = { year: end.year, month };
    }
    if (!start) return null;

    /* a range is only a range when it moves forward in time */
    if (pointIndex(start) > pointIndex(end, 'last')) return null;
    return { start, end };
}

/** Whether a frontmatter date is a single point rather than a range. */
export function isSinglePoint(text: string): boolean {
    const span = parseSpan(text);
    return span !== null && span.end === undefined;
}

/**
 * The month indices a span covers: its start, and its end — the end
 * of the end point's year when no month was given, the current month
 * for "present", and the start itself for a single point.
 */
export function spanBounds(span: DateSpan, now = new Date()): { start: number; end: number } {
    const start = pointIndex(span.start);
    if (!span.end) return { start, end: start };
    if (span.end === 'present') {
        return { start, end: Math.max(start, now.getFullYear() * 12 + now.getMonth()) };
    }
    return { start, end: pointIndex(span.end, 'last') };
}

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

const formatPoint = (point: DatePoint) =>
    point.month === undefined
        ? String(point.year)
        : `${capitalize(MONTHS[point.month])} ${point.year}`;

/** Spaced en dash between the ends of a range. */
const RANGE_DASH = ' – ';

/**
 * A span for display: capitalized months, an en dash for ranges, and
 * the year written once when both ends of a range share it
 * ("March – August 2026", "2024 – 2025", "October 2026 – Present").
 */
export function formatSpan(span: DateSpan): string {
    const { start, end } = span;
    if (!end) return formatPoint(start);
    if (end === 'present') return `${formatPoint(start)}${RANGE_DASH}Present`;
    if (start.month !== undefined && end.month !== undefined && start.year === end.year) {
        return `${capitalize(MONTHS[start.month])}${RANGE_DASH}${capitalize(MONTHS[end.month])} ${start.year}`;
    }
    return `${formatPoint(start)}${RANGE_DASH}${formatPoint(end)}`;
}

/** Formats a frontmatter date as written, or null when it doesn't parse. */
export function formatDate(text: string | undefined): string | null {
    const span = parseSpan(text);
    return span ? formatSpan(span) : null;
}
