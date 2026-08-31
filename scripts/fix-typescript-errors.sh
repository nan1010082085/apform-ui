#!/bin/bash
# @apform-ui TypeScript 错误修复脚本

set -e

echo "=== @apform-ui TypeScript 错误修复脚本 ==="

# 检查是否在ui目录
if [ ! -f "package.json" ] || [ ! -d "packages/core" ]; then
  echo "错误：请在ui目录下运行此脚本"
  exit 1
fi

echo "1. 清理构建缓存..."
pnpm clean 2>/dev/null || true

echo "2. 安装依赖..."
pnpm install

echo "3. 运行构建..."
if pnpm build:core; then
  echo "✓ 构建成功"
else
  echo "✗ 构建失败，尝试修复常见问题..."
  
  # 修复常见的TypeScript错误
  echo "修复常见的TypeScript错误..."
  
  # 修复未使用的变量
  find packages/core/src -name "*.vue" -o -name "*.ts" | while read file; do
    if grep -q "import.*nextTick.*from 'vue'" "$file" && ! grep -q "nextTick" "$file"; then
      echo "修复未使用的nextTick导入: $file"
      sed -i '' 's/import { computed, nextTick, ref, watch } from '''vue'''/import { computed, ref, watch } from '''vue'''/g' "$file"
    fi
  done
  
  # 重新尝试构建
  echo "重新尝试构建..."
  if pnpm build:core; then
    echo "✓ 构建成功"
  else
    echo "✗ 构建仍然失败，请手动检查错误"
    exit 1
  fi
fi

echo "4. 运行测试..."
if pnpm --filter @apform-ui/core test; then
  echo "✓ 测试通过"
else
  echo "✗ 测试失败，请检查测试文件"
  exit 1
fi

echo "5. 验证构建产物..."
if [ -f "packages/core/dist/apform-ui.js" ] && [ -f "packages/core/dist/apform-ui.umd.cjs" ] && [ -f "packages/core/dist/apform-ui.css" ] && [ -f "packages/core/dist/index.d.ts" ]; then
  echo "✓ 构建产物完整"
else
  echo "✗ 构建产物不完整"
  exit 1
fi

echo ""
echo "=== 修复完成 ==="
echo "构建成功，所有测试通过，构建产物完整。"
