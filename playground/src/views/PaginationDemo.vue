<script setup lang="ts">
import { ref } from 'vue'
import { AppPagination } from '@apform-ui/core'

const page = ref(1)
const pageSize = ref(10)
const total = ref(156)
</script>

<template>
  <div>
    <h2>AppPagination 分页</h2>
    <p>统一分页器，total 为 0 时自动隐藏。</p>

    <div class="demo-section">
      <div class="demo-title">基础用法</div>
      <div class="demo-block">
        <p style="margin-bottom: 12px; color: #606266; font-size: 13px;">
          第 {{ page }} 页，每页 {{ pageSize }} 条，共 {{ total }} 条
        </p>
        <AppPagination v-model:current-page="page" v-model:page-size="pageSize" :total="total" />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">紧凑模式</div>
      <div class="demo-block">
        <AppPagination v-model:current-page="page" :total="total" size="small" />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">空状态（total=0）</div>
      <div class="demo-block">
        <AppPagination :current-page="1" :total="0" />
        <p style="color: #909399; font-size: 13px;">total 为 0 时分页器自动隐藏</p>
      </div>
    </div>
  </div>
</template>
