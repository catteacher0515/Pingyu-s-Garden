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

const toolEntries: Tool[] = [
  {
    id: 'redbook-fixer',
    priority: 800,
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
    id: 'softpage',
    priority: 900,
    name: 'SoftPage',
    description: '用于制作小红书图文和封面的内容工具。',
    categoryIds: ['content-tools'],
    status: '可访问',
    form: '网站',
    tags: ['小红书', '图文制作', '封面设计', '内容工具'],
    links: [
      {
        label: '打开工具',
        href: 'https://catteacher0515.github.io/SoftPage/',
        kind: 'external',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515/SoftPage',
        kind: 'github',
      },
    ],
  },
  {
    id: 'draftflow',
    priority: 200,
    name: 'DraftFlow',
    description:
      '正在建设中的多平台草稿分发桌面工具，目标是把 Markdown 内容转换并同步到不同内容平台草稿。',
    categoryIds: ['content-tools', 'ai-workflow'],
    status: '实验中',
    form: '桌面应用',
    tags: ['多平台分发', 'Markdown', '草稿同步', 'Electron', '内容工作流'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515/DraftFlow',
        kind: 'github',
      },
    ],
  },
  {
    id: 'publish-guard',
    priority: 1000,
    name: 'publish-guard / content-safety-pipeline',
    description:
      '一个已归档的小红书发布前内容安全流水线 Skill，串联 RedBook-Fixer、零克查词、小红书草稿和本地日志，用来验证文案过审处理的自动化流程。',
    categoryIds: ['content-tools', 'skill'],
    status: '已归档',
    form: 'Skill',
    tags: ['小红书', '内容安全', '敏感词筛查', '浏览器自动化', '发布前检查'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515/publish-guard',
        kind: 'github',
      },
    ],
  },
  {
    id: 'github-star-top',
    priority: 100,
    name: 'GitHub-Star-Top',
    description:
      '自动抓取每周热门 GitHub 项目，生成 AI 解读并同步到飞书选题池，用来发现优质仓库和支持内容选题。',
    categoryIds: ['ai-workflow', 'lark-automation', 'script'],
    status: '自用中',
    form: '脚本',
    tags: ['GitHub', '选题池', '飞书自动化', 'AI 解读', '内容选题'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515/GitHub-Star-Top',
        kind: 'github',
      },
    ],
  },
  {
    id: 'taskflow',
    priority: 150,
    name: 'TaskFlow Progress Visualizer',
    description:
      '本地模板化任务进度工具，用于把探索性任务拆成可见的小反馈和大反馈，并在任务失控时进入收束模式。',
    categoryIds: ['ai-workflow', 'script'],
    status: '自用中',
    form: '网站',
    tags: ['任务拆解', '进度可视化', '收束模式', '并行上限', 'GitHub 精选'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515/TaskFlow',
        kind: 'github',
      },
    ],
  },
  {
    id: 'hermes-gh-demo-tools',
    priority: 300,
    name: 'hermes-gh-demo-tools',
    description:
      '一组围绕 Hermes CLI 封装的 GitHub 仓库研究脚本，先抓取真实仓库事实，再生成是否值得体验和写作的判断卡。',
    categoryIds: ['ai-workflow', 'script'],
    status: '自用中',
    form: 'Hermes Agent',
    tags: ['GitHub', 'Hermes Agent', '仓库研究', 'Demo 判断', '内容选题'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515/hermes-gh-demo-tools',
        kind: 'github',
      },
    ],
  },
  {
    id: 'spring-boot-scaffold-skill',
    priority: 1100,
    name: 'spring-boot-scaffold-skill',
    description:
      '用于快速初始化 Spring Boot 后端项目的 Claude Code Skill，会生成统一响应、业务异常、全局异常、CORS 和接口文档等通用脚手架代码。',
    categoryIds: ['skill'],
    status: '已归档',
    form: 'Skill',
    tags: ['Spring Boot', '后端脚手架', 'Claude Code', '统一异常', '工程初始化'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515/spring-boot-scaffold-skill',
        kind: 'github',
      },
    ],
  },
  {
    id: 'cet4-download',
    priority: 500,
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
    priority: 600,
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
    id: 'wordtrace',
    priority: 700,
    name: 'WordTrace',
    description:
      '从四六级真题文本中提取、清洗和统计高频词，生成临时抱佛脚用的重点词书和本地学习页面。',
    categoryIds: ['study-tools', 'script'],
    status: '可访问',
    form: '网站',
    tags: ['四六级', '高频词', '真题词汇', '临时抱佛脚', '学习工具'],
    links: [
      {
        label: '打开工具',
        href: 'https://catteacher0515.github.io/WordTrace/',
        kind: 'external',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515/WordTrace',
        kind: 'github',
      },
    ],
  },
  {
    id: 'shadow-play',
    priority: 400,
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

export const tools: Tool[] = [...toolEntries].sort((a, b) => a.priority - b.priority)

export function filterToolsByCategory(categoryId: ToolCategoryFilterId) {
  if (categoryId === 'all') {
    return tools
  }

  return tools.filter((tool) => tool.categoryIds.includes(categoryId))
}
