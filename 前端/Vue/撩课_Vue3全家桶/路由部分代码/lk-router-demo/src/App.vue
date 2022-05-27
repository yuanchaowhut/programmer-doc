<template>
  <div>
    <!-- 导航 -->
    <div id="nav">
      <!--
      <router-link to="/home" active-class="current">首页</router-link>
      <router-link to="/mine" active-class="current">我的</router-link>
      -->

      <!--
      <router-link to="/home" replace>首页</router-link>
      <router-link to="/mine" replace>我的</router-link>
      -->

     <!--
      <router-link to="/home" replace>首页</router-link>
      <router-link to="/mine" replace>我的</router-link>
      -->

      <!-- 通过代码进行跳转-->
      <!--
      <button @click="home()">首页</button>
      <button @click="mine()">我的</button>
      -->

      <!-- 动态路由-->
      <router-link to="/home" >首页</router-link>
      <router-link to="/mine" >我的</router-link>

      <!-- <router-link to="/news/001" >新闻</router-link>-->
<!--      <router-link :to="'/news/' + newsId" >新闻</router-link>
      <router-link
          :to="{path: '/circle', query: {name: '撩课学院', site: 'itlike.com', age: 10}}">
        圈子
      </router-link>
      -->

      <button @click="news()">新闻</button>
      <button @click="circle()">圈子</button>
    </div>
    <!-- 路由出口 -->
    <!-- vue2中的写法 -->
    <!--
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    -->
    <!-- vue3中的写法 -->
<!--    <router-view v-slot="{ Component }">
      <keep-alive :exclude="['News', 'Circle']">
        <component :is="Component" />
      </keep-alive>
    </router-view>-->

<!--
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive"/>
    </router-view>
    -->

<!--    <router-view/>-->
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
import {ref} from 'vue'
export default {
  setup() {
    const newsId = ref('lk888')

    const router = useRouter()


    // 跳转到首页
    const home = ()=>{
      // alert('首页')
      // push ---> pushState
      // router.push('/home')
      // router.replace('/home')
    }

    // 跳转到我的
    const mine = ()=>{
      // alert('我的')
      // router.push('/mine')
      // router.replace('/mine')
    }

    // 跳转到新闻
    const news = ()=>{
      router.push('/news/' + newsId.value)
    }

    // 跳转到圈子
    const circle = ()=>{
      router.push({
        path: '/circle',
        query: {name: '撩课学院', site: 'itlike.com', age: 10}
      })
    }

    return {
      home,
      mine,
      newsId,
      news,
      circle
    }
  }
}
</script>

<style>
/*默认的选中样式类*/
.router-link-active{
  font-size: 18px;
  color: goldenrod;
  font-weight: bolder;
}

.current{
  font-size: 18px;
  color: red;
  font-weight: bolder;
}
</style>
