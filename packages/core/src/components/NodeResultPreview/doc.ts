/**
 * NodeResultPreview 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** NodeResultPreview 文档 */
export const NodeResultPreviewDoc: ComponentDoc = {
  name: 'NodeResultPreview',
  titleZh: '节点结果预览',
  description:
    '工作流 / 对话结果人读编排壳。将 input/output 解析为 thinking、markdown、media、script、storyboard、character-views、table 等块；禁止把 pretty JSON 当主展示。',
  props: [
    {
      name: 'blocks',
      type: 'ResultBlock[]',
      description: '已解析块；与 data 二选一。显式传入（含空数组）时不再回落解析 data',
    },
    {
      name: 'data',
      type: 'unknown',
      description: '原始节点 input/output；未传 blocks 时由 resolveResultBlocks 解析',
    },
    { name: 'nodeType', type: 'string', description: '节点类型（影响 HITL / code-execute 等专用块）' },
    {
      name: 'role',
      type: "'input' | 'output'",
      default: "'output'",
      description: '输入或输出语境，影响标题文案',
    },
    {
      name: 'audience',
      type: "'operator' | 'user'",
      default: "'operator'",
      description: 'user 时默认隐藏「其他字段」与 fallback 表；终端聊天气泡传 user',
    },
    {
      name: 'includeLeftoverFields',
      type: 'boolean',
      description: '是否输出剩余 keyvalue；未传时随 audience',
    },
    {
      name: 'includeFallbackFieldTables',
      type: 'boolean',
      description: '是否启用对象数组 fallback 表；未传时随 audience',
    },
    {
      name: 'thinkingCollapsed',
      type: 'boolean',
      default: 'true',
      description: '思考块默认是否折叠',
    },
    { name: 'streamingText', type: 'string', description: '流式正文' },
    { name: 'streamingReasoning', type: 'string', description: '流式思考' },
  ],
  emits: [
    {
      name: 'preview',
      payload: 'ArtifactItem',
      description: '媒体 / 文件类预览（含 character-views 内文档 chip）',
    },
  ],
  slots: [],
}
