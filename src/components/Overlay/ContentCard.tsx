import { motion, AnimatePresence } from 'framer-motion'
import type { FlowerConfig, Note, Idea } from '../../types'

interface ContentCardProps {
  flower: FlowerConfig | null
  data: Note[] | Idea[]
  onClose: () => void
}

export default function ContentCard({ flower, data, onClose }: ContentCardProps) {
  return (
    <AnimatePresence>
      {flower && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-80 max-h-96 overflow-y-auto rounded-2xl shadow-xl p-5 ${flower.color}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{flower.emoji}</span>
                <span className="font-bold text-gray-700">{flower.label}</span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {data.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">还没有内容，快来种下第一颗种子 🌱</p>
              ) : (
                data.map((item) => (
                  <div key={item.id} className="bg-white/70 rounded-xl p-3">
                    <p className="text-sm text-gray-700">{item.content}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
