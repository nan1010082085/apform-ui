import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppDialog from '../components/AppDialog/AppDialog.vue'

const meta: Meta<typeof AppDialog> = {
  title: '基础组件/AppDialog 弹框',
  component: AppDialog,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean', description: '控制弹框显示' },
    title: { control: 'text', description: '弹框标题' },
    width: { control: 'text', description: '弹框宽度' },
    loading: { control: 'boolean', description: '确认按钮加载状态' },
    draggable: { control: 'boolean', description: '是否可拖拽' },
    showFullscreenBtn: { control: 'boolean', description: '是否显示全屏按钮' },
    cancelText: { control: 'text', description: '取消按钮文案' },
    confirmText: { control: 'text', description: '确认按钮文案' },
  },
}

export default meta
type Story = StoryObj<typeof AppDialog>

export const Basic: Story = {
  render: () => ({
    components: { AppDialog },
    setup() {
      const visible = ref(false)
      return { visible }
    },
    template: `
      <div>
        <el-button type="primary" @click="visible = true">打开弹框</el-button>
        <AppDialog v-model="visible" title="基础弹框">
          <p>这是一个基础弹框，支持拖拽和全屏切换。</p>
        </AppDialog>
      </div>
    `,
  }),
}

export const Fullscreen: Story = {
  render: () => ({
    components: { AppDialog },
    setup() {
      const visible = ref(false)
      return { visible }
    },
    template: `
      <div>
        <el-button @click="visible = true">全屏弹框</el-button>
        <AppDialog v-model="visible" title="全屏弹框" width="800px">
          <div style="padding: 20px;">
            <h3>全屏模式</h3>
            <p>点击右上角的全屏按钮可以切换全屏模式。</p>
          </div>
        </AppDialog>
      </div>
    `,
  }),
}

export const CustomButtons: Story = {
  render: () => ({
    components: { AppDialog },
    setup() {
      const visible = ref(false)
      return { visible }
    },
    template: `
      <div>
        <el-button @click="visible = true">自定义按钮</el-button>
        <AppDialog v-model="visible" title="自定义" cancel-text="Cancel" confirm-text="OK">
          <p>通过 cancel-text 和 confirm-text 自定义按钮文案。</p>
        </AppDialog>
      </div>
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { AppDialog },
    setup() {
      const visible = ref(false)
      const loading = ref(false)
      function handleConfirm() {
        loading.value = true
        setTimeout(() => {
          loading.value = false
          visible.value = false
        }, 2000)
      }
      return { visible, loading, handleConfirm }
    },
    template: `
      <div>
        <el-button @click="visible = true">加载状态</el-button>
        <AppDialog v-model="visible" title="提交中" :loading="loading" @confirm="handleConfirm">
          <p>点击确认后，按钮会显示加载状态，2秒后自动关闭。</p>
        </AppDialog>
      </div>
    `,
  }),
}