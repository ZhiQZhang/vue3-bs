import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant和样式并注册vant组件
import vant from 'vant'
import 'vant/lib/index.css'

createApp(App).use(store).use(router).use(vant).mount('#app')
