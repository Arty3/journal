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
---
```

Entries carry no dates. The list at `/entries/` is sorted by the last git
commit that touched each file, so revisiting an entry moves it back to the
top. (The deploy workflow checks out full history for this; locally,
uncommitted files fall back to filesystem mtime.)

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
