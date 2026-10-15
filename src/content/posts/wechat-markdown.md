---
title: 这个 GitHub 项目，帮你完成公众号排版
category: 文章
date: 2026-05-15
cover: /media/articles/wechat-markdown.png
tags:
  - AI 工具箱
order: 40
origin: https://zhuanlan.zhihu.com/p/2038552034346053660
---

公众号排版大家多多少少应该都接触过吧，如果是做自媒体的朋友那肯定就更熟悉了

公众号排版有一个膈应的点，就是它是不支持 Markdown 格式的，但现在主流的笔记软件都是 Markdown 格式的，比如 Obsidian

将 Obsidian 当中写好的稿子复制粘贴到公众号当中，直接两眼一黑，这都啥跟啥啊...

市面上也有一些将 Markdown 格式的内容转换成公众号排版的转换器

但多多少少是存在一些问题的，比如

排版需要靠 prompt 来碰运气
输出一致性，用 LLM 每次输出的一致性不是很高
不足够懒人，无法做到输入未转换的文案直接完成到推送到草稿

---

今天推荐一个 GitHub 仓库可以解决这些问题

仓库的地址如下： https://github.com/geekjourneyx/md2wechat-skill

先说一下这个仓库到底是干什么的：

**md2wechat 是一个把 Markdown 文章整理成公众号草稿的 CLI 工具**

它做的事情包括：

- 上传封面
- 识别正文图片
- 读取 .md 文件
- 创建公众号草稿
- 解析标题、作者、摘要
- 上传正文图片到微信素材库

可以将其理解为：

输入 Markdown -> 微信公众号草稿箱

---

下面来带大家来走一遍完整的闭环

ps：以下的 CC 是 Claude Code 的意思

#### 1. 准备材料：

首先大家需要准备这几项内容：

1. `AppID` 和 `AppSecret`

ps：前提是大家有公众号的哈

进入微信开发者平台： https://developers.weixin.qq.com/platform

先点击 "我的业务与服务"，然后找到 "公众号"

![](/media/articles/wechat-markdown/0282936124.webp)

然后获取 `AppID` 和 `AppSecret`，`AppID` 是有了公众号之后就有的，`AppSecret` 需要申请一下，按照操作直接扫个码即可，获取之后记得保存，因为不能再查询；如果忘记了也没有关系，直接重置就好

![](/media/articles/wechat-markdown/342a4a7c2b.webp)

2. 微信 API 白名单

把当前网络出口 IP 加到公众号后台白名单里

建议优先获取公网 IPv4，因为微信白名单最常卡的是这个

那么如何获取公网 IPv4 呢？

这里我以 macOS 为例子，终端执行如下的指令：

```
curl -4 ifconfig.me
```

![](/media/articles/wechat-markdown/379a0ecb5d.webp)

如果想顺便看 IPv6：

```
curl -6 ifconfig.me
```

如果是 Windows 系统的话，在 PowerShell 执行：

```
curl.exe -4 ifconfig.me
```

拿到输出后，把这个 IP 填到公众号后台的 API IP 白名单，如果有多个的话，换行添加新的

![](/media/articles/wechat-markdown/a3a9ea5720.webp)

3. 一篇 Markdown 文件

也就是你的文章正文，后缀是 .md

4. 一张封面图

发草稿时必须有封面，可以先随便找一张，能让 Codex 或者 Claude Code 访问到即可

5. .md 里引用的正文图片文件

如果文章里有图片，这些图片文件必须真实存在

#### 2. 安装 CLI

这部分我们会使用到 CC 或者 Codex

**如果不知道如何安装和使用 Claude Code 的小伙伴可以去看卡兹克的这篇保姆级教程，我在这里就不赘述了**

https://mp.weixin.qq.com/s/AA2NHww4jUBuAfi10EYICw

关于配置的部分是只做一次的

这里建议调用 web-access 然后再输出，如果没有安装 web-access 这个 skill 的话，可以这样和 Codex 或者 CC 说

```
帮我安装这个 skill：https://github.com/eze-is/web-access
```

在安装好之后，这样和 Codex 或者 CC 说：

```
请调用 web-access 这个 skill 访问这个 GitHub 仓库：
https://github.com/geekjourneyx/md2wechat-skill

请优先阅读 README.md 和 docs/INSTALL.md，
然后帮我安装这个仓库对应的 md2wechat CLI。
安装完成后，请再帮我验证以下几点：

1. md2wechat 命令是否可用
2. md2wechat --help 是否正常
3. md2wechat capabilities --json 是否正常
```

#### 3. 配置和发布准备阶段

安装好 CLI 之后

接下来就进入真正的配置和发布准备阶段

这一步你可以直接把所需信息告诉 Codex 或 Claude Code，让它继续帮你完成配置、白名单确认和后续发布

需要准备的信息就是前面 "准备材料" 当中的五项内容

关于 .md 文件里如果没有写标题、作者、摘要，还需要额外提供：

title: 文章标题
author: 作者名
digest: 文章摘要

因为这些都是需要在公众号的草稿箱当中填写的

在准备好之后，可以这样和 Codex 或 CC 说：

```
我已经安装好 md2wechat CLI 了

下面是我的配置信息和发布信息，请继续帮我完成配置并准备发布：

AppID: xxx
AppSecret: xxx
当前网络出口 IP: xxx.xxx.xxx.xxx

md_path: /绝对路径/文章.md
cover_path: /绝对路径/封面.png
```

 在输入上面这段信息之后，Codex 或 CC 就具备了继续完成配置和准备发布的条件
 
#### 4. AI 模式 & API 模式

原 GitHub 仓库里是有两种模式的：

- AI 模式：把 Markdown 变成 "排版请求"，再交给 CC / Codex 继续处理
- API 模式：直接把 Markdown 变成最终可发的公众号 HTML

![](/media/articles/wechat-markdown/805ae25625.webp)

---

AI 模式更像 "让大模型继续帮你排版"

它的特点是：

- 免费
- 只有少量基础主题
- 不需要作者的私有 API Key
- 最终效果依赖 Claude / Codex 这类外部大模型
- 同一篇 Markdown，每次生成结果可能不完全一样

适合的人群是：

- 偶尔用一下
- 想先体验
- 不介意多一步 AI 处理
- 不追求每次都完全一致

---

API 模式更像“直接调用作者已经做好的排版服务”

它的特点是：

- 速度快
- 有 40+ 主题
- 直接返回最终 HTML
- 有 43 个高级排版模块
- 同样输入，输出稳定一致
- 适合高频使用和自动化发布

但代价也很明确：

- 需要申请作者维护的 API 服务
- 长期使用会依赖这套私有能力
- 对很多个人用户来说，成本和约束都更高

---

原仓库官方主线里，AI 模式和 API 模式是两种不同的使用路径；本文实际带大家跑通的，是一条更适合普通个人用户的本地兼容路径

对于 API 模式的价格，截至到 26.5.14，我私下咨询到的价格是 199，实际以作者最新说明为准是 199，一口价，一次购买，永久使用

![](/media/articles/wechat-markdown/0fbfb34d53.webp)

对于这个价格的话，对于作者这种穷学生来说还是有些贵了，所以建议大家根据自己的需求和经济情况来决定是否要购买

如果你的需求只是个人高频发公众号，其实未必一定要接作者的 API 模式，当前这套本地兼容版通常已经够用了，比如我的公众号排版用本地兼容版本就已经足够了，相信对于多数用户来说，这个版本已经足够满足日常使用的需求了

如果你特别在意高级主题、高级排版模块、团队协作和完全确定性输出，再考虑原仓库的 API 模式

最后，如果我再也不能见到你，祝你早安，午安，还有晚安~
