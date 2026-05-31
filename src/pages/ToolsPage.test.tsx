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

    expect(screen.getByText('这个分类还在整理中。')).toBeInTheDocument()
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
    expect(screen.getByText('这个分类还在整理中。')).toBeInTheDocument()
  })
})
