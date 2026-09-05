<script setup lang="ts">
/**
 * FieldRow 属性行文档示例
 */
import { FieldRow } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <FieldRow label="组件名称" required hint="在设计器中显示的名称">
    <el-input model-value="文本输入框" />
  </FieldRow>
  <FieldRow label="是否必填">
    <el-switch :model-value="true" />
  </FieldRow>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="常见控件"
      description="label + 控件的标准属性行布局，支持 hint 与必填标记。"
      :source="basicSource"
    >
      <div class="panel">
        <FieldRow label="组件名称" required hint="在设计器中显示的名称">
          <el-input model-value="文本输入框" />
        </FieldRow>
        <FieldRow label="占位符">
          <el-input model-value="请输入内容" />
        </FieldRow>
        <FieldRow label="是否必填">
          <el-switch :model-value="true" />
        </FieldRow>
        <FieldRow label="说明文案" textarea>
          <el-input type="textarea" :rows="3" model-value="这是一段较长的说明文字。" />
        </FieldRow>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  max-width: 420px;
}
</style>
