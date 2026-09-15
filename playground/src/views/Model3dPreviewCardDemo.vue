<script setup lang="ts">
/**
 * Model3dPreviewCard 文档示例
 */
import { Model3dPreviewCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <Model3dPreviewCard
    url="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
    filename="Astronaut.glb"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="3D 模型预览卡片壳；需业务侧 import '@google/model-viewer' 后才能实际渲染。"
      :source="basicSource"
    >
      <div style="max-width: 480px">
        <p style="margin: 0 0 12px; font-size: 13px; color: #909399">
          需业务侧 <code>import '@google/model-viewer'</code> 后才能实际渲染模型；此处演示卡片壳与占位。
        </p>
        <Model3dPreviewCard
          url="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
          filename="Astronaut.glb"
        />
      </div>
    </DemoBlock>
  </div>
</template>
