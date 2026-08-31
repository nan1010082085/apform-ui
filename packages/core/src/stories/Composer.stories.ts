import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Composer from '../components/Chat/Composer/Composer.vue'

const meta: Meta<typeof Composer> = {
  title: '对话组件/Composer 消息输入',
  component: Composer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Composer>

export const Basic: Story = {
  args: {
    disabled: false,
    supportedInputs: ['text'],
  },
}

export const WithFileUpload: Story = {
  args: {
    disabled: false,
    supportedInputs: ['text', 'file', 'image'],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    supportedInputs: ['text'],
  },
}

export const WithWebSocketStatus: Story = {
  args: {
    disabled: false,
    supportedInputs: ['text', 'file'],
    wsStatus: 'ok',
    wsLabel: '平台模型实时通道',
  },
}