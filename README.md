# Charbel Mdawar — Portfolio

A bilingual portfolio with dedicated section pages and engineering articles, built with Next.js, TypeScript, and Tailwind CSS.

## Development
Run `npm install` if dependencies are missing, then `npm run dev`.
Run `npx tsc --noEmit` for type checking and `npm run build` for the static production export in `out/`.

## Content
Professional facts live in `lib/data.ts` and follow the supplied CV. Optional social URLs are omitted until verified. The downloadable PDF CV is in `public/`. Add the personal portrait at `public/charbel-mdawar.jpg` to populate the hero portrait.
Update the content and downloadable file together when the CV changes.

The homepage previews two projects, all experience roles, three expertise groups, and three articles. Dedicated pages show the complete content. Bilingual articles live in `lib/editorial.ts` and `lib/experience-posts.ts`; adding a post automatically includes it in the blog, static routes, and sitemap.

## SEO
Each page includes a title, description, canonical URL, English/Arabic alternate links, and Open Graph/Twitter metadata. Articles include BlogPosting and breadcrumb structured data. `app/sitemap.ts` and `app/robots.ts` generate static crawler files. Run `node scripts/verify-export.mjs` after a production build to verify metadata, structured data, preview limits, and exported links.

## Motion and accessibility
CSS animates the hero and hover states. IntersectionObserver reveals below-the-fold sections once; content stays visible without JavaScript. Reduced-motion preferences disable entrances and smooth scrolling. Navigation supports keyboard use and Escape closes the mobile menu.

## Hosting
Sites uses the static export in `out/`; the project binding is recorded in `.openai/hosting.json`. Deployment is owner-only. Public sharing is managed separately.


## Canonical domain
Use `https://charbelmdawar.com` as the base URL for metadata, public links, and future site content.
Set `NEXT_PUBLIC_SITE_URL` before building if the production domain changes; it controls metadata, structured data, robots.txt, and sitemap.xml together.

Project routes are generated from `lib/case-studies.ts`; CV-grounded case-study copy links to related articles in both languages. `lib/deep-dives.ts` extends the SSO, payments, and Laravel articles with conceptual flows and primary references. Keep project-specific claims separate from illustrative engineering guidance.

`npm run build` regenerates 1200 × 630 social cards and responsive WebP portraits before exporting. The source JPG remains available as a fallback. Motion-reduction and data-saving preferences use static company logos instead of downloading 3D models.

The www redirect needs a Cloudflare zone rule; see [production settings](deployment/README.md) and the ready rule definition. The generated Next.js crawler routes are the single source for robots.txt and sitemap.xml.
