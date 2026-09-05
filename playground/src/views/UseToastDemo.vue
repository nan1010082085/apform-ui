<script setup lang="ts">
/**
 * useToast 文档示例 — provide 在父级，调用在子级
 */
import { defineComponent, h, provide, ref } from 'vue'
import { Toast, provideToast, useToast } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const toastRef = ref<{ show: (m: string, t?: string, d?: number) => void }>()
const injection = provideToast(toastRef as never)
for (const key of Reflect.ownKeys(injection)) {
  provide(key as symbol, injection[key as keyof typeof injection])
}

const ToastActions = defineComponent({
  name: 'ToastActions',
  setup() {
    const toast = useToast()
    return () =>
      h('div', { class: 'actions' }, [
        h('button', { type: 'button', onClick: () => toast.success('保存成功') }, 'success'),
        h('button', { type: 'button', onClick: () => toast.error('操作失败') }, 'error'),
        h('button', { type: 'button', onClick: () => toast.warning('请注意') }, 'warning'),
        h('button', { type: 'button', onClick: () => toast.info('提示信息') }, 'info'),
      ])
  },
})

const source = `<script setup lang="ts">
import { ref, provide } from 'vue'
import { Toast, provideToast, useToast } from '@apform-ui/core'

const toastRef = ref()
const injection = provideToast(toastRef)
for (const key of Reflect.ownKeys(injection)) {
  provide(key, injection[key])
}
\/\/ 在子组件中：const toast = useToast()
<\/script>

<template>
  <Toast ref="toastRef" />
  <button @click="toast.success('保存成功')">success</button>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="根级放置 Toast 并 provideToast；在子组件中调用 useToast()。"
      :source="source"
    >
      <Toast ref="toastRef" />
      <ToastActions />
    </DemoBlock>
  </div>
</template>

<style scoped>
:deep(.actions) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

:deep(.actions button) {
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
}

:deep(.actions button:hover) {
  color: #0060a2;
  border-color: #c6e2ff;
}
</style>
