<script setup lang="ts">
import { useMessage } from '@apform-ui/core'

const msg = useMessage()
</script>

<template>
  <div>
    <h2>useMessage 消息提示</h2>
    <p>包装 ElMessage 的 composable。</p>

    <div class="demo-section">
      <div class="demo-title">不同类型</div>
      <div class="demo-block">
        <div class="demo-row">
          <el-button @click="msg.success('操作成功！')">成功</el-button>
          <el-button @click="msg.error('操作失败')">错误</el-button>
          <el-button @click="msg.warning('请注意')">警告</el-button>
          <el-button @click="msg.info('提示信息')">信息</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
