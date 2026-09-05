/**
 * SessionSidebar 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** SessionSidebar 文档 */
export const SessionSidebarDoc: ComponentDoc = {
  name: 'SessionSidebar',
  description: 'SessionSidebar 组件。',
  props: [
    { name: 'sessions', type: 'Session[]', required: true, description: 'sessions' },
    { name: 'activeId', type: 'string | null', description: 'activeId' },
    { name: 'loading', type: 'boolean', description: 'loading' },
    { name: 'title', type: 'string', description: 'title' },
  ],
  emits: [
  ],
  slots: [
  ],
}
