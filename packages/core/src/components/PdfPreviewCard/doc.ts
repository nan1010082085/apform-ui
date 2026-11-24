/**
 * PdfPreviewCard 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** PdfPreviewCard 文档 */
export const PdfPreviewCardDoc: ComponentDoc = {
  name: 'PdfPreviewCard',
  titleZh: 'PDF 预览卡',
  description:
    'PDF 预览：安装 optional peer pdfjs-dist 时启用 canvas 翻页/缩放，否则 iframe；可用 forceIframe 强制降级。',
  props: [
    { name: 'url', type: 'string', required: true, description: 'PDF 可访问 URL' },
    { name: 'title', type: 'string', default: "'PDF 预览'", description: 'iframe / canvas title' },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: '外部加载态（iframe 模式）',
    },
    {
      name: 'error',
      type: 'string | null',
      default: 'null',
      description: '外部错误文案（iframe 模式）',
    },
    {
      name: 'minHeight',
      type: 'string',
      default: "'320px'",
      description: '预览区最小高度',
    },
    {
      name: 'forceIframe',
      type: 'boolean',
      default: 'false',
      description: '强制禁用 pdfjs，仅用 iframe',
    },
    {
      name: 'httpHeaders',
      type: 'Record<string, string>',
      description: 'pdfjs getDocument 鉴权 headers',
    },
  ],
  slots: [
    {
      name: 'default',
      description: '无 pdfjs 且需要自定义占位时的降级内容',
    },
  ],
}
