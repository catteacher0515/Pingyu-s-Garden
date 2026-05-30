import type { Article, ArticleSeries, ArticleSeriesId } from '../types'

export const articleSeries: ArticleSeries[] = [
  { id: 'ai-talk', label: 'AI 杂谈' },
  { id: 'ai-tools', label: 'AI 工具箱' },
  { id: 'github-weekly', label: '每周 GitHub 精选' },
]

export const articleSeriesFilters = [{ id: 'all', label: '全部' }, ...articleSeries] as const
export type ArticleSeriesFilterId = 'all' | ArticleSeriesId

export function getArticleSeriesLabel(seriesId: ArticleSeriesId): string {
  return articleSeries.find((series) => series.id === seriesId)?.label ?? seriesId
}

export function filterArticlesBySeries(seriesId: ArticleSeriesFilterId): Article[] {
  if (seriesId === 'all') {
    return articles
  }

  return articles.filter((article) => article.seriesId === seriesId)
}

export const articles: Article[] = [
  {
    id: 'weread-skill',
    title: '微信读书 skill 上手后，我终于不用在书海里乱翻了',
    cover: '/articles/weread-skill.png',
    url: 'https://zhuanlan.zhihu.com/p/2042247342024381106',
    seriesId: 'ai-tools',
  },
  {
    id: 'github-w21',
    title: 'GitHub 每周精选｜2026 W21',
    cover: '/articles/github-w21.png',
    url: 'https://zhuanlan.zhihu.com/p/2042011598328520958',
    seriesId: 'github-weekly',
  },
  {
    id: 'mac-switch',
    title: '从 Windows 换到 Mac 一个月后...',
    cover: '/articles/mac-switch.png',
    url: 'https://zhuanlan.zhihu.com/p/2041197416792250283',
    seriesId: 'ai-talk',
  },
  {
    id: 'ppt-skill',
    title: '一个 25 天破万 Star 的 PPT Skill，确实有点强',
    cover: '/articles/ppt-skill.png',
    url: 'https://zhuanlan.zhihu.com/p/2040526006285509057',
    seriesId: 'ai-tools',
  },
  {
    id: 'github-w20',
    title: '本周 GitHub 留档｜2026 W20',
    cover: '/articles/github-w20.png',
    url: 'https://zhuanlan.zhihu.com/p/2039835060895999721',
    seriesId: 'github-weekly',
  },
  {
    id: 'wechat-markdown',
    title: '这个 GitHub 项目，帮你完成公众号排版',
    cover: '/articles/wechat-markdown.png',
    url: 'https://zhuanlan.zhihu.com/p/2038552034346053660',
    seriesId: 'ai-tools',
  },
]
