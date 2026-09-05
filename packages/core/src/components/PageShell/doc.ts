/**
 * PageShell 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** PageShell 文档 */
export const PageShellDoc: ComponentDoc = {
  name: 'PageShell',
  titleZh: '页面容器',
  description: '路由页统一外沿容器：页面背景、内边距；fill 时一屏填满。',
  props: [
    {
      name: 'fill',
      type: 'boolean',
      default: 'false',
      description: '一屏填满：overflow hidden，末子 flex:1 可内滚',
    },
  ],
  emits: [],
  slots: [{ name: 'default', description: '页面内容' }],
}
