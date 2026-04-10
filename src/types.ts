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
