# 场景指南：监控大盘

拼法：`TimeRangePicker` + `StatCard` + `MetricChart` + `ServiceGrid` + `LogStream` + `SeverityBadge` + `useRealtime`。

## 联动

1. `TimeRangePicker` `@change` → 重新拉指标与日志。
2. `useRealtime` 订阅 WebSocket：断线重连由 composable / 宿主策略负责；推送日志 `unshift` 进 `LogStream` 的 `logs`。
3. `MetricChart` 需 `echarts` peer；缺失显示空态。

## 性能

- `LogStream` 设合理 `height` / `rowHeight`；历史用 `reach-bottom` 分页，避免一次塞数万行。
- spark 模式的 `MetricChart` 适合 StatCard 旁迷你趋势。
