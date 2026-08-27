<script setup>
import { ref } from 'vue'
import { useConfirm, useMessage } from '@schema-ui/core'

const { confirm, confirmDelete } = useConfirm()
const msg = useMessage()
const result = ref('')

async function handleConfirm() {
  const ok = await confirm('确定要保存当前更改吗？')
  result.value = ok ? '已确认' : '已取消'
}

async function handleDelete() {
  const ok = await confirmDelete('该文件')
  if (ok) {
    msg.success('删除成功')
    result.value = '已删除'
  }
}
</script>

<template>
  <div style="display: flex; gap: 8px; align-items: center;">
    <el-button @click="handleConfirm">通用确认</el-button>
    <el-button type="danger" @click="handleDelete">删除确认</el-button>
    <span v-if="result" style="color: var(--color-success); font-size: 13px;">{{ result }}</span>
  </div>
</template>
