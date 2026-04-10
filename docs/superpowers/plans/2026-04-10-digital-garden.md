# 花萍雨的数字花园 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个以同心圆花园地图为首页的个人作品集网站，花朵是导航入口，点击探索内容。

**Architecture:** React SPA，首页是 SVG/CSS 同心圆花园地图，花朵节点可点击；记录/想法板块原地弹出卡片，工具/文章板块跳转独立列表页。内容存储在本地 JSON 文件中，Framer Motion 驱动所有动画。

**Tech Stack:** React 18 + Vite, TypeScript, Tailwind CSS, Framer Motion, React Router v6

---

## 文件结构

```
花萍雨的数字花园/
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── types.ts                          # 所有共享类型定义
│   ├── data/
│   │   ├── tools.json                    # 工具数据
│   │   ├── articles.json                 # 文章数据
│   │   ├── notes.json                    # 记录数据
│   │   └── ideas.json                    # 想法数据
│   ├── components/
│   │   ├── Garden/
│   │   │   ├── GardenMap.tsx             # 同心圆布局容器
│   │   │   ├── FlowerNode.tsx            # 单个花朵节点（含悬停/点击动画）
│   │   │   └── CenterNode.tsx            # 中心节点（花萍雨本人）
│   │   ├── Overlay/
│   │   │   └── ContentCard.tsx           # 原地展开卡片（记录/想法用）
│   │   └── Layout/
│   │       └── BackToGarden.tsx          # 返回花园导航条
│   └── pages/
│       ├── HomePage.tsx                  # 首页（花园地图）
│       ├── ToolsPage.tsx                 # 工具列表页
│       ├── ArticlesPage.tsx              # 文章列表页
│       └── NotFoundPage.tsx              # 404 页
```

---

## Task 1: 初始化项目

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.ts`
- Create: `tsconfig.json`
- Create: `index.html`
- Create: `src/main.tsx`

- [ ] **Step 1: 初始化 Vite + React + TypeScript 项目**

```bash
cd "C:\dev_workspace\Pingyu's Garden"
npm create vite@latest . -- --template react-ts
```

预期输出：生成 `package.json`、`vite.config.ts`、`src/` 等文件。

- [ ] **Step 2: 安装依赖**

```bash
npm install
npm install framer-motion react-router-dom
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: 配置 Tailwind**

编辑 `vite.config.ts`：

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

在 `src/index.css` 顶部替换为：

```css
@import "tailwindcss";
```

- [ ] **Step 4: 清理默认文件**

删除 `src/App.css`，将 `src/App.tsx` 替换为：

```tsx
export default function App() {
  return <div className="min-h-screen bg-green-50">花萍雨的数字花园</div>
}
```

- [ ] **Step 5: 验证项目启动**

```bash
npm run dev
```

预期：浏览器打开后显示"花萍雨的数字花园"文字，背景为浅绿色。

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "feat: 初始化项目，React + Vite + Tailwind + Framer Motion"
```

---

## Task 2: 定义类型和数据

**Files:**
- Create: `src/types.ts`
- Create: `src/data/tools.json`
- Create: `src/data/articles.json`
- Create: `src/data/notes.json`
- Create: `src/data/ideas.json`

- [ ] **Step 1: 创建类型定义文件**

创建 `src/types.ts`：

```ts
export type FlowerType = 'tools' | 'articles' | 'notes' | 'ideas'
export type ClickBehavior = 'navigate' | 'expand'

export interface FlowerConfig {
  id: FlowerType
  label: string
  emoji: string
  behavior: ClickBehavior
  angle: number        // 在同心圆上的角度（度），0 = 正上方
  color: string        // Tailwind bg 色，用于卡片背景
}

export interface Tool {
  id: string
  name: string
  description: string
  githubUrl: string
  tags: string[]
}

export interface Article {
  id: string
  title: string
  date: string         // ISO 格式 "2026-04-10"
  summary: string
  url: string
}

export interface Note {
  id: string
  content: string
  date: string
}

export interface Idea {
  id: string
  content: string
  date: string
}
```

- [ ] **Step 2: 创建示例数据**

创建 `src/data/tools.json`：

```json
[
  {
    "id": "tool-1",
    "name": "示例小工具",
    "description": "一个好玩的命令行小工具，用来做某件有趣的事情。",
    "githubUrl": "https://github.com/花萍雨/example-tool",
    "tags": ["Python", "CLI"]
  }
]
```

创建 `src/data/articles.json`：

```json
[
  {
    "id": "article-1",
    "title": "如何用 Python 做一个好玩的小工具",
    "date": "2026-04-01",
    "summary": "从零开始，一步步做一个有趣的命令行工具。",
    "url": "https://example.com/article-1"
  }
]
```

创建 `src/data/notes.json`：

```json
[
  {
    "id": "note-1",
    "content": "今天学了一个新东西，感觉很有意思。",
    "date": "2026-04-10"
  }
]
```

创建 `src/data/ideas.json`：

```json
[
  {
    "id": "idea-1",
    "content": "可以做一个自动生成花园地图的工具？",
    "date": "2026-04-10"
  }
]
```

- [ ] **Step 3: Commit**

```bash
git add src/types.ts src/data/
git commit -m "feat: 添加类型定义和示例数据"
```

---

## Task 3: 花园地图核心组件

**Files:**
- Create: `src/components/Garden/CenterNode.tsx`
- Create: `src/components/Garden/FlowerNode.tsx`
- Create: `src/components/Garden/GardenMap.tsx`

- [ ] **Step 1: 创建中心节点组件**

创建 `src/components/Garden/CenterNode.tsx`：

```tsx
import { motion } from 'framer-motion'

export default function CenterNode() {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-5xl mb-1 select-none">🌸</div>
      <div className="text-sm font-bold text-gray-700 whitespace-nowrap">花萍雨</div>
      <div className="text-xs text-gray-400 mt-0.5">05后 · 开发</div>
    </motion.div>
  )
}
```

- [ ] **Step 2: 创建花朵节点组件**

创建 `src/components/Garden/FlowerNode.tsx`：

```tsx
import { motion } from 'framer-motion'
import { FlowerConfig } from '../../types'

interface FlowerNodeProps {
  flower: FlowerConfig
  radius: number          // 距中心的像素距离
  containerSize: number   // 容器宽高（正方形）
  onClick: (flower: FlowerConfig) => void
  index: number           // 用于入场动画延迟
}

export default function FlowerNode({
  flower,
  radius,
  containerSize,
  onClick,
  index,
}: FlowerNodeProps) {
  const center = containerSize / 2
  const rad = (flower.angle - 90) * (Math.PI / 180) // 0度=正上方
  const x = center + radius * Math.cos(rad)
  const y = center + radius * Math.sin(rad)

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer select-none"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(flower)}
    >
      <div className="text-4xl drop-shadow-md">{flower.emoji}</div>
      <div className="text-xs text-gray-600 mt-1 bg-white/80 rounded px-1.5 py-0.5 whitespace-nowrap">
        {flower.label}
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 3: 创建花园地图容器**

创建 `src/components/Garden/GardenMap.tsx`：

```tsx
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FlowerConfig } from '../../types'
import CenterNode from './CenterNode'
import FlowerNode from './FlowerNode'

const FLOWERS: FlowerConfig[] = [
  { id: 'tools',    label: '小工具', emoji: '🛠️', behavior: 'navigate', angle: 0,   color: 'bg-green-50' },
  { id: 'articles', label: '文章',   emoji: '📝', behavior: 'navigate', angle: 90,  color: 'bg-yellow-50' },
  { id: 'notes',    label: '记录',   emoji: '🍃', behavior: 'expand',   angle: 180, color: 'bg-purple-50' },
  { id: 'ideas',    label: '想法',   emoji: '🍄', behavior: 'expand',   angle: 270, color: 'bg-blue-50' },
]

const SIZE = 360      // 容器尺寸 px
const RADIUS = 130    // 花朵距中心距离 px

interface GardenMapProps {
  onExpand: (flower: FlowerConfig) => void
}

export default function GardenMap({ onExpand }: GardenMapProps) {
  const navigate = useNavigate()

  function handleFlowerClick(flower: FlowerConfig) {
    if (flower.behavior === 'navigate') {
      navigate(`/${flower.id}`)
    } else {
      onExpand(flower)
    }
  }

  return (
    <div
      className="relative rounded-full"
      style={{
        width: SIZE,
        height: SIZE,
        background: 'radial-gradient(circle, #f0faf0 0%, #e8f5e9 50%, #dcedc8 100%)',
      }}
    >
      {/* 同心圆装饰线 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-green-300/60"
        style={{ width: RADIUS * 2 + 60, height: RADIUS * 2 + 60 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-green-200/40"
        style={{ width: RADIUS * 2 + 120, height: RADIUS * 2 + 120 }} />

      <CenterNode />

      {FLOWERS.map((flower, i) => (
        <FlowerNode
          key={flower.id}
          flower={flower}
          radius={RADIUS}
          containerSize={SIZE}
          onClick={handleFlowerClick}
          index={i}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Garden/
git commit -m "feat: 花园地图核心组件（CenterNode, FlowerNode, GardenMap）"
```

---

## Task 4: 原地展开卡片（记录/想法）

**Files:**
- Create: `src/components/Overlay/ContentCard.tsx`

- [ ] **Step 1: 创建 ContentCard 组件**

创建 `src/components/Overlay/ContentCard.tsx`：

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { FlowerConfig, Note, Idea } from '../../types'

interface ContentCardProps {
  flower: FlowerConfig | null
  data: Note[] | Idea[]
  onClose: () => void
}

export default function ContentCard({ flower, data, onClose }: ContentCardProps) {
  return (
    <AnimatePresence>
      {flower && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 卡片 */}
          <motion.div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-80 max-h-96 overflow-y-auto rounded-2xl shadow-xl p-5 ${flower.color}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* 标题 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{flower.emoji}</span>
                <span className="font-bold text-gray-700">{flower.label}</span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>

            {/* 内容列表 */}
            <div className="space-y-3">
              {data.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">还没有内容，快来种下第一颗种子 🌱</p>
              ) : (
                data.map((item) => (
                  <div key={item.id} className="bg-white/70 rounded-xl p-3">
                    <p className="text-sm text-gray-700">{item.content}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Overlay/
git commit -m "feat: 原地展开卡片组件 ContentCard"
```

---

## Task 5: 首页组装

**Files:**
- Create: `src/pages/HomePage.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: 创建首页**

创建 `src/pages/HomePage.tsx`：

```tsx
import { useState } from 'react'
import GardenMap from '../components/Garden/GardenMap'
import ContentCard from '../components/Overlay/ContentCard'
import { FlowerConfig, Note, Idea } from '../types'
import notesData from '../data/notes.json'
import ideasData from '../data/ideas.json'

const expandData: Record<string, Note[] | Idea[]> = {
  notes: notesData as Note[],
  ideas: ideasData as Idea[],
}

export default function HomePage() {
  const [activeFlower, setActiveFlower] = useState<FlowerConfig | null>(null)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 50%, #e0f7fa 100%)' }}
    >
      {/* 标题 */}
      <h1 className="text-2xl font-bold text-gray-600 mb-8 tracking-wide">
        花萍雨的数字花园
      </h1>

      <GardenMap onExpand={setActiveFlower} />

      <ContentCard
        flower={activeFlower}
        data={activeFlower ? (expandData[activeFlower.id] ?? []) : []}
        onClose={() => setActiveFlower(null)}
      />

      {/* 底部提示 */}
      <p className="mt-8 text-xs text-gray-400">点击花朵，探索花园 🌱</p>
    </div>
  )
}
```

- [ ] **Step 2: 配置路由，更新 App.tsx**

替换 `src/App.tsx`：

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ToolsPage from './pages/ToolsPage'
import ArticlesPage from './pages/ArticlesPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 3: 验证首页渲染**

```bash
npm run dev
```

预期：首页显示花园地图，4 朵花朵均匀分布，点击 🍃/🍄 弹出卡片，点击空白处关闭。

- [ ] **Step 4: Commit**

```bash
git add src/pages/HomePage.tsx src/App.tsx
git commit -m "feat: 首页组装完成，花园地图 + 原地展开卡片"
```

---

## Task 6: 工具列表页

**Files:**
- Create: `src/pages/ToolsPage.tsx`
- Create: `src/components/Layout/BackToGarden.tsx`

- [ ] **Step 1: 创建返回导航组件**

创建 `src/components/Layout/BackToGarden.tsx`：

```tsx
import { Link } from 'react-router-dom'

export default function BackToGarden() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-1.5 text-sm text-green-600 hover:text-green-800 transition-colors"
    >
      <span>←</span>
      <span>回到花园</span>
    </Link>
  )
}
```

- [ ] **Step 2: 创建工具列表页**

创建 `src/pages/ToolsPage.tsx`：

```tsx
import { motion } from 'framer-motion'
import BackToGarden from '../components/Layout/BackToGarden'
import toolsData from '../data/tools.json'
import { Tool } from '../types'

const tools = toolsData as Tool[]

export default function ToolsPage() {
  return (
    <div className="min-h-screen px-6 py-8 max-w-2xl mx-auto"
      style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)' }}
    >
      <BackToGarden />

      <div className="mt-6 mb-8 flex items-center gap-3">
        <span className="text-4xl">🛠️</span>
        <h1 className="text-2xl font-bold text-gray-700">小工具</h1>
      </div>

      <div className="space-y-4">
        {tools.length === 0 ? (
          <p className="text-gray-400 text-center py-12">还没有工具，快去种一个 🌱</p>
        ) : (
          tools.map((tool, i) => (
            <motion.div
              key={tool.id}
              className="bg-white/80 rounded-2xl p-5 shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-gray-800">{tool.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={tool.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs bg-gray-800 text-white rounded-lg px-3 py-1.5 hover:bg-gray-700 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: 验证工具页**

```bash
npm run dev
```

预期：点击首页 🛠️ 跳转到工具列表页，显示示例工具卡片，点击"← 回到花园"返回首页。

- [ ] **Step 4: Commit**

```bash
git add src/pages/ToolsPage.tsx src/components/Layout/BackToGarden.tsx
git commit -m "feat: 工具列表页 + 返回花园导航"
```

---

## Task 7: 文章列表页

**Files:**
- Create: `src/pages/ArticlesPage.tsx`

- [ ] **Step 1: 创建文章列表页**

创建 `src/pages/ArticlesPage.tsx`：

```tsx
import { motion } from 'framer-motion'
import BackToGarden from '../components/Layout/BackToGarden'
import articlesData from '../data/articles.json'
import { Article } from '../types'

const articles = articlesData as Article[]

export default function ArticlesPage() {
  return (
    <div className="min-h-screen px-6 py-8 max-w-2xl mx-auto"
      style={{ background: 'linear-gradient(135deg, #fffde7 0%, #f1f8e9 100%)' }}
    >
      <BackToGarden />

      <div className="mt-6 mb-8 flex items-center gap-3">
        <span className="text-4xl">📝</span>
        <h1 className="text-2xl font-bold text-gray-700">文章</h1>
      </div>

      <div className="space-y-4">
        {articles.length === 0 ? (
          <p className="text-gray-400 text-center py-12">还没有文章，快去写一篇 🌱</p>
        ) : (
          articles.map((article, i) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-gray-800">{article.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{article.summary}</p>
                </div>
                <span className="shrink-0 text-xs text-gray-400 whitespace-nowrap">{article.date}</span>
              </div>
            </motion.a>
          ))
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 验证文章页**

```bash
npm run dev
```

预期：点击首页 📝 跳转到文章列表页，显示示例文章卡片，点击卡片在新标签页打开链接。

- [ ] **Step 3: Commit**

```bash
git add src/pages/ArticlesPage.tsx
git commit -m "feat: 文章列表页"
```

---

## Task 8: 404 页面 + 收尾

**Files:**
- Create: `src/pages/NotFoundPage.tsx`
- Modify: `index.html`（更新页面标题）

- [ ] **Step 1: 创建 404 页面**

创建 `src/pages/NotFoundPage.tsx`：

```tsx
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #e0f7fa 100%)' }}
    >
      <div className="text-6xl">🍂</div>
      <h1 className="text-xl font-bold text-gray-600">这片花园还没有种上花</h1>
      <Link to="/" className="text-sm text-green-600 hover:text-green-800 transition-colors">
        ← 回到花园
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: 更新页面标题**

编辑 `index.html`，将 `<title>` 改为：

```html
<title>花萍雨的数字花园</title>
```

- [ ] **Step 3: 全量验证**

```bash
npm run dev
```

逐一验证：
- 首页花园地图正常渲染，入场动画流畅
- 点击 🛠️ → 跳转工具页，← 回到花园可用
- 点击 📝 → 跳转文章页，← 回到花园可用
- 点击 🍃 → 原地弹出记录卡片，点击空白处关闭
- 点击 🍄 → 原地弹出想法卡片，× 按钮可关闭
- 访问 `/不存在的路径` → 显示 404 页面

- [ ] **Step 4: 构建验证**

```bash
npm run build
```

预期：`dist/` 目录生成，无 TypeScript 错误。

- [ ] **Step 5: 最终 Commit**

```bash
git add .
git commit -m "feat: 404页面 + 页面标题，数字花园 MVP 完成"
```

---

## 部署（可选）

部署到 Vercel：

```bash
npm install -g vercel
vercel
```

按提示操作，选择 Vite 框架，部署完成后获得公开 URL。
