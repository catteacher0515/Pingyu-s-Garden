import type { Article, ArticleSeries } from '../types'

export const articleSeriesFilters = ['全部', 'AI 杂谈', 'AI 工具箱', '每周 GitHub 精选'] as const
export type ArticleSeriesFilter = (typeof articleSeriesFilters)[number]

export function filterArticlesBySeries(series: ArticleSeriesFilter): Article[] {
  if (series === '全部') {
    return articles
  }

  return articles.filter((article) => article.series === series)
}

export const articles: Article[] = [
  {
    id: 'weread-skill',
    title: '微信读书 skill 上手后，我终于不用在书海里乱翻了',
    cover: '/articles/weread-skill.png',
    url: 'https://zhuanlan.zhihu.com/p/2042247342024381106',
    series: 'AI 工具箱',
  },
  {
    id: 'github-w21',
    title: 'GitHub 每周精选｜2026 W21',
    cover: '/articles/github-w21.png',
    url: 'https://zhuanlan.zhihu.com/p/2042011598328520958',
    series: '每周 GitHub 精选',
  },
  {
    id: 'mac-switch',
    title: '从 Windows 换到 Mac 一个月后...',
    cover: '/articles/mac-switch.png',
    url: 'https://zhuanlan.zhihu.com/p/2041197416792250283',
    series: 'AI 杂谈',
  },
  {
    id: 'ppt-skill',
    title: '一个 25 天破万 Star 的 PPT Skill，确实有点强',
    cover: '/articles/ppt-skill.png',
    url: 'https://zhuanlan.zhihu.com/p/2040526006285509057',
    series: 'AI 工具箱',
  },
  {
    id: 'github-w20',
    title: '本周 GitHub 留档｜2026 W20',
    cover: '/articles/github-w20.png',
    url: 'https://zhuanlan.zhihu.com/p/2039835060895999721',
    series: '每周 GitHub 精选',
  },
  {
    id: 'wechat-markdown',
    title: '这个 GitHub 项目，帮你完成公众号排版',
    cover: '/articles/wechat-markdown.png',
    url: 'https://zhuanlan.zhihu.com/p/2038552034346053660',
    series: 'AI 工具箱',
  },
]

export const articleSeries: ArticleSeries[] = ['AI 杂谈', 'AI 工具箱', '每周 GitHub 精选']
