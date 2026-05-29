import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PosterHero from './PosterHero'

describe('PosterHero', () => {
  it('renders the main poster inside a red framed paper board', () => {
    render(<PosterHero />)

    const posterImage = screen.getByRole('img', { name: '花萍雨的数字花园主海报' })

    const posterStage = screen.getByTestId('poster-stage')
    const posterFrame = screen.getByTestId('poster-frame')
    const posterPaper = screen.getByTestId('poster-paper')

    expect(posterStage).toHaveClass('max-w-[70rem]')
    expect(posterFrame).toHaveClass('bg-[linear-gradient(135deg,#e75843_0%,#c83f32_52%,#ee6a51_100%)]')
    expect(posterFrame).toHaveClass('max-w-full')
    expect(posterFrame).toHaveClass('w-full')
    expect(posterPaper).toHaveClass('bg-[#fff0dc]')
    expect(posterPaper).toHaveClass('overflow-hidden')
    expect(posterImage).toHaveClass('object-contain')
    expect(posterImage).toHaveClass('max-w-full')
    expect(posterImage).toHaveClass('w-full')
    expect(posterImage).toHaveAttribute('src', expect.stringContaining('main-poster'))
  })
})
