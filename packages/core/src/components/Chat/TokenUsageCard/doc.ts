import type { ComponentDoc } from '../../../docs/types'

/** TokenUsageCard 文档 */
export const TokenUsageCardDoc: ComponentDoc = {
  name: 'TokenUsageCard',
  titleZh: 'Token 消耗卡',
  description: 'Token / 费用摘要卡：输入/输出/总计与可选模型、预估费用。',
  props: [
    { name: 'inputTokens', type: 'number', required: true, description: '输入 token 数' },
    { name: 'outputTokens', type: 'number', required: true, description: '输出 token 数' },
    {
      name: 'totalTokens',
      type: 'number',
      description: '总计 token；未传时为 inputTokens + outputTokens',
    },
    { name: 'estimatedCost', type: 'number | null', description: '预估费用（美元）；null/未传不展示' },
    { name: 'model', type: 'string', description: '模型名' },
    { name: 'title', type: 'string', description: '卡片标题；默认「Token 消耗」' },
  ],
  emits: [],
  slots: [],
}
