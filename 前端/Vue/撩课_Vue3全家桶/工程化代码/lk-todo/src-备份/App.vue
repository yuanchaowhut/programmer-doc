<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- 头部 -->
      <Header
          :add-todo="addTodo"
      />
      <!-- 列表 -->
      <List
          :todos="todos"
          :del-todo="delTodoWithIndex"
      />
      <!-- 尾部 -->
      <Footer
          :todos="todos"
          :del-finished-todos="delFinishedTodos"
          :selected-all-todo="selectedAllTodo"
      />
    </div>
  </div>
</template>

<script>
// 1. 引入组件
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'

export default {
   name: 'app',
   data(){
     return {
        todos: [
          {title: '打一场羽毛球', finished: false},
          {title: '打一场乒乓球', finished: false},
          {title: '打一场篮球', finished: false},
          {title: '踢一场足球', finished: false}
        ]
     }
   },
   methods:{
     // 根据索引删除记录
     delTodoWithIndex(index){
       this.todos.splice(index, 1)
     },
     // 添加一条记录
     addTodo(todo){
       this.todos.unshift(todo)
     },
     // 全选和取消全选
     selectedAllTodo(isChecked){
       this.todos.forEach((todo)=>{
          todo.finished = isChecked
       })
     },
     // 删除已经完成的todo
     delFinishedTodos(){
       this.todos = this.todos.filter((todo)=>{
         return !todo.finished
       })
     }
   },
   components:{
       Header,
       List,
       Footer
   }
}
</script>

<style>
.btn {
  display: inline-block;
  padding: 8px 10px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-warning {
  color: #fff;
  background-color: orange;
  border: none;
}

.btn-warning:hover {
  color: #fff;
  background-color: red;
}

.btn:focus {
  outline: none;
}


/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}


</style>
