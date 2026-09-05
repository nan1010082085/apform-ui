<script setup lang="ts">
/**
 * useConfirm 确认弹框文档示例
 */
import { ref } from 'vue'
import { useConfirm, useMessage } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const { confirm, confirmDelete, confirmDanger } = useConfirm()
const msg = useMessage()
const result = ref('')

/**
 * 通用确认
 */
async function handleConfirm() {
  const ok = await confirm('确定要保存当前更改吗？')
  result.value = ok ? '已确认' : '已取消'
}

/**
 * 删除确认
 */
async function handleDelete() {
  const ok = await confirmDelete('该文件')
  if (ok) {
    msg.success('删除成功')
    result.value = '已删除'
  }
}

/**
 * 危险操作确认
 */
async function handleDanger() {
  const ok = await confirmDanger('此操作不可恢复，确定继续？')
  if (ok) {
    result.value = '已确认危险操作'
  }
}

const typesSource = `<template>
  <el-button @click="handleConfirm">通用确认</el-button>
  <el-button type="danger" @click="handleDelete">删除确认</el-button>
</template>

<script setup lang="ts">
import { useConfirm } from '@apform-ui/core'
const { confirm, confirmDelete } = useConfirm()
<\/script>`
</script>

<template>
  <div>
    <DemoBlock
      title="不同类型的确认"
      description="包装 ElMessageBox.confirm，提供 confirm / confirmDelete / confirmDanger 快捷方法。"
      :source="typesSource"
    >
      <div class="row">
        <el-button @click="handleConfirm">通用确认</el-button>
        <el-button type="danger" @click="handleDelete">删除确认</el-button>
        <el-button type="warning" @click="handleDanger">危险操作</el-button>
      </div>
      <p v-if="result" class="hint">{{ result }}</p>
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
.hint {
  margin: 12px 0 0;
  color: #26a036;
  font-size: 13px;
}
</style>
