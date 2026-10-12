// 三个原型共用的示例数据。全部是示例，换成真实内容只改这里。
window.SITE = {
  name: '花萍雨',
  en: 'Pingyu',
  tagline: '用 AI 和代码做东西，把过程拍成视频、写成教程。',
  now: ['在剪第 5 支视频', '在学 Python 工程化', '在给网站换新衣服', '在整理 Linux 笔记'],
  follow: [
    { name: 'B 站', handle: '@花萍雨', url: '#' },
    { name: '小红书', handle: '@花萍雨', url: '#' },
    { name: '知乎', handle: '@花萍雨', url: '#' },
    { name: 'GitHub', handle: 'catteacher0515', url: 'https://github.com/catteacher0515' },
    { name: '邮箱', handle: 'hi@example.com', url: '#' },
  ],
  videos: [
    { title: '我用 Claude Code 从零搭了一个个人网站', len: '12:48', date: '10.08', views: '3.2万', tag: 'AI 工具' },
    { title: 'Obsidian 笔记一键发布到网站，全流程', len: '08:21', date: '09.27', views: '1.1万', tag: '工作流' },
    { title: '三分钟看懂 Astro 内容集合', len: '03:05', date: '09.15', views: '6,820', tag: '前端' },
    { title: '让 AI 帮我剪视频，是种什么体验', len: '10:12', date: '09.02', views: '2.4万', tag: 'AI 工具' },
    { title: '大学生的 Mac 效率配置', len: '07:40', date: '08.20', views: '9,310', tag: '效率' },
  ],
  tutorials: [
    { title: '给静态网站加一个免费的编辑后台', mins: 12, tag: '建站' },
    { title: 'Python 项目结构，从脚本到工程', mins: 18, tag: 'Python' },
    { title: '用 Cloudflare Pages 部署 Astro', mins: 8, tag: '部署' },
  ],
  notes: [
    { title: 'Python 工程能力 · 古法练习', topic: 'Python', status: '🌿', updated: '10.09' },
    { title: 'Linux 学习路线', topic: 'Linux', status: '🌱', updated: '10.06' },
    { title: '十大核心架构模式', topic: '系统设计', status: '🌳', updated: '10.02' },
    { title: 'Controller 文件阅读与数据流追踪', topic: 'Java', status: '🌱', updated: '09.29' },
    { title: '分布式系统的硬道理', topic: '系统设计', status: '🌿', updated: '09.21' },
  ],
  rants: [
    { t: '10.11 23:40', mood: '🫠', text: '改了一晚上网站，最后发现问题出在一个空行上。' },
    { t: '10.08 14:02', mood: '💡', text: '想清楚要展示什么，比纠结用什么颜色重要一百倍。' },
    { t: '10.03 01:15', mood: '😮‍💨', text: '视频剪到第三遍，开始怀疑自己的声音。' },
    { t: '09.30 09:30', mood: '🥳', text: '第一支视频破万播放了，奖励自己一杯奶茶。' },
  ],
};
// 统一的示例缩略图：不用任何旧素材，用渐变 + 大字生成
window.thumb = (i, palette) => {
  const p = palette || [['#ff5a1f', '#ffb199'], ['#3d5afe', '#9aa8ff'], ['#00a37a', '#9be7c8'], ['#ffb300', '#ffe08a'], ['#c2185b', '#f48fb1']];
  const [a, b] = p[i % p.length];
  return `radial-gradient(120% 90% at ${20 + (i * 23) % 60}% ${30 + (i * 17) % 40}%, ${b} 0%, ${a} 55%, #111 140%)`;
};
