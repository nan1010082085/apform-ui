<script setup lang="ts">
/**
 * GeneratingPlaceholder — 对话气泡「生成中」占位
 *
 * 用于 RUNNING 且尚无真实结果时，避免把进度文案当正文展示。
 * variant=image：图片比例 shimmer 框 + 状态行
 * variant=text|generic：骨架行 + 状态行
 */
import { computed } from 'vue'
import type { GeneratingPlaceholderVariant } from './types'

const props = withDefaults(
  defineProps<{
    /** 占位形态 */
    variant?: GeneratingPlaceholderVariant
    /** 主状态文案 */
    label?: string
    /** 副文案 */
    detail?: string
    /** 出图数量提示 */
    count?: number
    /** 图片占位宽高比 */
    aspectRatio?: string
  }>(),
  {
    variant: 'generic',
    label: '正在生成…',
    aspectRatio: '4 / 3',
  },
)

/** 框内提示：有 count 时展示张数 */
const imageHint = computed(() => {
  if (props.count && props.count > 1) return `生成 ${props.count} 张…`
  return props.label || '正在生成图像…'
})
</script>

<template>
  <div
    class="apf-gen-ph"
    :class="`apf-gen-ph--${variant}`"
    role="status"
    aria-live="polite"
    :aria-label="label"
  >
    <div
      v-if="variant === 'image'"
      class="apf-gen-ph__frame"
      :style="{ aspectRatio }"
    >
      <div class="apf-gen-ph__wash" aria-hidden="true" />
      <div class="apf-gen-ph__shimmer" aria-hidden="true" />
      <div class="apf-gen-ph__frame-meta">
        <span class="apf-gen-ph__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none">
            <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.6" />
            <circle cx="9" cy="10" r="1.8" fill="currentColor" />
            <path d="M4.5 16.5 9 12l3 2.5 3.5-4 4 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="apf-gen-ph__frame-label">{{ imageHint }}</span>
      </div>
    </div>

    <div v-else class="apf-gen-ph__lines" aria-hidden="true">
      <i class="apf-gen-ph__line" style="width: 72%" />
      <i class="apf-gen-ph__line" style="width: 54%" />
      <i v-if="variant === 'text'" class="apf-gen-ph__line" style="width: 40%" />
    </div>

    <div class="apf-gen-ph__status">
      <span class="apf-gen-ph__label">{{ label }}</span>
      <span class="apf-gen-ph__dots" aria-hidden="true"><i /><i /><i /></span>
      <span v-if="detail" class="apf-gen-ph__detail">{{ detail }}</span>
    </div>
  </div>
</template>

<style scoped>
.apf-gen-ph {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: min(320px, 100%);
  color: var(--apf-color-text-secondary, var(--text-color-secondary, #606266));
}

.apf-gen-ph--text,
.apf-gen-ph--generic {
  width: min(420px, 100%);
}

.apf-gen-ph__frame {
  position: relative;
  width: 100%;
  min-height: 200px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--apf-color-primary, #409eff) 22%, var(--apf-color-border, #e4e7ed));
  background: var(--apf-color-bg, var(--bg-color-page, #f0f3f8));
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--apf-color-primary, #409eff) 28%, transparent);
  animation: apf-gen-ph-pulse 2s ease-in-out infinite;
}

.apf-gen-ph__wash {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 80% at 20% 0%, color-mix(in srgb, var(--apf-color-primary, #409eff) 14%, transparent), transparent 55%),
    radial-gradient(100% 70% at 90% 100%, color-mix(in srgb, var(--apf-color-primary, #409eff) 10%, transparent), transparent 50%);
}

.apf-gen-ph__shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 28%,
    rgba(255, 255, 255, 0.72) 48%,
    transparent 68%
  );
  background-size: 220% 100%;
  animation: apf-gen-ph-shimmer 1.2s ease-in-out infinite;
}

.apf-gen-ph__frame-meta {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 1;
  color: var(--apf-color-primary, var(--color-primary, #409eff));
}

.apf-gen-ph__icon {
  display: inline-flex;
  opacity: 0.85;
  animation: apf-gen-ph-float 2.4s ease-in-out infinite;
}

.apf-gen-ph__frame-label {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--apf-color-text-secondary, #5b6b6f);
}

.apf-gen-ph__lines {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 4px 0;
}

.apf-gen-ph__line {
  display: block;
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--apf-color-border, #e4e7ed) 25%,
    #f2f4f7 40%,
    var(--apf-color-border, #e4e7ed) 55%
  );
  background-size: 400% 100%;
  animation: apf-gen-ph-line 1.35s ease infinite;
}

.apf-gen-ph__status {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px 8px;
  font-size: 13px;
  line-height: 1.4;
}

.apf-gen-ph__label {
  color: var(--apf-color-text-secondary, var(--text-color-regular, #606266));
}

.apf-gen-ph__detail {
  color: var(--apf-color-primary, var(--color-primary, #409eff));
  font-size: 12px;
}

.apf-gen-ph__dots {
  display: inline-flex;
  gap: 4px;
}

.apf-gen-ph__dots i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--apf-color-primary, var(--color-primary, #409eff));
  animation: apf-gen-ph-blink 1.2s infinite both;
}

.apf-gen-ph__dots i:nth-child(2) {
  animation-delay: 0.18s;
}

.apf-gen-ph__dots i:nth-child(3) {
  animation-delay: 0.36s;
}

@keyframes apf-gen-ph-shimmer {
  0% { background-position: 130% 0; }
  100% { background-position: -30% 0; }
}

@keyframes apf-gen-ph-line {
  0% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}

@keyframes apf-gen-ph-blink {
  0%, 80%, 100% { opacity: 0.28; transform: scale(0.85); }
  40% { opacity: 1; transform: scale(1); }
}

@keyframes apf-gen-ph-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--apf-color-primary, #409eff) 0%, transparent);
  }
  50% {
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--apf-color-primary, #409eff) 16%, transparent);
  }
}

@keyframes apf-gen-ph-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@media (prefers-reduced-motion: reduce) {
  .apf-gen-ph__shimmer,
  .apf-gen-ph__line,
  .apf-gen-ph__dots i,
  .apf-gen-ph__frame,
  .apf-gen-ph__icon {
    animation: none;
  }
  .apf-gen-ph__shimmer {
    opacity: 0.35;
  }
  .apf-gen-ph__dots i {
    opacity: 0.65;
  }
}
</style>
