# Pingyu's Garden

花萍雨的个人网站：视频、图文教程和自己做的小工具。

> 这个分支（`astro-v2`）是从零重写的新版本，已上线：https://pingyu-s-garden.pages.dev （Cloudflare Pages，push 到 `astro-v2` 自动部署）。
> 旧版仍在 `main` 分支，部署在 GitHub Pages：https://catteacher0515.github.io/Pingyu-s-Garden/ 。

## 本地运行

```bash
npm install --registry=https://repo.huaweicloud.com/repository/npm/
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/
```

## 页面

- `/` 首页：自我介绍、「最近在做」放映厅、关于我
- `/videos/` 视频列表和详情（嵌入 B 站播放器）
- `/posts/` 图文：教程、文章（含已停更的 GitHub 周刊）
- `/notes/` 笔记：从 Obsidian 发布的学习笔记
- `/projects/` 项目
- `/rants/` 发发神经：牢骚和小感悟
- `/admin/` 编辑后台

## 怎么更新内容

1. 打开 https://pingyu-s-garden.pages.dev/admin/ （本地是 `http://localhost:4321/admin/index.html`）。
2. 选「Sign In Using Access Token」。令牌在 https://github.com/settings/personal-access-tokens/new 生成：Repository access 只选 `Pingyu-s-Garden`，Permissions 里 Contents 设为 Read and write，生成后粘贴登录。
3. 新建或修改视频、图文、项目，点保存。内容会提交到 GitHub 的 `astro-v2` 分支，Cloudflare 自动重新构建，几分钟内生效。

几个开关：

- **放进首页放映厅**：勾上后会出现在首页的「最近在做」。
- **草稿**：勾上后只在本地预览可见，不会发布。
- 视频的「预览片段」是可选的 3～6 秒静音 mp4，用来在首页和列表里自动播放。

## 怎么发布学习笔记

笔记写在 Obsidian 里，只有你主动标记的才会上网站：

1. 在 Obsidian 里打开想公开的笔记，在顶部属性区添加属性 `publish`，类型选「复选框」，勾上。
2. 可选属性：
   - `topic`：主题，比如 `Python`，用来在网站上分组。不填就用笔记所在的文件夹名。
   - `status`：成熟度，填 `🌱`（刚开始）、`🌿`（持续补充，默认）或 `🌳`（已成型）。
   - `summary`：一句话简介。
3. 在访达里打开网站项目文件夹，双击 `发布笔记.command`。它会挑出所有勾了 publish 的笔记，转换图片和双链，推送上线。

想撤下某篇笔记：取消勾选 publish，再双击一次 `发布笔记.command`。链接到未公开笔记的双链只会显示文字，不会暴露链接。

## 怎么发「发发神经」

打开编辑后台，进入「发发神经」，新建一条：时间会自动填好，选个心情，写几句话，保存即可。不需要标题。

## 技术栈

Astro 7、GSAP、Sveltia CMS。内容是 `src/content/` 下的 Markdown 文件，结构定义在 `src/content.config.ts`。

## 设计来源

`docs/prototypes/redesign-v2/` 是翻新前做的可交互原型，参考了 GSAP Showcase 和 HyperFrames Showcase。
