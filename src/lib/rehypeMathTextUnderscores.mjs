/**
 * KaTeX rejects bare underscores inside text-mode macro arguments
 * (e.g. `\texttt{SHORE_DEPTH_BAND}` fails with "Expected 'EOF', got '_'"),
 * while the LaTeX toolchain used for the entries' PDFs tolerates them.
 * This plugin escapes those underscores before rehype-katex runs, so
 * code identifiers render instead of a red parse error.
 *
 * Must be registered before rehype-katex; it targets the same elements
 * (classes `language-math`, `math-inline`, `math-display`).
 */

const TEXT_MACRO = /\\(?:texttt|textrm|textsf|textbf|textit|textnormal|text|mbox)(?=\{)/g;

const MATH_CLASSES = ['language-math', 'math-inline', 'math-display'];

function escapeUnderscores(value) {
    const re = new RegExp(TEXT_MACRO.source, 'g');
    let result = '';
    let from = 0;
    let match;

    while ((match = re.exec(value))) {
        const open = match.index + match[0].length;

        // Find the macro argument's balanced closing brace,
        // skipping backslash-escaped characters.
        let depth = 0;
        let end = open;
        for (; end < value.length; end++) {
            const ch = value[end];
            if (ch === '\\') {
                end++;
            } else if (ch === '{') {
                depth++;
            } else if (ch === '}') {
                depth--;
                if (depth === 0) break;
            }
        }
        if (depth !== 0) break;

        const group = value.slice(open, end + 1);
        // Leave groups with nested inline math alone; `_` is valid there.
        const fixed = group.includes('$')
            ? group
            : group.replace(/\\[\s\S]|_/g, (s) => (s === '_' ? '\\_' : s));

        result += value.slice(from, open) + fixed;
        from = end + 1;
        re.lastIndex = from;
    }

    return result + value.slice(from);
}

function walk(node) {
    if (node.type === 'element') {
        const classes = Array.isArray(node.properties?.className)
            ? node.properties.className
            : [];
        if (MATH_CLASSES.some((c) => classes.includes(c))) {
            for (const child of node.children) {
                if (child.type === 'text') {
                    child.value = escapeUnderscores(child.value);
                }
            }
            return;
        }
    }
    if (node.children) {
        for (const child of node.children) walk(child);
    }
}

export default function rehypeMathTextUnderscores() {
    return (tree) => walk(tree);
}
