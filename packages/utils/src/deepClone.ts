/**
 * 深拷贝
 *
 * 支持 Date、RegExp、Map、Set、Array、Object。
 * 不支持循环引用（如需支持请使用 structuredClone）。
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj

  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as T
  if (obj instanceof Map) {
    const map = new Map()
    obj.forEach((value, key) => map.set(key, deepClone(value)))
    return map as T
  }
  if (obj instanceof Set) {
    const set = new Set()
    obj.forEach((value) => set.add(deepClone(value)))
    return set as T
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T
  }

  const result = {} as T
  for (const key of Object.keys(obj as object)) {
    ;(result as Record<string, unknown>)[key] = deepClone((obj as Record<string, unknown>)[key])
  }
  return result
}
