<script setup lang="ts">
/**
 * useChatScroll 聊天滚动文档示例
 */
import { ref } from 'vue'
import { useChatScroll } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const lines = ref(8)
const containerRef = ref<HTMLElement | null>(null)
const { scrollToBottom, isAtBottom, autoScrollEnabled } = useChatScroll({
  containerRef,
  autoScroll: true,
})

/**
 * 追加消息并滚动到底部
 */
function addLine() {
  lines.value += 1
  scrollToBottom(false)
}

const scrollSource = `<template>
  <div ref="containerRef" class="scroll-box">
    <div v-for="n in lines" :key="n">消息 #{{ n }}</div>
  </div>
  <el-button @click="addLine">追加消息</el-button>
</template>

<script setup lang="ts">
import { useChatScroll } from '@apform-ui/core'
const { scrollToBottom, isAtBottom } = useChatScroll({ containerRef, autoScroll: true })
<\/script>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="检测是否在底部、受控自动滚动，适用于聊天列表场景。"
      :source="scrollSource"
    >
      <div ref="containerRef" class="scroll-box">
        <div v-for="n in lines" :key="n" class="line">消息 #{{ n }}</div>
      </div>
      <div class="actions">
        <el-button @click="addLine">追加消息</el-button>
        <el-button @click="() => scrollToBottom(true)">滚到底</el-button>
        <span class="meta">在底部: {{ isAtBottom }} · 自动滚动: {{ autoScrollEnabled }}</span>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.scroll-box {
  height: 160px;
  overflow: auto;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 12px;
}
.line {
  padding: 8px 0;
  border-bottom: 1px solid #ebeef5;
}
.actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.meta {
  font-size: 13px;
  color: #606266;
}
</style>
