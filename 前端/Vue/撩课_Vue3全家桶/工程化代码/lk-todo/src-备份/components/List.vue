<template>
  <ul class="todo-main">
     <Item
       v-for="(todo, index) in todos"
       :key="index"
       :index="index"
       :todo="todo"
       :del-todo="delTodo"
     />
  </ul>
</template>

<script>
// 引入组件
import Item from './Item.vue'
export default {
  name: "List",
  props:{
    todos: Array,
    delTodo: Function
  },
  components: {
    Item
  }
}
</script>

<style scoped>

/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}


</style>