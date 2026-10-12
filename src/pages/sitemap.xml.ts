import type { APIRoute } from 'astro'
import { getVideos, getPosts, getNotes, getRants, videoHref, noteHref } from '../lib/content'

export const GET: APIRoute = async ({ site }) => {
  const [videos, posts, notes, rants] = await Promise.all([getVideos(), getPosts(), getNotes(), getRants()])
  const paths = [
    '/',
    ...(videos.length ? ['/videos/'] : []),
    ...(posts.length || notes.length ? ['/writing/'] : []),
    ...(rants.length ? ['/rants/'] : []),
    ...videos.map(videoHref),
    ...posts.filter((p) => !p.data.external).map((p) => `/posts/${p.id}/`),
    ...notes.map(noteHref),
  ]
  const urls = paths.map((p) => `<url><loc>${new URL(p, site).href}</loc></url>`).join('')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } })
}
