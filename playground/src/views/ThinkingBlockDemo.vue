<script setup lang="ts">
/**
 * ThinkingBlock 文档示例
 */
import { ThinkingBlock } from '@apform-ui/core'

const sample = `先梳理用户意图：需要生成带校验的注册表单。

1. 字段：用户名、邮箱、密码
2. 校验：必填 + 邮箱格式
3. 提交后进入审核流`
</script>

<template>
  <div class="demo">
    <ThinkingBlock :content="sample" badge="表单专家" />
  </div>
</template>

<style scoped>
.demo {
  max-width: 560px;
}
</style>
