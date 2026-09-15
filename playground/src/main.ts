import { createApp, defineComponent, h, type Component } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/styles/element-override.css'
import '@apform-ui/core/theme/dark.css'
import '@apform-ui/core/bpmn.css'
import { componentDocs, type ComponentDoc } from '@apform-ui/core/docs'
import App from './App.vue'
import DocHost from './components/DocHost.vue'
import { playgroundRoutes, routeComponents } from './routes'

/**
 * 无独立 doc 文件时的兜底元数据（仅标题；空表不渲染 API 区）
 * @param name 侧栏标签名
 */
function fallbackDoc(name: string): ComponentDoc {
  return {
    name,
    titleZh: '',
    description: `${name} 用法示例。`,
  }
}

/**
 * 有文档元数据则套 DocHost；无元数据也套兜底 DocHost，保证每页有标题
 * @param label 侧栏标签
 * @param loader 异步 demo 加载器
 */
function wrapPage(
  label: string,
  loader: () => Promise<{ default: unknown }>,
): () => Promise<Component> {
  const docName = label.replace(/\s*\(alias\)\s*$/i, '')
  return async () => {
    const mod = await loader()
    const Demo = mod.default as Component
    const resolvedName = componentDocs[docName] ? docName : undefined
    return defineComponent({
      name: `Doc_${docName}`,
      setup() {
        return () =>
          h(DocHost, {
            docName: resolvedName,
            fallbackDoc: resolvedName ? undefined : fallbackDoc(docName),
            demo: Demo,
          })
      },
    })
  }
}

const router = createRouter({
  history: createWebHistory('/schema-platform/apform-ui/'),
  routes: playgroundRoutes.map(({ path, label }) => ({
    path,
    /** Overview 为组件总览，不套组件 API 壳 */
    component:
      path === '/'
        ? routeComponents[path]
        : wrapPage(label, routeComponents[path]),
  })),
})

const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.mount('#app')
