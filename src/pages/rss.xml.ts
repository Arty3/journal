import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { sortedEntries } from '../lib/entries';

/**
 * The feed readers subscribe to. Regenerated on every build, so
 * publishing an entry is all it takes — subscribers' readers pick the
 * new item up on their next poll.
 */

const escapeHtml = (text: string) =>
    text.replace(
        /[<>&]/g,
        (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[char]!,
    );

export async function GET(context: APIContext) {
    const entries = await sortedEntries();
    const newestFirst = [...entries].sort(
        (a, b) => b.created.getTime() - a.created.getTime(),
    );
    return rss({
        title: "Luca's Journal",
        description:
            'A public journal of projects, experiments, research, technical ' +
            'adventures, failed ideas, and the thoughts behind them.',
        site: context.site!,
        items: newestFirst.map((entry) => {
            const url = new URL(`entries/${entry.id}/`, context.site!).href;
            return {
                title: entry.data.title,
                description: entry.data.description,
                link: url,
                /* readers render this as the entry body — without it,
                 * the one-line description is all they show */
                content:
                    `<p>${escapeHtml(entry.data.description)}</p>` +
                    `<p><a href="${url}">Read the full entry &#8594;</a></p>`,
                /* exact publication time comes from git history, not the
                 * loose "Aug 2026" frontmatter */
                pubDate: entry.created,
                categories: entry.data.tags,
            };
        }),
    });
}
