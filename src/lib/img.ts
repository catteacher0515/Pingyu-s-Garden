import fs from 'node:fs'
import path from 'node:path'

// 有压缩版（scripts/optimize-images.mjs 生成）就用压缩版，没有就退回原图
export function opt(src?: string) {
  if (!src || !src.startsWith('/') || !/\.(png|jpe?g)$/i.test(src)) return src
  const file = path.join(process.cwd(), 'public/_opt', decodeURI(src)) + '.webp'
  return fs.existsSync(file) ? `/_opt${src}.webp` : src
}
