<script setup lang="ts">
/**
 * SchemaLitePreview — Schema 轻量预览表单
 */
import { ref } from 'vue'
import { SchemaLitePreview } from '@apform-ui/core'

const model = ref<Record<string, unknown>>({})
</script>

<template>
  <div class="wrap">
    <h2>SchemaLitePreview</h2>
    <p>根据字段配置渲染可编辑预览表单。</p>

    <div class="block">
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
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
  max-width: 480px;
}
.block {
  padding: 16px;
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
}
.dump {
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--text-color-muted, #909399);
}
h2 {
  margin: 0 0 4px;
}
p {
  margin: 0 0 16px;
  color: var(--text-color-secondary, #666);
  font-size: 13px;
}
</style>
