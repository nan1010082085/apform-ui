#!/bin/bash
# @apform-ui Storybook 文档部署
# 用法: ./scripts/deploy-docs.sh [server] [path]
# 示例: ./scripts/deploy-docs.sh user@server /var/www/apform-ui

set -e

SERVER=${1:-"user@server"}
REMOTE_PATH=${2:-"/var/www/apform-ui"}
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "📦 Building Storybook..."
cd "$PROJECT_DIR"
pnpm build:core
pnpm docs:build

echo "📦 Creating archive..."
tar -czf storybook-static.tar.gz -C storybook-static .

echo "🚀 Deploying to $SERVER:$REMOTE_PATH..."
scp storybook-static.tar.gz "$SERVER:/tmp/"

ssh "$SERVER" "
  mkdir -p $REMOTE_PATH
  cd $REMOTE_PATH
  tar -xzf /tmp/storybook-static.tar.gz
  rm /tmp/storybook-static.tar.gz
"

echo "✅ Deployed to $SERVER:$REMOTE_PATH"
echo "🌐 Access at: http://$(echo $SERVER | cut -d@ -f2)"

rm -f storybook-static.tar.gz
