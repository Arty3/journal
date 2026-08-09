import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const entries = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/entries' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        /** When the entry itself was written, e.g. "Aug 2026". */
        written: z.coerce.string().optional(),
        /** When the project took place, e.g. "2023-2024" or "2025-present". */
        project: z.coerce.string().optional(),
        /** Project status, e.g. "Abandoned", "Ongoing", "Completed". */
        status: z.string().optional(),
    }),
});

export const collections = { entries };
