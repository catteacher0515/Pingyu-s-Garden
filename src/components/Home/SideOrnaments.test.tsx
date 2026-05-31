import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import SideOrnaments from './SideOrnaments'

describe('SideOrnaments', () => {
  afterEach(() => {
    cleanup()
  })

  it('extends both edge rails when page height grows and keeps edge icon sizing standardized', async () => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 860,
    })

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 860,
    })

    render(<SideOrnaments />)

    const leftRail = screen.getByTestId('edge-rail-left')
    const rightRail = screen.getByTestId('edge-rail-right')
    const initialLeftCount = leftRail.querySelectorAll('[data-testid="edge-asset"]').length
    const initialRightCount = rightRail.querySelectorAll('[data-testid="edge-asset"]').length

    expect(leftRail).toBeInTheDocument()
    expect(rightRail).toBeInTheDocument()
    expect(initialLeftCount).toBeGreaterThanOrEqual(12)
    expect(initialRightCount).toBeGreaterThanOrEqual(12)

    const leftSquare = leftRail.querySelector('[data-shape="square"] img')
    const leftDiamond = leftRail.querySelector('[data-shape="diamond"] img')

    expect(leftSquare).toHaveStyle({ width: '4.65rem', height: '4.65rem' })
    expect(leftDiamond).toHaveStyle({ width: '4.15rem', height: '4.15rem' })

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 2600,
    })

    fireEvent(window, new Event('resize'))

    await waitFor(() => {
      expect(leftRail.querySelectorAll('[data-testid="edge-asset"]').length).toBeGreaterThan(initialLeftCount)
      expect(rightRail.querySelectorAll('[data-testid="edge-asset"]').length).toBeGreaterThan(initialRightCount)
    })
  })

  it('keeps desktop edge rails fixed to the viewport without clipping icons horizontally', () => {
    render(<SideOrnaments />)

    const leftRail = screen.getByTestId('edge-rail-left')
    const rightRail = screen.getByTestId('edge-rail-right')

    expect(leftRail).toHaveClass('fixed')
    expect(rightRail).toHaveClass('fixed')
    expect(leftRail).toHaveClass('overflow-visible')
    expect(rightRail).toHaveClass('overflow-visible')
    expect(leftRail).toHaveClass('left-0')
    expect(rightRail).toHaveClass('right-0')
  })

  it('positions floating doodles in the outer gutters away from the poster frame', () => {
    render(<SideOrnaments />)

    expect(screen.getByAltText('cat doodle')).toHaveStyle({ left: '90%', top: '48%' })
    expect(screen.getByAltText('paper doodle')).toHaveStyle({ left: '12%', top: '80%' })
    expect(screen.getByAltText('folder doodle')).toHaveStyle({ left: '90%', top: '25%' })
    expect(screen.getByAltText('cloud doodle')).toHaveStyle({ left: '10%', top: '15%' })
    expect(screen.getByAltText('flower doodle')).toHaveStyle({ left: '10%', top: '35%' })
  })
})
