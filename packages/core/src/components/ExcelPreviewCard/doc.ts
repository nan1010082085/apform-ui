/**
 * ExcelPreviewCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ExcelPreviewCard 文档 */
export const ExcelPreviewCardDoc: ComponentDoc = {
  name: 'ExcelPreviewCard',
  titleZh: 'Excel 预览卡',
  description:
    'Excel 表格预览：可纯 props（sheetNames/headers/rows）驱动，或传 src / arrayBuffer + optional peer xlsx 内置解析。',
  props: [
    {
      name: 'sheetNames',
      type: 'string[]',
      default: '[]',
      description: '工作表名称（props 模式）',
    },
    {
      name: 'modelValue',
      type: 'string',
      default: "''",
      description: '当前选中 sheet 名',
    },
    { name: 'headers', type: 'string[]', default: '[]', description: '表头' },
    { name: 'rows', type: 'string[][]', default: '[]', description: '数据行' },
    {
      name: 'totalRows',
      type: 'number',
      default: '0',
      description: '总行数说明（含表头）',
    },
    {
      name: 'maxPreviewRows',
      type: 'number',
      default: '100',
      description: '最大预览行数说明',
    },
    { name: 'loading', type: 'boolean', default: 'false', description: '外部加载态' },
    {
      name: 'error',
      type: 'string | null',
      default: 'null',
      description: '外部错误文案',
    },
    { name: 'src', type: 'string', default: "''", description: '远程 Excel URL（触发 xlsx）' },
    {
      name: 'arrayBuffer',
      type: 'ArrayBuffer | null',
      default: 'null',
      description: '已加载的 ArrayBuffer',
    },
    {
      name: 'fetchHeaders',
      type: 'Record<string, string>',
      description: '远程 src fetch 鉴权 headers',
    },
  ],
  emits: [
    {
      name: 'update:modelValue',
      payload: 'value: string',
      description: '切换 sheet',
    },
  ],
}
