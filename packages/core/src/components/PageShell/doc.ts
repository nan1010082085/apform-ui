/**
 * PageShell 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** PageShell 文档 */
export const PageShellDoc: ComponentDoc = {
  name: 'PageShell',
  titleZh: '页面外壳',
  description:
    '路由页统一外沿：内边距、滚动与页面背景。典型嵌套：PageShell → PageHeader + ContentPanel。全幅对话/设计器页不要使用。',
  props: [
    {
      name: 'fill',
      type: 'boolean',
      default: 'false',
      description: '一屏填满：overflow hidden，末子 flex:1 可内滚',
    },
  ],
  slots: [{ name: 'default', description: '页面主体；建议依次放 PageHeader、FilterBar、ContentPanel' }],
}
