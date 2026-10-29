#!/bin/bash
# 北京服务器专用副本；由 garden 用户运行，成功构建后才切换线上目录。
set -euo pipefail
BASE=/var/www/huapingyu
REPO=/opt/huapingyu/build
exec 9>"$BASE/deploy.lock"
flock -n 9 || exit 0
WORK=$(mktemp -d /opt/huapingyu/deploy.XXXXXX)
trap 'rm -rf "$WORK"' EXIT
# GitHub 的 Git 传输在此服务器会挂起，改用官方 API + 指定提交的源码归档。
curl --fail --silent --show-error --connect-timeout 10 --max-time 45 --retry 2 \
  https://api.github.com/repos/catteacher0515/Pingyu-s-Garden/commits/astro-v2 > "$WORK/commit.json"
REV=$(node -e 'const s=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).sha;if(!/^[a-f0-9]{40}$/.test(s))process.exit(1);console.log(s)' "$WORK/commit.json")
if [ -L "$BASE/current" ] && [ "$(basename "$(readlink "$BASE/current")")" = "$REV" ]; then
  exit 0
fi
curl --fail --silent --show-error --connect-timeout 10 --max-time 180 --retry 2 \
  "https://codeload.github.com/catteacher0515/Pingyu-s-Garden/tar.gz/$REV" > "$WORK/source.tar.gz"
mkdir "$WORK/source"; mkdir -p "$REPO"
tar -xzf "$WORK/source.tar.gz" --strip-components=1 -C "$WORK/source"
rsync -a --delete --exclude=node_modules/ "$WORK/source/" "$REPO/"
cd "$REPO"
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
