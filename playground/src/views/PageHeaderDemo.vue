<script setup lang="ts">
/**
 * PageHeader — 页面标题栏 Demo
 */
import { PageHeader } from '@apform-ui/core'
</script>

<template>
  <div>
    <h2>PageHeader 页面标题</h2>
    <p>统一的路由页标题栏：标题 + 副标题 + 右侧操作区。</p>

    <div class="demo-section" style="height: 480px; background: var(--bg-color-page, #f5f7fa); padding: 0 24px">
      <PageHeader title="用户管理" subtitle="管理系统用户与角色权限">
        <template #actions>
          <el-button>导出</el-button>
          <el-button type="primary">新建用户</el-button>
        </template>
      </PageHeader>
      <p style="font-size: 13px; color: var(--text-color-secondary)">下方为页面正文区域占位。</p>
    </div>
  </div>
</template>
