import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import readline from 'node:readline/promises'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const dataPath = path.join(rootDir, 'src/data/articles.ts')
const typesPath = path.join(rootDir, 'src/types.ts')
const publicArticlesDir = path.join(rootDir, 'public/articles')

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function isSlug(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
}

export function isCoverFileName(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*\.(png|jpe?g|webp)$/i.test(value)
}

export function parseArticleSeries(source) {
  const seriesBlock = source.match(/export const articleSeries(?:\s*:\s*ArticleSeries\[\])?\s*=\s*\[([\s\S]*?)\]\n/)
  if (!seriesBlock) {
    return []
  }

  return [...seriesBlock[1].matchAll(/\{\s*id:\s*'([^']+)',\s*label:\s*'([^']+)'\s*\}/g)].map((match) => ({
    id: match[1],
    label: match[2],
  }))
}

export function buildArticleEntry({ id, title, cover, url, seriesId }) {
  return `  {
    id: '${id}',
    title: '${escapeSingleQuote(title)}',
    cover: '${cover}',
    url: '${url}',
    seriesId: '${seriesId}',
  },`
}

export function buildSeriesEntry(id, label) {
  return `  { id: '${id}', label: '${escapeSingleQuote(label)}' },`
}

export function insertArticleEntry(source, entry) {
  const marker = 'export const articles: Article[] = [\n'
  if (!source.includes(marker)) {
    throw new Error(`Cannot find marker: ${marker.trim()}`)
  }

  return source.replace(marker, `${marker}${entry}\n`)
}

export function insertSeriesEntry(source, entry) {
  if (source.includes(entry.trim())) {
    return source
  }

  const marker = 'export const articleSeries: ArticleSeries[] = [\n'
  if (!source.includes(marker)) {
    throw new Error(`Cannot find marker: ${marker.trim()}`)
  }

  return source.replace(marker, `${marker}${entry}\n`)
}

export function insertSeriesIdType(source, seriesId) {
  if (source.includes(`'${seriesId}'`)) {
    return source
  }

  return source.replace(
    /export type ArticleSeriesId = ([^\n]+)/,
    (_match, union) => `export type ArticleSeriesId = ${union} | '${seriesId}'`,
  )
}

function escapeSingleQuote(value) {
  return value.replaceAll("'", "\\'")
}

async function ask(rl, question, defaultValue = '') {
  const suffix = defaultValue ? ` (${defaultValue})` : ''
  const answer = (await rl.question(`${question}${suffix}: `)).trim()
  return answer || defaultValue
}

async function askRequired(rl, question, validator, errorMessage, defaultValue = '') {
  while (true) {
    const answer = await ask(rl, question, defaultValue)
    if (validator(answer)) {
      return answer
    }

    console.log(errorMessage)
  }
}

async function askExistingFile(rl, question) {
  while (true) {
    const answer = await ask(rl, question)
    const resolved = path.resolve(answer)

    try {
      const stat = await fs.stat(resolved)
      if (stat.isFile()) {
        return resolved
      }
    } catch {
      // Continue to the user-facing message below.
    }

    console.log('找不到这个文件。可以把封面图片拖进终端，或粘贴完整文件路径。')
  }
}

async function chooseSeries(rl, dataSource) {
  const series = parseArticleSeries(dataSource)

  console.log('\n可选文章系列：')
  series.forEach((item, index) => {
    console.log(`${index + 1}. ${item.label} (${item.id})`)
  })
  console.log(`${series.length + 1}. 新增系列`)

  let choice = 0
  while (!Number.isInteger(choice) || choice < 1 || choice > series.length + 1) {
    choice = Number(await ask(rl, '选择系列编号，输入数字'))
    if (!Number.isInteger(choice) || choice < 1 || choice > series.length + 1) {
      console.log(`请输入 1 到 ${series.length + 1} 之间的数字。`)
    }
  }

  const existing = series[choice - 1]
  if (existing) {
    return { id: existing.id, label: existing.label, isNew: false }
  }

  const label = await ask(rl, '新系列名称')
  const suggestedId = slugify(label) || 'new-series'
  const id = await askRequired(
    rl,
    '新系列 id，使用英文小写短横线，例如 content-workflow',
    isSlug,
    '系列 id 只能包含英文小写、数字和短横线，例如 content-workflow。',
    suggestedId,
  )
  return { id, label, isNew: true }
}

async function runCli() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  try {
    console.log('这个脚本会把一篇新文章加入 /articles。没有合适封面时可以先退出，等封面准备好再运行。')
    console.log('提示：封面文件路径可以直接把图片拖进终端。\n')

    const dataSource = await fs.readFile(dataPath, 'utf8')
    const title = await ask(rl, '文章标题')
    const url = await askRequired(
      rl,
      '知乎文章链接',
      (value) => /^https?:\/\//.test(value),
      '请输入完整链接，例如 https://zhuanlan.zhihu.com/p/xxxx。',
    )
    const suggestedId = slugify(title) || `article-${Date.now()}`
    const id = await askRequired(
      rl,
      '文章 id，页面内部使用，不会显示；用英文小写短横线，例如 github-w21',
      isSlug,
      '文章 id 只能包含英文小写、数字和短横线，例如 github-w21。中文标题可以自己取一个英文 id。',
      suggestedId,
    )
    const coverSource = await askExistingFile(rl, '本地封面文件路径')
    const coverExt = path.extname(coverSource) || '.png'
    const coverFileName = await askRequired(
      rl,
      '保存到 public/articles/ 的文件名；建议直接回车使用默认值',
      isCoverFileName,
      '文件名只能使用英文小写、数字、短横线，并以 .png/.jpg/.jpeg/.webp 结尾，例如 github-w21.png。',
      `${id}${coverExt.toLowerCase()}`,
    )
    const series = await chooseSeries(rl, dataSource)
    const coverTarget = path.join(publicArticlesDir, coverFileName)
    const coverPublicPath = `/articles/${coverFileName}`

    await fs.mkdir(publicArticlesDir, { recursive: true })
    await fs.copyFile(path.resolve(coverSource), coverTarget)

    let nextDataSource = dataSource
    if (series.isNew) {
      nextDataSource = insertSeriesEntry(nextDataSource, buildSeriesEntry(series.id, series.label))
      const typeSource = await fs.readFile(typesPath, 'utf8')
      await fs.writeFile(typesPath, insertSeriesIdType(typeSource, series.id))
    }

    nextDataSource = insertArticleEntry(
      nextDataSource,
      buildArticleEntry({
        id,
        title,
        cover: coverPublicPath,
        url,
        seriesId: series.id,
      }),
    )

    await fs.writeFile(dataPath, nextDataSource)

    console.log('\n已添加文章。建议运行：')
    console.log('npx vitest run src/pages/ArticlesPage.test.tsx')
    console.log('npm run build')
    console.log('npm run lint')
  } finally {
    rl.close()
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
