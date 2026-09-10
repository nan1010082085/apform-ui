/**
 * RagContextPanel 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** RagContextPanel 文档 */
export const RagContextPanelDoc: ComponentDoc = {
  name: 'RagContextPanel',
  titleZh: 'RAG 上下文面板',
  description: 'Schema/RAG 上下文选择浮层（纯 UI）；输入 debounce 由父层负责。',
  props: [
    { name: 'results', type: 'RagContextItem[]', required: true, description: '搜索结果' },
    { name: 'selected', type: 'RagContextItem[]', required: true, description: '已选项' },
    { name: 'loading', type: 'boolean', default: 'false', description: '加载中' },
    { name: 'query', type: 'string', default: "''", description: '受控搜索词' },
    { name: 'placeholder', type: 'string', description: '输入框占位' },
    { name: 'emptyHint', type: 'string', description: '无结果提示' },
    { name: 'idleHint', type: 'string', description: '空闲提示' },
    { name: 'footerHint', type: 'string', description: '底部提示（未选）' },
    { name: 'selectedFooterHint', type: 'string', description: '底部提示（已选，可用 {n}）' },
  ],
  emits: [
    { name: 'update:query', payload: 'value: string', description: '搜索词变更' },
    { name: 'search', payload: 'query: string', description: '触发搜索（随输入）' },
    { name: 'select', payload: 'item: RagContextItem', description: '选择一项' },
    { name: 'remove', payload: 'id: string', description: '移除已选' },
    { name: 'close', description: '关闭面板' },
  ],
}
