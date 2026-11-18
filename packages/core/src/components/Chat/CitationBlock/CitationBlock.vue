<script setup lang="ts">
/**
 * CitationBlock — 专家回答引用块（纯 props）
 *
 * 对齐法律「法规全称 + 条号 + 时效」与医疗「指南/说明书出处」展示契约；
 * 不解析模型正文，由业务传入结构化 items。
 */
import type { CitationItem } from './types'

withDefaults(
  defineProps<{
    /** 引用列表 */
    items: CitationItem[]
    /** 区块标题 */
    heading?: string
    /** 紧凑模式（用户气泡上的引用 chip） */
    dense?: boolean
  }>(),
  {
    heading: '依据与出处',
    dense: false,
  },
)
</script>

<template>
  <section
    v-if="items.length"
    class="apf-citation-block"
    :class="{ 'apf-citation-block--dense': dense }"
    :aria-label="heading"
  >
    <header v-if="!dense" class="apf-citation-block__heading">{{ heading }}</header>
    <ul class="apf-citation-block__list">
      <li v-for="(item, idx) in items" :key="item.id || `${item.title}-${idx}`" class="apf-citation-block__item">
        <div class="apf-citation-block__title-row">
          <span class="apf-citation-block__title">{{ item.title }}</span>
          <span v-if="item.subtitle" class="apf-citation-block__subtitle">{{ item.subtitle }}</span>
          <span v-if="item.status" class="apf-citation-block__status">{{ item.status }}</span>
        </div>
        <p v-if="item.excerpt && !dense" class="apf-citation-block__excerpt">{{ item.excerpt }}</p>
        <a
          v-if="item.url"
          class="apf-citation-block__link"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
        >官方来源</a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.apf-citation-block {
  margin-top: var(--spacing-sm, 8px);
  padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
  border: 1px solid var(--border-color, #e4e7ed);
  border-radius: var(--border-radius-base, 4px);
  background: var(--fill-color-blank, #fafafa);
  font-size: var(--font-size-12, 12px);
  color: var(--text-color-regular, #606266);
}

.apf-citation-block--dense {
  margin-top: 6px;
  padding: 4px 0;
  border: none;
  background: transparent;
}

.apf-citation-block__heading {
  font-weight: 600;
  color: var(--text-color-primary, #303133);
  margin-bottom: 6px;
}

.apf-citation-block__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.apf-citation-block--dense .apf-citation-block__list {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
}

.apf-citation-block__title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
}

.apf-citation-block__title {
  font-weight: 600;
  color: var(--text-color-primary, #303133);
}

.apf-citation-block__subtitle {
  color: var(--color-primary, #0060a2);
}

.apf-citation-block__status {
  padding: 0 6px;
  border-radius: 999px;
  background: var(--color-primary-light-9, #ecf5ff);
  color: var(--color-primary, #0060a2);
  font-size: 11px;
}

.apf-citation-block--dense .apf-citation-block__item {
  padding: 2px 8px;
  border: 1px solid var(--border-color, #e4e7ed);
  border-radius: 999px;
  background: var(--fill-color-blank, #fff);
}

.apf-citation-block__excerpt {
  margin: 4px 0 0;
  line-height: 1.5;
  color: var(--text-color-secondary, #909399);
  white-space: pre-wrap;
}

.apf-citation-block__link {
  display: inline-block;
  margin-top: 4px;
  color: var(--color-primary, #0060a2);
  text-decoration: none;
}

.apf-citation-block__link:hover {
  text-decoration: underline;
}
</style>
