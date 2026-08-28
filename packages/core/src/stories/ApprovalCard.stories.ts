import type { Meta, StoryObj } from '@storybook/vue3'
import ApprovalCard from '../components/Chat/ApprovalCard/ApprovalCard.vue'
import type { WaitingPayload } from '../types'

const meta: Meta<typeof ApprovalCard> = {
  title: '对话组件/ApprovalCard 审批确认',
  component: ApprovalCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ApprovalCard>

const basicWaiting: WaitingPayload = {
  prompt: '请确认以上信息是否正确，确认后将自动提交。',
  fields: [],
  actions: [
    { action: 'approve', label: '确认继续', style: 'primary' },
    { action: 'reject', label: '需要修改', style: 'danger' },
  ],
  dangerous: false,
}

const dangerousWaiting: WaitingPayload = {
  prompt: '此操作将删除所有数据，不可恢复。',
  fields: [],
  actions: [
    { action: 'approve', label: '确认删除', style: 'primary' },
    { action: 'reject', label: '取消', style: 'danger' },
  ],
  dangerous: true,
}

const withFieldsWaiting: WaitingPayload = {
  prompt: '请补充以下信息后继续：',
  fields: [
    { key: 'reason', label: '修改原因', type: 'textarea', options: [] },
    { key: 'priority', label: '优先级', type: 'select', options: ['高', '中', '低'] },
  ],
  actions: [
    { action: 'approve', label: '提交', style: 'primary' },
    { action: 'reject', label: '取消', style: 'danger' },
  ],
  dangerous: false,
}

export const Basic: Story = {
  args: {
    waiting: basicWaiting,
    disabled: false,
  },
}

export const Dangerous: Story = {
  args: {
    waiting: dangerousWaiting,
    disabled: false,
  },
}

export const WithFields: Story = {
  args: {
    waiting: withFieldsWaiting,
    disabled: false,
  },
}
