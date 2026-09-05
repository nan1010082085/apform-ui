import { createApp, defineAsyncComponent, defineComponent, h, type Component } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/styles/element-override.css'
import '@apform-ui/core/theme/dark.css'
import { componentDocs } from '@apform-ui/core/docs'
import App from './App.vue'
import DocHost from './components/DocHost.vue'
import RecipePage from './components/RecipePage.vue'
import { playgroundRoutes, routeComponents } from './routes'

/** 配方页文案 */
const RECIPE_COPY: Record<string, { title: string; description: string }> = {
  '/list-recipe': {
    title: '列表页配方 ListPageRecipe',
    description: 'PageShell + PageHeader + FilterBar + CardTable 等列表页黄金路径组合。',
  },
  '/chat-recipe': {
    title: '对话配方 ChatRecipe',
    description: 'SessionSidebar + ConversationHeader + MessageList + Composer 等对话页组合。',
  },
}

/**
 * 将 demo 视图包一层文档壳（有元数据则 DocPage，配方则 RecipePage）
 * @param path 路由 path
 * @param label 侧栏标签
 * @param group 分组
 * @param loader 异步组件加载器
 */
function wrapPage(
  path: string,
  label: string,
  group: string,
  loader: () => Promise<{ default: unknown }>,
): Component {
  const Demo = defineAsyncComponent(loader as () => Promise<{ default: Component }>)

  if (group === '配方') {
    const copy = RECIPE_COPY[path] ?? {
      title: label,
      description: '组合示例，非库导出组件。',
    }
    return defineComponent({
      name: `Recipe_${label}`,
      setup() {
        return () =>
          h(
            RecipePage,
            { title: copy.title, description: copy.description },
            { default: () => h(Demo) },
          )
      },
    })
  }

  const docName = label.replace(/\s*\(alias\)\s*$/i, '')
  if (componentDocs[docName]) {
    return defineComponent({
      name: `Doc_${docName}`,
      setup() {
        return () => h(DocHost, { docName, demo: Demo })
      },
    })
  }

  return Demo
}

const router = createRouter({
  history: createWebHistory('/schema-platform/apform-ui/'),
  routes: playgroundRoutes.map(({ path, label, group }) => ({
    path,
    component: wrapPage(path, label, group, routeComponents[path]),
  })),
})

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
