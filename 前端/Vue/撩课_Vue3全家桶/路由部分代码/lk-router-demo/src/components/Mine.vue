<template>
  <div id="mine">
    <h2>我的</h2>
    <div class="content">
      <div class="content-nav">
        <router-link to="/mine/order">我的订单</router-link><br>
        <router-link to="/mine/msg">我的消息</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import {onActivated, onDeactivated, onMounted, onUnmounted} from "vue";

export default {
  name: "Mine",
  setup(){
    // document.title = '我的';

    onMounted(()=>{
      console.log('我的-----onMounted()')
    })

    onUnmounted(()=>{
      console.log('我的-----onUnmounted()')
    })

    onActivated(()=>{
      console.log('我的-------------onActivated()')
    })

    onDeactivated(()=>{
      console.log('我的-------------onDeactivated()')
    })
  }
}
</script>

<style scoped>
#mine{
  width: 400px;
  height: 500px;
  background-color: green;
}

.content{
  display: flex;
}

.content-nav{
  width: 80px;
  background-color: gold;
}

.content-list{
  flex: 1;
}
</style>