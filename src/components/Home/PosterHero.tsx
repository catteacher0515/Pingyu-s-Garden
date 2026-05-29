import mainPoster from '../../assets/poster/main-poster.png'

export default function PosterHero() {
  return (
    <section
      data-testid="poster-stage"
      className="relative mx-auto min-w-0 max-w-[70rem]"
      style={{ width: 'min(100%, calc(100vw - 3rem))' }}
    >
      <div
        data-testid="poster-frame"
        className="relative mx-auto min-w-0 w-full max-w-full overflow-visible rounded-[2rem] bg-[linear-gradient(135deg,#e75843_0%,#c83f32_52%,#ee6a51_100%)] p-[clamp(0.9rem,1.8vw,1.35rem)] shadow-[0_22px_76px_rgba(0,0,0,0.48)] sm:rounded-[2.45rem]"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(115deg,rgba(255,255,255,0.18),transparent_22%,rgba(96,22,18,0.2)_78%,transparent)] opacity-80" />
        <div className="pointer-events-none absolute inset-[0.45rem] rounded-[1.55rem] border border-[#ffd5c7]/45 sm:rounded-[2rem]" />
        <div className="pointer-events-none absolute -bottom-4 -right-3 h-20 w-24 rotate-[-16deg] bg-[#ef654f]/85 shadow-[0_12px_28px_rgba(64,12,10,0.26)] sm:h-28 sm:w-32" />
        <div className="pointer-events-none absolute -bottom-3 left-[7%] h-9 w-24 rotate-[-11deg] bg-[#f1735e]/78 shadow-[0_10px_24px_rgba(64,12,10,0.22)] sm:h-12 sm:w-36" />

        <div
          data-testid="poster-paper"
          className="relative overflow-hidden rounded-[1.25rem] border border-[#f7c4ae]/70 bg-[#fff0dc] shadow-[inset_0_0_0_1px_rgba(112,57,43,0.12),inset_0_18px_36px_rgba(255,255,255,0.34)] sm:rounded-[1.8rem]"
        >
          <img
            src={mainPoster}
            alt="花萍雨的数字花园主海报"
            className="mx-auto block h-auto max-h-[calc(100vh-16rem)] w-full max-w-full object-contain"
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}
