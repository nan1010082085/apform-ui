<script setup lang="ts">
import { ref } from 'vue'
import { RagContextPanel, type RagContextItem } from '@apform-ui/core'

const query = ref('')
const selected = ref<RagContextItem[]>([])
const results = ref<RagContextItem[]>([
  {
    id: '1',
    name: '用户注册表单',
    score: 88,
    description: '含手机号、邮箱与验证码字段',
    tags: ['input', 'select'],
  },
  {
    id: '2',
    name: '采购申请',
    score: 55,
    description: '物资采购审批表',
    tags: ['table', 'input', 'button'],
  },
])

/**
 * @param item - 选中项
 */
function onSelect(item: RagContextItem): void {
  if (!selected.value.some((s) => s.id === item.id)) {
    selected.value = [...selected.value, item]
  }
}

/**
 * @param id - 移除 id
 */
function onRemove(id: string): void {
  selected.value = selected.value.filter((s) => s.id !== id)
}
</script>

<template>
  <div style="position: relative; height: 420px; max-width: 480px">
    <RagContextPanel
      v-model:query="query"
      :results="results"
      :selected="selected"
      @select="onSelect"
      @remove="onRemove"
    />
  </div>
</template>
