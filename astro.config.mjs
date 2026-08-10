import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkAlert } from 'remark-github-blockquote-alert';

export default defineConfig({
    site: 'https://journal.lucagoddijn.com',
    integrations: [mdx()],
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
                [
                    rehypeKatex,
                    {
                        // Macros from the entries' LaTeX papers, so notation
                        // renders on the site the same way it does in the PDFs.
                        macros: {
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
