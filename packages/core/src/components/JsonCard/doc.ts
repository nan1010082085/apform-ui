/**
 * JsonCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** JsonCard 文档 */
export const JsonCardDoc: ComponentDoc = {
  name: 'JsonCard',
  description: 'JsonCard 组件。',
  props: [
    { name: 'title', type: 'string', required: true, description: 'title' },
    { name: 'data', type: 'unknown', description: 'data' },
    { name: 'content', type: 'string', description: 'content' },
    { name: 'type', type: '\'json\' | \'schema\' | \'flow\'', description: 'type' },
  ],
  emits: [
  ],
  slots: [
  ],
}
