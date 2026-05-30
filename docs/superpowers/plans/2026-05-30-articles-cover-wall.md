# Articles Cover Wall Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `/articles` 实现为只显示标题的 poster-style 知乎文章封面墙。

**Architecture:** `ArticlesPage` 负责页面框架和标题，`ArticleCoverCard` 负责单张 16:9 封面卡，`src/data/articles.ts` 提供带类型约束的真实文章数据。封面资源下载到 `public/articles/`，页面只引用本地图片路径。

**Tech Stack:** React 19, React Router 7, Framer Motion, Tailwind CSS 4, Vitest, Testing Library, Vite。

---

### Task 1: Articles Page Test

**Files:**
- Create: `src/pages/ArticlesPage.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ArticlesPage from './ArticlesPage'
import { articles } from '../data/articles'

describe('ArticlesPage', () => {
  it('renders a poster-style cover wall of Zhihu articles', () => {
    render(
      <MemoryRouter>
        <ArticlesPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '文章' })).toBeInTheDocument()
    expect(screen.queryByText(/学习、工具试用|工作流/)).not.toBeInTheDocument()
    expect(screen.queryByText('还没有文章，快去写一篇')).not.toBeInTheDocument()
    expect(screen.queryByText('文章标题占位')).not.toBeInTheDocument()

    expect(articles).toHaveLength(6)

    for (const article of articles) {
      const link = screen.getByRole('link', { name: new RegExp(article.title) })
      expect(link).toHaveAttribute('href', article.url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')

      const image = screen.getByRole('img', { name: `${article.title} 封面` })
      expect(image).toHaveAttribute('src', article.cover)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/ArticlesPage.test.tsx`
Expected: FAIL because `../data/articles` does not exist yet.

### Task 2: Article Data And Card

**Files:**
- Create: `src/data/articles.ts`
- Create: `src/components/Articles/ArticleCoverCard.tsx`
- Modify: `src/types.ts`
- Delete: `src/data/articles.json`

- [ ] **Step 1: Add article type fields**

```ts
export interface Article {
  id: string
  title: string
  cover: string
  url: string
}
```

- [ ] **Step 2: Add six real article records**

```ts
import type { Article } from '../types'

export const articles: Article[] = [
  {
    id: 'github-w21',
    title: 'GitHub 每周精选｜2026 W21',
    cover: '/articles/github-w21.jpg',
    url: 'https://zhuanlan.zhihu.com/p/2042011598328520958',
  },
]
```

Repeat until the exported array has six confirmed Zhihu articles.

- [ ] **Step 3: Build the cover card component**

```tsx
import { motion } from 'framer-motion'
import type { Article } from '../../types'

interface ArticleCoverCardProps {
  article: Article
  index: number
}

export default function ArticleCoverCard({ article, index }: ArticleCoverCardProps) {
  return (
    <motion.a href={article.url} target="_blank" rel="noopener noreferrer">
      <img src={article.cover} alt={`${article.title} 封面`} />
      <h2>{article.title}</h2>
    </motion.a>
  )
}
```

- [ ] **Step 4: Run test to verify current implementation still fails**

Run: `npx vitest run src/pages/ArticlesPage.test.tsx`
Expected: FAIL because `ArticlesPage` still imports the old JSON/list UI.

### Task 3: Articles Page Implementation

**Files:**
- Modify: `src/pages/ArticlesPage.tsx`

- [ ] **Step 1: Replace old list UI with cover wall**

```tsx
import BackToGarden from '../components/Layout/BackToGarden'
import ArticleCoverCard from '../components/Articles/ArticleCoverCard'
import { articles } from '../data/articles'

export default function ArticlesPage() {
  return (
    <main>
      <BackToGarden />
      <h1>文章</h1>
      <section aria-label="知乎文章封面墙">
        {articles.map((article, index) => (
          <ArticleCoverCard key={article.id} article={article} index={index} />
        ))}
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Run focused test to verify it passes**

Run: `npx vitest run src/pages/ArticlesPage.test.tsx`
Expected: PASS.

### Task 4: Local Covers And Verification

**Files:**
- Create: `public/articles/*.jpg`

- [ ] **Step 1: Download covers**

Run downloads for the six `cover` paths in `src/data/articles.ts`.
Expected: every file exists under `public/articles/` and is a valid JPEG.

- [ ] **Step 2: Run full verification**

Run:

```bash
npx vitest run src/pages/ArticlesPage.test.tsx src/pages/DetailPages.test.tsx
npm run build
```

Expected: article and detail-page tests pass; build succeeds.

- [ ] **Step 3: Browser check**

Run: `npm run dev -- --host 127.0.0.1`
Open `/articles` in the in-app browser and verify the page shows a two-column cover wall on desktop with no subtitle.
