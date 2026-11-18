# 发布流程（RELEASE）

> `@apform-ui/core`：**npm 与线上文档站必须同一次发版完成**，禁止只 publish 不部署文档。

## 唯一受支持的发版命令

在 `schema-platform/ui` 根目录：

```bash
ulimit -n 10240   # macOS 若 ENFILE 则先提高句柄上限
pnpm release
# 等价：bash scripts/publish-with-docs.sh
```

流水线顺序（缺一不可）：

1. `pnpm gate`（版本同源 + 构建/测试 + docs:build）
2. `npm publish`（`@apform-ui/core`）
3. `bash scripts/deploy-to-pyflow.sh`（rsync playground → pyflow）
4. `node scripts/verify-live-docs.mjs`（线上 JS 必须含本版号 + ExpertPicker/CitationBlock 路由）

任一步失败 → 发版未完成。

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
`SCHEMA_UI_VERSION`（`src/version.ts`）从该字段派生，**禁止手写字面量**。  
改版本时同步根目录 `package.json` 的 `version`；`pnpm check:version` / `pnpm gate` 会拦截漂移。

发版前确认：

- [ ] `CHANGELOG.md`（core + 根）已更新
- [ ] 版本已 bump（`pnpm bump:patch` / `bump:minor`）
- [ ] 执行 **`pnpm release`**（不要手搓 publish）

## 文档站

- 线上：https://pyflow.icu/schema-platform/apform-ui/
- 顶栏版本 = 构建时的 `SCHEMA_UI_VERSION`（= core `package.json`）
- GitHub Actions `deploy-docs.yml` → GitHub Pages（**不是** pyflow 主站）；pyflow 以本仓库 `deploy-to-pyflow.sh` 为准

## Tag（可选）

```bash
git tag "v$(node -p "require('./packages/core/package.json').version")"
git push origin main --tags
```
