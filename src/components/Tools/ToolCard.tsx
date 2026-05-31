import { motion } from 'framer-motion'
import { cardEntrance } from '../../lib/motion'
import type { Tool } from '../../types'

interface ToolCardProps {
  tool: Tool
  index: number
}

export default function ToolCard({ tool, index }: ToolCardProps) {
  const toolNumber = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      className="border-[3px] border-[#241312] bg-[#f1e5d2] p-4 text-[#241312] shadow-[7px_8px_0_rgba(116,48,36,0.84),0_22px_54px_rgba(0,0,0,0.34)]"
      initial={cardEntrance.initial}
      animate={cardEntrance.animate}
      transition={cardEntrance.transition(index)}
    >
      <div className="flex min-h-full flex-col border-[3px] border-[#241312] bg-[#fff2e4] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9f4d3e]">
          Tool · {toolNumber}
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-none text-[#241312]">
          {tool.name}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#4e2c25]">{tool.description}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-y-[3px] border-[#241312] py-4 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9f4d3e]">状态</dt>
            <dd className="mt-1 font-semibold">{tool.status}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9f4d3e]">形态</dt>
            <dd className="mt-1 font-semibold">{tool.form}</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="border-2 border-[#241312] bg-[#f1e5d2] px-2.5 py-1 text-xs font-semibold text-[#4a211a]"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {tool.links.map((link) =>
            link.href ? (
              <a
                key={`${link.kind}-${link.label}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#241312] bg-[#241312] px-3 py-1.5 text-xs font-semibold text-[#fff2e4] transition hover:bg-[#9f4d3e]"
              >
                {link.label}
              </a>
            ) : (
              <span
                key={`${link.kind}-${link.label}`}
                className="border-2 border-[#241312] bg-[#f1e5d2] px-3 py-1.5 text-xs font-semibold text-[#4a211a]"
              >
                {link.label}
              </span>
            ),
          )}
        </div>
      </div>
    </motion.article>
  )
}
