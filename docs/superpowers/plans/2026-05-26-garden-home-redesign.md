# Garden Home Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage into a center-avatar, four-direction navigation hub with Apple-style glassmorphism, then add dedicated detail pages for personal intro, projects, articles, and tools.

**Architecture:** Keep the existing flower-garden metaphor, but formalize it into a reusable layout system: one home hub, one shared glassmorphism visual language, and separate detail pages for each content pillar. Use small focused components for the hub nodes, shared glass cards, and page shells so the visual system stays consistent while each page owns its content.

**Tech Stack:** React 19, React Router DOM 7, TypeScript, Vite, Tailwind CSS 4, Framer Motion

---

### Task 1: Replace the current homepage with the new center-avatar navigation hub

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/components/Garden/GardenMap.tsx`
- Modify: `src/components/Garden/CenterNode.tsx`
- Modify: `src/components/Garden/FlowerNode.tsx`
- Modify: `src/types.ts`

- [ ] **Step 1: Update the data model for the four homepage modules**

```ts
export type HomeSectionId = 'profile' | 'projects' | 'articles' | 'tools'

export interface HomeSectionConfig {
  id: HomeSectionId
  label: string
  emoji: string
  description: string
  path: string
  angle: number
}
```

- [ ] **Step 2: Replace the old flower config usage with the new home section config**

```ts
const HOME_SECTIONS: HomeSectionConfig[] = [
  { id: 'profile', label: '个人介绍', emoji: '👤', description: '了解我是谁', path: '/profile', angle: 0 },
  { id: 'projects', label: '项目', emoji: '🧩', description: '可写进简历的项目', path: '/projects', angle: 270 },
  { id: 'articles', label: '文章', emoji: '📝', description: '公开发布的文章', path: '/articles', angle: 180 },
  { id: 'tools', label: '小工具', emoji: '🛠️', description: '日常自用工具', path: '/tools', angle: 90 },
]
```

- [ ] **Step 3: Rewrite the homepage shell to center the avatar and ringed navigation**

```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-10">
        <header className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-white/55">Digital Garden</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">花萍雨的数字花园</h1>
          <p className="mt-3 text-sm text-white/65">个人介绍、文章、项目和工具的统一入口</p>
        </header>

        <GardenMap />

        <p className="mt-8 text-xs text-white/55">点击任一入口，进入对应内容页</p>
      </section>
    </main>
  )
}
```

- [ ] **Step 4: Rebuild the garden map with fixed four-direction placement and glass cards**

```tsx
export default function GardenMap() {
  const navigate = useNavigate()

  return (
    <div className="relative aspect-square w-[min(84vw,38rem)]">
      <CenterNode />
      {HOME_SECTIONS.map((section) => (
        <FlowerNode
          key={section.id}
          section={section}
          onClick={() => navigate(section.path)}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Update the center node to use the avatar as the visual anchor**

```tsx
export default function CenterNode() {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
      <div className="h-28 w-28 overflow-hidden rounded-full border border-white/30 bg-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <img src="/avatar.jpg" alt="花萍雨头像" className="h-full w-full object-cover" />
      </div>
      <div className="mt-4 text-lg font-semibold text-white">花萍雨</div>
      <div className="mt-1 text-xs text-white/60">写作 · 开发 · 记录 · 生长</div>
    </div>
  )
}
```

- [ ] **Step 6: Make each node a glass card with clear position, label, and description**

```tsx
export default function FlowerNode({ section, onClick }: FlowerNodeProps) {
  const style = {
    transform: `translate(-50%, -50%) translate(${Math.cos((section.angle - 90) * Math.PI / 180) * 170}px, ${Math.sin((section.angle - 90) * Math.PI / 180) * 170}px)`,
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className="absolute flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[1.5rem] border border-white/20 bg-white/10 px-4 py-4 text-center text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition hover:bg-white/16 hover:shadow-[0_20px_52px_rgba(0,0,0,0.24)]"
    >
      <span className="text-3xl">{section.emoji}</span>
      <span className="mt-2 text-sm font-semibold">{section.label}</span>
      <span className="mt-1 text-[11px] leading-5 text-white/62">{section.description}</span>
    </button>
  )
}
```

- [ ] **Step 7: Run the app and verify the homepage renders the new four-direction structure**

Run: `npm run dev`
Expected: The homepage shows a center avatar with four fixed glass nodes around it and no old sample content cards on the landing view.

---

### Task 2: Add dedicated detail pages for personal profile and projects

**Files:**
- Create: `src/pages/ProfilePage.tsx`
- Create: `src/pages/ProjectsPage.tsx`
- Modify: `src/App.tsx`
- Create: `src/components/Layout/PageShell.tsx`

- [ ] **Step 1: Create a shared page shell for the detail pages**

```tsx
import { Link } from 'react-router-dom'

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          ← 回到花园
        </Link>
        <header className="mt-8">
          <p className="text-xs uppercase tracking-[0.32em] text-white/45">Digital Garden</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/66">{subtitle}</p>
        </header>
        <section className="mt-10">{children}</section>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Build the profile page with identity, tags, and contact blocks**

```tsx
export default function ProfilePage() {
  return (
    <PageShell title="个人介绍" subtitle="这里放我的自我介绍、工作方向、标签和联系方式。">
      <div className="grid gap-6 md:grid-cols-[1.4fr_0.9fr]">
        <article className="rounded-[2rem] border border-white/18 bg-white/10 p-6 backdrop-blur-2xl">
          <h2 className="text-lg font-semibold text-white">我是谁</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">...</p>
        </article>
        <aside className="rounded-[2rem] border border-white/18 bg-white/10 p-6 backdrop-blur-2xl">
          <h2 className="text-lg font-semibold text-white">联系我</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">...</ul>
        </aside>
      </div>
    </PageShell>
  )
}
```

- [ ] **Step 3: Build the projects page to show resume-worthy projects**

```tsx
export default function ProjectsPage() {
  return (
    <PageShell title="项目" subtitle="可以写进简历的项目集合，优先展示成果和技术点。">
      <div className="grid gap-4">
        {projects.map((project) => (
          <article key={project.id} className="rounded-[1.75rem] border border-white/18 bg-white/10 p-5 backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-white">{project.name}</h2>
                <p className="mt-2 text-sm leading-7 text-white/68">{project.summary}</p>
              </div>
              <a href={project.url} className="shrink-0 rounded-full border border-white/16 bg-white/12 px-3 py-1.5 text-xs text-white">查看</a>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
```

- [ ] **Step 4: Wire the new routes into the router**

```tsx
<Route path="/profile" element={<ProfilePage />} />
<Route path="/projects" element={<ProjectsPage />} />
```

- [ ] **Step 5: Run the app and verify both new pages are reachable from the homepage**

Run: `npm run dev`
Expected: Clicking the avatar-adjacent entries opens the profile and projects pages without breaking the home route.

---

### Task 3: Rework the existing article and tools pages to match the new glass system

**Files:**
- Modify: `src/pages/ArticlesPage.tsx`
- Modify: `src/pages/ToolsPage.tsx`
- Modify: `src/components/Layout/BackToGarden.tsx`
- Modify: `src/data/articles.json`
- Modify: `src/data/tools.json`
- Modify: `src/index.css`

- [ ] **Step 1: Replace the page backgrounds and cards with the shared glass treatment**

```tsx
<main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,#101826_0%,#0b1020_100%)] px-6 py-8">
  <div className="mx-auto max-w-5xl">
    ...
  </div>
</main>
```

- [ ] **Step 2: Update the article and tool item cards to use translucent panels**

```tsx
<article className="rounded-[1.75rem] border border-white/14 bg-white/8 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
  ...
</article>
```

- [ ] **Step 3: Replace the sample data with clearer real-content placeholders that match the intended structure**

```json
[
  {
    "id": "article-1",
    "title": "文章标题",
    "date": "2026-05-01",
    "summary": "文章摘要，说明主题和价值。",
    "url": "https://example.com"
  }
]
```

- [ ] **Step 4: Update the return link to match the new visual system**

```tsx
<Link
  to="/"
  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm text-white/78 backdrop-blur-2xl transition hover:bg-white/14 hover:text-white"
>
  ← 回到花园
</Link>
```

- [ ] **Step 5: Add base color variables and global backdrop defaults in the stylesheet**

```css
:root {
  color-scheme: dark;
}

body {
  min-height: 100vh;
  background: #0b1020;
  color: #fff;
}
```

- [ ] **Step 6: Run the app and verify the article and tools pages visually match the new system**

Run: `npm run dev`
Expected: The article and tools pages use the same glassmorphism language as the homepage and still remain readable.

---

### Task 4: Clean up project metadata, remove prototype-only artifacts, and verify the build

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Remove: `design-preview.html`
- Remove: `glass-preview.html`

- [ ] **Step 1: Rename the project package from the temporary init name to the real site name**

```json
{
  "name": "pingyu-s-garden"
}
```

- [ ] **Step 2: Update the README to explain the site structure and how to run it locally**

```md
## Pages

- `/` Home hub
- `/profile` Personal introduction
- `/projects` Resume-worthy projects
- `/articles` Published articles
- `/tools` Self-built tools
```

- [ ] **Step 3: Remove the temporary preview HTML files used for design comparison**

```bash
rm design-preview.html glass-preview.html
```

- [ ] **Step 4: Run a production build and fix any TypeScript or route errors**

Run: `npm run build`
Expected: Build succeeds with no route resolution or type errors.

- [ ] **Step 5: Do a final smoke test in the browser**

Run: `npm run dev`
Expected: Homepage loads, each entry route opens, and the pages share the new glass visual language.

