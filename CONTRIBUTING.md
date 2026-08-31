# 发包规则

## 发布流程（强制）

每个包发布前必须遵循以下流程：

### 1. 写 README

**先写 README，再发布。** 没有 README 的包禁止发布。

README 必须包含：
- 包名和一句话说明
- 安装命令
- 组件/函数清单（表格）
- 快速使用示例（代码块）
- API 说明或链接到文档站

### 2. 更新版本号

遵循 semver：
- `patch` — bugfix、文档更新、样式微调
- `minor` — 新组件、新功能
- `major` — 破坏性变更、API 改动

```bash
cd packages/<package>
npm version patch  # 或 minor / major
```

### 3. 构建验证

```bash
pnpm build:core   # 构建 core 包
# 或
cd packages/<package> && pnpm build
```

### 4. 发布

```bash
cd packages/<package>
npm publish --access public
```

### 5. 验证

```bash
curl -s "https://registry.npmjs.org/@apform-ui/<package>" | python3 -c "import sys,json; print(json.load(sys.stdin).get('dist-tags',{}).get('latest',''))"
```

## 发布顺序

包之间有依赖关系，必须按顺序发布：

```
1. @apform-ui/utils      （无依赖）
2. @apform-ui/icons       （依赖 @iconify/vue）
3. @apform-ui/themes      （CSS only）
4. @apform-ui/plugins     （依赖 vue）
5. @apform-ui/core        （依赖以上所有）
```

## 禁止事项

- ❌ 没有 README 就发布
- ❌ 跳过版本号直接发布
- ❌ 不验证就发布
- ❌ 覆盖已发布的版本（必须升版本号）