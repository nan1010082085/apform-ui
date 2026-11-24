/**
 * Top10 / 高频 composable 冒烟：分页逻辑 + 布局容器可挂载
 */
import { describe, it, expect } from 'vitest'
import { ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useClientPagination } from '../composables/useClientPagination'
import { CardTable } from '../components/CardTable'
import { FilterBar } from '../components/FilterBar'
import { PageShell } from '../components/PageShell'

describe('useClientPagination', () => {
  it('slices list and resets on pageSize change', async () => {
    const source = ref([1, 2, 3, 4, 5, 6, 7, 8])
    const { pagedItems, currentPage, pageSize, total, resetPage } = useClientPagination(source, {
      initialPageSize: 3,
    })
    expect(total.value).toBe(8)
    expect(pagedItems.value).toEqual([1, 2, 3])
    currentPage.value = 2
    await nextTick()
    expect(pagedItems.value).toEqual([4, 5, 6])
    pageSize.value = 5
    await nextTick()
    expect(currentPage.value).toBe(1)
    expect(pagedItems.value).toEqual([1, 2, 3, 4, 5])
    currentPage.value = 2
    resetPage()
    expect(currentPage.value).toBe(1)
  })
})

describe('layout smoke', () => {
  it('mounts PageShell / FilterBar / CardTable', () => {
    const shell = mount(PageShell, { slots: { default: 'body' } })
    expect(shell.text()).toContain('body')
    shell.unmount()

    const bar = mount(FilterBar, {
      global: { stubs: { 'el-button': true } },
    })
    expect(bar.exists()).toBe(true)
    bar.unmount()

    const table = mount(CardTable, { slots: { default: '<span>row</span>' } })
    expect(table.html()).toContain('row')
    table.unmount()
  })
})
