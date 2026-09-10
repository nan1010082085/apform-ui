<script setup lang="ts">
/**
 * PropertyPanel 交互演示：多分区 + 实时更新日志
 */
import { computed, reactive, ref } from 'vue'
import {
  PropertyPanel,
  type PropertySection,
  type PropertyUpdatePayload,
} from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const form = reactive({
  title: '示例标题',
  mode: 'basic',
  enabled: true,
  description: '一段说明文字',
  options: [
    { label: '选项 A', value: 'a' },
    { label: '选项 B', value: 'b' },
  ],
  colWidths: [50, 50],
  tags: ['alpha', 'beta'],
})

const logs = ref<string[]>([])

const sections = computed<PropertySection[]>(() => [
  {
    key: 'basic',
    label: '基础信息',
    items: [
      { key: 'title', label: '标题', type: 'text', value: form.title, required: true },
      {
        key: 'mode',
        label: '模式',
        type: 'select',
        value: form.mode,
        options: [
          { label: '基础', value: 'basic' },
          { label: '高级', value: 'advanced' },
        ],
      },
      { key: 'enabled', label: '启用', type: 'switch', value: form.enabled },
    ],
  },
  {
    key: 'content',
    label: '内容',
    items: [
      {
        key: 'description',
        label: '描述',
        type: 'textarea',
        value: form.description,
        placeholder: '请输入描述',
      },
      {
        key: 'options',
        label: '下拉选项',
        type: 'options',
        value: form.options,
      },
    ],
  },
  {
    key: 'layout',
    label: '布局 / 数组',
    items: [
      {
        key: 'colWidths',
        label: '列宽',
        type: 'number-array',
        value: form.colWidths,
        min: 0,
        max: 100,
      },
      {
        key: 'tags',
        label: '标签',
        type: 'array-editor',
        value: form.tags,
        arrayMode: 'string',
      },
    ],
  },
])

const values = computed(() => ({ ...form }))

/**
 * @param payload 更新载荷
 */
function onUpdate(payload: PropertyUpdatePayload) {
  const { key, value, sectionKey } = payload
  ;(form as Record<string, unknown>)[key] = value
  const stamp = new Date().toLocaleTimeString()
  logs.value.unshift(
    `[${stamp}] ${sectionKey}.${key} → ${JSON.stringify(value)}`,
  )
  if (logs.value.length > 20) logs.value.length = 20
}

const source = `<script setup>
import { reactive, computed } from 'vue'
import { PropertyPanel } from '@apform-ui/core'

const form = reactive({ title: '', mode: 'basic', enabled: true, description: '' })
const sections = computed(() => [/* PropertySection[] */])
<\/script>

<template>
  <PropertyPanel :sections="sections" :values="form" @update="onUpdate" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="交互属性面板"
      description="至少 3 个分区，含 select / switch / textarea / options / number-array；右侧为实时更新日志。"
      :source="source"
    >
      <div class="demo-layout">
        <div class="panel">
          <PropertyPanel
            title="属性"
            subject-label="示例组件"
            subject-hint="对齐 editor 属性栏完整壳样式"
            :sections="sections"
            :values="values"
            @update="onUpdate"
          />
        </div>
        <aside class="log">
          <div class="log__title">更新日志</div>
          <pre v-if="logs.length" class="log__body">{{ logs.join('\n') }}</pre>
          <div v-else class="log__empty">修改任意字段后在此显示</div>
        </aside>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.demo-layout {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.panel {
  flex: 1;
  min-width: 280px;
  max-width: 360px;
  height: 560px;
  border: 1px solid var(--apf-border-light, #ebedf3);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
  background: transparent;
}

.log {
  flex: 1;
  min-width: 240px;
  max-width: 360px;
  border: 1px solid var(--apf-border-light, #ebedf3);
  border-radius: 8px;
  padding: 12px;
  background: var(--apf-bg-gray-light, #fafafa);
}

.log__title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--apf-text-title, #303133);
}

.log__body {
  margin: 0;
  font-size: 11px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: var(--apf-font-family-mono, monospace);
  color: var(--apf-text-regular, #606266);
  max-height: 420px;
  overflow: auto;
}

.log__empty {
  font-size: 12px;
  color: var(--apf-text-muted, #909399);
}
</style>
