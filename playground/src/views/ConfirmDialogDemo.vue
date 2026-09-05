<script setup lang="ts">
/**
 * ConfirmDialog 文档示例
 */
import { ref } from 'vue'
import { ConfirmDialog } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const visible = ref(false)
const type = ref<'info' | 'warning' | 'danger'>('warning')

/**
 * @param t 确认类型
 */
function open(t: typeof type.value) {
  type.value = t
  visible.value = true
}

const source = `<script setup lang="ts">
import { ref } from 'vue'
import { ConfirmDialog } from '@apform-ui/core'

const visible = ref(false)
<\/script>

<template>
  <el-button @click="visible = true">打开</el-button>
  <ConfirmDialog
    v-model="visible"
    type="warning"
    title="确认操作"
    message="确定要执行该操作吗？"
    @confirm="visible = false"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="确认操作弹框，支持 info / warning / danger 三种语义类型。"
      :source="source"
    >
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
    </DemoBlock>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
