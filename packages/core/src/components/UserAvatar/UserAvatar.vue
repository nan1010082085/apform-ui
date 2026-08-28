<script setup lang="ts">
/**
 * UserAvatar — 用户头像
 *
 * 统一的用户头像组件，支持图片和首字母两种模式。
 * 跨 3 个项目存在 3 种不同的头像实现，此组件统一替代。
 *
 * 用法：
 *   <UserAvatar name="张三" />
 *   <UserAvatar name="张三" src="/avatar.png" />
 *   <UserAvatar name="张三" :size="40" />
 */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** 用户名（取首字母作为 fallback） */
  name?: string
  /** 头像图片 URL */
  src?: string
  /** 尺寸（px，默认 32 = `--avatar-size-md`） */
  size?: number
  /** 形状（默认 'circle'） */
  shape?: 'circle' | 'square'
}>(), {
  name: '',
  src: '',
  size: 32,
  shape: 'circle',
})

const initial = computed(() => {
  if (!props.name) return '?'
  return props.name.charAt(0).toUpperCase()
})

const showImage = computed(() => !!props.src)

const sizeStyle = computed(() => {
  /** 与 --avatar-size-* 对齐时优先走 CSS 变量 */
  const avatarVar =
    props.size === 24 ? 'var(--avatar-size-sm, 24px)'
      : props.size === 32 ? 'var(--avatar-size-md, 32px)'
        : props.size === 40 ? 'var(--avatar-size-lg, 40px)'
          : props.size === 48 ? 'var(--avatar-size-xl, 48px)'
            : `${props.size}px`
  return {
    width: avatarVar,
    height: avatarVar,
    fontSize: `${Math.max(props.size * 0.45, 12)}px`,
  }
})
</script>

<template>
  <div
    :class="[$style.avatar, shape === 'square' ? $style.square : $style.circle]"
    :style="sizeStyle"
  >
    <img
      v-if="showImage"
      :src="src"
      :alt="name"
      :class="$style.img"
      @error="$emit('error', $event)"
    />
    <span v-else :class="$style.initial">{{ initial }}</span>
  </div>
</template>

<script lang="ts">
export default { name: 'UserAvatar' }
</script>

<style module>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-primary, #0060A2), var(--color-primary-hover, #4581E9));
  color: #fff;
  font-weight: var(--font-weight-semibold, 600);
}

.circle {
  border-radius: 50%;
}

.square {
  border-radius: var(--border-radius-md, 4px);
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initial {
  user-select: none;
  line-height: 1;
}
</style>
