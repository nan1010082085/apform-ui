/**
 * EditableArtifactCard 文档
 */
import type { ComponentDoc } from '../../../docs/types'

/** EditableArtifactCard 文档 */
export const EditableArtifactCardDoc: ComponentDoc = {
  name: 'EditableArtifactCard',
  description: '可编辑工件卡片（code/json/html），支持预览与回传。',
  props: [
    { name: 'content', type: 'string', required: true, description: '工件内容' },
    { name: 'artifactType', type: 'string', description: 'code | json | html' },
    { name: 'language', type: 'string', description: '语言标识' },
    { name: 'sendBackLabel', type: 'string', description: '回传按钮文案' },
    { name: 'hint', type: 'string', description: '底部提示' },
  ],
  emits: [
    { name: 'sendback', payload: 'content: string, language: string', description: '回传' },
    { name: 'copy', payload: 'content: string', description: '复制' },
  ],
  slots: [],
}
