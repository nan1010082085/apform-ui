# 版本兼容矩阵

| apform-ui | Vue | element-plus（peer） | Vite | 状态 |
|-----------|-----|----------------------|------|------|
| 1.22.x | ^3.5.0 | **2.14.2**（精确依赖） | ^5 / ^6 | ✅ 已测（文档站 / 平台消费） |
| 1.21.x | ^3.5.0 | **2.14.2**（精确依赖） | ^5 / ^6 | ✅ 已测 |
| 1.21.x | 3.4 | 2.14.2 | ^5 | ⚠️ 未测 |
| 1.21.x+ | ^3.5 | 2.15+ / 2.13 | ^6 | ❌ 不在 peer 区间内，风险自担 |

## 说明

- **element-plus** 声明为 peerDependency，版本为精确 `2.14.2`。宿主须安装同版本；改用其它小版本可能与 `element-override.css` 选择器 / 内部 class 不匹配。
- 主产物为 **ESM**（`import`）。`require()` / CJS 不是受支持路径；UMD 文件仅作历史兼容，新项目勿用。
- CSS 体积（构建后，约）：见 [css-size.json](./css-size.json)（`pnpm exec node scripts/css-size-report.mjs` 生成）。

| 入口样式 | 场景 |
|----------|------|
| `style.css` | 全量通用组件 |
| `chat.css` | 只要对话积木时优先，体积更小 |
| `bpmn.css` | BPMN 画布；另需 vue-flow 自带 CSS |

## 浏览器

见 [browsers.md](./browsers.md)。
