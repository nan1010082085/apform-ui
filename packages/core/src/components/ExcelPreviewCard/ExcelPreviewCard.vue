<script setup lang="ts">
/**
 * ExcelPreviewCard — Excel 表格预览
 *
 * - props 驱动：sheetNames / headers / rows（无 xlsx）
 * - 或传入 src / arrayBuffer + optional peer `xlsx` 内置解析
 */
import { computed, ref, watch } from 'vue'
import { tryLoadXlsx } from '../../utils/optionalPeers'

const props = withDefaults(
  defineProps<{
    /** 工作表名称列表（props 模式） */
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
    /** 远程 Excel URL（触发 xlsx 解析） */
    src?: string
    /** 已加载的 ArrayBuffer */
    arrayBuffer?: ArrayBuffer | null
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
    src: '',
    arrayBuffer: null,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const internalLoading = ref(false)
const internalError = ref<string | null>(null)
const parsedNames = ref<string[]>([])
const parsedHeaders = ref<string[]>([])
const parsedRows = ref<string[][]>([])
const parsedTotal = ref(0)
const activeSheet = ref('')
const useParsed = ref(false)

let workbook: { SheetNames: string[]; Sheets: Record<string, unknown> } | null = null
let xlsxUtils: {
  sheet_to_json: <T>(sheet: unknown, opts: { header: number; defval: string }) => T[]
} | null = null

/**
 * 渲染指定 sheet
 * @param sheetName sheet 名
 */
function renderSheet(sheetName: string) {
  if (!workbook || !xlsxUtils) return
  const sheet = workbook.Sheets[sheetName]
  if (!sheet) return
  const data = xlsxUtils.sheet_to_json<(string | number | boolean | null)[]>(sheet, {
    header: 1,
    defval: '',
  })
  parsedTotal.value = data.length
  if (!data.length) {
    parsedHeaders.value = []
    parsedRows.value = []
    return
  }
  parsedHeaders.value = data[0].map(String)
  parsedRows.value = data
    .slice(1, props.maxPreviewRows + 1)
    .map((row) => row.map((cell) => String(cell ?? '')))
}

/**
 * 从 buffer 解析
 * @param buffer Excel 二进制
 */
async function parseBuffer(buffer: ArrayBuffer) {
  const xlsx = await tryLoadXlsx()
  if (!xlsx) {
    useParsed.value = false
    internalError.value = '未安装 xlsx，无法解析 Excel（可改用 props 传表数据）'
    return
  }
  internalLoading.value = true
  internalError.value = null
  try {
    workbook = xlsx.read(buffer, { type: 'array' })
    xlsxUtils = xlsx.utils
    parsedNames.value = workbook.SheetNames
    useParsed.value = true
    if (workbook.SheetNames.length) {
      activeSheet.value = workbook.SheetNames[0]
      emit('update:modelValue', activeSheet.value)
      renderSheet(activeSheet.value)
    }
  } catch (err) {
    useParsed.value = false
    internalError.value = err instanceof Error ? err.message : 'Excel 解析失败'
  } finally {
    internalLoading.value = false
  }
}

watch(
  () => [props.src, props.arrayBuffer] as const,
  async ([src, buffer]) => {
    if (buffer) {
      await parseBuffer(buffer)
      return
    }
    if (!src) {
      useParsed.value = false
      return
    }
    internalLoading.value = true
    internalError.value = null
    try {
      const resp = await fetch(src)
      if (!resp.ok) throw new Error(`加载失败: ${resp.status}`)
      await parseBuffer(await resp.arrayBuffer())
    } catch (err) {
      useParsed.value = false
      internalError.value = err instanceof Error ? err.message : 'Excel 加载失败'
      internalLoading.value = false
    }
  },
  { immediate: true },
)

/**
 * 切换 sheet
 * @param name sheet 名
 */
function onTab(name: string) {
  emit('update:modelValue', name)
  if (useParsed.value) {
    activeSheet.value = name
    renderSheet(name)
  }
}

const sheetNamesView = computed(() =>
  useParsed.value ? parsedNames.value : props.sheetNames,
)
const modelView = computed(() =>
  useParsed.value ? activeSheet.value : props.modelValue,
)
const headersView = computed(() =>
  useParsed.value ? parsedHeaders.value : props.headers,
)
const rowsView = computed(() => (useParsed.value ? parsedRows.value : props.rows))
const totalView = computed(() =>
  useParsed.value ? parsedTotal.value : props.totalRows,
)
const loadingView = computed(() =>
  useParsed.value || props.src || props.arrayBuffer
    ? internalLoading.value
    : props.loading,
)
const errorView = computed(() =>
  useParsed.value || props.src || props.arrayBuffer
    ? internalError.value
    : props.error,
)
</script>

<template>
  <div class="apf-excel-preview">
    <div v-if="sheetNamesView.length" class="apf-excel-preview__toolbar">
      <div class="apf-excel-preview__tabs">
        <button
          v-for="name in sheetNamesView"
          :key="name"
          type="button"
          class="apf-excel-preview__tab"
          :class="{ 'apf-excel-preview__tab--active': modelView === name }"
          @click="onTab(name)"
        >
          {{ name }}
        </button>
      </div>
      <div v-if="totalView > 0" class="apf-excel-preview__info">
        {{ totalView }} 行
        <span v-if="totalView > maxPreviewRows">（显示前 {{ maxPreviewRows }} 行）</span>
      </div>
    </div>

    <div v-if="loadingView" class="apf-excel-preview__state">加载中...</div>
    <div v-else-if="errorView" class="apf-excel-preview__state apf-excel-preview__state--error">{{ errorView }}</div>
    <div v-else-if="headersView.length" class="apf-excel-preview__table-wrap">
      <table class="apf-excel-preview__table">
        <thead>
          <tr>
            <th class="apf-excel-preview__row-num">#</th>
            <th v-for="(h, i) in headersView" :key="i">{{ h || `列${i + 1}` }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, ri) in rowsView" :key="ri">
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
