/**
 * 工作流 / 对话结果 → 人读 ResultBlock[]（禁止把 pretty JSON 当主展示）
 */
import type { ArtifactItem } from '../types/artifact'
import {
  extractBusinessResultTables,
  extractChartOption,
  type BusinessResultTable,
} from './businessResultTables'
import { normalizeNodeOutput } from './normalizeArtifact'
import { detectStructuredJsonKind, extractEmbeddedJson } from './structuredJson'

/** 人读结果形态 */
export type ResultKind =
  | 'thinking'
  | 'markdown'
  | 'text'
  | 'media'
  | 'script'
  | 'storyboard'
  | 'character-views'
  | 'table'
  | 'keyvalue'
  | 'chart'
  | 'code'
  | 'hitl'
  | 'empty'
  | 'unresolved'

/** 键值条目 */
export interface ResultBlockEntry {
  label: string
  value: string
  tone?: string
}

/** HITL 问答 */
export interface ResultHitlItem {
  question: string
  answer: string
}

/** 单角色三视图分组 */
export interface CharacterViewGroup {
  /** 角色名 */
  name: string
  /** 正 / 侧 / 背（可选立绘）产物 */
  artifacts: ArtifactItem[]
}

/** 单块人读结果 */
export interface ResultBlock {
  kind: ResultKind
  title?: string
  text?: string
  table?: BusinessResultTable
  entries?: ResultBlockEntry[]
  artifacts?: ArtifactItem[]
  /** 角色三视图分组 */
  characterViews?: CharacterViewGroup[]
  chartOption?: Record<string, unknown>
  chartType?: string
  language?: string
  hitlItems?: ResultHitlItem[]
  /** 仅供复制，不渲染为页面主内容 */
  copyPayload?: string
  message?: string
  /** script / storyboard 原始对象 */
  data?: unknown
}

/**
 * 结果预览受众。
 * - operator：节点调试 / 执行详情，展示完整字段（默认）
 * - user：终端用户气泡，只保留人读结果
 */
export type ResultAudience = 'operator' | 'user'

/** 解析选项 */
export interface ResolveResultOptions {
  nodeType?: string
  streamingText?: string
  streamingReasoning?: string
  role?: 'input' | 'output'
  /**
   * 受众；默认 operator。
   * user 时默认关闭剩余「其他字段」与 fallback 字段表，应用侧可再被细粒度开关覆盖。
   */
  audience?: ResultAudience
  /**
   * 是否输出剩余字段 keyvalue（「其他字段」/「输入字段」）。
   * 未传时：operator → true，user → false。
   */
  includeLeftoverFields?: boolean
  /**
   * 是否启用「任意对象数组字段 → 表」fallback（如 images 元数据表）。
   * 未传时：operator → true，user → false。
   */
  includeFallbackFieldTables?: boolean
}

/**
 * 解析 audience 派生的布尔开关（细粒度显式值优先）。
 * @param options 解析选项
 */
function resolveAudienceFlags(options: ResolveResultOptions): {
  includeLeftoverFields: boolean
  includeFallbackFieldTables: boolean
} {
  const isUser = options.audience === 'user'
  return {
    includeLeftoverFields:
      options.includeLeftoverFields ?? !isUser,
    includeFallbackFieldTables:
      options.includeFallbackFieldTables ?? !isUser,
  }
}

/** 已由专用块消费、不再进 keyvalue 的字段 */
const CONSUMED_KEYS = new Set([
  'reasoning',
  'thinking',
  'reasoning_content',
  'text',
  'content',
  'message',
  'imageUrls',
  'images',
  'portraitUrls',
  'referenceImageUrls',
  'videoUrl',
  'videoUrls',
  'mediaUrls',
  'documentIds',
  'documentId',
  'shots',
  'seconds',
  'scenes',
  'characters',
  'title',
  'stdout',
  'stderr',
  'option',
  'chartType',
  'violations',
  'anomalies',
  'submissions',
  'data',
  'items',
  'questions',
  'schema',
  'flow',
  'listView',
  'detailView',
  'moduleType',
])

/**
 * 标量可读化
 * @param value 任意值
 */
function scalarText(value: unknown): string {
  if (value == null) return '—'
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) {
    if (value.length === 0) return '（空列表）'
    if (value.every((v) => v == null || typeof v !== 'object')) {
      return value.map((v) => String(v)).join(', ')
    }
    return `列表（${value.length} 项）`
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value as object)
    return `对象（${keys.length} 个字段）`
  }
  return String(value)
}

/**
 * 对象数组 → 表
 * @param rows 行
 * @param title 标题
 * @param key 稳定 key
 */
function tableFromRows(
  rows: Record<string, unknown>[],
  title: string,
  key: string,
): BusinessResultTable {
  const colKeys = new Set<string>()
  for (const row of rows.slice(0, 20)) {
    for (const k of Object.keys(row)) colKeys.add(k)
  }
  return {
    key,
    title,
    columns: [...colKeys].map((prop) => ({ prop, label: prop })),
    rows,
  }
}

/**
 * 是否对象数组
 * @param value 任意值
 */
function asObjectRows(value: unknown): Record<string, unknown>[] | null {
  if (!Array.isArray(value) || value.length === 0) return null
  if (!value.every((r) => r && typeof r === 'object' && !Array.isArray(r))) return null
  return value as Record<string, unknown>[]
}

/**
 * 媒体产物（排除 json / 纯 text 墙）
 * @param payload 节点输出
 */
function mediaArtifacts(payload: unknown): ArtifactItem[] {
  return normalizeNodeOutput(payload).filter(
    (item) => item.kind !== 'json' && item.kind !== 'text',
  )
}

const VIEW_LABELS: Array<{ key: 'front' | 'side' | 'back' | 'portrait'; label: string }> = [
  { key: 'front', label: '正' },
  { key: 'side', label: '侧' },
  { key: 'back', label: '背' },
  { key: 'portrait', label: '立绘' },
]

/**
 * 从 characters[].views 抽取角色三视图分组。
 * 剧本等含 scenes 的结构不走此路径（由 detectStructuredJsonKind 抢先）。
 * @param obj 节点输出
 */
function extractCharacterViewGroups(obj: Record<string, unknown>): CharacterViewGroup[] {
  const chars = obj.characters
  if (!Array.isArray(chars) || chars.length === 0) return []
  const groups: CharacterViewGroup[] = []
  let seq = 0
  for (let i = 0; i < chars.length; i++) {
    const row = chars[i]
    if (!row || typeof row !== 'object' || Array.isArray(row)) continue
    const rec = row as Record<string, unknown>
    const viewsRaw = rec.views
    if (!viewsRaw || typeof viewsRaw !== 'object' || Array.isArray(viewsRaw)) continue
    const views = viewsRaw as Record<string, unknown>
    const artifacts: ArtifactItem[] = []
    for (const { key, label } of VIEW_LABELS) {
      const url = views[key]
      if (typeof url !== 'string' || !url.trim()) continue
      // 立绘仅在存在正/侧/背之外额外展示；无三视图时跳过纯立绘组
      if (key === 'portrait') continue
      seq += 1
      artifacts.push({
        id: `cv-${i}-${key}-${seq}`,
        kind: 'image',
        url: url.trim(),
        label,
        source: `views.${key}`,
      })
    }
    if (!artifacts.length) continue
    const name =
      typeof rec.name === 'string' && rec.name.trim()
        ? rec.name.trim()
        : `角色 ${groups.length + 1}`
    groups.push({ name, artifacts })
  }
  return groups
}

/**
 * 抽取思考文案
 * @param obj 对象
 * @param options 选项
 */
function pickReasoning(
  obj: Record<string, unknown> | null,
  options?: ResolveResultOptions,
): string {
  const stream = (options?.streamingReasoning || '').trim()
  if (stream) return stream
  if (!obj) return ''
  for (const key of ['reasoning', 'thinking', 'reasoning_content'] as const) {
    const v = obj[key]
    if (typeof v === 'string' && v.trim()) return v.trim()
  }
  return ''
}

/**
 * 抽取正文字案
 * @param obj 对象
 * @param options 选项
 */
function pickBodyText(
  obj: Record<string, unknown> | null,
  options?: ResolveResultOptions,
): string {
  const stream = (options?.streamingText || '').trim()
  if (stream) return stream
  if (!obj) return ''
  for (const key of ['text', 'content', 'message'] as const) {
    const v = obj[key]
    if (typeof v === 'string' && v.trim()) return v.trim()
  }
  return ''
}

/**
 * HITL 问答
 * @param obj 对象
 */
function pickHitlItems(obj: Record<string, unknown>): ResultHitlItem[] {
  const raw = obj.items ?? obj.questions
  if (!Array.isArray(raw)) return []
  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const row = item as Record<string, unknown>
      const question = String(row.question ?? row.prompt ?? row.label ?? '').trim()
      const answer = String(row.answer ?? row.value ?? row.response ?? '').trim()
      if (!question && !answer) return null
      return { question: question || '问题', answer: answer || '—' }
    })
    .filter((x): x is ResultHitlItem => x != null)
}

/**
 * 剩余字段 → keyvalue
 * @param obj 对象
 * @param skip 额外跳过
 */
function leftoverEntries(
  obj: Record<string, unknown>,
  skip: Set<string> = new Set(),
): ResultBlockEntry[] {
  const entries: ResultBlockEntry[] = []
  for (const [key, value] of Object.entries(obj)) {
    if (CONSUMED_KEYS.has(key) || skip.has(key)) continue
    if (value === undefined) continue
    entries.push({ label: key, value: scalarText(value) })
  }
  return entries
}

/**
 * 解析人读结果块
 * @param data 节点 input/output 或消息载荷
 * @param options 解析选项
 */
export function resolveResultBlocks(
  data: unknown,
  options: ResolveResultOptions = {},
): ResultBlock[] {
  const blocks: ResultBlock[] = []
  const nodeType = options.nodeType ?? ''

  if (data == null || data === '') {
    if (options.streamingReasoning || options.streamingText) {
      const reasoning = (options.streamingReasoning || '').trim()
      const text = (options.streamingText || '').trim()
      if (reasoning) blocks.push({ kind: 'thinking', title: '思考过程', text: reasoning })
      if (text) blocks.push({ kind: 'markdown', title: '正文', text })
      return blocks.length ? blocks : [{ kind: 'empty', title: '无输出' }]
    }
    return [{ kind: 'empty', title: '无输出' }]
  }

  if (typeof data === 'string') {
    const reasoning = (options.streamingReasoning || '').trim()
    if (reasoning) blocks.push({ kind: 'thinking', title: '思考过程', text: reasoning })

    const extracted = extractEmbeddedJson(data)
    if (extracted) {
      const kind = detectStructuredJsonKind(extracted.data)
      if (kind === 'script') {
        blocks.push({
          kind: 'script',
          title: '剧本预览',
          text: extracted.jsonText,
          data: extracted.data,
        })
      } else if (kind === 'storyboard') {
        blocks.push({
          kind: 'storyboard',
          title: '分镜预览',
          text: extracted.jsonText,
          data: extracted.data,
        })
      } else {
        const nested = resolveResultBlocks(extracted.data, { ...options, streamingText: undefined })
        blocks.push(...nested.filter((b) => b.kind !== 'empty'))
      }
      if (extracted.prose?.trim()) {
        blocks.push({ kind: 'markdown', title: '说明', text: extracted.prose.trim() })
      }
    } else {
      const body = (options.streamingText || data).trim()
      if (body) blocks.push({ kind: 'markdown', title: '正文', text: body })
    }

    const media = mediaArtifacts(data)
    if (media.length) blocks.push({ kind: 'media', title: '产物', artifacts: media })
    return blocks.length ? blocks : [{ kind: 'empty', title: '无输出' }]
  }

  const arrayRows = asObjectRows(data)
  if (arrayRows) {
    blocks.push({
      kind: 'table',
      title: options.role === 'input' ? '输入列表' : '结果列表',
      table: tableFromRows(arrayRows, '数据表', 'root-array'),
    })
    return blocks
  }

  if (typeof data !== 'object') {
    blocks.push({ kind: 'text', title: '结果', text: String(data) })
    return blocks
  }

  const obj = data as Record<string, unknown>
  const skip = new Set<string>()

  const reasoning = pickReasoning(obj, options)
  if (reasoning) {
    blocks.push({ kind: 'thinking', title: '思考过程', text: reasoning })
    skip.add('reasoning')
    skip.add('thinking')
    skip.add('reasoning_content')
  }

  if (nodeType === 'hitl' || Array.isArray(obj.items) || Array.isArray(obj.questions)) {
    const hitlItems = pickHitlItems(obj)
    if (hitlItems.length) {
      blocks.push({
        kind: 'hitl',
        title: typeof obj.message === 'string' ? obj.message : '人工确认',
        hitlItems,
        text: typeof obj.message === 'string' ? obj.message : undefined,
      })
      skip.add('items')
      skip.add('questions')
      skip.add('message')
    }
  }

  if (nodeType === 'code-execute') {
    if (typeof obj.stdout === 'string' && obj.stdout.trim()) {
      blocks.push({
        kind: 'code',
        title: '标准输出',
        text: obj.stdout,
        language: 'text',
      })
      skip.add('stdout')
    }
    if (typeof obj.stderr === 'string' && obj.stderr.trim()) {
      blocks.push({
        kind: 'code',
        title: '标准错误',
        text: obj.stderr,
        language: 'text',
      })
      skip.add('stderr')
    }
  }

  const structured = detectStructuredJsonKind(obj)
  if (structured === 'script') {
    blocks.push({ kind: 'script', title: '剧本预览', data: obj, text: undefined })
    skip.add('scenes')
    skip.add('characters')
    skip.add('title')
  } else if (structured === 'storyboard') {
    blocks.push({ kind: 'storyboard', title: '分镜预览', data: obj, text: undefined })
    skip.add('shots')
    skip.add('seconds')
  }

  const characterViews =
    structured == null ? extractCharacterViewGroups(obj) : []
  if (characterViews.length) {
    blocks.push({
      kind: 'character-views',
      title: '角色三视图',
      characterViews,
    })
    skip.add('characters')
    skip.add('imageUrls')
    skip.add('images')
    skip.add('portraitUrls')
    skip.add('frontImageUrls')
    skip.add('sideImageUrls')
    skip.add('backImageUrls')
    skip.add('referenceImageUrls')
    skip.add('views')
    skip.add('characterCount')
    skip.add('threeViewSetCount')
    skip.add('portraitCount')
    skip.add('count')
    skip.add('hasPortrait')
    skip.add('prompts')
    skip.add('prompt')
  }

  const chart = extractChartOption(nodeType || undefined, obj)
  if (chart) {
    blocks.push({
      kind: 'chart',
      title: '图表预览',
      chartType: chart.chartType,
      chartOption: chart.option,
    })
    skip.add('option')
    skip.add('chartType')
  }

  const audienceFlags = resolveAudienceFlags(options)

  const tables = extractBusinessResultTables(nodeType || undefined, obj, {
    includeFallbackFieldTables: audienceFlags.includeFallbackFieldTables,
  })
  for (const table of tables) {
    blocks.push({ kind: 'table', title: table.title, table })
    skip.add(table.key === 'violations' ? 'violations' : table.key.replace(/^field-/, ''))
  }

  // 已按角色成组展示时，不再拍平 media 网格
  if (!characterViews.length) {
    const media = mediaArtifacts(obj)
    if (media.length) {
      blocks.push({ kind: 'media', title: '产物预览', artifacts: media })
    }
  }

  const body = pickBodyText(obj, options)
  if (body && !structured) {
    // 正文若本身是 script/storyboard 字符串，交给嵌套解析
    const embedded = extractEmbeddedJson(body)
    const embeddedKind = embedded ? detectStructuredJsonKind(embedded.data) : null
    if (embeddedKind === 'script' || embeddedKind === 'storyboard') {
      blocks.push({
        kind: embeddedKind,
        title: embeddedKind === 'script' ? '剧本预览' : '分镜预览',
        text: embedded!.jsonText,
        data: embedded!.data,
      })
      if (embedded!.prose?.trim()) {
        blocks.push({ kind: 'markdown', title: '说明', text: embedded!.prose.trim() })
      }
    } else {
      blocks.push({ kind: 'markdown', title: '正文', text: body })
    }
    skip.add('text')
    skip.add('content')
    if (nodeType !== 'hitl') skip.add('message')
  }

  if (audienceFlags.includeLeftoverFields) {
    const entries = leftoverEntries(obj, skip)
    if (entries.length) {
      blocks.push({
        kind: 'keyvalue',
        title: options.role === 'input' ? '输入字段' : '其他字段',
        entries,
      })
    }
  }

  if (!blocks.length) {
    return [{ kind: 'empty', title: '无输出' }]
  }

  return blocks
}
