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
export const projectHref = (p: Project) => p.data.link ?? p.data.repo ?? '/'

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
const PALETTE = [['#ff4b1f', '#ffb199'], ['#3d5afe', '#9aa8ff'], ['#00a37a', '#9be7c8'], ['#ffb300', '#ffe08a'], ['#c2185b', '#f48fb1']]
export function thumb(i: number) {
  const [a, b] = PALETTE[i % PALETTE.length]
  return `radial-gradient(120% 90% at ${20 + (i * 23) % 60}% ${30 + (i * 17) % 40}%, ${b} 0%, ${a} 55%, #111 140%)`
}

export const fmtDay = (d: Date) => `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`

export type WritingRow = { kind: '教程' | '笔记' | '文章'; title: string; href: string; meta: string; cover?: string; draft: boolean; external: boolean; date: number }

/** 教程（含文章）和笔记合成一个按时间倒序的列表 */
export async function getWritingRows(): Promise<WritingRow[]> {
  const [posts, notes] = await Promise.all([getPosts(), getNotes()])
  return [
    ...posts.map((p) => ({
      kind: p.data.category, title: p.data.title, href: postHref(p), cover: opt(p.data.cover), draft: p.data.draft, external: !!p.data.external,
      meta: [p.data.tags[0], p.data.date && fmtDay(p.data.date)].filter(Boolean).join(' · '), date: time(p.data.date),
    })),
    ...notes.map((n) => ({
      kind: '笔记' as const, title: n.data.title, href: noteHref(n), draft: false, external: false,
      meta: `${NOTE_STATUS[n.data.status].icon} ${n.data.topic} · ${fmtDay(n.data.updated)}`, date: time(n.data.updated),
    })),
  ].sort((a, b) => b.date - a.date)
}

export type SearchItem = { title: string; label: string; href: string; cover?: string; text: string }

export async function getSearchIndex(): Promise<SearchItem[]> {
  const [videos, posts, projects, notes] = await Promise.all([getVideos(), getPosts(), getProjects(), getNotes()])
  return [
    ...videos.map((x) => ({ title: x.data.title, label: '视频', href: videoHref(x), cover: opt(x.data.cover), text: [x.data.summary, ...x.data.tags].join(' ') })),
    ...posts.map((x) => ({ title: x.data.title, label: x.data.category, href: postHref(x), cover: opt(x.data.cover), text: [x.data.summary, ...x.data.tags].join(' ') })),
    ...projects.map((x) => ({ title: x.data.title, label: '项目', href: projectHref(x), cover: opt(x.data.cover), text: [x.data.summary, x.data.status, ...x.data.tags].join(' ') })),
    ...notes.map((x) => ({ title: x.data.title, label: '笔记', href: noteHref(x), text: [x.data.topic, x.data.summary, ...x.data.tags].join(' ') })),
  ]
}
