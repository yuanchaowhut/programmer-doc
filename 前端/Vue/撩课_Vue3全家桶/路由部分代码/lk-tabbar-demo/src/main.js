import { createApp } from 'vue'
import App from './App.vue'

// import "./assets/css/common.css"

// 引入全局路由对象
import router from "./router/index.js";

const app = createApp(App)
app.use(router)
app.mount('#app')
