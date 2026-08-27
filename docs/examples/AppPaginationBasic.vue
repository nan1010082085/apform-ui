<script setup>
import { ref } from 'vue'
import { AppPagination } from '@apform-ui/core'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(156)
</script>

<template>
  <div>
    <p style="margin-bottom: 12px; font-size: 13px; color: #666;">
      第 {{ currentPage }} 页，每页 {{ pageSize }} 条，共 {{ total }} 条
    </p>
    <AppPagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
    />
  </div>
</template>
