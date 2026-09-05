<script setup lang="ts">
/**
 * JsonCard JSON 摘要卡片文档示例
 */
import { ref } from 'vue'
import { JsonCard, JsonDetailDialog } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const detailOpen = ref(false)
const sample = {
  type: 'form',
  fields: [
    { name: 'username', label: '用户名' },
    { name: 'role', label: '角色' },
  ],
}

const cardSource = `<template>
  <JsonCard title="用户表单 Schema" :data="sample" type="schema" @click="open = true" />
  <JsonDetailDialog v-model="open" title="JSON 详情" :data="sample" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="JSON 摘要卡片，点击打开详情弹框。"
      :source="cardSource"
    >
      <div class="grid">
        <JsonCard title="用户表单 Schema" :data="sample" type="schema" @click="detailOpen = true" />
        <JsonCard
          title="流程定义"
          :data="{ nodes: [{ id: 1 }, { id: 2 }], edges: [{ from: 1, to: 2 }] }"
          type="flow"
          @click="detailOpen = true"
        />
      </div>
      <JsonDetailDialog v-model="detailOpen" title="JSON 详情" :data="sample" />
    </DemoBlock>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}
</style>
