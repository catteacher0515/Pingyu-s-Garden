import { motion } from 'framer-motion'
import type { FlowerConfig } from '../../types'

interface FlowerNodeProps {
  flower: FlowerConfig
  radius: number
  containerSize: number
  onClick: (flower: FlowerConfig) => void
  index: number
}

export default function FlowerNode({
  flower,
  radius,
  containerSize,
  onClick,
  index,
}: FlowerNodeProps) {
  const center = containerSize / 2
  const rad = (flower.angle - 90) * (Math.PI / 180)
  const x = center + radius * Math.cos(rad)
  const y = center + radius * Math.sin(rad)

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer select-none"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(flower)}
    >
      <div className="text-4xl drop-shadow-md">{flower.emoji}</div>
      <div className="text-xs text-gray-600 mt-1 bg-white/80 rounded px-1.5 py-0.5 whitespace-nowrap">
        {flower.label}
      </div>
    </motion.div>
  )
}
