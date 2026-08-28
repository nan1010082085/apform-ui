import type { Meta, StoryObj } from '@storybook/vue3'
import { useMessage } from '../composables/useMessage'

const meta: Meta = {
  title: 'Composables/useMessage 消息提示',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Basic: Story = {
  render: () => ({
    setup() {
      const msg = useMessage()
      return { msg }
    },
    template: `
      <div style="display: flex; gap: 8px;">
        <el-button @click="msg.success('操作成功！')">成功</el-button>
        <el-button @click="msg.error('操作失败')">错误</el-button>
        <el-button @click="msg.warning('请注意')">警告</el-button>
        <el-button @click="msg.info('提示信息')">信息</el-button>
      </div>
    `,
  }),
}
