<script setup lang="ts">
/**
 * JsonDetailDialog JSON 详情弹框文档示例
 */
import { ref } from 'vue'
import { JsonDetailDialog } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const open = ref(false)
const data = {
  id: 'user-form',
  version: 1,
  fields: [
    { key: 'username', type: 'input' },
    { key: 'email', type: 'input' },
  ],
}

const basicSource = `<template>
  <el-button type="primary" @click="open = true">打开详情</el-button>
  <JsonDetailDialog v-model="open" title="Schema 详情" :data="data" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="查看完整 JSON 内容，支持格式化展示。"
      :source="basicSource"
    >
      <el-button type="primary" @click="open = true">打开详情</el-button>
      <JsonDetailDialog v-model="open" title="Schema 详情" :data="data" />
    </DemoBlock>
  </div>
</template>
