<script setup lang="ts">
import { ref } from 'vue'
import { ImageGenerateCard } from '@apform-ui/core'

const loading = ref(false)
const imageUrl = ref('https://picsum.photos/seed/apform-ui/512/384')

function onRegenerate() {
  loading.value = true
  window.setTimeout(() => {
    imageUrl.value = `https://picsum.photos/seed/apform-${Date.now()}/512/384`
    loading.value = false
  }, 800)
}
</script>

<template>
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
</template>
