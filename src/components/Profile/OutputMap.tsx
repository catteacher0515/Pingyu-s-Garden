import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface OutputLink {
  id: string
  title: string
  path: string
  description: string
}

interface OutputMapProps {
  outputs: OutputLink[]
}

export default function OutputMap({ outputs }: OutputMapProps) {
  return (
    <section className="mt-12 rounded-[1.75rem] border border-[#efcfbf]/22 bg-[linear-gradient(180deg,rgba(244,234,223,0.1),rgba(215,106,78,0.04))] p-5 sm:p-6">
      <p className="font-body text-xs uppercase tracking-[0.32em] text-[#ed7b62]/70">output map</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-[#f4eadf]">我如何输出</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {outputs.map((output, index) => (
          <motion.div
            key={output.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
          >
            <Link
              to={output.path}
              className="block h-full rounded-[1.35rem] border border-[#efcfbf]/28 bg-[#130d0c] p-5 text-[#f4eadf] transition hover:-translate-y-1 hover:border-[#ed7b62]/70 hover:bg-[#1a1110]"
            >
              <span className="font-hand text-2xl text-[#ed7b62]">{output.title}</span>
              <p className="mt-3 text-sm leading-7 text-[#f4eadf]/68">{output.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
