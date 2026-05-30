import { describe, expect, it } from 'vitest'
import {
  buildArticleEntry,
  buildSeriesEntry,
  insertArticleEntry,
  insertSeriesEntry,
  insertSeriesIdType,
  isCoverFileName,
  isSlug,
  parseArticleSeries,
  slugify,
} from './add-article.mjs'

describe('add-article helpers', () => {
  it('creates stable lowercase slugs', () => {
    expect(slugify('GitHub 每周精选 2026 W21')).toBe('github-2026-w21')
    expect(slugify('')).toBe('')
  })

  it('validates ids and cover file names before writing files', () => {
    expect(isSlug('github-w21')).toBe(true)
    expect(isSlug('啊？')).toBe(false)
    expect(isSlug('GitHub W21')).toBe(false)

    expect(isCoverFileName('github-w21.png')).toBe(true)
    expect(isCoverFileName('对')).toBe(false)
    expect(isCoverFileName('封面.png')).toBe(false)
  })

  it('parses article series definitions from the data file', () => {
    const source = `
export const articleSeries = [
  { id: 'ai-talk', label: 'AI 杂谈' },
  { id: 'ai-tools', label: 'AI 工具箱' },
]
`

    expect(parseArticleSeries(source)).toEqual([
      { id: 'ai-talk', label: 'AI 杂谈' },
      { id: 'ai-tools', label: 'AI 工具箱' },
    ])
  })

  it('inserts a new article at the top of the articles array', () => {
    const source = `
export const articles: Article[] = [
  {
    id: 'old',
    title: 'Old',
    cover: '/articles/old.png',
    url: 'https://example.com/old',
    seriesId: 'ai-tools',
  },
]
`
    const entry = buildArticleEntry({
      id: 'new',
      title: 'New',
      cover: '/articles/new.png',
      url: 'https://example.com/new',
      seriesId: 'ai-talk',
    })

    const updated = insertArticleEntry(source, entry)

    expect(updated.indexOf("id: 'new'")).toBeLessThan(updated.indexOf("id: 'old'"))
  })

  it('adds new series to the data file and type union', () => {
    const dataSource = `
export const articleSeries: ArticleSeries[] = [
  { id: 'ai-talk', label: 'AI 杂谈' },
]
`
    const typeSource = `export type ArticleSeriesId = 'ai-talk' | 'ai-tools'`

    expect(insertSeriesEntry(dataSource, buildSeriesEntry('content-workflow', '内容工作流'))).toContain(
      "{ id: 'content-workflow', label: '内容工作流' },",
    )
    expect(insertSeriesIdType(typeSource, 'content-workflow')).toContain("'content-workflow'")
  })
})
