<script setup lang="ts">
/**
 * MessageParts — Markdown / 代码块渲染
 */
import { MessageParts } from '@apform-ui/core'

const content = `这是一段 **Markdown** 内容：

- 列表项 A
- 列表项 B

\`\`\`json
{ "hello": "world" }
\`\`\`
`
</script>

<template>
  <div class="wrap">
    <h2>MessageParts</h2>
    <p>消息正文渲染（Markdown / 代码）。</p>
    <div class="block">
      <MessageParts :content="content" />
    </div>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
  max-width: 640px;
}
.block {
  padding: 16px;
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
}
h2 {
  margin: 0 0 4px;
}
p {
  margin: 0 0 16px;
  color: var(--text-color-secondary, #666);
  font-size: 13px;
}
</style>
