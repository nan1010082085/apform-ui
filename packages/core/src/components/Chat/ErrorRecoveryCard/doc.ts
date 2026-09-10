import type { ComponentDoc } from '../../../docs/types'

/** ErrorRecoveryCard 文档 */
export const ErrorRecoveryCardDoc: ComponentDoc = {
  name: 'ErrorRecoveryCard',
  description: '错误恢复策略选择卡：展示节点错误与重试/跳过/回滚等策略',
  props: [
    { name: 'error', type: 'string', required: true, description: '错误信息' },
    { name: 'nodeName', type: 'string', required: true, description: '节点名称' },
    { name: 'nodeType', type: 'string', description: '节点类型' },
    {
      name: 'strategies',
      type: 'ErrorRecoveryStrategy[]',
      required: true,
      description: '可选恢复策略列表',
    },
  ],
  emits: [{ name: 'select', description: '用户选择策略，载荷为 strategy value' }],
  slots: [],
}
