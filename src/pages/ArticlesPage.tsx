import { useState } from 'react'
import ArticleCoverCard from '../components/Articles/ArticleCoverCard'
import BackToGarden from '../components/Layout/BackToGarden'
import { articleSeriesFilters, filterArticlesBySeries, type ArticleSeriesFilter } from '../data/articles'

export default function ArticlesPage() {
  const [selectedSeries, setSelectedSeries] = useState<ArticleSeriesFilter>('全部')
  const visibleArticles = filterArticlesBySeries(selectedSeries)

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0b0b] px-5 py-8 text-[#f4eadf] sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,106,78,0.13),transparent_24%),radial-gradient(circle_at_12%_22%,rgba(244,234,223,0.06),transparent_18%),linear-gradient(180deg,#171110_0%,#0e0a0a_46%,#080606_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(244,234,223,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(244,234,223,0.45)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <BackToGarden />

        <header className="mx-auto mt-10 flex max-w-4xl flex-col items-center text-center">
          <p className="font-body text-xs uppercase tracking-[0.42em] text-[#d76a4e]/72">Journal / Articles</p>
          <h1 className="mt-4 font-display text-6xl font-semibold tracking-normal text-[#fff2e4] sm:text-7xl">
            文章
          </h1>
          <div className="mt-5 h-[3px] w-28 bg-[#d76a4e]" />
          <nav aria-label="文章系列" className="mt-7 flex flex-wrap justify-center gap-3">
            {articleSeriesFilters.map((series) => {
              const isActive = selectedSeries === series

              return (
                <button
                  key={series}
                  type="button"
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'border-[#f1e5d2] bg-[#f1e5d2] text-[#241312] shadow-[4px_5px_0_rgba(116,48,36,0.82)]'
                      : 'border-[#f1e5d2]/28 bg-[#120d0c]/80 text-[#f1e5d2]/72 hover:border-[#d76a4e] hover:text-[#fff2e4]'
                  }`}
                  onClick={() => setSelectedSeries(series)}
                >
                  {series}
                </button>
              )
            })}
          </nav>
        </header>

        <section
          aria-label="知乎文章封面墙"
          className="mt-10 grid grid-cols-1 gap-7 pb-16 md:grid-cols-2 md:gap-8"
        >
          {visibleArticles.map((article, index) => (
            <ArticleCoverCard key={article.id} article={article} index={index} />
          ))}
        </section>
      </div>
    </main>
  )
}
