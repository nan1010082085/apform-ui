<script setup lang="ts">
/**
 * SectionToggle 可折叠属性分区文档示例
 */
import { ref } from 'vue'
import { SectionToggle, FieldRow } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const name = ref('Demo')
const desc = ref('')

const basicSource = `<template>
  <SectionToggle title="基础信息" :count="2">
    <FieldRow label="名称" required>
      <el-input v-model="name" />
    </FieldRow>
  </SectionToggle>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="点击标题折叠 / 展开分区内容，count 显示字段数量。"
      :source="basicSource"
    >
      <div class="panel">
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
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  max-width: 480px;
}
</style>
