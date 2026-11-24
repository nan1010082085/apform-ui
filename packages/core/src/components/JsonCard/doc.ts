/**
 * JsonCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** JsonCard 文档 */
export const JsonCardDoc: ComponentDoc = {
  name: 'JsonCard',
  titleZh: 'JSON 摘要卡',
  description:
    '结构化数据摘要卡片（元素个数 / 键数量等）；点击可抛 click / openDetail，详情建议用 JsonDetailDialog。',
  props: [
    { name: 'title', type: 'string', required: true, description: '卡片标题' },
    { name: 'data', type: 'unknown', description: '已解析对象或原始值' },
    {
      name: 'content',
      type: 'string',
      description: '兼容旧 API：JSON 字符串（无 data 时解析）',
    },
    {
      name: 'type',
      type: "'json' | 'schema' | 'flow'",
      default: "'json'",
      description: '类型标记（影响展示语义）',
    },
  ],
  emits: [
    { name: 'click', description: '点击卡片' },
    { name: 'openDetail', description: '请求打开详情' },
  ],
}
