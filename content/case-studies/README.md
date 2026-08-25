# Case study content

Drop `.mdx` files in this folder to publish a project on `/work`. Each file becomes `/work/<filename-without-extension>`. Nothing else needs to change in code — the list page, the detail page, and the sitemap all read this folder automatically.

Required and optional frontmatter:

```mdx
---
title: "Rebuilding checkout for a regional e-commerce brand"
clientDisplay: "anonymized"        # "named" | "anonymized" | "confidential" — see below
client: "Acme Corp"                 # only used when clientDisplay is "named"
anonymizedLabel: "a regional e-commerce brand"  # only used when clientDisplay is "anonymized"
industry: "e-commerce"              # optional, free text
services: ["web-development", "seo"] # slugs from lib/services.ts — powers filtering later
summary: "One-sentence description used on the index card and SEO meta description."
date: "2026-08-25"
dateModified: "2026-09-01"          # optional — only set this if you edit the case study after publishing
outcomes:                            # optional — short, specific, verifiable bullet results
  - "Checkout completion up 22% in the first full month"
  - "Mobile page load down from 4.1s to 1.3s"
testimonial:                         # optional — omit entirely if you don't have one yet
  quote: "..."
  author: "First name, Title"        # only include if the client approved being named
coverImage: "/case-studies/acme-hero.webp"  # optional
---

The case study body goes here in Markdown/MDX: the situation, what was actually
built, and the outcome. Write it the way you'd explain it to the client's own
boss, not the way you'd describe it to another developer.
```

## `clientDisplay` — pick the tier that matches what the client actually agreed to

- **`named`** — client name, and optionally their logo/testimonial with attribution, all confirmed in writing.
- **`anonymized`** — no name anywhere; `anonymizedLabel` (e.g. "a regional logistics company") plus real outcomes and screenshots that don't identify them.
- **`confidential`** — no client identity at all, not even a vague label; lean on the industry field, the work itself, and outcome numbers.

Default to `confidential` if you haven't explicitly confirmed a client is fine with the other two — flipping a case study to a less private tier is easy later; walking back an identity that already shipped isn't. See the case-study playbook for the permission-request template and the full capture checklist to run per project.

Once there are 2-3 real case studies here, revisit `app/work/page.tsx` — nothing structural needs to change, but it's worth checking the empty-state copy no longer needs to be shown.
