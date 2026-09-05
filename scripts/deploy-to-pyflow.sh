#!/bin/bash
# 部署 @apform-ui 文档到 pyflow.icu/apform-ui/
set -euo pipefail

SERVER="root@pyflow.icu"
REMOTE_DIR="/home/ubuntu/apform-ui-docs"
NGINX_CONF="/etc/nginx/sites-available/schema-platform"

echo "=== 1. 构建文档 ==="
cd "$(dirname "$0")/.."
pnpm build:core
pnpm docs:build

echo
echo "=== 2. 上传到服务器 ==="
ssh "$SERVER" "mkdir -p $REMOTE_DIR"
rsync -az --delete \
  playground/dist/ \
  "$SERVER:$REMOTE_DIR/"

echo
echo "=== 3. 更新 nginx 配置 ==="
ssh "$SERVER" bash -s <<'REMOTE'
set -euo pipefail

NGINX_CONF="/etc/nginx/sites-available/schema-platform"
REMOTE_DIR="/home/ubuntu/apform-ui-docs"

# 检查是否已有 apform-ui location
if grep -q 'location /apform-ui/' "$NGINX_CONF"; then
  echo "apform-ui location 已存在，更新 root 路径"
  sed -i "s|root .*apform-ui.*|root $REMOTE_DIR;|" "$NGINX_CONF"
else
  # 在第一个 location 块之前插入
  sed -i "/location /i\\
    location /apform-ui/ {\\
        alias $REMOTE_DIR/;\\
        index index.html;\\
        try_files \$uri \$uri/ /apform-ui/index.html;\\
    }" "$NGINX_CONF"
  echo "已添加 apform-ui location"
fi

# 重载 nginx
nginx -t && systemctl reload nginx
echo "nginx 已重载"
REMOTE

echo
echo "=== 4. 验证 ==="
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://pyflow.icu/apform-ui/")
if [ "$STATUS" = "200" ]; then
  echo "✅ 部署成功: https://pyflow.icu/apform-ui/"
else
  echo "⚠️  HTTP $STATUS — 请检查 nginx 配置"
fi
