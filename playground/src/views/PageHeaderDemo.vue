<script setup lang="ts">
/**
 * PageHeader 页面标题栏文档示例
 */
import { PageHeader } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <PageHeader title="用户管理" subtitle="管理系统用户与角色权限">
    <template #actions>
      <el-button>导出</el-button>
      <el-button type="primary">新建用户</el-button>
    </template>
  </PageHeader>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="统一的路由页标题栏：标题 + 副标题 + 右侧操作区。"
      :source="basicSource"
    >
      <div class="frame">
        <PageHeader title="用户管理" subtitle="管理系统用户与角色权限">
          <template #actions>
            <el-button>导出</el-button>
            <el-button type="primary">新建用户</el-button>
          </template>
        </PageHeader>
        <p class="meta">下方为页面正文区域占位。</p>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.frame {
  background: #f5f7fa;
  padding: 0 24px 16px;
  border-radius: 4px;
}
.meta {
  margin: 12px 0 0;
  font-size: 13px;
  color: #909399;
}
</style>
