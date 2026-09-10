<script setup lang="ts">
import { FieldListCard } from '@apform-ui/core'
</script>
<template>
  <FieldListCard
    title="用户注册表单"
    :fields="[
      { name: '用户名', type: 'input', required: true },
      { name: '邮箱', type: 'email', required: true },
      { name: '备注', type: 'textarea' },
    ]"
    primary-action="确认发布"
    secondary-action="修改"
  />
</template>
