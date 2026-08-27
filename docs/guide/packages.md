# 包结构

@schema-ui 采用模块化包结构，每个包独立发布，按需引入。

## 包清单

### @schema-ui/core（已发布）

核心组件库，包含通用 UI 组件和设计令牌。

```bash
npm install @schema-ui/core
```

包含：AppDialog、AppIcon、AppPagination、ConfirmDialog、FormDialog、FilterTabs、Toast、EmptyState、ErrorBoundary

### @schema-ui/icons（计划中）

图标包扩展，提供额外的图标集。

```bash
npm install @schema-ui/icons
```

规划：
- 业务图标集（工作流、审批、表单等场景图标）
- 自定义 SVG 图标注册工具
- 图标按需加载优化

### @schema-ui/themes（计划中）

主题包，提供多套视觉风格。

```bash
npm install @schema-ui/themes
```

规划：
- `themes/dark` — 科技暗色主题
- `themes/light` — 明亮主题（默认）
- `themes/custom` — 自定义主题生成器

### @schema-ui/utils（计划中）

通用工具函数，与 UI 无关的纯逻辑。

```bash
npm install @schema-ui/utils
```

规划：
- 表单验证工具
- 数据格式化
- 防抖/节流
- 深拷贝/合并

### @schema-ui/plugins（计划中）

插件扩展，为 @schema-ui/core 提供额外能力。

```bash
npm install @schema-ui/plugins
```

规划：
- 国际化插件
- 埋点插件
- 权限指令
- 长列表虚拟滚动

## 依赖关系

```
@schema-ui/core          ← 基础，其他包可依赖它
@schema-ui/icons         ← 可选扩展
@schema-ui/themes        ← 可选扩展
@schema-ui/utils         ← 独立，无 UI 依赖
@schema-ui/plugins       ← 依赖 core
```

## 引用方式

```ts
// 核心组件
import { AppDialog, AppIcon } from '@schema-ui/core'

// 图标扩展（未来）
import { workflowIcons } from '@schema-ui/icons'

// 主题切换（未来）
import '@schema-ui/themes/dark'

// 工具函数（未来）
import { debounce } from '@schema-ui/utils'
```
