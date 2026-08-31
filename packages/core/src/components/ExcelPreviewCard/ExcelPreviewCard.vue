<script setup lang="ts">
/**
 * ExcelPreviewCard — Excel 表格预览（props 驱动，无 xlsx 解析）
 *
 * 父组件负责 fetch + 解析，本组件只渲染 sheet tabs 与表格。
 */
withDefaults(
  defineProps<{
    /** 工作表名称列表 */
    sheetNames?: string[]
    /** 当前 sheet */
    modelValue?: string
    /** 表头 */
    headers?: string[]
    /** 数据行 */
    rows?: string[][]
    /** 总行数（含表头） */
    totalRows?: number
    /** 最大预览行数说明 */
    maxPreviewRows?: number
    loading?: boolean
    error?: string | null
  }>(),
  {
    sheetNames: () => [],
    modelValue: '',
    headers: () => [],
    rows: () => [],
    totalRows: 0,
    maxPreviewRows: 100,
    loading: false,
    error: null,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="apf-excel-preview">
    <div v-if="sheetNames.length" class="apf-excel-preview__toolbar">
      <div class="apf-excel-preview__tabs">
        <button
          v-for="name in sheetNames"
          :key="name"
          type="button"
          class="apf-excel-preview__tab"
          :class="{ 'apf-excel-preview__tab--active': modelValue === name }"
          @click="emit('update:modelValue', name)"
        >
          {{ name }}
        </button>
      </div>
      <div v-if="totalRows > 0" class="apf-excel-preview__info">
        {{ totalRows }} 行
        <span v-if="totalRows > maxPreviewRows">（显示前 {{ maxPreviewRows }} 行）</span>
      </div>
    </div>

    <div v-if="loading" class="apf-excel-preview__state">加载中...</div>
    <div v-else-if="error" class="apf-excel-preview__state apf-excel-preview__state--error">{{ error }}</div>
    <div v-else-if="headers.length" class="apf-excel-preview__table-wrap">
      <table class="apf-excel-preview__table">
        <thead>
          <tr>
            <th class="apf-excel-preview__row-num">#</th>
            <th v-for="(h, i) in headers" :key="i">{{ h || `列${i + 1}` }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, ri) in rows" :key="ri">
            <td class="apf-excel-preview__row-num">{{ ri + 1 }}</td>
            <td v-for="(cell, ci) in row" :key="ci">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="apf-excel-preview__state">无数据</div>
  </div>
</template>

<style scoped>
.apf-excel-preview {
  border: 1px solid var(--border-color, #e4e7ed);
  border-radius: var(--border-radius-8, 8px);
  background: var(--bg-color-white, #fff);
  overflow: hidden;
}

.apf-excel-preview__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md, 16px);
  padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
  border-bottom: 1px solid var(--border-color-light, #ebeef5);
  background: var(--bg-color-gray-light, #fafafa);
}

.apf-excel-preview__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs, 4px);
}

.apf-excel-preview__tab {
  border: 1px solid var(--border-color, #e4e7ed);
  background: var(--bg-color-white, #fff);
  border-radius: var(--border-radius-6, 6px);
  padding: 4px 10px;
  font-size: var(--font-size-12, 12px);
  cursor: pointer;
}

.apf-excel-preview__tab--active {
  border-color: var(--color-primary, #0060a2);
  color: var(--color-primary, #0060a2);
}

.apf-excel-preview__info {
  font-size: var(--font-size-12, 12px);
  color: var(--text-color-secondary, #909399);
  white-space: nowrap;
}

.apf-excel-preview__table-wrap {
  overflow: auto;
  max-height: 420px;
}

.apf-excel-preview__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-13, 13px);
}

.apf-excel-preview__table th,
.apf-excel-preview__table td {
  border: 1px solid var(--border-color-light, #ebeef5);
  padding: 6px 10px;
  text-align: left;
}

.apf-excel-preview__table th {
  background: var(--bg-color-gray-light, #fafafa);
  font-weight: var(--font-weight-medium, 500);
}

.apf-excel-preview__row-num {
  width: 48px;
  text-align: center;
  color: var(--text-color-secondary, #909399);
  background: var(--bg-color-gray-light, #fafafa);
}

.apf-excel-preview__state {
  padding: var(--spacing-xl, 24px);
  text-align: center;
  color: var(--text-color-secondary, #909399);
}

.apf-excel-preview__state--error {
  color: var(--color-danger, #e50113);
}
</style>
