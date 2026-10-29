#!/bin/bash
# 北京服务器专用副本；由 garden 用户运行，成功构建后才切换线上目录。
set -euo pipefail
BASE=/var/www/huapingyu
REPO=/opt/huapingyu/source
exec 9>"$BASE/deploy.lock"
flock -n 9 || exit 0
cd "$REPO"
git fetch --quiet origin astro-v2
REV=$(git rev-parse origin/astro-v2)
if [ -L "$BASE/current" ] && [ "$(basename "$(readlink "$BASE/current")")" = "$REV" ]; then
  exit 0
fi
git reset --hard "$REV"
LOCK=$(sha256sum package-lock.json | cut -d' ' -f1)
if [ ! -d node_modules ] || [ "$(cat "$BASE/dependency-lock" 2>/dev/null || true)" != "$LOCK" ]; then
  npm ci --registry=https://repo.huaweicloud.com/repository/npm/
  printf '%s\n' "$LOCK" > "$BASE/dependency-lock"
fi
npm run build
test -s dist/index.html
test -s dist/sitemap.xml
# 未填写备案号时不把预备版本发布出去。
node --input-type=module -e 'import fs from "node:fs"; const s=JSON.parse(fs.readFileSync("src/data/site.json","utf8")); if (!/^冀ICP备\d+号-\d+$/.test(s.icp || "")) throw new Error("完整网站备案号尚未填写")'
mkdir -p "$BASE/releases/$REV"
rsync -a --delete dist/ "$BASE/releases/$REV/"
ln -sfn "$BASE/releases/$REV" "$BASE/current.next"
mv -Tf "$BASE/current.next" "$BASE/current"
echo "Published $REV"
