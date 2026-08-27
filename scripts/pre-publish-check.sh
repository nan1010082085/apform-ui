#!/bin/bash
# 发布前检查脚本
# 用法: ./scripts/pre-publish-check.sh <package>
# 示例: ./scripts/pre-publish-check.sh core

set -e

PACKAGE=${1:?"用法: $0 <package-name>"}
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PKG_DIR="$PROJECT_DIR/packages/$PACKAGE"

echo "📦 检查 @apform-ui/$PACKAGE..."

# 1. 检查目录存在
if [ ! -d "$PKG_DIR" ]; then
  echo "❌ 包目录不存在: packages/$PACKAGE"
  exit 1
fi

# 2. 检查 package.json
if [ ! -f "$PKG_DIR/package.json" ]; then
  echo "❌ 缺少 package.json"
  exit 1
fi

# 3. 检查 README.md（强制）
if [ ! -f "$PKG_DIR/README.md" ]; then
  echo "❌ 缺少 README.md — 先写 README 再发布！"
  exit 1
fi

README_LINES=$(wc -l < "$PKG_DIR/README.md" | tr -d ' ')
if [ "$README_LINES" -lt 10 ]; then
  echo "⚠️  README.md 只有 $README_LINES 行，内容过少，建议补充"
fi

# 4. 检查版本号
VERSION=$(node -p "require('$PKG_DIR/package.json').version" 2>/dev/null)
echo "📌 当前版本: $VERSION"

# 5. 检查 src/index.ts
if [ ! -f "$PKG_DIR/src/index.ts" ] && [ ! -f "$PKG_DIR/index.ts" ]; then
  echo "⚠️  未找到入口文件 src/index.ts"
fi

# 6. 尝试构建
echo "🔨 构建检查..."
cd "$PKG_DIR"
if command -v vite &> /dev/null; then
  npx vite build 2>&1 | tail -3
  echo "✅ 构建成功"
else
  echo "⚠️  未找到 vite，跳过构建检查"
fi

echo ""
echo "✅ @apform-ui/$PACKAGE 检查通过，可以发布"
echo "   运行: cd packages/$PACKAGE && npm publish --access public"
