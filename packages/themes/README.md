# @schema-ui/themes

@schema-ui 主题包，提供预置主题和切换工具。

## 安装

```bash
npm install @schema-ui/themes
```

## 使用

### 引入主题 CSS

```ts
// 暗色主题
import '@schema-ui/themes/dark'

// 明亮主题（重置）
import '@schema-ui/themes/light'
```

### 运行时切换

```ts
import { setTheme, getTheme, initTheme } from '@schema-ui/themes'

// 切换到暗色
setTheme('dark')

// 切换到亮色
setTheme('light')

// 从 localStorage 初始化
initTheme()

// 获取当前主题
console.log(getTheme()) // 'light' | 'dark'
```

## 主题列表

| 主题 | 文件 | 说明 |
|------|------|------|
| `light` | `light.css` | 明亮主题（默认） |
| `dark` | `dark.css` | 科技暗色主题 |
