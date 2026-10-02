import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkAlert } from 'remark-github-blockquote-alert';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeMathTextUnderscores from './src/lib/rehypeMathTextUnderscores.mjs';
import rehypeLazyImages from './src/lib/rehypeLazyImages.mjs';
import { withLastmod } from './src/lib/sitemapDates.mjs';

export default defineConfig({
    site: 'https://journal.lucagoddijn.com',
    integrations: [
        mdx(),
        // Per-page <lastmod> from git, so crawlers see which pages changed.
        sitemap({ serialize: withLastmod() }),
    ],
    markdown: {
        syntaxHighlight: {
            type: 'shiki',
            // Leave mermaid blocks unhighlighted so the raw diagram
            // source reaches the client for rendering.
            excludeLangs: ['mermaid'],
        },
        processor: unified({
            remarkPlugins: [remarkMath, remarkAlert],
            rehypePlugins: [
                rehypeLazyImages,
                rehypeSlug,
                [
                    rehypeAutolinkHeadings,
                    {
                        // A trailing '#' per heading, revealed on hover
                        // (styling in Base.astro), for linking sections
                        // of long entries.
                        behavior: 'append',
                        properties: {
                            className: ['heading-anchor'],
                            ariaLabel: 'Link to this section',
                        },
                        content: { type: 'text', value: '#' },
                    },
                ],
                rehypeMathTextUnderscores,
                [
                    rehypeKatex,
                    {
                        // Macros from the entries' LaTeX papers, so notation
                        // renders on the site the same way it does in the PDFs.
                        macros: {
                            // KaTeX (like LaTeX) spaces matrix rows for
                            // plain entries, so \frac rows touch at the
                            // default 1; 1.35 opens a thin gap without
                            // making plain matrices airy.
                            '\\arraystretch': '1.35',
                            '\\A': '\\mathcal{A}',
                            '\\E': '\\mathcal{E}',
                            '\\CaptureStr': '\\mathrm{Capture}_{\\mathrm{str}}',
                        },
                    },
                ],
            ],
        }),
    },
});
