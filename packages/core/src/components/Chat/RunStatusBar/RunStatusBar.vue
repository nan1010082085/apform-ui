<script setup lang="ts">
import { computed } from 'vue'
import type { RunStatusView } from '../../../types'

const props = defineProps<{ run: RunStatusView | null; sending: boolean }>()
const emit = defineEmits<{ (e: 'cancel'): void }>()

const status = computed(() => props.run?.status || null)

function statusLabel(s: string): string {
  return { RUNNING: '正在处理', COMPLETED: '已完成', FAILED: '处理失败', WAITING_INPUT: '等待你的确认', CANCELLED: '已取消' }[s] || s
}
function statusClass(s: string): string {
  return { RUNNING: 'apf-running', COMPLETED: 'apf-success', FAILED: 'apf-failed', WAITING_INPUT: 'apf-waiting', CANCELLED: 'apf-cancelled' }[s] || ''
}
function elapsed(): string {
  if (!props.run) return ''
  const start = new Date(props.run.startedAt).getTime()
  const end = props.run.finishedAt ? new Date(props.run.finishedAt).getTime() : Date.now()
  const sec = Math.round((end - start) / 1000)
  if (sec < 60) return sec + 's'
  return Math.floor(sec / 60) + 'm ' + (sec % 60) + 's'
}
</script>

<template>
  <div v-if="run" class="apf-run-bar">
    <div class="apf-row">
      <span class="apf-chip" :class="statusClass(status || '')"><i></i>{{ statusLabel(status || '') }}</span>
      <span v-if="status === 'RUNNING' || status === 'WAITING_INPUT'" class="apf-elapsed">{{ elapsed() }}</span>
      <button v-if="status === 'RUNNING'" class="apf-btn-cancel" @click="emit('cancel')">停止</button>
    </div>
    <p v-if="run.errorMessage" class="apf-error-text">{{ run.errorMessage }}</p>
  </div>
</template>

<style scoped>
.apf-run-bar { padding: var(--spacing-12px, 12px) var(--spacing-md, 16px); border-bottom: 1px solid var(--apf-border-light); background: var(--apf-bg-surface); }
.apf-row { display: flex; align-items: center; gap: var(--spacing-12px, 12px); }
.apf-elapsed { font-size: var(--font-size-12, 12px); color: var(--apf-text-muted); font-variant-numeric: tabular-nums; }
.apf-btn-cancel {
  margin-left: auto; padding: var(--spacing-xs, 4px) var(--spacing-12px, 12px); font-size: var(--font-size-12, 12px);
  border: 1px solid var(--apf-color-danger); border-radius: var(--apf-radius-md);
  color: var(--apf-color-danger); background: var(--apf-bg-surface); cursor: pointer;
}
.apf-btn-cancel:hover { background: var(--apf-color-danger-bg); }
.apf-error-text { margin: var(--spacing-sm, 8px) 0 0; font-size: var(--font-size-12, 12px); color: var(--apf-color-danger); }
.apf-chip {
  display: inline-flex; align-items: center; gap: var(--form-field-gap, 6px); padding: 3px var(--spacing-sm, 8px);
  border-radius: var(--border-radius-full, 999px); font-size: var(--font-size-11, 11px); font-weight: var(--font-weight-semibold, 600); background: #eef2f2; color: var(--apf-text-secondary);
}
.apf-chip i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.apf-running { color: var(--apf-color-info, #0060A2); background: #e8f4ff; }
.apf-waiting { color: var(--apf-color-warning, #F09700); background: #fdf2df; }
.apf-success { color: var(--apf-color-primary, #0060A2); background: var(--apf-color-primary-bg-light, #e8f4ff); }
.apf-failed { color: var(--apf-color-danger, #E50113); background: var(--apf-color-danger-bg, #fff8f7); }
.apf-cancelled { color: var(--apf-text-muted, #909399); }
</style>
