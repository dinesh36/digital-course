# Static site and SEO (the storefront)

Read this only when the work is about how the storefront is built, its SEO tags, the breadcrumb, or how it is deployed.
The open to-dos are not here: they are in `../serverless-ecom-backend/TODO.md` (section "Rendering and SEO").
The backend and infrastructure side is in `../serverless-ecom-backend/wiki/static-storefront.md`.

## In short

The storefront is a static export of Next.js (`output: 'export'`) uploaded to S3 and served by CloudFront. Nothing renders on a
server. A public page is written into HTML at `next build`; what depends on the visitor (the signed-in customer, the cart, the
lists) is loaded in the browser after the page opens.

Use Node 22.14.0 (`nvm use`; the shell default may be newer and is not what the project is tested on).

## How a page is built

- `app/layout.tsx` is only `<html>` and `<body>`.
- Every page is in `app/(static)/`. Its layout, `StaticLayoutContainer`
  (`lib/ecom/pages/layout/StaticLayoutContainer.tsx`), reads the categories and the nav menus once, at build time, and
  draws the navbar and the footer. If those calls fail during `next build` the layout throws, so an error page is never baked in.
- There is no server rendering and no middleware (removed 2026-11-09): nothing reads the request, and a private page is guarded in
  the browser.
- A product page and a blog page are written one per item: `generateStaticParams` lists every product and post
  (`lib/ecom/ssr-utils/static-data.ts`), and `dynamicParams = false`.

| Kind of page | What is in the built HTML | What the browser loads |
|---|---|---|
| About, contact, policies, unsubscribe | the whole page | nothing |
| Home, `/courses`, `/blogs` | the heading and the shell | the lists (never baked in), so they are always current |
| A course and a blog post | the item (`initialProduct`, `initialPost`) | for a signed-in customer the product again (`isPurchased`); the visit is counted for a post |
| Cart, checkout, account, wishlist, search | a shell | everything, after the session check |

Parts that read the URL's query (`useSearchParams`) sit in their own `Suspense`, otherwise the whole page would be left to the
browser and the built HTML would only say "Loading...".

## SEO data (the tags and the page title)

- A page calls `getSeoData('<identifier>')` (`lib/ecom/ssr-utils/seo-metadata.ts`). The identifier is the CMS page of the path
  without its first slash (`about-us`, `policies/privacy-policy`, `home`); the backend answers `GET /cms-pages/<identifier>`. If
  the CMS page does not exist the default SEO data is used.
- The page renders `<StaticPageSeo seoData={seoData} />` (`lib/ecom/components/PageSeo/StaticPageSeo.tsx`): the tags
  (title, description, keywords, Open Graph, Twitter) go into `<head>`, and the breadcrumb is drawn at the top of the page.
- An async `generateMetadata` is not used: in Next 15.3 its result is streamed after the HTML, so it is not in the first bytes
  a crawler reads.
- A component that shows its title from the store gets `title={seoData.pageTitle}` (the policy pages, `ContactUsForm`,
  `UnsubscribeForm`), because the store has no page SEO in a build.
- A product and a blog post build their SEO from the item (`generateProductSeoContent`, `getBlogSeoContent`, in
  `lib/ecom/store/layout/layout-thunk.ts`).
- `og:url` comes from `NEXT_PUBLIC_BASE_URL` **at build time**: build with the site's real URL. URLs have no trailing slash
  (decided: no `trailingSlash`).

## What a detail page carries (checked 2026-11-09, on the 17 courses and the 4 posts)

- A blog post: title, meta description, keywords, Open Graph and Twitter tags, an image, an `h1` and the breadcrumb.
- A course: a unique title, a meta description (the product's whole `description`, 463 to 744 characters with line breaks), Open
  Graph and Twitter tags, an image, the price (`og:price:amount`) and the breadcrumb. No `h1` (`CourseInfo` draws the name with
  `Typography variant="h1"`, which is a `span` unless it gets `component="h1"`), no keywords (a product has no `metaKeywords`).
- Neither has a canonical link or structured data (JSON-LD).
- These gaps are in `../serverless-ecom-backend/TODO.md` (section "SEO").

## Breadcrumb

- Data: the CMS page has `showBreadcrumb` and `breadcrumb` (a list of `{ label, page }`). `page` is the identifier of another CMS
  page; the API turns it into a `link` (`courses` into `/courses`, `home` into `/`); a page that is missing or disabled gives
  the label with no link. "Home" (`/`) is the storefront's own first item (`BREADCRUMB_HOME`) and is not stored.
- Drawing: `StaticPageSeo` renders `<Breadcrumb items>` (the lib's `components/layout/Breadcrumb`) where it is placed, so the
  breadcrumb is in the built HTML. A product and a blog post have no CMS page, so `courses/[courses-urlKey]` and
  `blogs/[blog-urlKey]` draw their own (the courses or blogs page, then the item's name).
- Decided 2026-11-09: no hook, no store state, and not drawn by the layout. A version where the layout drew it from the store was
  tried and dropped: at build time the layout renders before the page, so the breadcrumb was not in the HTML.
- Checked on a build (2026-11-09): it is in the HTML of about-us, contact-us, courses, blogs, the policies, unsubscribe, a course,
  a blog post, cart and account. It is not on the home page (by design) nor on checkout, wishlist, search, the dashboard and
  create-password.
- A new tenant needs its CMS pages with their breadcrumbs; no seed exists yet.

## Data at build time

- `apiService` (`lib/ecom/services/api-service.ts`): during `next build` (`NEXT_PHASE=phase-production-build`) the fetch has no
  cache option, because an explicit `no-store` would make the page dynamic. In the browser it is `no-store`. Do not use
  `force-cache` there: Next keeps the answer in `.next/cache/fetch-cache` and a later build would reuse it.
- Every build empties that folder first (`preapp:build` runs `lib/ecom/scripts/clear-fetch-cache.js`).
- The backend must be reachable during the build (`NEXT_ECOM_BACKEND_URL`): it reads the categories, menus, SEO, every product and
  every post. A post is read with `GET /blog-posts/:urlKey?countView=false` so that a build does not add views.
- A static page keeps the data of its last build until the next build.

## In the browser

- `AppLayoutClientSide` with `checkSession` asks the backend (`GET /profile`) after the page loads. `isSessionChecked` in the
  auth state says when the answer is known, the cart waits for it, and a guest on a private path (`/account`) is sent home. A
  guest at `/checkout` goes back to the cart with the login modal. This replaces the middleware's redirect.
- `AppStore` creates the store once. Creating it on every render dropped the signed-in customer at the first client-side link
  click of a built page.
- The only expected console error for a guest is the `GET /api/profile` 401 of the session check.

## Build, preview and deploy

Run from the project root. The commands are configured in the ecom lib (`lib/ecom/package.json`, `app:*`); the project's
`package.json` only calls them, and extra arguments pass through (`npm run dev -- -p 3002`).

```bash
NEXT_PUBLIC_BASE_URL=https://dev.digitalcourses.raimptech.com NEXT_OUTPUT=export npm run build   # writes out/
npm run preview:static          # http://localhost:3300  (PREVIEW_PORT, PREVIEW_API_URL)
npm run deploy:s3 -- --dry-run  # the plan, writes nothing
npm run deploy:s3               # upload, remove old files, invalidate CloudFront
npm run deploy:s3:list          # evidence: what is in S3, compared with out/
```

- Settings (environment or `.env.local`): `DEPLOY_S3_BUCKET`, `DEPLOY_S3_PREFIX` (default `fe-app`),
  `DEPLOY_CLOUDFRONT_DISTRIBUTION_ID`, `DEPLOY_CLOUDFRONT_KVS_ARN` (the stack's output `FrontendPagesStoreArnOutput`),
  `AWS_REGION`. The AWS credentials are the AWS CLI profile's.
- The unknown-path rule: CloudFront's `FrontendRewrite` function sends a path that is not a page to `404.html` (status 200,
  `noindex`). It learns the pages from a KeyValueStore that the deploy script keeps in sync (one key per `.html` file of the build,
  `ready` last), using the AWS CLI (`aws cloudfront-keyvaluestore`). Without `DEPLOY_CLOUDFRONT_KVS_ARN` the step is skipped and
  the function keeps treating every path as a page.
- The deploy script uploads only what changed (MD5), removes what is no longer in the build, sets the cache headers
  (`_next/static` immutable for a year, pages and route data revalidated every time, the rest a day) and invalidates `/*`.
  It refuses a build made for `localhost` and any prefix under `media/`.
- The AWS SDK of the scripts is installed on its own: `npm install --prefix lib/ecom/scripts`, once per checkout
  (`lib/ecom/scripts/package.json`). It is not in the project's or the lib's `package.json` on purpose: an install in `lib/ecom`
  pulls a second copy of React, `react-redux` and `next`, and the build then fails with
  `Cannot read properties of null (reading 'useContext')`.
- `postinstall` stays in the project's `package.json`: it is what clones `lib/ecom`.
- `out/` is not cleared between builds: `rm -rf out` first for a clean upload. ESLint ignores `out/`.
- The preview server (`http-server`) shows a directory listing on a direct load of `/blogs`, `/courses`, `/account` and
  `/checkout`, because a file and a folder share the name. Clicking to them works. CloudFront's rewrite handles it in production.

## Images in `public/`

Only the images the site uses are kept (the logo, the hero background, the 404 art, two placeholders, the login-modal picture),
with the favicon and the fonts. Rule used on 2026-11-09: delete an image that no source, lib file, built page or API data mentions;
keep a PNG as a PNG (lossless under 100 KB, otherwise a 256-colour palette that scores 35 dB or better against the original); a JPG
becomes a PNG only when the PNG is at least 5% smaller. After a change, check that every `/assets/` path in the built site exists.

## The product path

The product list and the product pages sit at `/<PRODUCTS_PATH>` and `/<PRODUCTS_PATH>/<urlKey>` (here `courses`; another store may
use `products`, `bags`...). Set it in `overrides/lib/ecom/constants/constant.ts` (`PRODUCTS_PATH`), build every link with
`getProductListPath()` and `getProductPath(urlKey)` (`lib/ecom/utils/pathUtils.ts`), never a literal `/courses`. The route folder
`app/(static)/courses/` cannot use a constant: rename it with the value. The backend has the same value in the tenant's
`productsPath` (the sitemaps use it).

## Where things are

| What | Where |
|---|---|
| Static layout | `lib/ecom/pages/layout/StaticLayoutContainer.tsx` |
| SEO tags and breadcrumb | `lib/ecom/components/PageSeo/StaticPageSeo.tsx` |
| Pages | `app/(static)/` |
| Build-time lists of products and posts | `lib/ecom/ssr-utils/static-data.ts` |
| Session check, cart wait, private-page guard | `lib/ecom/pages/layout/AppLayoutClientSide.tsx` |
| API calls and the build-time fetch rule | `lib/ecom/services/api-service.ts` |
| Deploy and listing scripts | `lib/ecom/scripts/` |
| Commands | `lib/ecom/package.json` (`app:*`), called from `package.json` |
