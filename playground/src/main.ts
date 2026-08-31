import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/styles/element-override.css'
import '@apform-ui/core/theme/dark.css'
import App from './App.vue'
import { playgroundRoutes, routeComponents } from './routes'

const router = createRouter({
  history: createWebHistory('/apform-ui/playground/'),
  routes: playgroundRoutes.map(({ path }) => ({
    path,
    component: routeComponents[path],
  })),
})

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
