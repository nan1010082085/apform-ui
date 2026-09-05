/**
 * 本页目录（右栏）注册表 — 对齐 EP CONTENTS
 */
import { inject, provide, ref, type InjectionKey, type Ref } from 'vue'

/** 目录项 */
export interface DocTocItem {
  id: string
  label: string
}

interface DocTocApi {
  items: Ref<DocTocItem[]>
  register: (item: DocTocItem) => void
  unregister: (id: string) => void
  reset: () => void
}

const DOC_TOC_KEY: InjectionKey<DocTocApi> = Symbol('apform-doc-toc')

/** 在 DocPage 提供目录上下文 */
export function provideDocToc(): DocTocApi {
  const items = ref<DocTocItem[]>([])

  const api: DocTocApi = {
    items,
    register(item) {
      if (items.value.some((x) => x.id === item.id)) return
      items.value = [...items.value, item]
    },
    unregister(id) {
      items.value = items.value.filter((x) => x.id !== id)
    },
    reset() {
      items.value = []
    },
  }

  provide(DOC_TOC_KEY, api)
  return api
}

/** DemoBlock 注册锚点 */
export function useDocToc(): DocTocApi | null {
  return inject(DOC_TOC_KEY, null)
}
