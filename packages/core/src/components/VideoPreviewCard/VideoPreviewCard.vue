<script setup lang="ts">
/**
 * VideoPreviewCard — 视频预览播放器
 */
withDefaults(
  defineProps<{
    url: string
    size?: 'compact' | 'default'
  }>(),
  { size: 'default' },
)
</script>

<template>
  <video
    class="apf-video-preview"
    :class="`apf-video-preview--${size}`"
    :src="url"
    controls
    preload="metadata"
    @click.stop
  />
</template>

<style scoped>
.apf-video-preview {
  width: 100%;
  max-width: 420px;
  max-height: 240px;
  border-radius: 8px;
  background: #111;
}

.apf-video-preview--compact {
  max-width: 160px;
  max-height: 90px;
  border-radius: 4px;
}
</style>
