/**
 * useMessage — 消息提示 composable
 *
 * 包装 Element Plus ElMessage，提供统一的消息提示 API。
 * 替代项目中直接使用 ElMessage.success/error/warning/info 的方式。
 *
 * 真实用法（来自 editor 项目）：
 *   ElMessage.success(t("editor.property.configSaved"))
 *   ElMessage.error(t("editor.common.copyFailed"))
 *   ElMessage.warning(t("editor.templatePanelEditor.nameRequired"))
 *
 * 用法：
 *   const msg = useMessage()
 *   msg.success('保存成功')
 *   msg.error('请求失败')
 */
import { ElMessage } from 'element-plus'
import type { MessageOptions } from 'element-plus'

export interface MessageApi {
  success(message: string, options?: Partial<MessageOptions>): void
  error(message: string, options?: Partial<MessageOptions>): void
  warning(message: string, options?: Partial<MessageOptions>): void
  info(message: string, options?: Partial<MessageOptions>): void
}

export function useMessage(): MessageApi {
  return {
    success(message, options = {}) {
      ElMessage({ message, type: 'success', ...options })
    },
    error(message, options = {}) {
      ElMessage({ message, type: 'error', ...options })
    },
    warning(message, options = {}) {
      ElMessage({ message, type: 'warning', ...options })
    },
    info(message, options = {}) {
      ElMessage({ message, type: 'info', ...options })
    },
  }
}
