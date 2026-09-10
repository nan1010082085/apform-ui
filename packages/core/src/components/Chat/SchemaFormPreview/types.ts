/** Schema 表单预览字段（库内模型，不依赖业务 Widget） */
export type SchemaFormPreviewField = {
  id: string
  /** 控件类型：input|email|phone|password|textarea|select|checkbox|radio|switch|date-picker|datepicker|time-picker|timepicker|button|number|… */
  type: string
  label?: string
  placeholder?: string
  clearable?: boolean
  showPassword?: boolean
  maxlength?: number
  options?: Array<{ label: string; value: unknown }>
  buttonText?: string
  buttonType?: string
}
