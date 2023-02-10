import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant和样式并注册vant组件
import vant from 'vant'
import 'vant/lib/index.css'
import * as echarts from 'echarts'

const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.use(store).use(router).use(vant).mount('#app')
