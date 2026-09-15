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

  it('extracts portraitUrls and three-view urls as images', () => {
    const items = normalizeNodeOutput({
      portraitUrls: ['/api/ai/documents/aaaaaaaaaaaaaaaaaaaaaaaa/file'],
      frontImageUrls: ['/api/ai/documents/bbbbbbbbbbbbbbbbbbbbbbbb/file'],
      sideImageUrls: ['/api/ai/documents/cccccccccccccccccccccccc/file'],
      backImageUrls: ['/api/ai/documents/dddddddddddddddddddddddd/file'],
      videoUrls: ['/api/ai/documents/eeeeeeeeeeeeeeeeeeeeeeee/file?type=video'],
    })
    expect(items.filter((i) => i.kind === 'image')).toHaveLength(4)
    expect(items.filter((i) => i.kind === 'video').length).toBeGreaterThanOrEqual(1)
    expect(items.some((i) => i.source === 'portraitUrls')).toBe(true)
  })

  it('skips portraitUrls when imageUrls already present (CDN vs platform dual)', () => {
    const items = normalizeNodeOutput({
      imageUrls: ['/api/ai/documents/aaaaaaaaaaaaaaaaaaaaaaaa/file'],
      portraitUrls: ['https://cdn.example.com/raw-portrait.png'],
      text: '战猿·铁牙 / 雄12',
    })
    const images = items.filter((i) => i.kind === 'image')
    expect(images).toHaveLength(1)
    expect(images[0].source).toBe('imageUrls')
    expect(items.some((i) => i.source === 'portraitUrls')).toBe(false)
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

  it('prefers platform mediaUrls over CDN videoUrl (video dual gap)', () => {
    const items = normalizeNodeOutput({
      videoUrl: 'https://cdn.example.com/out.mp4',
      mediaUrls: ['/api/ai/documents/dddddddddddddddddddddddd/file'],
      documentIds: ['dddddddddddddddddddddddd'],
    })
    const videos = items.filter((i) => i.kind === 'video')
    const images = items.filter((i) => i.kind === 'image')
    expect(videos).toHaveLength(1)
    expect(videos[0].source).toBe('mediaUrls')
    expect(images).toHaveLength(0)
  })

  it('skips portrait/front mirrors when imageUrls present across node types', () => {
    const card = normalizeNodeOutput({
      imageUrls: ['/api/ai/documents/aaaaaaaaaaaaaaaaaaaaaaaa/file'],
      portraitUrls: ['https://cdn.example.com/raw-portrait.png'],
      mediaUrls: ['/api/ai/documents/aaaaaaaaaaaaaaaaaaaaaaaa/file'],
    })
    expect(card.filter((i) => i.kind === 'image')).toHaveLength(1)

    const views = normalizeNodeOutput({
      imageUrls: [
        '/api/ai/documents/aaaaaaaaaaaaaaaaaaaaaaaa/file',
        '/api/ai/documents/bbbbbbbbbbbbbbbbbbbbbbbb/file',
        '/api/ai/documents/cccccccccccccccccccccccc/file',
      ],
      portraitUrls: ['https://cdn.example.com/p.png'],
      frontImageUrls: ['https://cdn.example.com/f.png'],
      sideImageUrls: ['https://cdn.example.com/s.png'],
      backImageUrls: ['https://cdn.example.com/b.png'],
    })
    expect(views.filter((i) => i.kind === 'image')).toHaveLength(3)
    expect(views.every((i) => i.source === 'imageUrls' || i.kind !== 'image')).toBe(true)
  })

  it('HITL message URL + same imageUrls dedupes; CDN text + platform does not', () => {
    const same = normalizeNodeOutput({
      message: '请确认：/api/ai/documents/aaaaaaaaaaaaaaaaaaaaaaaa/file',
      imageUrls: ['/api/ai/documents/aaaaaaaaaaaaaaaaaaaaaaaa/file'],
    })
    expect(same.filter((i) => i.kind === 'image')).toHaveLength(1)

    const mixed = normalizeNodeOutput({
      message: '请确认：https://cdn.example.com/raw.png',
      imageUrls: ['/api/ai/documents/aaaaaaaaaaaaaaaaaaaaaaaa/file'],
    })
    expect(mixed.filter((i) => i.kind === 'image')).toHaveLength(2)
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
