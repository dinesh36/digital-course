# CLAUDE.md

Guidance for Claude Code when working in this repository: the storefront of the multi-tenant e-commerce backend
(`../serverless-ecom-backend`), a Next.js static export that is uploaded to S3 and served by CloudFront.
All the to-dos of both repositories are in `../serverless-ecom-backend/TODO.md`.

## Wiki (read only when asked)

Longer notes live in the ecom lib's `lib/ecom/wiki/`. They are not part of this file and are not loaded with it: open one only when the user asks about
its topic or asks you to read it, never at the start of a conversation.

- `lib/ecom/wiki/static-site-and-seo.md`: how the static storefront is built (pages, SEO tags, breadcrumb, build-time data, the session
  check in the browser), how to build, preview and deploy it, and how the images in `public/` are handled.
- The backend and infrastructure side: `../serverless-ecom-backend/wiki/static-storefront.md`.
