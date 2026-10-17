// 从 Obsidian 库里挑出要公开的内容，转换成网站能用的 Markdown：
//   勾了属性 `publish` 的 → 笔记（src/content/notes）
//   勾了属性 `发成文章` 的 → 文章（src/content/posts/obsidian，文章页里和其他文章排在一起）。
//   不用 article 这个名字：库里已有笔记把它当文字属性用，Obsidian 的属性类型是全库共用的
// 只读 Obsidian 库，不会修改库里的任何文件。含密钥或公网 IP 的不会发布，会在输出里提醒。
//
// 用法：node scripts/sync-notes.mjs [--dry-run]
// 库的位置默认是 iCloud 里的 Obsidian，可用环境变量 OBSIDIAN_VAULT 覆盖。

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { parse as parseYaml, stringify as toYaml } from 'yaml'
import sharp from 'sharp'

const VAULT = process.env.OBSIDIAN_VAULT
  ?? path.join(process.env.HOME, 'Library/Mobile Documents/com~apple~CloudDocs/Obsidian')
const ROOT = path.resolve(import.meta.dirname, '..')
const OUT_NOTES = path.join(ROOT, 'src/content/notes')
const OUT_POSTS = path.join(ROOT, 'src/content/posts/obsidian')
const OUT_MEDIA = path.join(ROOT, 'public/media/notes')
const MEDIA_URL = '/media/notes'
const DRY = process.argv.includes('--dry-run')
const SKIP_DIRS = new Set(['.obsidian', '.trash', '.git', '.smart-env', '.claudian', '.claude', '.stfolder', 'node_modules'])
const STATUS = { seedling: 'seedling', growing: 'growing', evergreen: 'evergreen', '🌱': 'seedling', '🌿': 'growing', '🌳': 'evergreen' }

if (!fs.existsSync(VAULT)) {
  console.error(`找不到 Obsidian 库：${VAULT}\n可以用 OBSIDIAN_VAULT=/库的路径 指定。`)
  process.exit(1)
}

// 1. 扫描整个库：记下所有 Markdown 和附件的位置
const mdFiles = []
const assetsByName = new Map() // 文件名 → 绝对路径（Obsidian 的 ![[x.png]] 只写文件名）
;(function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.') && ent.isDirectory()) continue
    if (SKIP_DIRS.has(ent.name)) continue
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p)
    else if (ent.name.endsWith('.md')) mdFiles.push(p)
    else if (!assetsByName.has(ent.name)) assetsByName.set(ent.name, p)
  }
})(VAULT)

function splitFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return { data: {}, body: src }
  try {
    return { data: parseYaml(m[1]) ?? {}, body: src.slice(m[0].length) }
  } catch {
    return { data: {}, body: src.slice(m[0].length) }
  }
}

const isTrue = (v) => v === true || v === 'true' || v === 'yes'
const slugify = (s) => s.trim().replace(/[\\/?#%"<>|:*\s]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

// 2. 找出要发布的笔记
const notes = []
const warnings = []
const blocked = []
for (const file of mdFiles) {
  const src = fs.readFileSync(file, 'utf8')
  if (!/^(publish|发成文章)\s*:/m.test(src)) continue
  const { data, body } = splitFrontmatter(src)
  const article = isTrue(data['发成文章'])
  if (!article && !isTrue(data.publish)) {
    // 写了 publish 却没被识别成属性（最常见：文件第一行是空行），提醒一下
    if (/^(publish|发成文章)\s*:\s*true\s*$/m.test(src) && !/^---\r?\n/.test(src)) {
      warnings.push(`${path.relative(VAULT, file)}：勾了发布但没生效。属性必须从文件第一行的 --- 开始，请删掉它前面的空行。`)
    }
    continue
  }
  const name = path.basename(file, '.md')
  const rel = path.relative(VAULT, file)
  const folder = path.dirname(rel)
  // 不小心把密钥、令牌或服务器 IP 写进了要公开的笔记：这篇先不发布
  const secret = body.match(/github_pat_\w+|gh[pousr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|\b(?!(?:10|127|0)\.)(?!192\.168\.)(?!172\.(?:1[6-9]|2\d|3[01])\.)(?:\d{1,3}\.){3}\d{1,3}\b/)
  if (secret) {
    blocked.push(`${path.relative(VAULT, file)}：里面有像密钥或服务器 IP 的内容（${secret[0].slice(0, 12)}…），先没发布。删掉或改成 xxx 后会自动发布。`)
    continue
  }
  notes.push({
    file, rel, name, body, data, article,
    slug: slugify(String(data.slug ?? name)),
    title: String(data.title ?? name),
    topic: String(data.topic ?? (folder === '.' ? '未分类' : folder.split(path.sep).pop())),
    status: STATUS[String(data.status ?? '').trim()] ?? 'growing',
    updated: data.updated ? new Date(data.updated) : fs.statSync(file).mtime,
  })
}

const seen = new Map()
for (const n of notes) {
  if (seen.has(n.slug)) n.slug = `${n.slug}-${crypto.createHash('md5').update(n.rel).digest('hex').slice(0, 6)}`
  seen.set(n.slug, n)
}
const byName = new Map(notes.map((n) => [n.name, n]))
// 笔记和文章的网址前缀不同
const href = (n) => `/${n.article ? 'articles' : 'notes'}/${encodeURIComponent(n.slug)}/`
// 文章的 slug 不能和手写的文章重名（重名会让网站构建失败）
const handPosts = new Set(fs.readdirSync(path.join(ROOT, 'src/content/posts')).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)))
for (const n of notes) if (n.article && handPosts.has(n.slug)) n.slug = `${n.slug}-ob`

// 3. 转换 Obsidian 写法
const usedAssets = new Map() // 源路径 → 网站上的文件名
function assetUrl(absPath) {
  if (!usedAssets.has(absPath)) {
    const ext = RASTER.test(absPath) ? '.webp' : path.extname(absPath)
    const hash = crypto.createHash('md5').update(absPath).digest('hex').slice(0, 10)
    usedAssets.set(absPath, `${hash}${ext}`)
  }
  return `${MEDIA_URL}/${usedAssets.get(absPath)}`
}
const IMG = /\.(png|jpe?g|gif|webp|svg|avif|bmp)$/i
const RASTER = /\.(png|jpe?g)$/i // 这两种转成压缩后的 WebP

function convert(n) {
  let s = n.body
  // 去掉 Obsidian 注释 %% ... %%
  s = s.replace(/%%[\s\S]*?%%/g, '')
  // 保护代码块，避免误改里面的 [[ ]]
  const blocks = []
  s = s.replace(/```[\s\S]*?```|`[^`\n]+`/g, (m) => `\u0000${blocks.push(m) - 1}\u0000`)

  // ![[附件|宽度]] / ![[另一篇笔记]]
  s = s.replace(/!\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g, (_, target, alt) => {
    target = target.trim()
    const asset = assetsByName.get(target) ?? assetsByName.get(path.basename(target))
    if (asset && IMG.test(asset)) {
      const width = /^\d+$/.test(alt ?? '') ? ` width="${alt}"` : ''
      return width ? `<img src="${assetUrl(asset)}" alt=""${width} />` : `![](${encodeURI(assetUrl(asset))})`
    }
    if (asset) return `[${path.basename(asset)}](${encodeURI(assetUrl(asset))})`
    const linked = byName.get(target.replace(/\.md$/, ''))
    if (linked) return `[${linked.title}](${href(linked)})`
    warnings.push(`${n.rel}：找不到嵌入的「${target}」`)
    return ''
  })

  // ![](相对路径) 形式的本地图片
  s = s.replace(/!\[([^\]]*)\]\((?!https?:|\/|data:)([^)\s]+)\)/g, (m, alt, p) => {
    const clean = decodeURI(p)
    const candidates = [path.resolve(path.dirname(n.file), clean), path.resolve(VAULT, clean)]
    const found = candidates.find((c) => fs.existsSync(c)) ?? assetsByName.get(path.basename(clean))
    if (!found) { warnings.push(`${n.rel}：找不到图片「${p}」`); return '' }
    return `![${alt}](${encodeURI(assetUrl(found))})`
  })

  // [[笔记#标题|别名]]
  s = s.replace(/\[\[([^\]|#]*)(?:#([^\]|]*))?(?:\|([^\]]*))?\]\]/g, (_, target, heading, alias) => {
    const label = alias ?? (target || heading || '')
    const asset = target && (assetsByName.get(target.trim()) ?? assetsByName.get(path.basename(target.trim())))
    if (asset) return `[${alias ?? path.basename(asset)}](${encodeURI(assetUrl(asset))})`
    const linked = target ? byName.get(target.trim()) : n
    if (!linked) return label // 链到没公开的笔记：只保留文字
    // 和 Astro 生成标题锚点的规则保持一致：小写、去标点、空格变连字符
    const anchor = (heading ?? '').trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-')
    const hash = heading ? `#${encodeURIComponent(anchor)}` : ''
    return `[${label}](${href(linked)}${hash})`
  })

  // ==高亮==
  s = s.replace(/==([^=\n]+)==/g, '<mark>$1</mark>')
  // > [!note] 标题  → 加粗标题的引用块
  s = s.replace(/^(\s*>\s*)\[!(\w+)\][+-]?\s*(.*)$/gm, (_, q, type, title) => `${q}**${title || type}**`)

  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => blocks[Number(i)])
  return s.trim() + '\n'
}

// 封面：属性 cover 可以写 ![[图.png]]、[[图.png]]、图.png 或网址；没写就用正文里第一张图
function coverOf(n, body) {
  const raw = n.data.cover ?? n.data.banner
  if (raw) {
    const v = String(Array.isArray(raw) ? raw[0] : raw).replace(/^!?\[\[|\]\]$/g, '').split('|')[0].trim()
    if (/^https?:/.test(v)) return v
    const asset = assetsByName.get(v) ?? assetsByName.get(path.basename(v))
    if (asset && IMG.test(asset)) return assetUrl(asset)
  }
  return body.match(/!\[[^\]]*\]\(([^)\s]+)\)|<img src="([^"]+)"/)?.slice(1).find(Boolean)
}
const day = (d) => new Date(d).toISOString().slice(0, 10)
const tagsOf = (n) => (Array.isArray(n.data.tags) ? n.data.tags.map(String) : n.data.tags ? [String(n.data.tags)] : [])

const outputs = notes.map((n) => {
  const body = convert(n)
  const summary = n.data.summary ?? n.data.description
  const note = `<!-- 由 scripts/sync-notes.mjs 从 Obsidian「${n.rel}」生成，请在 Obsidian 里修改 -->`
  if (n.article) {
    const cover = coverOf(n, body)
    const origin = n.data.origin ?? n.data.zhihu
    const fm = {
      slug: n.slug,
      title: n.title,
      category: '文章',
      date: day(n.data.date ?? n.data.created ?? fs.statSync(n.file).birthtime),
      ...(cover ? { cover: decodeURI(cover) } : {}),
      ...(summary ? { summary: String(summary) } : {}),
      tags: tagsOf(n),
      ...(origin && /^https?:/.test(String(origin)) ? { origin: String(origin) } : {}),
    }
    return { file: path.join(OUT_POSTS, `${n.slug}.md`), text: `---\n${toYaml(fm)}---\n\n${note}\n\n${body}` }
  }
  const fm = {
    slug: n.slug, // Astro 用它做网址，和双链里的链接保持一致
    title: n.title,
    topic: n.topic,
    status: n.status,
    updated: day(n.updated),
    ...(summary ? { summary: String(summary) } : {}),
    tags: tagsOf(n),
  }
  return { file: path.join(OUT_NOTES, `${n.slug}.md`), text: `---\n${toYaml(fm)}---\n\n${note}\n\n${body}` }
})

const nArticles = notes.filter((n) => n.article).length
console.log(`扫描了 ${mdFiles.length} 篇，要发布 ${notes.length - nArticles} 篇笔记、${nArticles} 篇文章，引用图片/附件 ${usedAssets.size} 个。`)
for (const n of notes) console.log(`  · ${n.article ? '[文章]' : `[${n.topic}]`} ${n.title}  ←  ${n.rel}`)
for (const w of warnings) console.log(`  ⚠ ${w}`)
for (const b of blocked) console.log(`  ⛔ ${b}`)
if (DRY) { console.log('（试运行，没有写入任何文件）'); process.exit(0) }

// 4. 写入网站：这三个目录完全由脚本生成，先清空再写，取消勾选的内容会自动下线
for (const dir of [OUT_NOTES, OUT_POSTS, OUT_MEDIA]) {
  fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, '.gitkeep'), '')
}
for (const o of outputs) fs.writeFileSync(o.file, o.text)
for (const [src, name] of usedAssets) {
  const dest = path.join(OUT_MEDIA, name)
  if (RASTER.test(src)) await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(dest)
  else fs.copyFileSync(src, dest)
}
console.log(`已写入 ${notes.length - nArticles} 篇笔记、${nArticles} 篇文章。`)
