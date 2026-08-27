<script setup>
import { useMessage } from '@schema-ui/core'

const msg = useMessage()
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <el-button @click="msg.success('操作成功！')">成功</el-button>
    <el-button @click="msg.error('操作失败')">错误</el-button>
    <el-button @click="msg.warning('请注意')">警告</el-button>
    <el-button @click="msg.info('提示信息')">信息</el-button>
  </div>
</template>
