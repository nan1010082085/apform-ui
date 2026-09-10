/**
 * businessResultTables 工具单测
 */
import { describe, expect, it } from 'vitest'
import {
  extractBusinessResultTables,
  extractChartOption,
} from '../utils/businessResultTables'

describe('extractBusinessResultTables', () => {
  it('compliance-check → violations', () => {
    const tables = extractBusinessResultTables('compliance-check', {
      violations: [{ rule: 'r1', detail: 'd', severity: 'high' }],
    })
    expect(tables[0].key).toBe('violations')
  })

  it('无 nodeType 时按字段推断 anomalies', () => {
    const tables = extractBusinessResultTables(undefined, {
      anomalies: [{ type: 'x', value: '1', reason: 'r', severity: 'low' }],
    })
    expect(tables[0].title).toBe('异常项')
  })

  it('chart table + data', () => {
    const tables = extractBusinessResultTables('chart-generate', {
      chartType: 'table',
      option: {
        columns: [{ field: 'a', title: 'A' }],
        rows: [{ a: 1 }],
      },
      data: [{ label: 'A', value: 1 }],
    })
    expect(tables.some((t) => t.key === 'chart-table')).toBe(true)
    expect(tables.some((t) => t.key === 'chart-data')).toBe(true)
  })
})

describe('extractChartOption', () => {
  it('bar 有 option；table 为 null', () => {
    expect(
      extractChartOption('chart-generate', {
        chartType: 'bar',
        option: { series: [] },
      }),
    ).toMatchObject({ chartType: 'bar' })
    expect(
      extractChartOption(undefined, {
        chartType: 'line',
        option: { series: [{ type: 'line' }] },
      }),
    ).toMatchObject({ chartType: 'line' })
    expect(
      extractChartOption('chart-generate', {
        chartType: 'table',
        option: { columns: [], rows: [] },
      }),
    ).toBeNull()
  })
})
