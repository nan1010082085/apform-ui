/**
 * CitationBlock 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** CitationBlock 文档 */
export const CitationBlockDoc: ComponentDoc = {
  name: 'CitationBlock',
  titleZh: '引用出处块',
  description:
    '专家回答的结构化引用展示：法律「法规全称 + 条号 + 时效」、医疗「指南/说明书出处」、或 RAG 命中摘要。纯 props，不解析模型正文。',
  props: [
    { name: 'items', type: 'CitationItem[]', required: true, description: '引用列表' },
    { name: 'heading', type: 'string', description: '区块标题，默认「依据与出处」' },
    { name: 'dense', type: 'boolean', description: '紧凑 chip 模式（如用户气泡上的引用）' },
  ],
  emits: [],
  slots: [],
}
