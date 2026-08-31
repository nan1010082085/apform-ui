#!/bin/bash
# 批量创建组件示例脚本

set -e

echo "=== 批量创建组件示例脚本 ==="

# 组件列表
components=(
  "CardGridSkeleton"
  "CardTable"
  "ConfirmDialog"
  "ContentPanel"
  "EmptyState"
  "FieldRow"
  "FilterBar"
  "FormDialog"
  "HintText"
  "JsonCard"
  "JsonDetailDialog"
  "LoadingDots"
  "PageHeader"
  "PageShell"
  "SchemaLitePreview"
  "SearchForm"
  "SectionToggle"
  "TableRowActions"
  "TruncatedTooltipText"
  "UserAvatar"
  "MessageBubble"
  "MessageList"
  "Composer"
  "RunStatusBar"
  "ApprovalCard"
  "MessageParts"
  "MessageAttachmentList"
  "DocumentSummaryList"
  "SessionSidebar"
  "ProcessingDrawer"
  "ConversationHeader"
  "AssistantPicker"
  "ModelPicker"
  "DocumentPreview"
  "Chat"
)

# 为每个组件创建示例
for component in "${components[@]}"; do
  echo "创建 $component 示例..."
  
  # 转换为Demo文件名
  demo_name="${component}Demo.vue"
  
  # 创建示例文件
  cat > "playground/src/views/$demo_name" << EOF
<template>
  <div class="demo-section">
    <h2>$component 组件</h2>
    <p>$component 组件的示例。</p>
    
    <div class="demo-block">
      <h3>基础用法</h3>
      <$component />
    </div>
  </div>
</template>

<script setup>
import { $component } from '@apform-ui/core'
</script>

<style scoped>
.demo-section {
  padding: 20px;
}

.demo-block {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.demo-block h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #303133;
}
</style>
EOF
  
  echo "✓ $component 示例已创建"
done

echo ""
echo "=== 批量创建完成 ==="
