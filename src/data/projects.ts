import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'featured-project-seed',
    title: '代表项目种子位',
    year: '2026',
    status: '规划中',
    role: '产品梳理 / 前端实现 / 工作流搭建',
    summary:
      '这里保留一个可替换的项目种子位，用来承载后续真实项目的标题、过程、成果和链接，不提前编造经历。',
    outcome: '当前阶段先完成作品集项目卡片的信息结构，后续用真实项目数据替换。',
    tags: ['结构化内容', '成果导向', '链接策略'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/catteacher0515',
        kind: 'github',
      },
      {
        label: '项目文章',
        kind: 'article',
      },
      {
        label: '在线 Demo',
        kind: 'demo',
      },
    ],
  },
]
