/** AssistantPicker 可选智能体项 */
export interface AssistantPickerItem {
  id: string
  name: string
  description?: string
  icon?: string
  supportedInputs?: string[]
  hitlCapable?: boolean
}
