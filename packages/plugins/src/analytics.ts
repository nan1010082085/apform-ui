/**
 * @apform-ui/plugins/analytics — 轻量埋点插件
 */
import type { App } from 'vue'

export interface AnalyticsEvent {
  /** 事件名 */
  event: string
  /** 事件属性 */
  properties?: Record<string, unknown>
  /** 时间戳 */
  timestamp?: number
}

export interface AnalyticsOptions {
  /** 上报函数 */
  onTrack: (event: AnalyticsEvent) => void
  /** 是否启用（默认 true） */
  enabled?: boolean
}

let options: AnalyticsOptions | null = null

export function track(event: string, properties?: Record<string, unknown>) {
  if (!options?.enabled) return

  options.onTrack({
    event,
    properties,
    timestamp: Date.now(),
  })
}

export function createAnalyticsPlugin(config: AnalyticsOptions) {
  options = { enabled: true, ...config }

  return {
    install(app: App) {
      app.config.globalProperties.$track = track
    },
  }
}
