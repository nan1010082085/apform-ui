<script setup lang="ts">
/**
 * ArtifactGallery 统一产物画廊 demo
 */
import { ref } from 'vue'
import {
  ArtifactGallery,
  NodeArtifactStrip,
  HitlArtifactPanel,
  type ArtifactItem,
} from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'
import { demoPlaceholderSvg } from '../utils/demoPlaceholder'

const items = ref<ArtifactItem[]>([
  {
    id: '1',
    kind: 'image',
    url: demoPlaceholderSvg('产物图', 200, 200),
    source: 'imageUrls',
  },
  {
    id: '2',
    kind: 'video',
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    source: 'videoUrl',
  },
  {
    id: '3',
    kind: 'json',
    text: JSON.stringify({ title: '短剧', shots: [{ id: 'S1', visual: '角色入场' }] }, null, 2),
    label: '分镜 JSON',
    source: 'text',
  },
  {
    id: '4',
    kind: 'text',
    text: '一段普通文本输出，用于非结构化 LLM 结果。',
    label: '文本输出',
    source: 'text',
  },
  {
    id: '5',
    kind: 'pdf',
    documentId: 'demo-doc',
    filename: 'brief.pdf',
    label: 'brief.pdf',
    source: 'documentIds',
  },
])

const lastPreview = ref('')

/**
 * @param item 点击的文件产物
 */
function onPreview(item: ArtifactItem) {
  lastPreview.value = `${item.kind}:${item.filename || item.label || item.id}`
}

const source = `<ArtifactGallery :items="items" @preview="onPreview" />
<NodeArtifactStrip :items="items" />
<HitlArtifactPanel :items="items" title="节点产物" />`
</script>

<template>
  <div>
    <DemoBlock
      title="统一产物画廊"
      description="图 / 视频 / JSON / 文本 / 文件；不含 audio、3D、PPT。文件点击由宿主开抽屉。"
      :source="source"
    >
      <p v-if="lastPreview" class="hint">最近 preview：{{ lastPreview }}</p>
      <HitlArtifactPanel :items="items" title="HITL / 详情" @preview="onPreview" />
      <h4 class="sub">画布节点条（compact）</h4>
      <NodeArtifactStrip :items="items" @preview="onPreview" />
    </DemoBlock>
  </div>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
.sub {
  margin: 16px 0 8px;
  font-size: 13px;
  font-weight: 600;
}
</style>
