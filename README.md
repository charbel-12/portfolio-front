# Charbel Mdawar — Portfolio

A single-page portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Development
Run `npm install` if dependencies are missing, then `npm run dev`.
Run `npx tsc --noEmit` for type checking and `npm run build` for the static production export in `out/`.

## Content
Professional facts live in `lib/data.ts` and follow the supplied CV. Optional social URLs are omitted until verified. The downloadable original DOCX is in `public/`.
Update the content and downloadable file together when the CV changes.

## Motion and accessibility
CSS animates the hero and hover states. IntersectionObserver reveals below-the-fold sections once; content stays visible without JavaScript. Reduced-motion preferences disable entrances and smooth scrolling. Navigation supports keyboard use and Escape closes the mobile menu.

## Hosting
Sites uses the static export in `out/`; the project binding is recorded in `.openai/hosting.json`. Deployment is owner-only. Public sharing is managed separately.

