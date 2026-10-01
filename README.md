# Journal

A public journal of projects, experiments, research, technical adventures, failed ideas, and the thoughts behind them.

Live at [journal.lucagoddijn.com](https://journal.lucagoddijn.com).

Built with [Astro](https://astro.build) + Markdown/MDX, deployed to GitHub Pages on every push to `main`.

## Writing

Entries live in `src/content/entries/`, one `.md` or `.mdx` file each. The
filename is the URL slug. Frontmatter:

```yaml
---
title: My entry
description: One or two sentences shown in the entry list.
# Optional, tags are not needed, but nice to have.
tags:
  - experiments
  - C++
# If true, hides the draft from public view.
draft: true
# Optional metadata, shown on the entry page and in the list.
written: august 2026           # when the entry was written
project: march - august 2026   # when the project took place
status: completed              # completed, abandoned, or ongoing
# Optional picture shown beside the entry in lists (site-absolute path).
# It is also the link preview when the entry is shared.
thumbnail: /assets/entries/my-entry/cover.png
# Optional: a different image for link previews only.
ogImage: /assets/entries/my-entry/share.png
---
```

Dates are written in lowercase with full month names, and the build
rejects anything else. A date is a year, optionally preceded by a month;
a hyphen between two dates makes a range, and the range may end in
`present`:

```yaml
project: 2024
project: march 2026
project: 2024 - 2025
project: march - august 2026
project: august 2024 - march 2025
project: october 2026 - present
```

On the page they render capitalized, with an en dash for ranges
("Developed March – August 2026"); a range ending in `present` shows
as "Started October 2026" alongside the status. `written` takes a single date, not a range.
`status` is lowercase too; only `ongoing` is shown on the page, the
others are kept as internal metadata.

The list at `/entries/` is sorted by project date, latest first. The sort
key is when the project *started*, so a project begun later ranks as more
recent however long it ran. The "Project" year filter matches every year
a range touches (a `2024 - 2025` project shows under both years, and
`present` runs to the build's current year). Entries without a `project`
fall back to their `written` date, and finally to the git commit that
added the file. (The deploy workflow checks out full history for this;
locally, uncommitted files fall back to filesystem times.)

The landing page copy lives directly in `src/pages/index.astro`.

## Developing

```sh
npm install

# local dev server at localhost:4321
npm run dev

# production build into dist/
npm run build
```

## Deploying

The journal deploys every time something is pushed into main. The workflow deploys via github pages.
Simply make sure that your repository deploys pages via actions.

For my own setup I have a CNAME record pointing the deployment to my domain.

## License

- **Code** (everything except the written content): [MIT](LICENSE)
- **Content** (`src/content/`, page prose, and authored media): [CC BY 4.0](LICENSE-CONTENT)
