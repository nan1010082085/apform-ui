import { defineComponent } from 'vue'

/** 未安装 @vue-flow/background 时的占位 */
export const Background = defineComponent({
  name: 'ApformVueFlowBackgroundMissing',
  setup() {
    return () => null
  },
})

export default { Background }
