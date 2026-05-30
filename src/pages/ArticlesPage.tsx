import ArticleCoverCard from '../components/Articles/ArticleCoverCard'
import BackToGarden from '../components/Layout/BackToGarden'
import { articles } from '../data/articles'

export default function ArticlesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0b0b] px-5 py-8 text-[#f4eadf] sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,106,78,0.13),transparent_24%),radial-gradient(circle_at_12%_22%,rgba(244,234,223,0.06),transparent_18%),linear-gradient(180deg,#171110_0%,#0e0a0a_46%,#080606_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(244,234,223,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(244,234,223,0.45)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <BackToGarden />

        <header className="mt-10 border-y-[3px] border-[#d76a4e]/72 py-6">
          <h1 className="font-display text-5xl font-semibold tracking-normal text-[#fff2e4] sm:text-6xl">
            文章
          </h1>
        </header>

        <section
          aria-label="知乎文章封面墙"
          className="mt-8 grid grid-cols-1 gap-7 pb-16 md:grid-cols-2 md:gap-8"
        >
          {articles.map((article, index) => (
            <ArticleCoverCard key={article.id} article={article} index={index} />
          ))}
        </section>
      </div>
    </main>
  )
}
