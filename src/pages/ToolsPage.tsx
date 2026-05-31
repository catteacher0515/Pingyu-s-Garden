import { useState } from 'react'
import BackToGarden from '../components/Layout/BackToGarden'
import ToolCard from '../components/Tools/ToolCard'
import ToolCategoryFilter from '../components/Tools/ToolCategoryFilter'
import ToolEmptyState from '../components/Tools/ToolEmptyState'
import { filterToolsByCategory, toolCategories, type ToolCategoryFilterId } from '../data/tools'

const labSnapshots = [
  { label: 'Focus', value: 'AI + 内容工作流' },
  { label: 'Forms', value: '网站 / 脚本 / 飞书流 / Agent / Skill' },
  { label: 'Mode', value: '自用优先，慢慢公开' },
]

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategoryFilterId>('all')
  const visibleTools = filterToolsByCategory(selectedCategory)

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0b0b] px-5 py-8 text-[#f4eadf] sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,106,78,0.13),transparent_24%),radial-gradient(circle_at_12%_22%,rgba(244,234,223,0.06),transparent_18%),linear-gradient(180deg,#171110_0%,#0e0a0a_46%,#080606_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(244,234,223,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(244,234,223,0.45)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <BackToGarden />

        <header className="mx-auto mt-10 flex max-w-4xl flex-col items-center text-center">
          <p className="font-body text-xs uppercase tracking-[0.42em] text-[#d76a4e]/72">Tool Lab</p>
          <h1 className="mt-4 font-display text-6xl font-semibold tracking-normal text-[#fff2e4] sm:text-7xl">
            小工具实验室
          </h1>
          <div className="mt-5 h-[3px] w-28 bg-[#d76a4e]" />

          <section
            aria-label="实验室概览"
            className="mt-8 grid w-full gap-3 text-left sm:grid-cols-3"
          >
            {labSnapshots.map((snapshot) => (
              <div
                key={snapshot.label}
                className="border-[3px] border-[#241312] bg-[#f1e5d2] p-3 text-[#241312] shadow-[4px_5px_0_rgba(116,48,36,0.76)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9f4d3e]">
                  {snapshot.label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6">{snapshot.value}</p>
              </div>
            ))}
          </section>

          <div className="mt-8">
            <ToolCategoryFilter
              categories={toolCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </header>

        <section aria-label="工具列表" className="mt-10 pb-16">
          {visibleTools.length === 0 ? (
            <ToolEmptyState />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {visibleTools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
