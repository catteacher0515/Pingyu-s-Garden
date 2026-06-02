import type { Project } from '../../types'

interface ProjectDetailPanelsProps {
  project: Project
}

const featuredSectionIds = new Set(['problem', 'solution'])

export default function ProjectDetailPanels({ project }: ProjectDetailPanelsProps) {
  return (
    <section
      aria-label="项目详情"
      className="rounded-[2rem] border border-[#8f4b36]/35 bg-[#f3e7d1]/94 p-6 text-[#24130f] shadow-[0_24px_80px_rgba(0,0,0,0.24)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#8f4b36]/18 pb-4">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#8f4b36]">
            {String(project.rank).padStart(2, '0')} / 当前展开项目
          </p>
          <h2 className="mt-2 text-2xl font-semibold">{project.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4e342c]">{project.problem}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.links.map((link) => (
            <span
              key={link.label}
              className="rounded-full border border-[#8f4b36]/24 bg-[#fff7ea] px-3 py-1 text-xs text-[#6b4638]"
            >
              {link.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {project.sections.map((section) => {
          const isFeatured = featuredSectionIds.has(section.id)

          return (
            <article
              key={section.id}
              className={
                isFeatured
                  ? 'min-h-[15rem] rounded-[1.6rem] border border-[#8f4b36]/30 bg-[#f8efdf] p-5 lg:col-span-2'
                  : 'rounded-[1.6rem] border border-[#8f4b36]/24 bg-[#f7ecd9] p-5'
              }
            >
              <h3 className="text-lg font-semibold text-[#24130f]">{section.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#4e342c]">{section.body}</p>
              {section.items ? (
                <ul className="mt-4 space-y-2 text-sm leading-7 text-[#3f2a24]">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
