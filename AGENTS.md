# Pingyu-s-Garden Notes

## Language rule

- Unless the user explicitly requests another language, all model responses and project documentation should default to Simplified Chinese.

## Current state

- The implemented homepage is the poster-style version in `src/pages/HomePage.tsx`.
- It renders `TopNav`, `SideOrnaments`, `PosterHero`, and `EntryStrip` from `src/components/Home/`.
- Routes that currently exist: `/`, `/profile`, `/projects`, `/articles`, `/tools`. The `/projects` entry is hidden from the homepage, but the route still exists.
- `ProfilePage` is the poster-style about page; `ProjectsPage` is the poster-style selected-works wall with placeholder project slots; `ArticlesPage` is the poster-style Zhihu cover wall; `ToolsPage` is the poster-style lab with `TaskFlow` and other self-use tools.
- Production is GitHub Pages at `https://catteacher0515.github.io/Pingyu-s-Garden/`, deployed by `.github/workflows/` on push to `main`. Vite `base` is `/Pingyu-s-Garden/` for builds; `public/404.html` handles SPA deep links. Vercel was tried first and did not work; `.vercel/` is ignored and not a live deployment.
- `~/dev/Pingyu-s-Garden-repo` is a stale older clone; do not work there.

## Redesign in progress (decided 2026-10-07)

- The user finds the poster style too oppressive and wants a full redesign of UI, UX, and motion, modeled on GSAP Showcase and HyperFrames Showcase.
- The current direction is the interactive prototype in `docs/prototypes/redesign-v2/` (see its `README.md`) on branch `redesign-prototype`. It is not migrated into `src/` yet, and the user still expects many changes.
- New design work follows the prototype direction, not the poster-style rules below. Prefer interactive prototypes over static mockups when proposing visual changes.

## Design docs

- The poster-style homepage spec `docs/superpowers/specs/2026-05-28-poster-home-design.md` and plan `docs/superpowers/plans/2026-05-28-poster-home.md` describe the code that is live today; they will become historical once the redesign lands.
- Earlier April and May 26 design docs are historical context only and should not be treated as the current UI.

## Design rule (current poster-style code only)

- Small fixes to the existing poster-style pages should stay consistent with it: dark brown-black stage background, warm paper surfaces, red-brown accents, hand-drawn/printed texture, and restrained motion.

## Content state

- `ProjectsPage` content is still placeholder content.
- `ProfilePage`, `ArticlesPage`, and `ToolsPage` already use real or near-real content, but all three still have room for more personal data and refinement.
- `src/data/notes.json` and `src/data/ideas.json` are legacy MVP leftovers and are not surfaced on the current homepage.


<claude-mem-context>
# Memory Context

# [Pingyu-s-Garden] recent context, 2026-10-03 10:08am GMT+8

No previous sessions found.
</claude-mem-context>
