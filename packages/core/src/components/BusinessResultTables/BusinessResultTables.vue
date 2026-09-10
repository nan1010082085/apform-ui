<script setup lang="ts">
/**
 * BusinessResultTables — 业务 JSON 结果表格阅览
 */
import type { BusinessResultTable } from '../../utils/businessResultTables'

defineProps<{
  tables: BusinessResultTable[]
}>()

/**
 * 单元格展示
 * @param value 单元格值
 */
function cellText(value: unknown): string {
  if (value == null) return '—'
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}
</script>

<template>
  <div class="apf-business-result-tables">
    <div
      v-for="table in tables"
      :key="table.key"
      class="apf-business-result-tables__block"
    >
      <div class="apf-business-result-tables__title">{{ table.title }}</div>
      <el-table :data="table.rows" size="small" border stripe max-height="320">
        <el-table-column
          v-for="col in table.columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          min-width="100"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            {{ cellText(row[col.prop]) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.apf-business-result-tables {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.apf-business-result-tables__title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--el-text-color-primary);
}
</style>
