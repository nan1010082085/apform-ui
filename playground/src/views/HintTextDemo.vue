<script setup lang="ts">
/**
 * HintText — 问号悬停提示
 */
import { FieldRow, HintText } from '@apform-ui/core'
</script>

<template>
  <div class="wrap">
    <h2>HintText</h2>
    <p>悬停问号图标查看说明（Popover）。</p>

    <div class="block">
      <FieldRow label="用户名">
        <div class="row">
          <el-input placeholder="请输入" style="flex: 1" />
          <HintText>3–32 个字符，仅字母数字与下划线</HintText>
        </div>
      </FieldRow>
      <FieldRow label="角色">
        <div class="row">
          <el-select placeholder="选择" style="width: 200px">
            <el-option label="管理员" value="admin" />
          </el-select>
          <HintText width="280">角色决定可用菜单与数据权限范围</HintText>
        </div>
      </FieldRow>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  padding: var(--spacing-md, 16px);
  max-width: 480px;
}
.block {
  padding: 16px;
  background: var(--bg-color-white, #fff);
  border: 1px solid var(--border-color-light, #ebedf3);
  border-radius: 4px;
}
.row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
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
