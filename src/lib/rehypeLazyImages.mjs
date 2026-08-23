/**
 * Entry bodies embed screenshots as plain markdown/HTML images, which
 * browsers fetch eagerly by default — a long entry pulls every image up
 * front. This marks them lazy (and async-decoded) so images load as the
 * reader approaches them. Explicit loading/decoding attributes written
 * in an entry are left untouched.
 */

function walk(node) {
    if (node.type === 'element' && node.tagName === 'img') {
        node.properties ??= {};
        node.properties.loading ??= 'lazy';
        node.properties.decoding ??= 'async';
    }
    if (node.children) {
        for (const child of node.children) walk(child);
    }
}

export default function rehypeLazyImages() {
    return (tree) => walk(tree);
}
