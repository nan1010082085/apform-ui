/**
 * RunStatusBar 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** RunStatusBar 文档 — 入口 `@apform-ui/core/chat` */
export const RunStatusBarDoc: ComponentDoc = {
  name: 'RunStatusBar',
  titleZh: '运行状态条',
  description:
    '展示单次 run 的状态芯片、耗时与错误；RUNNING 时可取消。入口：`@apform-ui/core/chat`。',
  props: [
    {
      name: 'run',
      type: 'RunStatusView | null',
      required: true,
      description: '运行视图；为 null 时不渲染',
    },
    {
      name: 'sending',
      type: 'boolean',
      required: true,
      description: '是否仍在发送链路（与 run 并列必传）',
    },
  ],
  emits: [{ name: 'cancel', description: '点击「停止」' }],
}
