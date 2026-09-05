<script setup lang="ts">
/**
 * ConfirmDialog — 确认弹框
 */
import { ref } from 'vue'
import { ConfirmDialog } from '@apform-ui/core'

const visible = ref(false)
const type = ref<'info' | 'warning' | 'danger'>('warning')

function open(t: typeof type.value) {
  type.value = t
  visible.value = true
}
</script>

<template>
  <div class="wrap">
    <h2>ConfirmDialog</h2>
    <p>确认操作弹框，支持 info / warning / danger。</p>

    <div class="row">
      <el-button @click="open('info')">信息</el-button>
      <el-button type="warning" @click="open('warning')">警告</el-button>
      <el-button type="danger" @click="open('danger')">危险</el-button>
    </div>

    <ConfirmDialog
      v-model="visible"
      :type="type"
      title="确认操作"
      message="确定要执行该操作吗？此操作可能无法撤销。"
      @confirm="visible = false"
    />
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
}
.row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
h2 {
  margin: 0 0 4px;
}
p {
  margin: 0 0 16px;
  color: var(--text-color-secondary, #666);
  font-size: 13px;
}
</style>
