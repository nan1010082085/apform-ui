<script setup lang="ts">
/**
 * CardGridSkeleton — 卡片网格骨架屏
 *
 * 用于卡片列表加载时的占位展示。
 * 跨 4 个项目存在完全相同的骨架屏 markup，此组件统一替代。
 *
 * 真实用法（来自 editor/flow/ai 项目）：
 *   <div class="skeleton">
 *     <div v-for="i in 6" :key="i" class="skeletonCard">
 *       <div class="skeletonThumb" />
 *       <div class="skeletonTitle" />
 *       <div class="skeletonText" />
 *     </div>
 *   </div>
 *
 * 用法：
 *   <CardGridSkeleton :count="6" />
 *   <CardGridSkeleton :count="3" :show-thumb="false" />
 */
withDefaults(defineProps<{
  /** 骨架卡片数量（默认 6） */
  count?: number
  /** 是否显示缩略图区域（默认 true） */
  showThumb?: boolean
  /** 是否开启动画（默认 true） */
  animated?: boolean
}>(), {
  count: 6,
  showThumb: true,
  animated: true,
})
</script>

<template>
  <div :class="[$style.grid, { [$style.animated]: animated }]">
    <div v-for="i in count" :key="i" :class="$style.card">
      <div v-if="showThumb" :class="$style.thumb" />
      <div :class="$style.body">
        <div :class="[$style.line, $style.title]" />
        <div :class="[$style.line, $style.text]" />
        <div :class="[$style.line, $style.textShort]" />
      </div>
    </div>
  </div>
</template>

<style module>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  padding: 16px 0;
}

.card {
  border-radius: var(--border-radius-md, 4px);
  overflow: hidden;
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebedf3);
}

.animated .thumb,
.animated .line {
  background: linear-gradient(
    90deg,
    var(--bg-color-gray, #f5f7fa) 25%,
    var(--bg-color-gray-light, #fafafa) 50%,
    var(--bg-color-gray, #f5f7fa) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.thumb {
  width: 100%;
  height: 140px;
  background: var(--bg-color-gray, #f5f7fa);
}

.body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.line {
  height: 14px;
  border-radius: 4px;
  background: var(--bg-color-gray, #f5f7fa);
}

.title {
  width: 50%;
  height: 16px;
}

.text {
  width: 100%;
}

.textShort {
  width: 70%;
}
</style>
