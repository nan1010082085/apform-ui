# 发布流程（RELEASE）

> `@apform-ui/core`：**GitHub README ≡ npm 包 README ≡ pyflow 文档站** 必须同一次发版对齐，禁止只更新一侧。

## 唯一受支持的发版命令

在 `schema-platform/ui` 根目录：

```bash
ulimit -n 10240   # macOS 若 ENFILE 则先提高句柄上限
pnpm release
# 等价：bash scripts/publish-with-docs.sh
```

流水线顺序（缺一不可）：

1. `pnpm gate`（含 `check:version`：package.json ≡ monorepo ≡ `packages/core/README.md` 当前版本）
2. `npm publish`（`@apform-ui/core`；README 打进 tarball）
3. `bash scripts/deploy-to-pyflow.sh`（rsync playground → pyflow）
4. `node scripts/verify-live-docs.mjs`（线上 JS 含本版号）
5. `node scripts/verify-npm-readme.mjs`（registry `latest` + npm README「当前版本」= 本地）

任一步失败 → 发版未完成。若 npm 暂存未放行，第 5 步会失败并提示去 npmjs 放行。

### 安全网

即使有人绕过、直接 `cd packages/core && npm publish`，`postpublish` 仍会强制跑文档部署与校验。

### 禁止

- ❌ 只 `npm publish`、不部署文档站
- ❌ 只改 GitHub / 只发 GitHub Pages，当成 pyflow 文档已更新
- ❌ `APFORM_SKIP_DOCS_DEPLOY=1`（仅灾难恢复；退出码 2，不算成功发版）

## 发版前门禁（也可单独跑）

```bash
pnpm gate          # check:version + build:check + test + docs:build
pnpm check:version # package.json ≡ SCHEMA_UI_VERSION ≡ monorepo version
pnpm docs:deploy   # 仅重部署文档（不发 npm）
pnpm docs:verify   # 仅校验线上版本
```

## 版本策略

| 类型 | 场景 | 示例 |
|------|------|------|
| patch | TS/测试/文档修复、发版流水线 | 1.21.3 |
| minor | DoD 补齐、Playground、新 B 级组件 | 1.22.0 |
| major | 破坏性 API | 2.0.0 |

**唯一真相源：** `packages/core/package.json` → `version`。  
由此派生 / 必须对齐：

| 面 | 如何对齐 |
|----|----------|
| `SCHEMA_UI_VERSION` | `src/version.ts` 从 package.json 派生，禁止手写 |
| monorepo `package.json` | `pnpm bump:*` 自动同步 |
| `packages/core/README.md`「当前版本」 | `pnpm bump:*` 自动同步；`check:version` 拦截漂移（**即 npm 页文案**） |
| pyflow 文档站 | `pnpm release` 内强制 deploy + verify |
| npm `latest` / README | `pnpm release` 末尾 `verify-npm-readme` |

发版前确认：

- [ ] `CHANGELOG.md`（core + 根）已更新
- [ ] 版本已 bump（`pnpm bump:patch` / `bump:minor`，勿手改半套）
- [ ] 执行 **`pnpm release`**（不要手搓 publish / 不要只推 GitHub）

## 文档站

- 线上：https://pyflow.icu/schema-platform/apform-ui/
- 顶栏版本 = 构建时的 `SCHEMA_UI_VERSION`（= core `package.json`）
- GitHub Actions `deploy-docs.yml` → GitHub Pages（**不是** pyflow 主站）；pyflow 以本仓库 `deploy-to-pyflow.sh` 为准

## Tag（可选）

```bash
git tag "v$(node -p "require('./packages/core/package.json').version")"
git push origin main --tags
```

## npm 账号与身份（P0）

发布前确认（**禁止**把 token 写入仓库或 `.env` 提交）：

1. **scope**：`@apform-ui` 归属正确，`@apform-ui/core` 在 [npmjs.com](https://www.npmjs.com/package/@apform-ui/core) 可更新。
2. **2FA**：发布账号已开启 npm 双因素认证。
3. **Token**：使用 **granular access token**（仅 `publish` 权限、短期过期）；禁止 legacy token。
4. **`.npmrc`**：指向 `https://registry.npmjs.org/`（历史 403 多为 registry 指错）。
5. **provenance**：在 GitHub Actions 用 OIDC 时加 `npm publish --provenance --access public`；本机交互式 publish **无法**可靠出具 provenance，以 CI 发版为准（见 `publish-with-docs.sh`）。

## 发版前额外校验

```bash
pnpm scan:sensitive   # 敏感信息扫描（已纳入 gate）
pnpm verify:pack      # npm pack 解包 + 四入口实测（发版流水线必跑）
pnpm audit:high       # 高危依赖审计（报告用；xlsx 等 optional peer 可能暂无补丁）
```

Dependabot：见 `.github/dependabot.yml`。CI 对 `--prod` 高危 **报告不阻断**，避免无上游补丁时卡死发版。
