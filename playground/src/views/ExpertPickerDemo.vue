<script setup lang="ts">
/**
 * ExpertPicker 专家选择文档示例（澄语白名单专家）
 */
import { ref } from 'vue'
import { ExpertPicker, type ExpertPickerItem } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

/** 默认不选专家（null = 通用，不传 expertId） */
const selected = ref<string | null>(null)

const experts: ExpertPickerItem[] = [
  {
    id: 'platform.legal',
    label: '法律专家',
    description: '法条问答与【依据】引用',
  },
  {
    id: 'platform.medical',
    label: '医疗专家',
    description: '健康知识与【出处】边界',
  },
]

const basicSource = `<template>
  <ExpertPicker v-model="selected" :experts="experts" />
</template>

<script setup>
import { ref } from 'vue'
import { ExpertPicker } from '@apform-ui/core'

/** null = 不选专家（通用对话） */
const selected = ref(null)
const experts = [
  { id: 'platform.legal', label: '法律专家', description: '法条问答与【依据】引用' },
  { id: 'platform.medical', label: '医疗专家', description: '健康知识与【出处】边界' },
]
<\/script>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="Composer 工具行专家下拉。默认可不选（null=通用）；选「通用」或清空即不传 expertId。库不写死专家 id，由业务注入列表（如平台 ?surface=chengyu）。"
      :source="basicSource"
    >
      <div class="panel">
        <ExpertPicker v-model="selected" :experts="experts" />
      </div>
      <p class="hint">当前：{{ selected ?? '（未选 / 通用）' }}</p>
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  max-width: 360px;
}
.hint {
  margin-top: 12px;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}
</style>
