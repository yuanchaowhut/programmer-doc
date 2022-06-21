# Vue3快速上手

<img src="https://user-images.githubusercontent.com/499550/93624428-53932780-f9ae-11ea-8d16-af949e16a09f.png" style="width:200px" />



## Vue3简介

- 2020年9月18日，Vue.js发布3.0版本，代号：One Piece（海贼王）
- 耗时2年多、[2600+次提交](https://github.com/vuejs/vue-next/graphs/commit-activity)、[30+个RFC](https://github.com/vuejs/rfcs/tree/master/active-rfcs)、[600+次PR](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged+-author%3Aapp%2Fdependabot-preview+)、[99位贡献者](https://github.com/vuejs/vue-next/graphs/contributors) 
- github上的tags地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0



## Vue3带来了什么

### 性能的提升

- 打包大小减少41%

- 初次渲染快55%, 更新渲染快133%

- 内存减少54%

  ......

### 源码的升级

- 使用Proxy代替defineProperty实现响应式

- 重写虚拟DOM的实现和Tree-Shaking

  ......

### 拥抱TypeScript

- Vue3可以更好的支持TypeScript

### 新的特性

1. Composition API（组合API）

   - setup配置
   - ref与reactive
   - watch与watchEffect
   - provide与inject
   - ......
2. 新的内置组件
   - Fragment 
   - Teleport
   - Suspense
3. 其他改变

   - 新的生命周期钩子
   - data 选项应始终被声明为一个函数
   - 移除keyCode支持作为 v-on 的修饰符
   - ......



# 创建Vue3.0工程

## 使用 vue-cli 创建

官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```



## 使用 vite 创建

官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite

vite官网：https://vitejs.cn

- 什么是vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite构建对比图

<img src="https://cn.vitejs.dev/assets/bundler.37740380.png" style="width:500px;height:280px;float:left" /><img src="https://cn.vitejs.dev/assets/esm.3070012d.png" style="width:480px;height:280px" />

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```



# 常用 Composition API

官方文档: https://v3.cn.vuejs.org/guide/composition-api-introduction.html

## 拉开序幕的setup

1. 理解：Vue3.0中一个新的配置项，值为一个函数。

2. setup是所有<strong style="color:#DD5145">Composition API（组合API）</strong><i style="color:gray;font-weight:bold">“ 表演的舞台 ”</i>。

3. 组件中所用到的：数据、方法等等，均要配置在setup中。

4. setup函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. <span style="color:#aad">若返回一个渲染函数：则可以自定义渲染内容。（了解）</span>

5. 注意点：
   1. 尽量不要与Vue2.x配置混用
      - Vue2.x配置（data、methos、computed...）中<strong style="color:#DD5145">可以访问到</strong>setup中的属性、方法。
      - 但在setup中<strong style="color:#DD5145">不能访问到</strong>Vue2.x配置（data、methos、computed...）。
      - 如果有重名, setup优先。
   2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

6. 示例代码

   ```js
   <script>
   // import {h} from 'vue'
   export default {
     name: 'App',
     // vue3是向下兼容的，vue文件里还可以使用 data、methods 等
     data() {
       return {
         sex:'男',
         a:100
       }
     },
     methods: {
       sayWelcome(){
         alert('欢迎来到尚硅谷学习')
       },
       test1(){
         console.log(this.sex)
         console.log(this.name)
         console.log(this.age)
         console.log(this.sayHello)
       }
     },
   
     //setup里的数据和方法template里都能识别到
     setup(){
       //数据
       let name = '张三'
       let age = 18
       let a = 200
   
       //方法
       function sayHello(){
         alert(`我叫${name}，我${age}岁了，你好啊！`)
       }
       function test2(){
         console.log(name)
         console.log(age)
         console.log(sayHello)
         console.log(this.sex)
         console.log(this.sayWelcome)
       }
   
       //返回一个对象（常用）
       return {
         name,
         age,
         sayHello,
         test2,
         a
       }
   
       //返回一个函数（渲染函数）
       // return ()=> h('h1','尚硅谷')
     }
   }
   </script>
   ```

   

##  ref函数

- 作用: 定义一个响应式的数据

- 语法: ```const xxx = ref(initValue)``` 
  - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference对象，简称ref对象）</strong>。
  
  - JS中操作数据： ```xxx.value```
  
  - 模板中读取数据: 不需要.value，直接：```<div>{{xxx}}</div>```
  
  - RefImpl 如下：
  
    <img src="https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205300856268.png" alt="image-20220530085646330" style="zoom:75%;" />
  
- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
  - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了Vue3.0中的一个新函数—— ```reactive```函数。reactive函数中封装了Proxy的处理逻辑。
  - <img src="https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205300903127.png" alt="image-20220530090259312" style="zoom:75%;" />

​			

## reactive函数

- 作用: 定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据（基本类型不要用它，要用```ref```函数）

- 语法：```const 代理对象= reactive(源对象)```接收一个对象（或数组），返回一个<strong style="color:#DD5145">代理对象（Proxy的实例对象，简称proxy对象）</strong>

- reactive定义的响应式数据是“深层次的”。

- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

- 不需要像 ref 定义的响应式变量那样 variable.value 的方式取值，直接使用 variable 即可。

  ```js
  // 基本数据类型，只能使用 ref
  let name = ref('张三')
  let age = ref(18)
  
  // 引用类型数据，可以使用 ref 和 reactive，但有区别，前者要通过 .value 取值，引用类型时 ref 内部也是使用reactive
  let job = reactive({
     type:'前端工程师',
     salary:'30K'
  })
  let hobbies = reactive(["篮球", "乒乓球"])
  
  
  function changeInfo(){
     // 基本类型 .value 取值
  	 name.value = '李四'
     age.value = 48
    
     // 引用类型，不需要value
     job.type = 'UI设计师'
     job.salary = '60K'
     hobbies[0] = "象棋"
  } 
  ```

  

## Vue3.0中的响应式原理

### vue2.x的响应式

- 实现原理：
  - 对象类型：通过```Object.defineProperty()```对属性的读取、修改进行拦截（数据劫持）。
  
  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。
  
    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    
    let p = {}
    Object.defineProperty(p,'name',{
    		configurable:true,
    				get(){ //有人读取name时调用
    					return person.name
    		},
    		set(value){ //有人修改name时调用
    				console.log('有人修改了name属性，我发现了，我要去更新界面！')
    				person.name = value
    		}
    })
    			
    Object.defineProperty(p,'age',{
    	get(){ //有人读取age时调用
    			eturn person.age
    	},
    	set(value){ //有人修改age时调用
    			console.log('有人修改了age属性，我发现了，我要去更新界面！')
    			person.age = value
    	}
    })
    ```
  
- 存在问题：
  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

### Vue3.0的响应式

- 实现原理: 
  - 通过Proxy（代理）:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
  - 通过Reflect（反射）:  对源对象的属性进行操作。
  - MDN文档中描述的Proxy与Reflect：
    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    
    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
    
      ```js
      const p = new Proxy(person,{
      		/有人读取p的某个属性时调用
      		get(target,propName){
      				console.log(`有人读取了p身上的${propName}属性`)
        			// return target[propName]
      				return Reflect.get(target,propName)  //Vue3中使用了Reflect处理真正的数据，效果是一样的。
      		},
      		//有人修改p的某个属性、或给p追加某个属性时调用
      		set(target,propName,value){
      			console.log(`有人修改了p身上的${propName}属性，我要去更新界面了！`)
            // target[propName] = value;
      			Reflect.set(target,propName,value)
      		},
      		//有人删除p的某个属性时调用
      			deleteProperty(target,propName){
      			console.log(`有人删除了p身上的${propName}属性，我要去更新界面了！`)
            // return delete target[propName];
      			return Reflect.deleteProperty(target,propName)
      		}
      })
      
      // Proxy 的基本用法
      new Proxy(data, {
      	// 拦截读取属性值
          get (target, prop) {
          	return Reflect.get(target, prop)
          },
          // 拦截设置属性值或添加新属性
          set (target, prop, value) {
          	return Reflect.set(target, prop, value)
          },
          // 拦截删除属性
          deleteProperty (target, prop) {
          	return Reflect.deleteProperty(target, prop)
          }
      })
      
      proxy.name = 'tom'   
      ```



## reactive对比ref

-  从定义数据角度对比：
   -  ref用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
   -  reactive用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
   -  备注：ref也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过```reactive```转为<strong style="color:#DD5145">代理对象</strong>。
-  从原理角度对比：
   -  ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
   -  reactive通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
-  从使用角度对比：
   -  ref定义的数据：操作数据<strong style="color:#DD5145">需要</strong>```.value```，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>```.value```。
   -  reactive定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>```.value```。
   
   

## setup的两个注意点

- setup执行的时机
  - 在beforeCreate之前执行一次，this是undefined。
  
- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
    - slots: 收到的插槽内容, 相当于 ```this.$slots```。
    - emit: 分发自定义事件的函数, 相当于 ```this.$emit```。
    
    ```vue
    // Person.vue 组件
    <template>
      <h1>一个人的信息</h1>
      <h2>姓名：{{person.name}}</h2>
      <h2>年龄：{{person.age}}</h2>
      <h3>兴趣爱好: {{person.hobbies}}</h3>
      <slot name="hello"></slot>
      <button @click="changeInfo">修改人的信息</button>
    </template>
    
    <script>
    import {reactive} from 'vue'
    
    export default {
      name: 'App',
      props:["school"],
      emits: ["changeInfo"], // 这里不加的话控制台会有警告
      setup(props, context){
        console.log(props)
        console.log(context)
        console.log(context.slots)
        //数据
        let person = reactive({
          name: "张三",
          age: 18,
          hobbies: ["篮球", "乒乓球"]
        })
    
        //方法
        function changeInfo(){
          person.name = "李四"
          person.age = 29
          person.hobbies[0] = "象棋"
          // 触发事件
          context.emit("changeInfo", "我修改用户信息了")
        }
    
        return {
          person,
          changeInfo
        }
      }
    }
    </script>
    
    
    // App.vue
    <template>
      <!-- 绑定自定义事件、slot内容、传递 props -->
      <Person school="清华" @changeInfo="handleChange">
        <template v-slot:hello>
          <span>尚硅谷</span>
        </template>
      </Person>
    </template>
    
    <script>
    import Person from "./components/Person"
    export default {
      name: 'App',
      components:{
        Person
      },
      setup(){
        function handleChange(msg){
          console.log(msg)
        }
    
        return {
          handleChange
        }
      }
    }
    </script>
    ```
    
    


## 计算属性与监视

### computed函数

- 与Vue2.x中computed配置功能一致

- 写法

  ```js
  import {computed} from 'vue'
  
  setup(){
      ...
  	//计算属性——简写
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
  ```



### watch函数

- 与Vue2.x中watch配置功能一致

- 两个小“坑”：

  - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个引用类型属性时：deep配置有效。
  
  ```js
  //情况一：监视ref定义的响应式数据
  watch(sum,(newValue,oldValue)=>{
  	console.log('sum变化了',newValue,oldValue)
  },{immediate:true})  // 第三个参数是可选的
  
  //情况二：监视多个ref定义的响应式数据
  watch([sum,msg],(newValue,oldValue)=>{
    // newValue 和 oldValue 变成数组，顺序与[sum,msg]保持一致
  	console.log('sum或msg变化了',newValue,oldValue)  
  }) 
  
  /* 情况三：监视reactive定义的响应式数据
  			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
  			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
  */
  watch(person,(newValue,oldValue)=>{
  	console.log('person变化了',newValue,oldValue)
  },{immediate:true,deep:false}) //此处的deep配置不再奏效
  
  //情况四：监视reactive定义的响应式数据中的某个属性
  watch(()=>person.job,(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true}) 
  
  //情况五：监视reactive定义的响应式数据中的某些属性
  watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true})
  
  //特殊情况
  watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的job变化了',newValue,oldValue)
  },{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
  ```

- watch监视ref数据

```js
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
```



### watchEffect函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视哪个属性，监视的回调中**用到哪个属性，那就监视哪个属性**。

- watchEffect有点像computed：

  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(()=>{
      const x1 = sum.value
      const x2 = person.age
      const x3 = person.job.salary
      console.log('watchEffect配置的回调执行了')
  })
  ```



## 生命周期

![image-20220601095010005](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202206010950892.png)

- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
  - ```beforeDestroy```改名为 ```beforeUnmount```
  - ```destroyed```改名为 ```unmounted```
  
- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`
  
- 组合式API生命周期验证
  
  ```vue
  // Student.vue
  <template>
    <h1>学生信息</h1>
    <h2>姓名：{{ student.name }}</h2>
    <h2>年龄：{{ student.age }}</h2>
    <h3>兴趣爱好: {{ student.hobbies }}</h3>
    <button @click="changeInfo">修改人的信息</button>
  </template>
  
  <script>
  import {reactive, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue'
  
  export default {
    name: 'Student',
    setup(props, context) {
      let student = reactive({
        name: "张三",
        age: 18,
        hobbies: ["篮球", "乒乓球"],
      });
  
      const changeInfo = ()=>{
        student.name = "李四"
        student.age = 22
        student.hobbies[0] = "象棋"
      }
  
      const destroy = () => {
        console.log(context)
      }
  
      //通过组合式API的形式去使用生命周期钩子
      onBeforeMount(() => {
        console.log('---onBeforeMount---')
      })
      onMounted(() => {
        console.log('---onMounted---')
      })
      onBeforeUpdate(() => {
        console.log('---onBeforeUpdate---')
      })
      onUpdated(() => {
        console.log('---onUpdated---')
      })
      onBeforeUnmount(() => {
        console.log('---onBeforeUnmount---')
      })
      onUnmounted(() => {
        console.log('---onUnmounted---')
      })
  
      return {
        student,
        changeInfo
      }
    }
  }
  </script>
  
  
  // App.vue 中通过 v-if 创建和销毁Student组件，从而让Student组件可以响应onBeforeUnmount和unmount生命周期函数。
  <template>
    <Student v-if="show"/>
    <hr/>
    <button @click="toggle">显示/隐藏</button>
  </template>
  
  <script>
  import {ref} from 'vue'
  import Student from "./components/Student"
  
  export default {
    name: 'App',
    components: {
      Person, Student
    },
    setup() {
      const show = ref(true);
  
      function toggle() {
        show.value = !show.value;
      }
  
      return {
        show,
        toggle
      }
    }
  }
  </script>
  ```
  
  ![image-20220531092036051](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205310920909.png)



## 自定义hook函数

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。

- 类似于vue2.x中的mixin。

- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。

- 获取鼠标点击位置坐标的案例

  ```js
  // 自定义 usePoint hook 函数
  import {onBeforeUnmount, onMounted, reactive} from "vue";
  
  export default function () {
      // 鼠标“打点”相关的数据
      const point = reactive({
          x: 0,
          y: 0
      })
  
      // 鼠标“打点”相关的方法
      function savePoint(event) {
          point.x = event.pageX
          point.y = event.pageY
          console.log(`x坐标: ${point.x}, y坐标: ${point.y}`)
      }
  
      // 鼠标“打点”相关的生命周期钩子
      onMounted(() => {
          window.addEventListener("click", savePoint)
      })
  
      onBeforeUnmount(() => {
          window.removeEventListener("click", savePoint)
      })
  
      // 必须要把hooks里定义的响应式变量return出去，外部才可以使用.
      return point
  }
  
  //--------------------------------------------------------------------------------
  // Test1组件 使用到了 usePoint
  <template>
    <h3>Test1组件</h3>
    <h3>x坐标：{{ point.x }}，y坐标：{{ point.y }}</h3>
  </template>
  
  <script>
  import usePoint from "../hooks/usePoint";
  
  export default {
    name: 'Test1',
    setup() {
      const point = usePoint();
  
      return {
        point
      }
    }
  }
  </script>
  
  //--------------------------------------------------------------------------------
  // Test2组件 使用到了 usePoint
  <template>
    <h3>Test2组件</h3>
    <h3>x坐标：{{ point.x }}，y坐标：{{ point.y }}</h3>
  </template>
  
  <script>
  import usePoint from "../hooks/usePoint";
  
  export default {
    name: 'Test2',
    setup() {
      const point = usePoint();
  
      return {
        point
      }
    }
  }
  </script>
  
  //--------------------------------------------------------------------------------
  // App.vue 引用Test1和Test2组件
  <template>
    <Test1/>
    <hr/>
    <Test2/>
  </template>
  
  <script>
  import Test1 from "./components/Test1"
  import Test2 from "./components/Test2"
  
  export default {
    name: 'App',
    components: {
      Test1, Test2
    }
  }
  </script>
  ```

  

  当点击屏幕任意位置时，Test1组件和Test2组件都输出对应坐标，所以控制台每次点击后都输出2遍。

  ![2022-05-31 11.52.08](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205311152504.gif)



## toRef

- 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。
- 语法：```const name = toRef(person,'name')```
- 应用:   要将响应式对象中的某个属性单独提供给外部使用时。


- 扩展：```toRefs``` 与```toRef```功能一致，但可以批量创建多个 ref 对象，语法：```toRefs(person)```

- 对比使用 toRef / toRefs 与不使用的区别。

  ```js
  // 不使用toRef(s)时，模板中需要使用 person.xxx
  <template>
    <h1>一个人的信息</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h3>薪水: {{ person.job.j1.salary }}</h3>
    <button @click="person.name=person.name+'*'">修改姓名</button>
    <button @click="person.age++">修改年龄</button>
    <button @click="person.job.j1.salary++">修改薪水</button>
  </template>
  
  <script>
  import {reactive} from 'vue'
  
  export default {
    name: 'Person',
    setup() {
      //数据
      let person = reactive({
        name: "张三",
        age: 18,
        job: {
          j1: {
            salary: 20
          }
        }
      })
  
      return {
        person,
      }
    }
  }
  </script>
  
  //----------------------------------------------------------------------------------------------
  // 使用toRef(s)时，模板中可以省略 person.
  <template>
    <h1>一个人的信息</h1>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <h3>薪水: {{ job.j1.salary }}</h3>
    <button @click="name=name+'*'">修改姓名</button>
    <button @click="age++">修改年龄</button>
    <button @click="job.j1.salary++">修改薪水</button>
  </template>
  
  <script>
  import {reactive, toRef, toRefs} from 'vue'
  
  export default {
    name: 'Person',
    setup() {
      //数据
      let person = reactive({
        name: "张三",
        age: 18,
        job: {
          j1: {
            salary: 20
          }
        }
      })
  
      // toRef 只能处理单个属性
      console.log(toRef(person, "name"));
      // toRefs 可以批量处理对象上的所有属性
      console.log(toRefs(person));
  
      return {
        person,
        ...toRefs(person)    // toRefs得到的是一个key与person相同、value均为响应式对象的键值对，故这里通过...展开。
      }
    }
  }
  </script>
  ```

  下面是 toRef 和 toRefs 输出结果，其中 ObjectRefImpl 就是响应式对象。

  ![image-20220531224350506](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205312243758.png)

​		<img src="https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205312247199.gif" alt="2022-05-31 22.45.40" style="zoom:50%;" />



# 其它 Composition API

## shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。



## readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。

- shallowReadonly：让一个响应式数据变为只读的（浅只读）。

- 应用场景: 不希望数据被修改时。

- 示例代码

  ```js
  <template>
    <h4>当前求和为：{{sum}}</h4>
    <button @click="sum++">点我++</button>
    <hr>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <h2>薪资：{{job.j1.salary}}K</h2>
    <button @click="name+='~'">修改姓名</button>
    <button @click="age++">增长年龄</button>
    <button @click="job.j1.salary++">涨薪</button>
  </template>
  
  <script>
  import {ref,reactive,toRefs,readonly,shallowReadonly} from 'vue'
  export default {
    name: 'Person',
    setup(){
      let sum = ref(0)
      let person = reactive({
        name:'张三',
        age:18,
        job:{
          j1:{
            salary:20
          }
        }
      })
  
      // 对引用类型数据的响应式数据，readonly是深只读，shallowReadonly是浅只读.
      // person = readonly(person)
      person = shallowReadonly(person)
      
      // 对基本类型数据的响应式数据，readonly和shallowReadonly效果一样.
      // sum = readonly(sum)
      sum = shallowReadonly(sum)
  
      //返回一个对象（常用）
      return {
        sum,
        ...toRefs(person)
      }
    }
  }
  </script>
  ```

  

## toRaw 与 markRaw

- toRaw：
  - 作用：将一个由```reactive```生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>(只能作用于reactive生成的响应式对象，ref生成的不可以)。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
  
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。
  
- 示例代码
  
  ```js
  <template>
  	<h4>当前求和为：{{sum}}</h4>
  	<button @click="sum++">点我++</button>
  	<hr>
  	<h2>姓名：{{name}}</h2>
  	<h2>年龄：{{age}}</h2>
  	<h2>薪资：{{job.j1.salary}}K</h2>
  	<h3 v-show="person.car">座驾信息：{{person.car}}</h3>
  	<button @click="name+='~'">修改姓名</button>
  	<button @click="age++">增长年龄</button>
  	<button @click="job.j1.salary++">涨薪</button>
  	<button @click="showRawPerson">输出最原始的person</button>
  	<button @click="addCar">给人添加一台车</button>
  	<button @click="person.car.name+='!'">换车名</button>
  	<button @click="changePrice">换价格</button>
  </template>
  
  <script>
  	import {ref,reactive,toRefs,toRaw,markRaw} from 'vue'
  	export default {
  		name: 'Demo',
  		setup(){
  			//数据
  			let sum = ref(0)
  			let person = reactive({
  				name:'张三',
  				age:18,
  				job:{
  					j1:{
  						salary:20
  					}
  				}
  			})
  
  			function showRawPerson(){
  				const p = toRaw(person)
  				console.log(p)
          p.age++  // 这里修改p.age并不会引起页面更新,因为p不是响应式的
  			}
  
  			function addCar(){
  				let car = {name:'奔驰',price:40}
          // 使用markRaw后，car不再是响应式，如果 person.car = car，则car会变成响应式对象，并且是深度的。
  				person.car = markRaw(car)
  			}
  
  			function changePrice(){
  				person.car.price++  // person.car.price确实变了，但是页面不会更新，因为person.car不是响应式
  				console.log(person.car.price) 
  			}
  
  			//返回一个对象（常用）
  			return {
  				sum,
  				person,
  				...toRefs(person),
  				showRawPerson,
  				addCar,
  				changePrice
  			}
  		}
  	}
  </script>
  ```
  
  

## customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

  ```js
  //自定义一个myRef基本套路
  function myRef(value){
  	return customRef((track,trigger)=>{
  		return {
  			get(){
  				track();  //告诉Vue这个value值是需要被“追踪”的
  				return value;
  			},
  			set(newValue){
  				value = newValue;
  				trigger(); //告诉Vue去更新界面
  			}
  		}
  	})
  }			
  ```

  

- 实现防抖效果：

  ```vue
  <template>
  	<input type="text" v-model="keyword">
  	<h3>{{keyword}}</h3>
  </template>
  
  <script>
  	import {ref,customRef} from 'vue'
  	export default {
  		name:'Demo',
  		setup(){
  			// let keyword = ref('hello') //使用Vue准备好的内置ref
  			//自定义一个myRef
  			function myRef(value,delay){
  				let timer
  				//通过customRef去实现自定义
  				return customRef((track,trigger)=>{
  					return{
  						get(){
  							track() //告诉Vue这个value值是需要被“追踪”的
  							return value
  						},
  						set(newValue){
  							clearTimeout(timer)
  							timer = setTimeout(()=>{
  								value = newValue
  								trigger() //告诉Vue去更新界面
  							},delay)
  						}
  					}
  				})
  			}
  			let keyword = myRef('hello',500) //使用程序员自定义的ref
  			return {
  				keyword
  			}
  		}
  	}
  </script>
  ```

  

## provide 与 inject

<img src="https://v3.cn.vuejs.org/images/components_provide.png" style="width:300px" />

- 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信

- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

  1. 祖组件中：

     ```js
     setup(){
     	......
         let car = reactive({name:'奔驰',price:'40万'})
         provide('car',car)
         ......
     }
     ```

  2. 后代组件中：

     ```js
     setup(props,context){
     	......
         const car = inject('car')
         return {car}
     	......
     }
     ```
  
- 示例代码（类似于React中的Context传递数据的写法）

  ```js
  // App.vue 数据提供者
  <template>
    <div class="app">
      <button @click="change">修改</button>
      <h3>我是App组件（祖），{{ name }}--{{ price }}W</h3>
      <Child/>
    </div>
  </template>
  
  <script>
  import {reactive, toRefs, provide} from 'vue'
  import Child from './components/Child.vue'
  
  export default {
    name: 'App',
    components: {Child},
    setup() {
      let car = reactive({name: '奔驰', price: 40})
      provide('car', car) //给自己的后代组件传递数据
  
      function change() {
        car.name += "*"
        car.price++
      }
  
      return {...toRefs(car), change}
    }
  }
  </script>
  
  <style>
  .app {
    background-color: gray;
    padding: 10px;
  }
  </style>
  
  //----------------------------------------------------------------------------------------
  // Child.vue 中间节点，本例并不需要使用数据，但是可以拿到provide的数据
  <template>
    <div class="child">
      <h3>我是Child组件（子）</h3>
      <Son/>
    </div>
  </template>
  
  <script>
  import {inject} from 'vue'
  import Son from './Son.vue'
  
  export default {
    name: 'Child',
    components: {Son},
    setup() {
      // 所有后代组件中都可以拿到App中provide的数据，并且它还是响应式的
      let car = inject('car')
      console.log(car, 'Child-----')
    }
  }
  </script>
  
  <style>
  .child {
    background-color: skyblue;
    padding: 10px;
  }
  </style>
  
  //----------------------------------------------------------------------------------------
  // Son.vue 使用provide的数据
  <template>
    <div class="son">
      <h3>我是Son组件（孙），{{ car.name }}--{{ car.price }}</h3>
    </div>
  </template>
  
  <script>
  import {inject} from 'vue'
  
  export default {
    name: 'Son',
    setup() {
      // 所有后代组件中都可以拿到App中provide的数据，并且它还是响应式的
      let car = inject('car')
      return {car}
    }
  }
  </script>
  
  <style>
  .son {
    background-color: orange;
    padding: 10px;
  }
  </style>
  ```
  
  ![2022-06-01 06.10.21](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202206010614579.gif)



## 响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象

- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理

- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理

- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

- 示例代码

  ```js
  <template>
    <div class="app">
      <h3>我是App组件</h3>
    </div>
  </template>
  
  <script>
  import {ref, reactive, readonly, isRef, isReactive, isReadonly, isProxy} from 'vue'
  
  export default {
    name: 'App',
    setup() {
      let sum = ref(0);
      let car = reactive({name: '奔驰', price: 40})
      let car2 = readonly(car);
  
      console.log("-------------------判断 sum-----------------------")
      console.log(isRef(sum))
      console.log(isReactive(sum))
      console.log(isReadonly(sum))
      console.log(isProxy(sum))
  
      console.log("-------------------判断 car-----------------------")
      console.log(isRef(car))
      console.log(isReactive(car))
      console.log(isReadonly(car))
      console.log(isProxy(car))
  
      console.log("-------------------判断 car2-----------------------")
      console.log(isRef(car2))
      console.log(isReactive(car2))
      console.log(isReadonly(car2))
      console.log(isProxy(car2))
  
      return {}
    }
  }
  </script>
  ```

  <img src="https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202206010751704.png" alt="image-20220601075108328" style="zoom:50%;" />



# Composition API 的优势

## Options API 存在的问题

使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 。

<div style="width:600px;height:370px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:600px;float:left" />
</div>
<div style="width:300px;height:370px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;width:560px;left" /> 
</div>




















## Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

<div style="width:500px;height:340px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>
<div style="width:430px;height:340px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>


















<img src="https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205310936693.png" alt="image-20220531093600235" style="zoom:50%;" />



# 新的组件

## Fragment

- 在Vue2中: 组件必须有一个根标签

- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中

- 好处: 减少标签层级, 减小内存占用

  

## Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。

  ```vue
  <!-- 移动的位置：html, body, #hello等等，teleport能够将它包裹的html片段移动到指定的位置 -->
  <teleport to="移动位置">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一个弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  </teleport>
  ```

- 自定义弹框示例

  ```js
  <template>
  	<div>
  		<button @click="isShow = true">点我弹个窗</button>
      <!-- 使用 teleport 将弹框内容移动到body中，以免影响其它组件的布局 -->
  		<teleport to="body">
  			<div v-if="isShow" class="mask">
  				<div class="dialog">
  					<h3>我是一个弹窗</h3>
  					<h4>一些内容</h4>
  					<h4>一些内容</h4>
  					<h4>一些内容</h4>
  					<button @click="isShow = false">关闭弹窗</button>
  				</div>
  			</div>
  		</teleport>
  	</div>
  </template>
  
  <script>
  	import {ref} from 'vue'
  	export default {
  		name:'Dialog',
  		setup(){
  			let isShow = ref(false)
  			return {isShow}
  		}
  	}
  </script>
  
  <style>
  	.mask{
  		position: absolute;
  		top: 0;bottom: 0;left: 0;right: 0;
  		background-color: rgba(0, 0, 0, 0.5);
  	}
  	.dialog{
  		position: absolute;
  		top: 50%;
  		left: 50%;
  		transform: translate(-50%,-50%);
  		text-align: center;
  		width: 300px;
  		height: 300px;
  		background-color: green;
  	}
  </style>
  ```

  <img src="https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202206010829044.png" alt="image-20220601082906439" style="zoom:75%;" />



## Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'
    const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
    ```

  - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

    ```vue
    <template>
    	<div class="app">
    		<h3>我是App组件</h3>
    		<Suspense>
    			<template v-slot:default>
    				<Child/>
    			</template>
    			<template v-slot:fallback>
    				<h3>加载中.....</h3>
    			</template>
    		</Suspense>
    	</div>
    </template>
    ```

-   示例代码

  ```js
  // App.vue 使用了异步组件，以便模拟延时加载效果
  <template>
    <div class="app">
      <h3>我是App组件</h3>
      <!-- 使用Suspense需要准备2个内容，分别对应 default、fallback 这2个插槽 -->
      <Suspense>
        <template v-slot:default>
          <Child/>
        </template>
        <template v-slot:fallback>
          <h3>稍等，加载中...</h3>
        </template>
      </Suspense>
    </div>
  </template>
  
  <script>
  // import Child from './components/Child'//静态引入组件
  import {defineAsyncComponent} from 'vue'
  
  const Child = defineAsyncComponent(() => import('./components/Child')) //异步引入组件
  export default {
    name: 'App',
    components: {Child},
  }
  </script>
  
  <style>
  .app {
    background-color: gray;
    padding: 10px;
  }
  </style>
  
  //--------------------------------------------------------------------------------------
  <template>
    <div className="child">
      <h3>我是Child组件</h3>
      {{ sum }}
    </div>
  </template>
  
  <script>
  import {ref} from 'vue'
  
  export default {
    name: 'Child',
    // 正常来讲，setup是不允许异步的，但是如果它的使用者（App.vue）是使用异步引入的方式的话，那么就可以用async修饰
    async setup() {
      let sum = ref(0)
      let p = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({sum})
        }, 3000)
      })
      return await p
    }
  }
  </script>
  
  <style>
  .child {
    background-color: skyblue;
    padding: 10px;
  }
  </style>
  ```

  ![2022-06-01 08.52.25](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202206010906029.gif)



# 其他

## 全局API的转移

- Vue 2.x 有许多全局 API 和配置。
  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                        |
    | ------------------------- | ------------------------------------------- |
    | Vue.config.xxxx           | app.config.xxxx                             |
    | Vue.config.productionTip  | <strong style="color:#DD5145">移除</strong> |
    | Vue.component             | app.component                               |
    | Vue.directive             | app.directive                               |
    | Vue.mixin                 | app.mixin                                   |
    | Vue.use                   | app.use                                     |
    | Vue.prototype             | app.config.globalProperties                 |
  



## 其他改变

- data选项应始终被声明为一个函数。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong>keyCode作为 v-on 的修饰符，同时也不再支持```config.keyCodes```

- <strong style="color:#DD5145">移除</strong>```v-on.native```修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    子组件的 emits 选型中配置了的事件，表示是自定义事件，没有配置的如本例的 v-on:click="handleNativeClickEvent" 中的click事件，由于没有配置在 emits 中配置，故Vue会认为它是原生的事件。
    
    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- <strong style="color:#DD5145">移除</strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......