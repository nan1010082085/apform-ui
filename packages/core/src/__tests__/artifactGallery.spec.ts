/**
 * ArtifactGallery / 执行壳 挂载单测
 */
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { ArtifactGallery } from '../components/ArtifactGallery'
import { NodeArtifactStrip } from '../components/NodeArtifactStrip'
import { HitlArtifactPanel } from '../components/HitlArtifactPanel'
import type { ArtifactItem } from '../types/artifact'

const sample: ArtifactItem[] = [
  {
    id: 'j1',
    kind: 'json',
    text: JSON.stringify({ a: 1 }, null, 2),
    label: 'JSON',
  },
  {
    id: 't1',
    kind: 'text',
    text: 'hello preview',
    label: '文本',
  },
]

describe('ArtifactGallery', () => {
  it('renders json + text rich preview', () => {
    const wrapper = mount(ArtifactGallery, {
      props: { items: sample },
      global: {
        stubs: {
          AppIcon: true,
          ElImageViewer: true,
          AppDialog: true,
        },
      },
    })
    expect(wrapper.text()).toContain('JSON')
    expect(wrapper.text()).toContain('hello preview')
  })
})

describe('NodeArtifactStrip', () => {
  it('mounts compact gallery', () => {
    const wrapper = mount(NodeArtifactStrip, {
      props: { items: sample },
      global: { stubs: { AppIcon: true, ElImageViewer: true, AppDialog: true } },
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('HitlArtifactPanel', () => {
  it('shows title', () => {
    const wrapper = mount(HitlArtifactPanel, {
      props: { items: sample, title: '节点产物' },
      global: { stubs: { AppIcon: true, ElImageViewer: true, AppDialog: true } },
    })
    expect(wrapper.text()).toContain('节点产物')
  })
})
