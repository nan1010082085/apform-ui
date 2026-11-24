/**
 * SectionToggle 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** SectionToggle 文档 */
export const SectionToggleDoc: ComponentDoc = {
  name: 'SectionToggle',
  titleZh: '可折叠分区',
  description:
    '属性面板 / 侧栏分区标题条；支持非受控 defaultOpen 或受控 open，展开变化抛出 update:open / toggle。',
  props: [
    { name: 'title', type: 'string', required: true, description: '分区标题' },
    { name: 'count', type: 'number', description: '标题旁数量徽标' },
    {
      name: 'defaultOpen',
      type: 'boolean',
      default: 'true',
      description: '非受控初始展开',
    },
    {
      name: 'open',
      type: 'boolean',
      description: '受控展开；传入时优先于内部 state',
    },
  ],
  emits: [
    { name: 'update:open', payload: 'value: boolean', description: '展开状态变化（受控）' },
    { name: 'toggle', payload: 'value: boolean', description: '点击标题切换后' },
  ],
  slots: [{ name: 'default', description: '分区内容' }],
}
