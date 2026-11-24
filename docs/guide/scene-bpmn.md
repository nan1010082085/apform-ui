# 场景指南：BPMN 流程预览

## 安装

```bash
npm i @apform-ui/core @vue-flow/core @vue-flow/background @vue-flow/controls
```

Vite：`apformOptionalPeers()`。

## 样式顺序

```ts
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/bpmn.css'
```

## 代码

```ts
import { BpmnFlowPreviewCanvas } from '@apform-ui/core/bpmn'
```

```vue
<BpmnFlowPreviewCanvas
  :nodes="nodes"
  :edges="edges"
  @node-click="(id, data) => openArtifact(id, data)"
/>
```

节点点击后可联动 `ArtifactGallery` / 业务抽屉。不要从 `core` 或 `chat` 入口引入本组件。
