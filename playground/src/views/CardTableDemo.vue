<script setup lang="ts">
/**
 * CardTable 卡片式表格容器文档示例
 */
import { CardTable } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const rows = [
  { id: 1, name: '用户管理', status: 'online' },
  { id: 2, name: '流程设计', status: 'online' },
  { id: 3, name: '报表中心', status: 'offline' },
]

const defaultSource = `<template>
  <CardTable>
    <el-table :data="rows" stripe>
      <el-table-column prop="name" label="名称" />
    </el-table>
  </CardTable>
</template>`

const loadingSource = `<template>
  <CardTable :borderless="true" :loading="true" padding="16px">
    <el-table :data="rows" />
  </CardTable>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="默认样式"
      description="白底圆角容器，可包裹 el-table 或其它列表内容。"
      :source="defaultSource"
    >
      <CardTable>
        <el-table :data="rows" stripe style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="status" label="状态" width="120" />
        </el-table>
      </CardTable>
    </DemoBlock>

    <DemoBlock
      title="无边框 + 加载态"
      description="borderless 去除边框，loading 显示加载遮罩。"
      :source="loadingSource"
    >
      <CardTable :borderless="true" :loading="true" padding="16px">
        <el-table :data="rows" style="width: 100%">
          <el-table-column prop="name" label="名称" />
        </el-table>
      </CardTable>
    </DemoBlock>
  </div>
</template>
