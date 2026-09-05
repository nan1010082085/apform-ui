<script setup lang="ts">
/**
 * FilterBar 筛选条文档示例
 */
import { ref } from 'vue'
import { FilterBar } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const keyword = ref('')
const status = ref('')

/**
 * 查询回调
 */
function onSearch() {
  alert(`查询：keyword=${keyword.value}, status=${status.value}`)
}

/**
 * 重置筛选条件
 */
function onReset() {
  keyword.value = ''
  status.value = ''
}

const basicSource = `<template>
  <FilterBar title="筛选条件" @search="onSearch" @reset="onReset">
    <el-form-item label="名称">
      <el-input v-model="keyword" clearable />
    </el-form-item>
  </FilterBar>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="列表页顶部筛选区，内置查询/重置按钮。"
      :source="basicSource"
    >
      <div class="frame">
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
        <p class="meta">当前筛选：{{ keyword || '—' }} / {{ status || '全部' }}</p>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.frame {
  min-height: 200px;
}
.meta {
  margin: 12px 0 0;
  font-size: 13px;
  color: #909399;
}
</style>
