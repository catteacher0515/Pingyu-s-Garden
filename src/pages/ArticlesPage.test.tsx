import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { articleSeries, articles, getArticleSeriesLabel } from '../data/articles'
import ArticlesPage from './ArticlesPage'

afterEach(() => {
  cleanup()
})

describe('ArticlesPage', () => {
  it('renders a poster-style cover wall of Zhihu articles', () => {
    render(
      <MemoryRouter>
        <ArticlesPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '文章' })).toBeInTheDocument()
    expect(screen.queryByText(/学习、工具试用|工作流/)).not.toBeInTheDocument()
    expect(screen.queryByText('还没有文章，快去写一篇')).not.toBeInTheDocument()
    expect(screen.queryByText('文章标题占位')).not.toBeInTheDocument()

    expect(articles).toHaveLength(13)
    expect(articleSeries.map((series) => series.id)).toEqual(['ai-talk', 'ai-tools', 'github-weekly', 'personal-tools'])
    expect(screen.getByRole('button', { name: '全部' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'AI 杂谈' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'AI 工具箱' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '每周 GitHub 精选' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '自制小东西' })).toBeInTheDocument()

    for (const [index, article] of articles.entries()) {
      const link = screen.getByRole('link', { name: new RegExp(article.title) })
      expect(link).toHaveAttribute('href', article.url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')

      expect(screen.getByText(String(index + 1).padStart(2, '0'))).toBeInTheDocument()
      expect(screen.getAllByText(getArticleSeriesLabel(article.seriesId)).length).toBeGreaterThan(0)
      expect(screen.getAllByText('↗')).toHaveLength(articles.length)

      const image = screen.getByRole('img', { name: `${article.title} 封面` })
      expect(image).toHaveAttribute('src', article.cover)
    }
  })

  it('filters the cover wall by article series', () => {
    render(
      <MemoryRouter>
        <ArticlesPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: '每周 GitHub 精选' }))

    expect(screen.getByRole('button', { name: '每周 GitHub 精选' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '自制小东西' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'AI 工具箱' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'GitHub 每周精选｜2026 W21' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'GitHub 每周精选｜2026 W25' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '本周 GitHub 留档｜2026 W20' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '微信读书 skill 上手后，我终于不用在书海里乱翻了' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '从 Windows 换到 Mac 一个月后...' })).not.toBeInTheDocument()
    expect(screen.getAllByText('每周 GitHub 精选')).toHaveLength(6)
  })
})
