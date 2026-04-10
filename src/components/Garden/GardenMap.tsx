import { useNavigate } from 'react-router-dom'
import type { FlowerConfig } from '../../types'
import CenterNode from './CenterNode'
import FlowerNode from './FlowerNode'

const FLOWERS: FlowerConfig[] = [
  { id: 'tools',    label: '小工具', emoji: '🛠️', behavior: 'navigate', angle: 0,   color: 'bg-green-50' },
  { id: 'articles', label: '文章',   emoji: '📝', behavior: 'navigate', angle: 90,  color: 'bg-yellow-50' },
  { id: 'notes',    label: '记录',   emoji: '🍃', behavior: 'expand',   angle: 180, color: 'bg-purple-50' },
  { id: 'ideas',    label: '想法',   emoji: '🍄', behavior: 'expand',   angle: 270, color: 'bg-blue-50' },
]

const SIZE = 360
const RADIUS = 130

interface GardenMapProps {
  onExpand: (flower: FlowerConfig) => void
}

export default function GardenMap({ onExpand }: GardenMapProps) {
  const navigate = useNavigate()

  function handleFlowerClick(flower: FlowerConfig) {
    if (flower.behavior === 'navigate') {
      navigate(`/${flower.id}`)
    } else {
      onExpand(flower)
    }
  }

  return (
    <div
      className="relative rounded-full"
      style={{
        width: SIZE,
        height: SIZE,
        background: 'radial-gradient(circle, #f0faf0 0%, #e8f5e9 50%, #dcedc8 100%)',
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-green-300/60"
        style={{ width: RADIUS * 2 + 60, height: RADIUS * 2 + 60 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-green-200/40"
        style={{ width: RADIUS * 2 + 120, height: RADIUS * 2 + 120 }} />

      <CenterNode />

      {FLOWERS.map((flower, i) => (
        <FlowerNode
          key={flower.id}
          flower={flower}
          radius={RADIUS}
          containerSize={SIZE}
          onClick={handleFlowerClick}
          index={i}
        />
      ))}
    </div>
  )
}
