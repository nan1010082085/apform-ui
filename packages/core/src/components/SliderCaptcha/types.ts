/**
 * SliderCaptcha 相关类型
 */
export interface SliderCaptchaValue {
  captchaId: string
  captchaX: number
  verified: boolean
}

export interface CaptchaPayload {
  captchaId: string
  backgroundImage: string
  sliderImage: string
  sliderY: number
}
