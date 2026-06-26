import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
})

describe('app routes', () => {
  it('wraps routed pages in a shared transition container', () => {
    window.history.pushState({}, '', '/')

    render(<App />)

    const transitionFrame = screen.getByTestId('route-transition')

    expect(transitionFrame).toHaveAttribute('data-route', '/')
    expect(transitionFrame).toHaveStyle({ opacity: '0' })
    expect(transitionFrame.style.transform).toContain('translateY(12px)')
  })

  it('navigates from the homepage to the profile page and back', async () => {
    window.history.pushState({}, '', '/')

    render(<App />)

    fireEvent.click(screen.getByRole('link', { name: '个人介绍' }))

    expect(await screen.findByRole('heading', { name: '关于花萍雨' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: '回到花园' }))

    expect(await screen.findByText("Pingyu's Garden")).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '花萍雨的数字花园主海报' })).toBeInTheDocument()
  })

  it('shows the not found page for the hidden projects route', async () => {
    window.history.pushState({}, '', '/')

    window.history.pushState({}, '', '/projects')
    render(<App />)

    expect(await screen.findByText('这片花园还没有种上花')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /回到花园/ })).toHaveAttribute('href', '/')
  })
})
