# @apform-ui

Apform UI 企业级 Vue 3 UI 组件库体系。

## 包结构

| 包名 | 说明 | 状态 | 构建产物 |
|------|------|------|---------|
| `@apform-ui/core` | 核心组件（Layout/List/Chat/Property/Preview + 设计令牌） | ✅ 1.2.0 | `apform-ui.js` |
| `@apform-ui/icons` | 图标扩展包（工作流/审批/数据） | ✅ | `icons.js` |
| `@apform-ui/themes` | 主题包（暗色/明亮） | ✅ | CSS only |
| `@apform-ui/utils` | 通用工具函数（防抖/深拷贝/验证等） | ✅ | `utils.js` |
| `@apform-ui/plugins` | 插件扩展（国际化/埋点/权限） | ✅ | `plugins.js` |
| `@apform-ui/docs` | VitePress 组件文档 | ✅ | 静态站点 |

## 配方 Demo（playground）

| 路径 | 说明 |
|------|------|
| `/list-recipe` | PageShell → PageHeader → FilterBar → ContentPanel/CardTable → Empty → Pagination |
| `/chat-recipe` | SessionSidebar + ConversationHeader + MessageList + Composer + 附件预览 |
| `/property-preview` | Property kit + SearchForm + JsonCard + SchemaLitePreview |

## Fork 信息

| 项目 | 值 |
|------|------|
| Fork 基准 | Element Plus **2.14.2** |
| Fork 日期 | 2026-08-27 |

> **重要**：上游 Element Plus 更新需经过评估后手动合并，禁止自动升级。

## 开发

### 构建和测试

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 构建核心包
pnpm build:core

# 运行测试
pnpm --filter @apform-ui/core test

# 运行所有测试
pnpm test

# 文档开发
pnpm docs:dev

# 文档构建
pnpm docs:build

# 发布所有包
pnpm release
```

### 常见问题

#### TypeScript 构建错误

如果遇到 TypeScript 构建错误，请尝试：

1. 确保所有依赖已安装：`pnpm install`
2. 清理构建缓存：`pnpm clean`
3. 重新构建：`pnpm build:core`

#### 测试失败

如果测试失败，请尝试：

1. 确保所有依赖已安装
2. 检查测试文件是否有语法错误
3. 运行单个测试文件：`pnpm --filter @apform-ui/core test -- --testPathPattern=<测试文件名>`

### 贡献指南

请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何贡献代码。

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 构建单个包
pnpm build:core

# 单元测试
pnpm --filter @apform-ui/core test

# 文档开发
pnpm docs:dev

# 文档构建
pnpm docs:build

# 发布所有包
pnpm release
```

## 快速使用

```ts
import {
  PageShell,
  PageHeader,
  FilterBar,
  MessageParts,
  SchemaLitePreview,
  useClientPagination,
} from '@apform-ui/core'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/styles/element-override.css' // Element Plus 按钮/输入/分页高度对齐令牌
```

## 文档与计划

- 全量盘点：`COMPONENT_LIBRARY_INVENTORY.md`
- 实施计划：`docs/superpowers/plans/2026-08-28-apform-ui-implementation.md`
- 验收清单：`docs/superpowers/plans/2026-08-28-apform-ui-acceptance-checklist.md`