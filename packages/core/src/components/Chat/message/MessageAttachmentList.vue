<script setup lang="ts">
import { computed } from 'vue'
import type { MessageAttachment } from '../../../types'
import { isImage, isPdf, isOffice, fileKind, formatSize } from '../../../utils/attachmentKind'

const props = defineProps<{ attachments: MessageAttachment[] }>()
const emit = defineEmits<{ (e: 'preview', attachment: MessageAttachment): void }>()

const images = computed(() => props.attachments.filter(isImage))
const files = computed(() => props.attachments.filter((a) => !isImage(a)))
</script>

<template>
  <div v-if="attachments?.length" class="apf-att-list">
    <div v-if="images.length" class="apf-image-grid" :class="{ 'apf-multi': images.length > 1 }">
      <button v-for="att in images" :key="att.id" type="button" class="apf-att-image" @click="emit('preview', att)">
        <img :src="att.url" :alt="att.filename" loading="lazy" />
      </button>
    </div>
    <button v-for="att in files" :key="att.id" type="button" class="apf-att-file" @click="emit('preview', att)">
      <span class="apf-att-badge">{{ fileKind(att) }}</span>
      <span class="apf-att-meta">
        <strong>{{ att.filename }}</strong>
        <small>
          <template v-if="att.size">{{ formatSize(att.size) }}</template>
          <template v-if="isPdf(att)"> · 点击预览</template>
          <template v-else-if="isOffice(att)"> · 点击查看</template>
          <template v-else> · 点击打开</template>
        </small>
      </span>
    </button>
  </div>
</template>

<style scoped>
.apf-att-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 8px; }
.apf-image-grid { display: grid; gap: 8px; grid-template-columns: minmax(0, 1fr); }
.apf-image-grid.apf-multi { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.apf-att-image {
  display: block; width: 100%; padding: 0; border: 1px solid var(--c-border);
  border-radius: var(--radius); overflow: hidden; background: #f7fafa; cursor: zoom-in;
}
.apf-att-image img { display: block; width: 100%; max-height: 240px; object-fit: cover; background: #fff; }
.apf-att-file {
  display: flex; gap: 10px; align-items: flex-start; width: 100%; padding: 10px 12px;
  border: 1px solid var(--c-border); border-radius: var(--radius); background: #f7fafa;
  text-align: left; color: inherit; cursor: pointer; font: inherit;
}
.apf-att-file:hover { border-color: var(--c-primary); }
.apf-att-badge {
  flex: none; min-width: 40px; height: 28px; padding: 0 8px; display: grid; place-items: center;
  border-radius: 6px; background: var(--c-primary-soft); color: var(--c-primary);
  font-size: 11px; font-weight: 700; letter-spacing: 0.02em;
}
.apf-att-meta { min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 2px; }
.apf-att-meta strong { font-size: 13px; font-weight: 650; word-break: break-all; }
.apf-att-meta small { font-size: 11px; color: var(--c-text-muted); }
</style>
