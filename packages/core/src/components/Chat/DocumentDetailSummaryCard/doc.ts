import type { ComponentDoc } from '../../../docs/types'

/** DocumentDetailSummaryCard 文档 */
export const DocumentDetailSummaryCardDoc: ComponentDoc = {
  name: 'DocumentDetailSummaryCard',
  titleZh: '文档摘要卡',
  description: '结构化文档摘要卡：标题、要点列表与章节正文。',
  props: [
    {
      name: 'item',
      type: 'DocumentDetailSummaryItem',
      required: true,
      description: '摘要数据（filename + summary.title / summary / keyPoints / sections）',
    },
  ],
  emits: [],
  slots: [],
}
