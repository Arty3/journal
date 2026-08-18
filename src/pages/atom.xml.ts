import type { APIContext } from 'astro';
import { sortedEntries } from '../lib/entries';

/**
 * Atom twin of rss.xml — same entries, same polling model. Atom
 * additionally carries per-entry <updated> timestamps (from git), so
 * readers can surface revisions, not just publications.
 */

const escapeXml = (text: string) =>
    text.replace(
        /[<>&'"]/g,
        (char) =>
            ({
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                "'": '&apos;',
                '"': '&quot;',
            })[char]!,
    );

export async function GET(context: APIContext) {
    const site = context.site!;
    const entries = [...(await sortedEntries())].sort(
        (a, b) => b.created.getTime() - a.created.getTime(),
    );
    const feedUpdated = entries.reduce(
        (max, entry) => (entry.updated > max ? entry.updated : max),
        new Date(0),
    );

    const items = entries.map((entry) => {
        const url = new URL(`entries/${entry.id}/`, site).href;
        const categories = entry.data.tags
            .map((tag) => `        <category term="${escapeXml(tag)}"/>`)
            .join('\n');
        /* readers render this as the entry body — without it, the
         * one-line summary is all they show */
        const content =
            `<p>${escapeXml(entry.data.description)}</p>` +
            `<p><a href="${url}">Read the full entry &#8594;</a></p>`;
        return [
            '    <entry>',
            `        <title>${escapeXml(entry.data.title)}</title>`,
            `        <id>${url}</id>`,
            `        <link href="${url}"/>`,
            `        <published>${entry.created.toISOString()}</published>`,
            `        <updated>${entry.updated.toISOString()}</updated>`,
            `        <summary>${escapeXml(entry.data.description)}</summary>`,
            `        <content type="html">${escapeXml(content)}</content>`,
            ...(categories ? [categories] : []),
            '    </entry>',
        ].join('\n');
    });

    const xml = [
        '<?xml version="1.0" encoding="utf-8"?>',
        '<feed xmlns="http://www.w3.org/2005/Atom">',
        "    <title>Luca's Journal</title>",
        '    <subtitle>A public journal of projects, experiments, research, technical adventures, failed ideas, and the thoughts behind them.</subtitle>',
        `    <id>${site.href}</id>`,
        `    <link href="${site.href}"/>`,
        `    <link rel="self" href="${new URL('atom.xml', site).href}"/>`,
        `    <updated>${feedUpdated.toISOString()}</updated>`,
        '    <author><name>Luca Goddijn</name></author>',
        ...items,
        '</feed>',
        '',
    ].join('\n');

    return new Response(xml, {
        headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
    });
}
