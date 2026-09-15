# 架构定位：Element Plus 与设计令牌

> `@apform-ui/core@^1.18.1`  
> 本文说明：**Element Plus 如何算进本库能力面**，以及**视觉以谁为准**。

## 一句话

**Element Plus 是 `@apform-ui` 的底座 peer，业务在「本库栈」内可直接使用 `el-*`；外观必须以本库 Design Tokens + `element-override` 为准，而不是 EP 默认皮肤。**

不要求为每个 `el-tree` / `el-table` / `el-button` 再包一层 `AppTree` 才算「库里有」。

---

## 分层

```
┌─────────────────────────────────────────────┐
│  业务应用（ua / editor / flow / ai …）         │
│  使用：@apform-ui 导出组件 + Element Plus el-* │
├─────────────────────────────────────────────┤
│  @apform-ui/core                              │
│  · 平台积木（Layout / Dialog / Chat / Preview）│
│  · tokens.css / design-tokens.css             │
│  · styles/element-override.css（EP 皮肤映射） │
├─────────────────────────────────────────────┤
│  element-plus@2.14.2（peer，钉死版本）         │
│  · 原语：ElTree / ElTable / ElButton / …      │
└─────────────────────────────────────────────┘
```

| 层 | 算不算「组件库能力」 | 说明 |
|----|----------------------|------|
| `@apform-ui/core` 公开 export | ✅ | 本库产品组件 |
| `el-*`（在本库栈 + override 下） | ✅ | **底座能力，计入本库可用面** |
| 裸引 EP、不接 tokens / override | ❌ | 不算本库表现，禁止当设计源 |

---

## 视觉真相源（强制）

消费方必须按序引入（或等价聚合）：

```ts
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/style.css'                 // 或 chat.css / bpmn.css
import '@apform-ui/core/styles/element-override.css'
```

约定：

1. **颜色 / 圆角 / 间距 / 字号** → 本库 CSS 变量（tokens），不是 EP 默认 CSS 变量当主源。
2. **`element-override.css`** 把 EP 组件映射到上述 token；改皮肤改 token / override，不改业务里写死的 EP 色值。
3. 业务里写 `<el-tree>`、`<el-table>` **合法**，且应与 `AppIcon`、`CardTable` 等处在同一视觉体系下。

---

## 和「要不要再封装」的边界

| 场景 | 做法 |
|------|------|
| EP 原语已够用（树、表格、表单控件） | **直接用 `el-*`**，接好 token |
| 需要平台范式（列表页壳、对话气泡、属性面板） | 用 `@apform-ui/core` 导出组件 |
| 多仓重复、且要统一 API / 无障碍 / 文档 | 再抽成 `App*` 入库（在 `ui/` 内迭代） |

**禁止**把「库里没 export Tree」理解成「不能用树」——在本库定义下，树 = EP `ElTree`，已在能力面内。

---

## 版本钉死

- peer：`element-plus@2.14.2`（见 `package.json` `_ep_fork_base`）
- 升级 EP 须同步回归 tokens / `element-override` / playground，不得业务仓私自升主版本

## 相关

- [快速开始](./getting-started.md)
- [多入口迁移](./migration.md)
- 仓库根 `README.md` · `packages/core/README.md`
