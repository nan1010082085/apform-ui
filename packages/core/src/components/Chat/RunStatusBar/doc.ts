/**
 * RunStatusBar 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** RunStatusBar 文档 */
export const RunStatusBarDoc: ComponentDoc = {
  name: 'RunStatusBar',
  description: 'RunStatusBar 组件。',
  props: [
    { name: 'run', type: 'RunStatusView | null; sending: boolean', required: true, description: 'run' },
  ],
  emits: [
    { name: 'cancel', description: 'cancel' },
  ],
  slots: [
  ],
}
