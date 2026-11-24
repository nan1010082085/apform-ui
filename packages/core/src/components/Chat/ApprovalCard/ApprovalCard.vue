<script setup lang="ts">
import { ref } from 'vue'
import type { WaitingPayload } from '../../../types'

defineProps<{ waiting: WaitingPayload | null; disabled: boolean }>()
const emit = defineEmits<{ (e: 'resume', action: string, payload?: string): void }>()

const inputValue = ref('')

/**
 * @param style - 按钮风格
 */
function btnClass(style?: string): string {
  if (style === 'danger') return 'apf-btn-danger'
  if (style === 'ghost' || style === 'default') return 'apf-btn-ghost'
  return 'apf-btn-primary'
}

function submit(action: string) {
  emit('resume', action, inputValue.value || undefined)
  inputValue.value = ''
}
</script>

<template>
  <div v-if="waiting" class="apf-approval-card" :class="{ 'apf-dangerous': waiting.dangerous }">
    <div class="apf-header">
      <i
        class="apf-status-dot"
        :class="waiting.dangerous ? 'apf-status-dot--danger' : 'apf-status-dot--primary'"
        aria-hidden="true"
      />
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
        v-for="a in waiting.actions"
        :key="a.action"
        type="button"
        class="apf-btn"
        :class="btnClass(a.style)"
        :disabled="disabled"
        @click="submit(a.action)"
      >
        {{ a.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.apf-approval-card {
  margin: 0 var(--spacing-md, 16px) var(--spacing-md, 16px);
  padding: var(--spacing-md, 16px);
  background: var(--apf-bg-surface);
  border: 1px solid var(--apf-border-base);
  border-radius: var(--apf-radius-md);
}
.apf-approval-card.apf-dangerous {
  background: color-mix(in srgb, var(--apf-color-danger-bg, #fff8f7) 75%, #fff);
  border-color: color-mix(in srgb, var(--apf-color-danger) 30%, var(--apf-border-base));
}
.apf-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 8px);
  margin-bottom: var(--spacing-sm, 8px);
}
.apf-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--apf-color-primary);
}
.apf-status-dot--primary {
  background: var(--apf-color-primary);
}
.apf-status-dot--danger {
  background: var(--apf-color-danger);
}
.apf-title {
  font-weight: var(--font-weight-semibold, 600);
  font-size: var(--font-size-14, 14px);
  letter-spacing: -0.01em;
}
.apf-danger-tag {
  font-size: var(--font-size-11, 11px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--apf-color-danger);
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--apf-color-danger) 35%, transparent);
  padding: 1px 6px;
  border-radius: var(--border-radius-md, 4px);
}
.apf-prompt { margin: 0 0 var(--spacing-12px, 12px); font-size: var(--font-size-13, 13px); line-height: 1.6; color: var(--apf-text-secondary); }
.apf-field { margin-bottom: var(--spacing-10px, 10px); }
.apf-field label { display: block; font-size: var(--font-size-12, 12px); color: var(--apf-text-muted); margin-bottom: var(--spacing-xs, 4px); }
.apf-field input, .apf-field textarea, .apf-field select {
  display: block; width: 100%; padding: var(--spacing-sm, 8px) var(--spacing-10px, 10px); border: 1px solid var(--apf-border-base);
  border-radius: var(--apf-radius-md); font-size: var(--font-size-13, 13px); outline: none; background: var(--apf-bg-surface);
}
.apf-field input:focus, .apf-field textarea:focus, .apf-field select:focus { border-color: var(--apf-color-primary); }
.apf-actions { display: flex; gap: var(--spacing-sm, 8px); justify-content: flex-end; }
.apf-btn { padding: 6px var(--spacing-md, 16px); border-radius: var(--apf-radius-md); font-size: var(--font-size-13, 13px); cursor: pointer; border: 1px solid transparent; }
.apf-btn-primary { background: var(--apf-color-primary); color: #fff; }
.apf-btn-primary:hover { background: var(--apf-color-primary-hover); }
.apf-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.apf-btn-danger { background: var(--apf-color-danger); color: #fff; }
.apf-btn-danger:hover { opacity: 0.9; }
.apf-btn-danger:disabled { opacity: 0.5; cursor: not-allowed; }
.apf-btn-ghost {
  background: transparent;
  color: var(--apf-text-secondary);
  border-color: var(--apf-border-base);
}
.apf-btn-ghost:hover { background: var(--apf-bg-gray, #f5f7fa); }
.apf-btn-ghost:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
