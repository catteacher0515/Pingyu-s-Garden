import { useState } from 'react'
import GardenMap from '../components/Garden/GardenMap'
import ContentCard from '../components/Overlay/ContentCard'
import type { FlowerConfig, Note, Idea } from '../types'
import notesData from '../data/notes.json'
import ideasData from '../data/ideas.json'

const expandData: Record<string, Note[] | Idea[]> = {
  notes: notesData as Note[],
  ideas: ideasData as Idea[],
}

export default function HomePage() {
  const [activeFlower, setActiveFlower] = useState<FlowerConfig | null>(null)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 50%, #e0f7fa 100%)' }}
    >
      <h1 className="text-2xl font-bold text-gray-600 mb-8 tracking-wide">
        花萍雨的数字花园
      </h1>

      <GardenMap onExpand={setActiveFlower} />

      <ContentCard
        flower={activeFlower}
        data={activeFlower ? (expandData[activeFlower.id] ?? []) : []}
        onClose={() => setActiveFlower(null)}
      />

      <p className="mt-8 text-xs text-gray-400">点击花朵，探索花园 🌱</p>
    </div>
  )
}
