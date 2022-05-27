// 2种方式启动各章节项目：一、引入对应章节的App.vue； 二、将章节src下的所有内容复制粘贴到本项目的src。

//引入Vue
import Vue from 'vue'
//引入App
// import App from './App.vue'
import App from '../17_src_过度与动画/App'

//完整引入
//引入ElementUI组件库
// import ElementUI from 'element-ui';
//引入ElementUI全部样式
// import 'element-ui/lib/theme-chalk/index.css';

//按需引入
// import { Button,Row,DatePicker } from 'element-ui';

//关闭Vue的生产提示
Vue.config.productionTip = false

//应用ElementUI
// Vue.use(ElementUI);
// Vue.component('atguigu-button', Button);
// Vue.component('atguigu-row', Row);
// Vue.component('atguigu-date-picker', DatePicker);

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
})
