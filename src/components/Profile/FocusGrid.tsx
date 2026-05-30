import { motion } from 'framer-motion'

interface FocusArea {
  id: string
  title: string
  label: string
  description: string
}

interface FocusGridProps {
  areas: FocusArea[]
}

export default function FocusGrid({ areas }: FocusGridProps) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.32em] text-[#ed7b62]/70">current focus</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#f4eadf]">我在探索什么</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {areas.map((area, index) => (
          <motion.article
            key={area.id}
            className="group rounded-[1.5rem] border border-[#efcfbf]/24 bg-[#f4eadf] p-5 text-[#241312] shadow-[0_18px_45px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-[#d76a4e]/80"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
          >
            <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8f3f2e]/60">{area.label}</p>
            <h3 className="mt-3 text-lg font-semibold text-[#241312]">{area.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#3d2420]/74">{area.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
