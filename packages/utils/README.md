# @schema-ui/utils

@schema-ui 通用工具函数，无 UI 依赖的纯逻辑。

## 安装

```bash
npm install @schema-ui/utils
```

## 函数清单

| 函数 | 说明 |
|------|------|
| `debounce(fn, delay)` | 防抖 |
| `throttle(fn, interval)` | 节流 |
| `deepClone(obj)` | 深拷贝 |
| `deepMerge(target, source)` | 深合并 |
| `isEmpty(value)` | 判断空值 |
| `formatBytes(bytes)` | 格式化字节 |
| `formatDate(date, format)` | 格式化日期 |
| `formatNumber(num, decimals)` | 千分位格式化 |
| `isEmail(value)` | 邮箱验证 |
| `isPhone(value)` | 手机号验证 |
| `isUrl(value)` | URL 验证 |
| `isIdCard(value)` | 身份证验证 |

## 使用

```ts
import { debounce, formatBytes, isEmail } from '@schema-ui/utils'

const debounced = debounce(() => console.log('hi'), 300)
formatBytes(1048576) // "1.0 MB"
isEmail('test@example.com') // true
```
