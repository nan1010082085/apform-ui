/**
 * SliderCaptcha 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** SliderCaptcha 文档 */
export const SliderCaptchaDoc: ComponentDoc = {
  name: 'SliderCaptcha',
  titleZh: '滑块验证码',
  description: '拼图滑块验证码（纯 UI）；必须注入 fetchCaptcha，不内置请求。',
  props: [
    { name: 'modelValue', type: 'SliderCaptchaValue', description: 'v-model：captchaId / captchaX / verified' },
    { name: 'fetchCaptcha', type: '() => Promise<CaptchaPayload>', required: true, description: '宿主注入的拉取逻辑' },
  ],
  emits: [
    { name: 'update:modelValue', payload: 'value: SliderCaptchaValue', description: '拖动/刷新时同步' },
  ],
}
