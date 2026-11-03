import { defineComponent } from 'vue'

/** 未安装 @vue-flow/controls 时的占位 */
export const Controls = defineComponent({
  name: 'ApformVueFlowControlsMissing',
  setup() {
    return () => null
  },
})

export default { Controls }
