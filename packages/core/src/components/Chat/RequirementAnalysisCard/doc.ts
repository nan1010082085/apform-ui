import type { ComponentDoc } from '../../../docs/types'

/** RequirementAnalysisCard 文档 */
export const RequirementAnalysisCardDoc: ComponentDoc = {
  name: 'RequirementAnalysisCard',
  titleZh: '需求分析卡',
  description: '需求分析确认卡：完整性、假设、建议链、确认问题选项与跳过。',
  props: [
    { name: 'analysis', type: 'RequirementAnalysis', required: true, description: '需求分析结果（意图/类型/复杂度/完整性/问题/建议链）' },
    {
      name: 'partialAnswers',
      type: 'Record<string, string>',
      default: '{}',
      description: '已收集的部分答案（问题 id → 回答）',
    },
    {
      name: 'nextQuestionId',
      type: 'string | null',
      default: 'null',
      description: '当前待回答的问题 id',
    },
    {
      name: 'waitingConfirmation',
      type: 'boolean',
      default: 'true',
      description: '是否等待用户确认（为 false 时禁用选项点击）',
    },
  ],
  emits: [
    { name: 'answer', payload: 'questionId: string, value: string', description: '单条答案（点选选项时触发）' },
    { name: 'skip', description: '跳过确认，直接执行' },
  ],
  slots: [],
}
