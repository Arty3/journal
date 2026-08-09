import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

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
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
    },
});
