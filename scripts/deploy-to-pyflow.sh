#!/bin/bash
# 部署 @apform-ui playground 文档站到 pyflow.icu/schema-platform/apform-ui/
# 仅同步静态目录，不影响 editor/flow/ai/ua/server
#
# 发版后必须调用；推荐入口：bash scripts/publish-with-docs.sh
set -euo pipefail

SERVER="${DEPLOY_SERVER:-ubuntu@pyflow.icu}"
REMOTE_DIR="/home/ubuntu/schema-platform/apps/apform-ui"
PUBLIC_URL="${APFORM_DOCS_URL:-https://pyflow.icu/schema-platform/apform-ui/}"

cd "$(dirname "$0")/.."
ulimit -n 10240 2>/dev/null || true

EXPECTED="${APFORM_EXPECTED_VERSION:-$(node -p "require('./packages/core/package.json').version")}"

echo "=== 1. 构建文档（期望线上版本 = ${EXPECTED}） ==="
pnpm check:version
pnpm build:core
pnpm docs:build

# 构建产物内必须含版本号，否则上传也是错的
if ! rg -q --fixed-strings "$EXPECTED" playground/dist/assets/*.js 2>/dev/null; then
  # rg 可能因文件过多；用 node 扫主 index
  if ! node -e "
    const fs=require('fs');const path=require('path');
    const dir='playground/dist/assets';
    const files=fs.readdirSync(dir).filter(f=>f.endsWith('.js'));
    const ok=files.some(f=>fs.readFileSync(path.join(dir,f),'utf8').includes(process.argv[1]));
    process.exit(ok?0:1);
  " "$EXPECTED"; then
    echo "❌ playground 构建产物未包含版本 ${EXPECTED}"
    exit 1
  fi
fi

echo
echo "=== 2. 上传到服务器（仅 apform-ui） ==="
ssh "$SERVER" "mkdir -p $REMOTE_DIR"
rsync -az --delete \
  playground/dist/ \
  "$SERVER:$REMOTE_DIR/"

echo
echo "=== 3. 校验线上版本 ==="
STATUS=$(curl -sk -o /dev/null -w "%{http_code}" "$PUBLIC_URL")
if [ "$STATUS" != "200" ]; then
  echo "❌ HTTP $STATUS — 请检查 nginx / 路径"
  exit 1
fi

node scripts/verify-live-docs.mjs --expect "$EXPECTED"
echo "✅ 部署成功: $PUBLIC_URL (SCHEMA_UI_VERSION=${EXPECTED})"
