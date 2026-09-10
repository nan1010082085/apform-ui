<script setup lang="ts">
/**
 * MessageActionBar 文档示例
 */
import { ref } from 'vue'
import { MessageActionBar } from '@apform-ui/core'

const hovered = ref(true)
const feedback = ref<'positive' | 'negative' | null>(null)
</script>

<template>
  <div class="demo" @mouseenter="hovered = true" @mouseleave="hovered = true">
    <p>示例消息正文……</p>
    <MessageActionBar
      content="示例消息正文"
      :visible="hovered"
      :feedback="feedback"
      @feedback="(t) => (feedback = t)"
      @copy="() => undefined"
      @regenerate="() => undefined"
    />
  </div>
</template>

<style scoped>
.demo {
  max-width: 420px;
  padding: 12px;
  border: 1px solid var(--c-border, #ebedf3);
  border-radius: 8px;
}
</style>
