import { createApp } from 'vue'
import { AppPagination } from '@apform-ui/core'

// 只导入AppPagination组件
const app = createApp({
  setup() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 100
    }
  },
  template: `
    <AppPagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
    />
  `
})

app.mount('#app')
