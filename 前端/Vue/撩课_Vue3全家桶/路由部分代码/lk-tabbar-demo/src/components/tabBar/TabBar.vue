<template>
  <div class="tab-bar">
     <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style>
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


</style>