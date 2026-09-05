<script setup lang="ts">
/**
 * TableRowActions 表格操作列文档示例
 */
import { TableRowActions, type TableRowAction } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

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

const fewSource = `<template>
  <TableRowActions :actions="actions" />
</template>`

const collapseSource = `<template>
  <TableRowActions :actions="actions" :collapse-at="5" :visible-count="2" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="少量操作（全部展示）"
      description="操作项较少时全部平铺展示。"
      :source="fewSource"
    >
      <TableRowActions :actions="fewActions" />
    </DemoBlock>

    <DemoBlock
      title="折叠模式（≥5 项，展示 2 个 + 更多）"
      description="超出 collapse-at 阈值时自动折叠到「更多」菜单。"
      :source="collapseSource"
    >
      <TableRowActions :actions="manyActions" :collapse-at="5" :visible-count="2" />
    </DemoBlock>
  </div>
</template>
