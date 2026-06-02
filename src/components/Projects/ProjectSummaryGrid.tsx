import type { Project } from '../../types'
import ProjectDetailPanels from './ProjectDetailPanels'
import ProjectSummaryCard from './ProjectSummaryCard'

interface ProjectSummaryGridProps {
  projects: Project[]
  selectedProjectId: string
  onSelectProject: (projectId: string) => void
}

export default function ProjectSummaryGrid({
  projects,
  selectedProjectId,
  onSelectProject,
}: ProjectSummaryGridProps) {
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0]

  return (
    <section className="mt-8 space-y-6">
      <p className="sr-only">代表项目占位卡</p>
      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectSummaryCard
            key={project.id}
            project={project}
            isSelected={project.id === selectedProject.id}
            onSelect={() => onSelectProject(project.id)}
          />
        ))}
      </div>

      {selectedProject ? <ProjectDetailPanels project={selectedProject} /> : null}
    </section>
  )
}
