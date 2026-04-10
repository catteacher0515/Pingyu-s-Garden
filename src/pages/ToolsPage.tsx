import { motion } from 'framer-motion'
import BackToGarden from '../components/Layout/BackToGarden'
import toolsData from '../data/tools.json'
import type { Tool } from '../types'

const tools = toolsData as Tool[]

export default function ToolsPage() {
  return (
    <div className="min-h-screen px-6 py-8 max-w-2xl mx-auto"
      style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)' }}
    >
      <BackToGarden />

      <div className="mt-6 mb-8 flex items-center gap-3">
        <span className="text-4xl">🛠️</span>
        <h1 className="text-2xl font-bold text-gray-700">小工具</h1>
      </div>

      <div className="space-y-4">
        {tools.length === 0 ? (
          <p className="text-gray-400 text-center py-12">还没有工具，快去种一个 🌱</p>
        ) : (
          tools.map((tool, i) => (
            <motion.div
              key={tool.id}
              className="bg-white/80 rounded-2xl p-5 shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-gray-800">{tool.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={tool.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs bg-gray-800 text-white rounded-lg px-3 py-1.5 hover:bg-gray-700 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
