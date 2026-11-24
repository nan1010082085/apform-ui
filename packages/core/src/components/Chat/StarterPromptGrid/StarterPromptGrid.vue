<script setup lang="ts">
/**
 * StarterPromptGrid — 空态快捷提示网格（纯 UI）
 */
import { AppIcon } from '../../AppIcon'

export interface StarterPromptItem {
  text: string
  icon?: string
  agent?: string
}

defineProps<{
  prompts: StarterPromptItem[]
}>()

const emit = defineEmits<{
  select: [prompt: StarterPromptItem]
}>()
</script>

<template>
  <div class="apf-starter-grid">
    <button
      v-for="(prompt, idx) in prompts"
      :key="idx"
      type="button"
      class="apf-starter-grid__card"
      @click="emit('select', prompt)"
    >
      <AppIcon v-if="prompt.icon" :name="prompt.icon" :size="16" class="apf-starter-grid__icon" />
      <span class="apf-starter-grid__text">{{ prompt.text }}</span>
    </button>
  </div>
</template>

<style scoped>
.apf-starter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  width: 100%;
  margin-top: 16px;
}

.apf-starter-grid__card {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 14px;
  border: 1px solid var(--apf-border-light, #ebedf3);
  border-radius: 10px;
  background: var(--apf-bg-surface, #fff);
  color: var(--apf-text-primary-primary, #333);
  text-align: left;
  cursor: pointer;
  font: inherit;
  transition: border-color 0.15s, background 0.15s;
}

.apf-starter-grid__card:hover {
  border-color: var(--apf-color-primary, #0060a2);
  background: var(--apf-color-primary-bg-light, #e8f4ff);
}

.apf-starter-grid__icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--apf-color-primary, #0060a2);
}

.apf-starter-grid__text {
  font-size: 13px;
  line-height: 1.4;
}
</style>
