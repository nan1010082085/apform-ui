<script setup lang="ts">
/**
 * FilterBar — 列表页筛选条 Demo
 */
import { ref } from 'vue'
import { FilterBar } from '@apform-ui/core'

const keyword = ref('')
const status = ref('')

function onSearch() {
  alert(`查询：keyword=${keyword.value}, status=${status.value}`)
}

function onReset() {
  keyword.value = ''
  status.value = ''
}
</script>

<template>
  <div>
    <h2>FilterBar 筛选条</h2>
    <p>列表页顶部筛选区，内置查询/重置按钮。</p>

    <div class="demo-section" style="height: 480px">
      <FilterBar title="筛选条件" @search="onSearch" @reset="onReset">
        <el-form-item label="名称">
          <el-input v-model="keyword" clearable placeholder="搜索" style="width: 180px" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="status" clearable placeholder="全部" style="width: 140px">
            <el-option label="启用" value="active" />
            <el-option label="停用" value="inactive" />
          </el-select>
        </el-form-item>
      </FilterBar>
      <p style="font-size: 13px; color: var(--text-color-secondary)">
        当前筛选：{{ keyword || '—' }} / {{ status || '全部' }}
      </p>
    </div>
  </div>
</template>
