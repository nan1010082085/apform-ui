<template>
  <div class="demo-section">
    <h2>{{ComponentName}} {{ComponentNameCN}}</h2>
    <p>{{Description}}</p>
    
    <div class="demo-block">
      <h3>基础用法</h3>
      <{{ComponentName}} />
    </div>
    
    <div class="demo-block">
      <h3>属性演示</h3>
      <{{ComponentName}} :prop1="value1" :prop2="value2" />
    </div>
    
    <div class="demo-block">
      <h3>事件演示</h3>
      <{{ComponentName}} @event1="onEvent1" @event2="onEvent2" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { {{ComponentName}} } from '@apform-ui/core'

const value1 = ref('')
const value2 = ref(false)

function onEvent1() {
  console.log('事件1触发')
}

function onEvent2() {
  console.log('事件2触发')
}
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
