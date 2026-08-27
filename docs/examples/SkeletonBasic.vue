<script setup>
import { ref } from 'vue'
import { Skeleton } from '@apform-ui/core'

const variant = ref('card')
</script>

<template>
  <div>
    <div style="margin-bottom: 12px; display: flex; gap: 8px;">
      <el-radio-group v-model="variant">
        <el-radio-button value="card">卡片</el-radio-button>
        <el-radio-button value="list">列表</el-radio-button>
        <el-radio-button value="table">表格</el-radio-button>
      </el-radio-group>
    </div>
    <Skeleton :variant="variant" :count="3" :rows="5" />
  </div>
</template>
