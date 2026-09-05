<script setup lang="ts">
/**
 * MessageParts Markdown / 代码块渲染文档示例
 */
import { MessageParts } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const content = `这是一段 **Markdown** 内容：

- 列表项 A
- 列表项 B

\`\`\`json
{ "hello": "world" }
\`\`\`
`

const basicSource = `<template>
  <MessageParts :content="content" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="消息正文渲染（Markdown / 代码块）。"
      :source="basicSource"
    >
      <div class="panel">
        <MessageParts :content="content" />
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  max-width: 640px;
}
</style>
