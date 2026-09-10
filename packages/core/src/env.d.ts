/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module '*.module.scss' {
  const classes: Record<string, string>
  export default classes
}

declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}

/** Google model-viewer Web Component（业务侧注册；库不强制依赖） */
declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': {
      src?: string
      poster?: string
      alt?: string
      'camera-controls'?: boolean
      'auto-rotate'?: boolean
      'shadow-intensity'?: number | string
      class?: string
      style?: string | Record<string, string>
      onLoad?: () => void
      onError?: (e: Event) => void
      children?: unknown
    }
  }
}
