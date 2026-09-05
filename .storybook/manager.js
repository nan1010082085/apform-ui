/**
 * Storybook Manager 主题 — 对齐品牌主色 #0060A2
 */
import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: '@apform-ui',
    brandUrl: './',
    brandTarget: '_self',

    colorPrimary: '#0060A2',
    colorSecondary: '#4581E9',

    appBg: '#F5F6FA',
    appContentBg: '#FFFFFF',
    appPreviewBg: '#F5F6FA',
    appBorderColor: '#EBEDF3',
    appBorderRadius: 2,

    textColor: '#333333',
    textInverseColor: '#FFFFFF',
    textMutedColor: '#909399',

    barTextColor: '#606266',
    barSelectedColor: '#0060A2',
    barHoverColor: '#4581E9',
    barBg: '#FFFFFF',

    inputBg: '#FFFFFF',
    inputBorder: '#D5DDE3',
    inputTextColor: '#333333',
    inputBorderRadius: 2,

    fontBase: '"Microsoft YaHei", "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontCode: 'Consolas, Monaco, monospace',
  }),
  sidebar: {
    showRoots: true,
  },
})
