<script setup lang="ts">
/**
 * CollapsibleStepCard 文档示例
 */
import { ref } from 'vue'
import { CollapsibleStepCard } from '@apform-ui/core'

const collapsed = ref(false)
</script>

<template>
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
