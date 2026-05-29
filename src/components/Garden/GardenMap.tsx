import { useNavigate } from 'react-router-dom'
import FlowerNode from './FlowerNode'
import type { HomeSectionConfig } from '../../types'

const HOME_SECTIONS: HomeSectionConfig[] = [
  { id: 'profile', label: '个人介绍', emoji: '👤', description: '了解我是谁', path: '/profile', angle: 0 },
  { id: 'projects', label: '项目', emoji: '🧩', description: '可写进简历的项目', path: '/projects', angle: 270 },
  { id: 'articles', label: '文章', emoji: '📝', description: '公开发布的文章', path: '/articles', angle: 180 },
  { id: 'tools', label: '小工具', emoji: '🛠️', description: '日常自用工具', path: '/tools', angle: 90 },
]

export default function GardenMap() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full">
      <div className="mx-auto max-w-6xl rounded-[2.2rem] border border-[#efcfbf]/24 bg-[linear-gradient(180deg,rgba(245,226,206,0.08),rgba(255,255,255,0.02))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[2px] sm:px-5 sm:py-5">
        <div className="grid gap-4 md:grid-cols-4">
          {HOME_SECTIONS.map((section) => (
            <FlowerNode
              key={section.id}
              section={section}
              onClick={() => navigate(section.path)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
