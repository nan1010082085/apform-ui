<script setup lang="ts">
/**
 * ContentPanel — 白底内容面板 Demo
 */
import { ContentPanel } from '@apform-ui/core'
</script>

<template>
  <div>
    <h2>ContentPanel 内容面板</h2>
    <p>带标题的白底面板，支持 flush / fill 模式。</p>

    <div class="demo-section" style="height: 480px; display: flex; flex-direction: column">
      <ContentPanel title="面板标题" fill>
        <p>这是面板正文区域，可放置表格、表单或任意内容。</p>
        <el-table :data="[{ name: '示例 A' }, { name: '示例 B' }]" style="width: 100%; margin-top: 12px">
          <el-table-column prop="name" label="名称" />
        </el-table>
        <template #extra>
          <el-button size="small">导出</el-button>
        </template>
      </ContentPanel>
    </div>

    <div class="demo-section">
      <div class="demo-title">flush 无内边距</div>
      <ContentPanel title="表格面板" flush>
        <el-table :data="[{ id: 1, val: '数据' }]" style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="val" label="值" />
        </el-table>
      </ContentPanel>
    </div>
  </div>
</template>
