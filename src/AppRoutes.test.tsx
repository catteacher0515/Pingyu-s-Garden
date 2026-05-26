import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('app routes', () => {
  it('navigates from the homepage to the profile page and back', async () => {
    window.history.pushState({}, '', '/')

    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: '个人介绍' }))

    expect(await screen.findByRole('heading', { name: '个人介绍' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: '回到花园' }))

    expect(await screen.findByText('花萍雨的数字花园')).toBeInTheDocument()
  })

  it('navigates from the homepage to the projects page', async () => {
    window.history.pushState({}, '', '/')

    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: '项目' })[0])

    expect(await screen.findByRole('heading', { name: '项目' })).toBeInTheDocument()
    expect(screen.getByText('代表项目占位卡')).toBeInTheDocument()
  })
})
