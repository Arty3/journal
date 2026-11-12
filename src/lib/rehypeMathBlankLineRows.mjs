/**
 * In display math, a blank line between equations reads as "next row"
 * in the source, but TeX (and KaTeX) only start a new row at `\\`;
 * blank lines are plain whitespace, so a block written as
 *
 *     \begin{aligned}
 *     a = b
 *
 *     c = d
 *     \end{aligned}
 *
 * renders as one long horizontal line. This plugin turns each blank
 * line between two equations into a row break before rehype-katex runs.
 *
 * - Inside an environment the break is a plain `\\`.
 * - With no surrounding environment the block is wrapped in `gathered`,
 *   so the rows stack centred with the usual row spacing.
 * - `aligned` without a single `&` has nothing to align on and would
 *   push every row to the right edge; it is emitted as `gathered`.
 *
 * Blocks without blank lines are left untouched. Must be registered
 * before rehype-katex.
 */

/** Drop `% comments`, keeping escaped `\%` and line structure. */
function stripComments(value) {
    let result = '';
    for (let i = 0; i < value.length; i++) {
        const ch = value[i];
        if (ch === '\\') {
            result += ch + (value[i + 1] ?? '');
            i++;
        } else if (ch === '%') {
            while (i + 1 < value.length && value[i + 1] !== '\n') i++;
        } else {
            result += ch;
        }
    }
    return result;
}

/** Net change in `{}` nesting and `\begin`/`\end` nesting across `code`. */
function nesting(code) {
    let braces = 0;
    let envs = 0;
    for (let i = 0; i < code.length; i++) {
        const ch = code[i];
        if (ch === '\\') {
            if (code.startsWith('\\begin{', i)) envs++;
            else if (code.startsWith('\\end{', i)) envs--;
            i++;
        } else if (ch === '{') {
            braces++;
        } else if (ch === '}') {
            braces--;
        }
    }
    return { braces, envs };
}

// A row already ends here: an explicit `\\` (with optional `[1em]`),
// or the environment has only just opened (`\begin{array}{cc}`).
const ENDS_ROW = /(?:\\\\(?:\s*\[[^\]]*\])?|\\begin\{[^}]*\}(?:\s*\{[^}]*\})*)$/;
const STARTS_END = /^\\end\{/;

export function blankLinesToRows(value) {
    const paragraphs = value.trim().split(/\n[ \t]*(?:\n[ \t]*)+/);
    if (paragraphs.length < 2) return value;

    let result = '';
    let prev = null; // last paragraph holding actual TeX, comments stripped
    let braces = 0;
    let envs = 0;
    let changed = false;
    let topLevel = false;

    for (const [index, raw] of paragraphs.entries()) {
        const code = stripComments(raw).trim();
        let separator = index === 0 ? '' : '\n\n';

        if (code) {
            const isBreak =
                prev !== null &&
                braces === 0 &&
                !ENDS_ROW.test(prev) &&
                !STARTS_END.test(code);
            if (isBreak) {
                separator = '\n\\\\\n';
                changed = true;
                if (envs === 0) topLevel = true;
            }
            const delta = nesting(code);
            braces += delta.braces;
            envs += delta.envs;
            prev = code;
        }

        result += separator + raw;
    }

    if (!changed) return value;

    if (topLevel) {
        result = `\\begin{gathered}\n${result}\n\\end{gathered}`;
    }
    if (!/&/.test(stripComments(result).replace(/\\[\s\S]/g, ''))) {
        result = result.replace(/\\(begin|end)\{aligned\}/g, '\\$1{gathered}');
    }
    return result;
}

function isDisplayMath(node) {
    const classes = Array.isArray(node.properties?.className)
        ? node.properties.className
        : [];
    return (
        classes.includes('math-display') ||
        (classes.includes('language-math') && !classes.includes('math-inline'))
    );
}

function walk(node) {
    if (node.type === 'element' && isDisplayMath(node)) {
        for (const child of node.children) {
            if (child.type === 'text') {
                child.value = blankLinesToRows(child.value);
            }
        }
        return;
    }
    if (node.children) {
        for (const child of node.children) walk(child);
    }
}

export default function rehypeMathBlankLineRows() {
    return (tree) => walk(tree);
}
