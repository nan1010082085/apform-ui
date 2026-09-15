<script setup lang="ts">
/**
 * RagContextPanel 文档示例 — 浮在 Composer 锚点上方（与真实用法一致）
 */
import { ref } from 'vue'
import { RagContextPanel, type RagContextItem } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const query = ref('')
const selected = ref<RagContextItem[]>([])
const results = ref<RagContextItem[]>([
  {
    id: '1',
    name: '用户注册表单',
    score: 88,
    description: '含手机号、邮箱与验证码字段',
    tags: ['input', 'select'],
  },
  {
    id: '2',
    name: '采购申请',
    score: 55,
    description: '物资采购审批表',
    tags: ['table', 'input', 'button'],
  },
])

/**
 * @param item - 选中项
 */
function onSelect(item: RagContextItem): void {
  if (!selected.value.some((s) => s.id === item.id)) {
    selected.value = [...selected.value, item]
  }
}

/**
 * @param id - 移除 id
 */
function onRemove(id: string): void {
  selected.value = selected.value.filter((s) => s.id !== id)
}

const basicSource = `<div class="composer-wrap" style="position: relative">
  <RagContextPanel
    v-model:query="query"
    :results="results"
    :selected="selected"
    @select="onSelect"
    @remove="onRemove"
  />
  <!-- 面板 position:absolute; bottom:100%，需锚定在输入区上方 -->
  <Composer />
</div>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="浮层锚定在模拟 Composer 上方（bottom: 100%），与对话输入区真实用法一致。"
      :source="basicSource"
    >
      <div class="rag-demo-stage">
        <RagContextPanel
          v-model:query="query"
          :results="results"
          :selected="selected"
          @select="onSelect"
          @remove="onRemove"
        />
        <div class="rag-demo-anchor" aria-hidden="true">模拟 Composer 输入区</div>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.rag-demo-stage {
  position: relative;
  height: 420px;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.rag-demo-anchor {
  padding: 12px 14px;
  border: 1px dashed var(--border-color, #dcdfe6);
  border-radius: 8px;
  background: var(--bg-color-page, #f5f7fa);
  color: var(--text-color-secondary, #909399);
  font-size: 13px;
}
</style>
