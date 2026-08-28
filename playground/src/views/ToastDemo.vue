<script setup lang="ts">
import { ref } from 'vue'
import { Toast } from '@apform-ui/core'

const toastRef = ref()
</script>

<template>
  <div>
    <h2>Toast 轻提示</h2>
    <p>轻量级消息提示组件。</p>

    <div class="demo-section">
      <div class="demo-title">不同类型</div>
      <div class="demo-block">
        <Toast ref="toastRef" />
        <div class="demo-row">
          <el-button @click="toastRef?.show('这是一条信息', 'info')">信息</el-button>
          <el-button type="success" @click="toastRef?.show('操作成功！', 'success')">成功</el-button>
          <el-button type="warning" @click="toastRef?.show('请注意！', 'warning')">警告</el-button>
          <el-button type="danger" @click="toastRef?.show('操作失败', 'error')">错误</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
