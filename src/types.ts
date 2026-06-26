export type HomeSectionId = 'profile' | 'articles' | 'tools'

export interface HomeSectionConfig {
  id: HomeSectionId
  label: string
  emoji: string
  description: string
  path: string
  angle: number
}

export type ToolCategoryId =
  | 'content-tools'
  | 'study-tools'
  | 'experiment-projects'
  | 'ai-workflow'
  | 'lark-automation'
  | 'skill'
  | 'script'

export type ToolCategoryFilterId = 'all' | ToolCategoryId

export type ToolStatus = '自用中' | '可访问' | '实验中' | '已归档'

export type ToolForm =
  | '网站'
  | '脚本'
  | '飞书工作流'
  | 'Hermes Agent'
  | 'Skill'
  | '小程序原型'
  | '桌面应用'

export interface ToolLink {
  label: string
  href?: string
  kind: 'external' | 'github' | 'note' | 'internal'
}

export interface Tool {
  id: string
  priority: number
  name: string
  description: string
  categoryIds: ToolCategoryId[]
  status: ToolStatus
  form: ToolForm
  tags: string[]
  links: ToolLink[]
}

export interface Article {
  id: string
  title: string
  cover: string
  url: string
  seriesId: ArticleSeriesId
}

export type ArticleSeriesId = 'ai-talk' | 'ai-tools' | 'github-weekly' | 'personal-tools'

export interface ArticleSeries {
  id: ArticleSeriesId
  label: string
}

export type ProjectLinkKind = 'external' | 'github' | 'article' | 'demo' | 'internal'

export type ProjectStatus = '规划中' | '进行中' | '已发布' | '已归档'

export interface ProjectLink {
  label: string
  href?: string
  kind: ProjectLinkKind
}

export type ProjectSectionId = 'problem' | 'solution' | 'highlights' | 'tech-stack' | 'results' | 'diagram'

export interface ProjectSection {
  id: ProjectSectionId
  title: string
  body: string
  items?: string[]
}

export interface Project {
  id: string
  rank: number
  title: string
  year: string
  status: ProjectStatus
  positioning: string
  problem: string
  sections: ProjectSection[]
  role?: string
  summary?: string
  outcome?: string
  tags: string[]
  links: ProjectLink[]
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
