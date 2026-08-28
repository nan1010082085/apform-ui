<script setup lang="ts">
import { ref } from 'vue'
import { useConfirm, useMessage } from '@apform-ui/core'

const { confirm, confirmDelete, confirmDanger } = useConfirm()
const msg = useMessage()
const result = ref('')

async function handleConfirm() {
  const ok = await confirm('确定要保存当前更改吗？')
  result.value = ok ? '已确认' : '已取消'
}

async function handleDelete() {
  const ok = await confirmDelete('该文件')
  if (ok) {
    msg.success('删除成功')
    result.value = '已删除'
  }
}

async function handleDanger() {
  const ok = await confirmDanger('此操作不可恢复，确定继续？')
  if (ok) {
    result.value = '已确认危险操作'
  }
}
</script>

<template>
  <div>
    <h2>useConfirm 确认弹框</h2>
    <p>包装 ElMessageBox.confirm 的 composable。</p>

    <div class="demo-section">
      <div class="demo-title">不同类型的确认</div>
      <div class="demo-block">
        <div class="demo-row">
          <el-button @click="handleConfirm">通用确认</el-button>
          <el-button type="danger" @click="handleDelete">删除确认</el-button>
          <el-button type="warning" @click="handleDanger">危险操作</el-button>
        </div>
        <p v-if="result" style="margin-top: 12px; color: #26A036; font-size: 13px;">{{ result }}</p>
      </div>
    </div>
  </div>
</template>
