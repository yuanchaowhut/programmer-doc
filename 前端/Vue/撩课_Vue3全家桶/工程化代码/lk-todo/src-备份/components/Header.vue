<template>
  <div class="todo-header">
    <input
        type="text"
        placeholder="请输入今天的任务清单，按回车键确认"
        v-model="title"
        @keyup.enter="addItem"
    />
  </div>
</template>

<script>
export default {
  name: "Header",
  props:{
    addTodo: Function
  },
  data(){
     return {
       title: ''
     }
  },
  methods: {
    // 添加一条数据
    addItem(){
      // 1. 取出输入框中的内容
      const title = this.title.trim()
      // console.log(title);

      // 2. 判断是否为空
      if(!title){
        alert('输入的任务不能为空!')
        return
      }

      // 3. 生成一个todo对象
      let todo = {title, finished: false}

      // 4. 添加
      console.log(this.addTodo);
      this.addTodo(todo)

      // 5. 清空输入框
      this.title = ''

    }
  }
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