import { motion } from 'framer-motion'
import BackToGarden from '../components/Layout/BackToGarden'
import articlesData from '../data/articles.json'
import type { Article } from '../types'

const articles = articlesData as Article[]

export default function ArticlesPage() {
  return (
    <div className="min-h-screen px-6 py-8 max-w-2xl mx-auto"
      style={{ background: 'linear-gradient(135deg, #fffde7 0%, #f1f8e9 100%)' }}
    >
      <BackToGarden />

      <div className="mt-6 mb-8 flex items-center gap-3">
        <span className="text-4xl">📝</span>
        <h1 className="text-2xl font-bold text-gray-700">文章</h1>
      </div>

      <div className="space-y-4">
        {articles.length === 0 ? (
          <p className="text-gray-400 text-center py-12">还没有文章，快去写一篇 🌱</p>
        ) : (
          articles.map((article, i) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-gray-800">{article.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{article.summary}</p>
                </div>
                <span className="shrink-0 text-xs text-gray-400 whitespace-nowrap">{article.date}</span>
              </div>
            </motion.a>
          ))
        )}
      </div>
    </div>
  )
}
