<script setup lang="ts">
/**
 * QuestionnaireCard — 问卷/审批问答卡
 */
import type { QuestionnaireQuestion } from './types'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    questions: QuestionnaireQuestion[]
    answers?: Record<string, string>
    status?: 'waiting' | 'approved' | 'rejected' | string
    approveLabel?: string
    rejectLabel?: string
    disabled?: boolean
  }>(),
  {
    answers: () => ({}),
    status: 'waiting',
    approveLabel: '批准',
    rejectLabel: '拒绝',
  },
)

const emit = defineEmits<{
  answer: [questionId: string, value: string]
  approve: []
  reject: []
}>()

const statusText = () => {
  if (props.status === 'approved') return '已批准'
  if (props.status === 'rejected') return '已拒绝'
  return '待审批'
}

const canSubmit = () => {
  const required = props.questions.filter((q) => q.required)
  return required.every((q) => Boolean(props.answers[q.id]))
}

const waiting = () => props.status === 'waiting' && !props.disabled
</script>

<template>
  <div class="apf-questionnaire">
    <div class="apf-questionnaire__head">
      <span class="apf-questionnaire__title">{{ title }}</span>
      <span class="apf-questionnaire__status" :data-status="status">{{ statusText() }}</span>
    </div>
    <p v-if="description" class="apf-questionnaire__desc">{{ description }}</p>
    <div v-if="questions.length" class="apf-questionnaire__list">
      <div v-for="q in questions" :key="q.id" class="apf-questionnaire__item">
        <div class="apf-questionnaire__q">
          <span v-if="q.required" class="apf-questionnaire__req">*</span>
          {{ q.question }}
        </div>
        <div v-if="q.options?.length" class="apf-questionnaire__options">
          <label
            v-for="opt in q.options"
            :key="opt"
            class="apf-questionnaire__opt"
          >
            <input
              type="radio"
              :name="q.id"
              :value="opt"
              :checked="answers[q.id] === opt"
              :disabled="!waiting()"
              @change="emit('answer', q.id, opt)"
            />
            {{ opt }}
          </label>
        </div>
        <input
          v-else
          class="apf-questionnaire__input"
          type="text"
          :value="answers[q.id] || ''"
          placeholder="请输入..."
          :disabled="!waiting()"
          @input="emit('answer', q.id, ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div v-if="waiting()" class="apf-questionnaire__actions">
      <button type="button" class="apf-questionnaire__btn is-ghost" @click="emit('reject')">
        {{ rejectLabel }}
      </button>
      <button
        type="button"
        class="apf-questionnaire__btn is-primary"
        :disabled="!canSubmit()"
        @click="emit('approve')"
      >
        {{ approveLabel }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.apf-questionnaire {
  border: 1px solid var(--c-border, #e4e7ed);
  border-radius: 8px;
  overflow: hidden;
}

.apf-questionnaire__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  background: var(--c-bg-muted, #f5f7fa);
  border-bottom: 1px solid var(--c-border, #e4e7ed);
}

.apf-questionnaire__title {
  font-size: 13px;
  font-weight: 500;
}

.apf-questionnaire__status {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(230, 162, 60, 0.15);
  color: var(--c-warning, #e6a23c);
}

.apf-questionnaire__status[data-status='approved'] {
  background: rgba(38, 160, 54, 0.12);
  color: var(--c-success, #26a036);
}

.apf-questionnaire__status[data-status='rejected'] {
  background: rgba(245, 108, 108, 0.12);
  color: var(--c-danger, #f56c6c);
}

.apf-questionnaire__desc {
  margin: 0;
  padding: 10px 12px;
  font-size: 12px;
  color: var(--c-text-muted, #909399);
  line-height: 1.6;
  border-bottom: 1px solid var(--c-border, #e4e7ed);
}

.apf-questionnaire__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}

.apf-questionnaire__q {
  font-size: 13px;
  margin-bottom: 6px;
}

.apf-questionnaire__req {
  color: var(--c-danger, #f56c6c);
  margin-right: 2px;
}

.apf-questionnaire__options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.apf-questionnaire__opt {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  cursor: pointer;
}

.apf-questionnaire__input {
  width: 100%;
  box-sizing: border-box;
  padding: 6px 8px;
  border: 1px solid var(--c-border, #e4e7ed);
  border-radius: 6px;
  font: inherit;
  font-size: 13px;
}

.apf-questionnaire__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--c-border, #e4e7ed);
}

.apf-questionnaire__btn {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.apf-questionnaire__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.apf-questionnaire__btn.is-ghost {
  border: 1px solid var(--c-danger, #f56c6c);
  background: transparent;
  color: var(--c-danger, #f56c6c);
}

.apf-questionnaire__btn.is-primary {
  border: none;
  background: var(--c-primary, #0060a2);
  color: #fff;
}
</style>
