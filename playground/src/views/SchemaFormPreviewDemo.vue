<script setup lang="ts">
/**
 * SchemaFormPreview 文档示例
 */
import { SchemaFormPreview } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <SchemaFormPreview
    title="入职申请表"
    :fields="fields"
    @primary-action="onPublish"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="根据字段配置渲染可交互的表单预览。"
      :source="basicSource"
    >
      <SchemaFormPreview
        title="入职申请表"
        :fields="[
          { id: '1', type: 'input', label: '姓名', placeholder: '请输入姓名', clearable: true },
          { id: '2', type: 'email', label: '邮箱', placeholder: '请输入邮箱' },
          { id: '3', type: 'select', label: '部门', placeholder: '请选择', options: [
            { label: '研发', value: 'rd' },
            { label: '产品', value: 'pm' },
          ] },
          { id: '4', type: 'radio', label: '用工类型', options: [
            { label: '全职', value: 'full' },
            { label: '实习', value: 'intern' },
          ] },
          { id: '5', type: 'date-picker', label: '入职日期', placeholder: '选择日期' },
          { id: '6', type: 'switch', label: '是否远程' },
          { id: '7', type: 'textarea', label: '备注', placeholder: '补充说明' },
        ]"
        @primary-action="console.log('publish')"
      />
    </DemoBlock>
  </div>
</template>
