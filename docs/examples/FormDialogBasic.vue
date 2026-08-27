<script setup>
import { ref, reactive } from 'vue'
import { FormDialog } from '@apform-ui/core'

const visible = ref(false)
const formData = reactive({
  name: '',
  email: '',
})

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
}

const result = ref('')

function handleSubmit(data) {
  visible.value = false
  result.value = JSON.stringify(data)
}
</script>

<template>
  <div>
    <el-button type="primary" @click="visible = true">新建用户</el-button>
    <span v-if="result" style="margin-left: 12px; font-size: 13px; color: var(--color-success);">
      提交数据: {{ result }}
    </span>

    <FormDialog
      v-model="visible"
      title="新建用户"
      :form-data="formData"
      :rules="rules"
      @submit="handleSubmit"
    >
      <template #default="{ form }">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
      </template>
    </FormDialog>
  </div>
</template>
