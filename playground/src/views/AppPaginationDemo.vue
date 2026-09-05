<script setup lang="ts">
/**
 * AppPagination 文档示例 — 仅展示组件真实支持的 API
 *
 * 组件固定 layout（total, sizes, prev, pager, next）与 background；
 * 不支持 layout / background / small 透传属性。
 */
import { ref } from 'vue'
import { AppPagination } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const smallPage = ref(1)

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
import { AppPagination } from '@apform-ui/core'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
<\/script>

<template>
  <AppPagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
  />
</template>`

const smallSource = `<template>
  <AppPagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    size="small"
  />
</template>`

const emptySource = `<template>
  <!-- total 为 0 时不渲染 -->
  <AppPagination :current-page="1" :total="0" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="统一分页器：共 N 条、每页条数、上一页 / 页码 / 下一页。layout 与背景色由组件固定，保证全站一致。"
      :source="basicSource"
    >
      <p class="meta">
        当前第 {{ currentPage }} 页 · 每页 {{ pageSize }} 条 · 共 {{ total }} 条
      </p>
      <div class="pagers">
        <AppPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
        />
      </div>
    </DemoBlock>

    <DemoBlock
      title="紧凑尺寸"
      description="size=&quot;small&quot; 用于弹窗、侧栏等空间有限场景。"
      :source="smallSource"
    >
      <div class="pagers">
        <AppPagination
          v-model:current-page="smallPage"
          v-model:page-size="pageSize"
          :total="total"
          size="small"
        />
      </div>
    </DemoBlock>

    <DemoBlock
      title="无数据时隐藏"
      description="total === 0 时组件不渲染，避免空列表仍显示分页。"
      :source="emptySource"
    >
      <AppPagination :current-page="1" :total="0" />
      <p class="meta muted">上方无分页器（total=0）</p>
    </DemoBlock>
  </div>
</template>

<style scoped>
.meta {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--docs-regular, #606266);
}

.muted {
  color: var(--docs-muted, #909399);
}

.pagers {
  width: 100%;
}

.pagers :deep([data-testid='app-pagination']) {
  justify-content: flex-start;
  margin-top: 0;
  padding-bottom: 0;
}
</style>
