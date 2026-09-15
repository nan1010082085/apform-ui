import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { Composer } from '../Composer'
import { PromptOptimizeButton } from '../PromptOptimizeButton'

describe('PromptOptimizeButton', () => {
  it('emits click when enabled', async () => {
    const wrapper = mount(PromptOptimizeButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click while loading', async () => {
    const wrapper = mount(PromptOptimizeButton, { props: { loading: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('applies round shape class', () => {
    const wrapper = mount(PromptOptimizeButton, { props: { shape: 'round' } })
    expect(wrapper.classes()).toContain('apf-optimize-btn--round')
  })
})

describe('Composer promptOptimize', () => {
  it('calls request and replaces textarea', async () => {
    const request = vi.fn().mockResolvedValue('优化后的提示词')
    const wrapper = mount(Composer, {
      props: {
        disabled: false,
        placeholder: '输入…',
        promptOptimize: { request },
      },
    })
    const textarea = wrapper.find('textarea')
    await textarea.setValue('原始描述')
    await nextTick()
    const btn = wrapper.find('.apf-optimize-btn')
    expect(btn.exists()).toBe(true)
    await btn.trigger('click')
    await nextTick()
    await Promise.resolve()
    await nextTick()
    expect(request).toHaveBeenCalledWith('原始描述')
    expect((textarea.element as HTMLTextAreaElement).value).toBe('优化后的提示词')
  })

  it('actionShape=square applies to optimize and send', () => {
    const wrapper = mount(Composer, {
      props: {
        disabled: false,
        promptOptimize: { request: vi.fn().mockResolvedValue('x') },
        actionShape: 'square',
      },
    })
    expect(wrapper.find('.apf-optimize-btn--square').exists()).toBe(true)
    expect(wrapper.find('.apf-send-btn--square').exists()).toBe(true)
  })

  it('emits optimize-error when request fails', async () => {
    const err = new Error('boom')
    const request = vi.fn().mockRejectedValue(err)
    const wrapper = mount(Composer, {
      props: {
        disabled: false,
        promptOptimize: { request },
      },
    })
    await wrapper.find('textarea').setValue('草稿')
    await nextTick()
    await wrapper.find('.apf-optimize-btn').trigger('click')
    await nextTick()
    await Promise.resolve()
    await nextTick()
    expect(wrapper.emitted('optimize-error')?.[0]?.[0]).toBe(err)
  })
})
