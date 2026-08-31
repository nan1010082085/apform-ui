# iconRegistry

`AppIcon` 唯一合法图标来源；禁止在业务代码中编造未注册名称。

## 校验

```ts
import { APP_ICON_NAMES, isRegisteredAppIcon } from '@apform-ui/core'

isRegisteredAppIcon('setting') // true
APP_ICON_NAMES.includes('setting') // true
```

## 新增图标流程

1. 在 `@iconify-icons/ep` 确认图标存在  
2. 在 `packages/core/src/utils/iconRegistry.ts` 的 `ICON_MAP` 中注册  
3. 业务侧使用 kebab-case 名称：`<AppIcon name="setting" />`

## 与 platform-shared 双轨

`platform-shared` 的 `AppIcon` 因 `ICON_MAP + Iconify fallback` 暂保留在 shared；新应用优先直接使用 `@apform-ui/core` 的 `AppIcon`。
