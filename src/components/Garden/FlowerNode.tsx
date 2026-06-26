import { Link } from 'react-router-dom'
import type { HomeSectionConfig } from '../../types'

interface FlowerNodeProps {
  section: HomeSectionConfig
  index: number
  isActive?: boolean
}

const SECTION_CODES: Record<HomeSectionConfig['id'], string> = {
  profile: 'ABOUT',
  articles: 'JOURNAL',
  tools: 'TOOLS',
}

export default function FlowerNode({ section, index, isActive = false }: FlowerNodeProps) {
  const sectionNumber = String(index + 1).padStart(2, '0')
  const sectionCode = SECTION_CODES[section.id]

  return (
    <Link
      to={section.path}
      aria-label={section.label}
      aria-current={isActive ? 'page' : undefined}
      data-testid="entry-ticket"
      className={`group relative grid min-h-[5.8rem] grid-cols-[1fr_6.4rem] overflow-hidden rounded-[0.85rem] border-[3px] text-left shadow-[7px_8px_0_rgba(116,48,36,0.72),0_18px_36px_rgba(0,0,0,0.26)] transition duration-300 hover:translate-x-1.5 hover:shadow-[9px_10px_0_rgba(215,106,78,0.66),0_22px_42px_rgba(0,0,0,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed7b62] active:translate-y-[2px] active:shadow-[5px_6px_0_rgba(116,48,36,0.7),0_12px_24px_rgba(0,0,0,0.24)] sm:grid-cols-[1fr_8rem] ${
        isActive
          ? 'border-[#ed7b62] bg-[#241312] text-[#fff2e4]'
          : 'border-[#241312] bg-[#f1e5d2] text-[#241312]'
      }`}
    >
      <span className="pointer-events-none absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-[3px] border-[#241312] bg-[#0d0b0b]" />
      <span className="pointer-events-none absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-[3px] border-[#241312] bg-[#0d0b0b]" />
      <span
        className={`pointer-events-none absolute left-5 top-3 h-[3px] w-20 origin-left scale-x-0 transition duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
          isActive ? 'bg-[#f1e5d2]' : 'bg-[#ed7b62]'
        }`}
      />

      <span className="flex min-w-0 items-center gap-4 px-5 py-4 sm:gap-5 sm:px-7">
        <span
          className={`font-display text-4xl font-semibold leading-none sm:text-5xl ${
            isActive ? 'text-[#ed7b62]' : 'text-[#cf5f45]'
          }`}
        >
          {sectionNumber}
        </span>
        <span className="min-w-0">
          <span className="block font-display text-2xl font-semibold leading-tight sm:text-3xl">
            {section.label}
          </span>
          <span
            className={`mt-1 block font-body text-sm leading-6 sm:text-base ${
              isActive ? 'text-[#f1e5d2]/70' : 'text-[#76564b]'
            }`}
          >
            {section.description}
          </span>
        </span>
      </span>

      <span
        className={`relative flex flex-col items-center justify-center border-l-[3px] border-dashed px-2 py-3 text-center ${
          isActive
            ? 'border-[#f1e5d2]/42 bg-[#9f4d3e] text-[#fff2e4]'
            : 'border-[#241312]/42 bg-[#fff2e4] text-[#9f4d3e]'
        }`}
      >
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] sm:text-xs">
          {sectionCode}
        </span>
        <span className="mt-2 border px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] sm:text-[0.62rem]">
          {isActive ? 'CURRENT' : 'ENTER'}
        </span>
      </span>
    </Link>
  )
}
