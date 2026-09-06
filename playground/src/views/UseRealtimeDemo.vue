<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../components/DemoBlock.vue'

const note = ref(
  'useRealtime 需要真实 WebSocket。在 vigil 中：\nconst { status, on } = useRealtime({ url, projectId })\non("event:new", (data) => logs.unshift(data))',
)
</script>

<template>
  <DemoBlock title="useRealtime" description="WebSocket 连接管理（同 URL 复用）">
    <pre style="white-space: pre-wrap; font-size: 13px; line-height: 1.6">{{ note }}</pre>
  </DemoBlock>
</template>
