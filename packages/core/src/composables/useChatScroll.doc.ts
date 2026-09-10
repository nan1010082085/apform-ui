/**
 * useChatScroll 文档元数据
 */
import type { ComponentDoc } from '../docs/types'

/** useChatScroll 文档 */
export const useChatScrollDoc: ComponentDoc = {
  name: 'useChatScroll',
  titleZh: '聊天滚动',
  kind: 'composable',
  description: '消息列表自动滚底与「是否在底部」检测。',
  params: [
    { name: 'options.containerRef', type: 'Ref<HTMLElement | null>', required: true, description: '滚动容器 ref' },
    { name: 'options.autoScroll', type: 'boolean', default: 'true', description: '新消息时是否自动滚底' },
    { name: 'options.behavior', type: 'ScrollBehavior', default: "'smooth'", description: '滚动行为' },
    { name: 'options.offset', type: 'number', default: '50', description: '判定「在底部」的像素容差' },
  ],
  returns: [
    { name: 'scrollToBottom', type: '(force?: boolean) => Promise<void>', description: '滚到底部；force 忽略开关' },
    { name: 'scrollTo', type: '(position: number) => void', description: '滚到指定位置' },
    { name: 'isAtBottom', type: 'Ref<boolean>', description: '是否在底部附近' },
    { name: 'autoScrollEnabled', type: 'Ref<boolean>', description: '自动滚底开关' },
    { name: 'checkIfAtBottom', type: '() => boolean', description: '立即检测是否在底部' },
    { name: 'enableAutoScroll', type: '() => void', description: '启用自动滚底' },
    { name: 'disableAutoScroll', type: '() => void', description: '禁用自动滚底' },
  ],
}
