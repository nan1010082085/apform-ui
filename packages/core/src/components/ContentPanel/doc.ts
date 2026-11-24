/**
 * ContentPanel 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** ContentPanel 文档 */
export const ContentPanelDoc: ComponentDoc = {
  name: 'ContentPanel',
  titleZh: '内容面板',
  description:
    '白底内容面板。与 el-container 无强制关系；在 PageShell 内作为主内容卡片使用。',
  props: [
    { name: 'title', type: 'string', description: '面板标题' },
    { name: 'flush', type: 'boolean', default: 'false', description: '去除 body 内边距' },
    { name: 'fill', type: 'boolean', default: 'false', description: '在父级 flex 中撑满剩余高度' },
  ],
  slots: [
    { name: 'default', description: '面板主体（表格、表单等）' },
    { name: 'extra', description: '标题行右侧操作' },
  ],
}
