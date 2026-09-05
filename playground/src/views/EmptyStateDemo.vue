<script setup lang="ts">
import { EmptyState } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const actionSource = `<template>
  <EmptyState
    icon="files"
    title="暂无项目"
    description="创建第一个项目开始使用"
    action-text="新建项目"
    @action="onCreate"
  />
</template>`

const compactSource = `<template>
  <EmptyState
    icon="search"
    title="搜索无结果"
    description="试试调整筛选条件"
    compact
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="带操作按钮"
      description="icon 须为 AppIcon 已注册名称。"
      :source="actionSource"
    >
      <EmptyState
        icon="files"
        title="暂无项目"
        description="创建第一个项目开始使用"
        action-text="新建项目"
        @action="() => {}"
      />
    </DemoBlock>

    <DemoBlock title="紧凑模式" description="compact 适用于面板内小空态。" :source="compactSource">
      <EmptyState
        icon="search"
        title="搜索无结果"
        description="试试调整筛选条件"
        compact
      />
    </DemoBlock>

    <DemoBlock title="自定义内容" description="默认插槽可放自定义操作。">
      <EmptyState icon="document" title="文档为空">
        <el-button type="primary">上传文档</el-button>
        <el-button>从模板创建</el-button>
      </EmptyState>
    </DemoBlock>
  </div>
</template>
