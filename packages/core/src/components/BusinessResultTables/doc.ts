/**
 * BusinessResultTables 文档元数据
 */
import type { ComponentDoc } from '../../docs/types'

/** BusinessResultTables 文档 */
export const BusinessResultTablesDoc: ComponentDoc = {
  name: 'BusinessResultTables',
  titleZh: '业务结果表',
  description:
    '将合规违规、异常项、表单提交、图表 data 等对象数组渲染为 el-table；配合 extractBusinessResultTables。',
  props: [
    {
      name: 'tables',
      type: 'BusinessResultTable[]',
      required: true,
      description: '表格列表（key/title/columns/rows）',
    },
  ],
  emits: [],
  slots: [],
}
