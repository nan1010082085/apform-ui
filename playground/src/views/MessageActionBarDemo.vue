<script setup lang="ts">
/**
 * MessageActionBar 文档示例
 */
import { ref } from 'vue'
import { MessageActionBar } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const hovered = ref(true)
const feedback = ref<'positive' | 'negative' | null>(null)

const basicSource = `<template>
  <MessageActionBar
    content="示例消息正文"
    :visible="hovered"
    :feedback="feedback"
    @feedback="onFeedback"
    @copy="onCopy"
    @regenerate="onRegenerate"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="消息操作栏：复制、重新生成与正负反馈。"
      :source="basicSource"
    >
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
    </DemoBlock>
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
