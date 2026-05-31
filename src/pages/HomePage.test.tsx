import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import HomePage from './HomePage'

afterEach(() => {
  cleanup()
})

describe('HomePage', () => {
  it('renders the poster homepage with the main poster image and site entry buttons', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByText('花萍雨的数字花园')).toBeInTheDocument()
    expect(screen.getAllByText('DIGITAL GARDEN').length).toBeGreaterThan(0)
    expect(screen.getByRole('img', { name: '花萍雨的数字花园主海报' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /个人介绍/i })).toHaveAttribute('href', '/profile')
    expect(screen.getByRole('link', { name: /项目/i })).toHaveAttribute('href', '/projects')
    expect(screen.getByRole('link', { name: /文章/i })).toHaveAttribute('href', '/articles')
    expect(screen.getByRole('link', { name: /小工具/i })).toHaveAttribute('href', '/tools')
  })

  it('marks the matching entry as current and exposes click feedback styling', () => {
    render(
      <MemoryRouter initialEntries={['/tools']}>
        <HomePage />
      </MemoryRouter>,
    )

    const toolsEntry = screen.getByRole('link', { name: /小工具/i })

    expect(toolsEntry).toHaveAttribute('aria-current', 'page')
    expect(toolsEntry.className).toContain('active:translate-y-[2px]')
  })

  it('renders site entries as a vertical ticket stack without emoji icons', () => {
    render(
      <MemoryRouter initialEntries={['/tools']}>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('ticket-stack')).toBeInTheDocument()
    expect(screen.getAllByTestId('entry-ticket')).toHaveLength(4)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
    expect(screen.getByText('04')).toBeInTheDocument()
    expect(screen.getByText('CURRENT')).toBeInTheDocument()

    expect(screen.queryByText('👤')).not.toBeInTheDocument()
    expect(screen.queryByText('🧩')).not.toBeInTheDocument()
    expect(screen.queryByText('📝')).not.toBeInTheDocument()
    expect(screen.queryByText('🛠️')).not.toBeInTheDocument()
  })

  it('keeps the ticket area decorative without the old explanatory copy', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.queryByText('四个入口保留在次级层，不和主视觉抢重心')).not.toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'flower doodle for entry area' })).toBeInTheDocument()
  })
})
