# 贡献指南（@apform-ui）

## 公开仓库可放 / 不可放

本仓（`apform-ui`）面向 GitHub / npm，提交前按此过滤：

| 可推 GitHub | 说明 |
|-------------|------|
| `LICENSE`（仓库根，MIT 正文） | GitHub 识别开源协议的真相源；`packages/core/LICENSE` 随 npm 包再带一份 |
| `README` / `CONTRIBUTING` / `SECURITY` / `ROADMAP` / `CHANGELOG` / `RELEASE` | 对外协作与发版 |
| `docs/CONVENTIONS.md`、`docs/guide/*`、`docs/ops/*` | 使用者/贡献者文档 |
| `examples/`、`.github/`、源码与测试、门禁脚本 | 产品与工程面 |

| 不要推 / 已 ignore | 说明 |
|--------------------|------|
| `APFORM_UI_*_PLAN.md`、`COMPONENT_LIBRARY_*.md` 等根目录设计稿 | 已在 `.gitignore`，内部规划不公开 |
| 密钥、token、`.env*`、本机路径私货 | 敏感扫描会拦；也不要进文档示例 |
| 业务仓密钥、线上账号、未脱敏截图里的密钥 | 与本库无关，禁止入库 |
| 工作区 `vault/`、未登记的客户/业务机密 | 不在本仓范围 |

声明 `MIT` 时：**仓库根必须有 `LICENSE` 全文**；仅 `package.json` 写 `"license": "MIT"` 不够，GitHub 也不会显示协议。

## 开发环境

```bash
cd schema-platform/ui   # 或 apform-ui 仓根
pnpm i
pnpm docs:dev           # playground 文档站 http://localhost:5173
```

常用命令：

| 命令 | 作用 |
|------|------|
| `pnpm gate:core` | 版本同源 + `vue-tsc` + build + 单测 |
| `pnpm docs:build` | 构建文档站 |
| `pnpm gate` | 完整门禁（含敏感扫描 + docs:build） |
| `pnpm verify:pack` | npm pack 解包实测 |
| `pnpm bump:patch` / `bump:minor` | 版本 + CHANGELOG + core/README 当前版本（`scripts/bump.mjs`） |

## 新建组件

1. 在 `packages/core/src/components/<Name>/` 创建组件、`index.ts`、`doc.ts`
2. 从 `src/index.ts`（或 `chat.ts` / `bpmn.ts`）导出
3. 在 `src/docs/index.ts` 注册 `ComponentDoc`
4. 在 `playground/src/views/<Name>Demo.vue` 写 Demo，并挂到 `routes.ts`
5. 按 [docs/CONVENTIONS.md](./docs/CONVENTIONS.md) 补齐 Props / Events / Slots / 边界态
6. 补 vitest（逻辑向优先）

## 场景指南页

允许在 playground 增加 **场景指南**（列表页 / 对话 / 监控 / BPMN / 文件预览等整页拼法）。  
命名用「场景指南 / Guide」，不要用历史禁用的 `*Recipe` 文件名。

## Commit 与发版

- 可交付改动必须 bump：`pnpm bump:patch` 或 `bump:minor`（会写包级 CHANGELOG）
- 正式发版：**只**用 `pnpm release`（= `scripts/publish-with-docs.sh`），禁止手搓 `npm publish` 且跳过文档
- 详见 [RELEASE.md](./RELEASE.md)

## 视觉与 Token

- 状态表达见 [docs/CONVENTIONS.md](./docs/CONVENTIONS.md)「视觉语言」；禁止左侧状态彩条。
- 组件样式只写 `--apf-*`；禁止新增 `--c-*`（Chat 旧别名仅兼容，见 token 迁移指南）。
- Element Plus 为 peerDependency 精确版本 `2.14.2`，配合 `element-override`；不在仓内 fork EP 源码。

## 永久禁止

- ❌ Storybook / VitePress（含依赖与 CI 产物路径）
- ❌ 暗色展台 / 营销英雄首页
- ❌ 文档站**内嵌** StackBlitz（外链模板可以）
- ❌ 文档站整站多语言切换（组件 i18n 文案覆盖另议）
- ❌ 左侧彩色竖条表达状态 / 新样式写 `--c-*`

## 发包禁止

- ❌ 没有 README 就发布
- ❌ 跳过版本号 / 覆盖已发布版本
- ❌ 只 publish npm、不同步 pyflow 文档站
