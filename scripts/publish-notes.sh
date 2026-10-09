#!/bin/zsh
# 把 Obsidian 里勾了 publish 的笔记同步到网站并推送上线。
set -e
cd "$(dirname "$0")/.."

BRANCH=astro-v2 # 网站上线用的分支；合并到 main 之后改成 main
if [ "$(git branch --show-current)" != "$BRANCH" ]; then
  echo "❌ 当前不在 $BRANCH 分支，为避免推错地方，已停止。"
  exit 1
fi

echo "① 从 Obsidian 挑选要发布的笔记…"
node scripts/sync-notes.mjs

git add src/content/notes public/media/notes
if git diff --cached --quiet; then
  echo "② 笔记没有变化，不需要发布。"
  exit 0
fi

echo "② 提交改动…"
git commit -q -m "notes: sync from Obsidian ($(date '+%Y-%m-%d %H:%M'))"

echo "③ 先同步编辑后台里的新内容…"
git pull -q --rebase --autostash
echo "④ 推送到 GitHub，Cloudflare 会在几分钟内自动更新网站…"
git push -q
echo "✅ 完成：https://pingyu-s-garden.pages.dev/notes/"
