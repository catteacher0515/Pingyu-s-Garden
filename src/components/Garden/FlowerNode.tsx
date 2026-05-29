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
      className="group flex min-h-[11rem] flex-col items-center justify-center rounded-[1.6rem] border border-[#efcfbf]/42 bg-[linear-gradient(180deg,rgba(252,242,230,0.97),rgba(247,230,212,0.92))] px-4 py-5 text-center text-[#cf5f45] shadow-[0_18px_34px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_40px_rgba(0,0,0,0.3)]"
    >
      <span className="font-hand text-3xl leading-none text-[#e06a4d]">{section.emoji}</span>
      <span className="mt-4 font-display text-[1.55rem] font-semibold tracking-[-0.02em]">
        {section.label}
      </span>
      <span className="mt-2 max-w-[11ch] font-body text-sm leading-6 text-[#7a655b]">
        {section.description}
      </span>
    </button>
  )
}
