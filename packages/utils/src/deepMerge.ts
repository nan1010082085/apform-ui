/**
 * 深合并对象
 *
 * 递归合并 source 到 target，不修改原始对象。
 */
export function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target }

  for (const key of Object.keys(source) as (keyof T)[]) {
    const sourceVal = source[key]
    const targetVal = target[key]

    if (
      sourceVal !== null &&
      typeof sourceVal === 'object' &&
      !Array.isArray(sourceVal) &&
      targetVal !== null &&
      typeof targetVal === 'object' &&
      !Array.isArray(targetVal)
    ) {
      result[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
      ) as T[keyof T]
    } else if (sourceVal !== undefined) {
      result[key] = sourceVal as T[keyof T]
    }
  }

  return result
}
