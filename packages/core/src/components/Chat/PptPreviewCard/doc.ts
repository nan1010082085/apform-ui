import type { ComponentDoc } from '../../../docs/types'

/** PptPreviewCard 文档 */
export const PptPreviewCardDoc: ComponentDoc = {
  name: 'PptPreviewCard',
  description: 'PPT 生成预览卡：幻灯片缩略、元数据与下载',
  props: [
    { name: 'slides', type: 'PptSlide[]', description: '幻灯片列表' },
    { name: 'metadata', type: 'PptMetadata', description: 'PPT 元数据' },
    { name: 'loading', type: 'boolean', description: '是否加载中' },
    { name: 'error', type: 'string', description: '错误信息' },
    { name: 'blob', type: 'Blob', description: '可直接下载的 Blob' },
  ],
  emits: [{ name: 'download', description: '无 blob 时请求外部下载' }],
  slots: [],
}
