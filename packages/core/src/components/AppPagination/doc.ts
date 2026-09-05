/**
 * AppPagination 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** AppPagination 文档 */
export const AppPaginationDoc: ComponentDoc = {
  name: 'AppPagination',
  titleZh: '分页',
  description:
    '全站统一分页器。固定 layout（共 N 条 / 每页条数 / 上一页 / 页码 / 下一页）与背景色；total 为 0 时不渲染。',
  props: [
    {
      name: 'currentPage',
      type: 'number',
      required: true,
      description: '当前页，从 1 开始（支持 v-model:current-page）',
    },
    {
      name: 'pageSize',
      type: 'number',
      default: '10',
      description: '每页条数，可选 10 / 20 / 50（支持 v-model:page-size）',
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      description: '总条数；为 0 时不渲染分页器',
    },
    {
      name: 'size',
      type: "'default' | 'small'",
      default: "'default'",
      description: '尺寸；small 用于弹窗 / 侧栏等紧凑场景',
    },
  ],
  emits: [
    {
      name: 'update:currentPage',
      payload: 'page: number',
      description: '当前页变更',
    },
    {
      name: 'update:pageSize',
      payload: 'size: number',
      description: '每页条数变更',
    },
    {
      name: 'currentChange',
      payload: 'page: number',
      description: '当前页变更（同 update:currentPage）',
    },
    {
      name: 'sizeChange',
      payload: 'size: number',
      description: '每页条数变更（同 update:pageSize）',
    },
  ],
  slots: [],
}
