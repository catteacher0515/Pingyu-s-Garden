import { getCollection, type CollectionEntry } from 'astro:content'
import { opt } from './img'

export type Video = CollectionEntry<'videos'>
export type Post = CollectionEntry<'posts'>
export type Project = CollectionEntry<'projects'>
export type Note = CollectionEntry<'notes'>
export type Rant = CollectionEntry<'rants'>

// 草稿只在本地 `npm run dev` 时出现，构建上线时自动隐藏。
const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft

const time = (d?: Date) => d?.getTime() ?? 0

export async function getVideos() {
  return (await getCollection('videos', visible)).sort((a, b) => time(b.data.date) - time(a.data.date))
}

export async function getPosts() {
  return (await getCollection('posts', visible)).sort(
    (a, b) => time(b.data.date) - time(a.data.date) || a.data.order - b.data.order,
  )
}

export async function getProjects() {
  return (await getCollection('projects', visible)).sort((a, b) => a.data.order - b.data.order)
}

export const projectPageHref = (p: Project) => `/projects/${p.id}/`

export async function getRants() {
  return (await getCollection('rants', visible)).sort((a, b) => time(b.data.date) - time(a.data.date))
}

export async function getNotes() {
  return (await getCollection('notes')).sort((a, b) => time(b.data.updated) - time(a.data.updated))
}

export const NOTE_STATUS = {
  seedling: { icon: '🌱', label: '刚开始' },
  growing: { icon: '🌿', label: '持续补充' },
  evergreen: { icon: '🌳', label: '已成型' },
} as const

/** 按主题分组，主题按最近更新时间排序 */
export function groupNotes(notes: Note[]) {
  const map = new Map<string, Note[]>()
  for (const n of notes) map.set(n.data.topic, [...(map.get(n.data.topic) ?? []), n])
  return [...map.entries()].map(([topic, items]) => ({ topic, items }))
}

export const noteHref = (n: Note) => `/notes/${n.id}/`
export const postHref = (p: Post) => p.data.external ?? `/articles/${p.id}/`
export const videoHref = (v: Video) => `/videos/${v.id}/`

export function bvidOf(url: string) {
  return url.match(/BV[0-9A-Za-z]{10}/)?.[0]
}

/** 各栏目是否有已发布内容；没有内容的栏目不在导航、侧边栏、首页入口里出现 */
export async function getSectionPresence() {
  const [videos, posts, notes, projects, rants] = await Promise.all([getVideos(), getPosts(), getNotes(), getProjects(), getRants()])
  return {
    videos: videos.length > 0,
    posts: posts.length > 0,
    tutorials: posts.some((p) => p.data.category === '教程'),
    articles: posts.some((p) => p.data.category === '文章'),
    notes: notes.length > 0,
    projects: projects.length > 0,
    rants: rants.length > 0,
  }
}

export const STATUS_ORDER = ['可访问', '自用中', '实验中', '已归档'] as const
export const CATEGORY_ORDER = ['教程', '文章'] as const

/** 没有封面时的统一缩略图：渐变色块，按序号轮换 */
const PALETTE = [['#23357d', '#6f84d6'], ['#f2b22c', '#ffe3a0'], ['#131c46', '#4b5a9e'], ['#3f6fd8', '#b9cbff'], ['#c98a14', '#f7d27a']]
export function thumb(i: number) {
  const [a, b] = PALETTE[i % PALETTE.length]
  return `radial-gradient(120% 90% at ${20 + (i * 23) % 60}% ${30 + (i * 17) % 40}%, ${b} 0%, ${a} 55%, #131c46 140%)`
}

export const fmtDay = (d: Date) => `${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(d.getUTCDate()).padStart(2, '0')}`

export type Row = { kind: string; title: string; href: string; meta: string; cover?: string; draft: boolean; external: boolean; date: number }

/** 学习笔记（来自 Obsidian），按更新时间倒序 */
export async function getNoteRows(): Promise<Row[]> {
  return (await getNotes()).map((n) => ({
    kind: n.data.topic, title: n.data.title, href: noteHref(n), draft: false, external: false,
    meta: `${NOTE_STATUS[n.data.status].icon} ${NOTE_STATUS[n.data.status].label} · ${fmtDay(n.data.updated)}`, date: time(n.data.updated),
  }))
}

/** 公开发布的文章和教程，按发布时间倒序 */
export async function getArticleRows(): Promise<Row[]> {
  return (await getPosts()).map((p) => ({
    kind: p.data.tags[0] ?? p.data.category, title: p.data.title, href: postHref(p), cover: opt(p.data.cover), draft: p.data.draft, external: !!p.data.external,
    meta: [p.data.external ? '知乎' : p.data.category, p.data.date && fmtDay(p.data.date)].filter(Boolean).join(' · '), date: time(p.data.date),
  }))
}

export type SearchItem = { title: string; label: string; href: string; cover?: string; text: string }

export async function getSearchIndex(): Promise<SearchItem[]> {
  const [videos, posts, projects, notes] = await Promise.all([getVideos(), getPosts(), getProjects(), getNotes()])
  return [
    ...videos.map((x) => ({ title: x.data.title, label: '视频', href: videoHref(x), cover: opt(x.data.cover), text: [x.data.summary, ...x.data.tags].join(' ') })),
    ...posts.map((x) => ({ title: x.data.title, label: x.data.category, href: postHref(x), cover: opt(x.data.cover), text: [x.data.summary, ...x.data.tags].join(' ') })),
    ...projects.map((x) => ({ title: x.data.title, label: '项目', href: projectPageHref(x), cover: opt(x.data.cover), text: [x.data.tagline, x.data.role, ...x.data.stack].join(' ') })),
    ...notes.map((x) => ({ title: x.data.title, label: '笔记', href: noteHref(x), text: [x.data.topic, x.data.summary, ...x.data.tags].join(' ') })),
  ]
}
