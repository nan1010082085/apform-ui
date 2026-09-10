<script setup lang="ts">
/**
 * Model3dPreviewCard — 3D 模型预览卡片
 *
 * 使用 `<model-viewer>` Web Component；库本身不强制依赖 @google/model-viewer，
 * 运行时需业务侧自行注册（如 `import '@google/model-viewer'`）。
 */
import { ref, computed } from 'vue'
import { AppIcon } from '../../AppIcon'
import type { Model3dPreviewCardProps } from './types'

const props = defineProps<Model3dPreviewCardProps>()

const loaded = ref(false)
const error = ref<string | null>(null)

/** 根据文件扩展名推断格式徽章 */
const format = computed(() => {
  const ext = props.filename?.split('.').pop()?.toLowerCase() || ''
  if (['gltf', 'glb'].includes(ext)) return 'glTF'
  if (ext === 'obj') return 'OBJ'
  if (ext === 'stl') return 'STL'
  if (ext === 'fbx') return 'FBX'
  return '3D'
})

/** model-viewer 加载完成 */
function handleLoad() {
  loaded.value = true
  error.value = null
}

/** model-viewer 加载失败 */
function handleError() {
  error.value = '加载失败'
}
</script>

<template>
  <div class="apf-model3d">
    <div class="apf-model3d__header">
      <span class="apf-model3d__badge">{{ format }}</span>
      <span class="apf-model3d__filename">{{ filename || '3D 模型' }}</span>
    </div>
    <div class="apf-model3d__body">
      <model-viewer
        :src="url"
        :poster="poster"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        class="apf-model3d__viewer"
        @load="handleLoad"
        @error="handleError"
      >
        <div v-if="!loaded && !error" slot="poster" class="apf-model3d__hint">
          <AppIcon name="loading" :size="24" class="apf-model3d__spin" />
          <span>加载 3D 模型中...</span>
        </div>
        <div v-if="error" class="apf-model3d__hint is-error">
          <AppIcon name="warning-filled" :size="24" />
          <span>{{ error }}</span>
        </div>
      </model-viewer>
    </div>
    <div v-if="!error" class="apf-model3d__actions">
      <a class="apf-model3d__download" :href="url" download>
        <AppIcon name="download" :size="14" />
        下载
      </a>
    </div>
  </div>
</template>

<style scoped>
.apf-model3d {
  border: 1px solid var(--el-border-color-lighter, #ebeef5);
  border-radius: 8px;
  overflow: hidden;
  max-width: 480px;
  background: var(--el-bg-color, #fff);
}

.apf-model3d__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--el-fill-color-light, #f5f7fa);
  font-size: 13px;
}

.apf-model3d__badge {
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9, #ecf5ff);
  color: var(--el-color-primary, #409eff);
  font-size: 11px;
  font-weight: 600;
}

.apf-model3d__filename {
  color: var(--el-text-color-regular, #606266);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apf-model3d__body {
  position: relative;
}

.apf-model3d__viewer {
  width: 100%;
  height: 300px;
  background: #f5f5f5;
  border-radius: 8px;
  display: block;
}

.apf-model3d__hint {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--el-text-color-secondary, #909399);
  font-size: 13px;
}

.apf-model3d__hint.is-error {
  color: var(--el-color-danger, #f56c6c);
}

.apf-model3d__spin {
  animation: apf-model3d-spin 1s linear infinite;
}

@keyframes apf-model3d-spin {
  to { transform: rotate(360deg); }
}

.apf-model3d__actions {
  padding: 4px 12px 8px;
}

.apf-model3d__download {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--el-text-color-regular, #606266);
  text-decoration: none;
  cursor: pointer;
}

.apf-model3d__download:hover {
  color: var(--el-color-primary, #409eff);
}
</style>
