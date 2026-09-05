<script setup lang="ts">
/**
 * FormDialog 文档示例
 */
import { reactive, ref } from 'vue'
import { FormDialog } from '@apform-ui/core'
import type { FormRules } from 'element-plus'
import DemoBlock from '../components/DemoBlock.vue'

const visible = ref(false)
const formData = reactive({ name: '', role: 'member' })
const rules: FormRules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
}

/**
 * 确认提交
 */
function onConfirm() {
  visible.value = false
}

const source = `<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormDialog } from '@apform-ui/core'

const visible = ref(false)
const formData = reactive({ name: '', role: 'member' })
<\/script>

<template>
  <el-button type="primary" @click="visible = true">打开</el-button>
  <FormDialog v-model="visible" title="新建成员" :form-data="formData" :rules="rules">
    <el-form-item label="名称" prop="name">
      <el-input v-model="formData.name" />
    </el-form-item>
  </FormDialog>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="基于 AppDialog 的表单弹框，内置 el-form 校验，确认前自动 validate。"
      :source="source"
    >
      <el-button type="primary" @click="visible = true">打开表单弹框</el-button>

      <FormDialog
        v-model="visible"
        title="新建成员"
        :form-data="formData"
        :rules="rules"
        @submit="onConfirm"
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
    </DemoBlock>
  </div>
</template>
