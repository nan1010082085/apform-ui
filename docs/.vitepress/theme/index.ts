/**
 * @apform-ui/docs 自定义主题
 *
 * 基于 VitePress 默认主题，扩展专业组件库文档功能
 */
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DemoBlock from './components/DemoBlock.vue'
import ApiTable from './components/ApiTable.vue'
import './styles/vars.css'
import './styles/demo.css'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DemoBlock', DemoBlock)
    app.component('ApiTable', ApiTable)
  },
} satisfies Theme
