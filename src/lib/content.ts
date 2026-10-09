import { getCollection, type CollectionEntry } from 'astro:content'

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
export const postHref = (p: Post) => p.data.external ?? `/posts/${p.id}/`
export const videoHref = (v: Video) => `/videos/${v.id}/`
export const projectHref = (p: Project) => p.data.link ?? p.data.repo ?? '/projects/'

export function bvidOf(url: string) {
  return url.match(/BV[0-9A-Za-z]{10}/)?.[0]
}

export const STATUS_ORDER = ['可访问', '自用中', '实验中', '已归档'] as const
export const CATEGORY_ORDER = ['教程', '文章'] as const

export const ICON = '/images/doodles/'

export type ReelItem = {
  kind: 'video' | 'project' | 'post'
  label: string
  title: string
  summary?: string
  cover?: string
  preview?: string
  href: string
  external: boolean
  draft: boolean
  meta?: string
  category?: string
}

export async function getReelItems(): Promise<ReelItem[]> {
  const [videos, posts, projects] = await Promise.all([getVideos(), getPosts(), getProjects()])
  const v: ReelItem[] = videos.filter((x) => x.data.featured).map((x) => ({
    kind: 'video', label: '视频', title: x.data.title, summary: x.data.summary, cover: x.data.cover,
    preview: x.data.preview, href: videoHref(x), external: false, draft: x.data.draft, meta: x.data.platform,
  }))
  const p: ReelItem[] = posts.filter((x) => x.data.featured).map((x) => ({
    kind: 'post', label: x.data.category, title: x.data.title, summary: x.data.summary, cover: x.data.cover,
    href: postHref(x), external: !!x.data.external, draft: x.data.draft, category: x.data.category,
    meta: x.data.external ? '知乎' : undefined,
  }))
  const j: ReelItem[] = projects.filter((x) => x.data.featured).map((x) => ({
    kind: 'project', label: '项目', title: x.data.title, summary: x.data.summary, cover: x.data.cover,
    href: projectHref(x), external: !!(x.data.link || x.data.repo), draft: x.data.draft, meta: x.data.status,
  }))
  // 交错排列，让放映厅里不同类型的内容轮流出现
  const out: ReelItem[] = []
  for (let i = 0; i < Math.max(v.length, p.length, j.length); i++) {
    for (const list of [v, j, p]) if (list[i]) out.push(list[i])
  }
  return out
}

export type SearchItem = { title: string; label: string; href: string; cover?: string; text: string }

export async function getSearchIndex(): Promise<SearchItem[]> {
  const [videos, posts, projects, notes] = await Promise.all([getVideos(), getPosts(), getProjects(), getNotes()])
  return [
    ...videos.map((x) => ({ title: x.data.title, label: '视频', href: videoHref(x), cover: x.data.cover, text: [x.data.summary, ...x.data.tags].join(' ') })),
    ...posts.map((x) => ({ title: x.data.title, label: x.data.category, href: postHref(x), cover: x.data.cover, text: [x.data.summary, ...x.data.tags].join(' ') })),
    ...projects.map((x) => ({ title: x.data.title, label: '项目', href: projectHref(x), cover: x.data.cover, text: [x.data.summary, x.data.status, ...x.data.tags].join(' ') })),
    ...notes.map((x) => ({ title: x.data.title, label: '笔记', href: noteHref(x), text: [x.data.topic, x.data.summary, ...x.data.tags].join(' ') })),
  ]
}
