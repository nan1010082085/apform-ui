/**
 * useConfirm — 确认弹框 composable
 *
 * 包装 Element Plus ElMessageBox.confirm，提供统一的确认弹框 API。
 * 替代项目中直接使用 ElMessageBox.confirm 的方式。
 *
 * 真实用法（来自 editor 项目）：
 *   await ElMessageBox.confirm(message, t("confirm.title"), {
 *     confirmButtonText: t("confirm.ok"),
 *     cancelButtonText: t("confirm.cancel"),
 *     type: "warning",
 *   })
 *
 * 用法：
 *   const { confirm, confirmDelete, confirmDanger } = useConfirm()
 *   const ok = await confirm('确定要保存吗？')
 *   if (ok) { ... }
 */
import { ElMessageBox } from 'element-plus'

export interface ConfirmOptions {
  /** 标题（默认 '确认操作'） */
  title?: string
  /** 类型（默认 'warning'） */
  type?: 'info' | 'warning' | 'success'
  /** 确认按钮文案（默认 '确定'） */
  confirmButtonText?: string
  /** 取消按钮文案（默认 '取消'） */
  cancelButtonText?: string
}

export function useConfirm() {
  /**
   * 通用确认弹框
   * @returns true 表示确认，false 表示取消
   */
  async function confirm(message: string, options: ConfirmOptions = {}): Promise<boolean> {
    const {
      title = '确认操作',
    type = 'warning',
      confirmButtonText = '确定',
      cancelButtonText = '取消',
    } = options

    try {
      await ElMessageBox.confirm(message, title, {
        confirmButtonText,
        cancelButtonText,
        type,
      })
      return true
    } catch {
      return false
    }
  }

  /**
   * 删除确认（danger 类型，红色确认按钮）
   */
  async function confirmDelete(target: string, options: Omit<ConfirmOptions, 'type'> = {}): Promise<boolean> {
    return confirm(`此操作将永久删除${target}，是否继续？`, {
      title: '确认删除',
    type: 'warning', // Element Plus 不支持 'danger'，使用 'warning' 替代
      confirmButtonText: '确认删除',
      ...options,
    })
  }

  /**
   * 危险操作确认
   */
  async function confirmDanger(message: string, options: Omit<ConfirmOptions, 'type'> = {}): Promise<boolean> {
    return confirm(message, {
      title: '确认操作',
    type: 'warning', // Element Plus 不支持 'danger'，使用 'warning' 替代
      ...options,
    })
  }

  return {
    confirm,
    confirmDelete,
    confirmDanger,
  }
}