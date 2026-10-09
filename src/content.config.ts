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
    category: z.enum(['教程', '文章', '周刊']),
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

export const collections = { videos, posts, projects }
