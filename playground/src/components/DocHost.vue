/**
 * 文档宿主：有元数据则套 DocPage，否则用兜底 doc 保证标题可见
 */
<script setup lang="ts">
import { computed, type Component } from 'vue'
import { componentDocs, type ComponentDoc } from '@apform-ui/core/docs'
import DocPage from './DocPage.vue'

const props = defineProps<{
  /** 组件导出名，对应 componentDocs 的 key */
  docName?: string
  /** 无正式元数据时的兜底文档 */
  fallbackDoc?: ComponentDoc
  /** Demo 视图组件 */
  demo: Component
}>()

const doc = computed(
  () =>
    (props.docName ? componentDocs[props.docName] : undefined) ??
    props.fallbackDoc,
)
</script>

<template>
  <DocPage v-if="doc" :doc="doc">
    <component :is="demo" />
  </DocPage>
  <component :is="demo" v-else />
</template>
