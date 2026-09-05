import { describe, it, expect, vi } from 'vitest'
import { ref, nextTick, defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useDebounceFn } from '../composables/useDebounceFn'
import { useChatScroll } from '../composables/useChatScroll'
import { useClipboard } from '../composables/useClipboard'
import { renderMarkdown, splitTextAndCodeBlocks } from '../utils/textParser'
import { fileKind, formatSize, isPdf, isImage } from '../utils/attachmentKind'
import { isRegisteredAppIcon, APP_ICON_NAMES } from '../utils/iconRegistry'
import { resolveApiErrorMessage } from '../utils/resolveApiErrorMessage'
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../utils/pagination'

describe('useDebounceFn', () => {
  it('debounces function calls', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = useDebounceFn(fn, 100)
    debounced()
    debounced()
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })
})

describe('useClipboard', () => {
  it('copies text via clipboard API', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    const onSuccess = vi.fn()
    const { copy } = useClipboard({ onSuccess })
    const ok = await copy('hello')
    expect(ok).toBe(true)
    expect(writeText).toHaveBeenCalledWith('hello')
    expect(onSuccess).toHaveBeenCalledWith('hello')
  })
})

describe('useChatScroll', () => {
  it('tracks bottom state and respects autoScroll flag', async () => {
    const Host = defineComponent({
      setup() {
        const el = ref<HTMLElement | null>(null)
        const api = useChatScroll({ containerRef: el, autoScroll: true, offset: 50 })
        return { el, api }
      },
      template: '<div ref="el" style="height:200px;overflow:auto"><div style="height:500px"></div></div>',
    })

    const wrapper = mount(Host)
    const el = wrapper.vm.el as HTMLElement
    el.scrollTo = vi.fn(({ top }) => {
      el.scrollTop = top
    })
    Object.defineProperty(el, 'scrollHeight', { value: 500, configurable: true })
    Object.defineProperty(el, 'clientHeight', { value: 200, configurable: true })
    el.scrollTop = 260
    await nextTick()

    expect(wrapper.vm.api.checkIfAtBottom()).toBe(true)
    wrapper.vm.api.disableAutoScroll()
    await wrapper.vm.api.scrollToBottom(false)
    expect(el.scrollTop).toBe(260)

    await wrapper.vm.api.scrollToBottom(true)
    expect(el.scrollTo).toHaveBeenCalled()
    wrapper.unmount()
  })
})

describe('renderMarkdown', () => {
  it('renders heading html', () => {
    const html = renderMarkdown('# Title')
    expect(html).toContain('Title')
  })

  it('splits code blocks', () => {
    const parts = splitTextAndCodeBlocks('text\n```js\n1+1\n```\nmore')
    expect(parts.some((p) => p.type === 'code')).toBe(true)
    expect(parts.some((p) => p.type === 'text')).toBe(true)
  })
})

describe('attachmentKind', () => {
  it('detects pdf and image attachments', () => {
    const pdf = { id: '1', filename: 'a.pdf', mimetype: 'application/pdf' }
    const png = { id: '2', filename: 'b.png', mimetype: 'image/png' }
    expect(isPdf(pdf)).toBe(true)
    expect(isImage(png)).toBe(true)
    expect(fileKind(pdf)).toBe('PDF')
  })

  it('formats file size', () => {
    expect(formatSize(1024)).toContain('KB')
  })
})

describe('iconRegistry', () => {
  it('validates registered icons', () => {
    expect(isRegisteredAppIcon('setting')).toBe(true)
    expect(isRegisteredAppIcon('not-a-real-icon-name')).toBe(false)
    expect(APP_ICON_NAMES.length).toBeGreaterThan(10)
  })
})

describe('resolveApiErrorMessage', () => {
  it('extracts message from Error', () => {
    expect(resolveApiErrorMessage(new Error('网络错误'))).toBe('网络错误')
  })

  it('falls back for unknown shape', () => {
    expect(resolveApiErrorMessage(null)).toBeTruthy()
  })
})

describe('pagination constants', () => {
  it('exports default page size options', () => {
    expect(DEFAULT_PAGE_SIZE).toBeGreaterThan(0)
    expect(PAGE_SIZE_OPTIONS.length).toBeGreaterThan(0)
  })
})
