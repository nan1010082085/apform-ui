<script setup lang="ts">
/**
 * EmptyState — 统一空状态组件
 *
 * 用于列表/页面无数据时的占位展示。
 * 兼容 meeting 等业务仓：compact / actionText / action 事件。
 */
import AppIcon from '../AppIcon/AppIcon.vue'

withDefaults(
  defineProps<{
    /** 图标名称（AppIcon 已注册的 kebab-case name） */
    icon?: string
    /** 图标尺寸 */
    iconSize?: number
    /** 标题文案 */
    title?: string
    /** 描述文案 */
    description?: string
    /** 紧凑空态，减少留白 */
    compact?: boolean
    /** 操作按钮文案（无 default slot 时显示） */
    actionText?: string
  }>(),
  {
    compact: false,
  },
)

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div :class="[$style.empty, compact && $style.compact]">
    <div v-if="icon" :class="$style.icon">
      <AppIcon :name="icon" :size="iconSize ?? (compact ? 48 : 64)" />
    </div>
    <h2 v-if="title" :class="$style.title">{{ title }}</h2>
    <p v-if="description" :class="$style.desc">{{ description }}</p>
    <div v-if="$slots.default || actionText" :class="$style.actions">
      <slot>
        <el-button v-if="actionText" type="primary" @click="emit('action')">
          {{ actionText }}
        </el-button>
      </slot>
    </div>
  </div>
</template>

<style module>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl, 64px) var(--spacing-lg, 24px);
  text-align: center;
}

.compact {
  padding: var(--spacing-sm, 8px) 0;
}

.icon {
  color: var(--text-color-placeholder, #969FA8);
  margin-bottom: var(--spacing-md, 16px);
}

.compact .icon {
  margin-bottom: var(--spacing-sm, 8px);
}

.title {
  margin: 0 0 var(--spacing-sm, 8px);
  font-size: var(--font-size-18, 18px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--text-color-primary, #333333);
}

.desc {
  margin: 0 0 var(--spacing-lg, 24px);
  font-size: var(--font-size-14, 14px);
  color: var(--text-color-secondary, #666666);
  max-width: 400px;
}

.compact .desc {
  margin-bottom: var(--spacing-sm, 8px);
}

.actions {
  display: flex;
  gap: var(--spacing-12px, 12px);
}
</style>
