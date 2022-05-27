<template>
  <li
      @mouseenter="dealShow(true)"
      @mouseleave="dealShow(false)"
      :style="{backgroundColor: bgColor}"
  >
    <label>
      <input type="checkbox" v-model="todo.finished"/>
      <span>{{todo.title}}</span>
    </label>
    <button v-show="isShowDelBtn" class="btn btn-warning" @click="delItem">删除</button>
  </li>
</template>

<script>
import {inject, ref} from 'vue'
export default {
  name: "Item",
  props: {
    todo: Object,
    index: Number
  },
  setup(props, context){
    // 1. 订阅删除方法
    const delTodo = inject('delTodo')

    // 2. 定义属性和方法
    let isShowDelBtn = ref(false)
    let bgColor = ref('#fff')

    const dealShow = (isShow)=>{
      // 1. 控制按钮的显示和隐藏
      isShowDelBtn.value = isShow
      // 2. 控制背景颜色
      bgColor.value = isShow ? '#ddd' : '#fff'
    }

    const delItem = ()=>{
      if(window.confirm(`您确定删除吗?`)){
        delTodo(props.index)
      }
    }

    return {
      isShowDelBtn,
      bgColor,
      dealShow,
      delItem
    }
  }
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
  line-height: 14px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>