// 构建前把 public 里的封面、插画转成压缩后的 WebP，存到 public/_opt（不进 git）。
// 页面通过 src/lib/img.ts 的 opt() 引用压缩版，原图保持不动。
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC = path.resolve(import.meta.dirname, '../public')
const OUT = path.join(PUBLIC, '_opt')
const DIRS = ['media']
const MAX_WIDTH = 1600

const files = []
for (const d of DIRS) {
  const p = path.join(PUBLIC, d)
  if (!fs.existsSync(p)) continue
  if (fs.statSync(p).isFile()) { files.push(p); continue }
  for (const f of fs.readdirSync(p, { recursive: true })) {
    if (/\.(png|jpe?g)$/i.test(f)) files.push(path.join(p, f))
  }
}

let made = 0, before = 0, after = 0
for (const src of files) {
  const dest = path.join(OUT, path.relative(PUBLIC, src)) + '.webp'
  before += fs.statSync(src).size
  if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(src).mtimeMs) { after += fs.statSync(dest).size; continue }
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  await sharp(src).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 78 }).toFile(dest)
  after += fs.statSync(dest).size
  made++
}
const mb = (n) => (n / 1024 / 1024).toFixed(1) + 'MB'
console.log(`[images] ${files.length} 张图片，新生成 ${made} 张；总体积 ${mb(before)} → ${mb(after)}`)
