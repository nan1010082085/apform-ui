<script setup>
import { ref } from 'vue'
import { AppDialog } from '@schema-ui/core'

const visible = ref(false)
</script>

<template>
  <div>
    <el-button @click="visible = true">自定义按钮文案</el-button>
    <AppDialog
      v-model="visible"
      title="自定义文案"
      cancel-text="Cancel"
      confirm-text="OK"
    >
      <p>通过 cancel-text 和 confirm-text 属性自定义按钮文案。</p>
    </AppDialog>
  </div>
</template>
