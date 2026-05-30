import { motion } from 'framer-motion'

interface ContactItem {
  id: string
  label: string
  value: string
  href: string
  hint: string
}

interface ContactPanelProps {
  contacts: ContactItem[]
}

export default function ContactPanel({ contacts }: ContactPanelProps) {
  return (
    <section className="mt-12 rounded-[1.75rem] border border-[#8f3f2e]/58 bg-[#f4eadf] p-5 text-[#241312] shadow-[0_22px_70px_rgba(0,0,0,0.28)] sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.32em] text-[#8f3f2e]/60">connect</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#241312]">联系我</h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-[#3d2420]/68">
          如果你也在折腾 AI、代码、写作或自己的小工具，可以从这里找到我。
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {contacts.map((item, index) => {
          const content = (
            <>
              <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8f3f2e]/58">{item.label}</p>
              <p className="mt-2 text-base font-semibold text-[#241312]">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-[#3d2420]/66">{item.hint}</p>
            </>
          )

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded-[1.25rem] border border-[#8f3f2e]/26 bg-[#fff7ed]/60 p-4 transition hover:-translate-y-1 hover:border-[#8f3f2e]/58"
                >
                  {content}
                </a>
              ) : (
                <div className="h-full rounded-[1.25rem] border border-[#8f3f2e]/18 bg-[#fff7ed]/42 p-4">
                  {content}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
