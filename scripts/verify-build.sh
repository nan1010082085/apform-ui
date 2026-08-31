#!/bin/bash
# @apform-ui 构建验证脚本

set -e

echo "=== @apform-ui 构建验证脚本 ==="

# 检查是否在ui目录
if [ ! -f "package.json" ] || [ ! -d "packages/core" ]; then
  echo "错误：请在ui目录下运行此脚本"
  exit 1
fi

echo "1. 运行构建..."
if pnpm build:core; then
  echo "✓ 构建成功"
else
  echo "✗ 构建失败"
  exit 1
fi

echo "2. 运行测试..."
if pnpm --filter @apform-ui/core test; then
  echo "✓ 测试通过"
else
  echo "✗ 测试失败"
  exit 1
fi

echo "3. 验证构建产物..."
required_files=(
  "packages/core/dist/apform-ui.js"
  "packages/core/dist/apform-ui.umd.cjs"
  "packages/core/dist/apform-ui.css"
  "packages/core/dist/index.d.ts"
)

all_files_exist=true
for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file 存在"
  else
    echo "✗ $file 不存在"
    all_files_exist=false
  fi
done

if [ "$all_files_exist" = true ]; then
  echo "✓ 所有构建产物完整"
else
  echo "✗ 部分构建产物缺失"
  exit 1
fi

echo ""
echo "=== 验证完成 ==="
echo "构建成功，测试通过，构建产物完整。"
