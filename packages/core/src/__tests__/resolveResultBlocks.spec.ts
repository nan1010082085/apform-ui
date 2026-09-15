/**
 * resolveResultBlocks — 人读结果块解析单测
 */
import { describe, expect, it } from 'vitest'
import { resolveResultBlocks } from '../utils/resolveResultBlocks'

describe('resolveResultBlocks', () => {
  it('returns empty block for null', () => {
    const blocks = resolveResultBlocks(null)
    expect(blocks).toEqual([{ kind: 'empty', title: '无输出' }])
  })

  it('splits reasoning from llm text', () => {
    const blocks = resolveResultBlocks(
      { text: '你好', reasoning: '先打招呼' },
      { nodeType: 'llm' },
    )
    expect(blocks.map((b) => b.kind)).toEqual(['thinking', 'markdown'])
    expect(blocks[0].text).toBe('先打招呼')
    expect(blocks[1].text).toBe('你好')
  })

  it('uses streaming reasoning and text', () => {
    const blocks = resolveResultBlocks(
      {},
      { streamingReasoning: '想…', streamingText: '答…' },
    )
    expect(blocks.map((b) => b.kind)).toEqual(['thinking', 'markdown'])
  })

  it('detects script shape without dumping json', () => {
    const blocks = resolveResultBlocks({
      title: '短片',
      characters: [{ name: '小明' }],
      scenes: [{ title: '开场' }],
    })
    expect(blocks.some((b) => b.kind === 'script')).toBe(true)
    expect(blocks.every((b) => b.kind !== 'unresolved')).toBe(true)
  })

  it('detects storyboard shape', () => {
    const blocks = resolveResultBlocks({
      shots: [{ id: 1 }],
      seconds: [{ sec: 1 }],
    })
    expect(blocks.some((b) => b.kind === 'storyboard')).toBe(true)
  })

  it('maps object array to table', () => {
    const blocks = resolveResultBlocks([
      { name: 'a', score: 1 },
      { name: 'b', score: 2 },
    ])
    expect(blocks).toHaveLength(1)
    expect(blocks[0].kind).toBe('table')
    expect(blocks[0].table?.rows).toHaveLength(2)
  })

  it('maps flat object to keyvalue', () => {
    const blocks = resolveResultBlocks({ foo: 'bar', count: 3 })
    expect(blocks.some((b) => b.kind === 'keyvalue')).toBe(true)
    const kv = blocks.find((b) => b.kind === 'keyvalue')
    expect(kv?.entries?.map((e) => e.label)).toEqual(expect.arrayContaining(['foo', 'count']))
  })

  it('maps code-execute stdout to code block', () => {
    const blocks = resolveResultBlocks(
      { stdout: 'console.log(1)', stderr: '', exitCode: 0 },
      { nodeType: 'code-execute' },
    )
    expect(blocks.some((b) => b.kind === 'code' && b.text?.includes('console.log'))).toBe(true)
    expect(blocks.some((b) => b.kind === 'keyvalue')).toBe(true)
  })

  it('extracts media urls into media block', () => {
    const blocks = resolveResultBlocks({
      imageUrls: ['https://example.com/a.png'],
      text: '配图说明',
    })
    expect(blocks.some((b) => b.kind === 'media')).toBe(true)
    expect(blocks.some((b) => b.kind === 'markdown' && b.text === '配图说明')).toBe(true)
  })

  it('extracts portraitUrls into media block for character cards', () => {
    const blocks = resolveResultBlocks({
      name: '小橘',
      portraitUrls: ['/api/ai/documents/aaaaaaaaaaaaaaaaaaaaaaaa/file'],
    })
    expect(blocks.some((b) => b.kind === 'media')).toBe(true)
    const media = blocks.find((b) => b.kind === 'media')
    expect(media?.artifacts?.some((a) => a.source === 'portraitUrls')).toBe(true)
  })

  it('never returns a kind that is raw json dump', () => {
    const blocks = resolveResultBlocks({ nested: { a: 1, b: 2 }, ok: true })
    expect(blocks.every((b) => b.kind !== 'json' as string)).toBe(true)
  })

  it('hitl questions become hitl block', () => {
    const blocks = resolveResultBlocks(
      {
        message: '请确认',
        items: [{ question: '通过？', answer: '是' }],
      },
      { nodeType: 'hitl' },
    )
    expect(blocks.some((b) => b.kind === 'hitl')).toBe(true)
  })

  it('audience=user keeps media and hides leftover / images fallback table', () => {
    const payload = {
      images: [{ url: 'https://example.com/cat.png', documentId: 'doc-1' }],
      prompt: '画一只猫',
      model: 'Qwen/Qwen-Image',
      provider: 'SiliconFlow',
      artifactId: 'art-1',
      artifactKind: 'image',
    }
    const operator = resolveResultBlocks(payload, { role: 'output' })
    expect(operator.some((b) => b.kind === 'media')).toBe(true)
    expect(operator.some((b) => b.kind === 'keyvalue')).toBe(true)
    expect(operator.some((b) => b.kind === 'table' && b.title === 'images')).toBe(true)

    const user = resolveResultBlocks(payload, { role: 'output', audience: 'user' })
    expect(user.some((b) => b.kind === 'media')).toBe(true)
    expect(user.every((b) => b.kind !== 'keyvalue')).toBe(true)
    expect(user.every((b) => b.kind !== 'table')).toBe(true)
  })

  it('includeLeftoverFields overrides audience=user', () => {
    const blocks = resolveResultBlocks(
      { imageUrls: ['https://example.com/a.png'], prompt: 'hi', model: 'm' },
      { audience: 'user', includeLeftoverFields: true },
    )
    expect(blocks.some((b) => b.kind === 'media')).toBe(true)
    expect(blocks.some((b) => b.kind === 'keyvalue')).toBe(true)
  })

  it('groups characters[].views into character-views without flat media', () => {
    const blocks = resolveResultBlocks(
      {
        characters: [
          {
            name: '黑衣剑客',
            desc: '男，黑衣持剑',
            views: {
              front: 'https://example.com/m-front.png',
              side: 'https://example.com/m-side.png',
              back: 'https://example.com/m-back.png',
            },
          },
          {
            name: '白衣双刀',
            views: {
              front: 'https://example.com/f-front.png',
              side: 'https://example.com/f-side.png',
              back: 'https://example.com/f-back.png',
            },
          },
        ],
        imageUrls: [
          'https://example.com/m-front.png',
          'https://example.com/m-side.png',
          'https://example.com/m-back.png',
          'https://example.com/f-front.png',
          'https://example.com/f-side.png',
          'https://example.com/f-back.png',
        ],
        characterCount: 2,
      },
      { role: 'output', audience: 'user' },
    )
    expect(blocks.some((b) => b.kind === 'character-views')).toBe(true)
    expect(blocks.every((b) => b.kind !== 'media')).toBe(true)
    const cv = blocks.find((b) => b.kind === 'character-views')
    expect(cv?.characterViews).toHaveLength(2)
    expect(cv?.characterViews?.[0].name).toBe('黑衣剑客')
    expect(cv?.characterViews?.[0].artifacts.map((a) => a.label)).toEqual(['正', '侧', '背'])
    expect(cv?.characterViews?.[1].name).toBe('白衣双刀')
    expect(cv?.characterViews?.[1].artifacts).toHaveLength(3)
  })

  it('does not treat script characters as character-views', () => {
    const blocks = resolveResultBlocks({
      title: '短片',
      characters: [{ name: '小明' }],
      scenes: [{ title: '开场' }],
    })
    expect(blocks.some((b) => b.kind === 'script')).toBe(true)
    expect(blocks.every((b) => b.kind !== 'character-views')).toBe(true)
  })
})
