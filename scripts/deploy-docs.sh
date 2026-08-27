#!/bin/bash
# @schema-ui/docs 部署脚本
# 用法: ./scripts/deploy-docs.sh [server] [path]
# 示例: ./scripts/deploy-docs.sh user@server /var/www/schema-ui-docs

set -e

SERVER=${1:-"user@server"}
REMOTE_PATH=${2:-"/var/www/schema-ui-docs"}
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "📦 Building docs..."
cd "$PROJECT_DIR"
pnpm build:core
pnpm docs:build

echo "📦 Creating archive..."
tar -czf dist-docs.tar.gz -C dist-docs .

echo "🚀 Deploying to $SERVER:$REMOTE_PATH..."
scp dist-docs.tar.gz "$SERVER:/tmp/"

ssh "$SERVER" "
  mkdir -p $REMOTE_PATH
  cd $REMOTE_PATH
  tar -xzf /tmp/dist-docs.tar.gz
  rm /tmp/dist-docs.tar.gz
"

echo "✅ Deployed to $SERVER:$REMOTE_PATH"
echo "🌐 Access at: http://$(echo $SERVER | cut -d@ -f2)"

# Cleanup
rm -f dist-docs.tar.gz
