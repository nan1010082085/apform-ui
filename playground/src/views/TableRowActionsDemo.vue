<script setup lang="ts">
/**
 * TableRowActions — 表格操作列 Demo
 */
import { TableRowActions, type TableRowAction } from '@apform-ui/core'

const fewActions: TableRowAction[] = [
  { key: 'edit', label: '编辑', onClick: () => undefined },
  { key: 'view', label: '查看', onClick: () => undefined },
]

const manyActions: TableRowAction[] = [
  { key: 'edit', label: '编辑', onClick: () => undefined },
  { key: 'view', label: '查看', onClick: () => undefined },
  { key: 'copy', label: '复制', onClick: () => undefined },
  { key: 'archive', label: '归档', onClick: () => undefined },
  { key: 'delete', label: '删除', type: 'danger', onClick: () => undefined },
]
</script>

<template>
  <div>
    <h2>TableRowActions 行操作</h2>
    <p>表格操作列，超出数量自动折叠到「更多」。</p>

    <div class="demo-section">
      <div class="demo-title">少量操作（全部展示）</div>
      <div class="demo-block">
        <TableRowActions :actions="fewActions" />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">折叠模式（≥5 项，展示 2 个 + 更多）</div>
      <div class="demo-block">
        <TableRowActions :actions="manyActions" :collapse-at="5" :visible-count="2" />
      </div>
    </div>
  </div>
</template>
