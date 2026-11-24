# 浏览器支持

| 浏览器 | 最低版本 | 说明 |
|--------|----------|------|
| Chrome | 90+ | 主要开发与文档站验证环境 |
| Edge | 90+ | 同 Chromium |
| Firefox | 90+ | 应可用；复杂 canvas/PDF 请自测 |
| Safari | 15+ | |
| iOS Safari | 15+ | 对话输入、文件预览建议真机抽测 |

## 不做

- **Internet Explorer**：与 Vue 3 一致，不支持，不提供 polyfill 包。
- 不为旧 Android WebView 单独维护；若必须支持，由宿主自行 polyfill `ResizeObserver` / `structuredClone` 等。

## Polyfill

本库不内置 core-js。若目标环境缺少：

- `ResizeObserver`（部分布局/图表）
- `IntersectionObserver`（懒加载预览）

请在宿主入口按需引入。
