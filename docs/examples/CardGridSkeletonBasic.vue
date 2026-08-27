<script setup>
import { ref } from 'vue'
import { CardGridSkeleton } from '@apform-ui/core'

const showThumb = ref(true)
</script>

<template>
  <div>
    <el-switch v-model="showThumb" active-text="显示缩略图" inactive-text="隐藏缩略图" style="margin-bottom: 12px;" />
    <CardGridSkeleton :count="6" :show-thumb="showThumb" />
  </div>
</template>
