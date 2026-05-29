import arrowDoodle from '../assets/poster/doodle/arrow-doodle.png'
import catDoodle from '../assets/poster/doodle/cat-doodle.png'
import cloudDoodle from '../assets/poster/doodle/cloud-doodle.png'
import flowerDoodle from '../assets/poster/doodle/flower-doodle.png'
import folderDoodle from '../assets/poster/doodle/folder-doodle.png'
import paperDoodle from '../assets/poster/doodle/paper-doodle.png'
import butterflyDiamond from '../assets/poster/edge-diamond/butterfly-diamond.png'
import flowerDiamond from '../assets/poster/edge-diamond/flower-diamond.png'
import leafDiamond from '../assets/poster/edge-diamond/leaf-diamond.png'
import patternADiamond from '../assets/poster/edge-diamond/pattern-a-diamond.png'
import starburstDiamond from '../assets/poster/edge-diamond/starburst-diamond.png'
import birdSquare from '../assets/poster/edge-square/bird-square.png'
import computerSquare from '../assets/poster/edge-square/computer-square.png'
import grassSquare from '../assets/poster/edge-square/grass-square.png'
import owlSquare from '../assets/poster/edge-square/owl-square.png'
import starSquare from '../assets/poster/edge-square/star-square.png'

export interface PosterAsset {
  id: string
  src: string
  alt: string
  shape: 'square' | 'diamond' | 'doodle'
  rotate?: number
  zIndex: number
  opacity?: number
  hiddenOnMobile?: boolean
}

export const leftEdgeAssets: PosterAsset[] = [
  { id: 'owl-left', src: owlSquare, alt: 'owl frame', shape: 'square', zIndex: 2 },
  { id: 'star-left', src: starSquare, alt: 'star frame', shape: 'square', zIndex: 2 },
  { id: 'pattern-left', src: patternADiamond, alt: 'pattern diamond', shape: 'diamond', zIndex: 2 },
  { id: 'bird-left', src: birdSquare, alt: 'bird frame', shape: 'square', zIndex: 2 },
  { id: 'leaf-left', src: leafDiamond, alt: 'leaf diamond', shape: 'diamond', zIndex: 2 },
  { id: 'pattern-left-b', src: patternADiamond, alt: 'pattern diamond', shape: 'diamond', zIndex: 2 },
  { id: 'grass-left', src: grassSquare, alt: 'grass frame', shape: 'square', zIndex: 2 },
  { id: 'flower-left', src: flowerDiamond, alt: 'flower diamond', shape: 'diamond', zIndex: 2 },
]

export const rightEdgeAssets: PosterAsset[] = [
  { id: 'computer-right', src: computerSquare, alt: 'computer frame', shape: 'square', zIndex: 2 },
  { id: 'pattern-right', src: patternADiamond, alt: 'pattern diamond', shape: 'diamond', zIndex: 2 },
  { id: 'butterfly-right', src: butterflyDiamond, alt: 'butterfly diamond', shape: 'diamond', zIndex: 2 },
  { id: 'owl-right', src: owlSquare, alt: 'owl frame', shape: 'square', zIndex: 2 },
  { id: 'starburst-right', src: starburstDiamond, alt: 'starburst diamond', shape: 'diamond', zIndex: 2 },
  { id: 'computer-right-b', src: computerSquare, alt: 'computer frame', shape: 'square', zIndex: 2 },
  { id: 'pattern-right-b', src: patternADiamond, alt: 'pattern diamond', shape: 'diamond', zIndex: 2 },
  { id: 'butterfly-right-b', src: butterflyDiamond, alt: 'butterfly diamond', shape: 'diamond', zIndex: 2 },
]

export const doodleAssets: PosterAsset[] = [
  { id: 'cat-doodle', src: catDoodle, alt: 'cat doodle', shape: 'doodle', rotate: -8, zIndex: 5, hiddenOnMobile: true },
  { id: 'paper-doodle', src: paperDoodle, alt: 'paper doodle', shape: 'doodle', rotate: -14, zIndex: 5, hiddenOnMobile: true },
  { id: 'folder-doodle', src: folderDoodle, alt: 'folder doodle', shape: 'doodle', rotate: 10, zIndex: 3, hiddenOnMobile: true },
  { id: 'cloud-doodle', src: cloudDoodle, alt: 'cloud doodle', shape: 'doodle', rotate: -8, zIndex: 3, opacity: 0.92 },
  { id: 'arrow-doodle', src: arrowDoodle, alt: 'arrow doodle', shape: 'doodle', rotate: 8, zIndex: 4 },
  { id: 'flower-doodle', src: flowerDoodle, alt: 'flower doodle', shape: 'doodle', rotate: -12, zIndex: 4, hiddenOnMobile: true },
]
