/**
 * PageShell 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** PageShell 文档 */
export const PageShellDoc: ComponentDoc = {
  name: 'PageShell',
  description: 'PageShell 组件。',
  props: [
    { name: 'fill', type: 'boolean', description: 'fill' },
  ],
  emits: [
  ],
  slots: [
    { name: 'default', description: 'default' },
  ],
}
