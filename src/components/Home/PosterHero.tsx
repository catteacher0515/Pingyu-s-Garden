export default function PosterHero() {
  return (
    <section data-testid="poster-stage" className="relative mx-auto w-full max-w-[68rem]">
      <div
        data-testid="poster-board"
        className="relative overflow-hidden rounded-[2.35rem] border border-[#f0ccbb]/30 bg-[linear-gradient(180deg,rgba(251,236,219,0.98),rgba(245,227,202,0.95))] p-4 shadow-[0_20px_76px_rgba(0,0,0,0.4)] lg:p-5"
      >
        <div className="absolute inset-3 rounded-[2.15rem] border border-[#d8c7b8]/70" />
        <div className="absolute inset-3 rounded-[2.15rem] bg-[linear-gradient(rgba(191,182,173,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(191,182,173,0.45)_1px,transparent_1px)] bg-[size:3.45rem_3.45rem] opacity-65" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(198,111,84,0.1)_44%,rgba(178,82,62,0.22)_100%)]" />

        <div
          data-testid="poster-board-content"
          className="relative z-10 grid min-h-[30rem] gap-6 px-5 py-8 lg:min-h-[31rem] lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:px-10 lg:py-10"
        >
          <div className="self-center text-[#cf5f45]">
            <p className="font-hand text-[1.05rem] tracking-[0.05em]">handmade digital garden</p>
            <p className="mt-3 font-body text-base uppercase tracking-[0.42em] text-[#b06c5d]">DIGITAL GARDEN</p>
            <h1 className="mt-4 max-w-[8.5ch] font-display text-[clamp(3.05rem,6.6vw,5.9rem)] leading-[0.88] tracking-[-0.04em] text-[#d65d45]">
              Software should feel thoughtful
            </h1>
            <p className="mt-5 max-w-lg font-body text-[0.98rem] leading-7 text-[#8b6459]">
              这是一个海报式首页，用黑底、红棕、印刷感与手绘线稿混合出更强的视觉记忆。
            </p>
            <p className="mt-3 max-w-lg font-body text-[0.96rem] leading-7 text-[#9a7366]">
              中间是抽象主视觉，四个站点入口被收进次级区域，画面先作为作品成立。
            </p>
            <div className="mt-6 flex flex-wrap gap-3 font-body text-[0.68rem] uppercase tracking-[0.22em] text-[#ad705f]">
              <span className="rounded-full border border-[#dcae9a]/70 bg-[#f9ede1]/75 px-4 py-2">poster homepage</span>
              <span className="rounded-full border border-[#dcae9a]/70 bg-[#f9ede1]/75 px-4 py-2">abstract visual</span>
              <span className="rounded-full border border-[#dcae9a]/70 bg-[#f9ede1]/75 px-4 py-2">handwritten print mix</span>
            </div>
          </div>

          <div className="relative min-h-[18rem] lg:min-h-[26rem]">
            <div className="absolute inset-[12%_10%_12%_13%] rounded-[2rem] border border-[#cf6d53]/55 bg-[radial-gradient(circle_at_30%_22%,rgba(214,93,69,0.2),transparent_20%),radial-gradient(circle_at_72%_28%,rgba(214,93,69,0.14),transparent_16%),radial-gradient(circle_at_44%_78%,rgba(214,93,69,0.1),transparent_22%)]" />
            <div className="absolute inset-[16%_16%_17%_18%] rounded-[1.8rem] border border-[#cf6d53]/70">
              <div className="absolute inset-x-[12%] top-[14%] h-px bg-[#cf6d53]/45" />
              <div className="absolute inset-y-[16%] left-[18%] w-px bg-[#cf6d53]/30" />
              <div className="absolute inset-y-[16%] right-[18%] w-px bg-[#cf6d53]/30" />
              <div className="absolute left-[18%] right-[18%] top-[28%] h-px bg-[#cf6d53]/24" />
              <div className="absolute left-[18%] right-[18%] bottom-[28%] h-px bg-[#cf6d53]/24" />
              <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-[48%] border border-[#cf6d53]/70" />
              <div className="absolute left-1/2 top-[26%] h-[22%] w-[22%] -translate-x-1/2 rounded-[42%_42%_32%_32%] border border-[#cf6d53]/70" />
              <div className="absolute bottom-[16%] left-[16%] h-[24%] w-[28%] rounded-[58%_42%_50%_38%] border border-[#cf6d53]/62" />
              <div className="absolute bottom-[14%] right-[14%] h-[26%] w-[30%] rounded-[38%_58%_44%_52%] border border-[#cf6d53]/62" />
              <div className="absolute left-[29%] top-[40%] h-[18%] w-[12%] rounded-[60%_40%_62%_38%] border border-[#cf6d53]/58" />
              <div className="absolute right-[29%] top-[40%] h-[18%] w-[12%] rounded-[40%_60%_38%_62%] border border-[#cf6d53]/58" />
              <div className="absolute left-1/2 top-1/2 h-[7.35rem] w-[7.35rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cf6d53]/44" />
            </div>
            <div className="absolute bottom-[6%] left-[10%] right-[8%] h-[18%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(214,93,69,0.18),rgba(214,93,69,0)_72%)] blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
