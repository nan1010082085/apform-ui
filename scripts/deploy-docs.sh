#!/bin/bash
# @apform-ui playground 文档部署
# 用法: ./scripts/deploy-docs.sh [server] [path]
# 示例: ./scripts/deploy-docs.sh user@server /var/www/apform-ui

set -e

SERVER=${1:-"user@server"}
REMOTE_PATH=${2:-"/var/www/apform-ui"}
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "Building playground docs..."
cd "$PROJECT_DIR"
pnpm build:core
pnpm docs:build

echo "Creating archive..."
tar -czf playground-dist.tar.gz -C playground/dist .

echo "Deploying to $SERVER:$REMOTE_PATH..."
scp playground-dist.tar.gz "$SERVER:/tmp/"

ssh "$SERVER" "
  mkdir -p $REMOTE_PATH
  cd $REMOTE_PATH
  tar -xzf /tmp/playground-dist.tar.gz
  rm /tmp/playground-dist.tar.gz
"

echo "Deployed to $SERVER:$REMOTE_PATH"
echo "Access at: http://$(echo $SERVER | cut -d@ -f2)"

rm -f playground-dist.tar.gz
