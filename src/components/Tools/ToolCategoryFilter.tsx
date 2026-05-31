import type { ToolCategory, ToolCategoryFilterId } from '../../data/tools'

interface ToolCategoryFilterProps {
  categories: ToolCategory[]
  selectedCategory: ToolCategoryFilterId
  onSelectCategory: (categoryId: ToolCategoryFilterId) => void
}

export default function ToolCategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: ToolCategoryFilterProps) {
  return (
    <nav aria-label="工具分类" className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const isActive = selectedCategory === category.id

        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? 'border-[#f1e5d2] bg-[#f1e5d2] text-[#241312] shadow-[4px_5px_0_rgba(116,48,36,0.82)]'
                : 'border-[#f1e5d2]/28 bg-[#120d0c]/80 text-[#f1e5d2]/72 hover:border-[#d76a4e] hover:text-[#fff2e4]'
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.label}
          </button>
        )
      })}
    </nav>
  )
}
