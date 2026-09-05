<script setup lang="ts">
/**
 * HintText 问号悬停提示文档示例
 */
import { FieldRow, HintText } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <FieldRow label="用户名">
    <div class="row">
      <el-input placeholder="请输入" />
      <HintText>3–32 个字符，仅字母数字与下划线</HintText>
    </div>
  </FieldRow>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="悬停问号图标查看说明（Popover）。"
      :source="basicSource"
    >
      <div class="panel">
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
        <FieldRow label="容量">
          <div class="row">
            <el-input placeholder="人数" style="width: 120px" />
            <HintText content="参会人数不可超过会议室容量（FieldTip 兼容）" />
          </div>
        </FieldRow>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.panel {
  max-width: 480px;
}
.row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}
</style>
