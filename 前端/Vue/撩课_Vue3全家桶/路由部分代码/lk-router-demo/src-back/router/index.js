// 1. 引入
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

/*
import Home from './../components/Home.vue'
import Mine from './../components/Mine.vue'
import News from './../components/News.vue'
*/

// 路由懒加载
/*const Home = ()=>import('./../components/Home.vue')
const Mine = ()=>import('./../components/Mine.vue')
const News = ()=>import('./../components/News.vue')*/


// 2. 创建路由对象
const routes = [
    // 路由的重定向
    {path: '/', redirect: '/home'},
    {path: '/home', component: ()=>import(/* webpackChunkName: "Home23" */'./../components/Home.vue')},
    {path: '/mine', component: ()=>import('./../components/Mine.vue')},
    {path: '/news/:id', component: ()=>import('./../components/News.vue')},
]

const router = createRouter({
    // 切换路由的模式
    history: createWebHashHistory(),
    routes,
    linkActiveClass: 'current'
})

// 3. 导出路由对象
export default router
