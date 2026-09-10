<script setup lang="ts">
/**
 * EditableArtifactCard 文档示例
 */
import { EditableArtifactCard } from '@apform-ui/core'

const sample = `{\n  "name": "UserForm",\n  "fields": ["username", "email"]\n}`

function onSendback(content: string, language: string) {
  // eslint-disable-next-line no-console
  console.log('sendback', language, content.slice(0, 80))
}
</script>

<template>
  <div class="demo">
    <EditableArtifactCard
      :content="sample"
      artifact-type="json"
      language="json"
      @sendback="onSendback"
    />
  </div>
</template>

<style scoped>
.demo {
  max-width: 640px;
}
</style>
