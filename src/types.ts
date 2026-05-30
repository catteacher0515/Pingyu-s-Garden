export type HomeSectionId = 'profile' | 'projects' | 'articles' | 'tools'

export interface HomeSectionConfig {
  id: HomeSectionId
  label: string
  emoji: string
  description: string
  path: string
  angle: number
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
  cover: string
  url: string
  series: ArticleSeries
}

export type ArticleSeries = 'AI 杂谈' | 'AI 工具箱' | '每周 GitHub 精选'

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
