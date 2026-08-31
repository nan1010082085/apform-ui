import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StatusTag from '../components/StatusTag/StatusTag.vue'

const meta: Meta<typeof StatusTag> = {
  title: '数据展示/StatusTag 状态标签',
  component: StatusTag,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'text', description: '状态值' },
    size: { control: 'select', options: ['small', 'default', 'large'], description: '尺寸' },
    round: { control: 'boolean', description: '圆角' },
  },
}

export default meta
type Story = StoryObj<typeof StatusTag>

export const AllStatuses: Story = {
  render: () => ({
    components: { StatusTag },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <StatusTag status="pending" />
        <StatusTag status="approved" />
        <StatusTag status="rejected" />
        <StatusTag status="running" />
        <StatusTag status="completed" />
        <StatusTag status="failed" />
        <StatusTag status="draft" />
        <StatusTag status="published" />
        <StatusTag status="active" />
        <StatusTag status="inactive" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { StatusTag },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <StatusTag status="approved" size="small" />
        <StatusTag status="approved" />
        <StatusTag status="approved" size="large" />
      </div>
    `,
  }),
}

export const CustomStatus: Story = {
  render: () => ({
    components: { StatusTag },
    template: `
      <StatusTag
        status="custom"
        :status-map="{
          custom: { label: '自定义状态', type: 'primary', effect: 'dark' }
        }"
      />
    `,
  }),
}