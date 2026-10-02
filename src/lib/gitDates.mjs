import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';

/*
 * Entry dates taken from git history, so no dates need to be kept in
 * frontmatter. Plain Node (no Astro imports) so both the content helpers
 * and the build config (sitemap lastmod) can use it. Requires full
 * history at build time (the deploy workflow checks out with
 * fetch-depth: 0).
 */

/**
 * When a file was last touched: the time of the last commit that
 * changed it. Falls back to filesystem mtime for files not yet
 * committed.
 */
export function lastUpdated(filePath) {
    if (!filePath) return new Date(0);
    try {
        const out = execFileSync('git', ['log', '-1', '--format=%ct', '--', filePath], {
            encoding: 'utf8',
        }).trim();
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
 * When a file was first created, taken from the commit that added it.
 * A file in a git checkout with no such commit is an entry still being
 * drafted, so it counts as created now: the draft in progress is by
 * definition the newest. Outside git, filesystem birth time (then
 * mtime) stands in.
 */
export function createdAt(filePath) {
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
