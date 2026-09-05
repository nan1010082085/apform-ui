<script setup lang="ts">
/**
 * Toast 轻提示文档示例
 */
import { ref } from 'vue'
import { Toast } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const toastRef = ref()

const typesSource = `<template>
  <Toast ref="toastRef" />
  <el-button @click="toastRef?.show('这是一条信息', 'info')">信息</el-button>
  <el-button @click="toastRef?.show('操作成功！', 'success')">成功</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Toast } from '@apform-ui/core'
const toastRef = ref()
<\/script>`
</script>

<template>
  <div>
    <DemoBlock
      title="不同类型"
      description="通过 show 方法传入文案与类型，展示轻量级消息提示。"
      :source="typesSource"
    >
      <Toast ref="toastRef" />
      <div class="row">
        <el-button @click="toastRef?.show('这是一条信息', 'info')">信息</el-button>
        <el-button type="success" @click="toastRef?.show('操作成功！', 'success')">成功</el-button>
        <el-button type="warning" @click="toastRef?.show('请注意！', 'warning')">警告</el-button>
        <el-button type="danger" @click="toastRef?.show('操作失败', 'error')">错误</el-button>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
