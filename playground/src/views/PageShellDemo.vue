<script setup lang="ts">
/**
 * PageShell — 页面外沿容器 Demo
 */
import { PageShell, PageHeader, ContentPanel } from '@apform-ui/core'
</script>

<template>
  <div>
    <h2>PageShell 页面容器</h2>
    <p>路由页统一外沿：背景、内边距与 fill 一屏布局。</p>

    <div class="demo-section frame">
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
  </div>
</template>

<style scoped>
.frame {
  height: 480px;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--border-color-light, #ebeef5);
  border-radius: var(--border-radius-8, 8px);
}
</style>
