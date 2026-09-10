/**
 * PropertyPanel 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** PropertyPanel 文档 */
export const PropertyPanelDoc: ComponentDoc = {
  name: 'PropertyPanel',
  description: 'Schema 驱动属性配置壳：分区 + 字段，无业务 store 耦合。',
  props: [
    { name: 'sections', type: 'PropertySection[]', required: true, description: '分区与字段声明' },
    { name: 'fetchRemoteOptions', type: 'FetchRemoteOptionsFn', description: 'remote-select 拉取' },
    { name: 'emptyText', type: 'string', description: '空态文案' },
    { name: 'values', type: 'Record<string, unknown>', description: '传入后按 visibleOn 自动过滤' },
  ],
  emits: [
    { name: 'update', description: '{ sectionKey, key, value }' },
  ],
  slots: [
    { name: 'field-${type}', description: '自定义字段类型插槽' },
  ],
}
