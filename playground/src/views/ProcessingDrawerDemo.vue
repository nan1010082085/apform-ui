<template>
  <div class="demo-section">
    <h2>ProcessingDrawer 组件</h2>
    <p>ProcessingDrawer 组件的示例。</p>
    
    <div class="demo-block">
      <h3>基础用法</h3>
      <ProcessingDrawer />
    </div>
  </div>
</template>

<script setup>
import { ProcessingDrawer } from '@apform-ui/core'
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
