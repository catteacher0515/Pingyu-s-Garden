import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('renders the poster homepage with hero copy and site entry buttons', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByText('花萍雨的数字花园')).toBeInTheDocument()
    expect(screen.getAllByText('DIGITAL GARDEN').length).toBeGreaterThan(0)
    expect(screen.getByText('Software should feel thoughtful')).toBeInTheDocument()
    expect(screen.getByText(/海报式首页/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /个人介绍/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /项目/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /文章/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /小工具/i })).toBeInTheDocument()
  })
})
