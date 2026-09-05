<script setup lang="ts">
/**
 * FieldRow — 属性行 Demo
 */
import { FieldRow } from '@apform-ui/core'
</script>

<template>
  <div>
    <h2>FieldRow 属性行</h2>
    <p>label + 控件的标准属性行布局，支持 hint 与必填标记。</p>

    <div class="demo-section">
      <div class="demo-title">常见控件</div>
      <div class="demo-block" style="max-width: 420px">
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
    </div>
  </div>
</template>
