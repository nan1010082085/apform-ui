<script setup lang="ts">
/**
 * ConversationHeader — 对话顶栏（纯 props）
 */
defineProps<{
  /** 主标题（智能体/模型名） */
  title?: string
  /** 副文案 */
  label?: string
  /** 是否有消息 */
  hasMessages?: boolean
  /** 处理中 */
  processing?: boolean
}>()

const emit = defineEmits<{
  changeAssistant: []
  toggleDetails: []
  create: []
}>()
</script>

<template>
  <header class="apf-conversation-header">
    <div class="apf-conversation-header__identity">
      <div class="apf-conversation-header__copy">
        <span class="apf-conversation-header__label">{{ label || '正在使用' }}</span>
        <strong>{{ title || '选择一个智能体开始' }}</strong>
      </div>
    </div>
    <div class="apf-conversation-header__actions">
      <span v-if="processing" class="apf-conversation-header__processing">
        <i /><span>正在处理</span>
      </span>
      <button
        type="button"
        class="apf-conversation-header__btn"
        @click="(hasMessages ? emit('create') : emit('changeAssistant'))"
      >
        {{ hasMessages ? '新建对话' : '选择智能体' }}
      </button>
      <button
        v-if="hasMessages"
        type="button"
        class="apf-conversation-header__btn"
        @click="emit('toggleDetails')"
      >
        处理详情
      </button>
    </div>
  </header>
</template>

<style scoped>
.apf-conversation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md, 16px);
  min-height: var(--conversation-header-height, 68px);
  padding: var(--spacing-12px, 12px) var(--page-padding-x, 24px);
  border-bottom: 1px solid var(--border-color-light, #ebeef5);
  background: var(--bg-color-white, #fff);
}

.apf-conversation-header__copy {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.apf-conversation-header__label {
  color: var(--text-color-secondary, #909399);
  font-size: var(--font-size-11, 11px);
}

.apf-conversation-header__copy strong {
  overflow: hidden;
  color: var(--text-color-title, #303133);
  font-size: var(--font-size-14, 14px);
  font-weight: var(--font-weight-semibold, 600);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apf-conversation-header__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 8px);
  flex: none;
}

.apf-conversation-header__btn {
  border: 0;
  border-radius: var(--border-radius-md, 4px);
  background: transparent;
  color: var(--text-color-regular, #606266);
  cursor: pointer;
  font-size: var(--font-size-12, 12px);
  padding: 7px var(--spacing-sm, 8px);
}

.apf-conversation-header__btn:hover {
  background: var(--bg-color-gray-light, #f5f7fa);
  color: var(--color-primary, #0060a2);
}

.apf-conversation-header__processing {
  display: inline-flex;
  align-items: center;
  gap: var(--form-field-gap, 6px);
  color: var(--el-color-warning, #e6a23c);
  font-size: var(--font-size-12, 12px);
}

.apf-conversation-header__processing i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
</style>