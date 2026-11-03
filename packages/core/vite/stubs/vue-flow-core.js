import { defineComponent, h } from 'vue'

/** 未安装 @vue-flow/core 时的占位，保证 bpmn 入口的静态 import 能完成求值 */
const Missing = defineComponent({
  name: 'ApformVueFlowMissing',
  setup(_, { slots }) {
    return () => h('div', slots.default?.())
  },
})

export const VueFlow = Missing
export const Handle = Missing
export const Position = { Left: 'left', Top: 'top', Right: 'right', Bottom: 'bottom' }
export const MarkerType = { Arrow: 'arrow', ArrowClosed: 'arrowclosed' }

/**
 * @returns {{ onNodeClick: () => void, fitView: () => Promise<void> }}
 */
export function useVueFlow() {
  return {
    onNodeClick() {},
    fitView() {
      return Promise.resolve()
    },
  }
}

export default { VueFlow, Handle, Position, MarkerType, useVueFlow }
