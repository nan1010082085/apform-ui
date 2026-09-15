/**
 * 业务节点 / Chat 产物 → 表格与图表 option 提取
 */

/** 单张业务结果表 */
export interface BusinessResultTable {
  /** 稳定 key */
  key: string
  /** 标题 */
  title: string
  /** 列：prop → 表头 */
  columns: Array<{ prop: string; label: string }>
  /** 行 */
  rows: Record<string, unknown>[]
}

/** 可预览的 ECharts option */
export interface ChartOptionExtract {
  chartType: string
  option: Record<string, unknown>
}

/**
 * 从对象数组推断列
 * @param rows 行
 * @param preferred 优先列顺序
 */
function columnsFromRows(
  rows: Record<string, unknown>[],
  preferred: string[] = [],
): Array<{ prop: string; label: string }> {
  const keys = new Set<string>()
  for (const p of preferred) keys.add(p)
  for (const row of rows.slice(0, 20)) {
    for (const k of Object.keys(row)) keys.add(k)
  }
  return [...keys].map((prop) => ({ prop, label: prop }))
}

/**
 * 规范化为对象数组
 * @param value 任意值
 */
function asObjectRows(value: unknown): Record<string, unknown>[] | null {
  if (!Array.isArray(value) || value.length === 0) return null
  if (!value.every((r) => r && typeof r === 'object' && !Array.isArray(r))) return null
  return value as Record<string, unknown>[]
}

/**
 * chart-generate table 形态：option.columns + option.rows
 * @param option ECharts / table option
 */
function tableFromChartOption(option: unknown): BusinessResultTable | null {
  if (!option || typeof option !== 'object') return null
  const o = option as Record<string, unknown>
  const columnsRaw = o.columns
  const rowsRaw = o.rows
  if (!Array.isArray(columnsRaw) || !Array.isArray(rowsRaw)) return null

  const columns = columnsRaw.map((c, i) => {
    if (c && typeof c === 'object') {
      const col = c as Record<string, unknown>
      const prop = String(col.field ?? col.prop ?? `col${i}`)
      const label = String(col.title ?? col.label ?? prop)
      return { prop, label }
    }
    const prop = String(c)
    return { prop, label: prop }
  })

  const rows = rowsRaw.map((r) => {
    if (r && typeof r === 'object' && !Array.isArray(r)) return r as Record<string, unknown>
    return { value: r }
  })

  if (columns.length === 0 && rows.length === 0) return null
  return { key: 'chart-table', title: '图表数据表', columns, rows }
}

/**
 * 是否像 chart-generate 输出
 * @param obj 对象
 */
function looksLikeChartOutput(obj: Record<string, unknown>): boolean {
  const chartType = obj.chartType
  if (typeof chartType !== 'string' || !chartType.trim()) return false
  return obj.option != null && typeof obj.option === 'object'
}

/** 业务表提取选项 */
export interface ExtractBusinessResultTablesOptions {
  /**
   * 是否启用「任意对象数组字段 → 表」的 fallback。
   * 默认 true；终端用户预览应关，避免把 images 元数据表等调试残留渲出来。
   */
  includeFallbackFieldTables?: boolean
}

/**
 * 从节点 / 消息 output 提取业务表格
 * @param nodeType 节点类型（可选；缺省时按字段形态推断）
 * @param output 节点或消息输出
 * @param options 提取选项
 */
export function extractBusinessResultTables(
  nodeType: string | undefined,
  output: unknown,
  options: ExtractBusinessResultTablesOptions = {},
): BusinessResultTable[] {
  if (!output || typeof output !== 'object') return []
  const obj = output as Record<string, unknown>
  const tables: BusinessResultTable[] = []
  const type = nodeType ?? ''
  const includeFallbackFieldTables = options.includeFallbackFieldTables !== false

  if (type === 'compliance-check' || (!type && Array.isArray(obj.violations))) {
    const rows = asObjectRows(obj.violations)
    if (rows?.length) {
      tables.push({
        key: 'violations',
        title: '违规项',
        columns: columnsFromRows(rows, ['severity', 'rule', 'detail']),
        rows,
      })
    }
  }

  if (type === 'anomaly-detect' || (!type && Array.isArray(obj.anomalies))) {
    const rows = asObjectRows(obj.anomalies)
    if (rows?.length) {
      tables.push({
        key: 'anomalies',
        title: '异常项',
        columns: columnsFromRows(rows, ['severity', 'type', 'value', 'reason']),
        rows,
      })
    }
  }

  if (type === 'form-query' || (!type && Array.isArray(obj.submissions))) {
    const submissions = obj.submissions
    if (Array.isArray(submissions) && submissions.length) {
      const rows = submissions.map((s) => {
        if (!s || typeof s !== 'object') return { value: s } as Record<string, unknown>
        const item = s as Record<string, unknown>
        const data =
          item.data && typeof item.data === 'object' && !Array.isArray(item.data)
            ? (item.data as Record<string, unknown>)
            : {}
        return {
          id: String(item._id ?? item.id ?? ''),
          status: item.status ?? '',
          submitterId: item.submitterId ?? '',
          createdAt: item.createdAt ?? '',
          ...data,
        }
      })
      tables.push({
        key: 'submissions',
        title: `表单提交（共 ${Number(obj.total ?? rows.length)}）`,
        columns: columnsFromRows(rows, ['id', 'status', 'submitterId', 'createdAt']),
        rows,
      })
    }
  }

  if (type === 'chart-generate' || (!type && looksLikeChartOutput(obj))) {
    if (String(obj.chartType) === 'table') {
      const t = tableFromChartOption(obj.option)
      if (t) tables.push(t)
    }
    const dataRows = asObjectRows(obj.data)
    if (dataRows?.length) {
      tables.push({
        key: 'chart-data',
        title: '图表数据',
        columns: columnsFromRows(dataRows, ['label', 'value', 'name']),
        rows: dataRows,
      })
    }
  }

  if (type === 'module-assemble' || (!type && ('schema' in obj || 'moduleType' in obj))) {
    if (type === 'module-assemble' || obj.moduleType != null) {
      const parts: Array<{ key: string; label: string; present: boolean }> = [
        { key: 'schema', label: 'Schema', present: Boolean(obj.schema) },
        { key: 'flow', label: 'Flow', present: Boolean(obj.flow) },
        { key: 'listView', label: '列表视图', present: Boolean(obj.listView) },
        { key: 'detailView', label: '详情视图', present: Boolean(obj.detailView) },
      ]
      tables.push({
        key: 'module-parts',
        title: `模块组装（${String(obj.moduleType ?? '')}）`,
        columns: [
          { prop: 'part', label: '部件' },
          { prop: 'status', label: '状态' },
        ],
        rows: parts.map((p) => ({
          part: p.label,
          status: p.present ? '已生成' : '无',
        })),
      })
    }
  }

  if (includeFallbackFieldTables && tables.length === 0) {
    for (const [key, value] of Object.entries(obj)) {
      const rows = asObjectRows(value)
      if (!rows || rows.length < 1) continue
      if (rows.length === 1 && Object.keys(rows[0]).length > 12) continue
      tables.push({
        key: `field-${key}`,
        title: key,
        columns: columnsFromRows(rows),
        rows,
      })
      if (tables.length >= 2) break
    }
  }

  return tables
}

/**
 * 提取可渲染的 ECharts option（非 table）
 * @param nodeType 节点类型；缺省时按 chartType+option 形态识别（供 Chat 消息流）
 * @param output 输出
 */
export function extractChartOption(
  nodeType: string | undefined,
  output: unknown,
): ChartOptionExtract | null {
  if (!output || typeof output !== 'object') return null
  const obj = output as Record<string, unknown>
  if (nodeType && nodeType !== 'chart-generate') return null
  if (!nodeType && !looksLikeChartOutput(obj)) return null

  const chartType = String(obj.chartType ?? '')
  if (!chartType || chartType === 'table') return null
  if (!obj.option || typeof obj.option !== 'object') return null
  return {
    chartType,
    option: obj.option as Record<string, unknown>,
  }
}
