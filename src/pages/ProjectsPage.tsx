import { useState } from 'react'
import BackToGarden from '../components/Layout/BackToGarden'
import ProjectsHeader from '../components/Projects/ProjectsHeader'
import ProjectSummaryGrid from '../components/Projects/ProjectSummaryGrid'
import { projects } from '../data/projects'

export default function ProjectsPage() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id ?? '')

  return (
    <main className="min-h-screen bg-[#0d0b0b] px-5 py-8 text-[#f4eadf] sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,106,78,0.12),transparent_24%),radial-gradient(circle_at_12%_20%,rgba(244,234,223,0.06),transparent_18%),linear-gradient(180deg,#171110_0%,#0e0a0a_48%,#080606_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(244,234,223,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(244,234,223,0.45)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <BackToGarden />

        <ProjectsHeader
          title="Selected Works / 04 Projects"
          subtitle="先看项目在解决什么问题，再展开对应的模块化详情区。"
        />

        <ProjectSummaryGrid
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
        />
      </div>
    </main>
  )
}
