import type { Meta, StoryObj } from '@storybook/vue3'
import AppIcon from '../components/AppIcon/AppIcon.vue'
import { APP_ICON_NAMES } from '../utils/iconRegistry'

const meta: Meta<typeof AppIcon> = {
  title: '基础组件/AppIcon 图标',
  component: AppIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: APP_ICON_NAMES,
      description: '图标名称',
    },
    size: { control: 'number', description: '图标大小(px)' },
    color: { control: 'color', description: '图标颜色' },
  },
}

export default meta
type Story = StoryObj<typeof AppIcon>

export const Basic: Story = {
  args: {
    name: 'setting',
    size: 24,
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { AppIcon },
    template: `
      <div style="display: flex; gap: 24px; align-items: flex-end;">
        <AppIcon name="star" :size="16" />
        <AppIcon name="star" :size="24" />
        <AppIcon name="star" :size="32" />
        <AppIcon name="star" :size="48" />
      </div>
    `,
  }),
}

export const Colors: Story = {
  render: () => ({
    components: { AppIcon },
    template: `
      <div style="display: flex; gap: 16px;">
        <AppIcon name="heart" :size="24" color="#E50113" />
        <AppIcon name="star" :size="24" color="#F09700" />
        <AppIcon name="circle-check" :size="24" color="#26A036" />
        <AppIcon name="info-filled" :size="24" color="#0060A2" />
      </div>
    `,
  }),
}

export const AllIcons: Story = {
  render: () => ({
    components: { AppIcon },
    setup() {
      return { icons: APP_ICON_NAMES }
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px;">
        <div v-for="name in icons" :key="name" style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 12px; border: 1px solid #e4e7ed; border-radius: 8px;">
          <AppIcon :name="name" :size="24" />
          <span style="font-size: 11px; color: #909399; word-break: break-all;">{{ name }}</span>
        </div>
      </div>
    `,
  }),
}
