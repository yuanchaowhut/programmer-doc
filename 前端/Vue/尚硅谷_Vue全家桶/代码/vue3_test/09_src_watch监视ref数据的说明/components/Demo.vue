<template>
	<h2>当前求和为：{{sum}}</h2>
	<button @click="sum++">点我+1</button>
	<hr>
	<h2>当前的信息为：{{msg}}</h2>
	<button @click="msg+='！'">修改信息</button>
	<hr>
	<h2>姓名：{{person.name}}</h2>
	<h2>年龄：{{person.age}}</h2>
	<h2>薪资：{{person.job.j1.salary}}K</h2>
	<button @click="person.name+='~'">修改姓名</button>
	<button @click="person.age++">增长年龄</button>
	<button @click="person.job.j1.salary++">涨薪</button>
</template>

<script>
	import {ref,reactive,watch} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let sum = ref(0);       // 这里是用ref定义基本类型数据，sum是一个RefImpl对象，sum.value是一个常量值.
			let msg = ref('你好啊');
			let person = ref({      // 这里是用ref定义引用类型数据，person也是RefImpl对象，但person.value是Proxy对象.
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})

			console.log(person)

      // 这里不能用sum.value，因为sum是基本数据类型，sum.value 是一个常量值，不能被监视.
			watch(sum,(newValue,oldValue)=>{
				console.log('sum的值变化了',newValue,oldValue)
			})

      // 如果不开启 deep:true，则这里必须监视 person.value 才能监测到name、age等数据的变化，
      // person是一个引用类型数据，person.value 是Proxy对象，是ref函数内部调用reactive函数生成的。
      watch(person.value,(newValue,oldValue)=>{
        console.log('person的值变化了',newValue,oldValue)
      })

      // 如果开启了 deep:true，则这里可以直接监视person
			watch(person,(newValue,oldValue)=>{
				console.log('person的值变化了',newValue,oldValue)
			},{deep:true})


			//返回一个对象（常用）
			return {
				sum,
				msg,
				person
			}
		}
	}
</script>

