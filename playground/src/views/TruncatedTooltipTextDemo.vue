<script setup lang="ts">
/**
 * TruncatedTooltipText — 截断文本 Demo
 */
import { TruncatedTooltipText } from '@apform-ui/core'

const longText =
  '这是一段非常长的文本内容，在窄容器中会被截断显示省略号，悬停可查看完整内容。适用于表格列、属性标签等场景。'
</script>

<template>
  <div>
    <h2>TruncatedTooltipText 截断文本</h2>
    <p>超出宽度时 ellipsis，tooltip 展示完整文案。</p>

    <div class="demo-section">
      <div class="demo-title">固定宽度容器</div>
      <div class="demo-block" style="width: 200px">
        <TruncatedTooltipText :content="longText">
          {{ longText }}
        </TruncatedTooltipText>
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">多行 hint（pre-wrap）</div>
      <div class="demo-block" style="width: 160px">
        <TruncatedTooltipText
          content="字段名称&#10;用于在设计器画布中展示的标签文案"
        >
          字段名称
        </TruncatedTooltipText>
      </div>
    </div>
  </div>
</template>
