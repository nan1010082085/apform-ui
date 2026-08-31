<template>
  <div class="demo-section">
    <h2>useChatScroll</h2>
    <p>聊天列表滚动：检测是否在底部、受控自动滚动。</p>
    <div ref="containerRef" class="scroll-box">
      <div v-for="n in lines" :key="n" class="line">消息 #{{ n }}</div>
    </div>
    <div class="actions">
      <button type="button" @click="addLine">追加消息</button>
      <button type="button" @click="() => scrollToBottom(true)">滚到底</button>
      <span>在底部: {{ isAtBottom }} · 自动滚动: {{ autoScrollEnabled }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useChatScroll } from '@apform-ui/core'

const lines = ref(8)
const containerRef = ref<HTMLElement | null>(null)
const { scrollToBottom, isAtBottom, autoScrollEnabled } = useChatScroll({
  containerRef,
  autoScroll: true,
})

function addLine() {
  lines.value += 1
  scrollToBottom(false)
}
</script>

<style scoped>
.demo-section { padding: 8px; }
.scroll-box {
  height: 160px;
  overflow: auto;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 12px;
}
.line { padding: 8px 0; border-bottom: 1px solid #ebeef5; }
.actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
button { padding: 6px 12px; }
</style>
