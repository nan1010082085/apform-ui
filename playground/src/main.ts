import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/styles/element-override.css'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory('/apform-ui/playground/'),
  routes: [
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/dialog', component: () => import('./views/DialogDemo.vue') },
    { path: '/icon', component: () => import('./views/IconDemo.vue') },
    { path: '/pagination', component: () => import('./views/PaginationDemo.vue') },
    { path: '/status-tag', component: () => import('./views/StatusTagDemo.vue') },
    { path: '/skeleton', component: () => import('./views/SkeletonDemo.vue') },
    { path: '/empty', component: () => import('./views/EmptyDemo.vue') },
    { path: '/avatar', component: () => import('./views/AvatarDemo.vue') },
    { path: '/filter-tabs', component: () => import('./views/FilterTabsDemo.vue') },
    { path: '/toast', component: () => import('./views/ToastDemo.vue') },
    { path: '/confirm', component: () => import('./views/ConfirmDemo.vue') },
    { path: '/message', component: () => import('./views/MessageDemo.vue') },
    { path: '/error-boundary', component: () => import('./views/ErrorBoundaryDemo.vue') },
    { path: '/debounce', component: () => import('./views/DebounceDemo.vue') },
    { path: '/list-recipe', component: () => import('./views/ListPageRecipeDemo.vue') },
    { path: '/chat-recipe', component: () => import('./views/ChatRecipeDemo.vue') },
    { path: '/property-preview', component: () => import('./views/PropertyPreviewDemo.vue') },
  ],
})

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
