/**
 * 将节点 output / 附件列表归一为 ArtifactItem[]
 */
import type { ArtifactItem, ArtifactKind } from '../types/artifact'
import type { MessageAttachment } from '../types/chat'
import {
  detectStructuredJsonKind,
  extractEmbeddedJson,
  structuredJsonLabel,
} from './structuredJson'

const DOC_FILE_RE = /\/(?:schema-platform\/)?api\/ai\/documents\/([^/?#]+)\/file/i
const VIDEO_EXT_RE = /\.(mp4|webm|mov|m4v)(?:\?|#|$|\s)/i
const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|bmp|svg)(?:\?|#|$|\s)/i
const PDF_EXT_RE = /\.pdf(?:\?|#|$|\s)/i
const OFFICE_EXT_RE = /\.(docx?|xlsx?|csv|txt|md)(?:\?|#|$|\s)/i
const URL_IN_TEXT_RE =
  /(?:https?:\/\/[^\s"'<>\]]+|\/(?:schema-platform\/)?api\/ai\/documents\/[^/\s"'<>\]]+\/file)/gi

/**
 * 从 URL 提取平台 documentId
 * @param url 原始 URL
 */
export function extractDocumentId(url: string): string | undefined {
  const m = url.trim().match(DOC_FILE_RE)
  if (m?.[1]) return m[1]
  if (/^[0-9a-f]{24}$/i.test(url.trim())) return url.trim()
  return undefined
}

/**
 * 按 URL / 文件名 / mimetype 推断 kind
 */
export function detectArtifactKind(opts: {
  url?: string
  filename?: string
  mimetype?: string
  hint?: string
}): ArtifactKind {
  const { url = '', filename = '', mimetype = '', hint } = opts
  if (hint === 'video' || hint === 'videoUrl') return 'video'
  if (hint === 'image' || hint === 'imageUrls') return 'image'
  if (hint === 'text') return 'text'
  if (hint === 'json') return 'json'
  if (hint === 'document' || hint === 'documentIds') {
    const name = filename || url
    if (PDF_EXT_RE.test(name) || mimetype.includes('pdf')) return 'pdf'
    if (OFFICE_EXT_RE.test(name) || /word|sheet|excel|csv|text/.test(mimetype)) return 'office'
    return 'file'
  }

  const blob = [url, filename].filter(Boolean).join(' ').toLowerCase()
  const mime = mimetype.toLowerCase()
  if (mime.startsWith('video/') || VIDEO_EXT_RE.test(blob)) return 'video'
  if (mime.startsWith('image/') || IMAGE_EXT_RE.test(blob)) return 'image'
  if (mime.includes('pdf') || PDF_EXT_RE.test(blob)) return 'pdf'
  if (
    OFFICE_EXT_RE.test(blob)
    || mime.includes('word')
    || mime.includes('sheet')
    || mime.includes('excel')
    || mime.includes('csv')
    || mime.startsWith('text/')
  ) {
    return 'office'
  }
  // 无扩展名的平台文档 URL：默认 image（生图落库最常见）
  if (extractDocumentId(url) && !PDF_EXT_RE.test(url) && !OFFICE_EXT_RE.test(url) && !VIDEO_EXT_RE.test(url)) {
    return 'image'
  }
  return 'file'
}

/**
 * 去重键：优先 documentId，避免落库后 CDN url 与平台 file url 各算一张
 * @param item 产物项
 */
function artifactDedupeKey(item: ArtifactItem): string {
  if (item.documentId) return `doc:${item.documentId}`
  if (item.url) return `url:${item.url}`
  return `${item.kind}:${item.text?.slice(0, 40) ?? item.id}`
}

/**
 * @param list 产物列表
 * @param seen 已见键
 * @param item 待加入项
 */
function pushItem(list: ArtifactItem[], seen: Set<string>, item: ArtifactItem): void {
  const key = artifactDedupeKey(item)
  if (!key || seen.has(key)) return
  seen.add(key)
  list.push(item)
}

/**
 * 尝试把字符串识别为 JSON 产物（剧本 / 分镜等；支持混排文案内嵌 JSON）
 * @param raw 原始文本
 */
export function tryParseJsonText(raw: string): {
  kind: 'json'
  text: string
  label?: string
  prose?: string
} | null {
  const extracted = extractEmbeddedJson(raw)
  if (!extracted) return null
  const structured = detectStructuredJsonKind(extracted.data)
  return {
    kind: 'json',
    text: extracted.jsonText,
    label: structured ? structuredJsonLabel(structured) : 'JSON 输出',
    prose: extracted.prose || undefined,
  }
}

/**
 * 从工作流节点 output 抽取产物
 * @param payload 节点 output
 * @param idPrefix ID 前缀
 */
export function normalizeNodeOutput(payload: unknown, idPrefix = 'art'): ArtifactItem[] {
  if (payload == null) return []
  const list: ArtifactItem[] = []
  const seen = new Set<string>()
  let seq = 0
  const nextId = () => `${idPrefix}-${++seq}`

  if (typeof payload === 'string') {
    const matches = payload.match(URL_IN_TEXT_RE) ?? []
    for (const m of matches) {
      const kind = detectArtifactKind({ url: m })
      pushItem(list, seen, {
        id: nextId(),
        kind,
        url: m,
        documentId: extractDocumentId(m),
        source: 'text',
      })
    }
    if (!matches.length && payload.trim()) {
      const asJson = tryParseJsonText(payload)
      if (asJson?.prose) {
        pushItem(list, seen, {
          id: nextId(),
          kind: 'text',
          text: asJson.prose,
          label: '确认提示',
          source: 'text',
        })
      }
      pushItem(list, seen, {
        id: nextId(),
        kind: asJson?.kind ?? 'text',
        text: asJson?.text ?? payload,
        label: asJson?.label ?? '文本输出',
        source: 'text',
      })
    }
    return list
  }

  if (typeof payload !== 'object') return list
  const obj = payload as Record<string, unknown>

  const collectUrls = (value: unknown, source: string, hint?: string) => {
    if (!Array.isArray(value)) return
    for (const item of value) {
      let url = ''
      if (typeof item === 'string') url = item
      else if (item && typeof item === 'object' && 'url' in item) {
        url = String((item as { url?: unknown }).url ?? '')
      }
      if (!url.trim()) continue
      const kind = detectArtifactKind({ url, hint })
      pushItem(list, seen, {
        id: nextId(),
        kind,
        url,
        documentId: extractDocumentId(url),
        source,
      })
    }
  }

  const hasVideoShape =
    (typeof obj.videoUrl === 'string' && Boolean(obj.videoUrl.trim()))
    || (Array.isArray(obj.videoUrls)
      && obj.videoUrls.some((u) => typeof u === 'string' && Boolean(u.trim())))

  if (hasVideoShape) {
    /**
     * 视频节点：优先落库后的平台 mediaUrls（带 video hint），
     * 避免 CDN videoUrl 与平台 URL 双份，以及无扩展名平台 URL 被误判为 image。
     */
    const mediaList = Array.isArray(obj.mediaUrls) ? obj.mediaUrls : []
    const platformMedia = mediaList.filter(
      (u) => typeof u === 'string' && Boolean(extractDocumentId(u)),
    )
    if (platformMedia.length) {
      collectUrls(platformMedia, 'mediaUrls', 'video')
    } else if (typeof obj.videoUrl === 'string' && obj.videoUrl.trim()) {
      pushItem(list, seen, {
        id: nextId(),
        kind: 'video',
        url: obj.videoUrl,
        documentId: extractDocumentId(obj.videoUrl),
        source: 'videoUrl',
      })
    }
    collectUrls(obj.videoUrls, 'videoUrls', 'video')
  } else if (typeof obj.videoUrl === 'string' && obj.videoUrl.trim()) {
    pushItem(list, seen, {
      id: nextId(),
      kind: 'video',
      url: obj.videoUrl,
      documentId: extractDocumentId(obj.videoUrl),
      source: 'videoUrl',
    })
  }

  // 平台落库字段优先；有 imageUrls 时跳过 portrait/三视图镜像字段与原始 images，避免同图双份
  //（落库后 imageUrls 常为平台 URL，portraitUrls 曾残留 CDN，去重键不一致会渲染两张）
  collectUrls(obj.imageUrls, 'imageUrls', 'image')
  const hasImageUrls = list.some((i) => i.kind === 'image' && i.source === 'imageUrls')
  if (!hasImageUrls) {
    collectUrls(obj.portraitUrls, 'portraitUrls', 'image')
    collectUrls(obj.frontImageUrls, 'frontImageUrls', 'image')
    collectUrls(obj.sideImageUrls, 'sideImageUrls', 'image')
    collectUrls(obj.backImageUrls, 'backImageUrls', 'image')
  }
  if (!hasVideoShape) {
    collectUrls(obj.mediaUrls, 'mediaUrls')
    collectUrls(obj.videoUrls, 'videoUrls', 'video')
  }
  const hasPrimaryImages = list.some((i) => i.kind === 'image' && i.url)
  if (!hasPrimaryImages) {
    collectUrls(obj.images, 'images', 'image')
  }
  // referenceImageUrls 是视频参考输入，不是节点产出预览

  if (Array.isArray(obj.documentIds)) {
    for (const id of obj.documentIds) {
      if (typeof id !== 'string' || !id.trim()) continue
      // 已有同 documentId 的图/视频预览时，不再追加「文档 chip」
      if (seen.has(`doc:${id}`)) continue
      pushItem(list, seen, {
        id: nextId(),
        kind: detectArtifactKind({ url: id, hint: 'document' }),
        documentId: id,
        url: undefined,
        label: `文档 ${id.slice(-6)}`,
        source: 'documentIds',
      })
    }
  }

  if (typeof obj.documentId === 'string' && obj.documentId.trim()) {
    pushItem(list, seen, {
      id: nextId(),
      kind: detectArtifactKind({ url: obj.documentId, hint: 'document' }),
      documentId: obj.documentId,
      label: `文档 ${obj.documentId.slice(-6)}`,
      source: 'documentId',
    })
  }

  for (const key of ['text', 'message', 'confirmMessage', 'prompt'] as const) {
    const v = obj[key]
    if (typeof v !== 'string' || !v.trim()) continue
    const matches = v.match(URL_IN_TEXT_RE) ?? []
    for (const m of matches) {
      pushItem(list, seen, {
        id: nextId(),
        kind: detectArtifactKind({ url: m }),
        url: m,
        documentId: extractDocumentId(m),
        source: key,
      })
    }
    if (!matches.length && (key === 'text' || key === 'message')) {
      const asJson = tryParseJsonText(v)
      if (asJson?.prose) {
        pushItem(list, seen, {
          id: nextId(),
          kind: 'text',
          text: asJson.prose,
          label: key === 'message' ? '确认提示' : '说明',
          source: key,
        })
      }
      pushItem(list, seen, {
        id: nextId(),
        kind: asJson?.kind ?? 'text',
        text: asJson?.text ?? v,
        label: asJson?.label
          ?? (key === 'text' ? '文本输出' : '确认提示'),
        source: key,
      })
    }
  }

  return list
}

/**
 * 从 Chat 附件列表归一
 * @param attachments 消息附件
 */
export function normalizeAttachments(attachments: MessageAttachment[]): ArtifactItem[] {
  return attachments.map((att, i) => {
    const kind = detectArtifactKind({
      url: att.url,
      filename: att.filename,
      mimetype: att.mimetype,
    })
    return {
      id: att.id || `att-${i}`,
      kind,
      url: att.url,
      documentId: att.id,
      filename: att.filename,
      mimetype: att.mimetype,
      label: att.filename,
      source: 'attachment',
    }
  })
}
