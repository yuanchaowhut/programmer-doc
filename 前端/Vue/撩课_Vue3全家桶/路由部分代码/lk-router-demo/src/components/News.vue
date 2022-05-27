<template>
   <div id="news">
      <p>新闻详情</p>
      <p>新闻的id: {{$route.params.id}}</p>
   </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {onActivated, onDeactivated, onMounted, onUnmounted} from "vue";
export default {
  name: "News",
  setup(){
    const route = useRoute()
    // console.log(route.params)
    // console.log(route.params.id)

    // document.title = '新闻'

    onMounted(()=>{
      console.log('新闻-------------onMounted()')
    })

    onUnmounted(()=>{
      console.log('新闻-------------onUnmounted()')
    })

    onActivated(()=>{
      console.log('新闻-------------onActivated()')
    })

    onDeactivated(()=>{
      console.log('新闻-------------onDeactivated()')
    })
  }
}
</script>

<style scoped>
#news{
  width: 450px;
  height: 600px;
  background-color: skyblue;
}
</style>