<script setup lang="ts">
/**
 * ContentPanel 内容面板文档示例
 */
import { ContentPanel } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const fillSource = `<template>
  <ContentPanel title="面板标题" fill>
    <p>面板正文区域</p>
    <template #extra>
      <el-button size="small">导出</el-button>
    </template>
  </ContentPanel>
</template>`

const flushSource = `<template>
  <ContentPanel title="表格面板" flush>
    <el-table :data="rows" />
  </ContentPanel>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="fill 填充模式"
      description="带标题的白底面板，fill 时占满父容器高度。"
      :source="fillSource"
    >
      <div class="frame">
        <ContentPanel title="面板标题" fill>
          <p>这是面板正文区域，可放置表格、表单或任意内容。</p>
          <el-table
            :data="[{ name: '示例 A' }, { name: '示例 B' }]"
            style="width: 100%; margin-top: 12px"
          >
            <el-table-column prop="name" label="名称" />
          </el-table>
          <template #extra>
            <el-button size="small">导出</el-button>
          </template>
        </ContentPanel>
      </div>
    </DemoBlock>

    <DemoBlock
      title="flush 无内边距"
      description="flush 去除内边距，适合表格等贴边内容。"
      :source="flushSource"
    >
      <ContentPanel title="表格面板" flush>
        <el-table :data="[{ id: 1, val: '数据' }]" style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="val" label="值" />
        </el-table>
      </ContentPanel>
    </DemoBlock>
  </div>
</template>

<style scoped>
.frame {
  height: 360px;
  display: flex;
  flex-direction: column;
}
</style>
