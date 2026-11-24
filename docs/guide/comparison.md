# 选型对照

## CardTable vs el-table

| | CardTable | el-table |
|--|-----------|----------|
| 角色 | 卡片容器（边框/loading/padding） | 真正表格 |
| columns API | 无 | 有 |
| 何时用 | 列表页外框 | 列、排序、多选 |

结论：两者一起用，不是二选一。

## ArtifactGallery vs 自己写

已有图/视频/JSON/文件混排且要和对话产物协议对齐 → 用 Gallery。  
只要单一 PDF 查看器 → 直接 `PdfPreviewCard` 或自研即可。

## 什么时候别用 apform-ui

- 已有完整 antd-vue / Naive 体系且无 EP  
- 需要跟进 element-plus 最新大版本视觉（本库 peer 精确依赖 2.14.2）  
- 只要几个按钮，引入整库成本过高  

## 已有 Element Plus 项目

渐进接入：只加 tokens + override，页面逐步换 `PageShell` 等积木。见 [migration.md](./migration.md)。
