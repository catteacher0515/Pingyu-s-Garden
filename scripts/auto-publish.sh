#!/bin/zsh
# 后台自动发布：由 launchd 每 5 分钟运行一次（安装见 scripts/install-auto-publish.sh）。
# Obsidian 里勾了 publish（笔记）或 article（文章）的内容，有变化就同步到网站并推送；没变化什么都不做。
# 在单独的仓库副本里运行，不碰日常开发用的工作区。
set -u
REPO="$HOME/Library/Application Support/pingyu-publisher/repo"
VAULT="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Obsidian"
STAMP="$REPO/../last-run"
BRANCH=astro-v2 # 合并到 main 之后改成 main

notify() { osascript -e "display notification \"$1\" with title \"花萍雨的网站\"" >/dev/null 2>&1 }

cd "$REPO" || exit 1
# Obsidian 里没有任何文件比上次运行新，就直接退出（不用每次都重新处理图片）
if [ -f "$STAMP" ] && [ -z "$(find "$VAULT" -newer "$STAMP" -not -path '*/.obsidian/*' -not -path '*/.trash/*' -type f -print -quit 2>/dev/null)" ]; then
  exit 0
fi
touch "$STAMP.new"
echo "== $(date '+%F %T')"

git fetch -q origin "$BRANCH" && git reset -q --hard "origin/$BRANCH" || { echo "拉取失败"; exit 1 }
OUT=$(node scripts/sync-notes.mjs 2>&1) || { echo "$OUT"; notify "自动发布失败，请让 Claude 看一下日志"; exit 1 }
echo "$OUT"
mv "$STAMP.new" "$STAMP"

# 有内容被拦下（含密钥或服务器 IP）时提醒，同一批只提醒一次
BLOCKED=$(echo "$OUT" | grep '⛔' | sed -e 's/^ *⛔ //' -e 's/：.*//')
if [ -n "$BLOCKED" ] && [ "$BLOCKED" != "$(cat ../last-blocked 2>/dev/null)" ]; then
  notify "有笔记含密钥或服务器 IP，没发布：$(echo "$BLOCKED" | head -1 | xargs -0 basename)"
fi
echo "$BLOCKED" > ../last-blocked

git add -A src/content/notes src/content/posts/obsidian public/media/notes
git diff --cached --quiet && exit 0
CHANGED=$(git diff --cached --name-only -- src/content | grep -c '\.md$')
git commit -q -m "obsidian: 自动同步笔记和文章 ($(date '+%Y-%m-%d %H:%M'))"
for i in 1 2 3; do
  git push -q origin "HEAD:$BRANCH" && { notify "已同步 $CHANGED 个笔记/文章文件，几分钟后上线"; exit 0 }
  git pull -q --rebase origin "$BRANCH"
done
notify "推送失败，请让 Claude 看一下日志"
exit 1
