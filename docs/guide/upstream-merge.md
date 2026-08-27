# 上游合并指南

## 准备工作

```bash
# 1. 添加上游 remote（如果还没有）
git remote add upstream https://github.com/element-plus/element-plus.git

# 2. 获取上游最新标签
git fetch upstream --tags

# 3. 创建评估分支
git checkout -b ep-evaluate/2.x.x
```

## Diff 分析

```bash
# 对比我们修改过的文件
git diff v2.14.2..v2.x.x -- src/components/dialog/
git diff v2.14.2..v2.x.x -- src/components/pagination/
```

## 评估清单

- [ ] CSS 类名是否变更？
- [ ] 组件 Props 接口是否变更？
- [ ] 内部实现是否影响我们的覆盖？
- [ ] 新增的组件是否需要引入？
- [ ] 修复的 bug 是否影响我们？
- [ ] 全量测试是否通过？

## 合并策略

```bash
# 如果无冲突
git merge upstream/v2.x.x

# 如果有冲突
git merge upstream/v2.x.x
# 手动解决冲突后
git add .
git commit -m "chore: merge element-plus v2.x.x"
```

## 版本号更新

合并后更新 `package.json` 中的版本信息：

```json
{
  "_ep_fork_base": "2.x.x",
  "_ep_fork_merge_date": "2026-xx-xx"
}
```
