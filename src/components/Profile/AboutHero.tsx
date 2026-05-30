import { motion } from 'framer-motion'

interface AboutHeroProps {
  eyebrow: string
  title: string
  avatarSrc: string
  avatarAlt: string
  description: string[]
  tags: string[]
}

export default function AboutHero({ eyebrow, title, avatarSrc, avatarAlt, description, tags }: AboutHeroProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
      <motion.article
        className="relative overflow-hidden rounded-[1.75rem] border border-[#8f3f2e]/70 bg-[#f4eadf] p-6 text-[#241312] shadow-[0_24px_80px_rgba(0,0,0,0.34)] sm:p-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="absolute right-5 top-5 h-16 w-16 overflow-hidden rounded-full border border-[#b35d45]/45 bg-[#d76a4e]/12 shadow-[0_8px_24px_rgba(61,36,32,0.18)] sm:h-20 sm:w-20">
          <img src={avatarSrc} alt={avatarAlt} className="h-full w-full object-cover" />
        </div>
        <p className="font-body text-xs uppercase tracking-[0.32em] text-[#8f3f2e]/72">{eyebrow}</p>
        <h1 className="mt-4 pr-16 font-display text-4xl font-semibold leading-none text-[#241312] sm:pr-24 sm:text-5xl">
          {title}
        </h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-[#3d2420]/82">
          {description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.article>

      <motion.aside
        className="rounded-[1.75rem] border border-[#efcfbf]/28 bg-[linear-gradient(180deg,rgba(244,234,223,0.12),rgba(215,106,78,0.06))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45, ease: 'easeOut' }}
        aria-label="身份贴纸"
      >
        <p className="font-body text-xs uppercase tracking-[0.3em] text-[#f4eadf]/54">identity notes</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {tags.map((tag, index) => (
            <span
              key={tag}
              className="block rotate-[-1deg] border border-[#8f3f2e]/70 bg-[#f4eadf] px-4 py-3 font-hand text-xl tracking-[0.04em] text-[#8f3f2e] shadow-[6px_7px_0_rgba(0,0,0,0.22)] even:rotate-[1deg]"
              style={{ marginLeft: index % 2 === 0 ? '0' : '0.75rem' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.aside>
    </section>
  )
}
