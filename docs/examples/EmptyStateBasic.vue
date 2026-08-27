<script setup>
import { EmptyState } from '@schema-ui/core'
</script>

<template>
  <EmptyState
    icon="files"
    title="暂无数据"
    description="点击下方按钮创建第一个项目"
  >
    <el-button type="primary">创建项目</el-button>
  </EmptyState>
</template>
