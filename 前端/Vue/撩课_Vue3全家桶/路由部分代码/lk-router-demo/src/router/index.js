// 1. 引入
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

import Home from './../components/Home.vue'
import Mine from './../components/Mine.vue'
import News from './../components/News.vue'
import Circle from './../components/Circle.vue'

import MineMsg from "../components/MineMsg.vue"
import MineOrder from "../components/MineOrder.vue"

// 2. 创建路由对象
const routes = [
    // 路由的重定向
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home, meta:{title:'首页', keepAlive: true}},
    {
        path: '/mine',
        component: Mine,
        children: [
            { path: '/mine', redirect: '/mine/order'},
            {path: 'msg', component: MineMsg, meta:{title:'我的消息'}},
            {
                path: 'order',
                component: MineOrder,
                children: [

                ], meta:{title:'我的订单'}
            }
        ],
        meta:{title:'我的'},
        beforeEach: (to, from, next)=>{

        }

    },
    {path: '/news/:id', component: News, meta:{title:'新闻'}},
    {path: '/circle', component: Circle, meta:{title:'圈子'}
    },

]

const router = createRouter({
    // 切换路由的模式
    history: createWebHashHistory(),
    routes,
    linkActiveClass: 'current'
})

// 全局路由的前置守卫
router.beforeEach((to, from, next)=>{
   // console.log('从哪里来:', from)
   // console.log('到哪里去:', to)

    // document.title = to.meta.title

   // 放行
   next()
})

// 全局路由的后置守卫
router.afterEach((to, from)=>{
    document.title = to.meta.title
})


// 3. 导出路由对象
export default router
