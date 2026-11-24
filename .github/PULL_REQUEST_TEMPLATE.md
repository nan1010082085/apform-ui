## 变更说明

<!-- 一句话说明为什么改 -->

## 勾选

- [ ] 已加/更新测试（或说明为何不需要）
- [ ] 若改 Design Token / `element-override.css`，已说明影响面
- [ ] 需要 CHANGELOG 条目（patch/minor/major）
- [ ] 影响入口：`core` / `chat` / `bpmn` / `vite`（勾选实际触及的）
- [ ] 文档 / playground Demo 已同步（若有公开 API 变更）

## 自测

```bash
pnpm gate:core
# 涉及文档时：
pnpm docs:build
```
