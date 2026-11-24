# Security Policy

## 支持版本

| 版本 | 支持 |
|------|------|
| 1.x  | ✅ 接收安全修复 |
| <1.0 | ❌ 不再维护 |

## 上报渠道

请**不要**在公开 Issue 中披露未修复漏洞。

优先使用：

1. [GitHub Security Advisory](https://github.com/nan1010082085/apform-ui/security/advisories/new)（私有）
2. 或向维护者邮箱发送说明（见仓库 About / npm author：`yangdongnan`）

报告请尽量包含：影响版本、复现步骤、预期与实际行为、是否已有 PoC。

## 响应时限

- **72 小时内**确认收到并给出初步分级
- 高危漏洞以可用补丁优先，随后在 CHANGELOG / GitHub Release 中披露（协调披露）

## 范围

`@apform-ui/core` 及同 monorepo 内官方文档站（playground）相关代码。第三方 peer（element-plus、echarts、pdfjs 等）请向对应上游上报。
