import { motion } from 'framer-motion'
import BackToGarden from '../components/Layout/BackToGarden'
import toolsData from '../data/tools.json'
import type { Tool } from '../types'

const tools = toolsData as Tool[]

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,#101826_0%,#0b1020_100%)] px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <BackToGarden />

        <div className="mt-8 mb-8 flex items-center gap-3">
          <span className="text-4xl">🛠️</span>
          <h1 className="text-2xl font-semibold text-white">小工具</h1>
        </div>

        <div className="space-y-4">
        {tools.length === 0 ? (
            <p className="rounded-[1.75rem] border border-white/14 bg-white/8 px-5 py-12 text-center text-sm text-white/58 backdrop-blur-2xl">
              还没有工具，快去种一个 🌱
            </p>
        ) : (
            tools.map((tool, i) => (
              <motion.article
                key={tool.id}
                className="rounded-[1.75rem] border border-white/14 bg-white/8 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-white">{tool.name}</h2>
                    <p className="mt-1 text-sm text-white/66">{tool.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/14 bg-white/10 px-2.5 py-0.5 text-xs text-white/76"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={tool.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-full border border-white/16 bg-white/12 px-3 py-1.5 text-xs text-white transition hover:bg-white/18"
                  >
                    GitHub
                  </a>
                </div>
              </motion.article>
            ))
        )}
        </div>
      </div>
    </main>
  )
}
