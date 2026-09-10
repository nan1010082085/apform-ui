<script setup lang="ts">
/**
 * FlowPreviewShell — 流程预览卡片壳
 *
 * 提供 header / badge / fit 按钮 / actions，不依赖 VueFlow。
 * 画布内容由 default slot 注入（业务侧可放 VueFlow）。
 */
import { AppIcon } from '../../AppIcon'
import type { FlowPreviewShellProps } from './types'

withDefaults(defineProps<FlowPreviewShellProps>(), {
  compact: false,
  showFitButton: true,
})

const emit = defineEmits<{
  'primary-action': []
  'secondary-action': []
  'fit-view': []
}>()
</script>

<template>
  <div :class="[$style.card, { [$style.compact]: compact }]">
    <div :class="$style.head">
      <div :class="$style.headLeft">
        <div :class="$style.headIcon">
          <slot name="icon">
            <AppIcon name="connection" :size="14" />
          </slot>
        </div>
        <span :class="$style.title">{{ title }}</span>
      </div>
      <div :class="$style.headRight">
        <span v-if="badge" :class="$style.badge">{{ badge }}</span>
        <button
          v-if="showFitButton"
          type="button"
          :class="$style.fitBtn"
          title="适配画布"
          @click="emit('fit-view')"
        >
          <AppIcon name="full-screen" />
        </button>
      </div>
    </div>

    <div :class="$style.canvasWrapper">
      <slot />
    </div>

    <div v-if="primaryAction || secondaryAction" :class="$style.actions">
      <button
        v-if="secondaryAction"
        type="button"
        :class="$style.btnGhost"
        @click="emit('secondary-action')"
      >
        <AppIcon name="edit" :size="12" />
        {{ secondaryAction }}
      </button>
      <button
        v-if="primaryAction"
        type="button"
        :class="$style.btnPrimary"
        @click="emit('primary-action')"
      >
        <AppIcon name="check" :size="12" />
        {{ primaryAction }}
      </button>
    </div>
  </div>
</template>

<style module src="./FlowPreviewShell.module.scss" />
