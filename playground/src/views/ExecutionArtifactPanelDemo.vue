<script setup lang="ts">
/**
 * ExecutionArtifactPanel 文档示例
 */
import { ref } from 'vue'
import { ExecutionArtifactPanel, type ArtifactGroup, type ArtifactItem } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'
import { demoPlaceholderSvg } from '../utils/demoPlaceholder'

const groups = ref<ArtifactGroup[]>([
  {
    key: 'n1',
    label: '分镜生成',
    items: [
      {
        id: '1',
        kind: 'image',
        url: demoPlaceholderSvg('镜头 1', 320, 180),
        label: '镜头 1',
      },
      {
        id: '2',
        kind: 'text',
        text: '角色走进雨夜街巷，霓虹在积水中倒影。',
        label: '旁白',
      },
    ],
  },
  {
    key: 'n2',
    label: '视频合成',
    items: [
      {
        id: '3',
        kind: 'video',
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        label: '成片',
      },
      {
        id: '4',
        kind: 'json',
        text: JSON.stringify({ scenes: 3, durationSec: 12 }, null, 2),
        label: '元数据',
      },
    ],
  },
])

const lastPreview = ref<ArtifactItem | null>(null)

const basicSource = `<template>
  <ExecutionArtifactPanel
    :groups="groups"
    title="产物"
    @preview="onPreview"
  />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="按节点分组展示执行产物：图片、文本、视频、JSON。"
      :source="basicSource"
    >
      <div style="max-width: 720px">
        <ExecutionArtifactPanel
          :groups="groups"
          title="产物"
          @preview="lastPreview = $event"
        />
        <p v-if="lastPreview" style="margin-top: 12px; font-size: 12px; color: #909399">
          preview: {{ lastPreview.id }} / {{ lastPreview.kind }}
        </p>
      </div>
    </DemoBlock>
  </div>
</template>
