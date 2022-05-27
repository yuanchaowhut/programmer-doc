<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isSelected">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-selected"></slot>
    </div>
    <!--
    <div :class="{selected: isSelected}">
      <slot name="item-title"></slot>
    </div>
    -->
    <div :style="selectedStyle">
      <slot name="item-title"></slot>
    </div>
  </div>
</template>

<script>
import {useRouter, useRoute} from 'vue-router'
import {computed} from "vue";
export default {
  name: "TabBarItem",
  props: {
    path: String,
    selectedColor: {
      type: String,
      default: 'red'
    }
  },
  setup(props, context){
    // 全局的路由对象
    const router = useRouter()

    // 点击item
    const itemClick = ()=>{
      // alert('点击了')
      // 路由切换
      router.replace(props.path)
    }

    // 选项是否选中
    const route = useRoute()
    const isSelected = computed(()=>{
       return route.path.includes(props.path)
    })


    // 处理选中文字的颜色
    const selectedStyle = computed(()=>{
      return isSelected.value ? {color: props.selectedColor} : {}
    })


    return {
      itemClick,
      isSelected,
      selectedStyle
    }
  }
}
</script>

<style>
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

  .selected{
    color: red;
  }
</style>