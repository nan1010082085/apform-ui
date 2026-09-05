<script setup lang="ts">
/**
 * SectionToggle — 可折叠属性分区
 */
import { ref } from 'vue'
import { SectionToggle, FieldRow } from '@apform-ui/core'

const name = ref('Demo')
const desc = ref('')
</script>

<template>
  <div class="wrap">
    <h2>SectionToggle</h2>
    <p>点击标题折叠 / 展开分区内容。</p>

    <div class="block">
      <SectionToggle title="基础信息" :count="2">
        <FieldRow label="名称" required>
          <el-input v-model="name" />
        </FieldRow>
        <FieldRow label="描述" textarea>
          <el-input v-model="desc" type="textarea" :rows="2" />
        </FieldRow>
      </SectionToggle>
      <SectionToggle title="高级设置" :count="0" :default-open="false">
        <FieldRow label="超时">
          <el-input-number :model-value="30" />
        </FieldRow>
      </SectionToggle>
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
h2 {
  margin: 0 0 4px;
}
p {
  margin: 0 0 16px;
  color: var(--text-color-secondary, #666);
  font-size: 13px;
}
</style>
