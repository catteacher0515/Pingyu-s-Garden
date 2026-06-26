import type { Article, ArticleSeries, ArticleSeriesId } from '../types'

export const articleSeries: ArticleSeries[] = [
  { id: 'ai-talk', label: 'AI 杂谈' },
  { id: 'ai-tools', label: 'AI 工具箱' },
  { id: 'github-weekly', label: '每周 GitHub 精选' },
  { id: 'personal-tools', label: '自制小东西' },
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
    id: 'github-w25',
    title: 'GitHub 每周精选｜2026 W25',
    cover: '/articles/github-w25.jpg',
    url: 'https://zhuanlan.zhihu.com/p/2051815045424736007',
    seriesId: 'github-weekly',
  },
  {
    id: 'github-w23',
    title: 'GitHub 每周精选｜2026 W23',
    cover: '/articles/github-w23.jpg',
    url: 'https://zhuanlan.zhihu.com/p/2047322016114644289',
    seriesId: 'github-weekly',
  },
  {
    id: 'web-access-codex',
    title: '有了 web-access，Codex 才真正开始 "会上网"',
    cover: '/articles/web-access-codex.jpg',
    url: 'https://zhuanlan.zhihu.com/p/2045226036393202761',
    seriesId: 'ai-tools',
  },
  {
    id: 'github-w22',
    title: 'GitHub 每周精选｜2026 W22',
    cover: '/articles/github-w22.jpg',
    url: 'https://zhuanlan.zhihu.com/p/2044533439232226589',
    seriesId: 'github-weekly',
  },
  {
    id: 'cet6-truths',
    title: '获取四六级真题，不要再在评论区刷 ×× 啦！',
    cover: '/articles/cet6-truths.jpg',
    url: 'https://zhuanlan.zhihu.com/p/2037981546599141435',
    seriesId: 'personal-tools',
  },
  {
    id: 'xiaohongshu-cleaner',
    title: '开源 | 我做了一个免费，无广的小红书敏感词 "净化器"',
    cover: '/articles/xiaohongshu-cleaner.jpg',
    url: 'https://zhuanlan.zhihu.com/p/2023062113053152634',
    seriesId: 'personal-tools',
  },
  {
    id: 'topic-hot-tracker',
    title: '做内容选题再也不愁了！这个开源工具帮我自动追热点',
    cover: '/articles/topic-hot-tracker.jpg',
    url: 'https://zhuanlan.zhihu.com/p/2021596837484790760',
    seriesId: 'personal-tools',
  },
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
