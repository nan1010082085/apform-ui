<script setup lang="ts">
/**
 * useMessage 消息提示文档示例
 */
import { useMessage } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const msg = useMessage()

const typesSource = `<template>
  <el-button @click="msg.success('操作成功！')">成功</el-button>
  <el-button @click="msg.error('操作失败')">错误</el-button>
</template>

<script setup lang="ts">
import { useMessage } from '@apform-ui/core'
const msg = useMessage()
<\/script>`
</script>

<template>
  <div>
    <DemoBlock
      title="不同类型"
      description="包装 ElMessage 的 composable，提供 success / error / warning / info 方法。"
      :source="typesSource"
    >
      <div class="row">
        <el-button @click="msg.success('操作成功！')">成功</el-button>
        <el-button @click="msg.error('操作失败')">错误</el-button>
        <el-button @click="msg.warning('请注意')">警告</el-button>
        <el-button @click="msg.info('提示信息')">信息</el-button>
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
