import GardenMap from '../components/Garden/GardenMap'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(200,224,214,0.72),transparent_26%),linear-gradient(135deg,#f7faf3_0%,#edf4ed_46%,#e9f1f5_100%)]">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-10">
        <header className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs uppercase tracking-[0.38em] text-slate-500">DIGITAL GARDEN</p>
          <h1 className="font-display mt-5 text-[clamp(3rem,8vw,5.8rem)] leading-[0.92] tracking-[-0.03em] text-slate-700">
            花萍雨的数字花园
          </h1>
          <p className="font-body mx-auto mt-6 max-w-2xl text-[0.98rem] leading-8 text-slate-500">
            个人介绍、文章、项目和工具的统一入口。
            这是一个长期维护的个人站，而不是临时首页。
          </p>
        </header>

        <div className="mx-auto mt-12 w-full max-w-5xl">
          <GardenMap />
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p className="font-body">点击任一入口，进入对应内容页</p>
          <p className="font-body">当前是偏纸感、展签式的轻量首页</p>
        </div>
      </section>
    </main>
  )
}
