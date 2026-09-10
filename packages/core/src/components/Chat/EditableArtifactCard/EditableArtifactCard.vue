<script setup lang="ts">
/**
 * EditableArtifactCard — 可编辑工件（code/json/html）+ 回传
 */
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    content: string
    /** artifact 类型：code | json | html */
    artifactType?: string
    language?: string
    sendBackLabel?: string
    hint?: string
  }>(),
  {
    artifactType: 'code',
    sendBackLabel: '回传给助手',
    hint: '编辑后可回传给助手继续优化',
  },
)

const emit = defineEmits<{
  sendback: [content: string, language: string]
  copy: [content: string]
}>()

const editable = ref(props.content)
const mode = ref<'edit' | 'preview'>('edit')

watch(
  () => props.content,
  (v) => {
    editable.value = v
  },
)

const language = computed(() => props.language || props.artifactType)
const isHtml = computed(() => props.artifactType === 'html')
const isJson = computed(() => props.artifactType === 'json')

const jsonValid = computed(() => {
  if (!isJson.value) return null
  try {
    JSON.parse(editable.value)
    return true
  } catch {
    return false
  }
})

function copy(): void {
  if (!editable.value) return
  navigator.clipboard?.writeText(editable.value)
  emit('copy', editable.value)
}

function formatJson(): void {
  if (!isJson.value) return
  try {
    editable.value = JSON.stringify(JSON.parse(editable.value), null, 2)
  } catch {
    // keep as-is
  }
}

function sendBack(): void {
  if (!editable.value.trim()) return
  emit('sendback', editable.value, language.value)
}
</script>

<template>
  <div class="apf-editable-artifact">
    <div class="apf-editable-artifact__head">
      <div class="apf-editable-artifact__head-left">
        <span class="apf-editable-artifact__title">工件</span>
        <span class="apf-editable-artifact__tag">{{ artifactType }}</span>
        <span v-if="isJson && jsonValid === false" class="apf-editable-artifact__tag is-danger">JSON 无效</span>
      </div>
      <div class="apf-editable-artifact__head-right">
        <button
          v-if="isHtml"
          type="button"
          class="apf-editable-artifact__mode"
          :class="{ 'is-active': mode === 'edit' }"
          @click="mode = 'edit'"
        >
          编辑
        </button>
        <button
          v-if="isHtml"
          type="button"
          class="apf-editable-artifact__mode"
          :class="{ 'is-active': mode === 'preview' }"
          @click="mode = 'preview'"
        >
          预览
        </button>
        <button v-if="isJson" type="button" class="apf-editable-artifact__tool" @click="formatJson">
          格式化
        </button>
        <button type="button" class="apf-editable-artifact__tool" aria-label="复制" @click="copy">
          复制
        </button>
      </div>
    </div>

    <div class="apf-editable-artifact__body">
      <textarea
        v-if="mode === 'edit'"
        v-model="editable"
        class="apf-editable-artifact__editor"
        :placeholder="`可编辑 ${artifactType} 内容`"
        spellcheck="false"
      />
      <iframe
        v-else
        class="apf-editable-artifact__preview"
        :srcdoc="editable"
        sandbox="allow-scripts"
        title="artifact preview"
      />
    </div>

    <div class="apf-editable-artifact__footer">
      <span class="apf-editable-artifact__hint">{{ hint }}</span>
      <button type="button" class="apf-editable-artifact__send" @click="sendBack">
        {{ sendBackLabel }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.apf-editable-artifact {
  border: 1px solid var(--c-border, #ebedf3);
  border-radius: var(--radius, 8px);
  background: var(--c-surface, #fff);
  overflow: hidden;
}

.apf-editable-artifact__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  border-bottom: 1px solid var(--c-border, #ebedf3);
  background: var(--c-bg-muted, #f7fafa);
}

.apf-editable-artifact__head-left,
.apf-editable-artifact__head-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.apf-editable-artifact__title {
  font-size: 12px;
  font-weight: 600;
  color: var(--c-text, #333);
}

.apf-editable-artifact__tag {
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
  background: var(--c-primary-soft, #eef5ff);
  color: var(--c-primary, #0060a2);
}

.apf-editable-artifact__tag.is-danger {
  background: rgba(255, 82, 82, 0.1);
  color: var(--c-danger, #ff5252);
}

.apf-editable-artifact__mode,
.apf-editable-artifact__tool {
  padding: 2px 8px;
  border: 1px solid var(--c-border, #ebedf3);
  border-radius: 4px;
  background: var(--c-surface, #fff);
  font-size: 11px;
  cursor: pointer;
  color: var(--c-text-secondary, #666);
  font-family: inherit;
}

.apf-editable-artifact__mode.is-active {
  border-color: var(--c-primary, #0060a2);
  color: var(--c-primary, #0060a2);
}

.apf-editable-artifact__body {
  min-height: 120px;
}

.apf-editable-artifact__editor {
  display: block;
  width: 100%;
  min-height: 160px;
  max-height: 360px;
  padding: 10px 12px;
  border: none;
  resize: vertical;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  line-height: 1.5;
  outline: none;
  box-sizing: border-box;
  background: transparent;
  color: var(--c-text, #333);
}

.apf-editable-artifact__preview {
  display: block;
  width: 100%;
  min-height: 200px;
  border: none;
  background: #fff;
}

.apf-editable-artifact__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  border-top: 1px solid var(--c-border, #ebedf3);
}

.apf-editable-artifact__hint {
  font-size: 11px;
  color: var(--c-text-muted, #999);
}

.apf-editable-artifact__send {
  padding: 4px 12px;
  border: none;
  border-radius: 6px;
  background: var(--c-primary, #0060a2);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.apf-editable-artifact__send:hover {
  background: var(--c-primary-hover, #4581e9);
}
</style>
