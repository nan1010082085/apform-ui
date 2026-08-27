<script setup lang="ts">
/**
 * DemoBlock — 交互式组件演示容器
 *
 * 用法（在 markdown 中）：
 *   <DemoBlock demo="AppDialogBasic" />
 */
import { ref, onMounted, shallowRef, type Component } from 'vue'

const props = defineProps<{
  /** demo 文件名（PascalCase，不含 .vue 后缀） */
  demo: string
  /** 是否默认展开代码（默认 false） */
  expand?: boolean
}>()

const showCode = ref(props.expand ?? false)
const DemoComponent = shallowRef<Component | null>(null)
const loaded = ref(false)

// demo 组件懒加载映射
const demoLoaders: Record<string, () => Promise<{ default: Component }>> = {
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

// 源码映射
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

onMounted(async () => {
  const loader = demoLoaders[props.demo]
  if (loader) {
    const mod = await loader()
    DemoComponent.value = mod.default
  }
  loaded.value = true

  const sourceLoader = sourceModules[props.demo]
  if (sourceLoader) {
    sourceCode.value = await sourceLoader()
  }
})

function toggleCode() { showCode.value = !showCode.value }
function copyCode() {
  navigator.clipboard.writeText(sourceCode.value)
  // 可以加一个复制成功提示
}
</script>

<template>
  <div class="demo-container">
    <!-- 预览区 -->
    <div class="demo-preview">
      <template v-if="loaded && DemoComponent">
        <component :is="DemoComponent" />
      </template>
      <div v-else class="demo-loading">加载中...</div>
    </div>

    <!-- 操作栏 -->
    <div class="demo-actions">
      <button class="demo-action-btn" @click="copyCode" title="复制代码">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        复制代码
      </button>
      <button class="demo-action-btn" @click="toggleCode">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
        {{ showCode ? '隐藏代码' : '查看代码' }}
      </button>
    </div>

    <!-- 代码区 -->
    <div v-show="showCode" class="demo-code">
      <div class="demo-code-inner">
        <div class="language-vue" :data-ext="'vue'">
          <pre><code>{{ sourceCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>
