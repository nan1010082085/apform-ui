<script setup lang="ts">
/**
 * PageShell 文档示例
 */
import { PageShell, PageHeader, ContentPanel } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const source = `<template>
  <div style="height: 480px">
    <PageShell fill>
      <PageHeader title="设置中心" subtitle="PageShell fill 模式" />
      <ContentPanel title="基本设置" fill>
        <!-- 表单等内容 -->
      </ContentPanel>
    </PageShell>
  </div>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="为路由页提供统一外沿：页面背景、水平内边距。fill 时一屏填满，末子可内滚。"
      :source="source"
    >
      <div class="frame">
        <PageShell fill>
          <PageHeader title="设置中心" subtitle="PageShell fill 模式 Demo" />
          <ContentPanel title="基本设置" fill>
            <el-form label-width="100px" style="max-width: 480px">
              <el-form-item label="站点名称">
                <el-input model-value="Schema Platform" />
              </el-form-item>
              <el-form-item label="默认语言">
                <el-select model-value="zh-CN" style="width: 100%">
                  <el-option label="简体中文" value="zh-CN" />
                  <el-option label="English" value="en" />
                </el-select>
              </el-form-item>
            </el-form>
          </ContentPanel>
        </PageShell>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.frame {
  height: 420px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px dashed #dcdfe6;
}
</style>
