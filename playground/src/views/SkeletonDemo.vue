<script setup lang="ts">
import { ref } from 'vue'
import { Skeleton, CardGridSkeleton } from '@apform-ui/core'

const variant = ref('card')
</script>

<template>
  <div>
    <h2>Skeleton 骨架屏</h2>
    <p>加载时的占位展示。</p>

    <div class="demo-section">
      <div class="demo-title">类型切换</div>
      <div class="demo-block">
        <el-radio-group v-model="variant" style="margin-bottom: 16px;">
          <el-radio-button value="card">卡片</el-radio-button>
          <el-radio-button value="list">列表</el-radio-button>
          <el-radio-button value="table">表格</el-radio-button>
        </el-radio-group>
        <Skeleton :variant="variant" :count="3" />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">CardGridSkeleton 卡片网格骨架</div>
      <div class="demo-block">
        <CardGridSkeleton :count="6" />
      </div>
    </div>
  </div>
</template>
