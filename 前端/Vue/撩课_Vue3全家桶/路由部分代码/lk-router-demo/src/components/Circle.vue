<template>
   <div id="circle">
     圈子
     <p>{{$route.query}}</p>
     <p>{{$route.query.name}}</p>
     <p>{{$route.query.site}}</p>
     <p>{{$route.query.age}}</p>
   </div>
</template>

<script>
import {useRoute} from 'vue-router'
export default {
  name: "Circle",
  setup(){
    let route = useRoute()
    console.log(route.query)
  }
}
</script>

<style scoped>
#circle{
  width: 400px;
  height: 600px;
  background-color: cadetblue;
}
</style>