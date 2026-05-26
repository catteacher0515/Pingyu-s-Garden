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
