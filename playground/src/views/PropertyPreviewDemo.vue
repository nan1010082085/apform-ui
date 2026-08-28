<script setup lang="ts">
import { ref } from 'vue'
import {
  FieldRow,
  HintText,
  SectionToggle,
  TruncatedTooltipText,
  LoadingDots,
  JsonCard,
  JsonDetailDialog,
  SearchForm,
  SchemaLitePreview,
  type SearchFieldConfig,
} from '@apform-ui/core'

const name = ref('')
const detailOpen = ref(false)
const liteModel = ref<Record<string, unknown>>({})
const searchFields: SearchFieldConfig[] = [
  { key: 'q', label: '关键词', type: 'input' },
  { key: 'status', label: '状态', type: 'select', options: [
    { label: '在线', value: 'online' },
    { label: '离线', value: 'offline' },
  ]},
  { key: 'date', label: '日期', type: 'date' },
  { key: 'range', label: '范围', type: 'daterange' },
]
const searchModel = ref<Record<string, unknown>>({})
</script>

<template>
  <div>
    <h2>Property / Search / Preview</h2>

    <div class="demo-section">
      <div class="demo-title">Property kit</div>
      <SectionToggle title="基础信息" :count="2">
        <FieldRow label="名称" hint="显示名称">
          <el-input v-model="name" placeholder="请输入" />
          <HintText>用于列表与详情页展示</HintText>
        </FieldRow>
        <FieldRow label="说明">
          <TruncatedTooltipText content="这是一段很长很长很长很长很长的说明文字用于演示截断" style="max-width: 180px" />
        </FieldRow>
      </SectionToggle>
      <div class="demo-row">
        <LoadingDots />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">SearchForm</div>
      <SearchForm v-model="searchModel" :fields="searchFields" />
      <pre style="font-size: 12px; color: #909399">{{ searchModel }}</pre>
    </div>

    <div class="demo-section">
      <div class="demo-title">SchemaLitePreview</div>
      <SchemaLitePreview
        v-model="liteModel"
        :fields="[
          { key: 'username', label: '用户名', type: 'input', placeholder: '请输入' },
          { key: 'role', label: '角色', type: 'select', options: [
            { label: '管理员', value: 'admin' },
            { label: '成员', value: 'member' },
          ]},
          { key: 'active', label: '启用', type: 'switch' },
        ]"
      />
      <pre style="font-size: 12px; color: #909399">{{ liteModel }}</pre>
    </div>
  </div>
</template>
