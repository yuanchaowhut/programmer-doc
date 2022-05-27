<template>
   <router-view></router-view>
   <main-tab-bar></main-tab-bar>
</template>

<script>
import MainTabBar from "./components/MainTabBar.vue";
export default {
  components: {
    MainTabBar
  }
}

</script>

<style>
/*引入样式*/
@import "assets/css/common.css";


</style>
