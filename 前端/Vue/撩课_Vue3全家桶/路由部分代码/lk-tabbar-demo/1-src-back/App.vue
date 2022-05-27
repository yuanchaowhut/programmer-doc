<template>
   <div class="tab-bar">
     <div class="tab-bar-item">
        <img src="./assets/imgs/tabBar/home.svg" alt="">
        <div>首页</div>
     </div>
     <div class="tab-bar-item">
       <img src="./assets/imgs/tabBar/course.svg" alt="">
       <div>课程</div>
     </div>
     <div class="tab-bar-item">
       <img src="./assets/imgs/tabBar/friends.svg" alt="">
       <div>朋友圈</div>
     </div>
     <div class="tab-bar-item">
       <img src="./assets/imgs/tabBar/study.svg" alt="">
       <div>学习</div>
     </div>
     <div class="tab-bar-item">
       <img src="./assets/imgs/tabBar/mine.svg" alt="">
       <div>我的</div>
     </div>
   </div>
</template>

<script>

</script>

<style>
/*引入样式*/
@import "assets/css/common.css";

.tab-bar{
  background-color: #e6e6e6;
  /*固定定位*/
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;

  border-top: 1px solid #cccccc;

  /*伸缩布局*/
  display: flex;

}

.tab-bar-item{
  flex: 1;
  height: 49px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tab-bar-item img{
  width: 24px;
  height: 24px;
}
</style>
