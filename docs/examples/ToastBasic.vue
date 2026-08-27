<script setup>
import { ref } from 'vue'
import { Toast } from '@schema-ui/core'

const toastRef = ref()
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <Toast ref="toastRef" />
    <el-button @click="toastRef?.show('这是一条信息提示', 'info')">信息</el-button>
    <el-button type="success" @click="toastRef?.show('操作成功！', 'success')">成功</el-button>
    <el-button type="warning" @click="toastRef?.show('请注意！', 'warning')">警告</el-button>
    <el-button type="danger" @click="toastRef?.show('操作失败', 'error')">错误</el-button>
  </div>
</template>
