import PageShell from '../components/Layout/PageShell'
import { projects } from '../data/projects'
import type { ProjectLinkKind } from '../types'

const projectLinkKindLabels: Record<ProjectLinkKind, string> = {
  github: 'Code',
  article: 'Writeup',
  demo: 'Demo',
  external: 'Link',
}

export default function ProjectsPage() {
  return (
    <PageShell title="项目" subtitle="可以写进简历的项目集合，优先展示成果和技术点。">
      <div className="grid gap-4">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-[1.75rem] border border-white/18 bg-white/10 p-5 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/48">
                  <span>{project.year}</span>
                  <span aria-hidden="true">/</span>
                  <span>{project.status}</span>
                  <span aria-hidden="true">/</span>
                  <span>{project.role}</span>
                </div>
                <h2 className="mt-3 text-base font-semibold text-white">{project.title}</h2>
                <p className="mt-2 text-sm leading-7 text-white/68">{project.summary}</p>
                <p className="mt-3 text-sm leading-7 text-white/62">{project.outcome}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/78"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                <span className="text-[0.66rem] uppercase tracking-[0.22em] text-white/42">
                  链接计划
                </span>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                {project.links.length > 0 ? (
                  project.links.map((link) =>
                    link.href ? (
                      <a
                        key={`${link.kind}-${link.label}`}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-[#ed7b62]/38 bg-[#ed7b62]/12 px-3 py-1.5 text-xs text-white transition-colors hover:bg-[#ed7b62]/20"
                      >
                        {link.label}
                        <span className="ml-2 text-white/44">{projectLinkKindLabels[link.kind]}</span>
                      </a>
                    ) : (
                      <span
                        key={`${link.kind}-${link.label}`}
                        className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/45"
                      >
                        {link.label}
                        <span className="ml-2 text-white/30">{projectLinkKindLabels[link.kind]}</span>
                      </span>
                    ),
                  )
                ) : (
                  <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/45">
                    待补充链接
                  </span>
                )}
                </div>
              </div>
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
