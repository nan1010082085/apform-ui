<script setup lang="ts">
/**
 * Skeleton — 骨架屏
 *
 * 用于列表/卡片加载时的占位展示。
 * 支持 card（卡片）、list（列表）、table（表格）三种预设。
 *
 * 用法：
 *   <Skeleton variant="card" :count="3" />
 *   <Skeleton variant="list" :rows="5" />
 *   <Skeleton variant="table" :rows="8" />
 */
withDefaults(defineProps<{
  /** 骨架类型 */
  variant?: 'card' | 'list' | 'table'
  /** 数量（card/list 模式下的卡片/列表项数量） */
  count?: number
  /** 行数（table 模式下的行数） */
  rows?: number
  /** 是否开启动画（默认 true） */
  animated?: boolean
}>(), {
  variant: 'card',
  count: 3,
  rows: 5,
  animated: true,
})
</script>

<template>
  <div :class="[$style.skeleton, { [$style.animated]: animated }]">
    <!-- Card 骨架 -->
    <template v-if="variant === 'card'">
      <div v-for="i in count" :key="i" :class="$style.card">
        <div :class="$style.cardImage" />
        <div :class="$style.cardBody">
          <div :class="[$style.line, $style.lineTitle]" />
          <div :class="[$style.line, $style.lineText]" />
          <div :class="[$style.line, $style.lineTextShort]" />
        </div>
      </div>
    </template>

    <!-- List 骨架 -->
    <template v-if="variant === 'list'">
      <div v-for="i in count" :key="i" :class="$style.listItem">
        <div :class="$style.avatar" />
        <div :class="$style.listContent">
          <div :class="[$style.line, $style.lineTitle]" />
          <div :class="[$style.line, $style.lineText]" />
        </div>
      </div>
    </template>

    <!-- Table 骨架 -->
    <template v-if="variant === 'table'">
      <el-skeleton :rows="rows" animated />
    </template>
  </div>
</template>

<style module>
.skeleton {
  width: 100%;
}

.animated .cardImage,
.animated .line,
.animated .avatar {
  background: linear-gradient(90deg, var(--bg-color-gray, #f5f7fa) 25%, var(--bg-color-gray-light, #fafafa) 50%, var(--bg-color-gray, #f5f7fa) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Card */
.card {
  display: inline-block;
  width: calc(33.333% - 12px);
  margin: 6px;
  border-radius: var(--border-radius-md, 4px);
  overflow: hidden;
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebedf3);
}

.cardImage {
  width: 100%;
  height: 160px;
  background: var(--bg-color-gray, #f5f7fa);
}

.cardBody {
  padding: var(--spacing-md, 16px);
}

/* List */
.listItem {
  display: flex;
  align-items: center;
  gap: var(--spacing-md, 16px);
  padding: var(--spacing-md, 16px);
  border-bottom: 1px solid var(--border-color-light, #ebedf3);
}

.avatar {
  width: var(--avatar-size-lg, 40px);
  height: var(--avatar-size-lg, 40px);
  border-radius: 50%;
  background: var(--bg-color-gray, #f5f7fa);
  flex-shrink: 0;
}

.listContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 8px);
}

/* Lines */
.line {
  height: var(--icon-size-sm, 14px);
  border-radius: var(--border-radius-md, 4px);
  background: var(--bg-color-gray, #f5f7fa);
}

.lineTitle {
  width: 40%;
  height: var(--icon-size-md, 16px);
}

.lineText {
  width: 100%;
}

.lineTextShort {
  width: 60%;
}
</style>
