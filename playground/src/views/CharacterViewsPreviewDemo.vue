<script setup lang="ts">
/**
 * CharacterViewsPreview / NodeResultPreview(character-views) demo
 */
import { computed, ref } from 'vue'
import {
  CharacterViewsPreview,
  NodeResultPreview,
  resolveResultBlocks,
  type ArtifactItem,
  type CharacterViewGroup,
} from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'
import { demoPlaceholderSvg } from '../utils/demoPlaceholder'

const groups = ref<CharacterViewGroup[]>([
  {
    name: '黑衣剑客',
    artifacts: [
      {
        id: 'm-front',
        kind: 'image',
        url: demoPlaceholderSvg('正 · 黑衣', 200, 200),
        label: '正',
        source: 'views.front',
      },
      {
        id: 'm-side',
        kind: 'image',
        url: demoPlaceholderSvg('侧 · 黑衣', 200, 200, 'muted'),
        label: '侧',
        source: 'views.side',
      },
      {
        id: 'm-back',
        kind: 'image',
        url: demoPlaceholderSvg('背 · 黑衣', 200, 200, 'success'),
        label: '背',
        source: 'views.back',
      },
    ],
  },
  {
    name: '白衣双刀',
    artifacts: [
      {
        id: 'f-front',
        kind: 'image',
        url: demoPlaceholderSvg('正 · 白衣', 200, 200),
        label: '正',
        source: 'views.front',
      },
      {
        id: 'f-side',
        kind: 'image',
        url: demoPlaceholderSvg('侧 · 白衣', 200, 200, 'muted'),
        label: '侧',
        source: 'views.side',
      },
      {
        id: 'f-back',
        kind: 'image',
        url: demoPlaceholderSvg('背 · 白衣', 200, 200, 'success'),
        label: '背',
        source: 'views.back',
      },
    ],
  },
])

/** 模拟 character-three-views 节点输出 */
const threeViewPayload = computed(() => ({
  characters: [
    {
      name: '黑衣剑客',
      views: {
        front: demoPlaceholderSvg('正 · 黑衣', 200, 200),
        side: demoPlaceholderSvg('侧 · 黑衣', 200, 200, 'muted'),
        back: demoPlaceholderSvg('背 · 黑衣', 200, 200, 'success'),
      },
    },
    {
      name: '白衣双刀',
      views: {
        front: demoPlaceholderSvg('正 · 白衣', 200, 200),
        side: demoPlaceholderSvg('侧 · 白衣', 200, 200, 'muted'),
        back: demoPlaceholderSvg('背 · 白衣', 200, 200, 'success'),
      },
    },
  ],
  imageUrls: [
    demoPlaceholderSvg('正 · 黑衣', 200, 200),
    demoPlaceholderSvg('侧 · 黑衣', 200, 200, 'muted'),
    demoPlaceholderSvg('背 · 黑衣', 200, 200, 'success'),
    demoPlaceholderSvg('正 · 白衣', 200, 200),
    demoPlaceholderSvg('侧 · 白衣', 200, 200, 'muted'),
    demoPlaceholderSvg('背 · 白衣', 200, 200, 'success'),
  ],
  characterCount: 2,
}))

const resolvedKinds = computed(() =>
  resolveResultBlocks(threeViewPayload.value, { role: 'output', audience: 'user' }).map(
    (b) => b.kind,
  ),
)

const lastPreview = ref('')

/**
 * @param item 点击的产物
 */
function onPreview(item: ArtifactItem) {
  lastPreview.value = `${item.kind}:${item.label || item.id}`
}

const sourceDirect = `<CharacterViewsPreview :groups="groups" title="角色三视图" />`

const sourceViaPreview = `<NodeResultPreview
  :data="threeViewPayload"
  role="output"
  audience="user"
/>
// resolveResultBlocks → kind: character-views（不再拍平 media）`
</script>

<template>
  <div>
    <DemoBlock
      title="直接使用 CharacterViewsPreview"
      description="每人一行角色名 + 正 / 侧 / 背缩略图。"
      :source="sourceDirect"
    >
      <p v-if="lastPreview" class="hint">最近 preview：{{ lastPreview }}</p>
      <CharacterViewsPreview
        :groups="groups"
        title="角色三视图"
        @preview="onPreview"
      />
    </DemoBlock>

    <DemoBlock
      title="经 NodeResultPreview（character-views）"
      description="传入 characters[].views 结构时，解析为 character-views 块，不进扁平 ArtifactGallery。"
      :source="sourceViaPreview"
    >
      <p class="hint">解析块 kinds：{{ resolvedKinds.join(' · ') || '—' }}</p>
      <NodeResultPreview
        :data="threeViewPayload"
        role="output"
        audience="user"
        @preview="onPreview"
      />
    </DemoBlock>
  </div>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
</style>
