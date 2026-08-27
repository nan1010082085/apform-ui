/**
 * @apform-ui/plugins/i18n — 轻量国际化插件
 */
import { ref, computed, type App, type InjectionKey, inject } from 'vue'

export interface I18nOptions {
  locale: string
  messages: Record<string, Record<string, string>>
  fallback?: string
}

const I18N_KEY: InjectionKey<ReturnType<typeof createI18nPlugin>> = Symbol('schema-i18n')

export function createI18nPlugin(options: I18nOptions) {
  const locale = ref(options.locale)
  const fallback = options.fallback ?? 'zh-CN'
  const messages = options.messages

  function t(key: string, params?: Record<string, string | number>): string {
    const dict = messages[locale.value] ?? messages[fallback] ?? {}
    let text = dict[key] ?? key

    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, String(v))
      }
    }

    return text
  }

  function setLocale(newLocale: string) {
    locale.value = newLocale
  }

  return {
    locale: computed(() => locale.value),
    t,
    setLocale,
    install(app: App) {
      app.provide(I18N_KEY, this)
      app.config.globalProperties.$t = t
    },
  }
}

export function useI18n() {
  const i18n = inject(I18N_KEY)
  if (!i18n) throw new Error('[apform-ui] useI18n() 必须在 createI18nPlugin() 之后使用')
  return i18n
}
