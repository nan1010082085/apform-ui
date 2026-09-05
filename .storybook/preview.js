/**
 * Storybook Preview — 样式栈与 playground / 业务应用完全一致
 */
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { setup } from '@storybook/vue3'

import 'element-plus/dist/index.css'
import '../packages/core/src/tokens/tokens.css'
import '../packages/core/src/tokens/design-tokens.css'
import '../packages/core/styles/element-override.css'
import '../packages/core/src/theme/dark.css'
import './preview.css'

setup((app) => {
  app.use(ElementPlus, { locale: zhCn })
})

/** @type { import('@storybook/vue3-vite').Preview } */
const preview = {
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: '#F5F6FA' },
        { name: 'surface', value: '#FFFFFF' },
        { name: 'canvas', value: '#FAFBFC' },
      ],
    },
    options: {
      storySort: {
        order: [
          '介绍',
          '配方',
          '基础',
          'Layout',
          'Property',
          'Chat',
          'Preview',
          '反馈',
          '弹框',
          'Composables',
        ],
      },
    },
    docs: {
      toc: true,
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="apform-sb-root"><story /></div>',
    }),
  ],
}

export default preview
