# ROADMAP

## 做

- 对外发版工程质量（pack / CI / LICENSE / 文档站同步）
- 场景指南：列表 / 对话 / 监控 / BPMN / 文件预览
- Top 高频组件 API 文档与边界态 Demo
- Design Token 与 EP 渐进迁移说明

## 在做

- 单测覆盖率提升（Top10 + composables）
- 文档站本地搜索增强（组件名已支持；Algolia 待申请）

## 不做（本阶段）

- WorkBuddy 专家包 / Answer Base 机器可读全量导出（后置）
- 跟随 element-plus 大版本升级（钉 **2.14.2**）
- 用 apform-ui 替换业务仓全量本地组件（见仓库规则：现有引用冻结）
- Storybook / VitePress / 文档站内嵌 StackBlitz

## 版本与支持

- **1.x**：保持兼容；破坏性变更只在 major，并提前一个 minor 打 deprecated
- 发版节奏：有可交付则 patch/minor；npm 与 pyflow 文档必须同次发版
- 维护：目前以 1 人维护为主；Issue / PR 预期见 `SECURITY.md` 与治理说明

## 治理（坦诚）

- 响应预期：安全漏洞 72h 确认；普通 Issue 尽力而为，高峰期可能数日
- PR：需过 CI；文档/测试齐备优先合并
- 欢迎共建：场景指南、FAQ、单测、i18n 文案覆盖
