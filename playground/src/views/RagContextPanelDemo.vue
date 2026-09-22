<script setup lang="ts">
/**
 * RagContextPanel 文档示例 — 浮在 Composer 锚点上方（与真实用法一致）
 *
 * 面板为 position:absolute; bottom:100%，定位参照最近的 position:relative 祖先。
 * 必须把「面板 + 输入区」包在同一个相对定位容器里；不要把 relative 设在整块高舞台上，
 * 否则 bottom:100% 会贴到舞台顶边并被裁切。
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

const basicSource = `<div class="composer-dock" style="position: relative">
  <RagContextPanel
    v-model:query="query"
    :results="results"
    :selected="selected"
    @select="onSelect"
    @remove="onRemove"
  />
  <Composer />
</div>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="浮层 absolute + bottom:100%，须与输入区同处一个 position:relative 容器；上方留白给面板展开。"
      :source="basicSource"
    >
      <div class="rag-demo-stage">
        <div class="rag-demo-dock">
          <RagContextPanel
            v-model:query="query"
            :results="results"
            :selected="selected"
            @select="onSelect"
            @remove="onRemove"
          />
          <div class="rag-demo-anchor" aria-hidden="true">模拟 Composer 输入区</div>
        </div>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
/** 仅提供上方可视空间；不要设 position，避免成为浮层定位参照 */
.rag-demo-stage {
  height: 420px;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/** 面板 + 输入区同一相对定位祖先，bottom:100% 才落在 Composer 正上方 */
.rag-demo-dock {
  position: relative;
  width: 100%;
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
