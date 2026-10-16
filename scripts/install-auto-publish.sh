#!/bin/zsh
# 安装（或重新安装）后台自动发布：建一个专用的仓库副本，再注册 launchd 任务，每 5 分钟检查一次 Obsidian。
# 卸载：launchctl bootout gui/$(id -u)/com.huapingyu.garden-publish && rm ~/Library/LaunchAgents/com.huapingyu.garden-publish.plist
set -e
HOME_DIR="$HOME/Library/Application Support/pingyu-publisher"
REPO="$HOME_DIR/repo"
PLIST="$HOME/Library/LaunchAgents/com.huapingyu.garden-publish.plist"
NODE_DIR="$(dirname "$(command -v node)")"

mkdir -p "$HOME_DIR"
[ -d "$REPO/.git" ] || git clone -q --branch astro-v2 git@github.com:catteacher0515/Pingyu-s-Garden.git "$REPO"
(cd "$REPO" && git fetch -q && git reset -q --hard origin/astro-v2 && npm ci --silent --no-audit --no-fund)

cat > "$PLIST" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.huapingyu.garden-publish</string>
  <key>ProgramArguments</key><array><string>/bin/zsh</string><string>$REPO/scripts/auto-publish.sh</string></array>
  <key>EnvironmentVariables</key><dict><key>PATH</key><string>$NODE_DIR:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin</string></dict>
  <key>StartInterval</key><integer>300</integer>
  <key>RunAtLoad</key><true/>
  <key>StandardOutPath</key><string>$HOME/Library/Logs/pingyu-publisher.log</string>
  <key>StandardErrorPath</key><string>$HOME/Library/Logs/pingyu-publisher.log</string>
</dict></plist>
PL
launchctl bootout "gui/$(id -u)/com.huapingyu.garden-publish" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
echo "✅ 已安装：每 5 分钟检查一次 Obsidian。日志在 ~/Library/Logs/pingyu-publisher.log"
