export type HomeSectionId = 'profile' | 'projects' | 'articles' | 'tools'

export interface HomeSectionConfig {
  id: HomeSectionId
  label: string
  emoji: string
  description: string
  path: string
  angle: number
}

export type ToolCategoryId = 'content-tools' | 'ai-workflow' | 'lark-automation' | 'skill' | 'script'

export type ToolCategoryFilterId = 'all' | ToolCategoryId

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

export interface Article {
  id: string
  title: string
  cover: string
  url: string
  seriesId: ArticleSeriesId
}

export type ArticleSeriesId = 'ai-talk' | 'ai-tools' | 'github-weekly'

export interface ArticleSeries {
  id: ArticleSeriesId
  label: string
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
