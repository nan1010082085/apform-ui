/**
 * 剧本 / 分镜等结构化 JSON 识别与嵌入抽取
 */

/** 结构化预览类型 */
export type StructuredJsonKind = 'script' | 'storyboard'

/**
 * 识别剧本 / 分镜 JSON
 * @param data 已解析对象
 */
export function detectStructuredJsonKind(data: unknown): StructuredJsonKind | null {
  if (data == null || typeof data !== 'object' || Array.isArray(data)) return null
  const obj = data as Record<string, unknown>

  const hasShots = Array.isArray(obj.shots)
  const hasSeconds = Array.isArray(obj.seconds)
  if (hasShots || hasSeconds) return 'storyboard'

  const hasScenes = Array.isArray(obj.scenes)
  const hasCharacters = Array.isArray(obj.characters)
  if (hasScenes && hasCharacters) return 'script'
  if (typeof obj.title === 'string' && (hasScenes || hasCharacters)) return 'script'

  return null
}

/**
 * 结构化类型对应中文标签
 * @param kind 结构化类型
 */
export function structuredJsonLabel(kind: StructuredJsonKind): string {
  return kind === 'script' ? '漫剧剧本' : '视频分镜'
}

/**
 * 从候选字符串尝试 JSON.parse
 * @param candidate 候选文本
 */
function parseObjectJson(candidate: string): unknown | null {
  const text = candidate.trim()
  if (!text || (text[0] !== '{' && text[0] !== '[')) return null
  try {
    const parsed = JSON.parse(text)
    if (parsed == null || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

/**
 * 在混排文案中定位首个可解析的 JSON 对象/数组（支持字符串内括号）
 * @param raw 原始文本
 */
export function findEmbeddedJsonSpan(raw: string): { start: number; end: number; text: string } | null {
  const start = raw.search(/[\[{]/)
  if (start < 0) return null

  const open = raw[start]
  const close = open === '{' ? '}' : ']'
  let depth = 0
  let inString = false
  let escaped = false

  for (let i = start; i < raw.length; i += 1) {
    const ch = raw[i]
    if (inString) {
      if (escaped) {
        escaped = false
        continue
      }
      if (ch === '\\') {
        escaped = true
        continue
      }
      if (ch === '"') inString = false
      continue
    }
    if (ch === '"') {
      inString = true
      continue
    }
    if (ch === open) depth += 1
    else if (ch === close) {
      depth -= 1
      if (depth === 0) {
        const text = raw.slice(start, i + 1)
        if (parseObjectJson(text) != null) {
          return { start, end: i + 1, text }
        }
        return null
      }
    }
  }
  return null
}

/**
 * 从纯 JSON / fence / 混排文案中抽取 JSON
 * @param raw 原始文本
 */
export function extractEmbeddedJson(raw: string): {
  prose: string
  jsonText: string
  data: unknown
} | null {
  const trimmed = raw.trim()
  if (!trimmed) return null

  const fence = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/i)
  if (fence?.[1]) {
    const inner = fence[1].trim()
    const parsed = parseObjectJson(inner)
    if (parsed != null) {
      return { prose: '', jsonText: JSON.stringify(parsed, null, 2), data: parsed }
    }
  }

  const direct = parseObjectJson(trimmed)
  if (direct != null) {
    return { prose: '', jsonText: JSON.stringify(direct, null, 2), data: direct }
  }

  const span = findEmbeddedJsonSpan(trimmed)
  if (!span) return null
  const parsed = parseObjectJson(span.text)
  if (parsed == null) return null

  const prose = `${trimmed.slice(0, span.start)}${trimmed.slice(span.end)}`.trim()
  return {
    prose,
    jsonText: JSON.stringify(parsed, null, 2),
    data: parsed,
  }
}

/**
 * 从任意文本内容解析结构化 JSON（剧本 / 分镜）
 * @param content JSON 或混排文本
 */
export function parseStructuredJsonContent(content: string): {
  kind: StructuredJsonKind
  data: Record<string, unknown>
  jsonText: string
  prose: string
} | null {
  const extracted = extractEmbeddedJson(content)
  if (!extracted) return null
  const kind = detectStructuredJsonKind(extracted.data)
  if (!kind) return null
  return {
    kind,
    data: extracted.data as Record<string, unknown>,
    jsonText: extracted.jsonText,
    prose: extracted.prose,
  }
}
