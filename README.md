# Pingyu's Garden

花萍雨的个人网站：Agent 项目、学习笔记、文章、视频和「发发神经」。只做电脑端。

> 这个分支（`astro-v2`）是从零重写的新版本，已上线：https://www.huapingyu.cn （Cloudflare Pages，push 到 `astro-v2` 自动部署）。
> 旧版仍在 `main` 分支，部署在 GitHub Pages：https://catteacher0515.github.io/Pingyu-s-Garden/ 。

## 本地运行

```bash
npm install --registry=https://repo.huaweicloud.com/repository/npm/
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/
```

## 页面

- `/` 首页：一屏一块，依次是 名字 → 项目 → 笔记 → 文章 → 视频 → 发发神经 → 关注我（「关注我」只在首页，其他页面底部只有一行版权和备案号）
- `/notes/` 学习笔记（从 Obsidian 发布）
- `/articles/` 文章（在后台写，含以前的知乎文章）
- `/videos/` 视频列表和详情（点封面或章节在新标签页打开 B 站）
- `/rants/` 发发神经
- `/admin/` 编辑后台；「网站设置」里可以改首页文字、关注我的平台和备案号

## 怎么更新内容

1. 打开 https://pingyu-s-garden.pages.dev/admin/ （本地是 `http://localhost:4321/admin/index.html`）。
2. 点「使用访问令牌登录」，粘贴 GitHub 令牌。令牌在 https://github.com/settings/personal-access-tokens/new 生成：Repository access 选 Only select repositories → `Pingyu-s-Garden`，Permissions 里 Contents 设为 Read and write，有效期最长 365 天。登录状态保存在浏览器里，令牌过期后按同样步骤重新生成。
3. 新建、修改或删除（勾选条目 → 右上角「删除」）视频、文章、发发神经，点保存。内容会提交到 GitHub 的 `astro-v2` 分支，Cloudflare 自动重新构建，2～3 分钟生效。

几个开关：

- **草稿**：勾上后只在本地预览可见，不会发布。
- 发视频只要填「B 站视频链接」：保存后 GitHub Actions（`.github/workflows/fill-videos.yml` 运行 `scripts/fill-videos.mjs`）会从 B 站补全标题、日期、时长、封面、简介和章节，再提交回仓库，Cloudflare 随后自动部署。填过的字段不会被覆盖；补全前没有标题的条目不会上线。
- 视频的「分类」决定列表页的筛选按钮；「章节」照 B 站分段章节填（开始时间 + 章节名），视频页会显示章节，点一下在 B 站从那里开始播。
- 视频的「预览片段」是可选的 3～6 秒静音 mp4，鼠标悬停在视频卡片上时播放。

## 怎么发布学习笔记

笔记写在 Obsidian 里，只有你主动标记的才会上网站：

1. 在 Obsidian 里打开想公开的笔记，按 `⌘ + ;`（或 `⌘ + P` 搜「添加文件属性」），属性名填 `publish`，类型选「复选框」，勾上。不要手动粘贴 `---`：属性必须从文件第一行开始，前面多一个空行就会失效（发布时脚本会提醒）。
2. 可选属性：
   - `topic`：主题，比如 `Python`，用来在网站上分组。不填就用笔记所在的文件夹名。
   - `status`：成熟度，填 `🌱`（刚开始）、`🌿`（持续补充，默认）或 `🌳`（已成型）。
   - `summary`：一句话简介。
3. 在访达里打开网站项目文件夹，双击 `发布笔记.command`。它会挑出所有勾了 publish 的笔记，转换图片和双链，推送上线。

想撤下某篇笔记：取消勾选 publish，再双击一次 `发布笔记.command`。链接到未公开笔记的双链只会显示文字，不会暴露链接。

## 怎么发「发发神经」

打开编辑后台，进入「发发神经」，新建一条：时间会自动填好，选个心情，写几句话，保存即可。不需要标题。首页显示最新 3 条，全部在 `/rants/`。

## 关注我

在「网站设置 → 关注我」里改。填了「链接」的平台显示为跳转卡片；微信这类没有主页的，把微信号填在「点击复制的内容」，访客点卡片就会复制。两项都空的平台不显示。

## 技术栈

Astro 7、GSAP、Sveltia CMS。内容是 `src/content/` 下的 Markdown 文件，结构定义在 `src/content.config.ts`。

## 设计来源

`docs/prototypes/v3/a-studio.html`（「片场」）是现在的版式来源，配色后来换成了 IP 形象的配色；`docs/prototypes/redesign-v2/` 是更早的原型。参考了 GSAP Showcase 和 HyperFrames Showcase。
