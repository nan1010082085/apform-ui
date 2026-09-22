# 发布流程（RELEASE）

> `@apform-ui/core` 库优先迭代发版门禁

## 发版前门禁

在 `schema-platform/ui` 根目录执行：

```bash
ulimit -n 10240   # macOS 若 ENFILE 则先提高句柄上限
pnpm gate          # check:version + build:check + test + docs:build
```

或分步：

```bash
pnpm check:version # package.json ≡ SCHEMA_UI_VERSION ≡ monorepo version
pnpm gate:core     # 含 check:version + build:check + test
pnpm docs:build
```

## 版本策略

| 类型 | 场景 | 示例 |
|------|------|------|
| patch | TS/测试/文档修复 | 1.4.3 |
| minor | DoD 补齐、Playground、新 B 级组件 | 1.5.0 |
| major | 破坏性 API | 2.0.0 |

**唯一真相源：** `packages/core/package.json` → `version`。  
`SCHEMA_UI_VERSION`（`src/version.ts`）从该字段派生，**禁止手写字面量**。  
改版本时同步根目录 `package.json` 的 `version`；`pnpm check:version` / `pnpm gate` 会拦截漂移。

发版前确认：

- [ ] `pnpm check:version` 通过（自动化，勿再手改 SCHEMA_UI_VERSION）
- [ ] `CHANGELOG.md（如有）` 已更新
- [ ] `internal/export-dod-audit.md` 已更新
- [ ] `internal/tree-shake-baseline.md` 已更新（可选：`pnpm tree-shake:baseline`）
- [ ] `APFORM_UI_ITERATION_PLAN.md` Sprint 进度已更新
- [ ] **npm publish 后必须部署文档站**（`bash scripts/deploy-to-pyflow.sh`），否则线上文档版本落后于包

## 发布命令

```bash
cd packages/core
pnpm build
npm publish --access public
```

根目录（monorepo）：

```bash
git tag v1.5.0
git push origin main --tags
```

## 文档站部署（playground）

```bash
bash scripts/deploy-to-pyflow.sh
# 或：pnpm check:version && pnpm docs:build 后同步 playground/dist/
```

文档顶栏版本来自构建时的 `SCHEMA_UI_VERSION`（= core package.json）。  
**禁止**只 publish 不部署文档，或只部署文档不 bump 包版本。

## 不在发版门禁内

- 各业务仓（ai/editor/flow）批量改 import — Phase 5 独立 PR
- npm 发版不阻塞业务仓试点
