<script setup lang="ts">
/**
 * FormDialog — 表单弹框
 */
import { reactive, ref } from 'vue'
import { FormDialog } from '@apform-ui/core'
import type { FormRules } from 'element-plus'

const visible = ref(false)
const formData = reactive({ name: '', role: 'member' })
const rules: FormRules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
}

function onConfirm() {
  visible.value = false
}
</script>

<template>
  <div class="wrap">
    <h2>FormDialog</h2>
    <p>基于 AppDialog 的表单弹框，内置 el-form 校验。</p>

    <el-button type="primary" @click="visible = true">打开表单弹框</el-button>

    <FormDialog
      v-model="visible"
      title="新建成员"
      :form-data="formData"
      :rules="rules"
      @confirm="onConfirm"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="formData.role" style="width: 100%">
          <el-option label="管理员" value="admin" />
          <el-option label="成员" value="member" />
        </el-select>
      </el-form-item>
    </FormDialog>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
}
h2 {
  margin: 0 0 4px;
}
p {
  margin: 0 0 16px;
  color: var(--text-color-secondary, #666);
  font-size: 13px;
}
</style>
