#!/usr/bin/env bash
# 唯一受支持的 @apform-ui/core 发版入口：gate → npm publish → 强制部署+校验文档站
# 用法（在 ui/ 根目录）：
#   bash scripts/publish-with-docs.sh
#   bash scripts/publish-with-docs.sh --skip-gate
# 禁止跳过文档：不要设置 APFORM_SKIP_DOCS_DEPLOY（仅灾难恢复）
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
ulimit -n 10240 2>/dev/null || true

SKIP_GATE=0
for arg in "$@"; do
  case "$arg" in
    --skip-gate) SKIP_GATE=1 ;;
    -h|--help)
      sed -n '2,8p' "$0"
      exit 0
      ;;
  esac
done

VERSION="$(node -p "require('./packages/core/package.json').version")"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " apform-ui 发版（npm + 文档站强制同步）"
echo " 版本: $VERSION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ "$SKIP_GATE" -eq 0 ]]; then
  echo
  echo "=== gate ==="
  pnpm gate
else
  echo
  echo "⚠️  已跳过 gate（--skip-gate）"
  pnpm check:version
  pnpm build:core
fi

echo
echo "=== npm publish @apform-ui/core@$VERSION ==="
# 标记：postpublish 钩子识别后不再重复部署
export APFORM_DOCS_DEPLOY_OWNED_BY_PUBLISH_SCRIPT=1
(
  cd packages/core
  npm publish --access public
)

if [[ "${APFORM_SKIP_DOCS_DEPLOY:-}" == "1" ]]; then
  echo
  echo "❌ APFORM_SKIP_DOCS_DEPLOY=1：跳过文档站是明确禁止的默认路径"
  echo "   若确需跳过，发版不算完成；请尽快手动: bash scripts/deploy-to-pyflow.sh"
  exit 2
fi

echo
echo "=== 部署并校验文档站（强制） ==="
# publish 已跑过 build；deploy 脚本会再 build docs 并 rsync
APFORM_EXPECTED_VERSION="$VERSION" bash scripts/deploy-to-pyflow.sh
node scripts/verify-live-docs.mjs --expect "$VERSION"

echo
echo "✅ 发版完成: npm @apform-ui/core@$VERSION + 文档站已同步"
echo "   https://pyflow.icu/schema-platform/apform-ui/"
