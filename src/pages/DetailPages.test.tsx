import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ProfilePage from './ProfilePage'
import ProjectsPage from './ProjectsPage'

describe('detail pages', () => {
  it('renders the profile page shell and placeholders', () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '个人介绍' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '联系我' })).toBeInTheDocument()
    expect(screen.getAllByText('（待补充）')).toHaveLength(3)
    expect(screen.getByRole('link', { name: '回到花园' })).toHaveAttribute('href', '/')
  })

  it('renders the projects page shell and featured placeholder project', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '项目' })).toBeInTheDocument()
    expect(screen.getByText('代表项目占位卡')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '查看' })).toHaveAttribute('href', '#project-placeholder')
  })
})
