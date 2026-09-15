<script setup lang="ts">
/**
 * CollapsibleStepCard 文档示例
 */
import { ref } from 'vue'
import { CollapsibleStepCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const collapsed = ref(false)

const basicSource = `<template>
  <CollapsibleStepCard
    v-model:collapsed="collapsed"
    title="调用工具"
    subtitle="schema__search"
    badge="表单专家"
    status-label="完成"
    tone="success"
  >
    <pre>{{ JSON.stringify(payload, null, 2) }}</pre>
  </CollapsibleStepCard>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="可折叠的步骤卡片，用于展示工具调用结果与状态。"
      :source="basicSource"
    >
      <div class="demo">
        <CollapsibleStepCard
          v-model:collapsed="collapsed"
          title="调用工具"
          subtitle="schema__search"
          badge="表单专家"
          status-label="完成"
          tone="success"
        >
          <pre class="json">{{ JSON.stringify({ query: '用户表单', total: 2 }, null, 2) }}</pre>
        </CollapsibleStepCard>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.demo {
  max-width: 560px;
}
.json {
  margin: 0;
  padding: 8px 10px;
  border-radius: 6px;
  background: var(--c-bg-muted, #f5f7fa);
  font-size: 12px;
}
</style>
