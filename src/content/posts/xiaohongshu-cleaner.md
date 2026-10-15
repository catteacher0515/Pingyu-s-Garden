---
title: 开源 | 我做了一个免费，无广的小红书敏感词 "净化器"
category: 文章
date: 2026-04-02
cover: /media/articles/xiaohongshu-cleaner.jpg
tags:
  - 自制小东西
order: 70
origin: https://zhuanlan.zhihu.com/p/2023062113053152634
---

相信做过 xhs 笔记的伙伴基本都用过零克查词吧，可以帮助我们查询敏感词和违禁词，如果触发敏感词或者违禁词的话，大概率就会被限流，我当初就不晓得这一点，发了好几篇笔记，浏览量那是惨不忍睹呀

大家在使用的之后不晓得有没有这么一个感觉，零克查词是存在几个问题的

1. 零克查词，查词，查词，主要功能是帮助你查呀，其修改功能并不是很完善，没有提供修改的功能，如果敏感词很多的话，那改起来简直不要太烦，比如 "最" 字就是敏感词，且这个字是一个高频词，至少在我上期的 xhs 笔记当中就出现了六七次...要改的话，这样的次数多了，难免会觉得厌烦
2. 广告，广告还是不少的对吧，各种 xhs 自媒体养成指南，看的我是头昏眼花

![敏感词修改痛苦场景](/media/articles/xiaohongshu-cleaner/dcfd5536c6.webp)

![](/media/articles/xiaohongshu-cleaner/jytnD7YBGmsULlSS.webp)

那有没有一个完全免费，无需登录/注册，没有广告，干净/简介的工具呢？有的，兄弟，有的，我自己做了一个，就是 RedBook Fixer

下面来介绍一下这个小工具：

它的核心功能是对 xhs 的文案进行敏感词的检测和初步的修改，把常见的敏感词自动帮助完成修改就比如前面提到的 zui 字

它的使用流程也是非常的简单，打开页面，在左侧文本框粘贴你的 xhs 文案，接着 "开始检测"，就会自动检测，左侧原文当中的敏感词会用红色高亮标注，右侧会自动生成替换的版本，有默认替换词的直接替换（绿色标注），没有的保持红色提示手动处理

处理敏感词有这么两种方式

方式一：点击左侧任意红色词，弹出替换面板，可以从建议词中点选，也可以自己输入，确认后右侧实时更新。

方式二：编辑原文 点击「编辑原文」切回编辑模式，直接修改文案，改完再点「重新检测」。

我个人是更加倾向于方式一的，在对处理结果满意之后，就可以直接点击右侧的 「复制结果」

![检测流程示意图](/media/articles/xiaohongshu-cleaner/26839712a9.webp)

![](/media/articles/xiaohongshu-cleaner/5hieFZIXCNc1mh0L.webp)

我日常的工作流是：在 RedBook Fixer 里享受零广告、秒替换的丝滑批处理，把 99% 的恶心词汇一键清洗；最后复制到零克查词，当做发布前的最后一道安全门。粗活累活交给 RedBook Fixer，零克查词只负责最终盖章

![工作流分工对比](/media/articles/xiaohongshu-cleaner/256480dcea.webp)

本工具定位为初筛，虽然我把主流的 xhs 敏感词都加入了进去，但肯定还是会有一些遗漏，无法保证 100% 覆盖所有的敏感词，这个可以在 "词库管理" 当中自定义内容，完成你的定制化需求

切换到「词库管理」页面，可以查看全部内置词条，自定义添加自己发现的敏感词和对应替换词

自定义词条优先级高于内置词库，同一个词以自定义为准

![自定义词库管理](/media/articles/xiaohongshu-cleaner/893be893e9.webp)

![](/media/articles/xiaohongshu-cleaner/3rCPS9s9bxWFM0hG.webp)

在线访问地址为： https://catteacher0515.github.io/RedBook-Fixer/

最后，这个小工具的代码已经开源，开源仓库为  https://github.com/catteacher0515/RedBook-Fixer ，大家如果有觉得有帮助的话，点个 star 支持一下吧，谢谢☆⌒(\*＾-゜)v THX!!
