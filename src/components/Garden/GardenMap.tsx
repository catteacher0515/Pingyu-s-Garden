import { useNavigate } from 'react-router-dom'
import CenterNode from './CenterNode'
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
    <div className="relative aspect-square w-[min(84vw,38rem)]">
      <CenterNode />
      {HOME_SECTIONS.map((section) => (
        <FlowerNode
          key={section.id}
          section={section}
          onClick={() => navigate(section.path)}
        />
      ))}
    </div>
  )
}
