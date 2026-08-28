<script setup lang="ts">
import { ref } from 'vue'
import { AppDialog, ConfirmDialog, FormDialog } from '@apform-ui/core'

const basicVisible = ref(false)
const fullscreenVisible = ref(false)
const confirmVisible = ref(false)
const formVisible = ref(false)

const formData = ref({ name: '', email: '' })
const formResult = ref('')

function handleSubmit(data) {
  formVisible.value = false
  formResult.value = JSON.stringify(data)
}
</script>

<template>
  <div>
    <h2>AppDialog 弹框</h2>
    <p>通用弹框组件，支持全屏、拖拽、自定义按钮。</p>

    <!-- 基础弹框 -->
    <div class="demo-section">
      <div class="demo-title">基础用法</div>
      <div class="demo-block">
        <el-button type="primary" @click="basicVisible = true">打开弹框</el-button>
        <AppDialog v-model="basicVisible" title="基础弹框">
          <p>这是一个基础弹框，支持拖拽和全屏切换。</p>
        </AppDialog>
      </div>
    </div>

    <!-- 全屏弹框 -->
    <div class="demo-section">
      <div class="demo-title">全屏模式</div>
      <div class="demo-block">
        <el-button @click="fullscreenVisible = true">全屏弹框</el-button>
        <AppDialog v-model="fullscreenVisible" title="全屏弹框" width="800px">
          <div style="padding: 20px;">
            <h3>全屏模式</h3>
            <p>点击右上角的全屏按钮可以切换全屏模式。</p>
          </div>
        </AppDialog>
      </div>
    </div>

    <!-- 自定义按钮 -->
    <div class="demo-section">
      <div class="demo-title">自定义按钮文案</div>
      <div class="demo-block">
        <el-button @click="basicVisible = true">自定义按钮</el-button>
        <AppDialog v-model="basicVisible" title="自定义" cancel-text="Cancel" confirm-text="OK">
          <p>通过 cancel-text 和 confirm-text 自定义按钮文案。</p>
        </AppDialog>
      </div>
    </div>

    <!-- ConfirmDialog -->
    <div class="demo-section">
      <div class="demo-title">ConfirmDialog 确认弹框</div>
      <div class="demo-block">
        <el-button type="danger" @click="confirmVisible = true">删除确认</el-button>
        <ConfirmDialog
          v-model="confirmVisible"
          title="确认删除"
          message="此操作将永久删除该文件，是否继续？"
          type="danger"
          confirm-text="确认删除"
        />
      </div>
    </div>

    <!-- FormDialog -->
    <div class="demo-section">
      <div class="demo-title">FormDialog 表单弹框</div>
      <div class="demo-block">
        <el-button type="primary" @click="formVisible = true">新建用户</el-button>
        <span v-if="formResult" style="margin-left: 12px; color: #26A036; font-size: 13px;">
          提交: {{ formResult }}
        </span>
        <FormDialog
          v-model="formVisible"
          title="新建用户"
          :form-data="formData"
          @submit="handleSubmit"
        >
          <template #default="{ form }">
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>
          </template>
        </FormDialog>
      </div>
    </div>
  </div>
</template>
