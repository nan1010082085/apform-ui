import type { ComponentDoc } from '../../../docs/types'

/** VariableDiffCard 文档 */
export const VariableDiffCardDoc: ComponentDoc = {
  name: 'VariableDiffCard',
  description: '工作流变量变更 diff 卡：新增 / 更新 / 删除对照展示',
  props: [
    { name: 'nodeName', type: 'string', description: '关联节点名称' },
    {
      name: 'changes',
      type: 'VariableDiffChange[]',
      required: true,
      description: '变量变更列表',
    },
  ],
  emits: [],
  slots: [],
}
