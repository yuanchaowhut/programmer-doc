<template>
   <div id="home">
      我是首页
     <input type="checkbox">
   </div>
</template>

<script>
import {onBeforeRouteLeave, onBeforeRouteUpdate} from 'vue-router'
import {onMounted, onUnmounted, onActivated, onDeactivated} from 'vue'
export default {
  name: "Home",
  setup(){
    // document.title = '首页';

   /* onBeforeRouteLeave((to, from, next)=>{
      next()
    })

    onBeforeRouteUpdate((to, from, next)=>{
      next()
    })*/

    onMounted(()=>{
      console.log('首页-------------onMounted()')
    })

    onUnmounted(()=>{
      console.log('首页-------------onUnmounted()')
    })

    onActivated(()=>{
      console.log('首页-------------onActivated()')
    })

    onDeactivated(()=>{
      console.log('首页-------------onDeactivated()')
    })

  }
}
</script>

<style scoped>
#home{
  width: 200px;
  height: 500px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>