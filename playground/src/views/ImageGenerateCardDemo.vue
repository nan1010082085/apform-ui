<script setup lang="ts">
/**
 * ImageGenerateCard 文档示例
 */
import { ref } from 'vue'
import { ImageGenerateCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'
import { demoPlaceholderSvg } from '../utils/demoPlaceholder'

const loading = ref(false)
const imageUrl = ref(demoPlaceholderSvg('生图示例', 512, 384))

const basicSource = `<template>
  <ImageGenerateCard
    :image-url="imageUrl"
    prompt="A calm coastal town at dusk, soft watercolor"
    model="seedream"
    size="1024x768"
    :loading="loading"
    @download="onDownload"
    @regenerate="onRegenerate"
  />
</template>`

/**
 * 演示重新生成
 */
function onRegenerate() {
  loading.value = true
  window.setTimeout(() => {
    imageUrl.value = demoPlaceholderSvg(`重新生成 ${new Date().toLocaleTimeString()}`, 512, 384)
    loading.value = false
  }, 800)
}
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="AI 生图结果卡片：展示图片、提示词与模型信息，支持下载与重新生成。"
      :source="basicSource"
    >
      <div class="demo">
        <ImageGenerateCard
          :image-url="imageUrl"
          prompt="A calm coastal town at dusk, soft watercolor"
          model="seedream"
          size="1024x768"
          :image-style="'natural'"
          quality="hd"
          :loading="loading"
          @download="console.log('download')"
          @regenerate="onRegenerate"
        />
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.demo {
  max-width: 480px;
}
</style>
