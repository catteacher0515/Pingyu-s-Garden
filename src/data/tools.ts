import type { Tool, ToolCategoryFilterId } from '../types'

export type { ToolCategoryFilterId }

export interface ToolCategory {
  id: ToolCategoryFilterId
  label: string
}

export const toolCategories: ToolCategory[] = [
  { id: 'all', label: '全部' },
  { id: 'content-tools', label: '内容工具' },
  { id: 'ai-workflow', label: 'AI 工作流' },
  { id: 'lark-automation', label: '飞书自动化' },
  { id: 'skill', label: 'Skill' },
  { id: 'script', label: '脚本' },
]

export const tools: Tool[] = []

export function filterToolsByCategory(categoryId: ToolCategoryFilterId) {
  if (categoryId === 'all') {
    return tools
  }

  return tools.filter((tool) => tool.categoryIds.includes(categoryId))
}
