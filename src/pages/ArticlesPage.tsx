import { motion } from 'framer-motion'
import BackToGarden from '../components/Layout/BackToGarden'
import articlesData from '../data/articles.json'
import type { Article } from '../types'

const articles = articlesData as Article[]

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,#101826_0%,#0b1020_100%)] px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <BackToGarden />

        <div className="mt-8 mb-8 flex items-center gap-3">
          <span className="text-4xl">📝</span>
          <h1 className="text-2xl font-semibold text-white">文章</h1>
        </div>

        <div className="space-y-4">
        {articles.length === 0 ? (
            <p className="rounded-[1.75rem] border border-white/14 bg-white/8 px-5 py-12 text-center text-sm text-white/58 backdrop-blur-2xl">
              还没有文章，快去写一篇 🌱
            </p>
        ) : (
            articles.map((article, i) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-[1.75rem] border border-white/14 bg-white/8 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition hover:bg-white/12"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-white">{article.title}</h2>
                    <p className="mt-1 text-sm text-white/66">{article.summary}</p>
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-xs text-white/42">{article.date}</span>
                </div>
              </motion.a>
            ))
        )}
        </div>
      </div>
    </main>
  )
}
