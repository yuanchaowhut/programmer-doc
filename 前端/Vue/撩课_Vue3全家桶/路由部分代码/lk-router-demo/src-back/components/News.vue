<template>
   <div id="news">
      <p>新闻详情</p>
      <p>新闻的id: {{$route.params.id}}</p>
   </div>
</template>

<script>
import {useRoute} from 'vue-router'
export default {
  name: "News",
  setup(){
    const route = useRoute()
    console.log(route.params)
    console.log(route.params.id)
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