<template>
  <TabBar>
    <TabBarItem path="/home">
      <!-- 图标  -->
      <template v-slot:item-icon><img src="./../assets/imgs/tabBar/home.svg" alt=""></template>
      <template v-slot:item-icon-selected><img src="./../assets/imgs/tabBar/home_selected.svg" alt=""></template>
      <!-- 标题  -->
      <template v-slot:item-title><div>首页</div></template>
    </TabBarItem>
    <TabBarItem path="/course">
      <!-- 图标  -->
      <template v-slot:item-icon><img src="./../assets/imgs/tabBar/course.svg" alt=""></template>
      <template v-slot:item-icon-selected><img src="./../assets/imgs/tabBar/course_selected.svg" alt=""></template>
      <!-- 标题  -->
      <template v-slot:item-title><div>选课</div></template>
    </TabBarItem>
    <TabBarItem path="/friends" >
      <!-- 图标  -->
      <template v-slot:item-icon><img src="./../assets/imgs/tabBar/friends.svg" alt=""></template>
      <template v-slot:item-icon-selected><img src="./../assets/imgs/tabBar/friends_selected.svg" alt=""></template>
      <!-- 标题  -->
      <template v-slot:item-title><div>朋友圈</div></template>
    </TabBarItem>
    <TabBarItem path="/study" >
      <!-- 图标  -->
      <template v-slot:item-icon><img src="./../assets/imgs/tabBar/study.svg" alt=""></template>
      <template v-slot:item-icon-selected><img src="./../assets/imgs/tabBar/study_selected.svg" alt=""></template>
      <!-- 标题  -->
      <template v-slot:item-title><div>学习</div></template>
    </TabBarItem>
    <TabBarItem path="/mine"  selectedColor="purple">
      <!-- 图标  -->
      <template v-slot:item-icon><img src="./../assets/imgs/tabBar/mine.svg" alt=""></template>
      <template v-slot:item-icon-selected><img src="./../assets/imgs/tabBar/mine_selected.svg" alt=""></template>
      <!-- 标题  -->
      <template v-slot:item-title><div>我的</div></template>
    </TabBarItem>
  </TabBar>
</template>

<script>
import TabBar from "./../components/tabBar/TabBar.vue"
import TabBarItem from "./../components/tabBar/TabBarItem.vue";
export default {
  name: "MainTabBar",
  components: {
    TabBarItem,
    TabBar
  }
}
</script>

<style scoped>

</style>