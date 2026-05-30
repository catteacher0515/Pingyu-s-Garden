import { motion } from 'framer-motion'
import type { Article } from '../../types'

interface ArticleCoverCardProps {
  article: Article
  index: number
}

export default function ArticleCoverCard({ article, index }: ArticleCoverCardProps) {
  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={article.title}
      className="group block overflow-hidden rounded-[1.35rem] border-[3px] border-[#2a1714] bg-[#120d0c] shadow-[10px_12px_0_rgba(215,106,78,0.26),0_24px_60px_rgba(0,0,0,0.36)] transition duration-300 hover:-translate-y-1 hover:border-[#ed7b62] hover:shadow-[8px_10px_0_rgba(244,234,223,0.18),0_28px_70px_rgba(0,0,0,0.42)]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.38, ease: 'easeOut' }}
    >
      <div className="aspect-video overflow-hidden border-b-[3px] border-[#2a1714] bg-[#241312]">
        <img
          src={article.cover}
          alt={`${article.title} 封面`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          loading="eager"
        />
      </div>
      <div className="flex min-h-28 items-center bg-[#0c0908] px-5 py-4 sm:min-h-32 sm:px-6">
        <h2 className="line-clamp-3 text-lg font-semibold leading-snug text-[#fff4e7] sm:text-xl">
          {article.title}
        </h2>
      </div>
    </motion.a>
  )
}
