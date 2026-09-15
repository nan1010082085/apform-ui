import type { ComponentDoc } from '../../../docs/types'

/** ChecklistProposalCard 文档 */
export const ChecklistProposalCardDoc: ComponentDoc = {
  name: 'ChecklistProposalCard',
  titleZh: '清单拟办卡',
  description: '清单拟办卡：勾选行动项、行内编辑、批准/拒绝与重新审核。',
  props: [
    { name: 'proposal', type: 'ChecklistProposal', required: true, description: '拟办方案（摘要、行动项、审批链等）' },
    {
      name: 'status',
      type: "'pending' | 'approved' | 'rejected'",
      description: '审批状态；未传时按 pending 展示操作区',
    },
    {
      name: 'selectedIds',
      type: 'Set<string>',
      description: '受控已选项 ID；未传时组件内部维护选中态',
    },
    { name: 'readonly', type: 'boolean', description: '只读（隐藏勾选操作与批准/拒绝）' },
  ],
  emits: [
    { name: 'toggle-item', payload: 'itemId: string', description: '切换单项选中（仅受控 selectedIds 时）' },
    { name: 'toggle-all', description: '全选/取消全选（仅受控 selectedIds 时）' },
    { name: 'approve', payload: 'selectedIds: string[]', description: '确认执行所选行动项' },
    { name: 'reject', description: '暂不执行' },
    {
      name: 'modify',
      payload: 'itemId: string, changes: Partial<ChecklistProposalItem>',
      description: '行内编辑保存后回传变更',
    },
    { name: 'reset', description: '已批准/已拒绝后重新审核' },
  ],
  slots: [],
}
