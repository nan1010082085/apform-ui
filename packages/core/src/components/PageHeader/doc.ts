/**
 * PageHeader 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** PageHeader 文档 */
export const PageHeaderDoc: ComponentDoc = {
  name: 'PageHeader',
  titleZh: '页头',
  description: '标题 + 副标题 + 右侧操作区。通常放在 PageShell 内、ContentPanel 之上。',
  props: [
    { name: 'title', type: 'string', required: true, description: '页面标题' },
    { name: 'subtitle', type: 'string', description: '副标题' },
  ],
  slots: [
    { name: 'default', description: '标题区额外内容（标题下方）' },
    { name: 'actions', description: '右侧主操作（推荐）' },
    { name: 'extra', description: '兼容旧名，等同 actions 旁附加区' },
  ],
}
