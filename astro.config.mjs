import { defineConfig } from 'astro/config'

export default defineConfig({
  // 正式域名（用于 sitemap、分享链接等）
  site: 'https://huapingyu.cn',
  // Astro 7 默认按 JSX 规则去掉标签间空白，中文混排时容易吞掉空格，这里沿用 HTML 规则
  compressHTML: true,
  // 旧版网址跳转到新的页面
  redirects: {
    '/writing': '/notes/',
    '/posts': '/articles/',
    '/projects': '/#projects',
  },
})
