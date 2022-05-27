<template>
  <div class="todo-header">
    <input
        type="text"
        placeholder="请输入今天的任务清单，按回车键确认"
        v-model.trim="title"
        @keyup.enter="addItem"
    />
  </div>
</template>

<script setup>
   import {ref, inject} from 'vue'

   // 1. 订阅添加方法
   const addTodo = inject('addTodo')

   // 2. 定义属性和方法
   let title = ref('')

   let addItem = ()=>{
     // 1. 取出输入框中的内容
     const content = title.value

     // 2. 判断是否为空
     if(!content){
       alert('输入的任务不能为空!')
       return
     }

     // 3. 生成一个todo对象
     let todo = {title: content, finished: false}

     // 4. 添加
     addTodo(todo)

     // 5. 清空输入框
     title.value = ''
   }

</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
  outline: none;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(255, 0, 0, 0.8);
  box-shadow: inset 0 1px 1px rgba(255, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);
}
</style>