<script setup lang="ts">
/**
 * JsonCard — JSON 摘要卡片
 */
import { computed } from 'vue'
import { AppIcon } from '../AppIcon'

const props = withDefaults(
  defineProps<{
    /** 卡片标题 */
    title: string
    /** JSON 字符串或已解析对象 */
    data?: unknown
    /** 兼容旧 API：JSON 字符串 */
    content?: string
    type?: 'json' | 'schema' | 'flow'
  }>(),
  { type: 'json' },
)

const emit = defineEmits<{
  click: []
  openDetail: []
}>()

const parsedData = computed(() => {
  if (props.data !== undefined) return props.data
  if (!props.content) return null
  try {
    return JSON.parse(props.content)
  } catch {
    return null
  }
})

const summary = computed(() => {
  const data = parsedData.value
  if (data == null) return 'JSON 数据'
  if (Array.isArray(data)) {
    return `${data.length} 个元素`
  }
  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>
    if (Array.isArray(obj.nodes)) {
      const edgeCount = Array.isArray(obj.edges) ? obj.edges.length : 0
      return `${obj.nodes.length} 个节点, ${edgeCount} 条连线`
    }
    const keys = Object.keys(obj)
    return `${keys.length} 个字段${keys.length ? ` (${keys.slice(0, 3).join(', ')}${keys.length > 3 ? '...' : ''})` : ''}`
  }
  return String(data)
})

const icon = computed(() => {
  if (props.type === 'schema') return 'document'
  if (props.type === 'flow') return 'connection'
  return 'files'
})

function onClick() {
  emit('click')
  emit('openDetail')
}
</script>

<template>
  <button type="button" class="apf-json-card" @click="onClick">
    <AppIcon :name="icon" :size="20" class="apf-json-card__icon" />
    <div class="apf-json-card__body">
      <strong class="apf-json-card__title">{{ title }}</strong>
      <span class="apf-json-card__summary">{{ summary }}</span>
    </div>
  </button>
</template>

<style scoped>
.apf-json-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--border-color-light, #ebeef5);
  border-radius: 8px;
  background: var(--bg-color-white, #fff);
  text-align: left;
  cursor: pointer;
  font: inherit;
  color: inherit;
}

.apf-json-card:hover {
  border-color: var(--color-primary, #0060a2);
}

.apf-json-card__icon {
  flex: none;
  color: var(--color-primary, #0060a2);
  margin-top: 2px;
}

.apf-json-card__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.apf-json-card__title {
  font-size: 14px;
  font-weight: 600;
}

.apf-json-card__summary {
  font-size: 12px;
  color: var(--text-color-secondary, #909399);
}
</style>
