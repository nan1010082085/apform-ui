<script setup lang="ts">
import { EmptyState } from '@apform-ui/core'
</script>

<template>
  <div>
    <h2>EmptyState 空状态</h2>
    <p>列表/页面无数据时的占位展示。</p>

    <div class="demo-section">
      <div class="demo-title">基础用法</div>
      <div class="demo-block">
        <EmptyState icon="files" title="暂无数据" description="点击下方按钮创建第一个项目">
          <el-button type="primary">创建项目</el-button>
        </EmptyState>
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">无操作按钮</div>
      <div class="demo-block">
        <EmptyState icon="document" title="搜索无结果" description="试试其他关键词" />
      </div>
    </div>
  </div>
</template>
