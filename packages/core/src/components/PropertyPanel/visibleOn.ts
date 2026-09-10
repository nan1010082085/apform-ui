/**
 * visibleOn 安全求值（禁止 eval / new Function）
 *
 * 仅支持简单模式：
 * - `key` — values 中该键为 truthy
 * - `key===value` / `key==value` — 相等
 * - `key!==value` / `key!=value` — 不等
 *
 * key 支持点路径（如 `props.variant`）；右侧仅为字面量（引号字符串 / 数字 / boolean / null）。
 */
import type { PropertyItem, PropertySection } from './types'

const COMPARE_RE =
  /^\s*([a-zA-Z_][\w.]*)\s*(===|!==|==|!=)\s*(.+?)\s*$/
const TRUTHY_RE = /^\s*([a-zA-Z_][\w.]*)\s*$/

/**
 * 从 values 按点路径取值
 * @param values 值字典
 * @param path 点路径
 */
function getByPath(values: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((cur, key) => {
    if (cur == null || typeof cur !== 'object') return undefined
    return (cur as Record<string, unknown>)[key]
  }, values)
}

/**
 * 解析比较右侧字面量
 * @param raw 原始文本
 */
function parseLiteral(raw: string): unknown {
  const text = raw.trim()
  if (
    (text.startsWith("'") && text.endsWith("'")) ||
    (text.startsWith('"') && text.endsWith('"'))
  ) {
    return text.slice(1, -1)
  }
  if (text === 'true') return true
  if (text === 'false') return false
  if (text === 'null') return null
  if (text === 'undefined') return undefined
  if (/^-?\d+(\.\d+)?$/.test(text)) return Number(text)
  return text
}

/**
 * 安全求值 visibleOn 表达式
 * @param expr 表达式；空则视为可见
 * @param values 当前属性值字典
 * @returns 是否可见；无法识别的表达式默认可见
 */
export function evalVisibleOn(
  expr: string | undefined | null,
  values: Record<string, unknown>,
): boolean {
  if (expr == null || !String(expr).trim()) return true
  const source = String(expr).trim()

  const compare = source.match(COMPARE_RE)
  if (compare) {
    const [, key, op, rhsRaw] = compare
    const left = getByPath(values, key)
    const right = parseLiteral(rhsRaw)
    if (op === '===' || op === '==') return left === right
    return left !== right
  }

  const truthy = source.match(TRUTHY_RE)
  if (truthy) {
    return Boolean(getByPath(values, truthy[1]))
  }

  return true
}

/**
 * 按 visibleOn 过滤属性项
 * @param items 属性项列表
 * @param values 当前值字典
 */
export function filterVisiblePropertyItems(
  items: PropertyItem[],
  values: Record<string, unknown>,
): PropertyItem[] {
  return items.filter((item) => evalVisibleOn(item.visibleOn, values))
}

/**
 * 按 visibleOn 过滤分区（空分区会剔除）
 * @param sections 分区列表
 * @param values 当前值字典
 */
export function filterVisiblePropertySections(
  sections: PropertySection[],
  values: Record<string, unknown>,
): PropertySection[] {
  return sections
    .map((section) => ({
      ...section,
      items: filterVisiblePropertyItems(section.items ?? [], values),
    }))
    .filter((section) => section.items.length > 0)
}
