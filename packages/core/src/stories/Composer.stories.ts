/**
 * Composer — 展示源：playground/ComposerDemo.vue
 * 与真实业务用法同源，禁止另写假 demo。
 */
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PlaygroundDemo from '../../../../playground/src/views/ComposerDemo.vue'

const meta = {
  title: 'Chat/Composer',
  component: PlaygroundDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '展示内容来自 playground `ComposerDemo.vue`，样式栈与业务应用一致。',
      },
    },
  },
} satisfies Meta<typeof PlaygroundDemo>

export default meta
type Story = StoryObj<typeof meta>

/** 真实用法预览（playground 同源） */
export const RealPreview: Story = {
  name: '真实预览',
  render: () => ({
    components: { PlaygroundDemo },
    template: '<PlaygroundDemo />',
  }),
}
