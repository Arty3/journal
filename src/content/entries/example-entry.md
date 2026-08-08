---
title: My entry
description: One or two sentences shown in the entry list.
tags:
  - experiments
  - C++
draft: true
---

This is a sample entry to showcase how to write entries.

## Adding an entry

Create a `.md` or `.mdx` file in `src/content/entries/`. The filename becomes
the URL slug (`cool-idea.md` -> `/entries/cool-idea/`). Frontmatter
looks like the top of this file:

```yaml
---
title: My entry
description: One or two sentences shown in the entry list.
tags:
  - experiments
  - C++
draft: true
---
```

Everything below the frontmatter is plain Markdown (or MDX if you want
components). Once you commit & push, and the site redeploys.
