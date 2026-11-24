import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@apform-ui/core/tokens.css'
import '@apform-ui/core/design-tokens.css'
import '@apform-ui/core/style.css'
import '@apform-ui/core/styles/element-override.css'
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
