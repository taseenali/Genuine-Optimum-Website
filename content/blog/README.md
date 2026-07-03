# Blog content

Drop `.mdx` files in this folder to publish posts. Each file becomes `/blog/<filename-without-extension>`.

Required frontmatter:

```mdx
---
title: "Post Title"
description: "One-sentence summary used for the index page and SEO meta description."
date: "2026-07-03"
dateModified: "2026-08-01" # optional — only set this if you edit the post after publishing
---

Post body in Markdown/MDX goes here.
```

`dateModified` is optional and feeds the post's `BlogPosting` structured data as a freshness signal — leave it out until you actually edit a published post; it falls back to `date` when absent.

The blog index (`/blog`) reads this folder at build time and lists posts sorted by `date`, newest first. Once there are 3-5 real posts, add an RSS feed at `app/blog/rss.xml/route.ts` generated from the same frontmatter list.
