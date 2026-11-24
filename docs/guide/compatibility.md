# 版本兼容矩阵

| apform-ui | Vue | element-plus | Vite | 状态 |
|-----------|-----|--------------|------|------|
| 1.21.x | ^3.5.0 | **2.14.2（钉死）** | ^5 / ^6 | ✅ 已测（文档站 / 平台消费） |
| 1.21.x | 3.4 | 2.14.2 | ^5 | ⚠️ 未测 |
| 1.21.x | ^3.5 | 2.15+ / 2.13 | ^6 | ❌ 不支持（视觉与 peer 区间外，风险自担） |

## 说明

- **element-plus 必须钉 `2.14.2`**。升 EP 小版本可能打穿 `element-override.css` 选择器与内部 class，后果自负。
- 主产物为 **ESM**（`import`）。`require()` / CJS 不是受支持路径；UMD 文件仅作历史兼容，新项目勿用。
- CSS 体积（构建后，约）：见 [css-size.json](./css-size.json)（`pnpm exec node scripts/css-size-report.mjs` 生成）。

| 入口样式 | 场景 |
|----------|------|
| `style.css` | 全量通用组件 |
| `chat.css` | 只要对话积木时优先，体积更小 |
| `bpmn.css` | BPMN 画布；另需 vue-flow 自带 CSS |

## 浏览器

见 [browsers.md](./browsers.md)。
