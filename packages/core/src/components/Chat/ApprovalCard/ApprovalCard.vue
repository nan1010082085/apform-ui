<script setup lang="ts">
import { ref } from 'vue'
import type { WaitingPayload } from '../../../types'

defineProps<{ waiting: WaitingPayload | null; disabled: boolean }>()
const emit = defineEmits<{ (e: 'resume', action: string, payload?: string): void }>()

const inputValue = ref('')

function submit(action: string) {
  emit('resume', action, inputValue.value || undefined)
  inputValue.value = ''
}
</script>

<template>
  <div v-if="waiting" class="apf-approval-card" :class="{ 'apf-dangerous': waiting.dangerous }">
    <div class="apf-header">
      <span class="apf-title">需要你的操作</span>
      <span v-if="waiting.dangerous" class="apf-danger-tag">危险操作</span>
    </div>
    <p class="apf-prompt">{{ waiting.prompt }}</p>
    <div v-for="f in waiting.fields" :key="f.key" class="apf-field">
      <label>{{ f.label }}</label>
      <textarea v-if="f.type === 'textarea'" v-model="inputValue" :placeholder="'请输入' + f.label" rows="2"></textarea>
      <select v-else-if="f.type === 'select' && f.options.length" v-model="inputValue">
        <option v-for="o in f.options" :key="o" :value="o">{{ o }}</option>
      </select>
      <input v-else v-model="inputValue" :placeholder="'请输入' + f.label" />
    </div>
    <div class="apf-actions">
      <button
        v-for="a in waiting.actions" :key="a.action"
        class="apf-btn" :class="a.style === 'danger' ? 'apf-btn-danger' : 'apf-btn-primary'"
        :disabled="disabled" @click="submit(a.action)"
      >{{ a.label }}</button>
    </div>
  </div>
</template>

<style scoped>
.apf-approval-card {
  margin: 0 var(--spacing-md, 16px) var(--spacing-md, 16px); padding: var(--spacing-md, 16px); background: var(--c-surface);
  border: 1px solid var(--c-border); border-left: 3px solid var(--c-primary); border-radius: var(--radius);
}
.apf-approval-card.apf-dangerous { border-left-color: var(--c-danger); background: var(--c-danger-soft); }
.apf-header { display: flex; align-items: center; gap: var(--spacing-sm, 8px); margin-bottom: var(--spacing-sm, 8px); }
.apf-title { font-weight: var(--font-weight-bold, 700); font-size: var(--font-size-14, 14px); }
.apf-danger-tag { font-size: var(--font-size-11, 11px); font-weight: var(--font-weight-bold, 700); color: #fff; background: var(--c-danger); padding: 1px 6px; border-radius: 3px; }
.apf-prompt { margin: 0 0 var(--spacing-12px, 12px); font-size: var(--font-size-13, 13px); line-height: 1.6; color: var(--c-text-secondary); }
.apf-field { margin-bottom: var(--spacing-10px, 10px); }
.apf-field label { display: block; font-size: var(--font-size-12, 12px); color: var(--c-text-muted); margin-bottom: var(--spacing-xs, 4px); }
.apf-field input, .apf-field textarea, .apf-field select {
  display: block; width: 100%; padding: var(--spacing-sm, 8px) var(--spacing-10px, 10px); border: 1px solid var(--c-border);
  border-radius: var(--radius); font-size: var(--font-size-13, 13px); outline: none; background: var(--c-surface);
}
.apf-field input:focus, .apf-field textarea:focus, .apf-field select:focus { border-color: var(--c-primary); }
.apf-actions { display: flex; gap: var(--spacing-sm, 8px); justify-content: flex-end; }
.apf-btn { padding: 6px var(--spacing-md, 16px); border-radius: var(--radius); font-size: var(--font-size-13, 13px); cursor: pointer; border: 1px solid transparent; }
.apf-btn-primary { background: var(--c-primary); color: #fff; }
.apf-btn-primary:hover { background: var(--c-primary-hover); }
.apf-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.apf-btn-danger { background: var(--c-danger); color: #fff; }
.apf-btn-danger:hover { opacity: 0.9; }
.apf-btn-danger:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
