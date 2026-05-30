import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { articles } from '../data/articles'
import ArticlesPage from './ArticlesPage'

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

    expect(articles).toHaveLength(6)

    for (const [index, article] of articles.entries()) {
      const link = screen.getByRole('link', { name: new RegExp(article.title) })
      expect(link).toHaveAttribute('href', article.url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')

      expect(screen.getByText(String(index + 1).padStart(2, '0'))).toBeInTheDocument()
      expect(screen.getAllByText('知乎文章')).toHaveLength(articles.length)
      expect(screen.getAllByText('↗')).toHaveLength(articles.length)

      const image = screen.getByRole('img', { name: `${article.title} 封面` })
      expect(image).toHaveAttribute('src', article.cover)
    }
  })
})
