import { useEffect, useState } from 'react'
import { doodleAssets, leftEdgeAssets, rightEdgeAssets, type PosterAsset } from '../../data/posterAssets'

const DOODLE_WIDTHS: Record<string, string> = {
  'cat-doodle': '12rem',
  'paper-doodle': '10rem',
  'folder-doodle': '10rem',
  'cloud-doodle': '10rem',
  'arrow-doodle': '7rem',
  'flower-doodle': '11rem',
}

const EDGE_SLOT_HEIGHT = 66
const EDGE_SIZE_BY_SHAPE = {
  square: '4.65rem',
  diamond: '4.15rem',
} as const

function getEdgeAssetCount() {
  if (typeof window === 'undefined') {
    return 18
  }

  const pageHeight = Math.max(
    window.innerHeight,
    document.documentElement.scrollHeight,
    document.body?.scrollHeight ?? 0,
  )

  return Math.max(18, Math.ceil(pageHeight / EDGE_SLOT_HEIGHT) + 3)
}

function buildRailAssets(pattern: PosterAsset[], count: number, prefix: string) {
  return Array.from({ length: count }, (_, index) => {
    const asset = pattern[index % pattern.length]

    return {
      ...asset,
      id: `${prefix}-${index}-${asset.id}`,
    }
  })
}

function DoodleImage({
  asset,
  left,
  top,
}: {
  asset: PosterAsset
  left: string
  top: string
}) {
  const className = asset.hiddenOnMobile
    ? 'pointer-events-none absolute hidden select-none lg:block'
    : 'pointer-events-none absolute select-none'

  return (
    <img
      src={asset.src}
      alt={asset.alt}
      className={className}
      style={{
        left,
        top,
        width: DOODLE_WIDTHS[asset.id],
        zIndex: asset.zIndex,
        opacity: asset.opacity ?? 1,
        transform: `translate(-50%, -50%) rotate(${asset.rotate ?? 0}deg)`,
      }}
    />
  )
}

function EdgeRail({
  side,
  assets,
}: {
  side: 'left' | 'right'
  assets: PosterAsset[]
}) {
  const [itemCount, setItemCount] = useState(getEdgeAssetCount)

  useEffect(() => {
    const updateCount = () => {
      setItemCount(getEdgeAssetCount())
    }

    updateCount()
    window.addEventListener('resize', updateCount)

    return () => {
      window.removeEventListener('resize', updateCount)
    }
  }, [])

  const renderedAssets = buildRailAssets(assets, itemCount, side)
  const marqueeClass =
    side === 'left'
      ? 'animate-[ornament-marquee-up_52s_linear_infinite]'
      : 'animate-[ornament-marquee-down_58s_linear_infinite]'

  const renderGroup = (groupId: string) => (
    <div key={groupId} data-testid="edge-marquee-group">
      {renderedAssets.map((asset) => (
        <div
          key={`${groupId}-${asset.id}`}
          data-testid="edge-asset"
          data-shape={asset.shape}
          className={`relative -mb-1.5 flex h-[4.35rem] w-[4.9rem] items-center ${
            side === 'left' ? 'justify-start' : 'justify-end'
          }`}
          style={{ zIndex: asset.zIndex }}
        >
          <img
            src={asset.src}
            alt={asset.alt}
            className="select-none object-fill"
            style={{
              width: EDGE_SIZE_BY_SHAPE[asset.shape as keyof typeof EDGE_SIZE_BY_SHAPE],
              height: EDGE_SIZE_BY_SHAPE[asset.shape as keyof typeof EDGE_SIZE_BY_SHAPE],
              opacity: asset.opacity ?? 1,
              transform: 'rotate(0deg)',
            }}
          />
        </div>
      ))}
    </div>
  )

  return (
    <div
      data-testid={`edge-rail-${side}`}
      className={`pointer-events-none fixed inset-y-0 z-10 hidden w-[4.9rem] overflow-hidden lg:block ${
        side === 'left' ? 'left-0 items-start' : 'right-0 items-end'
      }`}
    >
      <div
        data-testid={`edge-marquee-${side}`}
        className={`${marqueeClass} motion-reduce:animate-none`}
      >
        {renderGroup('a')}
        {renderGroup('b')}
      </div>
    </div>
  )
}

export default function SideOrnaments() {
  return (
    <>
      <EdgeRail side="left" assets={leftEdgeAssets} />
      <EdgeRail side="right" assets={rightEdgeAssets} />
      <DoodleImage asset={doodleAssets[0]} left="90%" top="48%" />
      <DoodleImage asset={doodleAssets[1]} left="12%" top="80%" />
      <DoodleImage asset={doodleAssets[2]} left="90%" top="25%" />
      <DoodleImage asset={doodleAssets[3]} left="10%" top="15%" />
      <DoodleImage asset={doodleAssets[5]} left="10%" top="35%" />
    </>
  )
}
