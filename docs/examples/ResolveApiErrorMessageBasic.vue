<script setup>
import { ref } from 'vue'
import { resolveApiErrorMessage, useMessage } from '@schema-ui/core'

const msg = useMessage()
const errorType = ref('string')

function simulateError() {
  const errors = {
    string: '网络连接失败',
    error: new Error('请求超时，请重试'),
    api: { message: '权限不足，无法访问该资源' },
    validation: { errors: { name: ['名称不能为空'], email: ['邮箱格式不正确'] } },
    code: { code: 'ERR_403' },
  }

  const error = errors[errorType.value]
  const message = resolveApiErrorMessage(error)
  msg.error(message)
}
</script>

<template>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <el-select v-model="errorType" style="width: 160px;">
      <el-option label="字符串错误" value="string" />
      <el-option label="Error 对象" value="error" />
      <el-option label="API 错误" value="api" />
      <el-option label="验证错误" value="validation" />
      <el-option label="错误码" value="code" />
    </el-select>
    <el-button type="danger" @click="simulateError">模拟错误</el-button>
  </div>
</template>
