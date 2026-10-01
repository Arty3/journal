import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { isSinglePoint, parseSpan } from './lib/dates';

/** The statuses an entry may carry, as written in frontmatter. */
export const STATUSES = ['completed', 'abandoned', 'ongoing'] as const;

/* a bare year parses as a YAML number, hence the coercion */
const dateSpan = (hint: string) =>
    z.coerce
        .string()
        .refine((text) => parseSpan(text) !== null, {
            message: `expected a lowercase date like ${hint}`,
        });

const entries = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/entries' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        /** When the entry itself was written: "august 2026" or "2026". */
        written: dateSpan('"august 2026"')
            .refine(isSinglePoint, { message: 'written is a single date, not a range' })
            .optional(),
        /**
         * When the project took place: "2024", "march 2026",
         * "2024 - 2025", "march - august 2026", "october 2026 - present".
         */
        project: dateSpan('"march - august 2026" or "2024 - present"').optional(),
        /** Project status, lowercase: "completed", "abandoned" or "ongoing". */
        status: z.enum(STATUSES).optional(),
        /**
         * Social-preview image for this entry, as a site-absolute path
         * (e.g. "/assets/entries/foo/cover.png"). Only needed when the
         * link preview should differ from the thumbnail: without it the
         * thumbnail is used, and without either the site-wide /og.png.
         */
        ogImage: z.string().optional(),
        /**
         * Picture shown beside the entry in lists and, unless ogImage
         * overrides it, in link previews when the entry is shared. A
         * site-absolute path (e.g. "/assets/entries/foo/cover.png").
         */
        thumbnail: z.string().optional(),
    }),
});

export const collections = { entries };
