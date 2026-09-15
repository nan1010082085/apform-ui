#!/bin/bash
# 部署 @apform-ui playground 文档站到 pyflow.icu/schema-platform/apform-ui/
# 仅同步静态目录，不影响 editor/flow/ai/ua/server
set -euo pipefail

SERVER="${DEPLOY_SERVER:-ubuntu@pyflow.icu}"
REMOTE_DIR="/home/ubuntu/schema-platform/apps/apform-ui"
PUBLIC_URL="https://pyflow.icu/schema-platform/apform-ui/"

echo "=== 1. 构建文档 ==="
cd "$(dirname "$0")/.."
ulimit -n 10240 2>/dev/null || true
pnpm build:core
pnpm docs:build

echo
echo "=== 2. 上传到服务器（仅 apform-ui） ==="
ssh "$SERVER" "mkdir -p $REMOTE_DIR"
rsync -az --delete \
  playground/dist/ \
  "$SERVER:$REMOTE_DIR/"

echo
echo "=== 3. 验证 ==="
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PUBLIC_URL")
HTML=$(curl -s "$PUBLIC_URL")
JS=$(printf '%s' "$HTML" | sed -n 's/.*src="\/schema-platform\/apform-ui\/\(assets\/index-[^"]*\.js\)".*/\1/p' | head -1)
VERSION=""
if [ -n "$JS" ]; then
  VERSION=$(curl -s "${PUBLIC_URL}${JS}" | sed -n 's/.*const [A-Za-z0-9_$]*="\([0-9][0-9.]*\)".*/\1/p' | head -1)
fi

if [ "$STATUS" = "200" ]; then
  echo "✅ 部署成功: $PUBLIC_URL (HTTP $STATUS, SCHEMA_UI_VERSION=${VERSION:-unknown})"
else
  echo "⚠️  HTTP $STATUS — 请检查 nginx / 路径"
  exit 1
fi
