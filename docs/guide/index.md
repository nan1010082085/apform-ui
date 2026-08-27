# 介绍

@schema-ui 是 Schema Platform 的企业级 Vue 3 UI 组件库体系，为可视化设计器生态系统量身定制。

## 包结构

| 包名 | 说明 | 状态 |
|------|------|------|
| `@schema-ui/core` | 核心组件库（基于 EP 2.14.2 fork） | ✅ 当前 |
| `@schema-ui/icons` | 图标包扩展 | 📋 计划中 |
| `@schema-ui/themes` | 主题包（暗色/自定义主题） | 📋 计划中 |
| `@schema-ui/utils` | 通用工具函数 | 📋 计划中 |
| `@schema-ui/plugins` | 插件扩展 | 📋 计划中 |

## 为什么做这个组件库

1. **统一视觉语言**：多个项目（schema-platform、portal、workflow-agent-chat）使用了不同的自定义组件，需要统一
2. **提炼业务组件**：从实际业务中沉淀出高频使用的通用组件
3. **设计令牌标准化**：通过 CSS 变量实现一套令牌驱动多种主题
4. **模块化扩展**：core 负责基础组件，icons/themes/utils/plugins 各司其职

## Fork 策略

我们选择 fork Element Plus 而非从零搭建，原因是：

- 获得 EP 的 70+ 组件作为基础
- 可以深度定制内部实现
- 在此基础上扩展自己的组件

**版本锁定**：fork 基准为 EP 2.14.2，上游更新需经过评估后手动合并。

## 与 Element Plus 的关系

| 层级 | 说明 |
|------|------|
| `element-plus` | 底层，提供基础组件（el-button, el-input 等） |
| `@schema-ui/core` | 上层，提供业务级通用组件 + 设计令牌 |

你仍然可以直接使用所有 Element Plus 组件。@schema-ui/core 补充的是 EP 没有覆盖的场景。
