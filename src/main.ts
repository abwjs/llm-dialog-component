import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(pinia) //使用 Pinia
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
import '@/styles/index.scss'

app.mount('#app')
