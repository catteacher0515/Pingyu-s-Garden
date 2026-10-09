# Pingyu-s-Garden Notes

## Language rule

- Unless the user explicitly requests another language, all model responses and project documentation should default to Simplified Chinese.

## Branches and deployment

- `main`: the old React/Vite poster-style site, still live on GitHub Pages at `https://catteacher0515.github.io/Pingyu-s-Garden/` via `.github/workflows/deploy-pages.yml`. Leave it alone until the new site replaces it.
- `astro-v2`: the from-scratch rebuild (Astro 7 + GSAP + Sveltia CMS). This is where new work happens.
- `redesign-prototype`: archive of the single-file prototype in `docs/prototypes/redesign-v2/` that the rebuild is based on.
- `astro-v2` is live on Cloudflare Pages at https://pingyu-s-garden.pages.dev (project `pingyu-s-garden`, production branch `astro-v2`, `NODE_VERSION=24.14.1`, auto-deploys on push). Later move to the user's own domestic server once ICP filing is done. Vercel was tried earlier and failed; `.vercel/` is ignored.
- Before merging `astro-v2` into `main`, the GitHub Pages workflow must be removed or updated: the new site assumes it is served from `/`, not `/Pingyu-s-Garden/`.
- `~/dev/Pingyu-s-Garden-repo` is a stale older clone; do not work there.

## Commands (astro-v2)

- `npm run dev` → http://localhost:4321 ; `npm run build` → `dist/`.
- The default npm mirror (npmmirror) and registry.npmjs.org are often unusable from this machine. Install with `npm install --registry=https://repo.huaweicloud.com/repository/npm/`, then rewrite `resolved` URLs in `package-lock.json` back to `https://registry.npmjs.org/` so overseas CI can install.

## Content model

- Three content collections in `src/content/`: `videos`, `posts` (category 教程 / 文章 / 周刊), `projects`. Schemas live in `src/content.config.ts`.
- `public/admin/config.yml` (Sveltia CMS) mirrors those schemas field by field. Change both together.
- `draft: true` entries show only in `npm run dev`; `featured: true` entries go into the homepage showreel (`src/components/Reel.astro`, one card template per content type).
- Full videos are not hosted here: they live on B站 etc. Video pages embed the B站 player behind a click-to-load cover. Optional short silent `preview` clips are the only video files in the repo.
- Posts with `external` link out (old Zhihu articles) and get no on-site page.

## Editing content

- The user edits content at `/admin/` (Sveltia CMS, GitHub backend, currently `branch: astro-v2`). Sign-in uses a GitHub personal access token for now; an OAuth authenticator on Cloudflare Workers can be added later.
- Saving in the CMS commits to GitHub; the host rebuilds the site.

## Design direction

- Based on GSAP Showcase and HyperFrames Showcase: person-first homepage hero, showreel carousel, docs-style list pages with sidebar + on-page TOC, ⌘K search, dark/light toggle, GSAP motion with `prefers-reduced-motion` respected.
- The user cares about UI/UX and motion, not just color. Propose visual changes as clickable prototypes.
- Astro 7 compiler is strict about unclosed/invalid HTML. `compressHTML: true` is set on purpose to keep HTML whitespace rules for mixed Chinese/English text.
