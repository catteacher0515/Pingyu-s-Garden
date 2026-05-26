import type { HomeSectionConfig } from '../../types'

interface FlowerNodeProps {
  section: HomeSectionConfig
  onClick: () => void
}

export default function FlowerNode({ section, onClick }: FlowerNodeProps) {
  const style = {
    transform: `translate(-50%, -50%) translate(${Math.cos((section.angle - 90) * Math.PI / 180) * 170}px, ${Math.sin((section.angle - 90) * Math.PI / 180) * 170}px)`,
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      aria-label={section.label}
      className="absolute flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[1.5rem] border border-white/20 bg-white/10 px-4 py-4 text-center text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition hover:bg-white/16 hover:shadow-[0_20px_52px_rgba(0,0,0,0.24)]"
    >
      <span className="text-3xl">{section.emoji}</span>
      <span className="mt-2 text-sm font-semibold">{section.label}</span>
      <span className="mt-1 text-[11px] leading-5 text-white/62">{section.description}</span>
    </button>
  )
}
