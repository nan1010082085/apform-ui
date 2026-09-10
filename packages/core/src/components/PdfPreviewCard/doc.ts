/**
 * PdfPreviewCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** PdfPreviewCard 文档 */
export const PdfPreviewCardDoc: ComponentDoc = {
  name: 'PdfPreviewCard',
  description: 'PdfPreviewCard 组件。',
  props: [
    { name: 'url', type: 'string', required: true, description: 'PDF URL' },
    { name: 'title', type: 'string', description: 'iframe / canvas title' },
    { name: 'loading', type: 'boolean', description: '外部加载态（iframe 模式）' },
    { name: 'error', type: 'string | null', description: '外部错误（iframe 模式）' },
    { name: 'minHeight', type: 'string', description: '预览区最小高度' },
    { name: 'forceIframe', type: 'boolean', description: '强制禁用 pdfjs，仅用 iframe' },
    { name: 'httpHeaders', type: 'Record<string, string>', description: 'pdfjs getDocument 鉴权 headers' },
  ],
  emits: [
  ],
  slots: [
    { name: 'default', description: 'default' },
  ],
}
