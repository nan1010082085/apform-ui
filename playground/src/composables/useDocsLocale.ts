/**
 * 文档站语言状态 — 中英文切换，持久化到 localStorage
 */
import { computed, ref } from 'vue'
import {
  docsMessages,
  type DocsLocale,
  type NavGroupKey,
} from '../locale'

const STORAGE_KEY = 'apform-ui-docs-locale'

/**
 * @returns 初始语言（优先本地存储，默认中文）
 */
function readInitialLocale(): DocsLocale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'zh' || saved === 'en') return saved
  } catch {
    /* SSR / 隐私模式 */
  }
  return 'zh'
}

const locale = ref<DocsLocale>(readInitialLocale())

/**
 * 同步 `<html lang>` 与本地存储
 * @param next 目标语言
 */
function applyLocale(next: DocsLocale) {
  locale.value = next
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* ignore */
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en'
  }
}

applyLocale(locale.value)

/**
 * 文档站语言与分组文案
 */
export function useDocsLocale() {
  const t = computed(() => docsMessages[locale.value])

  /**
   * @param next 目标语言
   */
  function setLocale(next: DocsLocale) {
    applyLocale(next)
  }

  /** 中英文对调 */
  function toggleLocale() {
    applyLocale(locale.value === 'zh' ? 'en' : 'zh')
  }

  /**
   * @param key 分组 key
   * @returns 当前语言下的分组标题
   */
  function groupLabel(key: string) {
    const g = t.value.groups[key as NavGroupKey]
    return g?.label ?? key
  }

  /**
   * @param key 分组 key
   * @returns 当前语言下的分组简介
   */
  function groupDesc(key: string) {
    const g = t.value.groups[key as NavGroupKey]
    return g?.desc ?? ''
  }

  return {
    locale,
    t,
    setLocale,
    toggleLocale,
    groupLabel,
    groupDesc,
  }
}
