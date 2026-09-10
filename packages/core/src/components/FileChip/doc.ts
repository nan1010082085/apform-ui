/**
 * FileChip 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** FileChip 文档 */
export const FileChipDoc: ComponentDoc = {
  name: 'FileChip',
  titleZh: '文件 Chip',
  description: 'pdf / office / 通用文件 chip，点击抛出 preview 事件。',
  props: [
    { name: 'item', type: 'ArtifactItem', required: true, description: '产物项' },
  ],
  emits: [{ name: 'preview', payload: 'ArtifactItem', description: '点击预览' }],
  slots: [],
}
