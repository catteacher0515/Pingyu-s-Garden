import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// 这三个集合和 public/admin/config.yml 里的字段一一对应，改一边要同步改另一边。

const common = {
  title: z.string(),
  summary: z.string().optional(),
  cover: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
}

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    ...common,
    date: z.coerce.date(),
    url: z.string().url(),
    platform: z.string().default('B站'),
    preview: z.string().optional(),
  }),
})

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    ...common,
    category: z.enum(['教程', '文章']),
    date: z.coerce.date().optional(),
    external: z.string().url().optional(),
    order: z.number().default(0),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    ...common,
    status: z.enum(['可访问', '自用中', '实验中', '已归档']),
    form: z.string().optional(),
    link: z.string().url().optional(),
    repo: z.string().url().optional(),
    order: z.number().default(0),
  }),
})

// 笔记由 scripts/sync-notes.mjs 从 Obsidian 生成，不在编辑后台里改
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    topic: z.string(),
    status: z.enum(['seedling', 'growing', 'evergreen']).default('growing'),
    updated: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
})

// 发发神经：牢骚和小感悟，不需要标题
const rants = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rants' }),
  schema: z.object({
    date: z.coerce.date(),
    mood: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})

export const collections = { videos, posts, projects, notes, rants }
