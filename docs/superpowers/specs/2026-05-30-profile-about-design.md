# Profile About Page Design

## Status

Approved for implementation on 2026-05-30.

## Goal

Turn `/profile` from a placeholder personal introduction page into a real About page.

The page should introduce Pingyu as a learning-oriented developer and content creator. It should feel like a natural inner page of the current poster-style homepage, not a separate portfolio template.

## Core Positioning

Use this as the main self-introduction:

> 我是花萍雨，一个还在探索中的开发者和内容创作者。
> 我用 AI 和代码做一些小工具，记录自己如何学习、试错、搭建工作流，也把那些真正有用的开源项目介绍给更多人。

The page should not present Pingyu as a fully settled expert. Its strength is honesty: learning, trying, writing, building, and leaving a trail for others.

## Design Rule

All `/profile` visuals must stay consistent with the current poster-style homepage.

Required visual language:

- dark brown-black stage background
- warm paper-like content surfaces
- red-brown borders, labels, and emphasis
- hand-drawn or printed texture
- restrained motion, such as fade-in, slight lift, and subtle hover states

Do not use:

- blue-black glassmorphism
- neon technology styling
- generic dashboard cards
- standard resume or portfolio templates

## Page Structure

### 1. About Hero

The first section introduces who Pingyu is and what this site is about.

Content:

- name or page title
- the approved two-sentence self-introduction
- identity stickers:
  - 大二下在读
  - AI + Code
  - 学习记录
  - 小工具开发

The hero should feel like a paper dossier or poster insert placed inside the dark homepage world.

### 2. Focus Grid

Section title: `我在探索什么`

Use four short cards:

1. `AI skill 与开源工具`
   - Try useful AI workflows and open-source projects, then explain what they can really do.
2. `内容创作工作流`
   - Turn writing, publishing, formatting, and topic discovery into repeatable processes.
3. `用代码解决真实问题`
   - Build small tools from actual needs instead of making demos for their own sake.
4. `编程 / 数据学习记录`
   - Keep notes from learning programming, data, SQL, and practical development habits.

Each card should be concise. Avoid long explanatory paragraphs.

### 3. Output Map

Section title: `我如何输出`

Use three linked paths:

- `文章` links to `/articles`
  - Records learning notes, project trials, and tool walkthroughs.
- `项目` links to `/projects`
  - Collects larger work that turns a problem into something usable.
- `小工具` links to `/tools`
  - Stores reusable utilities and experiments that may keep growing.

This is not a generic navigation block. It should explain how each route fits into Pingyu's personal system.

### 4. Contact Panel

Show contact and external identity options.

Initial fields:

- Zhihu profile
- Email
- GitHub

If a real value is not available yet, keep a clear replaceable value. The module should still look intentional, not like a temporary placeholder.

## Data Model

Keep the data lightweight. No CMS or backend is needed.

Move profile content out of JSX into either `src/data/profile.ts` or `src/data/profile.json`.

Recommended structure:

- `intro`
  - name
  - title
  - description
- `identityTags`
- `focusAreas`
  - id
  - title
  - description
  - label
- `outputs`
  - id
  - title
  - description
  - path
- `contacts`
  - id
  - label
  - value
  - href
  - hint

## Component Plan

Implement the page with small, focused components:

- `AboutHero`
- `FocusGrid`
- `OutputMap`
- `ContactPanel`

The page may introduce a poster-style shell or local page wrapper if the current shared `PageShell` cannot support the homepage-aligned visual language cleanly.

Do not refactor unrelated pages as part of this work.

## Motion

Use restrained animation only:

- section fade-in
- small card lift on hover
- subtle border or paper tone changes

Avoid complex scroll narratives, large bouncing elements, or high-frequency decorative motion.

## Testing

Add or update focused tests for `/profile`.

Test requirements:

- `/profile` renders successfully.
- The approved self-introduction appears.
- Identity stickers render:
  - 大二下在读
  - AI + Code
  - 学习记录
  - 小工具开发
- Output links point to:
  - `/articles`
  - `/projects`
  - `/tools`
- The contact panel renders.
- Old placeholder copy is gone, especially:
  - `这里放我的自我介绍`
  - `可替换提示`

## Non-Goals

This work does not include:

- changing the homepage
- changing `/projects`, `/articles`, or `/tools`
- adding new routes
- adding a CMS or backend
- writing a full resume page
- creating complex scroll-driven storytelling
- replacing all shared layout components across the app

## Success Criteria

The finished page should make a first-time visitor understand:

- Pingyu is a student developer and content creator still actively exploring.
- The site records learning, tool use, small builds, and practical workflows.
- The About page belongs visually to the same world as the poster-style homepage.
- The page feels intentional and personal, not like a template with placeholder text.
