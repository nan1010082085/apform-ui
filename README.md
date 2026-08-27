# @apform-ui

Apform UI 企业级 Vue 3 UI 组件库体系。

## 包结构

| 包名 | 说明 | 状态 | 构建产物 |
|------|------|------|---------|
| `@apform-ui/core` | 核心组件库（9 个组件 + 设计令牌） | ✅ | `schema-ui.js` 89KB |
| `@apform-ui/icons` | 图标扩展包（工作流/审批/数据） | ✅ | `icons.js` 2.5KB |
| `@apform-ui/themes` | 主题包（暗色/明亮） | ✅ | CSS only |
| `@apform-ui/utils` | 通用工具函数（防抖/深拷贝/验证等） | ✅ | `utils.js` 2.7KB |
| `@apform-ui/plugins` | 插件扩展（国际化/埋点/权限） | ✅ | `plugins.js` |
| `@apform-ui/docs` | VitePress 组件文档 | ✅ | 静态站点 |

## Fork 信息

| 项目 | 值 |
|------|------|
| Fork 基准 | Element Plus **2.14.2** |
| Fork 日期 | 2026-08-27 |

> **重要**：上游 Element Plus 更新需经过评估后手动合并，禁止自动升级。

## 开发

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 构建单个包
pnpm build:core

# 文档开发
pnpm docs:dev

# 文档构建
pnpm docs:build

# 发布所有包
pnpm release
```

## 快速使用

```ts
// 核心组件
import { AppDialog, AppIcon, Toast, useToast } from '@apform-ui/core'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'

// 图标扩展
import { allIcons } from '@apform-ui/icons'

// 主题切换
import { setTheme } from '@apform-ui/themes'
import '@apform-ui/themes/dark'

// 工具函数
import { debounce, formatBytes } from '@apform-ui/utils'

// 插件
import { createI18nPlugin } from '@apform-ui/plugins/i18n'
```
