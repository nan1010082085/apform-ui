/**
 * 可选 peer 动态加载（pdfjs-dist / xlsx）
 *
 * 宿主未安装时返回 null，组件回退到 iframe / props 壳。
 * 类型刻意放宽：兼容 pdfjs 多主版本。
 */

/** 宽松 pdfjs 模块 */
export type PdfjsModule = {
  GlobalWorkerOptions: { workerSrc: string }
  getDocument: (src: unknown) => { promise: Promise<any> }
}

/** 宽松 xlsx 模块 */
export type XlsxModule = {
  read: (data: ArrayBuffer, opts: { type: 'array' }) => {
    SheetNames: string[]
    Sheets: Record<string, unknown>
  }
  utils: {
    sheet_to_json: <T>(sheet: unknown, opts: { header: number; defval: string }) => T[]
  }
}

/**
 * 尝试加载 pdfjs-dist
 */
export async function tryLoadPdfjs(): Promise<PdfjsModule | null> {
  try {
    const imported = await import(/* @vite-ignore */ 'pdfjs-dist')
    const mod = (imported as { default?: PdfjsModule } & PdfjsModule).default
      ?? (imported as PdfjsModule)
    if (typeof mod?.getDocument !== 'function') return null
    try {
      mod.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.mjs',
        import.meta.url,
      ).href
    } catch {
      /* worker 可选 */
    }
    return mod
  } catch {
    return null
  }
}

/**
 * 尝试加载 xlsx
 */
export async function tryLoadXlsx(): Promise<XlsxModule | null> {
  try {
    const imported = await import(/* @vite-ignore */ 'xlsx')
    const mod = (imported as { default?: XlsxModule } & XlsxModule).default
      ?? (imported as XlsxModule)
    if (typeof mod?.read !== 'function' || !mod.utils) return null
    return mod
  } catch {
    return null
  }
}

/** 宽松 echarts 模块（init + 实例方法） */
export type EchartsModule = {
  init: (
    el: HTMLElement,
    theme?: string | object | null,
    opts?: object,
  ) => EchartsInstance
}

/** ECharts 实例最小接口 */
export type EchartsInstance = {
  setOption: (option: object, opts?: object) => void
  resize: () => void
  dispose: () => void
  on: (event: string, handler: (params: unknown) => void) => void
  off: (event: string, handler?: (params: unknown) => void) => void
}

/**
 * 尝试加载 echarts
 */
export async function tryLoadEcharts(): Promise<EchartsModule | null> {
  try {
    const imported = await import(/* @vite-ignore */ 'echarts')
    const mod = (imported as { default?: EchartsModule } & EchartsModule).default
      ?? (imported as EchartsModule)
    if (typeof mod?.init !== 'function') return null
    return mod
  } catch {
    return null
  }
}
