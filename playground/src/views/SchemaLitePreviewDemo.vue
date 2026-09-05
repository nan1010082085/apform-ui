<script setup lang="ts">
/**
 * SchemaLitePreview Schema 轻量预览表单文档示例
 */
import { ref } from 'vue'
import { SchemaLitePreview } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const model = ref<Record<string, unknown>>({})

const basicSource = `<template>
  <SchemaLitePreview
    v-model="model"
    :fields="[
      { key: 'username', label: '用户名', type: 'input' },
      { key: 'role', label: '角色', type: 'select', options: [...] },
    ]"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="根据字段配置渲染可编辑预览表单。"
      :source="basicSource"
    >
      <div class="panel">
        <SchemaLitePreview
          v-model="model"
          :fields="[
            { key: 'username', label: '用户名', type: 'input', placeholder: '请输入' },
            {
              key: 'role',
              label: '角色',
              type: 'select',
              options: [
                { label: '管理员', value: 'admin' },
                { label: '成员', value: 'member' },
              ],
            },
            { key: 'active', label: '启用', type: 'switch' },
          ]"
        />
        <pre class="dump">{{ model }}</pre>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  max-width: 480px;
}
.dump {
  margin: 12px 0 0;
  font-size: 12px;
  color: #909399;
}
</style>
