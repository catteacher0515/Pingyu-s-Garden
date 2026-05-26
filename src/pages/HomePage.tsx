import GardenMap from '../components/Garden/GardenMap'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(170,205,188,0.18),transparent_22%),linear-gradient(135deg,#111827_0%,#0b1020_48%,#08111a_100%)]">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-10">
        <header className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-white/55">Digital Garden</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">花萍雨的数字花园</h1>
          <p className="mt-3 text-sm text-white/65">个人介绍、文章、项目和工具的统一入口</p>
        </header>

        <GardenMap />

        <p className="mt-8 text-xs text-white/55">点击任一入口，进入对应内容页</p>
      </section>
    </main>
  )
}
