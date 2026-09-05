<script setup lang="ts">
/**
 * AppDialog 文档示例 — 确定/取消需由宿主关闭（或监听 confirm）
 */
import { ref } from 'vue'
import { AppDialog } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basic = ref(false)
const drag = ref(false)
const full = ref(false)
const lastAction = ref('')

/**
 * @param which 哪个示例
 */
function onConfirm(which: 'basic' | 'drag' | 'full') {
  lastAction.value = `${which}:confirm`
  if (which === 'basic') basic.value = false
  if (which === 'drag') drag.value = false
  if (which === 'full') full.value = false
}

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
import { AppDialog } from '@apform-ui/core'

const visible = ref(false)
function onConfirm() {
  // 业务处理…
  visible.value = false
}
<\/script>

<template>
  <el-button @click="visible = true">打开弹框</el-button>
  <AppDialog v-model="visible" title="基础弹框" @confirm="onConfirm">
    <p>这是弹框内容。</p>
  </AppDialog>
</template>`

const dragSource = `<template>
  <AppDialog v-model="visible" title="可拖拽弹框" draggable @confirm="visible = false">
    <p>拖拽标题栏可移动。</p>
  </AppDialog>
</template>`

const fullSource = `<template>
  <AppDialog
    v-model="visible"
    title="全屏弹框"
    :show-fullscreen-btn="true"
    @confirm="visible = false"
  >
    <p>点击标题栏全屏按钮切换。</p>
  </AppDialog>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="使用 v-model 控制显示。点击「确定」会触发 confirm，需由宿主关闭（组件本身不自动关）。"
      :source="basicSource"
    >
      <el-button type="primary" @click="basic = true">打开弹框</el-button>
      <p v-if="lastAction" class="hint">最近事件：{{ lastAction }}</p>
      <AppDialog v-model="basic" title="基础弹框" @confirm="onConfirm('basic')">
        <p>这是一个基础弹框的内容。点「确定」会关闭并记录事件。</p>
      </AppDialog>
    </DemoBlock>

    <DemoBlock
      title="可拖拽"
      description="默认开启 draggable，可通过标题栏拖动弹框位置。"
      :source="dragSource"
    >
      <el-button @click="drag = true">打开可拖拽弹框</el-button>
      <AppDialog v-model="drag" title="可拖拽弹框" draggable @confirm="onConfirm('drag')">
        <p>这个弹框可以拖拽移动。</p>
      </AppDialog>
    </DemoBlock>

    <DemoBlock
      title="全屏"
      description="标题栏提供全屏按钮（showFullscreenBtn），可切换全屏展示。"
      :source="fullSource"
    >
      <el-button @click="full = true">打开全屏弹框</el-button>
      <AppDialog
        v-model="full"
        title="全屏弹框"
        :show-fullscreen-btn="true"
        @confirm="onConfirm('full')"
      >
        <p>点击标题栏全屏按钮切换全屏。</p>
      </AppDialog>
    </DemoBlock>
  </div>
</template>

<style scoped>
.hint {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--docs-muted, #909399);
}
</style>
