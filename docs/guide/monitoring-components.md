# 监控系统组件设计规格

> 目标消费方：Vigil 应用监控系统（`/Users/yangdongnan/work/vigil`）
> 设计基准：apform-ui v1.7.4 令牌体系，不引入新主题，不做明暗切换
> 实时数据：基于 WebSocket 推送，组件 API 需支持增量更新

---

## 0. 设计原则

1. **状态优先**：健康/告警状态必须在 100ms 内被视觉识别
2. **全局上下文**：时间范围、项目选择是全局状态，组件不各自管理
3. **高密度**：值班场景一屏内看到尽可能多的关键数据
4. **时间对齐**：所有图表共享时间轴语义
5. **单一主题**：全部使用现有 apform-ui 令牌，不新增主题变量

---

## 1. 监控语义令牌映射

**不新增颜色令牌**。在消费方（vigil）的 `tokens.css` 中做语义别名：

```css
:root {
  --status-healthy: var(--color-success);
  --status-warning: var(--color-warning);
  --status-error: var(--color-danger);
  --status-unknown: var(--text-color-muted);
  --status-healthy-bg: var(--color-success-bg);
  --status-warning-bg: var(--color-warning-bg);
  --status-error-bg: var(--color-danger-bg);
}
```

**图表令牌**（apform-ui 侧新增）：ECharts 无法读取 CSS 变量，需要在 `tokens/index.ts` 导出图表专用色板常量：

```ts
/** 图表色板 — 基于 COLORS 派生，监控系统专用 */
export const CHART_COLORS = {
  primary: COLORS.primary,
  success: COLORS.success,
  warning: COLORS.warning,
  danger: COLORS.danger,
  info: COLORS.info,
  series: [
    COLORS.primary,
    COLORS.success,
    COLORS.warning,
    COLORS.danger,
    '#8B5CF6',
    '#EC4899',
    '#14B8A6',
    '#F97316',
  ],
  axisLine: '#D5DDE3',
  splitLine: '#EBEDF3',
  tooltipBg: '#FFFFFF',
  tooltipText: '#303133',
} as const
```

说明：`series[4..7]` 为扩展色（紫/粉/青/橙），令牌体系无对应值，直接使用 hex。轴线/分割线/tooltip 色与 CSS 令牌值对齐（`--border-color-base`、`--border-color-light`、`--bg-color-white`、`--text-color-title`）。

---

## 2. 组件清单

| # | 组件 | 优先级 | 依赖 |
|---|------|--------|------|
| 1 | TimeRangePicker | P0 | el-button, el-popover, el-date-picker |
| 2 | MetricChart | P0 | echarts (optional peer), ContentPanel |
| 3 | StatCard | P0 | 无 |
| 4 | SeverityBadge | P0 | 无 |
| 5 | ServiceGrid | P1 | StatusTag |
| 6 | StatusTimeline | P1 | 无 |
| 7 | LogStream | P1 | 虚拟滚动（自实现） |
| 8 | ThresholdSlider | P2 | el-slider, el-input-number |
| 9 | useRealtime | P0 | 原生 WebSocket |

---

## 3. TimeRangePicker

### 目录

```
src/components/TimeRangePicker/
  TimeRangePicker.vue
  index.ts
  doc.ts
```

### 用途

全局时间范围选择器。放在监控布局顶栏，所有图表和列表共享同一个时间范围。

### 类型定义

```ts
export type TimeRangePreset = '5m' | '15m' | '1h' | '6h' | '24h' | '7d' | '30d' | 'custom'

export interface TimeRange {
  preset: TimeRangePreset
  start?: string
  end?: string
}
```

### Props

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| modelValue | `TimeRange` | 必填 | 当前时间范围 |
| showPresets | `boolean` | `true` | 显示快捷按钮组 |
| presets | `TimeRangePreset[]` | `['5m','15m','1h','6h','24h','7d']` | 快捷预设列表 |
| allowCustom | `boolean` | `true` | 允许自定义范围 |
| size | `'small'\|'default'\|'large'` | `'default'` | 尺寸 |
| disabled | `boolean` | `false` | 禁用 |

### Emits

| 事件 | 参数 | 说明 |
|------|------|------|
| update:modelValue | `(value: TimeRange)` | v-model |
| change | `(value: TimeRange)` | 值变化 |

### 视觉规格

- 快捷按钮组：`el-button-group`，选中态 `--color-primary`
- 按钮文案：5m=5分钟，15m=15分钟，1h=1小时，6h=6小时，24h=24小时，7d=7天
- 自定义：el-popover 内嵌 el-date-picker（type="datetimerange"）
- 整体高度跟随 `--control-height-md`（32px），顶栏场景传 `size="small"`（28px）
- custom 选中时按钮显示 "自定义" + 起止日期（MM-DD HH:mm）

### 使用示例

```vue
<TimeRangePicker v-model="timeRange" size="small" @change="refreshAll" />
```

---

## 4. MetricChart

### 目录

```
src/components/MetricChart/
  MetricChart.vue
  index.ts
  doc.ts
```

### 用途

指标图表卡。基于 ECharts 封装，统一时间轴格式化、tooltip 样式、单位格式化。支持 full 和 spark 两种模式。

### 类型定义

```ts
export type MetricUnit = 'count' | 'ms' | 'percent' | 'currency' | 'tokens' | 'bytes'

export interface MetricSeries {
  name: string
  data: [number, number][]  // [timestamp(ms), value]
  color?: string
  area?: boolean
}

export interface MetricThreshold {
  value: number
  label: string
  color?: string
}
```

### Props

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| title | `string` | 必填 | 图表标题 |
| unit | `MetricUnit` | 必填 | 数值单位 |
| series | `MetricSeries[]` | 必填 | 数据系列 |
| type | `'line'\|'bar'\|'area'` | `'line'` | 图表类型 |
| thresholds | `MetricThreshold[]` | — | 阈值参考线 |
| variant | `'full'\|'spark'` | `'full'` | 全量/迷你 |
| height | `number` | full=280, spark=32 | 图表高度 |
| loading | `boolean` | `false` | 加载态 |
| yAxisMin | `number` | — | Y轴最小值 |
| yAxisMax | `number` | — | Y轴最大值 |

### Emits

| 事件 | 参数 | 说明 |
|------|------|------|
| chart-click | `(params: any)` | ECharts click 透传 |

### Slots

| Slot | 说明 |
|------|------|
| header-actions | 标题右侧操作区 |
| empty | 无数据替代内容 |

### 单位格式化

| unit | 格式 | 示例 |
|------|-------|------|
| count | 千分位整数 | 1,234 |
| ms | >1000 转 s | 1.2s / 850ms |
| percent | 1位小数 + % | 12.3% |
| currency | $ + 4位小数 | $0.0123 |
| tokens | 千分位 + tokens | 45,678 tokens |
| bytes | 自动 KB/MB/GB | 1.5MB |

### ECharts 配置约定

- 色板：`CHART_COLORS.series`
- 轴线：`CHART_COLORS.axisLine`
- 分割线：`CHART_COLORS.splitLine`，dashed
- tooltip：白底、`--shadow-md`、mono 字体数值
- 时间轴格式：<1h 显示 HH:mm，<1d 显示 HH:mm，>1d 显示 MM-DD HH:mm
- spark 模式：无 grid padding、无 axis、无 tooltip、symbol:'none'

### ECharts 依赖

`echarts` 和 `vue-echarts` 加入 `peerDependenciesMeta.optional`（同 pdfjs-dist 模式）。未安装时渲染 EmptyState 提示。

### 使用示例

```vue
<MetricChart
  title="错误率"
  unit="percent"
  :series="errorRateSeries"
  :thresholds="[{ value: 5, label: '告警阈值' }]"
/>
```

---

## 5. StatCard

### 目录

```
src/components/StatCard/
  StatCard.vue
  index.ts
  doc.ts
```

### 用途

统计卡片。紧凑设计，支持 sparkline 趋势和环比。替代业务侧手写 stat-card。

### 类型定义

```ts
export interface StatTrend {
  direction: 'up' | 'down' | 'flat'
  percent?: number
  positiveIsGood?: boolean  // 默认 true：up=绿
}
```

### Props

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| label | `string` | 必填 | 标签 |
| value | `number \| string` | 必填 | 数值 |
| unit | `string` | — | 单位后缀 |
| trend | `StatTrend` | — | 环比 |
| sparkline | `number[]` | — | 趋势线 |
| status | `'healthy'\|'warning'\|'error'\|'unknown'` | — | 左侧色条 |
| to | `string` | — | 路由跳转 |
| loading | `boolean` | `false` | 骨架屏 |

### Emits

| 事件 | 参数 | 说明 |
|------|------|------|
| click | `(event: MouseEvent)` | 点击（无 to 时） |

### 视觉规格

- 左侧状态色条：3px 宽全高
- label：`--font-size-12`，`--text-color-muted`
- value：`--font-size-28`，bold，`--font-family-mono`，`--text-color-title`
- unit：`--font-size-12`，`--text-color-muted`
- trend 箭头：上/下/平，颜色按 positiveIsGood
- sparkline：32px 高，无坐标轴，颜色跟随状态或 `--color-primary`
- 容器：白底、`--border-color-light` 1px 边框、`--border-radius-8`
- 内边距：12px 16px
- loading：三行骨架（label/value/sparkline）

### 使用示例

```vue
<StatCard
  label="错误事件"
  :value="1234"
  :trend="{ direction: 'down', percent: 12, positiveIsGood: true }"
  :sparkline="errorTrend"
  status="warning"
  to="/events?type=error"
/>
```

---

## 6. SeverityBadge

### 目录

```
src/components/SeverityBadge/
  SeverityBadge.vue
  index.ts
  doc.ts
```

### 用途

告警严重级别徽章。与 StatusTag（服务健康）语义不同，不混用。

### 类型定义

```ts
export type AlertSeverity = 'critical' | 'warning' | 'info'
```

### Props

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| severity | `AlertSeverity` | 必填 | 严重级别 |
| pulse | `boolean` | `severity==='critical'` | 脉冲动画 |
| size | `'small'\|'default'\|'large'` | `'default'` | 尺寸 |

### 视觉规格

| severity | 底色 | 文字 | 文案 |
|----------|------|------|------|
| critical | `--color-danger-bg` | `--color-danger` | 严重 |
| warning | `--color-warning-bg` | `--color-warning` | 警告 |
| info | `--color-info-bg` | `--color-info` | 信息 |

- 前缀圆点 6px 实心
- critical 脉冲：box-shadow 扩散，`--duration-slow` 循环
- 容器：`--border-radius-full`，padding 2px 10px

---

## 7. ServiceGrid

### 目录

```
src/components/ServiceGrid/
  ServiceGrid.vue
  index.ts
  doc.ts
```

### 用途

服务状态矩阵。概览页首屏，一屏展示所有被监控服务的健康状态。

### 类型定义

```ts
export interface ServiceItem {
  id: string | number
  name: string
  status: 'healthy' | 'warning' | 'error' | 'unknown'
  metrics?: {
    errorRate?: number
    latencyP95?: number
    eventCount?: number
    lastSeen?: string
  }
}
```

### Props

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| services | `ServiceItem[]` | 必填 | 服务列表 |
| columns | `number` | auto | 列数（不传则响应式） |
| loading | `boolean` | `false` | 骨架屏 |

### Emits

| 事件 | 参数 | 说明 |
|------|------|------|
| service-click | `(service: ServiceItem)` | 点击服务块 |

### 视觉规格

- Grid：`auto-fill, minmax(200px, 1fr)`，gap 12px
- 服务块：左侧 3px 状态色条、服务名 14px medium、状态文字 12px 状态色
- 指标行：12px mono 字体 muted
- lastSeen：相对时间，超 5 分钟变 warning 色
- error 状态：整块背景 `--color-danger-bg`、边框 `--color-danger`
- hover：`--shadow-md`、cursor pointer
- 空数据：EmptyState

---

## 8. StatusTimeline

### 目录

```
src/components/StatusTimeline/
  StatusTimeline.vue
  index.ts
  doc.ts
```

### 用途

服务状态时间线。横向色块条，展示服务在时间范围内的健康变化。

### 类型定义

```ts
export interface TimelineSegment {
  start: string  // ISO 8601
  end: string
  status: 'healthy' | 'warning' | 'error' | 'unknown'
}
```

### Props

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| segments | `TimelineSegment[]` | 必填 | 状态段 |
| range | `{start: string, end: string}` | segments 首尾 | 对齐范围 |
| height | `number` | `24` | 高度 |
| showTooltip | `boolean` | `true` | hover 提示 |

### 视觉规格

- 横向条：按时间占比分配色块宽度
- healthy：`--color-success`（70% 透明度）
- warning：`--color-warning`
- error：`--color-danger`
- unknown：`--bg-color-gray-dark`
- 段间 1px 白色间隔
- hover：tooltip 显示状态+起止+持续时长
- 底部时间刻度：起止时间 10px muted

---

## 9. LogStream

### 目录

```
src/components/LogStream/
  LogStream.vue
  index.ts
  doc.ts
```

### 用途

日志/事件流查看器。虚拟滚动、级别色条、关键词高亮、行展开 JSON。

### 类型定义

```ts
export interface LogEntry {
  id: string | number
  timestamp: string  // ISO 8601
  level: 'debug' | 'info' | 'warn' | 'error'
  service: string
  message: string
  payload?: Record<string, any>
}
```

### Props

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| logs | `LogEntry[]` | 必填 | 日志列表（新到旧） |
| height | `number` | 必填 | 容器高度 |
| rowHeight | `number` | `36` | 单行高度 |
| highlight | `string` | — | 高亮关键词 |
| autoScroll | `boolean` | `false` | 新数据滚底 |
| loading | `boolean` | `false` | 加载态 |

### Emits

| 事件 | 参数 | 说明 |
|------|------|------|
| log-click | `(log: LogEntry)` | 点击行展开 |
| reach-top | — | 滚顶加载更早 |

### 视觉规格

- 左侧 3px 级别色条：debug 灰 / info `--color-info` / warn `--color-warning` / error `--color-danger`
- timestamp：12px mono muted，宽 140px
- level：12px 级别色，宽 50px
- service：12px secondary，宽 120px
- message：13px primary，单行截断
- 行 hover：`--bg-color-hover`
- 展开：payload 用 JsonCard 渲染
- highlight：mark 标签，`--color-warning-bg` 背景
- 虚拟滚动：可视区+上下 5 行 buffer
- 空数据：EmptyState

### 性能要求

- 10000 条虚拟滚动流畅
- 新日志 unshift 时如 autoScroll=false 保持滚动位置

---

## 10. ThresholdSlider

### 目录

```
src/components/ThresholdSlider/
  ThresholdSlider.vue
  index.ts
  doc.ts
```

### 用途

告警阈值配置滑块。根据类型切换单位和范围。

### 类型定义

```ts
export type ThresholdType = 'errorRate' | 'latency' | 'eventCount' | 'timeout'
```

### Props

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| type | `ThresholdType` | 必填 | 阈值类型 |
| modelValue | `number` | 必填 | 当前值 |
| showInput | `boolean` | `true` | 显示输入框 |
| disabled | `boolean` | `false` | 禁用 |

### Emits

| 事件 | 参数 | 说明 |
|------|------|------|
| update:modelValue | `(value: number)` | v-model |
| change | `(value: number)` | 松手触发 |

### 类型映射

| type | 单位 | 范围 | 步长 | 建议 |
|------|------|------|------|------|
| errorRate | % | 0-100 | 1 | 5 |
| latency | ms | 100-30000 | 100 | 2000 |
| eventCount | 次/5分钟 | 10-10000 | 10 | 100 |
| timeout | 分钟 | 1-60 | 1 | 3 |

---

## 11. useRealtime

### 目录

```
src/composables/useRealtime.ts
```

### 用途

WebSocket 连接管理。统一连接、断线重连、按 project_id 过滤、事件分发。

### 类型定义

```ts
export type RealtimeEventType =
  | 'event:new'
  | 'alert:triggered'
  | 'alert:resolved'
  | 'health:change'

export interface RealtimeMessage {
  type: RealtimeEventType
  project_id: number
  data: any
  ts: string
}
```

### Options

| 选项 | 类型 | 默认 | 说明 |
|------|------|------|------|
| url | `string` | 必填 | WebSocket 地址 |
| projectId | `number` | — | 订阅项目，空则全部 |
| reconnectInterval | `number` | `3000` | 初始重连间隔 |
| maxRetries | `number` | `Infinity` | 最大重试 |

### 返回值

```ts
interface UseRealtimeReturn {
  status: Ref<'connecting' | 'open' | 'closed' | 'error'>
  connect: () => void
  disconnect: () => void
  on: <T = any>(type: RealtimeEventType, handler: (data: T) => void) => () => void
}
```

### 行为约定

1. 自动重连：指数退避 3s -> 6s -> 12s -> 30s 封顶
2. 心跳：30s ping，60s 无 pong 判定断线
3. 过滤：连接后发送 `{ action: 'subscribe', project_id }`
4. 生命周期：onUnmounted 自动断开
5. 多实例：同 URL 复用单连接（Map 管理）
6. on() 返回取消函数

### 使用示例

```ts
const { status, on } = useRealtime({ url: 'ws://localhost:8000/ws', projectId: 1 })

const off = on<{ id: string }>('event:new', (data) => {
  logs.value.unshift(data)
})

onUnmounted(off)
```

---

## 12. 注册导出

### index.ts 新增

```ts
// ========== 组件 — 监控 ==========
export { TimeRangePicker } from './components/TimeRangePicker'
export type { TimeRange, TimeRangePreset } from './components/TimeRangePicker'
export { MetricChart } from './components/MetricChart'
export type { MetricSeries, MetricThreshold, MetricUnit } from './components/MetricChart'
export { StatCard } from './components/StatCard'
export { SeverityBadge } from './components/SeverityBadge'
export type { AlertSeverity } from './components/SeverityBadge'
export { ServiceGrid } from './components/ServiceGrid'
export type { ServiceItem } from './components/ServiceGrid'
export { StatusTimeline } from './components/StatusTimeline'
export type { TimelineSegment } from './components/StatusTimeline'
export { LogStream } from './components/LogStream'
export type { LogEntry } from './components/LogStream'
export { ThresholdSlider } from './components/ThresholdSlider'
export type { ThresholdType } from './components/ThresholdSlider'

// ========== Composables — 监控 ==========
export { useRealtime } from './composables/useRealtime'
export type { RealtimeEventType, RealtimeMessage } from './composables/useRealtime'
```

### doc.ts

每个组件目录建 `doc.ts`，导出 `XxxDoc: ComponentDoc`，在 `src/docs/index.ts` 聚合。

---

## 13. 验收清单

### 令牌

- [ ] 所有颜色引用令牌，无硬编码 hex（CHART_COLORS 扩展色除外）
- [ ] 图表色板从 CHART_COLORS 读取
- [ ] 不新增主题变量，不做暗色

### 组件

- [ ] 8 组件 + 1 composable 全部导出
- [ ] vue-tsc 通过
- [ ] playground 可预览
- [ ] 空态/加载态/错误态覆盖

### 性能

- [ ] LogStream 10000 条流畅
- [ ] MetricChart 数据变化用 setOption merge
- [ ] useRealtime 断线不产生重复连接

### 联调

- [ ] vigil 链接本地 apform-ui
- [ ] 顶栏 TimeRangePicker 切换全局同步
- [ ] useRealtime + LogStream 实时推入
