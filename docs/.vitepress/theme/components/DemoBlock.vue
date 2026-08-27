<script setup lang="ts">
/**
 * DemoBlock — 交互式组件演示容器
 *
 * 用法（在 markdown 中）：
 *   <DemoBlock demo="AppDialogBasic" />
 *
 * demo 属性对应 examples/ 目录下的 .vue 文件名（PascalCase）
 */
import { ref, computed, defineAsyncComponent } from 'vue'

const props = defineProps<{
  /** demo 文件名（PascalCase，不含 .vue 后缀），对应 examples/ 目录 */
  demo: string
  /** 是否默认展开代码（默认 false） */
  expand?: boolean
}>()

const showCode = ref(props.expand ?? false)

// 静态注册所有 demo 组件（SSR 兼容）
const demoComponents: Record<string, () => Promise<unknown>> = {
  AppDialogBasic: () => import('../../../examples/AppDialogBasic.vue'),
  AppDialogFullscreen: () => import('../../../examples/AppDialogFullscreen.vue'),
  AppDialogCustomFooter: () => import('../../../examples/AppDialogCustomFooter.vue'),
  AppIconBasic: () => import('../../../examples/AppIconBasic.vue'),
  AppIconSizes: () => import('../../../examples/AppIconSizes.vue'),
  ToastBasic: () => import('../../../examples/ToastBasic.vue'),
  ConfirmDialogBasic: () => import('../../../examples/ConfirmDialogBasic.vue'),
  FormDialogBasic: () => import('../../../examples/FormDialogBasic.vue'),
  FilterTabsBasic: () => import('../../../examples/FilterTabsBasic.vue'),
  EmptyStateBasic: () => import('../../../examples/EmptyStateBasic.vue'),
  AppPaginationBasic: () => import('../../../examples/AppPaginationBasic.vue'),
  ErrorBoundaryBasic: () => import('../../../examples/ErrorBoundaryBasic.vue'),
  UseConfirmBasic: () => import('../../../examples/UseConfirmBasic.vue'),
  UseMessageBasic: () => import('../../../examples/UseMessageBasic.vue'),
  StatusTagBasic: () => import('../../../examples/StatusTagBasic.vue'),
  SkeletonBasic: () => import('../../../examples/SkeletonBasic.vue'),
  CardGridSkeletonBasic: () => import('../../../examples/CardGridSkeletonBasic.vue'),
  UserAvatarBasic: () => import('../../../examples/UserAvatarBasic.vue'),
  UseDebounceFnBasic: () => import('../../../examples/UseDebounceFnBasic.vue'),
  ResolveApiErrorMessageBasic: () => import('../../../examples/ResolveApiErrorMessageBasic.vue'),
}

const DemoComponent = computed(() => {
  const loader = demoComponents[props.demo]
  if (!loader) {
    console.warn(`[DemoBlock] 未找到 demo: ${props.demo}`)
    return null
  }
  return defineAsyncComponent(loader)
})

// 源码导入（静态 map，SSR 兼容）
const sourceModules: Record<string, () => Promise<string>> = {
  AppDialogBasic: () => import('../../../examples/AppDialogBasic.vue?raw').then(m => m.default),
  AppDialogFullscreen: () => import('../../../examples/AppDialogFullscreen.vue?raw').then(m => m.default),
  AppDialogCustomFooter: () => import('../../../examples/AppDialogCustomFooter.vue?raw').then(m => m.default),
  AppIconBasic: () => import('../../../examples/AppIconBasic.vue?raw').then(m => m.default),
  AppIconSizes: () => import('../../../examples/AppIconSizes.vue?raw').then(m => m.default),
  ToastBasic: () => import('../../../examples/ToastBasic.vue?raw').then(m => m.default),
  ConfirmDialogBasic: () => import('../../../examples/ConfirmDialogBasic.vue?raw').then(m => m.default),
  FormDialogBasic: () => import('../../../examples/FormDialogBasic.vue?raw').then(m => m.default),
  FilterTabsBasic: () => import('../../../examples/FilterTabsBasic.vue?raw').then(m => m.default),
  EmptyStateBasic: () => import('../../../examples/EmptyStateBasic.vue?raw').then(m => m.default),
  AppPaginationBasic: () => import('../../../examples/AppPaginationBasic.vue?raw').then(m => m.default),
  ErrorBoundaryBasic: () => import('../../../examples/ErrorBoundaryBasic.vue?raw').then(m => m.default),
  UseConfirmBasic: () => import('../../../examples/UseConfirmBasic.vue?raw').then(m => m.default),
  UseMessageBasic: () => import('../../../examples/UseMessageBasic.vue?raw').then(m => m.default),
  StatusTagBasic: () => import('../../../examples/StatusTagBasic.vue?raw').then(m => m.default),
  SkeletonBasic: () => import('../../../examples/SkeletonBasic.vue?raw').then(m => m.default),
  CardGridSkeletonBasic: () => import('../../../examples/CardGridSkeletonBasic.vue?raw').then(m => m.default),
  UserAvatarBasic: () => import('../../../examples/UserAvatarBasic.vue?raw').then(m => m.default),
  UseDebounceFnBasic: () => import('../../../examples/UseDebounceFnBasic.vue?raw').then(m => m.default),
  ResolveApiErrorMessageBasic: () => import('../../../examples/ResolveApiErrorMessageBasic.vue?raw').then(m => m.default),
}

const sourceCode = ref('')
const sourceLoader = sourceModules[props.demo]
if (sourceLoader) {
  sourceLoader().then((code) => {
    sourceCode.value = code
  })
}

function toggleCode() {
  showCode.value = !showCode.value
}

function copyCode() {
  navigator.clipboard.writeText(sourceCode.value)
}
</script>

<template>
  <div :class="$style.demo">
    <!-- 实时渲染区 -->
    <div :class="$style.preview">
      <Suspense>
        <template #default>
          <component v-if="DemoComponent" :is="DemoComponent" />
          <div v-else :class="$style.error">Demo "{{ demo }}" not found</div>
        </template>
        <template #fallback>
          <div :class="$style.loading">Loading...</div>
        </template>
      </Suspense>
    </div>

    <!-- 操作栏 -->
    <div :class="$style.actions">
      <button :class="$style.actionBtn" @click="copyCode" title="复制代码">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <span>复制</span>
      </button>
      <button :class="$style.actionBtn" @click="toggleCode">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
        <span>{{ showCode ? '隐藏代码' : '查看代码' }}</span>
      </button>
    </div>

    <!-- 源码区 -->
    <Transition name="code-slide">
      <div v-if="showCode" :class="$style.code">
        <div :class="$style.codeInner">
          <pre><code>{{ sourceCode }}</code></pre>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style module>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.preview {
  padding: 24px;
  min-height: 80px;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-size: 14px;
  padding: 20px;
}

.error {
  color: var(--vp-c-danger-1);
  font-size: 14px;
  padding: 20px;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 16px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.actionBtn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.actionBtn:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft-down);
}

.code {
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.codeInner {
  padding: 16px;
  overflow-x: auto;
}

.codeInner pre {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
}

.codeInner code {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2);
}
</style>

<style>
.code-slide-enter-active,
.code-slide-leave-active {
  transition: all 0.3s ease;
  max-height: 2000px;
}

.code-slide-enter-from,
.code-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
