/**
 * ConversationSearchBar 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** ConversationSearchBar 文档 */
export const ConversationSearchBarDoc: ComponentDoc = {
  name: 'ConversationSearchBar',
  description: '对话搜索栏：关键词、来源/时间筛选与结果列表（纯 UI，数据由父层注入）。',
  props: [
    { name: 'modelValue', type: 'string', required: true, description: '搜索词' },
    { name: 'searching', type: 'boolean', description: '搜索中' },
    { name: 'panelVisible', type: 'boolean', description: '是否展示结果面板' },
    {
      name: 'results',
      type: 'ConversationSearchResult[]',
      required: true,
      description: '结果列表',
    },
    { name: 'total', type: 'number', description: '结果总数' },
    {
      name: 'sourceOptions',
      type: 'ConversationSearchSourceOption[]',
      description: '来源筛选项',
    },
    { name: 'sourceFilter', type: 'string', description: '当前来源筛选' },
    { name: 'startDate', type: 'string', description: '开始日期 YYYY-MM-DD' },
    { name: 'endDate', type: 'string', description: '结束日期 YYYY-MM-DD' },
    { name: 'filtersExpanded', type: 'boolean', description: '筛选面板展开' },
    { name: 'placeholder', type: 'string', description: '输入框占位' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: string', description: '搜索词变更' },
    { name: 'update:sourceFilter', payload: 'value: string', description: '来源筛选变更' },
    { name: 'update:startDate', payload: 'value: string', description: '开始日期变更' },
    { name: 'update:endDate', payload: 'value: string', description: '结束日期变更' },
    { name: 'update:filtersExpanded', payload: 'value: boolean', description: '筛选展开变更' },
    { name: 'update:panelVisible', payload: 'value: boolean', description: '结果面板显隐' },
    { name: 'select', payload: 'id: string', description: '选中结果' },
    { name: 'clear', payload: '', description: '清空搜索与筛选' },
    { name: 'search', payload: '', description: '可选：请求触发搜索（如回车）' },
  ],
  slots: [],
}
