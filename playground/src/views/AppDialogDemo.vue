<template>
  <div class="demo-section">
    <h2>AppDialog 弹框</h2>
    <p>通用弹框组件，支持全屏、拖拽等功能。</p>
    
    <div class="demo-block">
      <h3>基础用法</h3>
      <el-button @click="dialogVisible = true">打开弹框</el-button>
      <AppDialog
        v-model="dialogVisible"
        title="基础弹框"
      >
        <p>这是一个基础弹框的内容。</p>
      </AppDialog>
    </div>
    
    <div class="demo-block">
      <h3>可拖拽弹框</h3>
      <el-button @click="draggableDialogVisible = true">打开可拖拽弹框</el-button>
      <AppDialog
        v-model="draggableDialogVisible"
        title="可拖拽弹框"
        draggable
      >
        <p>这个弹框可以拖拽移动。</p>
      </AppDialog>
    </div>
    
    <div class="demo-block">
      <h3>全屏弹框</h3>
      <el-button @click="fullscreenDialogVisible = true">打开全屏弹框</el-button>
      <AppDialog
        v-model="fullscreenDialogVisible"
        title="全屏弹框"
        fullscreen
      >
        <p>这是一个全屏弹框。</p>
      </AppDialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppDialog } from '@apform-ui/core'

const dialogVisible = ref(false)
const draggableDialogVisible = ref(false)
const fullscreenDialogVisible = ref(false)
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
