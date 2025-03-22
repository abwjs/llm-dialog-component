// src/store/index.js
import { createPinia } from 'pinia'
import '@/store/modules/conversation'
import '@/store/modules/nav'
const pinia = createPinia()
export default pinia
