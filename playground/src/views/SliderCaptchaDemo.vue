<script setup lang="ts">
/**
 * SliderCaptcha 文档示例（mock fetchCaptcha）
 */
import { SliderCaptcha, type CaptchaPayload } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

/**
 * Demo 用 1x1 透明图，仅演示交互骨架
 */
async function fetchCaptcha(): Promise<CaptchaPayload> {
  const pixel =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  return {
    captchaId: 'demo-captcha',
    backgroundImage: pixel,
    sliderImage: pixel,
    sliderY: 40,
  }
}

const basicSource = `<SliderCaptcha :fetch-captcha="fetchCaptcha" v-model="value" />`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="必须注入 fetchCaptcha；本页使用 mock 图片演示拖动。"
      :source="basicSource"
    >
      <SliderCaptcha :fetch-captcha="fetchCaptcha" />
    </DemoBlock>
  </div>
</template>
