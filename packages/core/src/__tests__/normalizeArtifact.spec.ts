/**
 * normalizeArtifact 单测
 */
import { describe, expect, it } from 'vitest'
import {
  detectArtifactKind,
  extractDocumentId,
  normalizeAttachments,
  normalizeNodeOutput,
  tryParseJsonText,
} from '../utils/normalizeArtifact'

describe('extractDocumentId', () => {
  it('parses /api/ai/documents/:id/file', () => {
    expect(extractDocumentId('/api/ai/documents/aaaaaaaaaaaaaaaaaaaaaaaa/file')).toBe(
      'aaaaaaaaaaaaaaaaaaaaaaaa',
    )
  })
})

describe('tryParseJsonText', () => {
  it('parses object JSON', () => {
    const r = tryParseJsonText('{"shots":[{"id":1}]}')
    expect(r?.kind).toBe('json')
    expect(r?.text).toContain('"shots"')
  })

  it('parses fenced json', () => {
    const r = tryParseJsonText('```json\n{"a":1}\n```')
    expect(r?.kind).toBe('json')
  })

  it('rejects plain prose', () => {
    expect(tryParseJsonText('hello world')).toBeNull()
  })
})

describe('normalizeNodeOutput', () => {
  it('extracts video + images', () => {
    const items = normalizeNodeOutput({
      videoUrl: 'https://cdn.example/a.mp4',
      imageUrls: ['https://cdn.example/a.png'],
    })
    expect(items.some((i) => i.kind === 'video')).toBe(true)
    expect(items.some((i) => i.kind === 'image')).toBe(true)
  })

  it('dedupes imageUrls vs images and skips document chip when same doc', () => {
    const docUrl = '/api/ai/documents/aaaaaaaaaaaaaaaaaaaaaaaa/file'
    const items = normalizeNodeOutput({
      imageUrls: [docUrl],
      images: [{ url: 'https://cdn.example.com/a.png' }],
      mediaUrls: [docUrl],
      documentIds: ['aaaaaaaaaaaaaaaaaaaaaaaa'],
    })
    const images = items.filter((i) => i.kind === 'image')
    expect(images).toHaveLength(1)
    expect(images[0].url).toBe(docUrl)
    expect(items.some((i) => i.source === 'documentIds')).toBe(false)
  })

  it('does not surface referenceImageUrls as output previews', () => {
    const items = normalizeNodeOutput({
      videoUrl: 'https://cdn.example/out.mp4',
      referenceImageUrls: [
        '/api/ai/documents/aaaaaaaaaaaaaaaaaaaaaaaa/file',
        '/api/ai/documents/bbbbbbbbbbbbbbbbbbbbbbbb/file',
        '/api/ai/documents/cccccccccccccccccccccccc/file',
      ],
    })
    expect(items.filter((i) => i.kind === 'image')).toHaveLength(0)
    expect(items.filter((i) => i.kind === 'video')).toHaveLength(1)
  })

  it('promotes LLM JSON text to kind=json', () => {
    const items = normalizeNodeOutput({ text: '{"script":"ok","scenes":[]}' })
    expect(items).toHaveLength(1)
    expect(items[0].kind).toBe('json')
    expect(items[0].label).toBe('JSON 输出')
  })

  it('keeps plain LLM text as text', () => {
    const items = normalizeNodeOutput({ text: '一段普通回复' })
    expect(items[0].kind).toBe('text')
  })
})

describe('detectArtifactKind', () => {
  it('detects pdf by filename', () => {
    expect(detectArtifactKind({ filename: 'a.pdf' })).toBe('pdf')
  })

  it('detects video by extension including webm', () => {
    expect(detectArtifactKind({ url: 'https://x.com/a.webm' })).toBe('video')
    expect(detectArtifactKind({ url: 'https://x.com/a.mp4' })).toBe('video')
  })
})

describe('normalizeAttachments', () => {
  it('maps chat attachments', () => {
    const items = normalizeAttachments([
      {
        id: '1',
        filename: 'x.png',
        mimetype: 'image/png',
        url: 'https://cdn.example/x.png',
      },
    ])
    expect(items[0].kind).toBe('image')
  })
})
