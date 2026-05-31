import EntryStrip from '../components/Home/EntryStrip'
import PosterHero from '../components/Home/PosterHero'
import SideOrnaments from '../components/Home/SideOrnaments'
import TopNav from '../components/Home/TopNav'

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0b0b] text-[#f4eadf]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,106,78,0.12),transparent_22%),radial-gradient(circle_at_12%_22%,rgba(255,255,255,0.06),transparent_18%),radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.04),transparent_16%),linear-gradient(180deg,#161111_0%,#0e0a0a_48%,#090707_100%)]" />
      <TopNav />
      <SideOrnaments />
      <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[92rem] flex-col justify-center px-6 pb-12 pt-8 lg:px-10 lg:pb-16 lg:pt-8">
        <PosterHero />
        <EntryStrip />
      </section>
    </main>
  )
}
