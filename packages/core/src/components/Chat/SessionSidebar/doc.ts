/**
 * SessionSidebar 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** SessionSidebar 文档 */
export const SessionSidebarDoc: ComponentDoc = {
  name: 'SessionSidebar',
  description: '会话侧栏：列表选择 / 新建 / 删除；可通过槽扩展工具栏与条目操作。',
  props: [
    { name: 'sessions', type: 'Session[]', required: true, description: '会话列表' },
    { name: 'activeId', type: 'string | null', description: '当前选中会话' },
    { name: 'loading', type: 'boolean', description: '加载中' },
    { name: 'title', type: 'string', description: '侧栏标题' },
    { name: 'hideCreate', type: 'boolean', description: '隐藏内置新建按钮' },
    { name: 'hideDelete', type: 'boolean', description: '隐藏内置删除按钮' },
    { name: 'emptyText', type: 'string', description: '空态文案' },
  ],
  emits: [
    { name: 'select', payload: 'id: string', description: '选中会话' },
    { name: 'create', payload: '', description: '新建会话' },
    { name: 'delete', payload: 'id: string', description: '删除会话' },
  ],
  slots: [
    { name: 'toolbar', description: '标题栏右侧扩展' },
    { name: 'below-head', description: '标题下方区域（如搜索）' },
    { name: 'item-meta', description: '条目次要信息（默认相对时间）' },
    { name: 'item-actions', description: '条目操作（默认删除）' },
  ],
}
