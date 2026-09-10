/**
 * StreamStatusBanner 文档元数据
 */
import type { ComponentDoc } from '../../../docs/types'

/** StreamStatusBanner 文档 */
export const StreamStatusBannerDoc: ComponentDoc = {
  name: 'StreamStatusBanner',
  description: '流式连接状态条：断线提示与重试。',
  props: [
    { name: 'status', type: "'idle' | 'connecting' | 'reconnecting' | 'disconnected' | 'streaming'", required: true, description: '连接状态' },
    { name: 'message', type: 'string', description: '展示文案' },
    { name: 'retryLabel', type: 'string', description: '重试按钮文案' },
    { name: 'showRetry', type: 'boolean', description: '是否显示重试' },
  ],
  emits: [
    { name: 'retry', payload: '', description: '点击重试' },
  ],
  slots: [],
}
