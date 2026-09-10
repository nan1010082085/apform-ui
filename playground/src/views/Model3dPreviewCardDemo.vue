<script setup lang="ts">
import { Model3dPreviewCard } from '@apform-ui/core'
</script>

<template>
  <div style="max-width: 480px">
    <p style="margin: 0 0 12px; font-size: 13px; color: #909399">
      需业务侧 <code>import '@google/model-viewer'</code> 后才能实际渲染模型；此处演示卡片壳与占位。
    </p>
    <Model3dPreviewCard
      url="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
      filename="Astronaut.glb"
    />
  </div>
</template>
