/** PPT 幻灯片预览项 */
export interface PptSlide {
  index: number
  type: 'title' | 'content' | 'chart' | 'comparison' | 'summary'
  heading: string
  content?: string[]
  speakerNotes?: string
}

/** PPT 元数据 */
export interface PptMetadata {
  title: string
  template: string
  totalSlides: number
  style: string
}
