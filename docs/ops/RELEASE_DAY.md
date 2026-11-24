# 发布日手册（Phase 6）

**真实 `npm publish` 需维护者显式授权后再执行。**

## T-1

- [ ] `pnpm i && pnpm gate && pnpm verify:pack`
- [ ] 干净 Vue 项目装 registry 或 tgz 跑通 `examples/vite-minimal` 同等代码
- [ ] CHANGELOG / 版本号已 bump；文档站构建含新路由
- [ ] 发布文案：一句话定位 + 3 亮点 + Demo + 迁移提示

## 当天

```bash
cd ui
pnpm release   # gate + pack 校验 + publish(+provenance if GHA) + pyflow 文档
```

- [ ] npm 页 README / badge 正常
- [ ] `git tag vX.Y.Z && git push origin vX.Y.Z`
- [ ] GitHub Release
- [ ] 同步投放第一篇 + 仓库互链

## 发布后 7 天

见 [launch-checklist.md](./launch-checklist.md)。
