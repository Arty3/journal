import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

/*
 * Thumbnails are full-size files (they double as share images and
 * open full screen from the list), far larger than the 15rem box they
 * sit in. Browsers downscale such images coarsely, so the list and the
 * home page's latest-entry card get list-sized copies rendered at
 * build time instead; the original is kept on the element for the
 * lightbox.
 */
const originals = import.meta.glob<{ default: ImageMetadata | string }>(
    '/public/assets/entries/**/*.{png,jpg,jpeg,webp,avif,gif}',
);

export interface Thumbnail {
    src: string;
    srcset: string | undefined;
}

/**
 * A list-sized rendition of the thumbnail at `path` (a site-absolute
 * path under /assets/entries/). Falls back to the original path when
 * the file isn't one the image pipeline can process.
 */
export async function listThumbnail(path: string): Promise<Thumbnail> {
    const load = originals[`/public${path}`];
    const source = load ? (await load()).default : undefined;
    if (!source || typeof source === 'string') return { src: path, srcset: undefined };
    const image = await getImage({
        src: source,
        width: 960,
        height: 600,
        fit: 'cover',
        widths: [480, 960],
        format: 'webp',
        quality: 85,
    });
    return { src: image.src, srcset: image.srcSet.attribute };
}
