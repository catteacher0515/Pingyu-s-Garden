import { motion } from 'framer-motion'

export default function CenterNode() {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-5xl mb-1 select-none">🌸</div>
      <div className="text-sm font-bold text-gray-700 whitespace-nowrap">花萍雨</div>
      <div className="text-xs text-gray-400 mt-0.5">05后 · 开发</div>
    </motion.div>
  )
}
