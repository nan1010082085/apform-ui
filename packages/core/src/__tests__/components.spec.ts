import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import ElementPlus from 'element-plus'
import { MessageParts, MessageAttachmentList, DocumentSummaryList, AttachmentPreviewModal } from '../components/Chat/message'
import { FilterBar } from '../components/FilterBar'
import { BreadcrumbNav } from '../components/BreadcrumbNav'
import { PdfPreviewCard } from '../components/PdfPreviewCard'
import { ExcelPreviewCard } from '../components/ExcelPreviewCard'
import { PageHeader } from '../components/PageHeader'
import { PageShell } from '../components/PageShell'
import { ContentPanel } from '../components/ContentPanel'
import { CardTable } from '../components/CardTable'
import { TableRowActions } from '../components/TableRowActions'
import { useClientPagination } from '../composables/useClientPagination'
import { FieldRow } from '../components/FieldRow'
import { HintText } from '../components/HintText'
import { SectionToggle } from '../components/SectionToggle'
import { TruncatedTooltipText } from '../components/TruncatedTooltipText'
import { LoadingDots } from '../components/LoadingDots'
import { JsonCard } from '../components/JsonCard'
import { JsonDetailDialog } from '../components/JsonDetailDialog'
import { SearchForm } from '../components/SearchForm'
import { SchemaLitePreview } from '../components/SchemaLitePreview'
import { SessionSidebar } from '../components/Chat/SessionSidebar'
import { ConversationHeader } from '../components/Chat/ConversationHeader'
import { DocumentPreviewPanel } from '../components/DocumentPreview'
import { AssistantPicker } from '../components/Chat/AssistantPicker'
import { ModelPicker } from '../components/Chat/ModelPicker'
import { useDataLoading } from '../composables/useDataLoading'

const ep = { global: { plugins: [ElementPlus] } }

describe('MessageParts', () => {
  it('mounts and renders markdown heading', () => {
    const wrapper = mount(MessageParts, { props: { content: '# hello' } })
    expect(wrapper.text()).toContain('hello')
  })
})

describe('MessageAttachmentList', () => {
  it('emits preview on file click', async () => {
    const att = { id: '1', filename: 'a.pdf', mimetype: 'application/pdf', url: '/a.pdf' }
    const wrapper = mount(MessageAttachmentList, {
      props: { attachments: [att] },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('preview')?.[0]?.[0]).toMatchObject({ id: '1' })
  })
})

describe('DocumentSummaryList', () => {
  it('renders summaries', () => {
    const wrapper = mount(DocumentSummaryList, {
      props: {
        summaries: [{ documentId: 'd1', filename: 'doc.pdf', summary: '摘要内容' }],
      },
    })
    expect(wrapper.text()).toContain('摘要内容')
  })
})

describe('AttachmentPreviewModal', () => {
  it('shows dialog when open with attachment', () => {
    const wrapper = mount(AttachmentPreviewModal, {
      props: {
        modelValue: true,
        attachment: { id: '1', filename: 'x.png', mimetype: 'image/png', url: 'https://example.com/x.png' },
      },
      attachTo: document.body,
    })
    expect(document.body.textContent).toContain('x.png')
    wrapper.unmount()
  })
})

describe('FilterBar', () => {
  it('emits search and reset', async () => {
    const wrapper = mount(FilterBar, ep)
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('search')).toBeTruthy()
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('reset')).toBeTruthy()
  })
})

describe('BreadcrumbNav', () => {
  it('emits navigate on link click', async () => {
    const wrapper = mount(BreadcrumbNav, {
      props: {
        items: [
          { label: '首页', to: '/' },
          { label: '列表', to: '/list' },
          { label: '详情' },
        ],
      },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('navigate')?.[0]).toEqual(['/'])
  })
})

describe('PdfPreviewCard / ExcelPreviewCard', () => {
  it('renders pdf iframe and excel table', () => {
    const pdf = mount(PdfPreviewCard, { props: { url: 'https://example.com/a.pdf' } })
    expect(pdf.find('iframe').attributes('src')).toBe('https://example.com/a.pdf')

    const excel = mount(ExcelPreviewCard, {
      props: {
        modelValue: 'S1',
        sheetNames: ['S1'],
        headers: ['A'],
        rows: [['1']],
        totalRows: 2,
      },
    })
    expect(excel.text()).toContain('A')
    expect(excel.text()).toContain('1')
  })
})

describe('PageHeader / PageShell / ContentPanel', () => {
  it('renders page chrome', () => {
    expect(mount(PageHeader, { props: { title: '列表', subtitle: '副标题' } }).text()).toContain('列表')
    expect(mount(PageShell, { slots: { default: 'body' } }).text()).toContain('body')
    expect(mount(ContentPanel, { props: { title: '面板' }, slots: { default: 'x' } }).text()).toContain('面板')
  })
})

describe('CardTable / TableRowActions', () => {
  it('mounts table helpers', () => {
    expect(mount(CardTable, { ...ep, slots: { default: 'table' } }).text()).toContain('table')
    const wrapper = mount(TableRowActions, {
      ...ep,
      props: {
        actions: [
          { key: 'a', label: '编辑', onClick: () => undefined },
          { key: 'b', label: '查看', onClick: () => undefined },
          { key: 'c', label: '删除', type: 'danger' as const, onClick: () => undefined },
          { key: 'd', label: '归档', onClick: () => undefined },
        ],
        collapseAt: 3,
        visibleCount: 2,
      },
    })
    expect(wrapper.text()).toContain('更多')
  })
})

describe('useClientPagination', () => {
  it('slices page data', async () => {
    const source = ref(Array.from({ length: 10 }, (_, i) => i))
    const { pagedItems, total, currentPage, pageSize } = useClientPagination(source, {
      initialPageSize: 3,
    })
    expect(total.value).toBe(10)
    expect(pagedItems.value).toEqual([0, 1, 2])
    currentPage.value = 2
    expect(pagedItems.value).toEqual([3, 4, 5])
    pageSize.value = 5
    await nextTick()
    expect(currentPage.value).toBe(1)
  })
})

describe('Property kit', () => {
  it('mounts FieldRow HintText SectionToggle TruncatedTooltipText LoadingDots', () => {
    expect(mount(FieldRow, { ...ep, props: { label: '名称' }, slots: { default: '<input />' } }).text()).toContain('名称')
    expect(mount(HintText, { ...ep, slots: { default: '提示' } }).exists()).toBe(true)
    expect(mount(SectionToggle, { props: { title: '分区', count: 2 }, slots: { default: '内容' } }).text()).toContain('分区')
    expect(mount(TruncatedTooltipText, { ...ep, props: { content: '很长的文字' } }).text()).toContain('很长的文字')
    expect(mount(LoadingDots).attributes('aria-label')).toBe('加载中')
  })
})

describe('JsonCard / JsonDetailDialog / SchemaLitePreview', () => {
  it('preview components work', async () => {
    expect(mount(JsonCard, { props: { title: '配置', data: { a: 1, b: 2 } } }).text()).toContain('2 个字段')
    const dialog = mount(JsonDetailDialog, {
      ...ep,
      props: { modelValue: true, title: '详情', data: { x: 1 } },
      attachTo: document.body,
    })
    await nextTick()
    const pre = document.body.querySelector('.apf-json-detail')
    expect(pre?.textContent || '').toContain('"x"')
    dialog.unmount()

    const preview = mount(SchemaLitePreview, {
      ...ep,
      props: {
        fields: [
          { key: 'name', label: '名称', type: 'input' },
          { key: 'on', label: '开关', type: 'switch' },
        ],
      },
    })
    expect(preview.text()).toContain('名称')
  })
})

describe('SearchForm', () => {
  it('emits search with values', async () => {
    const wrapper = mount(SearchForm, {
      ...ep,
      props: { fields: [{ key: 'q', label: '关键词', type: 'input' }] },
    })
    await wrapper.find('button.el-button--primary').trigger('click')
    expect(wrapper.emitted('search')).toBeTruthy()
  })
})

describe('Chat shell', () => {
  it('mounts SessionSidebar and ConversationHeader', () => {
    const sidebar = mount(SessionSidebar, {
      ...ep,
      props: {
        sessions: [
          {
            id: 's1',
            title: '会话A',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        activeId: 's1',
      },
    })
    expect(sidebar.text()).toContain('会话A')
    expect(mount(ConversationHeader, { props: { title: '智能体', hasMessages: true } }).text()).toContain('智能体')
  })
})

describe('useDataLoading', () => {
  it('manages loading and error via withLoading', async () => {
    const { loading, error, hasError, withLoading, reset } = useDataLoading()
    expect(loading.value).toBe(false)

    const result = await withLoading(async () => 'ok')
    expect(result).toBe('ok')
    expect(loading.value).toBe(false)

    const failed = await withLoading(async () => {
      throw new Error('boom')
    })
    expect(failed).toBeNull()
    expect(error.value).toBe('boom')
    expect(hasError.value).toBe(true)

    reset()
    expect(error.value).toBeNull()
    expect(hasError.value).toBe(false)
  })
})

describe('DocumentPreviewPanel', () => {
  it('renders chunks and emits download', async () => {
    const wrapper = mount(DocumentPreviewPanel, {
      ...ep,
      props: {
        filename: 'notes.txt',
        mimetype: 'text/plain',
        size: 12,
        chunks: [{ index: 0, text: 'hello chunk' }],
        hasOriginalFile: true,
      },
    })
    expect(wrapper.text()).toContain('hello chunk')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('download')).toBeTruthy()
  })
})

describe('AssistantPicker / ModelPicker', () => {
  it('selects assistant and model', async () => {
    const assistant = mount(AssistantPicker, {
      props: {
        items: [
          {
            id: 'a1',
            name: '助手A',
            description: '描述',
            supportedInputs: ['file'],
            hitlCapable: true,
          },
        ],
        modelValue: null,
      },
    })
    expect(assistant.text()).toContain('助手A')
    await assistant.find('button').trigger('click')
    expect(assistant.emitted('update:modelValue')?.[0]).toEqual(['a1'])
    expect(assistant.emitted('select')?.[0]?.[0]).toMatchObject({ id: 'a1' })

    const model = mount(ModelPicker, {
      ...ep,
      props: {
        models: [{ id: 'm1', name: 'GPT', provider: 'openai' }],
        modelValue: null,
        loading: false,
      },
    })
    expect(model.find('.apf-model-picker').exists()).toBe(true)
  })
})
