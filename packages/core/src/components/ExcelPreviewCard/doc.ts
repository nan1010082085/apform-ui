/**
 * ExcelPreviewCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ExcelPreviewCard 文档 */
export const ExcelPreviewCardDoc: ComponentDoc = {
  name: 'ExcelPreviewCard',
  description: 'ExcelPreviewCard 组件。',
  props: [
    { name: 'sheetNames', type: 'string[]', description: 'sheetNames' },
    { name: 'modelValue', type: 'string', description: 'modelValue' },
    { name: 'headers', type: 'string[]', description: 'headers' },
    { name: 'rows', type: 'string[][]', description: 'rows' },
    { name: 'totalRows', type: 'number', description: 'totalRows' },
    { name: 'maxPreviewRows', type: 'number', description: 'maxPreviewRows' },
    { name: 'loading', type: 'boolean', description: 'loading' },
    { name: 'error', type: 'string | null', description: 'error' },
    { name: 'src', type: 'string', description: '远程 Excel URL（触发 xlsx 解析）' },
    { name: 'arrayBuffer', type: 'ArrayBuffer | null', description: '已加载的 ArrayBuffer' },
    { name: 'fetchHeaders', type: 'Record<string, string>', description: '远程 src fetch 鉴权 headers' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: string', description: 'update:modelValue' },
  ],
  slots: [
  ],
}
