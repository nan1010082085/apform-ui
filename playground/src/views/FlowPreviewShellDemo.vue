<script setup lang="ts">
/**
 * FlowPreviewShell 文档示例
 */
import { FlowPreviewShell } from '@apform-ui/core'
import DemoBlock from '../components/DemoBlock.vue'

const basicSource = `<template>
  <FlowPreviewShell
    title="请假审批流程"
    badge="4 节点 / 3 连线"
    primary-action="确认发布"
    secondary-action="在编辑器中打开"
  >
    <div><!-- 画布 slot --></div>
  </FlowPreviewShell>
</template>`
</script>

<template>
  <div>
    <DemoBlock
      title="基础用法"
      description="流程预览外壳：标题、徽章、操作按钮与画布插槽；支持 compact 紧凑模式。"
      :source="basicSource"
    >
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 560px">
        <FlowPreviewShell
          title="请假审批流程"
          badge="4 节点 / 3 连线"
          primary-action="确认发布"
          secondary-action="在编辑器中打开"
          @primary-action="console.log('primary')"
          @secondary-action="console.log('secondary')"
          @fit-view="console.log('fit-view')"
        >
          <div
            style="
              height: 100%;
              display: grid;
              place-items: center;
              color: #909399;
              font-size: 13px;
            "
          >
            画布 slot（业务侧放入 VueFlow）
          </div>
        </FlowPreviewShell>

        <FlowPreviewShell title="紧凑预览" badge="2 节点 / 1 连线" compact :show-fit-button="false">
          <div
            style="
              height: 100%;
              display: grid;
              place-items: center;
              color: #909399;
              font-size: 13px;
            "
          >
            compact · 无 fit 按钮
          </div>
        </FlowPreviewShell>
      </div>
    </DemoBlock>
  </div>
</template>
