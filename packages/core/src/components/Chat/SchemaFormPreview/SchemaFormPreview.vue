<script setup lang="ts">
/**
 * SchemaFormPreview — Schema 表单完整预览卡
 *
 * 将字段列表渲染为 Element Plus 表单预览（非精简列表）。
 */
import { computed } from 'vue'
import { AppIcon } from '../../AppIcon'
import type { SchemaFormPreviewField } from './types'

const props = withDefaults(
  defineProps<{
    /** 预览字段列表 */
    fields: SchemaFormPreviewField[]
    /** 标题 */
    title?: string
    /** 紧凑模式（禁用交互、限制高度） */
    compact?: boolean
    /** 表单 label 宽度 */
    labelWidth?: string
    /** 表单 label 位置 */
    labelPosition?: 'left' | 'right' | 'top'
    /** 主操作文案 */
    primaryActionLabel?: string
    /** 是否显示主操作（默认非 compact 时显示） */
    showPrimaryAction?: boolean
  }>(),
  {
    title: '生成的表单',
    compact: false,
    labelWidth: '100px',
    labelPosition: 'right',
    primaryActionLabel: '确认发布',
  },
)

const emit = defineEmits<{
  click: []
  'primary-action': []
}>()

const showAction = computed(() =>
  props.showPrimaryAction !== undefined ? props.showPrimaryAction : !props.compact,
)
</script>

<template>
  <div :class="[$style.previewCard, { [$style.compact]: compact }]" @click="emit('click')">
    <div :class="$style.header">
      <div :class="$style.headerLeft">
        <div :class="$style.headerIcon">
          <AppIcon name="grid" :size="14" />
        </div>
        <span :class="$style.title">{{ title }}</span>
      </div>
      <div :class="$style.headerRight">
        <span :class="$style.badge">{{ fields.length }} 个字段</span>
        <span :class="$style.viewHint">
          <AppIcon name="view" :size="12" />
          预览
        </span>
      </div>
    </div>

    <div :class="$style.previewBody">
      <el-form
        :label-width="labelWidth"
        :label-position="labelPosition"
        :class="$style.form"
      >
        <template v-for="field in fields" :key="field.id">
          <el-form-item
            v-if="['input', 'email', 'phone', 'password'].includes(field.type)"
            :label="field.label"
            :class="$style.formItem"
          >
            <el-input
              :placeholder="field.placeholder"
              :clearable="field.clearable"
              :show-password="field.showPassword"
              :maxlength="field.maxlength"
              :disabled="compact"
              size="default"
            />
          </el-form-item>

          <el-form-item
            v-else-if="field.type === 'textarea'"
            :label="field.label"
            :class="$style.formItem"
          >
            <el-input
              type="textarea"
              :placeholder="field.placeholder"
              :rows="3"
              :disabled="compact"
            />
          </el-form-item>

          <el-form-item
            v-else-if="field.type === 'select'"
            :label="field.label"
            :class="$style.formItem"
          >
            <el-select
              :placeholder="field.placeholder"
              :clearable="field.clearable"
              :disabled="compact"
              style="width: 100%"
            >
              <el-option
                v-for="opt in field.options ?? []"
                :key="String(opt.value)"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            v-else-if="field.type === 'checkbox'"
            :label="field.label || undefined"
            :class="$style.formItem"
          >
            <el-checkbox-group :disabled="compact">
              <el-checkbox
                v-for="opt in field.options ?? []"
                :key="String(opt.value)"
                :label="opt.label"
                :value="opt.value"
              />
            </el-checkbox-group>
          </el-form-item>

          <el-form-item
            v-else-if="field.type === 'radio'"
            :label="field.label"
            :class="$style.formItem"
          >
            <el-radio-group :disabled="compact">
              <el-radio
                v-for="opt in field.options ?? []"
                :key="String(opt.value)"
                :value="opt.value"
              >
                {{ opt.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            v-else-if="field.type === 'switch'"
            :label="field.label"
            :class="$style.formItem"
          >
            <el-switch :disabled="compact" />
          </el-form-item>

          <el-form-item
            v-else-if="field.type === 'date-picker' || field.type === 'datepicker'"
            :label="field.label"
            :class="$style.formItem"
          >
            <el-date-picker
              :placeholder="field.placeholder"
              :disabled="compact"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item
            v-else-if="field.type === 'time-picker' || field.type === 'timepicker'"
            :label="field.label"
            :class="$style.formItem"
          >
            <el-time-picker
              :placeholder="field.placeholder"
              :disabled="compact"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item
            v-else-if="field.type === 'button'"
            :class="$style.formItem"
          >
            <el-button
              :type="(field.buttonType as any) ?? 'default'"
              :disabled="compact"
            >
              {{ field.buttonText ?? field.label ?? '按钮' }}
            </el-button>
          </el-form-item>

          <el-form-item
            v-else-if="field.type === 'number'"
            :label="field.label"
            :class="$style.formItem"
          >
            <el-input-number :disabled="compact" style="width: 100%" />
          </el-form-item>

          <el-form-item
            v-else
            :label="field.label"
            :class="$style.formItem"
          >
            <el-input
              :placeholder="field.placeholder || field.type"
              :disabled="compact"
            />
          </el-form-item>
        </template>
      </el-form>
    </div>

    <div v-if="showAction" :class="$style.actions">
      <el-button :class="$style.btnPrimary" type="primary" @click.stop="emit('primary-action')">
        <AppIcon name="check" :size="12" />
        {{ primaryActionLabel }}
      </el-button>
    </div>
  </div>
</template>

<style module>
.previewCard {
  border: 1px solid var(--ai-border-light, #EBEDF3);
  border-radius: var(--ai-radius-lg, 12px);
  background: var(--ai-bg-white, #FFFFFF);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.previewCard:hover {
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.12);
}

.previewCard.compact {
  max-height: 400px;
  overflow-y: auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--ai-border-light, #EBEDF3);
  background: var(--ai-gradient-card-header, linear-gradient(180deg, rgba(22, 29, 38, 0.8) 0%, rgba(22, 29, 38, 0.4) 100%));
}

.headerLeft {
  display: flex;
  align-items: center;
  gap: 8px;
}

.headerIcon {
  width: 28px;
  height: 28px;
  border-radius: var(--ai-radius-md, 8px);
  background: rgba(0, 212, 255, 0.08);
  color: var(--ai-color-primary, #00d4ff);
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 14px;
  font-weight: 600;
  color: var(--ai-text-primary, #333333);
}

.headerRight {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  font-size: 11px;
  color: var(--ai-text-hint, #999999);
  background: var(--ai-bg-gray, #F5F7FA);
  padding: 2px 8px;
  border-radius: var(--ai-radius-sm, 6px);
}

.viewHint {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--ai-color-primary, #00d4ff);
  background: rgba(0, 212, 255, 0.08);
  padding: 2px 8px;
  border-radius: var(--ai-radius-sm, 6px);
  font-weight: 500;
}

.previewBody {
  padding: 16px;
}

.form {
  pointer-events: none;
}

.formItem {
  margin-bottom: 16px;
}

.formItem:last-child {
  margin-bottom: 0;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--ai-border-light, #EBEDF3);
  background: var(--ai-bg-gray, #F5F7FA);
}

.btnOutline {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: var(--ai-radius-md, 8px);
  border: 1px solid var(--ai-border-light, rgba(0, 212, 255, 0.12));
  background: transparent;
  color: var(--ai-text-secondary, #666666);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}

.btnOutline:hover {
  border-color: rgba(0, 212, 255, 0.3);
  color: var(--ai-color-primary, #00d4ff);
  background: rgba(0, 212, 255, 0.06);
}

.btnPrimary {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: var(--ai-radius-md, 8px);
  border: none;
  background: var(--ai-gradient-primary, linear-gradient(135deg, #00d4ff 0%, #009fcc 100%));
  color: #333333;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
}

.btnPrimary:hover {
  opacity: 0.9;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
}
</style>
