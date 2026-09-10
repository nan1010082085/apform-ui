<script setup lang="ts">
/**
 * FieldListCard — 字段列表结果卡（表单/Schema 摘要）
 */
import type { FieldListItem } from './types'

const props = withDefaults(
  defineProps<{
    title: string
    fields: FieldListItem[]
    badgeLabel?: string
    primaryAction?: string
    secondaryAction?: string
    compact?: boolean
  }>(),
  { compact: false },
)

const emit = defineEmits<{
  'primary-action': []
  'secondary-action': []
}>()

const badgeText = () => props.badgeLabel || `${props.fields.length} 个字段`
</script>

<template>
  <div class="apf-field-list-card" :class="{ 'is-compact': compact }">
    <div class="apf-field-list-card__head">
      <div class="apf-field-list-card__head-left">
        <span class="apf-field-list-card__icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14">
            <rect x="2.5" y="3" width="11" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.3" />
            <path d="M5 6.5h6M5 9.5h4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
          </svg>
        </span>
        <span class="apf-field-list-card__title">{{ title }}</span>
      </div>
      <span class="apf-field-list-card__badge">{{ badgeText() }}</span>
    </div>
    <div class="apf-field-list-card__body">
      <div v-for="(field, idx) in fields" :key="idx" class="apf-field-list-card__row">
        <div class="apf-field-list-card__info">
          <div class="apf-field-list-card__name">{{ field.name }}</div>
          <div class="apf-field-list-card__type">{{ field.type }}<template v-if="field.meta"> · {{ field.meta }}</template></div>
        </div>
        <span class="apf-field-list-card__flag" :class="{ 'is-req': field.required }">
          {{ field.required ? '必填' : '可选' }}
        </span>
      </div>
    </div>
    <div v-if="!compact && (primaryAction || secondaryAction)" class="apf-field-list-card__actions">
      <button
        v-if="secondaryAction"
        type="button"
        class="apf-field-list-card__btn is-ghost"
        @click="emit('secondary-action')"
      >
        {{ secondaryAction }}
      </button>
      <button
        v-if="primaryAction"
        type="button"
        class="apf-field-list-card__btn is-primary"
        @click="emit('primary-action')"
      >
        {{ primaryAction }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.apf-field-list-card {
  border: 1px solid var(--c-border, #ebedf3);
  border-radius: 12px;
  overflow: hidden;
  background: var(--c-surface, #fff);
}

.apf-field-list-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 16px;
  background: var(--c-bg-muted, #f5f7fa);
  border-bottom: 1px solid var(--c-border, #ebedf3);
}

.apf-field-list-card__head-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.apf-field-list-card__icon {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: var(--c-success, #26a036);
  background: rgba(38, 160, 54, 0.1);
}

.apf-field-list-card__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--c-text, #303133);
}

.apf-field-list-card__badge {
  font-size: 11px;
  color: var(--c-text-muted, #909399);
}

.apf-field-list-card__body {
  padding: 8px 12px;
}

.apf-field-list-card__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 4px;
  border-bottom: 1px solid var(--c-border-soft, #f0f2f5);
}

.apf-field-list-card__row:last-child {
  border-bottom: none;
}

.apf-field-list-card__name {
  font-size: 13px;
  color: var(--c-text, #303133);
}

.apf-field-list-card__type {
  margin-top: 2px;
  font-size: 11px;
  color: var(--c-text-muted, #909399);
}

.apf-field-list-card__flag {
  font-size: 11px;
  color: var(--c-text-muted, #909399);
}

.apf-field-list-card__flag.is-req {
  color: var(--c-danger, #e50113);
}

.apf-field-list-card__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid var(--c-border, #ebedf3);
}

.apf-field-list-card__btn {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.apf-field-list-card__btn.is-ghost {
  border: 1px solid var(--c-border, #ebedf3);
  background: transparent;
  color: var(--c-text-secondary, #666);
}

.apf-field-list-card__btn.is-primary {
  border: none;
  background: var(--c-primary, #0060a2);
  color: #fff;
}

.is-compact .apf-field-list-card__head {
  padding: 8px 12px;
}
</style>
