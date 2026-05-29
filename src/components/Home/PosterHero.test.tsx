import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PosterHero from './PosterHero'

describe('PosterHero', () => {
  it('renders the hero copy and keeps the poster board within a tightened stage width', () => {
    render(<PosterHero />)

    expect(screen.getByText('Software should feel thoughtful')).toBeInTheDocument()
    expect(screen.getByText(/海报式首页/)).toBeInTheDocument()
    expect(screen.getByText(/抽象主视觉/)).toBeInTheDocument()

    const posterStage = screen.getByTestId('poster-stage')
    const posterBoard = screen.getByTestId('poster-board')
    const posterBoardContent = screen.getByTestId('poster-board-content')

    expect(posterStage).toHaveClass('max-w-[68rem]')
    expect(posterBoard).toHaveClass('rounded-[2.35rem]')
    expect(posterBoardContent).toHaveClass('lg:min-h-[31rem]')
  })
})
