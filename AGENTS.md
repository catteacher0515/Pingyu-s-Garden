# Pingyu-s-Garden Notes

## Current state

- The implemented homepage is the light signboard version in `src/pages/HomePage.tsx`.
- It renders a centered title block plus a four-card entry strip from `src/components/Garden/GardenMap.tsx`.
- Routes that currently exist: `/`, `/profile`, `/projects`, `/articles`, `/tools`.
- `ProfilePage` and `ProjectsPage` use shared shell layout components; `ArticlesPage` and `ToolsPage` still use the older dark list-page pattern.

## Design docs

- The active design direction is the poster-style homepage spec in `docs/superpowers/specs/2026-05-28-poster-home-design.md`.
- The implementation plan for that redesign is `docs/superpowers/plans/2026-05-28-poster-home.md`.
- Earlier April and May 26 design docs are historical context only and should not be treated as the current UI.

## Content state

- Article, tool, profile, and project content is still placeholder content.
- `src/data/notes.json` and `src/data/ideas.json` are legacy MVP leftovers and are not surfaced on the current homepage.


<claude-mem-context>
# Memory Context

# [Pingyu-s-Garden] recent context, 2026-05-29 11:46am GMT+8

No previous sessions found.
</claude-mem-context>