<script setup lang="ts">
/**
 * ExcelPreviewCard 表格预览文档示例
 */
import { ref } from 'vue'
import { ExcelPreviewCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const sheet = ref('Sheet1')
const headers = ['名称', '状态', '负责人']
const rows = [
  ['项目 A', '进行中', '张三'],
  ['项目 B', '已完成', '李四'],
  ['项目 C', '暂停', '王五'],
]

const basicSource = `<template>
  <ExcelPreviewCard
    v-model="sheet"
    :sheet-names="['Sheet1', 'Sheet2']"
    :headers="headers"
    :rows="rows"
    :total-rows="rows.length"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="表格预览壳；数据由父组件解析后传入 props。"
      :source="basicSource"
    >
      <ExcelPreviewCard
        v-model="sheet"
        :sheet-names="['Sheet1', 'Sheet2']"
        :headers="headers"
        :rows="rows"
        :total-rows="rows.length + 1"
      />
    </DemoBlock>
  </div>
</template>
