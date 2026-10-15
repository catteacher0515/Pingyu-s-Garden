---
title: 做内容选题再也不愁了！这个开源工具帮我自动追热点
category: 文章
date: 2026-03-29
cover: /media/articles/topic-hot-tracker.jpg
tags:
  - 自制小东西
order: 60
origin: https://zhuanlan.zhihu.com/p/2021596837484790760
---

我做了一个工具，每天自动帮我找 GitHub 上最值得关注的项目

做内容创作有一个绕不开的问题：选题从哪来？

刷推特、等别人推荐、碰运气——本质上都是被动接收。

我想要的是一个主动的、稳定的信息源，能每天告诉我”最近 GitHub上什么东西在爆”。

所以我做了这个工具，叫 GitHub Star Tracker，已经开源。

### 它能做什么？

每天早上 9 点，它会自动去 GitHub 抓取最近 star 增长最快的仓库，然后用 AI 读完 README，生成两段内容：

第一段给普通人看——这个项目是什么、解决什么问题、适合谁用，口语化，不需要任何技术背景。

第二段给有基础的人看——核心功能是什么、怎么快速上手，结构清晰，直接可用。

所有内容自动整理进飞书多维表格，按周分表，智能去重，每周一张干净的表。

配置很简单

Fork 项目之后，只需要在 GitHub 上配置四个密钥：

- 飞书应用的 App ID 和 App Secret

- 飞书多维表格的文档 ID

- DeepSeek API Key（生成 AI 解读用，费用极低）

配置完成，GitHub Actions 每天自动运行，完全不需要再管。

### 为什么做这个？

追热点这件事，手动做太低效了。

这个工具帮我解决的不是”写文章”的问题，而是”找到值得写的东西”的问题——AI 辅助创作真正的起点，在这里。

GitHub 地址： [https://github.com/catteacher0515/GitHub-Star-Top](https://github.com/catteacher0515/GitHub-Star-Top)

本周的热门 GitHub 仓库直达： [https://my.feishu.cn/base/FB5wbrAOMaQoKqsQeuPcoOQXnx1?from=from_copylink](https://my.feishu.cn/base/FB5wbrAOMaQoKqsQeuPcoOQXnx1?from=from_copylink)

跑完之后发现其中一个就是卡兹克昨天发的公众号内容hh，芝麻调到针眼里了

![](/media/articles/topic-hot-tracker/d4a94137da.webp)

最后，大家觉得有帮助的话，可以 star 支持一哈~Thanks♪(･ω･)ﾉ

![](/media/articles/topic-hot-tracker/a801eade04.webp)
