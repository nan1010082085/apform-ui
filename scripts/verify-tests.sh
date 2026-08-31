#!/bin/bash
# @apform-ui 测试验证脚本

set -e

echo "=== @apform-ui 测试验证脚本 ==="

# 检查是否在ui目录
if [ ! -f "package.json" ] || [ ! -d "packages/core" ]; then
  echo "错误：请在ui目录下运行此脚本"
  exit 1
fi

echo "1. 运行核心包测试..."
if pnpm --filter @apform-ui/core test; then
  echo "✓ 核心包测试通过"
else
  echo "✗ 核心包测试失败"
  exit 1
fi

echo "2. 运行所有测试..."
if pnpm test; then
  echo "✓ 所有测试通过"
else
  echo "✗ 部分测试失败"
  exit 1
fi

echo ""
echo "=== 测试验证完成 ==="
echo "所有测试通过。"
