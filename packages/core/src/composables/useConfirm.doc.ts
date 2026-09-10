/**
 * useConfirm 文档元数据
 */
import type { ComponentDoc } from '../docs/types'

/** useConfirm 文档 */
export const useConfirmDoc: ComponentDoc = {
  name: 'useConfirm',
  titleZh: '确认弹框',
  kind: 'composable',
  description: '封装 ElMessageBox.confirm，返回 true/false。',
  params: [],
  returns: [
    { name: 'confirm', type: '(message, options?) => Promise<boolean>', description: '通用确认；options: title/type/按钮文案' },
    { name: 'confirmDelete', type: '(target, options?) => Promise<boolean>', description: '删除确认文案模板' },
    { name: 'confirmDanger', type: '(message, options?) => Promise<boolean>', description: '危险操作确认' },
  ],
}
