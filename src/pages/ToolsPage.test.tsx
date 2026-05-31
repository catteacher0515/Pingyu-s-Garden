import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import ToolsPage from './ToolsPage'

afterEach(() => {
  cleanup()
})

describe('ToolsPage', () => {
  it('renders the tool lab shell and category filters', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Tool Lab')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '小工具实验室' })).toBeInTheDocument()
    expect(screen.getByText('AI + 内容工作流')).toBeInTheDocument()
    expect(screen.getByText('网站 / 脚本 / 飞书流 / Agent / Skill')).toBeInTheDocument()
    expect(screen.getByText('自用优先，慢慢公开')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: '全部' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '内容工具' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'AI 工作流' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '飞书自动化' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Skill' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '脚本' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '学习工具' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '实验项目' })).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: 'RedBook Fixer' })).toBeInTheDocument()
    expect(screen.getByText('用于小红书文案的初筛并修改工作')).toBeInTheDocument()
    expect(screen.getAllByText('可访问')).toHaveLength(3)
    expect(screen.getAllByText('网站')).toHaveLength(3)
    expect(screen.getByRole('heading', { name: 'ShadowPlay / 云上皮影' })).toBeInTheDocument()
    expect(
      screen.getByText('一个围绕唐山皮影文化做的小程序原型，重点在素材整理、文化内容呈现和轻量交互设计。'),
    ).toBeInTheDocument()
    expect(screen.getByText('已归档')).toBeInTheDocument()
    expect(screen.getByText('小程序原型')).toBeInTheDocument()
    const toolLinks = screen.getAllByRole('link', { name: '打开工具' })
    const githubLinks = screen.getAllByRole('link', { name: 'GitHub' })

    expect(toolLinks).toHaveLength(3)
    expect(githubLinks).toHaveLength(4)
    expect(toolLinks[0]).toHaveAttribute(
      'href',
      'https://catteacher0515.github.io/RedBook-Fixer/',
    )
    expect(githubLinks[0]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/RedBook-Fixer',
    )
    expect(screen.getByRole('heading', { name: '四级真题工具站' })).toBeInTheDocument()
    expect(screen.getByText('直接下载四级真题，无需再在评论区刷 ××')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '六级真题工具站' })).toBeInTheDocument()
    expect(screen.getByText('直接下载六级真题，无需再在评论区刷 ××')).toBeInTheDocument()
    expect(screen.queryByText('这个分类还在整理中。')).not.toBeInTheDocument()
    expect(screen.queryByText('工具展示占位卡')).not.toBeInTheDocument()
    expect(screen.queryByText(/这里先放一个自用工具展示位/)).not.toBeInTheDocument()
    expect(screen.queryByText(/还没有工具，快去种一个/)).not.toBeInTheDocument()
  })

  it('keeps category selection state when switching empty categories', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'AI 工作流' }))

    expect(screen.getByRole('button', { name: 'AI 工作流' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '全部' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.queryByText('RedBook Fixer')).not.toBeInTheDocument()
    expect(screen.getByText('这个分类还在整理中。')).toBeInTheDocument()
  })

  it('shows RedBook Fixer under content tools', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: '内容工具' }))

    expect(screen.getByRole('button', { name: '内容工具' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: 'RedBook Fixer' })).toBeInTheDocument()
  })

  it('shows CET tools under study tools with site and GitHub links', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: '学习工具' }))

    expect(screen.getByRole('button', { name: '学习工具' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.queryByText('RedBook Fixer')).not.toBeInTheDocument()

    expect(screen.getByRole('heading', { name: '四级真题工具站' })).toBeInTheDocument()
    expect(screen.getByText('直接下载四级真题，无需再在评论区刷 ××')).toBeInTheDocument()
    const toolLinks = screen.getAllByRole('link', { name: '打开工具' })
    const githubLinks = screen.getAllByRole('link', { name: 'GitHub' })

    expect(toolLinks).toHaveLength(2)
    expect(githubLinks).toHaveLength(2)
    expect(toolLinks[0]).toHaveAttribute(
      'href',
      'https://catteacher0515.github.io/cet4-download/',
    )
    expect(githubLinks[0]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/cet4-download',
    )

    expect(screen.getByRole('heading', { name: '六级真题工具站' })).toBeInTheDocument()
    expect(screen.getByText('直接下载六级真题，无需再在评论区刷 ××')).toBeInTheDocument()
    expect(toolLinks[1]).toHaveAttribute(
      'href',
      'https://catteacher0515.github.io/cet6-download/',
    )
    expect(githubLinks[1]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/cet6-download',
    )
  })

  it('shows archived ShadowPlay under experiment projects with GitHub only', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: '实验项目' }))

    expect(screen.getByRole('button', { name: '实验项目' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.queryByText('RedBook Fixer')).not.toBeInTheDocument()
    expect(screen.queryByText('四级真题工具站')).not.toBeInTheDocument()

    expect(screen.getByRole('heading', { name: 'ShadowPlay / 云上皮影' })).toBeInTheDocument()
    expect(
      screen.getByText('一个围绕唐山皮影文化做的小程序原型，重点在素材整理、文化内容呈现和轻量交互设计。'),
    ).toBeInTheDocument()
    expect(screen.getByText('已归档')).toBeInTheDocument()
    expect(screen.getByText('小程序原型')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '打开工具' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/ShadowPlay',
    )
  })
})
