# Profile About 页面实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标：** 把 `/profile` 从占位介绍页改造成与首页 poster 风一致的学习轨迹型 About 页面。

**架构：** Profile 内容先抽到 `src/data/profile.ts`，页面组件拆到 `src/components/Profile/` 下，`ProfilePage` 只负责组合数据和布局。使用现有 React Router、Tailwind CSS 和 `framer-motion`，不引入新依赖，不改首页与其他页面。

**技术栈：** React 19、React Router 7、TypeScript、Tailwind CSS 4、Framer Motion、Vitest、Testing Library。

---

## 文件结构

- 新建：`src/data/profile.ts`
  - 负责 `/profile` 页面全部结构化内容。
- 新建：`src/components/Profile/AboutHero.tsx`
  - 负责首屏自我介绍和身份贴纸。
- 新建：`src/components/Profile/FocusGrid.tsx`
  - 负责“我在探索什么”的四张卡片。
- 新建：`src/components/Profile/OutputMap.tsx`
  - 负责文章、项目、小工具三条站内输出路径。
- 新建：`src/components/Profile/ContactPanel.tsx`
  - 负责知乎、邮箱、GitHub 联系方式。
- 修改：`src/pages/ProfilePage.tsx`
  - 移除旧 `PageShell` 占位实现，组合 Profile 数据和新组件。
- 修改：`src/pages/DetailPages.test.tsx`
  - 更新 profile 测试，覆盖核心文案、身份贴纸、输出路径、联系模块、旧占位文案移除。

当前工作区已有未提交的 `src/components/Home/SideOrnaments.tsx` 和 `src/components/Home/SideOrnaments.test.tsx` 改动。实施本计划时不要修改、格式化、暂存或提交这两个文件。

---

## Task 1: 写 Profile 页面测试

**Files:**
- 修改：`src/pages/DetailPages.test.tsx`

- [ ] **Step 1: 替换 profile 测试为目标行为测试**

将 `src/pages/DetailPages.test.tsx` 中第一个测试替换为下面内容，保留 projects 测试不变：

```tsx
  it('renders the profile about page content and links', () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '关于花萍雨' })).toBeInTheDocument()
    expect(screen.getByText('我是花萍雨，一个还在探索中的开发者和内容创作者。')).toBeInTheDocument()
    expect(
      screen.getByText('我用 AI 和代码做一些小工具，记录自己如何学习、试错、搭建工作流，也把那些真正有用的开源项目介绍给更多人。'),
    ).toBeInTheDocument()

    expect(screen.getByText('大二下在读')).toBeInTheDocument()
    expect(screen.getByText('AI + Code')).toBeInTheDocument()
    expect(screen.getByText('学习记录')).toBeInTheDocument()
    expect(screen.getByText('小工具开发')).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: '我在探索什么' })).toBeInTheDocument()
    expect(screen.getByText('AI skill 与开源工具')).toBeInTheDocument()
    expect(screen.getByText('内容创作工作流')).toBeInTheDocument()
    expect(screen.getByText('用代码解决真实问题')).toBeInTheDocument()
    expect(screen.getByText('编程 / 数据学习记录')).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: '我如何输出' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /文章/ })).toHaveAttribute('href', '/articles')
    expect(screen.getByRole('link', { name: /项目/ })).toHaveAttribute('href', '/projects')
    expect(screen.getByRole('link', { name: /小工具/ })).toHaveAttribute('href', '/tools')

    expect(screen.getByRole('heading', { name: '联系我' })).toBeInTheDocument()
    expect(screen.getByText('知乎主页')).toBeInTheDocument()
    expect(screen.getByText('邮箱')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()

    expect(screen.queryByText('这里放我的自我介绍')).not.toBeInTheDocument()
    expect(screen.queryByText('可替换提示')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: '回到花园' })).toHaveAttribute('href', '/')
  })
```

- [ ] **Step 2: 运行测试确认失败**

Run:

```bash
npm test -- DetailPages.test.tsx --runInBand
```

Expected: 命令可能因为项目没有 `test` script 失败。如果失败信息是 `Missing script: "test"`，改用下一步命令。

Run:

```bash
npx vitest run src/pages/DetailPages.test.tsx
```

Expected: FAIL，至少包含找不到 `关于花萍雨` 或核心自我介绍文案。

- [ ] **Step 3: 提交失败测试**

```bash
git add src/pages/DetailPages.test.tsx
git commit -m "test: define profile about page behavior"
```

---

## Task 2: 新增 Profile 数据源

**Files:**
- 新建：`src/data/profile.ts`

- [ ] **Step 1: 创建数据文件**

创建 `src/data/profile.ts`：

```ts
export const profileIntro = {
  name: '花萍雨',
  title: '关于花萍雨',
  eyebrow: 'About / Digital Garden',
  description: [
    '我是花萍雨，一个还在探索中的开发者和内容创作者。',
    '我用 AI 和代码做一些小工具，记录自己如何学习、试错、搭建工作流，也把那些真正有用的开源项目介绍给更多人。',
  ],
}

export const identityTags = ['大二下在读', 'AI + Code', '学习记录', '小工具开发']

export const focusAreas = [
  {
    id: 'ai-open-source',
    title: 'AI skill 与开源工具',
    label: 'Tool notes',
    description: '试用有价值的 AI 工作流和开源项目，并说明它们到底能解决什么问题。',
  },
  {
    id: 'content-workflow',
    title: '内容创作工作流',
    label: 'Workflow',
    description: '把写作、发布、排版、选题发现等内容创作环节沉淀成可复用流程。',
  },
  {
    id: 'real-problems',
    title: '用代码解决真实问题',
    label: 'Build',
    description: '从自己的真实需求出发做小工具，而不是为了做 demo 而做 demo。',
  },
  {
    id: 'learning-log',
    title: '编程 / 数据学习记录',
    label: 'Learning',
    description: '记录编程、数据、SQL 和实际开发习惯的学习过程。',
  },
]

export const outputLinks = [
  {
    id: 'articles',
    title: '文章',
    path: '/articles',
    description: '记录学习笔记、项目试用和工具 walkthrough。',
  },
  {
    id: 'projects',
    title: '项目',
    path: '/projects',
    description: '收集更完整的作品，把一个问题做成可用的东西。',
  },
  {
    id: 'tools',
    title: '小工具',
    path: '/tools',
    description: '保存可复用的小能力和还在成长中的工具。',
  },
]

export const contactItems = [
  {
    id: 'zhihu',
    label: '知乎主页',
    value: '程序员花萍雨',
    href: 'https://www.zhihu.com/people/bai-tang-18-17-83/posts',
    hint: '最近的文章、项目记录和学习笔记。',
  },
  {
    id: 'email',
    label: '邮箱',
    value: '待补充',
    href: '',
    hint: '用于合作、交流或更正式的联系。',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: '待补充',
    href: '',
    hint: '后续可以放公开项目与代码仓库。',
  },
]
```

- [ ] **Step 2: 运行 TypeScript 检查**

```bash
npm run build
```

Expected: 仍然可能因为 Task 1 的失败测试不影响 build；build 应该 PASS。

- [ ] **Step 3: 提交数据源**

```bash
git add src/data/profile.ts
git commit -m "feat: add profile about data"
```

---

## Task 3: 实现 Profile 子组件

**Files:**
- 新建：`src/components/Profile/AboutHero.tsx`
- 新建：`src/components/Profile/FocusGrid.tsx`
- 新建：`src/components/Profile/OutputMap.tsx`
- 新建：`src/components/Profile/ContactPanel.tsx`

- [ ] **Step 1: 创建 `AboutHero`**

创建 `src/components/Profile/AboutHero.tsx`：

```tsx
import { motion } from 'framer-motion'

interface AboutHeroProps {
  eyebrow: string
  title: string
  description: string[]
  tags: string[]
}

export default function AboutHero({ eyebrow, title, description, tags }: AboutHeroProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
      <motion.article
        className="relative overflow-hidden rounded-[1.75rem] border border-[#8f3f2e]/70 bg-[#f4eadf] p-6 text-[#241312] shadow-[0_24px_80px_rgba(0,0,0,0.34)] sm:p-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="absolute right-5 top-5 h-14 w-14 rounded-full border border-[#b35d45]/45 bg-[#d76a4e]/12" />
        <p className="font-body text-xs uppercase tracking-[0.32em] text-[#8f3f2e]/72">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-none text-[#241312] sm:text-5xl">
          {title}
        </h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-[#3d2420]/82">
          {description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.article>

      <motion.aside
        className="rounded-[1.75rem] border border-[#efcfbf]/28 bg-[linear-gradient(180deg,rgba(244,234,223,0.12),rgba(215,106,78,0.06))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45, ease: 'easeOut' }}
        aria-label="身份贴纸"
      >
        <p className="font-body text-xs uppercase tracking-[0.3em] text-[#f4eadf]/54">identity notes</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {tags.map((tag, index) => (
            <span
              key={tag}
              className="block rotate-[-1deg] border border-[#8f3f2e]/70 bg-[#f4eadf] px-4 py-3 font-hand text-lg tracking-[0.04em] text-[#8f3f2e] shadow-[6px_7px_0_rgba(0,0,0,0.22)] even:rotate-[1deg]"
              style={{ marginLeft: index % 2 === 0 ? '0' : '0.75rem' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.aside>
    </section>
  )
}
```

- [ ] **Step 2: 创建 `FocusGrid`**

创建 `src/components/Profile/FocusGrid.tsx`：

```tsx
import { motion } from 'framer-motion'

interface FocusArea {
  id: string
  title: string
  label: string
  description: string
}

interface FocusGridProps {
  areas: FocusArea[]
}

export default function FocusGrid({ areas }: FocusGridProps) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.32em] text-[#ed7b62]/70">current focus</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#f4eadf]">我在探索什么</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {areas.map((area, index) => (
          <motion.article
            key={area.id}
            className="group rounded-[1.5rem] border border-[#efcfbf]/24 bg-[#f4eadf] p-5 text-[#241312] shadow-[0_18px_45px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-[#d76a4e]/80"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
          >
            <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8f3f2e]/60">{area.label}</p>
            <h3 className="mt-3 text-lg font-semibold text-[#241312]">{area.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#3d2420]/74">{area.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: 创建 `OutputMap`**

创建 `src/components/Profile/OutputMap.tsx`：

```tsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface OutputLink {
  id: string
  title: string
  path: string
  description: string
}

interface OutputMapProps {
  outputs: OutputLink[]
}

export default function OutputMap({ outputs }: OutputMapProps) {
  return (
    <section className="mt-12 rounded-[1.75rem] border border-[#efcfbf]/22 bg-[linear-gradient(180deg,rgba(244,234,223,0.1),rgba(215,106,78,0.04))] p-5 sm:p-6">
      <p className="font-body text-xs uppercase tracking-[0.32em] text-[#ed7b62]/70">output map</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-[#f4eadf]">我如何输出</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {outputs.map((output, index) => (
          <motion.div
            key={output.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
          >
            <Link
              to={output.path}
              className="block h-full rounded-[1.35rem] border border-[#efcfbf]/28 bg-[#130d0c] p-5 text-[#f4eadf] transition hover:-translate-y-1 hover:border-[#ed7b62]/70 hover:bg-[#1a1110]"
            >
              <span className="font-hand text-2xl text-[#ed7b62]">{output.title}</span>
              <p className="mt-3 text-sm leading-7 text-[#f4eadf]/68">{output.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: 创建 `ContactPanel`**

创建 `src/components/Profile/ContactPanel.tsx`：

```tsx
import { motion } from 'framer-motion'

interface ContactItem {
  id: string
  label: string
  value: string
  href: string
  hint: string
}

interface ContactPanelProps {
  contacts: ContactItem[]
}

export default function ContactPanel({ contacts }: ContactPanelProps) {
  return (
    <section className="mt-12 rounded-[1.75rem] border border-[#8f3f2e]/58 bg-[#f4eadf] p-5 text-[#241312] shadow-[0_22px_70px_rgba(0,0,0,0.28)] sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.32em] text-[#8f3f2e]/60">connect</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#241312]">联系我</h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-[#3d2420]/68">
          如果你也在折腾 AI、代码、写作或自己的小工具，可以从这里找到我。
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {contacts.map((item, index) => {
          const content = (
            <>
              <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8f3f2e]/58">{item.label}</p>
              <p className="mt-2 text-base font-semibold text-[#241312]">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-[#3d2420]/66">{item.hint}</p>
            </>
          )

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded-[1.25rem] border border-[#8f3f2e]/26 bg-[#fff7ed]/60 p-4 transition hover:-translate-y-1 hover:border-[#8f3f2e]/58"
                >
                  {content}
                </a>
              ) : (
                <div className="h-full rounded-[1.25rem] border border-[#8f3f2e]/18 bg-[#fff7ed]/42 p-4">
                  {content}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: 运行组件相关检查**

```bash
npm run build
```

Expected: PASS。

- [ ] **Step 6: 提交组件**

```bash
git add src/components/Profile/AboutHero.tsx src/components/Profile/FocusGrid.tsx src/components/Profile/OutputMap.tsx src/components/Profile/ContactPanel.tsx
git commit -m "feat: add profile about components"
```

---

## Task 4: 替换 ProfilePage 页面实现

**Files:**
- 修改：`src/pages/ProfilePage.tsx`

- [ ] **Step 1: 用 poster-style About 页面替换旧实现**

将 `src/pages/ProfilePage.tsx` 全文替换为：

```tsx
import { Link } from 'react-router-dom'
import AboutHero from '../components/Profile/AboutHero'
import ContactPanel from '../components/Profile/ContactPanel'
import FocusGrid from '../components/Profile/FocusGrid'
import OutputMap from '../components/Profile/OutputMap'
import {
  contactItems,
  focusAreas,
  identityTags,
  outputLinks,
  profileIntro,
} from '../data/profile'

export default function ProfilePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0b0b] px-6 py-8 text-[#f4eadf]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,106,78,0.12),transparent_24%),radial-gradient(circle_at_12%_22%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,#161111_0%,#0e0a0a_48%,#090707_100%)]" />
      <div className="pointer-events-none absolute left-0 top-20 hidden h-[72vh] w-16 border-y border-r border-[#efcfbf]/18 bg-[linear-gradient(180deg,rgba(244,234,223,0.08),rgba(215,106,78,0.04))] lg:block" />
      <div className="pointer-events-none absolute right-0 top-28 hidden h-[64vh] w-16 border-y border-l border-[#efcfbf]/18 bg-[linear-gradient(180deg,rgba(244,234,223,0.06),rgba(215,106,78,0.05))] lg:block" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-[#efcfbf]/22 bg-[#f4eadf]/8 px-4 py-2 text-sm text-[#f4eadf]/78 transition hover:border-[#ed7b62]/58 hover:text-[#fff2e4]"
        >
          <span aria-hidden="true">←</span>
          <span>回到花园</span>
        </Link>

        <div className="mt-10">
          <AboutHero
            eyebrow={profileIntro.eyebrow}
            title={profileIntro.title}
            description={profileIntro.description}
            tags={identityTags}
          />
          <FocusGrid areas={focusAreas} />
          <OutputMap outputs={outputLinks} />
          <ContactPanel contacts={contactItems} />
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: 运行失败测试确认是否转绿**

```bash
npx vitest run src/pages/DetailPages.test.tsx
```

Expected: PASS。

- [ ] **Step 3: 运行路由测试**

```bash
npx vitest run src/AppRoutes.test.tsx
```

Expected: 可能 FAIL，因为旧路由测试还期待 heading 为 `个人介绍`。

- [ ] **Step 4: 如路由测试失败，更新期望标题**

如果 `src/AppRoutes.test.tsx` 中 profile 路由测试仍查找 `个人介绍`，将这一行：

```tsx
expect(await screen.findByRole('heading', { name: '个人介绍' })).toBeInTheDocument()
```

替换为：

```tsx
expect(await screen.findByRole('heading', { name: '关于花萍雨' })).toBeInTheDocument()
```

- [ ] **Step 5: 运行所有单元测试**

```bash
npx vitest run
```

Expected: PASS。

- [ ] **Step 6: 运行 build**

```bash
npm run build
```

Expected: PASS。

- [ ] **Step 7: 提交页面接线**

```bash
git add src/pages/ProfilePage.tsx src/AppRoutes.test.tsx
git commit -m "feat: build profile about page"
```

---

## Task 5: 浏览器验证与收尾

**Files:**
- 不要求新增文件；如浏览器验证发现布局问题，只修改 Task 3 或 Task 4 涉及的 Profile 文件。

- [ ] **Step 1: 启动开发服务器**

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite 输出本地 URL，例如 `http://127.0.0.1:5173/`。如果 5173 被占用，使用输出中的实际端口。

- [ ] **Step 2: 用浏览器打开 `/profile`**

使用 Browser 插件或本地浏览器打开：

```text
http://127.0.0.1:5173/profile
```

Expected:

- 页面不是蓝黑玻璃风。
- 背景延续首页深黑 / 深棕黑舞台感。
- 主内容有暖纸色、红棕强调、贴纸感身份标签。
- 首屏能看到 `关于花萍雨` 和核心自我介绍。
- 输出路径和联系模块不会互相遮挡。

- [ ] **Step 3: 检查移动端宽度**

在浏览器中切到移动视口，或使用截图工具检查约 390px 宽。

Expected:

- 身份贴纸不溢出。
- 四张 focus 卡片变为单列。
- Output Map 和 Contact Panel 单列显示。
- 文本没有互相覆盖。

- [ ] **Step 4: 停止开发服务器**

如果 dev server 在前台运行，使用 `Ctrl+C` 停止。

- [ ] **Step 5: 查看最终 diff**

```bash
git status --short
git diff -- src/data/profile.ts src/components/Profile src/pages/ProfilePage.tsx src/pages/DetailPages.test.tsx src/AppRoutes.test.tsx
```

Expected: 只包含 Profile 相关改动。`src/components/Home/SideOrnaments.tsx` 和 `src/components/Home/SideOrnaments.test.tsx` 仍然不应被提交。

- [ ] **Step 6: 如有浏览器修复，提交收尾**

如果 Step 2 或 Step 3 修改了 Profile 相关文件：

```bash
git add src/data/profile.ts src/components/Profile src/pages/ProfilePage.tsx src/pages/DetailPages.test.tsx src/AppRoutes.test.tsx
git commit -m "fix: polish profile about layout"
```

如果没有修改，不需要提交。

---

## 自检

- Spec 覆盖：Task 1 覆盖测试要求；Task 2 覆盖数据结构；Task 3 覆盖四个组件；Task 4 覆盖 poster-style 页面组合；Task 5 覆盖视觉和移动端验证。
- 范围检查：计划只改 `/profile`、profile 数据、profile 组件和相关测试，不改首页和其他详情页实现。
- 占位检查：计划中没有未定义的 TBD/TODO；邮箱和 GitHub 的 `待补充` 是 spec 允许的明确可替换值。
- 类型一致性：`profile.ts` 导出的 `profileIntro`、`identityTags`、`focusAreas`、`outputLinks`、`contactItems` 与组件 props 和 `ProfilePage` 导入一致。
