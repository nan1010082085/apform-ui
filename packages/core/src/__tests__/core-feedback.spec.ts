import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ElementPlus from 'element-plus'
import { AppDialog } from '../components/AppDialog'
import { AppIcon } from '../components/AppIcon'
import { AppPagination } from '../components/AppPagination'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { FormDialog } from '../components/FormDialog'
import { FilterTabs } from '../components/FilterTabs'
import { EmptyState } from '../components/EmptyState'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { StatusTag } from '../components/StatusTag'
import { Skeleton } from '../components/Skeleton'
import { CardGridSkeleton } from '../components/CardGridSkeleton'
import { UserAvatar } from '../components/UserAvatar'
import { MessageBubble } from '../components/Chat/MessageBubble'
import { MessageList } from '../components/Chat/MessageList'
import { Composer } from '../components/Chat/Composer'
import { RunStatusBar } from '../components/Chat/RunStatusBar'
import { ApprovalCard } from '../components/Chat/ApprovalCard'
import { ProcessingDrawer } from '../components/Chat/ProcessingDrawer'
import { DocumentPreviewDrawer } from '../components/DocumentPreview'
import { Toast } from '../components/Toast'
import type { Message, RunStatusView } from '../types'

const ep = { global: { plugins: [ElementPlus] } }

afterEach(() => {
  document.body.innerHTML = ''
})

function sampleMessage(overrides: Partial<Message> = {}): Message {
  return {
    id: 'm1',
    role: 'assistant',
    content: '你好',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

function sampleRun(overrides: Partial<RunStatusView> = {}): RunStatusView {
  return {
    runId: 'r1',
    sessionId: 's1',
    agentId: 'a1',
    runtimeExecutionId: null,
    status: 'RUNNING',
    errorMessage: null,
    waiting: null,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    ...overrides,
  }
}

describe('AppDialog', () => {
  it('renders title when open', async () => {
    const wrapper = mount(AppDialog, {
      ...ep,
      props: { modelValue: true, title: '弹框标题' },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('弹框标题')
    wrapper.unmount()
  })
})

describe('AppIcon', () => {
  it('renders registered icon', () => {
    const wrapper = mount(AppIcon, { props: { name: 'setting', size: 16 } })
    expect(wrapper.find('svg, span').exists()).toBe(true)
  })
})

describe('AppPagination', () => {
  it('shows total count', () => {
    const wrapper = mount(AppPagination, {
      ...ep,
      props: { total: 100, currentPage: 1, pageSize: 10 },
    })
    expect(wrapper.text()).toContain('100')
  })
})

describe('ConfirmDialog', () => {
  it('shows confirm message', async () => {
    const wrapper = mount(ConfirmDialog, {
      ...ep,
      props: { modelValue: true, message: '确定删除？' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('确定删除')
    wrapper.unmount()
  })
})

describe('FormDialog', () => {
  it('mounts with form data', async () => {
    const wrapper = mount(FormDialog, {
      ...ep,
      props: { modelValue: true, title: '编辑', formData: { name: 'test' } },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('编辑')
    wrapper.unmount()
  })
})

describe('FilterTabs', () => {
  it('emits update on tab click', async () => {
    const wrapper = mount(FilterTabs, {
      props: {
        modelValue: 'all',
        options: [
          { value: 'all', label: '全部' },
          { value: 'done', label: '完成' },
        ],
      },
    })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['done'])
  })
})

describe('EmptyState', () => {
  it('renders title and action text', () => {
    const wrapper = mount(EmptyState, {
      ...ep,
      props: { title: '暂无数据', actionText: '新建' },
    })
    expect(wrapper.text()).toContain('暂无数据')
    expect(wrapper.text()).toContain('新建')
  })

  it('renders compact action variant', () => {
    const wrapper = mount(EmptyState, {
      ...ep,
      props: { title: '暂无数据', compact: true, actionText: '刷新' },
    })
    expect(wrapper.text()).toContain('刷新')
  })
})

describe('ErrorBoundary', () => {
  it('renders default slot', () => {
    const wrapper = mount(ErrorBoundary, {
      slots: { default: '<span>正常内容</span>' },
    })
    expect(wrapper.text()).toContain('正常内容')
  })
})

describe('StatusTag', () => {
  it('renders approved label', () => {
    const wrapper = mount(StatusTag, { ...ep, props: { status: 'approved' } })
    expect(wrapper.text().length).toBeGreaterThan(0)
  })
})

describe('Skeleton', () => {
  it('renders list skeleton items', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'list', count: 2 } })
    expect(wrapper.findAll('div').length).toBeGreaterThan(2)
  })
})

describe('CardGridSkeleton', () => {
  it('renders card placeholders', () => {
    const wrapper = mount(CardGridSkeleton, { props: { count: 2 } })
    expect(wrapper.findAll('div').length).toBeGreaterThan(2)
  })
})

describe('UserAvatar', () => {
  it('shows name initial', () => {
    const wrapper = mount(UserAvatar, { props: { name: '张三' } })
    expect(wrapper.text()).toContain('张')
  })
})

describe('MessageBubble', () => {
  it('renders assistant message', () => {
    const wrapper = mount(MessageBubble, {
      props: { message: sampleMessage(), run: null, sending: false },
    })
    expect(wrapper.text()).toContain('你好')
  })
})

describe('MessageList', () => {
  it('renders message items', () => {
    const wrapper = mount(MessageList, {
      props: {
        messages: [sampleMessage(), sampleMessage({ id: 'm2', role: 'user', content: '提问' })],
        run: null,
        sending: false,
        loading: false,
        currentRun: null,
      },
    })
    expect(wrapper.text()).toContain('你好')
    expect(wrapper.text()).toContain('提问')
  })
})

describe('Composer', () => {
  it('disables send when empty', () => {
    const wrapper = mount(Composer, { props: { disabled: false } })
    const btn = wrapper.find('button.apf-send-btn')
    expect(btn.exists()).toBe(true)
    expect(btn.attributes('disabled')).toBeDefined()
  })
})

describe('RunStatusBar', () => {
  it('shows running label', () => {
    const wrapper = mount(RunStatusBar, {
      props: { run: sampleRun(), sending: false },
    })
    expect(wrapper.text()).toContain('正在处理')
  })
})

describe('ApprovalCard', () => {
  it('renders waiting prompt', () => {
    const wrapper = mount(ApprovalCard, {
      props: {
        disabled: false,
        waiting: {
          prompt: '请确认操作',
          dangerous: false,
          fields: [],
          actions: [{ action: 'ok', label: '确认', style: 'primary' }],
        },
      },
    })
    expect(wrapper.text()).toContain('请确认操作')
  })
})

describe('ProcessingDrawer', () => {
  it('opens with process title', async () => {
    const wrapper = mount(ProcessingDrawer, {
      ...ep,
      props: {
        modelValue: true,
        title: '处理进度',
        steps: [{ id: '1', label: '步骤1', status: 'done' }],
      },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('处理进度')
    wrapper.unmount()
  })
})

describe('Toast', () => {
  it('exposes show method', async () => {
    const wrapper = mount(Toast, { attachTo: document.body })
    const vm = wrapper.vm as { show?: (msg: string, type?: string) => void }
    expect(typeof vm.show).toBe('function')
    vm.show?.('测试提示', 'success')
    await wrapper.vm.$nextTick()
    expect(document.body.textContent).toContain('测试提示')
    wrapper.unmount()
  })
})

describe('DocumentPreviewDrawer', () => {
  it('shows filename in drawer', async () => {
    const wrapper = mount(DocumentPreviewDrawer, {
      ...ep,
      props: {
        modelValue: true,
        filename: 'report.pdf',
        chunks: [{ index: 0, text: 'preview text' }],
      },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('report.pdf')
    wrapper.unmount()
  })
})
