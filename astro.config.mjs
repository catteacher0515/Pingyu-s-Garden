import { defineConfig } from 'astro/config'

export default defineConfig({
  // 绑定域名后改成正式地址（用于 sitemap、分享链接等）
  site: 'https://catteacher0515.github.io',
  // Astro 7 默认按 JSX 规则去掉标签间空白，中文混排时容易吞掉空格，这里沿用 HTML 规则
  compressHTML: true,
})
