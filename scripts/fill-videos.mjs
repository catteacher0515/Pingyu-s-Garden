// 在编辑后台新建视频时只填 B 站链接就行：这个脚本从 B 站读取标题、日期、时长、封面、简介和章节，
// 补到视频条目里，并把文件改名为 BV 号。已经填过的字段不覆盖。
// 由 .github/workflows/fill-videos.yml 在视频有改动时自动运行；本地也可以 `npm run videos:fill`。
import fs from 'node:fs'
import path from 'node:path'
import YAML from 'yaml'

const ROOT = path.resolve(import.meta.dirname, '..')
const DIR = path.join(ROOT, 'src/content/videos')
const COVERS = path.join(ROOT, 'public/media/videos')
const H = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141 Safari/537.36', Referer: 'https://www.bilibili.com/' }

async function api(url) {
  const r = await fetch(url, { headers: H })
  const t = await r.text()
  let j
  try { j = JSON.parse(t) } catch { throw new Error(`${url} → HTTP ${r.status}：${t.slice(0, 120)}`) }
  if (j.code !== 0) throw new Error(`${url} → ${j.code} ${j.message}`)
  return j.data
}
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
const at = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
// B 站存的是 UTC 时间戳，按北京时间取日期
const day = (ts) => new Date((ts + 8 * 3600) * 1000).toISOString().slice(0, 10)
// 简介取 B 站视频简介的第一句，太长就截断
const firstLine = (desc) => {
  const s = desc.split('\n').find((l) => l.trim())?.trim() ?? ''
  const m = s.match(/^.+?[。！？!?]/)
  const one = m ? m[0] : s
  return one.length > 80 ? one.slice(0, 78) + '…' : one
}

let changed = 0
for (const name of fs.readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const file = path.join(DIR, name)
  const text = fs.readFileSync(file, 'utf8')
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) continue
  const fm = YAML.parse(m[1]) ?? {}
  let body = m[2]
  const bvid = String(fm.url ?? '').match(/BV[0-9A-Za-z]{10}/)?.[0]
  // 只处理还没补过的 B 站视频：补过的会带 slug（就是 BV 号）
  if (!bvid || fm.slug === bvid) continue

  try {
    const v = await api(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`)
    const desc = v.desc && v.desc !== '-' ? v.desc.trim() : ''
    const { slug: _old, ...rest } = fm
    const out = { slug: bvid, ...rest }
    out.title ||= v.title
    out.date = day(v.pubdate)
    out.url = `https://www.bilibili.com/video/${bvid}/`
    out.platform ||= 'B站'
    out.duration ||= mmss(v.duration)
    if (!out.summary && desc) out.summary = firstLine(desc)
    if (!out.cover) {
      fs.mkdirSync(COVERS, { recursive: true })
      const img = await fetch(v.pic.replace(/^http:/, 'https:'), { headers: H })
      if (img.ok) {
        fs.writeFileSync(path.join(COVERS, `${bvid}.jpg`), Buffer.from(await img.arrayBuffer()))
        out.cover = `/media/videos/${bvid}.jpg`
      }
    }
    if (!out.chapters?.length) {
      const p = await api(`https://api.bilibili.com/x/player/v2?bvid=${bvid}&cid=${v.cid}`).catch(() => ({}))
      const pts = p.view_points ?? []
      if (pts.length > 1) out.chapters = pts.map((x) => ({ at: at(x.from), title: x.content }))
    }
    if (!body.trim() && desc) body = desc + '\n'

    const dest = path.join(DIR, `${bvid}.md`)
    if (dest !== file && fs.existsSync(dest)) throw new Error(`${bvid}.md 已经存在，这条视频可能重复了`)
    fs.writeFileSync(dest, `---\n${YAML.stringify(out, { lineWidth: 0, defaultStringType: 'QUOTE_DOUBLE', defaultKeyType: 'PLAIN' })}---\n\n${body.replace(/^\n+/, '')}`)
    if (dest !== file) fs.rmSync(file)
    console.log(`✓ ${bvid} ${out.title}`)
    changed++
  } catch (e) {
    // ::error:: 让失败原因出现在 GitHub Actions 的摘要里
    console.error(`::error::${name}: ${e.message}`)
    process.exitCode = 1
  }
}
console.log(changed ? `补全了 ${changed} 条视频` : '没有需要补全的视频')
