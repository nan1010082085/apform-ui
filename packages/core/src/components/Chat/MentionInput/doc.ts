/**
 * MentionInput 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** MentionInput 文档 */
export const MentionInputDoc: ComponentDoc = {
  name: 'MentionInput',
  description: '@ 引用输入壳：面板、chips、textarea；搜索由业务注入。',
  props: [
    { name: 'tabs', type: 'MentionTab[]', required: true, description: '分类 Tab' },
    { name: 'search', type: 'MentionSearchFn', required: true, description: '异步搜索函数' },
    { name: 'disabled', type: 'boolean', description: '禁用' },
    { name: 'loading', type: 'boolean', description: '加载中禁用输入' },
    { name: 'placeholder', type: 'string', description: 'textarea 占位' },
    { name: 'typeBadge', type: '(type: string) => string', description: '类型角标' },
    { name: 'debounceMs', type: 'number', description: '搜索防抖毫秒' },
    { name: 'emptyText', type: 'string', description: '无结果文案' },
    { name: 'searchPlaceholder', type: 'string', description: '面板搜索占位' },
  ],
  emits: [
    { name: 'send', payload: 'message: string, mentions: MentionChip[]', description: '发送' },
    { name: 'input', payload: 'message: string', description: '输入变化' },
  ],
  slots: [],
}
