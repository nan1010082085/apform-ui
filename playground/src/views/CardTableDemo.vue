<script setup lang="ts">
/**
 * CardTable — 卡片式表格容器 Demo
 */
import { CardTable } from '@apform-ui/core'

const rows = [
  { id: 1, name: '用户管理', status: 'online' },
  { id: 2, name: '流程设计', status: 'online' },
  { id: 3, name: '报表中心', status: 'offline' },
]
</script>

<template>
  <div>
    <h2>CardTable 卡片表格</h2>
    <p>白底圆角容器，可包裹 el-table 或其它列表内容。</p>

    <div class="demo-section">
      <div class="demo-title">默认样式</div>
      <div class="demo-block">
        <CardTable>
          <el-table :data="rows" stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="status" label="状态" width="120" />
          </el-table>
        </CardTable>
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">无边框 + 加载态</div>
      <div class="demo-block">
        <CardTable :borderless="true" :loading="true" padding="16px">
          <el-table :data="rows" style="width: 100%">
            <el-table-column prop="name" label="名称" />
          </el-table>
        </CardTable>
      </div>
    </div>
  </div>
</template>
