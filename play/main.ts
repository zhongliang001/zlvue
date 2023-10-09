import { createApp } from 'vue'
import App from './app.vue'
import '@zl-vue/theme-chalk/src/index.scss'

import ZlInput from '../packages/components/input'

const app = createApp(App)
app.use(ZlInput)

app.mount('#app')
