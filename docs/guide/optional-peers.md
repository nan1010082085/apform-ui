# Optional peer 回退行为

宿主须安装 `apformOptionalPeers()`。未安装对应 peer 时，应用仍能启动；组件行为如下。

| 组件 | Peer | 缺失时表现 | 是否抛错 |
|------|------|------------|----------|
| MetricChart | `echarts` | 空态 / 占位，无图表 | 否（Vite 解析到 stub） |
| PdfPreviewCard | `pdfjs-dist` | 降级为下载/外链卡片 | 否 |
| ExcelPreviewCard | `xlsx` | 降级为文件信息卡 | 否 |
| VirtualMessageScroller 相关 | `vue-virtual-scroller` | 回退普通列表滚动 | 否 |
| BpmnFlowPreviewCanvas | `@vue-flow/core` 等 | 空画布提示「需安装 vue-flow」 | 否 |

## 安装对照

```bash
npm i echarts                 # 监控图
npm i pdfjs-dist             # PDF
npm i xlsx                   # Excel
npm i vue-virtual-scroller   # 虚拟列表
npm i @vue-flow/core @vue-flow/background @vue-flow/controls  # 仅 bpmn 入口
```

```ts
import { apformOptionalPeers } from '@apform-ui/core/vite'
```

## 边界

- **不要**在业务里 `try/catch` 期望捕获「缺 peer」——打包期已被 stub 掉。
- BPMN **不要**从 `@apform-ui/core` 或 `core/chat` 引入，避免把 vue-flow 打进主包。
