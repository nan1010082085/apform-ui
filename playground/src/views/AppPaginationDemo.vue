<template>
  <div class="demo-section">
    <h2>AppPagination 分页</h2>
    <p>统一分页器组件。</p>
    
    <div class="demo-block">
      <h3>基础用法</h3>
      <AppPagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
      />
    </div>
    
    <div class="demo-block">
      <h3>带背景色</h3>
      <AppPagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        background
      />
    </div>
    
    <div class="demo-block">
      <h3>小型分页</h3>
      <AppPagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        small
      />
    </div>
    
    <div class="demo-block">
      <h3>自定义布局</h3>
      <AppPagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppPagination } from '@apform-ui/core'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
</script>

<style scoped>
.demo-section {
  padding: 20px;
}

.demo-block {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.demo-block h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #303133;
}
</style>
