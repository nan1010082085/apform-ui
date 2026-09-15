<script setup lang="ts">
/**
 * MentionInput 文档示例
 */
import { MentionInput, type MentionResultItem } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const tabs = [
  { key: 'schema', label: 'Schema' },
  { key: 'flow', label: 'Flow' },
  { key: 'widget', label: 'Widget' },
]

const DEMO: Record<string, MentionResultItem[]> = {
  schema: [
    { id: '1', type: 'schema', name: '用户注册表单', description: 'form' },
    { id: '2', type: 'schema', name: '订单表单', description: 'form' },
  ],
  flow: [{ id: '3', type: 'flow', name: '审批流程', description: 'bpmn' }],
  widget: [{ id: '4', type: 'widget', name: '日期选择器', description: 'input' }],
}

const basicSource = `<template>
  <MentionInput
    :tabs="tabs"
    :search="search"
    placeholder="试试输入 @用户 …"
    @send="onSend"
  />
</template>`

/**
 * @param query - 关键字
 * @param tab - 分类
 */
async function search(query: string, tab: string): Promise<MentionResultItem[]> {
  await new Promise((r) => setTimeout(r, 120))
  const list = DEMO[tab] || []
  const q = query.trim().toLowerCase()
  if (!q) return list
  return list.filter((i) => i.name.toLowerCase().includes(q))
}

/**
 * @param message - 发送文本
 * @param mentions - 引用项
 */
function onSend(message: string, mentions: { label: string }[]) {
  // eslint-disable-next-line no-console
  console.log('send', message, mentions)
}
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="带 @ 引用的输入框：按分类搜索 Schema / Flow / Widget 并发送。"
      :source="basicSource"
    >
      <div class="demo">
        <p class="hint">输入 <kbd>@</kbd> 打开引用面板，Enter 发送（见控制台）。</p>
        <div class="box">
          <MentionInput
            :tabs="tabs"
            :search="search"
            placeholder="试试输入 @用户 …"
            @send="onSend"
          />
        </div>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.demo {
  max-width: 560px;
}
.hint {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--c-text-secondary, #666);
}
.box {
  padding: 12px 14px;
  border: 1px solid var(--c-border, #ebedf3);
  border-radius: 8px;
  background: var(--c-surface, #fff);
}
kbd {
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid var(--c-border, #ddd);
  font-size: 12px;
  background: var(--c-bg-muted, #f5f7fa);
}
</style>
