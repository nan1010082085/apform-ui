<script setup lang="ts">
/**
 * SliderCaptcha — 拼图滑块验证码（纯 UI）
 *
 * 必须通过 fetchCaptcha 注入拉取逻辑，不内置 apiClient。
 */
import { computed, onMounted, ref } from 'vue'
import { AppIcon } from '../AppIcon'
import type { CaptchaPayload, SliderCaptchaValue } from './types'

export type { CaptchaPayload, SliderCaptchaValue }

const BG_WIDTH = 320
const SLIDER_SIZE = 48

const props = withDefaults(
  defineProps<{
    modelValue?: SliderCaptchaValue
    /** 拉取验证码（宿主注入） */
    fetchCaptcha: () => Promise<CaptchaPayload>
  }>(),
  {
    modelValue: () => ({ captchaId: '', captchaX: 0, verified: false }),
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: SliderCaptchaValue]
}>()

const loading = ref(false)
const loadError = ref<string | null>(null)
const captcha = ref<CaptchaPayload | null>(null)
const offsetX = ref(0)
const dragging = ref(false)
const verified = ref(false)
const shake = ref(false)
const startClientX = ref(0)
const startOffsetX = ref(0)

const maxOffset = computed(() => BG_WIDTH - SLIDER_SIZE)

/**
 * 向外同步 v-model
 * @param partial 覆盖字段
 */
function emitValue(partial?: Partial<SliderCaptchaValue>): void {
  emit('update:modelValue', {
    captchaId: captcha.value?.captchaId ?? '',
    captchaX: offsetX.value,
    verified: verified.value,
    ...partial,
  })
}

/** 拉取新验证码 */
async function refresh(): Promise<void> {
  loading.value = true
  loadError.value = null
  verified.value = false
  offsetX.value = 0
  captcha.value = null
  emitValue({ captchaId: '', captchaX: 0, verified: false })

  try {
    const data = await props.fetchCaptcha()
    captcha.value = data
    emitValue({ captchaId: data.captchaId, captchaX: 0, verified: false })
  } catch (e: unknown) {
    loadError.value = e instanceof Error ? e.message : '验证码加载失败'
  } finally {
    loading.value = false
  }
}

function clamp(n: number): number {
  return Math.max(0, Math.min(maxOffset.value, n))
}

function onPointerDown(e: PointerEvent): void {
  if (verified.value || !captcha.value || loading.value) return
  dragging.value = true
  startClientX.value = e.clientX
  startOffsetX.value = offsetX.value
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent): void {
  if (!dragging.value) return
  offsetX.value = clamp(startOffsetX.value + (e.clientX - startClientX.value))
}

function onPointerUp(): void {
  if (!dragging.value) return
  dragging.value = false
  verified.value = offsetX.value > 10
  emitValue({
    captchaId: captcha.value?.captchaId ?? '',
    captchaX: Math.round(offsetX.value),
    verified: verified.value,
  })
  if (!verified.value) {
    shake.value = true
    window.setTimeout(() => {
      shake.value = false
    }, 400)
  }
}

/** 失败后抖动并刷新 */
async function failAndRefresh(): Promise<void> {
  shake.value = true
  window.setTimeout(() => {
    shake.value = false
  }, 400)
  await refresh()
}

onMounted(() => {
  void refresh()
})

defineExpose({
  refresh,
  failAndRefresh,
  getValue: (): SliderCaptchaValue => ({
    captchaId: captcha.value?.captchaId ?? '',
    captchaX: Math.round(offsetX.value),
    verified: verified.value,
  }),
})
</script>

<template>
  <div class="apf-slider-captcha" :class="{ 'apf-slider-captcha--shake': shake }">
    <div class="apf-slider-captcha__panel">
      <div v-if="loading" class="apf-slider-captcha__placeholder">加载验证码…</div>
      <div v-else-if="loadError" class="apf-slider-captcha__placeholder">
        <span>{{ loadError }}</span>
        <button type="button" class="apf-slider-captcha__link" @click="refresh">重试</button>
      </div>
      <div
        v-else-if="captcha"
        class="apf-slider-captcha__stage"
        :style="{ width: `${BG_WIDTH}px` }"
      >
        <img :src="captcha.backgroundImage" alt="" class="apf-slider-captcha__bg" draggable="false" />
        <img
          :src="captcha.sliderImage"
          alt=""
          class="apf-slider-captcha__piece"
          :style="{ top: `${captcha.sliderY}px`, left: `${offsetX}px` }"
          draggable="false"
        />
        <button
          type="button"
          class="apf-slider-captcha__refresh"
          title="刷新验证码"
          aria-label="刷新验证码"
          @click="refresh"
        >
          <AppIcon name="refresh-right" :size="14" />
        </button>
      </div>
    </div>

    <div
      class="apf-slider-captcha__track"
      :class="{
        'apf-slider-captcha__track--ok': verified,
        'apf-slider-captcha__track--active': dragging,
      }"
    >
      <div
        class="apf-slider-captcha__fill"
        :style="{ width: `${offsetX + SLIDER_SIZE / 2}px` }"
      />
      <span v-if="!verified && offsetX < 8" class="apf-slider-captcha__hint">向右拖动滑块完成验证</span>
      <span v-else-if="verified" class="apf-slider-captcha__ok">已完成，提交时校验</span>
      <div
        class="apf-slider-captcha__knob"
        :class="{ 'apf-slider-captcha__knob--ok': verified }"
        :style="{ left: `${offsetX}px` }"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
      >
        <AppIcon :name="verified ? 'check' : 'arrow-right'" :size="14" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.apf-slider-captcha {
  width: 100%;
  max-width: 320px;
  user-select: none;
}
.apf-slider-captcha--shake {
  animation: apf-captcha-shake 0.4s ease;
}
@keyframes apf-captcha-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}
.apf-slider-captcha__panel {
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(145deg, #e8eef5 0%, #dce6f2 100%);
  border: 1px solid rgba(15, 35, 70, 0.1);
}
.apf-slider-captcha__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
  font-size: 13px;
  color: #6b7c93;
}
.apf-slider-captcha__link {
  border: none;
  background: transparent;
  color: #3b82f6;
  cursor: pointer;
}
.apf-slider-captcha__stage {
  position: relative;
  height: 160px;
  margin: 0 auto;
}
.apf-slider-captcha__bg {
  display: block;
  width: 100%;
  height: 160px;
  pointer-events: none;
}
.apf-slider-captcha__piece {
  position: absolute;
  width: 48px;
  height: 48px;
  pointer-events: none;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.45));
}
.apf-slider-captcha__refresh {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.88);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.apf-slider-captcha__track {
  position: relative;
  margin-top: 12px;
  height: 40px;
  border-radius: 20px;
  background: #eef2f7;
  overflow: hidden;
}
.apf-slider-captcha__track--ok {
  background: #e8f8ef;
}
.apf-slider-captcha__fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: rgba(59, 130, 246, 0.25);
}
.apf-slider-captcha__hint,
.apf-slider-captcha__ok {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 12px;
  color: #6b7c93;
  pointer-events: none;
}
.apf-slider-captcha__ok {
  color: #16a34a;
}
.apf-slider-captcha__knob {
  position: absolute;
  top: 2px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(15, 35, 70, 0.2);
  display: grid;
  place-items: center;
  cursor: grab;
  touch-action: none;
}
.apf-slider-captcha__knob--ok {
  color: #16a34a;
}
</style>
