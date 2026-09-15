import type { ComponentDoc } from '../../../docs/types'

/** QuestionnaireCard 文档 */
export const QuestionnaireCardDoc: ComponentDoc = {
  name: 'QuestionnaireCard',
  titleZh: '问卷卡',
  description: '问卷/审批问答卡：单选或输入作答，支持批准与拒绝。',
  props: [
    { name: 'title', type: 'string', required: true, description: '卡片标题' },
    { name: 'description', type: 'string', description: '说明文案' },
    { name: 'questions', type: 'QuestionnaireQuestion[]', required: true, description: '问题列表（id / question / required / options）' },
    {
      name: 'answers',
      type: 'Record<string, string>',
      default: '{}',
      description: '受控答案（问题 id → 值）',
    },
    {
      name: 'status',
      type: "'waiting' | 'approved' | 'rejected' | string",
      default: "'waiting'",
      description: '审批状态',
    },
    { name: 'approveLabel', type: 'string', default: "'批准'", description: '批准按钮文案' },
    { name: 'rejectLabel', type: 'string', default: "'拒绝'", description: '拒绝按钮文案' },
    { name: 'disabled', type: 'boolean', description: '禁用作答与底部操作' },
  ],
  emits: [
    { name: 'answer', payload: 'questionId: string, value: string', description: '答案变更（单选或输入）' },
    { name: 'approve', description: '批准（必填题均已回答时可点）' },
    { name: 'reject', description: '拒绝' },
  ],
  slots: [],
}
