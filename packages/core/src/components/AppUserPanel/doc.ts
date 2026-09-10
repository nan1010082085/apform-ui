/**
 * AppUserPanel 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** AppUserPanel 文档 */
export const AppUserPanelDoc: ComponentDoc = {
  name: 'AppUserPanel',
  titleZh: '用户面板',
  description: '用户入口：头像首字 + 名称；hover/focus 弹出详情与退出。',
  props: [
    { name: 'user', type: 'AppUserPanelUser | null', required: true, description: '当前用户；空仍渲染占位触发器' },
    { name: 'placement', type: "'bottom' | 'bottom-end' | 'top' | 'top-start'", default: "'bottom-end'", description: '弹出方向' },
    { name: 'block', type: 'boolean', default: 'false', description: '侧栏底部时铺满宽度' },
    { name: 'logoutLabel', type: 'string', default: "'退出'", description: '退出按钮文案' },
  ],
  emits: [
    { name: 'logout', description: '点击退出（由调用方处理）' },
  ],
}
