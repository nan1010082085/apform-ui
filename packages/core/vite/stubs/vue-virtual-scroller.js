import { defineComponent, h } from 'vue'

/**
 * 未安装 vue-virtual-scroller 时的占位。
 * 主入口静态 import 该包，空模块必须导出同名组件，否则整站模块初始化失败。
 */
const Missing = defineComponent({
  name: 'ApformOptionalPeerMissing',
  setup(_, { slots }) {
    return () => h('div', { class: 'apf-optional-peer-missing' }, slots.default?.())
  },
})

export const DynamicScroller = Missing
export const DynamicScrollerItem = Missing
export const RecycleScroller = Missing
export default { DynamicScroller, DynamicScrollerItem, RecycleScroller }
