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
TAG="v${VERSION}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " apform-ui 发版（npm + 文档站强制同步）"
echo " 版本: $VERSION  tag: $TAG"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ "$SKIP_GATE" -eq 0 ]]; then
  echo
  echo "=== gate ==="
  pnpm gate
  echo
  echo "=== audit (high, prod, 非阻断) ==="
  pnpm audit --audit-level=high --prod || echo "⚠️  存在高危 advisory（多为 optional peer / 传递依赖），见 Dependabot"
  echo
  echo "=== verify:pack ==="
  pnpm verify:pack
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
  # CI（OIDC）下加 provenance；本机无 OIDC 时自动回退为普通 publish
  if [[ "${GITHUB_ACTIONS:-}" == "true" ]] || [[ "${NPM_CONFIG_PROVENANCE:-}" == "true" ]]; then
    npm publish --access public --provenance
  else
    echo "ℹ️  非 GitHub Actions：跳过 --provenance（本机无法出具 OIDC 证明）"
    npm publish --access public
  fi
)

echo
echo "=== git tag 校验提示 ==="
RELEASE_TAG="${TAG:-v${VERSION}}"
if git rev-parse "${RELEASE_TAG}" >/dev/null 2>&1; then
  echo "✅ 本地已存在 tag ${RELEASE_TAG}"
else
  echo "⚠️  本地尚无 tag ${RELEASE_TAG}，发版后请执行:"
  echo "   git tag ${RELEASE_TAG} && git push origin ${RELEASE_TAG}"
fi

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
echo "=== 校验 npm README / latest 与本地同源（强制） ==="
# 暂存包放行前会轮询；超时则发版未完成
node scripts/verify-npm-readme.mjs --expect "$VERSION" --wait 180

echo
echo "✅ 发版完成: npm @apform-ui/core@$VERSION ≡ GitHub README ≡ 文档站"
echo "   npm: https://www.npmjs.com/package/@apform-ui/core"
echo "   docs: https://pyflow.icu/schema-platform/apform-ui/"
