import type { Tool, ToolCategoryFilterId } from '../types'

export type { ToolCategoryFilterId }

export interface ToolCategory {
  id: ToolCategoryFilterId
  label: string
}

export const toolCategories: ToolCategory[] = [
  { id: 'all', label: '全部' },
  { id: 'content-tools', label: '内容工具' },
  { id: 'study-tools', label: '学习工具' },
  { id: 'experiment-projects', label: '实验项目' },
  { id: 'ai-workflow', label: 'AI 工作流' },
  { id: 'lark-automation', label: '飞书自动化' },
  { id: 'skill', label: 'Skill' },
  { id: 'script', label: '脚本' },
]

export const tools: Tool[] = [
  {
    id: 'redbook-fixer',
    name: 'RedBook Fixer',
    description: '用于小红书文案的初筛并修改工作',
    categoryIds: ['content-tools'],
    status: '可访问',
    form: '网站',
    tags: ['小红书', '文案初筛', '发布前修改', '内容工具'],
    links: [
      {
        label: '打开工具',
        href: 'https://catteacher0515.github.io/RedBook-Fixer/',
        kind: 'external',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515/RedBook-Fixer',
        kind: 'github',
      },
    ],
  },
  {
    id: 'cet4-download',
    name: '四级真题工具站',
    description: '直接下载四级真题，无需再在评论区刷 ××',
    categoryIds: ['study-tools'],
    status: '可访问',
    form: '网站',
    tags: ['四六级', '大学生', '四级', '真题下载'],
    links: [
      {
        label: '打开工具',
        href: 'https://catteacher0515.github.io/cet4-download/',
        kind: 'external',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515/cet4-download',
        kind: 'github',
      },
    ],
  },
  {
    id: 'cet6-download',
    name: '六级真题工具站',
    description: '直接下载六级真题，无需再在评论区刷 ××',
    categoryIds: ['study-tools'],
    status: '可访问',
    form: '网站',
    tags: ['四六级', '大学生', '六级', '真题下载'],
    links: [
      {
        label: '打开工具',
        href: 'https://catteacher0515.github.io/cet6-download/',
        kind: 'external',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515/cet6-download',
        kind: 'github',
      },
    ],
  },
  {
    id: 'shadow-play',
    name: 'ShadowPlay / 云上皮影',
    description:
      '一个围绕唐山皮影文化做的小程序原型，重点在素材整理、文化内容呈现和轻量交互设计。',
    categoryIds: ['experiment-projects'],
    status: '已归档',
    form: '小程序原型',
    tags: ['小程序原型', '互动展示', '素材整理', '唐山皮影', '非遗文化'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515/ShadowPlay',
        kind: 'github',
      },
    ],
  },
]

export function filterToolsByCategory(categoryId: ToolCategoryFilterId) {
  if (categoryId === 'all') {
    return tools
  }

  return tools.filter((tool) => tool.categoryIds.includes(categoryId))
}
