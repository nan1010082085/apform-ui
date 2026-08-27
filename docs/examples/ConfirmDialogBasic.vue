<script setup>
import { ref } from 'vue'
import { ConfirmDialog } from '@apform-ui/core'

const visible = ref(false)
const result = ref('')

function handleConfirm() {
  visible.value = false
  result.value = '已确认'
}
</script>

<template>
  <div>
    <el-button type="danger" @click="visible = true">删除确认</el-button>
    <span v-if="result" style="margin-left: 12px; color: var(--color-success);">{{ result }}</span>

    <ConfirmDialog
      v-model="visible"
      title="确认删除"
      message="此操作将永久删除该文件，是否继续？"
      type="danger"
      confirm-text="确认删除"
      @confirm="handleConfirm"
    />
  </div>
</template>
