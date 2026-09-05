<script setup lang="ts">
/**
 * TruncatedTooltipText 截断文本文档示例
 */
import { TruncatedTooltipText } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const longText =
  '这是一段非常长的文本内容，在窄容器中会被截断显示省略号，悬停可查看完整内容。适用于表格列、属性标签等场景。'

const fixedSource = `<template>
  <div style="width: 200px">
    <TruncatedTooltipText :content="longText">{{ longText }}</TruncatedTooltipText>
  </div>
</template>`

const multilineSource = `<template>
  <TruncatedTooltipText content="字段名称&#10;用于在设计器画布中展示的标签文案">
    字段名称
  </TruncatedTooltipText>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="固定宽度容器"
      description="超出宽度时 ellipsis，tooltip 展示完整文案。"
      :source="fixedSource"
    >
      <div class="narrow">
        <TruncatedTooltipText :content="longText">
          {{ longText }}
        </TruncatedTooltipText>
      </div>
    </DemoBlock>

    <DemoBlock
      title="多行 hint（pre-wrap）"
      description="tooltip content 支持换行，适用于多行说明。"
      :source="multilineSource"
    >
      <div class="narrow-sm">
        <TruncatedTooltipText content="字段名称&#10;用于在设计器画布中展示的标签文案">
          字段名称
        </TruncatedTooltipText>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.narrow {
  width: 200px;
}
.narrow-sm {
  width: 160px;
}
</style>
