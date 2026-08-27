/**
 * @schema-ui/themes — 主题包
 *
 * 提供预置主题和主题切换工具。
 */

export type ThemeName = 'light' | 'dark'

/**
 * 切换主题
 * 通过在 <html> 上设置 data-theme 属性实现
 */
export function setTheme(theme: ThemeName): void {
  document.documentElement.setAttribute('data-theme', theme)

  // 同时设置 Element Plus 的暗色模式
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

/**
 * 获取当前主题
 */
export function getTheme(): ThemeName {
  return (document.documentElement.getAttribute('data-theme') as ThemeName) ?? 'light'
}

/**
 * 初始化主题（从 localStorage 读取）
 */
export function initTheme(storageKey = 'schema-ui-theme'): ThemeName {
  const saved = localStorage.getItem(storageKey) as ThemeName | null
  const theme = saved ?? 'light'
  setTheme(theme)
  return theme
}
