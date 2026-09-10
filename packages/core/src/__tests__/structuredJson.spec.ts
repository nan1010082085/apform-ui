/**
 * structuredJson 单测
 */
import { describe, expect, it } from 'vitest'
import {
  detectStructuredJsonKind,
  extractEmbeddedJson,
  parseStructuredJsonContent,
} from '../utils/structuredJson'
import { normalizeNodeOutput, tryParseJsonText } from '../utils/normalizeArtifact'

describe('detectStructuredJsonKind', () => {
  it('detects storyboard by shots/seconds', () => {
    expect(detectStructuredJsonKind({ shots: [], seconds: [{ sec: 1 }] })).toBe('storyboard')
    expect(detectStructuredJsonKind({ shots: [{ id: 1 }] })).toBe('storyboard')
  })

  it('detects script by scenes+characters', () => {
    expect(detectStructuredJsonKind({
      title: 'A',
      scenes: [],
      characters: [{ name: 'B' }],
    })).toBe('script')
  })
})

describe('extractEmbeddedJson', () => {
  it('extracts JSON after Chinese prose', () => {
    const raw = '请确认剧本：\n{"title":"测","scenes":[],"characters":[]}'
    const r = extractEmbeddedJson(raw)
    expect(r?.prose).toContain('请确认剧本')
    expect(r?.jsonText).toContain('"title"')
  })
})

describe('tryParseJsonText + normalize HITL message', () => {
  it('promotes embedded script JSON in message', () => {
    const msg = '请确认剧本（时长建议 30～60s）：\n{"title":"夜雨","genre":"奇幻","scenes":[{"id":1}],"characters":[{"name":"阿宁"}]}'
    const parsed = tryParseJsonText(msg)
    expect(parsed?.kind).toBe('json')
    expect(parsed?.label).toBe('漫剧剧本')
    expect(parsed?.prose).toContain('请确认剧本')

    const items = normalizeNodeOutput({ message: msg })
    expect(items.some((i) => i.kind === 'json' && i.label === '漫剧剧本')).toBe(true)
    expect(items.some((i) => i.kind === 'text' && i.text?.includes('请确认剧本'))).toBe(true)
  })

  it('parseStructuredJsonContent works for storyboard', () => {
    const r = parseStructuredJsonContent(JSON.stringify({
      shots: [{ id: 's1', who: ['A'], does: '跑' }],
      seconds: [{ sec: 1, who: ['A'], does: '跑' }],
      clipDurationSec: 5,
    }))
    expect(r?.kind).toBe('storyboard')
  })
})
