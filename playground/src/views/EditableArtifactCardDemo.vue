<script setup lang="ts">
/**
 * EditableArtifactCard 文档示例
 */
import { EditableArtifactCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const sample = `{\n  "name": "UserForm",\n  "fields": ["username", "email"]\n}`

const basicSource = `<template>
  <EditableArtifactCard
    :content="sample"
    artifact-type="json"
    language="json"
    @sendback="onSendback"
  />
</template>`

/**
 * @param content - 回传内容
 * @param language - 语言
 */
function onSendback(content: string, language: string) {
  // eslint-disable-next-line no-console
  console.log('sendback', language, content.slice(0, 80))
}
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="可编辑产物卡片：预览 JSON/代码并支持回传。"
      :source="basicSource"
    >
      <div class="demo">
        <EditableArtifactCard
          :content="sample"
          artifact-type="json"
          language="json"
          @sendback="onSendback"
        />
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.demo {
  max-width: 640px;
}
</style>
