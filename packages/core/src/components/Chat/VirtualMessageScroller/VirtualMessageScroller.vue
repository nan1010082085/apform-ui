<script setup lang="ts">
/**
 * VirtualMessageScroller — 虚拟滚动消息列表体（纯 UI）
 *
 * 需 peer：vue-virtual-scroller。业务通过 #default 注入单条消息渲染。
 */
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

withDefaults(
  defineProps<{
    items: Array<Record<string, unknown>>
    /** 条目主键字段 */
    keyField?: string
    minItemSize?: number
    /** 传给 DynamicScrollerItem 的 sizeDependencies（按 item 计算） */
    sizeDependencies?: (item: Record<string, unknown>) => unknown[]
  }>(),
  {
    keyField: 'key',
    minItemSize: 72,
  },
)

const emit = defineEmits<{
  scroll: [event: Event]
}>()
</script>

<template>
  <DynamicScroller
    :items="items"
    :min-item-size="minItemSize"
    :key-field="keyField"
    class="apf-virtual-message-scroller"
    @scroll="emit('scroll', $event)"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :data-index="index"
        :size-dependencies="sizeDependencies ? sizeDependencies(item) : undefined"
      >
        <slot :item="item" :index="index" :active="active" />
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>

<style scoped>
.apf-virtual-message-scroller {
  height: 100%;
}
</style>
