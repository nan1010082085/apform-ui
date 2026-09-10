import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { PropertyPanel } from '../components/PropertyPanel'
import { PropertyField } from '../components/PropertyField'
import type { PropertySection } from '../components/PropertyPanel'
import {
  evalVisibleOn,
  filterVisiblePropertyItems,
} from '../components/PropertyPanel/visibleOn'

const ep = { global: { plugins: [ElementPlus] } }

describe('PropertyField', () => {
  it('emits update for text', async () => {
    const wrapper = mount(PropertyField, {
      ...ep,
      props: {
        keyName: 'name',
        label: '名称',
        type: 'text',
        value: 'a',
      },
    })
    await wrapper.find('input').setValue('b')
    expect(wrapper.emitted('update')?.[0]?.[0]).toBe('b')
  })

  it('emits update for switch', async () => {
    const wrapper = mount(PropertyField, {
      ...ep,
      props: {
        keyName: 'on',
        label: '开关',
        type: 'switch',
        value: false,
      },
    })
    await wrapper.find('.el-switch').trigger('click')
    expect(wrapper.emitted('update')?.[0]?.[0]).toBe(true)
  })

  it('emits update for options add', async () => {
    const wrapper = mount(PropertyField, {
      ...ep,
      props: {
        keyName: 'opts',
        label: '选项',
        type: 'options',
        value: [{ label: 'A', value: 'a' }],
      },
    })
    const addBtn = wrapper
      .findAll('button')
      .find((b) => b.text().includes('添加选项'))
    expect(addBtn).toBeTruthy()
    await addBtn!.trigger('click')
    expect(wrapper.emitted('update')?.[0]?.[0]).toEqual([
      { label: 'A', value: 'a' },
      { label: '', value: '' },
    ])
  })

  it('emits update for number-array', async () => {
    const wrapper = mount(PropertyField, {
      ...ep,
      props: {
        keyName: 'widths',
        label: '列宽',
        type: 'number-array',
        value: [50, 50],
      },
    })
    const addBtn = wrapper
      .findAll('button')
      .find((b) => b.text().includes('添加') && !b.text().includes('选项'))
    expect(addBtn).toBeTruthy()
    await addBtn!.trigger('click')
    expect(wrapper.emitted('update')?.[0]?.[0]).toEqual([50, 50, 0])
  })
})

describe('evalVisibleOn / filterVisiblePropertyItems', () => {
  it('evaluates truthy key', () => {
    expect(evalVisibleOn('enabled', { enabled: true })).toBe(true)
    expect(evalVisibleOn('enabled', { enabled: false })).toBe(false)
  })

  it('evaluates === and !==', () => {
    expect(evalVisibleOn("mode==='advanced'", { mode: 'advanced' })).toBe(true)
    expect(evalVisibleOn("mode==='advanced'", { mode: 'basic' })).toBe(false)
    expect(evalVisibleOn("mode!=='basic'", { mode: 'advanced' })).toBe(true)
    expect(evalVisibleOn('count===2', { count: 2 })).toBe(true)
  })

  it('supports dotted path', () => {
    expect(
      evalVisibleOn("props.variant==='circle'", {
        props: { variant: 'circle' },
      }),
    ).toBe(true)
  })

  it('empty expr is visible; unknown expr defaults visible', () => {
    expect(evalVisibleOn('', {})).toBe(true)
    expect(evalVisibleOn(undefined, {})).toBe(true)
    expect(evalVisibleOn('a && b', { a: true, b: true })).toBe(true)
  })

  it('filters items by visibleOn', () => {
    const items = [
      { key: 'a', label: 'A', type: 'text' as const, value: '' },
      {
        key: 'b',
        label: 'B',
        type: 'text' as const,
        value: '',
        visibleOn: "mode==='x'",
      },
    ]
    expect(filterVisiblePropertyItems(items, { mode: 'x' })).toHaveLength(2)
    expect(filterVisiblePropertyItems(items, { mode: 'y' })).toHaveLength(1)
  })
})

describe('PropertyPanel', () => {
  const sections: PropertySection[] = [
    {
      key: 'basic',
      label: '基础',
      items: [
        { key: 'title', label: '标题', type: 'text', value: 'hello' },
        {
          key: 'mode',
          label: '模式',
          type: 'select',
          value: 'a',
          options: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ],
        },
      ],
    },
  ]

  it('renders sections and fields', () => {
    const wrapper = mount(PropertyPanel, {
      ...ep,
      props: { sections },
    })
    expect(wrapper.text()).toContain('基础')
    expect(wrapper.text()).toContain('标题')
    expect(wrapper.text()).toContain('模式')
  })

  it('emits update with sectionKey', async () => {
    const wrapper = mount(PropertyPanel, {
      ...ep,
      props: { sections },
    })
    await wrapper.find('input').setValue('world')
    expect(wrapper.emitted('update')?.[0]?.[0]).toEqual({
      sectionKey: 'basic',
      key: 'title',
      value: 'world',
    })
  })

  it('uses custom field slot', () => {
    const wrapper = mount(PropertyPanel, {
      ...ep,
      props: {
        sections: [
          {
            key: 'c',
            label: '自定义',
            items: [{ key: 'x', label: 'X', type: 'model-select', value: 'm1' }],
          },
        ],
      },
      slots: {
        'field-model-select': `<template #default="{ item, update }">
          <button class="custom-field" @click="update('m2')">{{ item.label }}</button>
        </template>`,
      },
    })
    expect(wrapper.find('.custom-field').exists()).toBe(true)
  })

  it('shows empty state', () => {
    const wrapper = mount(PropertyPanel, {
      ...ep,
      props: { sections: [], emptyText: '无配置' },
    })
    expect(wrapper.text()).toContain('无配置')
  })

  it('passes fetchRemoteOptions without throwing', async () => {
    const fetchRemoteOptions = vi.fn().mockResolvedValue([{ label: '一', value: '1' }])
    const wrapper = mount(PropertyPanel, {
      ...ep,
      props: {
        fetchRemoteOptions,
        sections: [
          {
            key: 'r',
            label: '远程',
            items: [
              {
                key: 'ref',
                label: '引用',
                type: 'remote-select',
                value: '',
                remoteUrl: '/api/opts',
              },
            ],
          },
        ],
      },
    })
    await vi.waitFor(() => expect(fetchRemoteOptions).toHaveBeenCalled())
    expect(wrapper.text()).toContain('引用')
  })

  it('auto-filters by values + visibleOn', () => {
    const wrapper = mount(PropertyPanel, {
      ...ep,
      props: {
        values: { showExtra: false },
        sections: [
          {
            key: 'v',
            label: '条件',
            items: [
              { key: 'showExtra', label: '显示扩展', type: 'switch', value: false },
              {
                key: 'extra',
                label: '扩展字段',
                type: 'text',
                value: '',
                visibleOn: 'showExtra',
              },
            ],
          },
        ],
      },
    })
    expect(wrapper.text()).toContain('显示扩展')
    expect(wrapper.text()).not.toContain('扩展字段')
  })
})
