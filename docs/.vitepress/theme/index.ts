/**
 * @schema-ui/docs 自定义主题
 *
 * 基于 VitePress 默认主题，扩展 Demo 交互功能
 */
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DemoBlock from './components/DemoBlock.vue'
import './styles/demo.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 全局注册 Demo 组件
    app.component('DemoBlock', DemoBlock)
  },
} satisfies Theme
