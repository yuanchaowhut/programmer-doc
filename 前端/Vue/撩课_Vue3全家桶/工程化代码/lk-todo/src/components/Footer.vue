<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isChecked"/>
    </label>
    <span>
          <span>已完成{{ finishedCount }}件</span> / 总计{{ todos.length }}件
        </span>
    <button class="btn btn-warning" @click="delFinishedTodos">清除已完成任务</button>
  </div>
</template>

<script setup>
  import {inject, computed, unref} from "vue";

  // 1. 订阅
  const todos = inject('todos')
  const selectedAllTodo = inject('selectedAllTodo')
  const delFinishedTodos = inject('delFinishedTodos')

  // 2. 定义计算属性
  let finishedCount = computed(()=>{
    return todos.reduce((total, todo)=>{
      return total + (todo.finished ? 1 : 0)
    }, 0)
  })

  let isChecked = computed({
    get(){
      // console.log(finishedCount.value, todos);
      // return finishedCount.value === todos.length && todos.length > 0
      return unref(finishedCount) === todos.length && todos.length > 0
    },
    set(value){
      // console.log(value);
      selectedAllTodo(value)
    }
  })

</script>

<style scoped>

/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>