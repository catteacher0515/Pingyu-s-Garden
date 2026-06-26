import { useLocation } from 'react-router-dom'
import FlowerNode from './FlowerNode'
import type { HomeSectionConfig } from '../../types'

const HOME_SECTIONS: HomeSectionConfig[] = [
  { id: 'profile', label: '个人介绍', emoji: '👤', description: '了解我是谁', path: '/profile', angle: 0 },
  { id: 'articles', label: '文章', emoji: '📝', description: '公开发布的文章', path: '/articles', angle: 180 },
  { id: 'tools', label: '小工具', emoji: '🛠️', description: '日常自用工具', path: '/tools', angle: 90 },
]

export default function GardenMap() {
  const { pathname } = useLocation()

  return (
    <div className="relative w-full">
      <div
        data-testid="ticket-stack"
        className="mx-auto flex max-w-4xl flex-col gap-3 px-1 sm:gap-3.5"
      >
        {HOME_SECTIONS.map((section, index) => (
          <div
            key={section.id}
            className={index % 2 === 0 ? 'sm:pr-10' : 'sm:pl-10'}
          >
            <FlowerNode
              section={section}
              index={index}
              isActive={pathname === section.path}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
