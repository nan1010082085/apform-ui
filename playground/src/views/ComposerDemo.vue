<script setup lang="ts">
/**
 * Composer 文档示例 — Element Plus 文档风格
 */
import { ref } from 'vue'
import { Composer } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const last = ref('')
const disabled = ref(false)

function onSend(content: string) {
  last.value = content
}

const basicSource = `<template>
  <Composer
    :disabled="false"
    placeholder="输入消息…"
    @send="onSend"
  />
</template>

<script setup lang="ts">
import { Composer } from '@apform-ui/core'
function onSend(content: string, attachmentIds: string[]) {
  console.log(content, attachmentIds)
}
<\/script>`

const disabledSource = `<template>
  <Composer disabled placeholder="已禁用" />
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="文本输入后发送按钮可用；Enter 发送，Shift+Enter 换行。"
      :source="basicSource"
    >
      <div class="composer-wrap">
        <Composer :disabled="false" placeholder="输入消息…" @send="onSend" />
      </div>
      <p v-if="last" class="hint">最近发送：{{ last }}</p>
    </DemoBlock>

    <DemoBlock
      title="禁用状态"
      description="设置 disabled 禁用输入与发送。"
      :source="disabledSource"
    >
      <div class="composer-wrap">
        <Composer :disabled="true" placeholder="已禁用" />
      </div>
      <el-button size="small" style="margin-top: 12px" @click="disabled = !disabled">
        （示例仅展示禁用态）
      </el-button>
    </DemoBlock>
  </div>
</template>

<style scoped>
.composer-wrap {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
  max-width: 640px;
}

.hint {
  margin: 12px 0 0;
  font-size: 13px;
  color: #909399;
}
</style>
