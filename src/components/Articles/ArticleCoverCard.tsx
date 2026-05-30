import { motion } from 'framer-motion'
import { getArticleSeriesLabel } from '../../data/articles'
import type { Article } from '../../types'

interface ArticleCoverCardProps {
  article: Article
  index: number
}

export default function ArticleCoverCard({ article, index }: ArticleCoverCardProps) {
  const articleNumber = String(index + 1).padStart(2, '0')

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={article.title}
      className="group block rounded-[0.9rem] border-[3px] border-[#241312] bg-[#f1e5d2] p-3 text-[#190e0c] shadow-[7px_8px_0_rgba(116,48,36,0.86),0_22px_54px_rgba(0,0,0,0.34)] transition duration-300 hover:-translate-y-1 hover:shadow-[5px_6px_0_rgba(215,106,78,0.78),0_26px_64px_rgba(0,0,0,0.4)]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.38, ease: 'easeOut' }}
    >
      <div className="aspect-video overflow-hidden border-[3px] border-[#241312] bg-[#100b0a]">
        <img
          src={article.cover}
          alt={`${article.title} 封面`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          loading="eager"
        />
      </div>

      <div className="mt-3 grid min-h-28 grid-cols-[3.1rem_1fr_auto] items-center gap-2 border-[3px] border-[#241312] bg-[#0b0807] px-4 py-4 text-[#fff4e7] sm:min-h-30 sm:grid-cols-[3.7rem_1fr_auto] sm:gap-3 sm:px-5">
        <span className="font-display text-4xl font-semibold leading-none text-[#d76a4e] sm:text-5xl">
          {articleNumber}
        </span>

        <div className="min-w-0">
          <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-[#fff4e7] sm:text-xl">
            {article.title}
          </h2>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.26em] text-[#f1e5d2]/58">
            {getArticleSeriesLabel(article.seriesId)}
          </p>
        </div>

        <span className="self-start text-2xl leading-none text-[#f1e5d2]/70 transition group-hover:text-[#ed7b62]">
          ↗
        </span>
      </div>
    </motion.a>
  )
}
