import PageShell from '../components/Layout/PageShell'

interface Project {
  id: string
  name: string
  summary: string
  url?: string
  highlights: string[]
}

const projects: Project[] = [
  {
    id: 'featured-placeholder',
    name: '代表项目占位卡',
    summary:
      '这里先放一个可写进简历的项目展示位，后续替换成真实项目名称、成果和技术细节。',
    highlights: ['成果导向', '技术栈说明', '可量化结果'],
  },
]

export default function ProjectsPage() {
  return (
    <PageShell title="项目" subtitle="可以写进简历的项目集合，优先展示成果和技术点。">
      <div className="grid gap-4">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-[1.75rem] border border-white/18 bg-white/10 p-5 backdrop-blur-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-white">{project.name}</h2>
                <p className="mt-2 text-sm leading-7 text-white/68">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/78"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {project.url ? (
                <a
                  href={project.url}
                  className="shrink-0 rounded-full border border-white/16 bg-white/12 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/18"
                >
                  查看
                </a>
              ) : (
                <span className="shrink-0 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/45">
                  待补充
                </span>
              )}
            </div>
          </article>
        ))}

        <section className="rounded-[1.75rem] border border-dashed border-white/16 bg-white/6 p-5">
          <p className="text-sm font-medium text-white">后续补充建议</p>
          <p className="mt-2 text-sm leading-7 text-white/62">
            这里之后可以继续追加更多项目卡片，优先写“做了什么、用到什么、带来了什么结果”。
            当前版本只保留一个占位项目，避免在没有真实元数据时编造经历。
          </p>
        </section>
      </div>
    </PageShell>
  )
}
