<script setup lang="ts">
/**
 * FieldListCard 文档示例
 */
import { FieldListCard } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <FieldListCard
    title="用户注册表单"
    :fields="fields"
    primary-action="确认发布"
    secondary-action="修改"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="以列表形式预览表单字段，并提供确认/修改操作。"
      :source="basicSource"
    >
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
    </DemoBlock>
  </div>
</template>
