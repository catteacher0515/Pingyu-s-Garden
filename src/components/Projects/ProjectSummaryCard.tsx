import type { Project } from '../../types'

interface ProjectSummaryCardProps {
  project: Project
  isSelected: boolean
  onSelect: () => void
}

export default function ProjectSummaryCard({ project, isSelected, onSelect }: ProjectSummaryCardProps) {
  return (
    <article
      aria-label={isSelected ? `${project.title}，当前选中` : project.title}
      className={`relative rounded-[1.5rem] border bg-[#f5ebdc] p-5 shadow-[0_10px_24px_rgba(24,14,10,0.16)] transition ${
        isSelected ? 'border-[#d76a4e]/60 ring-1 ring-[#d76a4e]/24' : 'border-[#e0cdb8]/70'
      }`}
      aria-describedby={isSelected ? `${project.id}-selected-state` : undefined}
    >
      <div className="flex flex-col gap-4">
        {isSelected ? (
          <p id={`${project.id}-selected-state`} className="sr-only">
            当前选中
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-2 text-[0.66rem] uppercase tracking-[0.24em] text-[#7d5a4a]">
          <span>{project.year}</span>
          <span aria-hidden="true">/</span>
          <span>{project.status}</span>
          <span aria-hidden="true">/</span>
          <span>Rank {project.rank.toString().padStart(2, '0')}</span>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#2e1711]">{project.title}</h2>
          <p className="mt-2 text-sm leading-7 text-[#4f352c]">{project.summary ?? project.positioning}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#d9c2ae] bg-[#fff8f1] px-3 py-1 text-xs text-[#6c4738]"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
            isSelected
              ? 'bg-[#2f1812] text-[#fff2e4]'
              : 'bg-[#d76a4e] text-[#fff7ef] hover:bg-[#c85e44]'
          }`}
          onClick={onSelect}
        >
          <span aria-hidden="true">▸</span>
          <span>{`展开 ${project.title} 项目档案`}</span>
        </button>
      </div>
    </article>
  )
}
