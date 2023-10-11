import { createApp } from 'vue'
import App from './app.vue'
import '@zl-vue/theme-chalk/src/index.scss'

import install from 'zl-vue'

const app = createApp(App)
app.use(install)

app.mount('#app')
