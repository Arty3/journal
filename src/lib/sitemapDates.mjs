import { readdirSync, readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import { slug } from 'github-slugger';
import { lastUpdated } from './gitDates.mjs';

/*
 * <lastmod> dates for the sitemap, so crawlers can tell which pages
 * changed since their last visit. The sitemap integration runs after
 * the build, outside the content layer, so this reads the entries
 * straight from disk: the same files, the same git-derived update time
 * as the pages and feeds use (see entries.ts), and the same id scheme
 * as Astro's glob loader (file stem, github-slugged).
 */

const ENTRIES_DIR = 'src/content/entries';

/** Published entries: id, tags, and when their file was last committed. */
function readEntries() {
    return readdirSync(ENTRIES_DIR)
        .filter((name) => /\.mdx?$/.test(name))
        .map((name) => {
            const filePath = `${ENTRIES_DIR}/${name}`;
            const text = readFileSync(filePath, 'utf8');
            const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
            const data = (frontmatter && yaml.load(frontmatter[1])) || {};
            return {
                id: slug(name.replace(/\.mdx?$/, '')),
                tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
                draft: data.draft === true,
                updated: lastUpdated(filePath),
            };
        })
        .filter((entry) => !entry.draft);
}

/** The latest update among some entries, or undefined when there are none. */
function newest(entries) {
    return entries.reduce(
        (max, entry) => (!max || entry.updated > max ? entry.updated : max),
        undefined,
    );
}

/**
 * When the page at a site path last changed, judged by its content:
 * an entry page by its entry; a tag page by the newest entry carrying
 * the tag; the home and entries pages, which list every entry, by the
 * newest entry overall. Pages that don't derive from entries report
 * nothing rather than a guess.
 */
function lastmodFor(path, entries) {
    const entry = /^\/entries\/([^/]+)\/$/.exec(path);
    if (entry) return entries.find((e) => e.id === entry[1])?.updated;
    const tag = /^\/tags\/([^/]+)\/$/.exec(path);
    if (tag) return newest(entries.filter((e) => e.tags.includes(tag[1])));
    if (path === '/' || path === '/entries/') return newest(entries);
    return undefined;
}

/**
 * A `serialize` callback for @astrojs/sitemap that stamps each URL
 * with its lastmod. Entries are read once, on the first URL.
 */
export function withLastmod() {
    let entries;
    return (item) => {
        entries ??= readEntries();
        const path = decodeURIComponent(new URL(item.url).pathname);
        const updated = lastmodFor(path, entries);
        return updated ? { ...item, lastmod: updated.toISOString() } : item;
    };
}
