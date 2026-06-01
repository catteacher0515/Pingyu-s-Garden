# Pingyu-s-Garden Notes

## Language rule

- Unless the user explicitly requests another language, all model responses and project documentation should default to Simplified Chinese.

## Current state

- The implemented homepage is the poster-style version in `src/pages/HomePage.tsx`.
- It renders `TopNav`, `SideOrnaments`, `PosterHero`, and `EntryStrip` from `src/components/Home/`.
- Routes that currently exist: `/`, `/profile`, `/projects`, `/articles`, `/tools`.
- `ProfilePage` and `ProjectsPage` use shared shell layout components; `ArticlesPage` and `ToolsPage` still use the older dark list-page pattern.

## Design docs

- The active design direction and current implementation are based on the poster-style homepage spec in `docs/superpowers/specs/2026-05-28-poster-home-design.md`.
- The implementation plan for that redesign is `docs/superpowers/plans/2026-05-28-poster-home.md`.
- Earlier April and May 26 design docs are historical context only and should not be treated as the current UI.

## Design rule

- All new page content and component work must stay visually consistent with the current poster-style homepage: dark brown-black stage background, warm paper surfaces, red-brown accents, hand-drawn/printed texture, and restrained motion.
- Do not introduce a separate visual system such as blue-black glassmorphism, generic dashboard cards, or standard portfolio templates unless the homepage direction is explicitly changed first.

## Content state

- Article, tool, profile, and project content is still placeholder content.
- `src/data/notes.json` and `src/data/ideas.json` are legacy MVP leftovers and are not surfaced on the current homepage.


<claude-mem-context>
# Memory Context

# [Pingyu-s-Garden] recent context, 2026-05-31 11:45pm GMT+8

No previous sessions found.
</claude-mem-context>
