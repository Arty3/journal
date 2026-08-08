# journal

My personal working journal — process and thoughts as I work through projects,
experiments, technical adventures, research, and failed ideas.

Live at [journal.lucagoddijn.com](https://journal.lucagoddijn.com).

Built with [Astro](https://astro.build) + Markdown/MDX, deployed to GitHub
Pages on every push to `main`.

## Writing

Entries live in `src/content/entries/`, one `.md` or `.mdx` file each. The
filename is the URL slug. Frontmatter:

```yaml
---
title: My entry
description: One or two sentences shown in the entry list.
tags: # optional
  - experiments
draft: true # optional — hides the entry from the built site
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
npm run dev      # local dev server at localhost:4321
npm run build    # production build into dist/
```

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes it to GitHub Pages. One-time repository setup:

1. In the repo settings under **Pages**, set the source to **GitHub Actions**.
2. DNS (not routed yet): add a `CNAME` record for `journal.lucagoddijn.com`
   pointing to `<github-username>.github.io`. The `public/CNAME` file already
   declares the custom domain to GitHub Pages.
3. Once DNS resolves, enable **Enforce HTTPS** in the Pages settings.

## License

- **Code** (everything except the written content): [MIT](LICENSE)
- **Content** (`src/content/`, page prose, and authored media):
  [CC BY 4.0](LICENSE-CONTENT)
