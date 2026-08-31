import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { useConfirm } from '../composables/useConfirm'
import { useMessage } from '../composables/useMessage'

const meta: Meta = {
  title: 'Composables/useConfirm 确认弹框',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Basic: Story = {
  render: () => ({
    setup() {
      const { confirm, confirmDelete, confirmDanger } = useConfirm()
      const msg = useMessage()

      async function handleConfirm() {
        const ok = await confirm('确定要保存当前更改吗？')
        msg[ok ? 'success' : 'info'](ok ? '已确认' : '已取消')
      }

      async function handleDelete() {
        const ok = await confirmDelete('该文件')
        if (ok) msg.success('删除成功')
      }

      async function handleDanger() {
        const ok = await confirmDanger('此操作不可恢复，确定继续？')
        if (ok) msg.warning('已确认危险操作')
      }

      return { handleConfirm, handleDelete, handleDanger }
    },
    template: `
      <div style="display: flex; gap: 8px;">
        <el-button @click="handleConfirm">通用确认</el-button>
        <el-button type="danger" @click="handleDelete">删除确认</el-button>
        <el-button type="warning" @click="handleDanger">危险操作</el-button>
      </div>
    `,
  }),
}