# Poster Home Implementation Plan

> 状态：当前有效实施计划。该计划对应已确认的海报式首页方向，但截至 2026-05-28 尚未执行代码实现。

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage as a dark, poster-like cover with a central abstract panel, handwritten/print hybrid typography, and low-priority entry links for the rest of the site.

**Architecture:** Keep the existing route structure and content pages. Replace the current light glass signboard homepage with a layered poster composition: a dark textured background, a large central hero poster, subtle side ornaments, and a small entry strip that preserves navigation without dominating the composition. Most of the visual work lives in reusable presentation components so later pages can inherit the same palette and texture language without duplicating logic.

**Tech Stack:** React, React Router, TypeScript, Tailwind CSS utility classes, existing Vitest + Testing Library setup.

---

### Task 1: Rework the homepage composition into poster layout

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Test: `src/pages/HomePage.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('renders poster-style homepage content', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByText('DIGITAL GARDEN')).toBeInTheDocument()
    expect(screen.getByText('花萍雨的数字花园')).toBeInTheDocument()
    expect(screen.getByText(/海报式/)).toBeInTheDocument()
    expect(screen.getByText(/黑底/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/pages/HomePage.test.tsx`
Expected: FAIL because the homepage still renders the current light signboard content and does not mention poster-oriented copy.

- [ ] **Step 3: Write the minimal implementation**

```tsx
import PosterHero from '../components/Home/PosterHero'
import EntryStrip from '../components/Home/EntryStrip'
import SideOrnaments from '../components/Home/SideOrnaments'
import TopNav from '../components/Home/TopNav'

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0b0b] text-[#f4eadf]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,158,118,0.12),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,#120f0f_0%,#0b0909_100%)]" />
      <TopNav />
      <SideOrnaments />
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-10 lg:px-10">
        <PosterHero />
        <EntryStrip />
      </section>
    </main>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/pages/HomePage.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/HomePage.tsx src/pages/HomePage.test.tsx
git commit -m "feat: reshape homepage into poster layout"
```

### Task 2: Add reusable poster home components

**Files:**
- Create: `src/components/Home/TopNav.tsx`
- Create: `src/components/Home/PosterHero.tsx`
- Create: `src/components/Home/SideOrnaments.tsx`
- Create: `src/components/Home/EntryStrip.tsx`
- Create: `src/components/Home/PosterHero.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PosterHero from '../components/Home/PosterHero'

describe('PosterHero', () => {
  it('renders the central poster copy and abstract placeholder', () => {
    render(<PosterHero />)

    expect(screen.getByText('Software should feel thoughtful')).toBeInTheDocument()
    expect(screen.getByText(/抽象主视觉/)).toBeInTheDocument()
    expect(screen.getByText(/海报式首页/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/Home/PosterHero.test.tsx`
Expected: FAIL because the component file does not exist yet.

- [ ] **Step 3: Write the minimal implementation**

```tsx
export default function PosterHero() {
  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-[2.4rem] border border-[#efcfbf]/70 bg-[linear-gradient(180deg,rgba(251,236,219,0.98),rgba(245,227,202,0.94))] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.42)] lg:p-8">
      <div className="absolute inset-4 rounded-[2rem] border border-[#d8c7b8]/60" />
      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="text-[#cf5f45]">
          <p className="mb-3 font-body text-sm tracking-[0.35em] text-[#f4eadf]/70">HOME POSTER</p>
          <h1 className="font-display max-w-[10ch] text-[clamp(3.5rem,7vw,6.4rem)] leading-[0.9]">
            Software should feel thoughtful
          </h1>
          <p className="mt-5 max-w-md font-body text-[1rem] leading-8 text-[#f4eadf]/82">
            黑底、红棕、手绘与印刷感混合的首页海报，保留数字花园的气质，但让画面先成为作品。
          </p>
        </div>
        <div className="min-h-[22rem] rounded-[2rem] border border-[#d7c4b4]/70 bg-[radial-gradient(circle_at_20%_20%,rgba(207,95,69,0.16),transparent_22%),radial-gradient(circle_at_80%_30%,rgba(207,95,69,0.12),transparent_18%),repeating-linear-gradient(90deg,rgba(192,178,166,0.45)_0_1px,transparent_1px_56px),repeating-linear-gradient(rgba(192,178,166,0.45)_0_1px,transparent_1px_56px)]" />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/Home/PosterHero.test.tsx`
Expected: PASS once the component exists and renders the expected strings.

- [ ] **Step 5: Commit**

```bash
git add src/components/Home/TopNav.tsx src/components/Home/PosterHero.tsx src/components/Home/SideOrnaments.tsx src/components/Home/EntryStrip.tsx
git commit -m "feat: add poster home components"
```

### Task 3: Update the global theme to dark poster styling

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Write the failing test**

No direct unit test is needed here because the existing Vitest setup does not inspect CSS. Verify via the homepage render after the components are wired together.

- [ ] **Step 2: Write the minimal implementation**

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Cormorant+Garamond:wght@500;600;700&family=Knewave&display=swap');
@import "tailwindcss";

:root {
  color-scheme: dark;
  --site-bg: #0d0b0b;
  --site-ink: #f4eadf;
  --site-muted: rgba(244, 234, 223, 0.7);
  --site-paper: rgba(251, 236, 219, 0.96);
  --site-border: rgba(239, 207, 191, 0.7);
}

body {
  min-height: 100vh;
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 145, 109, 0.12), transparent 18%),
    radial-gradient(circle at 82% 14%, rgba(255, 255, 255, 0.05), transparent 18%),
    linear-gradient(180deg, #120f0f 0%, #0b0909 100%);
  color: var(--site-ink);
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(rgba(255, 245, 236, 0.55) 1px, transparent 1px),
    radial-gradient(rgba(255, 145, 109, 0.16) 1px, transparent 1px);
  background-size: 3px 3px, 11px 11px;
  opacity: 0.14;
  mix-blend-mode: soft-light;
}

.font-display {
  font-family: 'Cormorant Garamond', Georgia, serif;
}

.font-body {
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
}

.font-hand {
  font-family: 'Knewave', cursive;
}
```

- [ ] **Step 3: Verify homepage styling visually in browser**

Run the local app and confirm the background is now dark poster-like rather than light glass.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat: switch theme to dark poster palette"
```

### Task 4: Refactor the entry section into low-priority navigation

**Files:**
- Modify: `src/components/Garden/GardenMap.tsx`
- Modify: `src/components/Garden/FlowerNode.tsx`
- Modify: `src/types.ts`
- Modify: `src/pages/HomePage.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('renders the low-priority entry strip for site sections', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('button', { name: /个人介绍/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /项目/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /文章/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /小工具/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/pages/HomePage.test.tsx`
Expected: PASS after Task 1, but the component structure will still need to be adapted to the poster-style entry strip.

- [ ] **Step 3: Write the minimal implementation**

```tsx
import { useNavigate } from 'react-router-dom'
import FlowerNode from './FlowerNode'
import type { HomeSectionConfig } from '../../types'

const HOME_SECTIONS: HomeSectionConfig[] = [
  { id: 'profile', label: '个人介绍', emoji: '✦', description: '了解我是谁', path: '/profile', angle: 0 },
  { id: 'projects', label: '项目', emoji: '✦', description: '可写进简历的项目', path: '/projects', angle: 270 },
  { id: 'articles', label: '文章', emoji: '✦', description: '公开发布的文章', path: '/articles', angle: 180 },
  { id: 'tools', label: '小工具', emoji: '✦', description: '日常自用工具', path: '/tools', angle: 90 },
]

export default function GardenMap() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl rounded-[2rem] border border-[#efcfbf]/40 bg-[rgba(255,248,240,0.04)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm lg:px-5 lg:py-5">
      <div className="grid gap-4 md:grid-cols-4">
        {HOME_SECTIONS.map((section) => (
          <FlowerNode
            key={section.id}
            section={section}
            onClick={() => navigate(section.path)}
          />
        ))}
      </div>
    </div>
  )
}
```

```tsx
import type { HomeSectionConfig } from '../../types'

interface FlowerNodeProps {
  section: HomeSectionConfig
  onClick: () => void
}

export default function FlowerNode({ section, onClick }: FlowerNodeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={section.label}
      className="group flex min-h-[11rem] flex-col items-center justify-center rounded-[1.5rem] border border-[#efcfbf]/50 bg-[rgba(255,248,240,0.9)] px-4 py-5 text-center text-[#cf5f45] shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#fff3e4]"
    >
      <span className="font-hand text-3xl leading-none">{section.emoji}</span>
      <span className="mt-4 font-display text-xl font-semibold">{section.label}</span>
      <span className="mt-2 max-w-[12ch] text-sm leading-6 text-[#7b665d]">{section.description}</span>
    </button>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/pages/HomePage.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Garden/GardenMap.tsx src/components/Garden/FlowerNode.tsx src/types.ts src/pages/HomePage.test.tsx
git commit -m "feat: simplify homepage entry strip"
```

### Task 5: Verify the full app and archive the result

**Files:**
- Review: `src/pages/HomePage.tsx`
- Review: `src/index.css`
- Review: `src/components/Home/*.tsx`
- Review: `src/components/Garden/*.tsx`

- [ ] **Step 1: Run the full test suite**

Run: `npm run build && npx vitest run`
Expected: build succeeds and all tests pass.

- [ ] **Step 2: Open the app in the browser and visually confirm**

Check the homepage for:
- dark poster background
- central poster panel
- top lightweight nav
- side ornaments
- low-priority entry strip

- [ ] **Step 3: Commit the finished state**

```bash
git add src docs/superpowers/plans/2026-05-28-poster-home.md
git commit -m "feat: complete poster home redesign plan"
```
