<script setup lang="ts">
/**
 * EmptyState — 空状态 Demo
 */
import { EmptyState } from '@apform-ui/core'
</script>

<template>
  <div>
    <h2>EmptyState 空状态</h2>
    <p>列表或页面无数据时的占位展示。</p>

    <div class="demo-section">
      <div class="demo-title">带操作按钮</div>
      <div class="demo-block">
        <EmptyState
          icon="files"
          title="暂无项目"
          description="创建第一个项目开始使用"
          action-text="新建项目"
          @action="() => {}"
        />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">紧凑模式</div>
      <div class="demo-block">
        <EmptyState
          icon="search"
          title="搜索无结果"
          description="试试调整筛选条件"
          compact
        />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">自定义 slot</div>
      <div class="demo-block">
        <EmptyState icon="document" title="文档为空">
          <el-button type="primary">上传文档</el-button>
          <el-button>从模板创建</el-button>
        </EmptyState>
      </div>
    </div>
  </div>
</template>
