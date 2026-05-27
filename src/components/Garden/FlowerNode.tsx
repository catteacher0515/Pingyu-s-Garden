import type { HomeSectionConfig } from '../../types'

interface FlowerNodeProps {
  section: HomeSectionConfig
  onClick: () => void
}

export default function FlowerNode({ section, onClick }: FlowerNodeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={section.label}
      className="flex min-h-[13rem] flex-col items-center justify-center rounded-[1.5rem] border border-white/60 bg-white/78 px-4 py-5 text-center text-slate-700 shadow-[0_16px_40px_rgba(80,96,84,0.12)] backdrop-blur-2xl transition hover:bg-white/92 hover:shadow-[0_20px_52px_rgba(80,96,84,0.16)]"
    >
      <span className="text-4xl">{section.emoji}</span>
      <span className="mt-4 text-base font-semibold">{section.label}</span>
      <span className="mt-2 text-sm leading-6 text-slate-500">{section.description}</span>
    </button>
  )
}
