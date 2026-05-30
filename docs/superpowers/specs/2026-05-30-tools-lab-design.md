# `/tools` 小工具实验室设计稿

## 状态

已于 2026-05-30 确认方向，可进入实施计划阶段。

## 背景

`/projects` 暂时不作为下一阶段重点，因为能写进简历的项目还没有完全成熟。

当前更适合优先补齐的是 `/tools`：用户已经做过一些小工具、脚本、飞书工作流、Hermes Agent 流程和 Skill。它们不一定都是完整产品，但更能真实反映当前的学习、自动化和内容工作流实践。

## 主参考

主参考是 AXY Space：

- `https://axyspace.org/`

参考点：

- Personal Lab 的定位
- Solo builder 的语气
- 小而实用的工具集合
- Focus / Stack / Mode 这类简短信息块
- Projects / Currently Building / GitHub 这种“实验室进展”结构

但 `/tools` 不能直接照搬 AXY Space 的视觉。它必须转译到当前 Pingyu's Garden 的 poster-style 体系中。

## 视觉规则

必须延续：

- 深黑 / 深棕黑背景
- 红棕强调色
- 暖纸色卡片
- poster-style 粗边框
- 轻微印刷质感
- 克制动效

不要使用：

- 文章页的大封面墙结构
- 蓝黑玻璃拟态
- SaaS dashboard 卡片
- 纯开源项目列表
- 过度商业化 landing page

## 页面定位

页面不是“项目页替代品”，而是“小工具实验室”。

它展示的是：

- 自己真的做过或正在使用的小工具
- 本地脚本
- 飞书工作流
- Hermes Agent + 脚本流程
- Skill
- 可以在线访问的小网站
- 未来可能公开成项目的实验

页面语气应该是：

- 真实
- 实用
- 仍在生长
- 不装成成熟产品库

## 页面结构

### 1. 顶部入口

保留 `回到花园`。

顶部采用居中的 lab masthead，不沿用文章页当前标题结构的完整样式，但可以共享红棕黑背景和暖纸质感。

推荐内容：

- 英文小字：`Tool Lab`
- 主标题：`小工具实验室`
- 一条短红棕分隔线

不写长副标题，避免变成说明型页面。

### 2. Lab Snapshot

在标题下方放三个简短信息块，参考 AXY Space 的 Focus / Stack / Mode。

推荐三块：

- `Focus`：AI + 内容工作流
- `Forms`：网站 / 脚本 / 飞书流 / Agent / Skill
- `Mode`：自用优先，慢慢公开

这三个块用于解释为什么这里会同时出现在线网站、脚本、飞书工作流和 Skill。

### 3. 分类筛选

一开始就预留分类能力。

初始分类：

- `全部`
- `内容工具`
- `AI 工作流`
- `飞书自动化`
- `Skill`
- `脚本`

默认选中 `全部`。

当前如果某些分类没有工具，不需要强行填内容。点击空分类时显示空态：

`这个分类还在整理中。`

### 4. 工具卡片

工具卡片不是文章页那种 16:9 封面卡。

每张卡片应更像“实验室工具标签卡”：

- 编号，例如 `01`
- 工具名
- 一句话用途说明
- 状态
- 形态
- 标签
- 链接区

推荐卡片信息结构：

```text
Tool · 01
工具名称

一句话说明它解决什么问题

状态：自用中
形态：飞书工作流

#AI #内容工作流 #自动化

GitHub / 在线访问 / 使用说明 / 内部工作流
```

### 5. 链接策略

工具不一定都有公开链接。

链接区需要支持多种状态：

- GitHub
- 在线访问
- 使用说明
- 文章介绍
- 内部工作流
- 暂无公开链接

如果没有公开链接，不要隐藏工具，也不要伪造链接。显示：

- `内部工作流`
- 或 `暂无公开链接`

### 6. 空态

如果当前分类没有工具，显示一个 poster-style 空态。

空态文案：

`这个分类还在整理中。`

不要显示：

- `还没有工具，快去种一个`
- `工具展示占位卡`

## 数据结构

建议将 `src/data/tools.json` 改为 `src/data/tools.ts`，便于类型约束和后续维护。

推荐类型：

```ts
export type ToolCategoryId =
  | 'content-tools'
  | 'ai-workflow'
  | 'lark-automation'
  | 'skill'
  | 'script'

export type ToolStatus = '自用中' | '可访问' | '实验中' | '已归档'

export type ToolForm = '网站' | '脚本' | '飞书工作流' | 'Hermes Agent' | 'Skill'

export interface ToolLink {
  label: string
  href?: string
  kind: 'external' | 'github' | 'note' | 'internal'
}

export interface Tool {
  id: string
  name: string
  description: string
  categoryIds: ToolCategoryId[]
  status: ToolStatus
  form: ToolForm
  tags: string[]
  links: ToolLink[]
}
```

分类配置：

```ts
export const toolCategories = [
  { id: 'all', label: '全部' },
  { id: 'content-tools', label: '内容工具' },
  { id: 'ai-workflow', label: 'AI 工作流' },
  { id: 'lark-automation', label: '飞书自动化' },
  { id: 'skill', label: 'Skill' },
  { id: 'script', label: '脚本' },
]
```

## 初版内容策略

如果用户还没有整理好真实工具清单，初版不伪造一批“成品工具”。

可选策略：

1. 保留少量真实已知工具。
2. 如果真实工具不足，`全部` 页面显示空态和维护入口说明。
3. 等用户整理工具后，再通过 `tools.ts` 补充。

不保留旧占位内容：

- `工具展示占位卡`
- `这里先放一个自用工具展示位`
- `https://github.com/example/tool-placeholder`

## 组件计划

建议拆成：

- `ToolsPage`
  - 页面容器
  - 顶部 lab masthead
  - Lab Snapshot
  - 分类状态
  - 工具网格
- `ToolCard`
  - 单个工具卡片
- `ToolCategoryFilter`
  - 分类按钮
- `ToolEmptyState`
  - 空分类状态
- `tools.ts`
  - 工具数据和分类配置

## 动效

只做轻量动效：

- 页面入场渐入
- 卡片轻微上浮
- 分类切换时卡片重新入场
- hover 时边框或投影变化

不做：

- 大幅滚动动画
- 自动轮播
- 复杂 3D
- 过度霓虹特效

## 测试

需要新增或更新 `/tools` 测试。

测试要求：

- `/tools` 可以正常渲染。
- 页面标题 `小工具实验室` 出现。
- `Tool Lab` 出现。
- 分类按钮出现：
  - `全部`
  - `内容工具`
  - `AI 工作流`
  - `飞书自动化`
  - `Skill`
  - `脚本`
- 默认选中 `全部`。
- 点击空分类时显示 `这个分类还在整理中。`
- 不再出现旧占位文案：
  - `工具展示占位卡`
  - `这里先放一个自用工具展示位`
  - `还没有工具，快去种一个`

## 非目标

这次不做：

- `/projects`
- `/articles`
- 首页导航改造
- 工具详情页
- 工具新增脚本
- 搜索
- 分页
- 后端管理系统

## 成功标准

完成后，第一次进入 `/tools` 的人应该能理解：

- 这是花萍雨的小工具实验室。
- 这里的内容不一定都是成熟项目，但都是真实工作流的一部分。
- 工具可以是网站、脚本、飞书工作流、Hermes Agent 或 Skill。
- 分类能力已经预留，后续工具变多时可以自然扩展。
- 页面视觉和首页、Profile、Articles 属于同一套站点语言，但不是文章页的重复版本。
