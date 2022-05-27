# 第1章：TS进阶前准备

## TS项目搭建

### 工具库

node、typescript、ts-node、nodemon、parcel

### 搭建步骤

1. **初始化 npm init --yes 出现 package.json**
2. **安装 typescript**

​		全局安装 npm i typescript -g     或

​		本地安装： npm i typescript -D   或

​		yarn安装 yarn global  add typescript 

​		注意：npm i typescript -D 是 npm install typescript --save-dev的缩写

3. **生成tsconfig.json文件**

​		tsc --init  

4. **修改 tsconfig.json 中的配置**

   "outDir":  "./dist",     --outDir是ts编译后生成js文件保存的目录    	

   "rootDir":  "./src",     --rootDir是自己编写的ts源文件所在的目录   

   "exclude":  ["node_modules"]   --排除哪些文件不编译(放置顺序在compilerOptions配置项前)

   "target":  "es5"   --编译的目标js版本

   "lib":  ["DOM","es2020"] 

   "experimentalDecorators":  true   --装饰器相关配置

   "emitDecoratorMetadata":  true   --装饰器相关配置

   "downlevelIteration":  true

   --下面的基本都是默认的

   "module":  "commonjs" 

   "esModuleInterop":  true 

   "forceConsistentCasingInFileNames":  true 

   "strict":  true 

   "skipLibCheck":  true 

   > 注意: dist src package.json 必须是在一个目录下

5. **编译src目录以及子目录下的ts文件**

​		执行命令：tsc

​		注意：在src当前目录下输入tsc   直接输入tsc命令即可，它会把src目录以及子目录下的ts文件全部编译成js文件，并全部输出到dist

​		目录中。

6. **安装 ts-node**

​		ts-node让node能直接运行ts代码，无需使用tsc将ts代码编译成js代码。ts-node包装了node，它可以直接的运行ts代码。

​		全局安装     npm i ts-node -g     或

​		本地安装： npm i ts-node -D   或

​		yarn安装：yarn global  add ts-node 

7. **安装nodemon自动检测工具**

   nodemon作用：nodemon可以自动检测到目录中的文件更改时通过重新启动应用程序来调试基于node.js的应用程序。

​		全局安装  npm install -g nodemon     或

​		本地安装： npm i nodemon  -D  或

​		yarn安装    yarn add nodemon  -D   

8. **在package.json中配置自动检测，自动重启应用程序**

​		 "scripts": {

​				"dev": "nodemon --watch src/ -e ts --exec ts-node src/index.ts"

​		 }

​		nodemon --watch src/ ：检测目录是package.json同级目录src

​		-e ts：nodemon 命令准备将要监听的是ts后缀的文件

​		--exec ts-node ./src/project/app.ts ：检测到src目录下有任何变化 都要重新执行app.ts文件

​		执行命令：npm run dev 或 yarn dev 即可启动nodemon

​		--更多scripts命令如下：

- ```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon --watch src/ -e ts --exec ts-node src/index.ts",
    "build": "parcel ./src/index.html",
    "dev:build": "tsc -w",
    "dev:start": "nodemon --watch dist/decorator js --exec  node ./dist/decorator/decorator01.js",
    "start": "concurrently npm:dev:*",
    "tsc": "tsc src/decorator/demo02/UserController.ts  --target ES5 -w --experimentalDecorators"
  },
  ```

​	   其中 concurrently 需要安装第三方依赖，后面将类装饰器时会讲到。

​       npm  i  concurrently -S 或 yarn add  concurrently -S

​	   npm  i  nodemon -S 或 yarn add  nodemon -S				

9. **创建src目录、index.ts、index.html等文件**

   ![image-20220504191722425](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205041917680.png)

### 浏览器直接运行ts

1. **安装Parcel打包工具**

​		npm install parcel-bundler --save-dev

2. **在package.json中给npm添加启动项，支持启动parcel工具包**

```json
"scripts": {
  "build": "parcel ./src/index.html"
},
```

3. **启动parcel工具包**

​		npm run build 或 yarn build



# 第2章：深度掌握TS OOP核心技能

## 深度透彻掌握原型

### 为什么要用原型?

原型上所有的方法和属性都可以被构造函数的实例共享，那为什么要共享呢？ 先来看一个案例。

```js
function QQUsers (QQNo_, QQAge_, QQMark_) {
  this.QQNo = QQNo_;//QQ号
  this.QQAge = QQAge_;//Q龄
  this.QQMark = QQMark_;//QQ标签
  //引用对象类型=引用类型=对象类型=引用数据类型 
  // 数组也是一种引用数据类型 
  this.commonfriends = ['骑驴看海', '大漠上的英雄', '坚实的果子', '小草']//共同好友
  // 方法也是一种引用数据类型 
  this.show = function () {
    console.log(`QQ号:${this.QQNo},QQ龄:${this.QQAge},QQ标注:${this.QQMark}`)
    console.log(`共同的好友是:${this.commonfriends}`);
  }
}
// 对象也叫实例(instance)
// QQZhangSan叫做对象变量 对象是等号右边通过new出来的一个实例 而且是运行期间才在堆中开辟对象的内存空间
let QQZhangSan = new QQUsers("37834522", 15, "王阳明传人")
let QQLisi = new QQUsers("30424232", 10, "袁隆平的徒弟")
//let QQLiuwu = new QQUsers("刘武", 12, "飞起来的鸭子")

QQZhangSan.show();
QQLisi.show();
//QQLiuwu.show();
```

总结问题：所有 QQUser 对象都有相同的好友属性，好友属性用 commonfriends 英文表示，所有 QQUser 对象都有相同的 show 方法。但我们发现每一个 QQUser对象都单独分配一个 commonfriends 属性空间和 show 方法空间，浪费了大量内存空间。

### 函数和原型定义

1. 函数也是一个对象，当真正开始执行函数，执行环境(开发时为浏览器或控制台)会为函数分配一个函数对象变量空间和函数对象空间，函数对象变量用函数名表示，存在栈空间中， 函数对象空间是在堆中开辟的一个内存空间，这个空间中有一个默认的 prototype 属性，这个 prototype 属性就是一个原型对象属性。

2. 函数和构造函数的区别  

​     当通过 new 函数()时，此刻这个函数就是构造函数（ 日后会演变成TS 类的构造器）。 

3. 原型定义：原型【 prototype 】是由 JS 自动分配给函数的一个可以被所有构造函数实例对象共享的对象。

### 如何访问原型？

1. 构造函数所有实例对象都可以访问型对象空间上的属性和方法 ，每一个实例都有默认的 __proto__ 属性，这个 __proto__ 属性指向原型对象空间。

2. 关于__proto__：new 在创建新对象的时候，会赋予新对象一个属性指向构造函数的 `prototype` 对象空间，这个属性就是  __proto__。

3. 可以直接通过构造函数.prototype 对象属性来访问原型对象空间上的属性和方法。
4.  构造函数实例访问一个属性和方法，首先从实例空间中查找（当执行环境执行 new 构造函数()时，构造函数中通过 this 定义的属性和方法会分配在这个空间中），如果找到该属性和方法，就停止查找，表示找到了；如果没有找到，就继续在该实例的原型对象空间中去查找该属性和方法 （实例中默认的  __proto__ 对象 属性指向原型对象空间）。
5. 实例正是借助自身的__ proto __对象属性来查找原型对象空间中的属性和方法，有点像儿子去和爸爸要他没有的东西一样。 

![image-20220329082553711](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202203290826426.png)



```js
function QQUsers (QQNo_, QQAge_, QQMark_) {
  this.QQNo = QQNo_;//QQ号
  this.QQAge = QQAge_;//Q龄
  this.QQMark = QQMark_;//QQ标签
}
//在QQUsers函数的原型对象上定义属性和方法
QQUsers.prototype.commonfriends = ['骑驴看海', '大漠上的英雄', '坚实的果子', '小草']
QQUsers.prototype.show = function () {
  console.log(`QQ号:${this.QQNo},QQ龄:${this.QQAge},QQ标注:${this.QQMark}`)
  console.log(`共同的好友是:${this.commonfriends}`);
}

let QQZhangSan = new QQUsers("37834522", 15, "王阳明传人")
let QQLisi = new QQUsers("30424232", 10, "袁隆平的徒弟")
//QQUsers.prototype.commonfriends.push("大树");
console.log(QQZhangSan.commonfriends);
console.log(QQLisi.commonfriends);

//修改原型对象空间后之前创建的实例的__proto__并不会跟着改变
QQUsers.prototype = {
  commonfriends: ["abc", "bcd", '骑驴看海']
}

console.log("QQUsers.prototype:", QQUsers.prototype)
console.log("QQZhangSan.commonfriends:", QQZhangSan.commonfriends)
console.log("QQUsers.prototype.commonfriends:", QQUsers.prototype.commonfriends)
```

### 图解原型链

1. f1/f2是由Foo创建的对象，故他们的__proto__指向的是Foo.prototype。

2. Foo具有双重性(既是函数也是对象)，它作为对象的一面，是由Function创建的，故它的__proto__指向的是Function.prototype。

3. Object也具有双重性(既是函数也是对象)，它作为对象的一面，也是由Function创建的，故它的__proto__指向的是Function.prototype。

4. Foo.prototype和Function.prototype是一个Object类型的实例对象，它们都是由Object()创建，故它们的__proto__指向的是Object.prototype，Object.prototype的__proto__则指向null。

![image-20220403170329728](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204031703138.png)

5. 下面的构造函数从左至右可以依次理解为：Grand Son ---> Son ---> Parent ---> Grand Parent。

![image-20220403170137167](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204031701847.png)

### 几点思考

1. 增加或修改原型对象的属性或方法后， 所有的实例或叫对象立即可以访问的到 （但创建实例后再覆盖原型除外）。

2. 创建实例后再覆盖原型，实例对象无法访问到,为什么？

3. new 构造函数底层到底发生了什么？

   第一件事：在堆中为类的某个对象分配一个空间【按类型开辟对空间】

   第二件事：调用对应的构造函数并且把构造器中的各个参数值赋值给对象属性【调用构造函数初始化】
   //   new Person()自动匹配无参数的构造器【创建一个实例对象】
   第三件事：把对象赋值给对象变量 【把实例赋值给实例变量/对外暴露内存地址值】



##  深入理解TS类

### TS类基础知识

#### 学习TS类的深远意义

1. 相对以前 JavaScript 不得不用 构造函数来充当”类“，TypeScript 类的出现可以说是一次技术革命。让开发出来的项目尤其是大中项目的可读性好，可扩展性好了不是一点半点。

2. TypeScrip 类的出现完全改变了前端领域项目代码编写模式，配合 TypeScript 静态语言，编译期间就能检查语法错误的优势，项目上线后隐藏语法错误的风险几乎为零，相比不用 TypeScript 开发项目，使用 TypeScript 后对前端项目尤其是大中项目的开发 或底层第三方插件，组件库的开发带来的优势已经超乎了想象。

3. TypeScript 类让前端开发人员开发和组织项目或阅读各大前端框架源码的思维问题的方式变得更先进，更全面了许多。因为类是 OOP【面型对象编程】的技术基石，OOP 思想来自于生活，更利于开发人员思考技术问题。TypeScript 类已经成了每次前端面试的高频面试考点。

4. 在前端各大流行框架开发的项目中，比如 Vue3 项目，Angular项目， 基于 Antd UI 库的项目 还是后端 Nodejs 框架，比如：Nestjs，亦或是 Vue3 底层源码，都可以频频见到类的身影。

5. 尽管 TypeScript 类照搬了 Java 后端语言的思想，但 TypeScript 类的底层依然是基于 JavaScript 的，这一点对于前端工程师更深入理解 TypeScript 打开了一条理解之道，提升他们更深厚的 JavaScript 功底从而为面试加分和项目的运用都提供了间接的帮助。

#### TS哪些技能基于类？

TypeScript 类是 OOP 的技术基石，包括类、属性封装丶继承、多态、抽象丶泛型。紧密关联的技术包括方法重写，方法重载，构造器，构造器重载，类型守卫，自定义守卫，静态方法、属性，关联引用属性，多种设计模式等。

####  什么是类 ？

定义：类就是拥有相同属性和方法的一系列对象的集合，类是一个摸具，是从这该类包含的所有具体对象中抽象出来的一个概念，类定义了它所包含的全体对象的静态特征和动态特征。

类有静态特征和动态特征【以大家最熟悉的人类为例】
静态特征【软件界叫属性】姓名，年龄,地址,身份证号码,联系方式,家庭地址,微信号
动态特征【软件界叫方法】吃饭，走路

【再看桌子类】

静态特征【属性】高度，宽度，颜色，价格，品牌，材质

动态特征【方法】承载

【来看订单类】 

静态特征 【属性】 订单号【订单id】，下单时间，下单顾客，订单详情，顾客微信，收件地址，负责客服

动态特征  【方法】 下单，修改订单，增加订单，删除订单，查询订单，退单 【这一些方法真正开发会归为OrderService 类】 但从广义来说都同属于订单系列类的方法。

#### 理解子类

1. 什么是子类？   

​	有两个类，比如 A 类和 B 类，如果满足 A 类  is a kind of  B类，那么 A 类就是 B 类的子类
​	比如：A 类是顾客类，B 类是人类，因为顾客类 a kind of 人类成立【顾客类是人类的一种】，所以顾客类是人类的子类。

2. 子类如何继承父类的属性和方法？

​	以顾客类为例子：顾客类继承了父类【人类】的非私有的属性和方法，也具备子类独有的属性和方法 。

​	顾客类继承父类【人类】的全部非私有的属性和方法外，还有哪些独有的属性和方法呢？
​	顾客类独有属性：顾客等级，顾客编号
 	顾客类独有方法：购买

#### 什么是对象？

1. 什么是对象？

 	就是一个拥有具体属性值和方法的实体，是类的一个具体表现，一个类可以创建1个或者多个对象。

2. 如何通过类来创建对象？

```js
let 对象变量名= new 类名（）
const 对象变量名= new 类名（）
```

3. 如何根据People类来创建叫张三对象的人？

​	 let  kateCust = new Customer()   kateCust 是对象变量名 ，new Customer()  表示 new 出来的是一个Customer对象，而且是运行期	间才在堆中分配 Customer 对象的内存空间 【 new  就是分配内存空间的意思】

4. 类的对象变量丶对象内存图展示

![image-20220329090350916](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202203290903249.png)

5. 类的对象变量，对象的关系

​	类的对象变量存在栈中，对象变量存储着对象的首地址，对象变量通过这个地址找到它的对象。

### 剖析TS类编译后源码

```typescript
//TS代码
class Person {
    //public  name:string |undefined	//typescript4.0之前属性如果没有赋值的解决方法 增加一个undefined数据类型
    public name: string = "noname"
    public age: number = 0
    public phone: string = "11111"
    //public address:string[]=["北京海淀区西三环","df","海甸岛"]
    //public resolve: () => void = () => { } 函数类型的属性【属于引用属性的一种】
    //public addressArray: Array<string> = ["北京海淀区西三环", "df", "海甸岛"]//数组类型的属性【属于引用属性的一种】
    // 对象的变量 = 实例的变量 = 类的非静态的属性 = 简称属性

    constructor(name_: string, age_: number, phone_: string) {
        this.name = name_;
        this.age = age_;
        this.phone = phone_;
    }

    //function  错误,类中定义方法不能用function
    // public play(): number {
    //   //return "df"//不能将类型“string”分配给类型“number”
    //  // return 3

    // }

    public doEat(who: string, address: string): void {//方法默认的返回值为void
        console.log(`${this.name}和${who}吃饭,在${address}吃饭`);
    }

    public doStep() {

    }
}

//let zhangSanPerson = new Person();
//给对象赋值的两种方式
// 方法1：通过类中属性或者方法来赋值 get/set选择器
// zhangSanPerson.name = "zhangSan"
// zhangSanPerson.age = 23
// zhangSanPerson.phone = "134123123"

// zhangSanPerson.doEat("李四", "王府井")

// 方法2： 通过构造函数 【构造器】来赋值
let zhangSanPerson = new Person("zhangSan", 23, "134123123");
zhangSanPerson.doEat("李四", "王府井")

console.log(zhangSanPerson)
```



```js
//编译后JS代码(ES5)
var Person = /** @class */ (function () {
    function Person(name_, age_, phone_) {
        this.name = "noname"; //赋初值为noname
        this.age = 0;
        this.phone = "11111";
        this.name = name_;
        this.age = age_;
        this.phone = phone_;
    }
    Person.prototype.doEat = function (who, address) {
        console.log(this.name + "\u548C" + who + "\u5403\u996D,\u5728" + address + "\u5403\u996D");
    };
    Person.prototype.doStep = function () {
    };
    return Person;
  }());
  
var zhangSanPerson = new Person("zhangSan", 23, "134123123");
zhangSanPerson.doEat("李四", "王府井");
console.log(zhangSanPerson);
```



### TS引用属性及应用场景

#### TS类的引用属性

引用属性：如果类中的属性的类型是引用类型，那么这个属性就是引用属性。引用属性的数据类型一般有数组 ，函数，类，对象类型[{.... }格式]，对象数组类型，集合类【Set，Map,自定义	集合类】

#### 经典应用场景

1. 底层经典案例：如果我们使用 TypeScript 来开发一个 ES6 的 Set 集合类就是对数组的二次包装，在这个 Set 集合类中就需要包含一个数组的引用属性供Set类的各个方法来使用。

2. 底层经典案例：Promise 是前端很重要的技术，Promise 底层类中就采用了函数类型的引用属性【大家先只需要知晓，本课程后面章节会自己动手开发一个 Promise】。

3. 二次封装应用场景：Set 集合虽好，但不能使用 get(index) 直接取值，这也造成了取值不方便，如果我们自己动手封装一个包含了 add、get、remove、delete、query 的集合类【ArrayList】，这时也需要借助数组引用属性 。
4. 各种 Nodejs 后端项目构建的应用场景：我们以同学们相对熟悉的订单详情类和订单类为例，下面我们说明并定义电商平台必用的两个类——订单详情类OrderDetail和订单类订单类。
5. 跨前端领域的 Java 后端大量使用了引用属性（先知道下即可）。

#### 订单及订单详情举例

1. 订单类产生过程：每个顾客每下一次订单，都会生成一个或者多个订单详情（一件商品生成一个订单详情）但每次只能生成一个订单，也就是一个订单中包含了一个或者多个订单详情，我们可以定义一个订单类Order。订单类包括了订单 Id，订单日期，顾客地址，顾客名，顾客微信，顾客手机号，客服

2. 订单详情类产生过程：顾客在淘宝上下一次订单购买了三件商品，用三条记录来表示：

​		第一个订单详情记录： 1   "笔记本" 6898  8
​		第二个订单详情记录：  2    "电脑桌" 7878  9
​		第三个订单详情记录：  3    "手机"   3789  2
​		每一个订单详情都可以用一个对象来表示，创建一个订单详情类OrderDetail，然后 new 出 3 个订单详情类的实例 。

```typescript
import OrderDetail from './OrderDetail'
class Order {
  //订单 Id，订单日期，顾客地址，顾客名，顾客微信，顾客手机号，客服
  public orderId: number = 0;
  public date: Date = new Date();
  public custname: string = "nocustname"
  public phone: string = "111"
  //public orderDetail:OrderDetail[]=[]
  //public orderDetail:Set=[]
  // 这是一个引用属性【数组类型的引用属性】 
  public orderDetailArray: Array<OrderDetail> = []//定义了一个Array数组,Array数组当中的每一个元素都是OrderDetail类型的元素
 
  constructor(orderId_: number, date_: Date, custname_: string, phone_: string, orderDetailArray_: Array<OrderDetail>) {
    this.orderId = orderId_;
    this.date = date_;
    this.custname = custname_;
    this.phone = phone_
    this.orderDetailArray = orderDetailArray_
  }

  public static peisong(){
    let time="2024-01-02"
  }
}

let orderDetailOne = new OrderDetail(10, "电视机", 5000, 3);
let orderDetailTwo = new OrderDetail(11, "桌子", 2000, 2);
//let orderDetailThree=new OrderDetail(12,"桌子",2000,2);

// 给数组赋值方式1：直接定义数组时赋值
let orderDetailArray: Array<OrderDetail> = [orderDetailOne, orderDetailTwo]
// 给数组赋值方式2：定义完成以后再单独赋值
//let orderDetailArray: Array<OrderDetail> = []
//orderDetailArray[0]=orderDetailOne
//orderDetailArray[1]=orderDetailTwo 

//定义数组并赋值的第三种方式
//let orderDetailArray: Array<OrderDetail> = [] 等价于let orderDetailArray: Array<OrderDetail> =new Array()
//let orderDetailArray: Array<OrderDetail> = new Array(orderDetailOne, orderDetailTwo)

var orderDate = new Date(2023, 10, 17, 5, 20, 0);

//写法1:
// let order = new Order(1, orderDate, "李武", "33333", orderDetailArray);
//写法2:
let order = new Order(1, orderDate, "李武", "33333", [orderDetailOne, orderDetailTwo]);
```

```typescript
// 订单详情类
export default class OrderDetail {

  public orderDetailId: number = 0;
  public productname: string = "noproduct"//订单详情中的商品名[顾客购买的商品]
  public price: number = 0;//购买的商品的价格
  public count: number = 0;//购买数量

  constructor(orderDetailId_: number, productname_: string,
    price_: number, count_: number) {

    this.orderDetailId = orderDetailId_;
    this.productname = productname_;
    this.price = price_;
    this.count = count_
  }
}
let orderDetailOne = new OrderDetail(10, "电视机", 5000, 3);
```

#### 构造器简洁赋值

```typescript
import OrderDetail from './OrderDetail'
class Order {
  // public orderId: number;
  // public date: Date
  // public custname: string
  // public phone: string
  //定义了一个Array数组,Array数组当中的每一个元素都是OrderDetail类型的元素
  // public orderDetailArray: Array<OrderDetail> = []
  // 给构造器的参数如果加上public，这个参数就变成了一个属性, 它等价于：1.定义一个属性，2.构造函数会给这个属性赋值[隐式操作]。
  constructor(public orderId: number, public date: Date, public custname: string, public phone: string, public orderDetailArray: Array<OrderDetail>) {
    // this.orderId = orderId_;
    // this.date = date_;
    // this.custname = custname_;
    // this.phone = phone_
    // this.orderDetailArray = orderDetailArray_
  }
  
  doEat() {
    //let x = undefined;
    const x = 3;
    x = 10;//无法分配到 "x" ，因为它是常数。
  }

}

class SonOrder extends Order {
  doStep() {
    super.doEat()
  }
}

let orderDetailOne = new OrderDetail(10, "电视机", 5000, 3);
let orderDetailTwo = new OrderDetail(11, "桌子", 2000, 2);
var orderDate = new Date(2023, 10, 17, 5, 20, 0);
let order = new Order(1, orderDate, "李武", "33333", [orderDetailOne, orderDetailTwo]);
```

内存图：

![image-20220329094946930](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202203290949842.png)

![image-20220329095049992](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202203290950110.png)



### TS 类 和 ES6 类对比

TS 类和 ES6 类看着很像，但又有很多不同，区分 TS  类 和 ES6 类，既可以让我们 对 TS 类 的优势印象更深刻，也会减少 TS 类 和 ES6 类 概念上的混淆。

#### 定义类属性的方式不同

1. TS 类有多种定义属性的方式，如下：

​		方式1：先在类中定义属性然后在构造函数中通过 this 赋值；

​		方式2：构造函数直接为参数增加 public，给构造器的参数如果加上 public，这个参数就变成了一个属性, 默认构造函数会给这个属

​		性赋值[隐式操作]，以上节课的 Order 类为例，具体代码如下：

```typescript
class Order {
    constructor(public orderId: number, public date: Date,public custname: string,
        public phone: string, public orderDetailArray: Array<OrderDetail>) {
        // 无需this赋值
     }
     ......
 }    
```

2. ES6 依然沿袭了 JavaScript 赋值的方式，在构造函数直接 this 来定义属性并赋值，代码如下：

```js
class Order {
    constructor(orderId, date, custname, phone, orderDetailArray) {
        this.orderId = orderId;
        this.date = date;
        this.custname = custname;
        this.phone = phone;
        this.orderDetailArray = orderDetailArray;
    }
}
```

#### ES6类没有访问修饰符

ES6类暂时还没有访问修饰符【public protected private】，这也让 ES6 类设置访问权限变的异常麻烦，即使借助call 方法或者 symbol 类型设置了访问权限局限性也很大，其实也并没有真正彻底解决访问权限的问题。这点让ES6类在项目中对属性和方法的权限控制很受限制。 TS 类却自带 public protected private 三种访问权限，设置访问权限轻松自如。【不设置默认访问权限为 public 】 理解访问修饰符很简单，后面我们讲解完继承后再讲解，大家很快会理解。

#### TS 类是静态类型语言的类

TS 是静态类型语言，具有类型注解和类型推导的能力，项目上线后隐藏语法和类型错误的的风险几乎为零，而ES6 是 JavaScript 的一个语法标准，没有数据类型检查的能力，举一个简单例子来说明问题。

```
  // ES6
  const x = 3;
  x = 10; // ES6没有任何语法错误提示
  
  // TS
  const x = 3;
  x = 10;//无法分配到 "x" ，因为它是常数。
```

#### TS类可编译成各版本的JS

TS类可以生成ES5或ES6或以上版本的js文件。通过设置 tsconfig.json 文件的 target 属性值为 ES6，那么生成的js文件就是 ES6 版本的js文件。



## 函数重载

### 函数(方法)重载的重要性

著名前端流行框架底层都用到函数重载，例如：Vue3 底层源码就多处使用到带泛型的函数重载【对于泛型先知晓下即可，我们会在第4章我们会融合 Vue3 源码来深度讲解泛型函数重载，本章深度讲解的是非泛型的函数重载，掌握好了泛型函数重载，就具备了学习泛型函数重载的基础】。很多前端面试更是拿函数重载作为考核求职者 TS 技能是否扎实的标准之一，如果你不掌握函数重载，等于你的 TS 技能有缺失，技能不过关。

函数重载或方法重载适用于完成项目中某种相同功能但细节又不同的应用场景。我们举一个生活中的例子让同学们先有个印象，比如：吃饭是一个函数，表示一个吃饭功能，但西方人用叉子，中国人用筷子，这就是细节不同，那如果我们可以用函数重载来解决。

不管现阶段你公司的项目中是否用到了函数重载和方法重载，如果学完后，你能适时给公司提建议，建议项目中合适的场景中使用函数重载并说明原因，你的建议应该很受欢迎！

函数重载或方法重载有以下几个优势：

1. 结构分明：让代码可读性，可维护性提升许多，而且代码更漂亮

2. 各司其职，自动提示方法和属性：每个重载签名函数完成各自功能，输出取值时不用强制转换就能出现自动提示，从而提高开发效率

3. 更利于功能扩展

这三点优势大家先记住即可，学完方法重载后大家就会理解。

### TS函数重载定义和规则

TS 的函数重载比较特殊，和很多其他后端语言的方法重载相比，多了不少规则。学习函数重载，先要了解什么是函数签名，定义如下：

**函数签名** [ function signature ]：函数签名=函数名称+函数参数+函数参数类型+返回值类型四者合成。在 TS 函数重载中，包含了实现签名和重载签名，实现签名是一种函数签名，重载签名也是一种函数签名。

关于函数重载的定义，我们先来看一个很多其他资料提供的不完整且模糊的TS函数重载定义：

**不完整模糊的 TS 函数重载定义**：一组具有相同名字，不同参数列表的和返回值无关的函数 。

**完整的函数重载定义**：包含了以下规则的一组函数就是TS函数重载(规则内容多，大家要多记，多实践方可)。

**函数重载的规则：**

1. 由一个实现签名+ 一个或多个重载签名合成。

2. 但外部调用函数重载定义的函数时，只能调用重载签名，不能调用实现签名，这看似矛盾的规则，其实 是TS 的规定：实现签名下的函数体是给重载签名编写的，实现签名只是在定义时起到了统领所有重载签名的作用，在执行调用时就看不到实现签名了。

3. 调用重载函数时，会根据传递的参数来判断你调用的是哪一个函数。

4. 只有一个函数体，只有实现签名配备了函数体，所有的重载签名都只有签名，没有配备函数体。

5. 关于参数类型规则完整总结如下：

​		实现签名参数个数可以少于重载签名的参数个数，但实现签名如果准备包含重载签名的某个位置的参数 ，那实现签名就必须兼容所		有重载签名该位置的参数类型【联合类型或 any 或 unknown 类型的一种】。

6. 关于重载签名和实现签名的返回值类型规则完整总结如下：

​		必须给重载签名提供返回值类型，TS 无法默认推导。提供给重载签名的返回值类型不一定为其执行时的真实返回值类型，可以为重载签名提供真实返回值类型，也可以提供  void 或unknown 或 any 类型，如果重载签名的返回值类型是 void 或 unknown 或 any 类型，那么将由实现签名来决定重载签名执行时的真实返回值类型。 当然为了调用时能有自动提示+可读性更好+避免可能出现了类型强制转换，强烈建议为重载签名提供真实返回值类型。不管重载签名返回值类型是何种类型，包括后面讲的泛型类型，实现签名都可以返回 any 类型 或 unknown类型，当然一般我们两者都不选择，让 TS 默认为实现签名自动推导返回值类型。

### 方法和函数区别

**方法：**方法是一种特定场景下的函数，由对象变量（或实例变量）直接调用的函数都是方法。

**方法签名：**和函数签名一样，方法签名 = 方法名称 + 方法参数 + 方法参数类型 + 返回值类型四者合成。

比如：

1. 函数内部用 this 定义的函数是方法； 

2. TS  类中定义的函数是方法（TS  类中定义的方法就是编译后  JS 底层 prototype 的一个函数）； 
3. 接口内部定义的函数是方法（注意：不是接口函数）；
4. type  内部定义的函数是方法（注意：不是 type 函数）。

### 应用场景举例

#### 微信消息发送

需求：有一个获取微信消息发送接口消息查找函数，根据传入的参数从数组中查找数据，如果入参为数字， 就认为消息 id，然后从从后端数据源中找对应 id 的数据并返回，否则当成类型，返回这一类型的全部消息。

* 不使用函数重载

```typescript
type MessageType = "image" | "audio" | string;//微信消息类型

type Message = {
  id: number;
  type: MessageType;
  sendmessage: string;
};

let messages: Message[] = [
  //let messages: Array<Message> = [
  {id: 1, type: 'image', sendmessage: "你好啊,今晚咱们一起去三里屯吧"},
  {id: 2, type: 'audio', sendmessage: "朝辞白帝彩云间，千里江陵一日还"},
  {id: 3, type: 'audio', sendmessage: "你好！张无忌"},
  {id: 4, type: 'image', sendmessage: "刘老根苦练舞台绝技！"},
  {id: 5, type: 'image', sendmessage: "今晚王牌对王牌节目咋样?"}]

//不用函数重载实现功能
// 1.函数结构不分明,可读性，可维护性变差
function getMessage(value: number | MessageType): Message | undefined | Array<Message> {
  if (typeof value === "number") {
    return messages.find((msg) => { return value === msg.id })
  } else {
    //return messages.filter((msg) => { return value === msg.type })
    return messages.filter((msg) => value === msg.type)
  }
}
// 自定义守卫
//document.getElementById("id")
console.log(getMessage("audio"));

// TS没有办法运行之前根据传递的值来推导方法最终返回的数据的数据类型，只可以根据方法定义的类型展现
//let msg=getMessage(1) 
//console.log(msg.sendMessage)//错误 类型“Message | Message[]”上不存在属性“sendMessage”。

// 因为方法返回值类型不是单纯的Message类型，故需要类型转换
let msg = (<Message>getMessage(1)).sendmessage
console.log("msg:", msg)// msg: 你好啊,今晚咱们一起去三里屯吧


export { }
```

* 使用函数重载

```typescript
type MessageType = "image" | "audio" | string;

type Message = {
    id: number,
    type: MessageType,
    sendmessage: string
};

let messages: Array<Message> = [
    {id: 1, type: 'image', sendmessage: "你好啊,今晚咱们一起去三里屯吧"},
    {id: 2, type: 'audio', sendmessage: "朝辞白帝彩云间，千里江陵一日还"},
    {id: 3, type: 'audio', sendmessage: "你好！张无忌"},
    {id: 4, type: 'image', sendmessage: "刘老根苦练舞台绝技！"},
    {id: 5, type: 'image', sendmessage: "今晚王牌对王牌节目咋样?"}]

function getMessage(value: number): Message
function getMessage(value: MessageType):Array<Message>
function getMessage(value: any): Message | undefined | Array<Message>{
    if(typeof value === "number"){
        return messages.find(msg => msg.id === value);
    }else{
        return messages.filter(msg => msg.type === value);
    }
}


console.log(getMessage(1));
const msg = getMessage(1);
console.log(msg.sendmessage);

console.log("------------------------------");

const msgs = getMessage("image");
console.log(msgs);
```

补充：如果增加需求，还要求可以指定获取消息的数量。则使用函数重载也很容易实现！

```typescript
type MessageType = "image" | "audio" | string;

type Message = {
    id: number,
    type: MessageType,
    sendmessage: string
};

let messages: Array<Message> = [
    {id: 1, type: 'image', sendmessage: "你好啊,今晚咱们一起去三里屯吧"},
    {id: 2, type: 'audio', sendmessage: "朝辞白帝彩云间，千里江陵一日还"},
    {id: 3, type: 'audio', sendmessage: "你好！张无忌"},
    {id: 4, type: 'image', sendmessage: "刘老根苦练舞台绝技！"},
    {id: 5, type: 'image', sendmessage: "今晚王牌对王牌节目咋样?"}]


function getMessage(value: number): Message
function getMessage(value: MessageType):Array<Message>
function getMessage(value: MessageType, count: number):Array<Message>
//注意number要给默认值，否则参数个数和前2个只有1个参数的重载签名不兼容
function getMessage(value: any, count: number = 9999999): Message | undefined | Array<Message>{
    if(typeof value === "number"){
        return messages.find(msg => msg.id === value);
    }else{
        return messages.filter(msg => msg.type === value).splice(0, count);
    }
}

console.log(getMessage(1));
const msg = getMessage(1);
console.log(msg.sendmessage);

console.log("------------------------------");

const msgs = getMessage("image", 2);
console.log(msgs)
```

#### TS版ArrayList

```typescript
//  1.对现有的数组进行封装，让数组增删改变得更加好用
//  2.提供get方法 remove方法 显示方法【add方法】
// 其中需求中的remove方法有两个，我们用方法重载来实现

class ArrayList {
  //定义一个引用属性【数组】
  constructor(public element: Array<object>) {

  }
  //根据索引来查询数组中指定元素
  get(index: number) {
    return this.element[index]
  }

  //显示方法
  show() {
    this.element.forEach((ele) => {
      console.log(ele);
    })
  }

  //remove方法重载，支持传递索引值或者元素
  remove(value: number): number
  remove(value: object): object
  //remove(value: number | object): number | object {
  remove(value: any): any {
    this.element = this.element.filter((ele, index) => {
      //如果是根据数字【元素索引】去删除元素，remove方法返回的是一个数字
      if (typeof value === "number") {
        return value !== index
      } else {
        // 如果是根据对象去删除元素，remove方法返回的是一个对象
        return value !== ele
      }
    })
    return value;
  }

}

let stuOne = { stuname: "wnagwu", age: 23 }
let stuTwo = { stuname: "lisi", age: 39 }
let stuThree = { stuname: "liuqi", age: 31 }

let arrayList = new ArrayList([stuOne, stuTwo, stuThree]);
arrayList.show();

console.log("删除第一个学生");
// let value = arrayList.remove(0)
// console.log("删除的元素为第:", value, "学生")
// arrayList.show();
let value = arrayList.remove(stuTwo)
console.log("删除的学生对象为:", value)
arrayList.show();
// 如果是根据数字【元素索引】去删除元素，remove方法返回的是一个数字
// 如果是根据对象去删除元素，remove方法返回的是一个对象
//let value=arr.remove(1)
```

### 构造函数重载

#### **再次强化理解 this**

this 其实是一个对象变量，当 new 出来一个对象时，构造器会隐式返回 this  给 new 对象等号左边的对象变量，this 和等号左边的对象变量都指向当前正创建的对象。以后，哪一个对象调用 TS 类的方法，那么这个方法中的 this 都指向当前正使用的对象【 this 和当前的对象变量中都保存着当前对象的首地址】

####  **TS构造器有返回值吗？**

尽管TS类构造器会隐式返回 this，如果我们非要返回一个值，TS 类构造器只允许返回 this，但构造器不需要返回值也能通过编译，更没有返回值类型之说，从这个意义上，TS 构造器可以**说成是没有返回值这一说**的构造函数。【**注意：TS 构造器和 JS 构造函数关于返回值的说法不完全相同**】

#### 构造函数重载的意义

构造器重载和函数重载使基本相同，主要区别是：TS 类构造器重载签名和实现签名都不需要管理返回值，TS 构造器是在对象创建出来之后，但是还没有赋值给对象变量之前被执行，一般用来给对象属性赋值。

我们知道在 TS 类中只能定义一个构造器，但实际应用时，TS 类在创建对象时经常需要用到有多个构造器的场景，比如：我们计算一个正方形面积，创建正方形对象，可以给构造器传递宽和高，也可以给构造器传递一个包含了宽和高的形状参数对象，这样需要用构造器重载来解决。而面试中也多次出现过关于TS构造器重载的考察，主要考察求职者对重载+构造器的综合运用能力。

#### 构造器是方法吗?

我们说对象调用的才是方法，但是 TS 构造器是在对象空间地址赋值给对象变量之前被调用，而不是用来被对象变量调用的，所以构造器( constructor )可以说成构造函数，但不能被看成是一个方法。

#### 构造器实现编码

```typescript
//不使用构造函数重载
type Shape = {
    width?: number,
    height?: number,
    radius?: number
}

class Square {
    public width: number;
    public height: number;

    constructor(args1: any, args2: any) {
        if (typeof args1 === 'number') {
            this.width = args1;
            this.height = args2;
        } else {
            this.width = args1.width;
            this.height = args1.height;
        }
    }

    public getArea(): number {
        return this.width * this.height
    }
}

const square1 = new Square(100, 50);
console.log('square1 area:' + square1.getArea());

const square2 = new Square(100, 50);
console.log('square2 area:' + square2.getArea());

// print: square1 area:5000  square.ts:30 square2 area:20000
```



```typescript
//使用构造函数重载
type Shape = {
    width?: number,
    height?: number,
    radius?: number
}

class Square {
    public width: number;
    public height: number;

    constructor(shape: Shape)
    constructor(width: number, height: number)
    constructor(args1: any, args2: number = 0) { //注意args2要给默认值，否则参数个数和1个参数的重载签名不兼容
        if (typeof args1 === 'number') {
            this.width = args1;
            this.height = args2;
        } else {
            this.width = args1.width;
            this.height = args1.height;
        }
    }

    public getArea(): number {
        return this.width * this.height
    }
}

const square1 = new Square(100, 50);
console.log('square1 area:' + square1.getArea());

const square2 = new Square(200, 100);
console.log('square2 area:' + square2.getArea());

// print: square1 area:5000  square.ts:30 square2 area:20000
```



## 单件设计模式

### 了解设计模式

设计模式通俗的讲，就是一种更好的编写代码方案，打个比喻：从上海到武汉，你可以选择做飞机，做轮船，开车，骑摩托车多种方式，把出行看成是编码，那么选择飞机相对就是一个更好选择的优化方案。

### 常见设计模式概述

常见的设计模式有单件设计模式，简单工厂设计模式，工厂方法，抽象工厂设计模式，观察者设计模式，装饰设计模式，代理设计模式，MVC，MVP, MVVM 架构设计模式。本课程讲解单件设计模式，原因有两个： 1. 设计模式并非 TypeScript 课程的重点，我们要把更多时间留给TS核心技能。 2. 单件设计模式虽短小精悍，但能更好的帮助掌握 TS 类，类的静态方法，类构造器，类对象的联合运用。 

### 两种定义及陷阱

**简明定义1**：一个类对外有且仅有一个实例【只提供一个实例】，这种编码方案就是单件设计模式。

**完整定义1：**如果某个类对外始终只提供一个对象【实例】，并且在该类的内部提供了一个外部访问该对象的方法或该对象属性，那么这种编写代码方案【就是设计模式】就是单件设计模式。

**完整定义2：**如果一个类的任何外部通过访问类提供的某个方法或某个属性始终只能获取该类一个对象【实例】，但如果该类提供了多个外部可以访问的方法或属性，那么外部就能访问到该类的多个不同的对象，但从实际开发来看，绝大多数情况的应用场景，我们对外都只提供一个唯一的可以访问的方法或属性，这样就保证了实例为单个，类的这种编写代码的方案【就是设计模式】就是单件设计模式。

### 应用场景

实际开发中，外部访问某个类的对象【实例】时，确保只能访问该类的唯一对象时才能保证逻辑的正确性时，这时就应该使用单件设计模式了。

**应用场景1：**比如 Vuex，React-Redux 中的全局状态管理容器 store 对象在整个项目被设计成唯一的对象，把 store 对象所在的类设计成单件设计模式将是最好的设计方案 （当然也可以有其他替代写法）。

**应用场景2：**一般前端项目需要进行客户端本地数据存储时，都会考虑使用 localStorage，localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份 localStorage 数据。那封装 localStorage设计成一个单件设计模式类就再合适过了。【尽管也可以其他写法，但依然存在问题，编码时我们会给同学们说明】。

**应用场景3：**我们知道项目日志记录是一个项目中必不可少的环节，当我们为一个项目编写一个日志文件类，用来保存日志和阅读日志信息时，这个日志文件类可以有多种设计方案，但把类写成单件模式是最好的方案，因为每次存储日志信息到日志文件上时都创建一个日志对象，这既没有必要，也很浪费内存空间。

```typescript
// 构建单件设计模式：这里使用的是懒汉式，还可以使用饿汉式，饿汉式比较简单，这里略过。
//   第一步：把构造器设置为私有的，不允许外部来创建类的实例
//   第二步：至少应该提供一个外部访问的方法或属性，外部可以通过这个方法或属性来得到一个对象，所以应该把这个方法设置为静态方法
//   第三步：外部调用第二步提供的静态方法来获取一个对象
export default class Singleton {
    static instance: Singleton;

    private constructor() {}

    public show():void{
        console.log('hello');
    }

    public static getInstance(): Singleton {
        if (!this.instance) {
            this.instance = new Singleton();
        }
        return this.instance;
    }
}

const instance = Singleton.getInstance();
instance.show();
```

### 静态属性和方法

**1.外部如何调用 TS 类的静态成员？**

答：类名直接调用静态成员，格式：类名.静态属性  类名.静态方法。

**2. TS类内部静态方法如何调用其它的静态成员？** 

答：使用 this 来获取静态成员。

**3.  静态方法是否可以访问类中原型对象上的方法或对象属性，反过来呢?**  

答：都不能。

**4.  对象变量是否可以访问静态成员？**

答：不能。

**5. 一个静态方法改变了某个静态属性，其他静态方法或类外部任何地方访问这个属性都会发生改变。**	

**6.  静态成员保存在内存哪里？何时分配的内存空间呢？**

答：任何一个 TS 类中的静态成员存储在内存的静态区，运行一个 TS 类，TS首先会为静态成员开辟内存空间，静态成员的内存空间分配的时间要早于对象空间的分配，也就是任何一个对象创建之前 TS 就已经为静态成员分配好了空间。但一个静态方法或静态属性只会分配一个空间，只要当前服务器不重启或控制台程序还没有结束之前【如果是开发期间临时测试，一般用控制台】，那么静态方法或者是静态属性就一直存在内存空间，无论调用多少次这个静态方法或静态属性，都是调用的同一块空间。

![image-20220330095915255](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202203300959076.png)

**静态方法两点总结：**

1. 无论你是否创建对象，创建多少个对象，是否调用该静态方法或静态属性，TS都会为这个静态方法或静态属性分配内存空间，注意：静态成员和对象无关。

2. 一旦为静态方法或静态属性分配好空间，就一直保存到内存中，直到服务器重启或者控制台程序执行结束才被释放。

**彩蛋：new 一个 TS 类的方法可以吗？能在TS 类外部使用 prototype为TS类增加方法或属性吗?**

虽然在 JS 中可以 new 一个类（构造函数）内部定义的对象方法或静态方法，但**TS已经屏蔽了去new 一个类中的方法**【 JS 可以，会当成一个构造函数】，TS 类可以访问 prototype 原型对象属性，但无法在 prototype 原型对象属性增加新的方法或属性，这么做，就是让我们只能在类的内部定义方法，防止回到 ES5 从前非面向类和对象的而写法（但是可以覆盖类上已经存在的方法）。

**7.   静态方法或属性和原型对象空间上的方法或属性有何区别？**

答：原型对象空间上的方法和属性用来提供给该类的所有对象变量共用的方法或属性，没有对象和对象变量，原型上的属性和方法就没有了用武之地，而静态方法或静态属性属于类，可以通过类来直接访问。任何一个对象创建之前 TS 就已经为静态成员分配好了空间。但一个静态方法或静态属性只会分配一个空间，而每一个对象都有自己独立的空间。

**8.  静态方法是否可以接受一个对象变量来作为方法的参数？**

答：可以，静态方法内部不能通过this来访问对象属性和方法，但可以通过调用静态方法时把对象变量传递给静态方法来使用。比如：我们把 js 的 Object 构造函数想象成一个 TS 类【实际 TS 类编译后的 JS 文件中就变成了一个构造函数】。Object 类就拥有大量的静态方法，例如：apply，call，bind，keys等，现在我们来关注静态方法是否可以接受对象变量作为方法的参数，我们以Object.keys方法为例 【Object类的keys方法用来获取给定对象的自身可枚举属性组成的数组】。

```js
// 我们现在把 Object 构造函数看成一个 Object 类，创建 Object 类的对象。
let obj = new Object({ username: "wangwu", age: 23 })//1
let obj2 = { username: "wangwu", age: 23 }// 2是1的简写
// 把 obj 对象变量传递给 keys静态方法，obj对象变量作为 keys 静态方法的参数
Object.keys(obj2)
```

**9.  何时应该把一个方法定义成静态方法或属性定义为静态属性呢？**

答:  **应用1：单件设计模式就是静态方法和静态属性很好的应用场景之一。**当外部不能创建对象，就只能借助类内部的静态方法来获取类的对象；这时肯定不能把这个方法定义成原型对象属性上的方法，只能定义为类的静态方法，因为如果定义成原型对象属性的方法，就会导致外部无法被访问，因为外部根本不能创建对象，也就无法访问原型对象属性上的方法。而静态方法要访问的属性就只能是静态属性了，这也是静态属性的应用时机。

​	 **应用2：** **当类中某个方法没有任何必要使用任何对象属性时，而且使用了对象属性反而让这个方法的逻辑不正确，那既如此，就应该禁止这个方法访问任何对象属性和其他的对象方法，这时就应该把这个方法定义为静态方法。**例如：一个顾客类的购买方法【 buy 方法】中肯定要允许访问顾客姓名或其他顾客微信这些对象属性，这样的方法我们就**需要定义在原型对象属性**上，但如果顾客类中的 阅读顾客积分公告方法【 readNotice 方法] 是针对全体顾客的公告方法，就应该定义为静态方法，方法内部就应该禁止出现任何具体的对象属性。如果在这样的方法中使用了顾客的某个属性，比如用了顾客姓名，那么这个方法逻辑就不正确【**这个方法就会说：你让我向全体顾客展示公告，你我要知道每个顾客姓名做什么？**】。所以我们应该让这样的方法禁止访问对象属性和其他的对象方法，那就应该设置为静态方法。

​	**应用3：当一个类中某个方法只有一个或者 1-2个 对象属性，而且更重要的是，你创建这个类的对象毫无意义，我们只需要使用这个类的一个或者多方法就可以了，那么这个方法就应该定义为静态方法。常见的工具类中的方法通常都应该定义为静态方法。比如 StringUtil, FileUtil 等，我们以 FileUtil 为例进行讲解。**

***思考题***：定义一个文件工具类【 FileUtil 】，编写一个读取文件方法【readFile方法】方便外部调用，那这样的方法应该定义为静态方法吗？

答：定义在原型属性上和定义为静态方法似乎都可以，只要 readFile 方法获取到外部提供文件名就可以展开文件读写。请看下面两段代码，我们仔细比较后再来决定用哪一种方案？

```js
class FileUtil{
	// 从指定文件上把数据读出来打印在控制台或页面上的静态方法
   public static readFile(readonly fileName:string){  
      fs.readFile(fileName, (err: any, data: any) => {
          console.log("fs.readFile:", data.toString());
      }
   }
  // 把键盘输入的数据或页面上获取的数据写入到指定文件上的静态方法
   public static writeFile(fileName:string){
       fs.writeFile(fileName, '刘老根4', function (error) {
          if (error) {
            console.log('写文件失败')
          } else {
            console.log('写文件成功')
          }
	})
 
 }
 // 实际应用中，读和写一般都不在一个时间段，可能读功能完成后，过了几分钟，用户才在客户端执行写的方法，
 // 又过了一会，用户又在客户端执行了读的方法。 但我们知道静态方法实际上是一直保存到内存空间，这样反复操作其实节省了大量反复创建 和释放 FileUtil 对象的时间和对应的对象内存空间。
 FileUtil.readFile('./log.txt')
 FileUtil.writeFile('./log5.txt')
```

```js
class FileUtil{
   constructor(public fileName:string){}
  
   // 从指定文件上把数据读出来打印在控制台或页面上的静态方法
   public  readFile(){  
      fs.readFile(fileName, (err: any, data: any) => {
          console.log("fs.readFile:", data.toString());
      }
   }
   
    // 把键盘输入的数据或页面上获取的数据写入到指定文件上的静态方法
    public writeFile(fileName:string){
       fs.writeFile(fileName, '刘老根4', function (error) {
          if (error) {
            console.log('写文件失败')
          } else {
            console.log('写文件成功')
          }
	})
 }
 // 实际应用中，读和写一般都不在一个时间段，可能读功能完成后，过了几分钟，用户才在客户端执行写的方法，
 // 又过了一会，用户又在客户端执行了读的方法。所以每次都要创建 FileUtil 对象，这样反复创建 和释放  FileUtil 对象，就浪费了大量反复创建 和释放 FileUtil 对象的时间和对应的对象内存空间
 new FileUtil('./log.txt').readFile()
 new FileUtil('./log5.txt').writeFile()
```

**10.  对于第 9 项思考题中的关于使用静态属性或静态方法的解决方案绝对不能用在学生，顾客其他应用场景，那样会导致三个比较严重的问题，以学生对象为例：**

1. 浪费了很多不必要的内存空间

运行一开始就为大量的静态属性和大量的静态方法分配内存空间【但很可能某个静态方法一直没有使用，白白的一直占用着内存空间】

2. 无法展示一个学生一个对象的直观效果，完全失去了对象来描述实体的优势！

3. 最严重的问题是：属性值一变则都变

所有操作都在用一个静态方法空间来完成某种功能，一旦某个操作改变了静态方法中的某个值，比如改变了学生姓名，则其他操作访问到这个静态变量看到的结果全变了。

### 单件设计模式实现

#### 	饿汉式实现

饿汉式单件设计模式是无论你是否用到了对象，一开始就建立这个唯一的对象。

构建单件设计模式[饿汉式单件设计模式 立即创建对象]

第一步：把构造器设置为私有的，不允许外部来创建类的实例

第二步: 建立一个静态引用属性，同时把这个静态引用属性直接指向一个对象【 new MyLocalStorage()】

第三步：外部调用第二步提供的静态方法来获取一个对象

```typescript
class MyLocalStorage {
  // 对象属性【对象的基本类型属性和对象的引用属性】
  // 静态属性【静态的基本类型属性和静态的引用属性】
  static localstorage: MyLocalStorage = new MyLocalStorage();
  static count: number = 3
  private constructor() {
    console.log("这是TS的单件设计模式的静态方法的构造器");
  }

  public setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public getItem(key: string) {
    let value = localStorage.getItem(key)
    return value != null ? JSON.parse(value) : null
  }
}
```

#### 懒汉式实现

 构建单件设计模式[懒汉式[等到需要使用对象时才创建对象,按需创建]单件设计模式 ]

 第一步：把构造器设置为私有的，不允许外部来创建类的实例

 第二步: 至少应该提供一个外部访问的方法或属性，外部可以通过这个方法或属性来得到一个对象，所以应该把这个方法设置为静态方法

 第三步：外部调用第二步提供的静态方法来获取一个对象

```js
export default class MyLocalStorage {
    static localstorage: MyLocalStorage;

    private constructor() {
        console.log("这是TS的单件设计模式的静态方法的构造器");
    }

    // 提供一个外部访问的方法, 通过这个方法用来提供外部得到一个对象的方法
    //   1. 带static关键字的方法就是一个静态方法
    //   2. 静态方法和对象无关，外部的对象变量不能调用静态方法和静态属性，
    //   3. 外部可以通过类名来调用
    //   静态方法不可以访问实例属性或实例方法
    public static getInstance() {
        if (!this.localstorage) {
            this.localstorage = new MyLocalStorage()
        }
        return this.localstorage
    }

    // 保存key-value
    public setItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    //根据key取出value
    public getItem(key: string) {
        let value = localStorage.getItem(key)
        return value != null ? JSON.parse(value) : null;
    }
}


const storage = MyLocalStorage.getInstance();
storage.setItem('number', 123);
storage.setItem('zhangsan', {name: '张三', age: 20});

console.log(storage.getItem('number'));
console.log(storage.getItem('zhangsan'))
```

补充：实际开发中，前端项目中经常会用到 LocalStorage，如果不封装成一个类，那么经常是如下写法，显然封装成一个类会比较好用一些。

```typescript
localStorage.setItem("count", "30")

let loginInfoObj = { username: "lisi", age: 23 }

localStorage.setItem("loginUser", JSON.stringify(loginInfoObj))

// 问题1：代码零散
// 问题2：可读性差，不能一下子就能顾名思义
// 问题3：对后期的维护产生影响
// 问题4： JSON.stringify，JSON.parse可以直接放到类中，如果这样写的多，就影响了开发效率

let value = localStorage.getItem("loginUser")
value != null ? JSON.parse(value) : null;
```



## 深度掌握TS继承

### 学习TS继承的意义

**练就更深厚的 JS 原型/原型链功底**

TS编译后的JS中有经典的JS原型和原型链的源码实现，虽然稍显复杂，但源码并不长，这将是练就更深厚的 JS 原型、原型链功底的绝佳场景。通过这几次课的认真磨练，大家将拥有更深厚的 JS 原型、原型链功底。这不仅让你日后面试大受益，而且也为你能阅读Vue3,React 源码或其他流行框架源码铺路，因为不管是那种源码，JS原型链继承一定会用到，再加上你的TS功底，那么这些都成让你日后前端之路走的更远，走的更高！

**提升前端项目架构的根基技术**

如果要你现在用开发一个工具库，组件库，你打算怎么开发 ? 可以写出n多个版本的代码，都可以实现，但版本和版本之间的价值却差别巨大，你可以用 JS 原型写出1年左右工作经验的前端水准的代码，当然，上乘之选肯定是用 TS 来开发，你也可以灵活运用TS继承，多态等多种技术写出高水准的代码。但如果你不具备后端思维能力，就算你工作了5年，你也不一定能有这样的思维，甚至随时有可能被一个拥有了后端思维的只有1到2年工作经验水准的前端工程师超越。

**突破前端技术瓶颈之一的技能**，**晋级中丶高级前端工程师必会技能**

如果你只掌握了单个类的使用，而不知道如何运用继承，那这也是技能缺失，将会限制你日后技术发展的高度，限制你的技术视野，让你的前端变得过于前端化。说深度掌握了 TS 继承就能突破所有的前端技术瓶颈，那很显然是夸大其词，但要想突破前端技术瓶颈，深度掌握继承必然是其中一项技能，而且是根基技术之一，可见继承的重要性不言而喻。

比如一个简单的汽车租赁项目，让你来实现，你把前端功能实现了，展示在页面上了，但是打开你用 TS 写的 Vuex 代码，用 TS 写的 Nodejs 代码，过于前端化的思维让你编写的代码可能让人不堪入目。这里不单单是说用到封装继承，多态，解耦这些技术，更多的是你过于前端化的思维编写的项目可扩展性将非常差，可读性也差，可复用性也低，而这些是评判一个项目是否值钱的关键因素。

如果你希望未来职业生涯拥有更广阔的技术视野；更远的未来你甚至希望自己能胜任技术总监，那么你就一定从一个更广阔的技术视野来提升自己的技术能力，不能让自己被框在过于前端化的路上。

虽然老师不能三言两语给同学们描述出什么才叫完全突破前端瓶颈，但有一点是可以肯定的，就是要有一定的后端思维能力，这里当然不是要拥有 Java 后端能力，而是起码具备 Nodejs 后端的项目架构能力，Nodejs 可以前端工程师提升晋级一定要掌握的技能。而深度掌握了 TS 继承已经为突破前端技术瓶颈开了一个好头。

### 几种常见的JS继承实现

#### 原型链继承

1. 原型链继承实现原理

   原型链继承基本思想就是Son 类的原型对象属性 Son.prototype 指向 new  Parent( )。即：

   ```js
   function Parent(name, age) {
       this.name = name
       this.age = age
   }
   
   Parent.prototype.friends = ["xiaozhang", "xiaoli"]
   Parent.prototype.eat = function () {
       console.log(this.name + " 吃饭");
   }
   
   function Son(favor, sex) {
       this.favor = favor 
       this.sex = sex
   }
   
   console.log("Son.prototype:", Son.prototype);
   
   Son.prototype = new Parent("张三", 25);
   Son.prototype.constructor = Son; //这一步非常容易遗忘
   
   let sonobj = new Son("打篮球", "男");
   console.log("sonobj:", sonobj);
   
   console.log(sonobj instanceof Parent); // true，所以是真继承
   console.log(sonobj instanceof Son);
   ```

   原型链继承实现的本质是改变Son构造函数的原型对象变量的指向【 就是Son.prototype的指向 】，Son.prototype= new  Parent ( )。那么 Son.prototype 可以访问 Parent 对象空间的属性和方法。所以顺着 __proto__ 属性 ，Son类的实例对象也可以访问 Parent 类的原型对象空间中的所有属性和方法。

   **原型链继承查找属性和方法的完整路线描述: 子对象首先在自己的对象空间中查找要访问的属性或方法，如果找到就输出，如果没有找到就沿着子对象中的proto属性指向的原型对象空间中去查找有没有这个属性或方法，如果找到就输出，如果没有找到就继续沿着原型对象空间中的proto查找上一级原型对象空间中的属性或方法，直到找到Object.prototype原型对象属性指向的原型对象空间为止，如果再找不到，就输出null。**

2. 原型链继承实现容易被遗忘的重要一步：Son.prototype.constructor = Son。

3. 原型链继承的不足。原型链继承具有局限性，不能通过子类构造函数向父类构造函数传递参数。

#### 借用构造函数继承

1. 借用构造函数继承如何解决原型链继承的局限性？

   借用构造函数继承思想就是在子类的构造函数内部借助 apply ( ) 和 call ( ) 方法调用并传递参数给父类的构造函数，在父类构造函数中为当前的子类对象变量增加属性。

2. 借用构造函数继承代码实现

   ```js
   function Parent(name, age) {
       this.name = name
       this.age = age
   }
   
   Parent.prototype.friends = ["xiaozhang", "xiaoli"]
   Parent.prototype.eat = function () {
       console.log(this.name + " 吃饭");
   }
   
   function Son(name, age, favor, sex) {
       Parent.call(this, name, age); //子类构造函数中调用父类构造函数
       this.favor = favor
       this.sex = sex
   }
   
   let sonobj = new Son("张三", 20, "打篮球", "男");
   console.log(sonobj);
   console.log(sonobj.friends); //undefined，没有办法访问Parent原型空间中的属性和方法。
   console.log(sonobj instanceof Parent);  // false，所以是伪继承
   console.log(sonobj instanceof Son);
   ```

3. 借用构造函数继承的不足

   借用构造函数实现了子类构造函数向父类构造函数传递参数，但没有继承父类原型的属性和方法，无法访问父类原型上的属性和方法。

#### 借用构造函数+原型链组合继承

1.  借用构造函数+原型链继承组合模式的优势

   **优势1：**具备借用构造函数的优点：子类构造函数的内部可以向父类构造函数传递参数

   **优势2：**具备原型链继承的优点：Son.prototype 和 new Parent( ) 出来的实例对象变量和实例都可以访问父类构造函数原型对象上的属性和方法。

2. 借用构造函数+原型链组合继承代码实现

   ```js
   function Parent(name, age) {
       this.name = name
       this.age = age
   }
   
   Parent.prototype.friends = ["xiaozhang", "xiaoli"]
   Parent.prototype.eat = function () {
       console.log(this.name + " 吃饭");
   }
   
   function Son(name, age, favor, sex) {
       Parent.call(this, name, age);
       this.favor = favor
       this.sex = sex
   }
   Son.prototype = new Parent("tom", 20);
   Son.prototype.constructor = Son;
   
   let sonobj = new Son("张三", 20, "打篮球", "男");
   console.log(sonobj);
   console.log(sonobj.friends); //可以访问Parent原型空间中的属性和方法。
   console.log(sonobj instanceof Parent);  // true，所以是真继承
   console.log(sonobj instanceof Son);
   ```

3. 借用构造函数+原型链继承组合模式的不足

   缺点：调用了两次父类构造函数(一次是在Son构造函数内部，一次是在创建桥接对象时)。

   new Parent() 调用构造函数带来问题： 进入Parent 构造函数为属性赋值，分配内存空间，浪费内存；赋值导致效率下降一些，关键是 new Parent() 赋的值无意义，出现代码冗余，new Son() 出来的对象和这些值毫不相干，是通过子类 Son 构造函数中的 apply 来向父类People构造函数赋值。

#### 寄生组合继承

1. 寄生组合继承模式=借用构造函数继承+寄生继承。

   寄生组合继承既沿袭了借用构造函数+原型链继承两个优势，而且解决了借用构造函数+原型链继承调用了两次父类构造函数为属性赋值的不足。寄生组合继承模式保留了借用构造函数继承，寄生组合继承模式使用寄生继承代替了原型链继承。

2. 什么是寄生继承呢？就是 Son.prototype 不再指向 new  Parent( ) 出来的对象空间，而用 Parent 类 【父构造函数】的原型对象属性“克隆”了一个对象。再让Son.prototype指向这个新对象，很好的避免了借用构造函数+原型链继承调用了两次父类构造函数为属性赋值的不足。

3. 寄生组合继承代码实现

   ```js
   function Parent(name, age) {
       this.name = name
       this.age = age
   }
   
   Parent.prototype.friends = ["xiaozhang", "xiaoli"]
   Parent.prototype.eat = function () {
       console.log(this.name + " 吃饭");
   }
   
   function Son(name, age, favor, sex) {
       Parent.call(this, name, age);
       this.favor = favor
       this.sex = sex
   }
   
   function _extends(parent, child) {
       function Middle() {
           this.constructor = child;
       }
   
       Middle.prototype = parent.prototype;
   
       return new Middle();
   }
   
   
   //寄生组合继承
   Son.prototype = _extends(Parent, Son);
   
   let sonobj = new Son("张三", 20, "打篮球", "男");
   console.log(sonobj);
   console.log(sonobj.friends); //可以访问Parent原型空间中的属性和方法。
   console.log(sonobj instanceof Parent);  // true，所以是真继承
   console.log(sonobj instanceof Son);
   
   for (let key in sonobj) {
       if (Object.prototype.hasOwnProperty.call(Son, key)) {
           console.log('sonobj的自有属性key: ' + key);
       } else {
           console.log('sonobj的继承属性key: ' + key);
       }
   }
   ```

   ![image-20220402091919001](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204020919990.png)



#### Object.create继承

1. Object.create继承本质上还是寄生组合继承，只不过这个create方法是js内置的，它的功能其实就是我们在寄生组合继承代码实现中封装的 _extends() 所做的事情，只不过它没有处理constructor的指向问题，还需要我们手动处理一下。另外正因为它不处理constructor指向问题，所以Object.create() 只需接收一个参数即可，这个参数就是Parent.prototype。关于Object.create() 可以参考下面2篇笔记。

   > 1.new Object()、Object.create()、{} 的区别： https://note.youdao.com/s/8Huh04Dr
   >
   > 2.Js类继承实现及Object.create使用：https://note.youdao.com/s/F9u7qYJP

2. Object.create继承代码实现

   ```js
   function Parent(name, age) {
       this.name = name
       this.age = age
   }
   
   Parent.prototype.friends = ["xiaozhang", "xiaoli"]
   Parent.prototype.eat = function () {
       console.log(this.name + " 吃饭");
   }
   
   function Son(name, age, favor, sex) {
       Parent.call(this, name, age);
       this.favor = favor
       this.sex = sex
   }
   
   //Object.create(prototype) 的作用就是创建一个实例对象，并让它的__proto__指向参数prototype
   const middle = Object.create(Parent.prototype);
   Son.prototype = middle;
   Son.prototype.constructor = Son;
   
   let sonobj = new Son("张三", 20, "打篮球", "男");
   console.log(sonobj);
   console.log(sonobj.friends); //可以访问Parent原型空间中的属性和方法。
   console.log(sonobj instanceof Parent);  // true，所以是真继承
   console.log(sonobj instanceof Son);
   
   for (let key in sonobj) {
       if (Object.prototype.hasOwnProperty.call(Son, key)) {
           console.log('sonobj的自有属性key: ' + key);
       } else {
           console.log('sonobj的继承属性key: ' + key);
       }
   
   ```

#### Object.setPrototypeOf继承

1. Object.setPrototypeOf继承本质上也是寄生组合继承，只不过这个setPrototypeOf方法是js内置的，它的功能其实就是我们在寄生组合继承代码实现中封装的 _extends() 所做的事情，并且与Object.create不同，它处理了constructor的指向问题，不需要我们再手动处理。

2. Object.setPrototypeOf继承代码实现

   ```js
   function Parent(name, age) {
       this.name = name
       this.age = age
   }
   
   Parent.prototype.friends = ["xiaozhang", "xiaoli"]
   Parent.prototype.eat = function () {
       console.log(this.name + " 吃饭");
   }
   
   function Son(name, age, favor, sex) {
       Parent.call(this, name, age);
       this.favor = favor
       this.sex = sex
   }
   
   Object.setPrototypeOf(Son.prototype, Parent.prototype);
   
   let sonobj = new Son("张三", 20, "打篮球", "男");
   console.log(sonobj);
   console.log(sonobj.friends); //可以访问Parent原型空间中的属性和方法。
   console.log(sonobj instanceof Parent);  // true，所以是真继承
   console.log(sonobj instanceof Son);
   
   for (let key in sonobj) {
       if (Object.prototype.hasOwnProperty.call(Son, key)) {
           console.log('sonobj的自有属性key: ' + key);
       } else {
           console.log('sonobj的继承属性key: ' + key);
       }
   }
   ```

   ![image-20220402093106678](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204020931503.png)

#### 寄生组合继承图解

![image-20220403221101320](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204032211116.png)

### 全栈眼光理解TS继承

#### 理解子类

1. 什么是子类？   

   有两个类，比如 A 类和 B 类，如果满足 A 类  is a kind of  B类，那么 A 类就是 B 类的子类。
   比如：A 类是顾客类，B 类是人类，因为顾客类 a kind of 人类成立（顾客类是人类的一种），所以顾客类是人类的子类。

2. 子类如何继承父类的属性和方法？

   以顾客类为例子：顾客类继承了父类（人类）的非私有的属性和方法，也具备子类独有的属性和方法 。

   顾客类继承父类（人类）的全部非私有的属性和方法外，还有哪些独有的属性和方法呢？
   顾客类独有属性：顾客等级，顾客编号
   顾客类独有方法：购买

3. 初步理解为什么要用继承？

   举例：宠物管理项目中的狗狗类，兔子类，小猫类都是宠物，尽管每个宠物都有独有属性和方法，比如狗狗类的品种，看家方法；兔子类的肤色属性等。但这些类都包含了 name, buymoney[购买价格]，healthstatus[健康状况]，friendshipstar [和主人的友谊星级数]这些属性，如果每一个类都写这些属性，那么就非常臃肿，可以把这些属性提取出来放到一个宠物类中，其他类都继承这个宠物类。当然继承还有更多好处，下面借助汽车租赁功能的实现来更深度的掌握继承。

#### 汽车租赁管理案例

1. 需求1：汽车租赁功能实现: 有小轿车，大巴,卡车三种类型的车，顾客可以租任意一种或多种不同类型的车，按照租用的天计算租金， 同时为了响应国家对各类车安全的管理，对在租赁期内有过各种超载，超乘客数，酒后驾车等违规的车需额外支付一定的费用。

   需求2：计算退回费用。最终退回顾客的费用为押金扣除使用天数，如押金不足需额外支付不足部分。

   思考小轿车，大巴，卡车共同属性:  品牌 ( brand )、VechileNo ( 车牌号 ) 、days ( 租赁天数 )、 total ( 支付的租赁总费用 )、  deposit ( 押金 )。

   思考小轿车，大巴，卡车共同方法：计算租赁车的价格 ( calculateRent) 、支付押金的方法( payDesposit)、安全规则方法（safeShow)。

2. 编码实现

   ```typescript
   //父类Vehicle，车辆类
   abstract class Vehicle {
       public vehicleID: number
       public vehicleNum: string;
       public brand: string;
       public rentDays: number;
   
       constructor(vehicleID: number, vehicleNum: string, brand: string, rentDays: number) {
           this.vehicleID = vehicleID;
           this.vehicleNum = vehicleNum;
           this.brand = brand;
           this.rentDays = rentDays;
       }
   
       //计算押金
       public abstract calDeposit(): number;
   
       //获取单日价格
       public abstract getPricePerDay(): number;
   
       //判断是否违规
       public abstract isViolation(): boolean;
   
       //计算违规费用
       public abstract calViolationCost(): number;
   
       //计算总费用
       public calTotalCost() {
           return this.rentDays * this.getPricePerDay() + this.calViolationCost();
       };
   }
   
   export default Vehicle;
   ```

   ```typescript
   //子类Car，小汽车类
   import Vehicle from "./vehicle";
   
   class Car extends Vehicle {
       public type: string;
   
       constructor(vehicleID: number, vehicleNum: string, brand: string, rentDays: number, type: string) {
           super(vehicleID, vehicleNum, brand, rentDays);
           this.type = type;
       }
   
       calDeposit(): number {
           if (this.type === "宋") {
               return 500
           } else if (this.type === "唐") {
               return 800
           } else {
               return 300
           }
       }
   
       calViolationCost(): number {
           return this.isViolation() ? 500 : 0;
       }
   
       getPricePerDay(): number {
           if (this.type === "宋") {
               return 300
           } else if (this.type === "唐") {
               return 400
           } else {
               return 200
           }
       }
   
       isViolation(): boolean {
           return false;
       }
   }
   
   const car = new Car(1, "鄂A22487", "比亚迪", 10, "唐");
   const cost = car.calTotalCost()
   console.log(`you need pay: ${cost} `);
   
   export default Car;
   ```

   ```typescript
   //子类Bus，巴士类
   import Vehicle from "./vehicle";
   
   class Bus extends Vehicle {
       public seatNum: number;
   
       constructor(vehicleID: number, vehicleNum: string, brand: string, rentDays: number, seatNum: number) {
           super(vehicleID, vehicleNum, brand, rentDays);
           this.seatNum = seatNum;
           if (this.seatNum > 200) {
               throw new Error("座位数不可能大于200");
           }
       }
   
       calDeposit(): number {
           if (this.seatNum < 50) {
               return 500
           } else if (this.seatNum < 100) {
               return 800
           } else {
               return 1000
           }
       }
   
       calViolationCost(): number {
           return this.isViolation() ? 1000 : 0;
       }
   
       getPricePerDay(): number {
           if (this.seatNum < 50) {
               return 200
           } else if (this.seatNum < 100) {
               return 500
           } else {
               return 800
           }
       }
   
       isViolation(): boolean {
           return true;
       }
   }
   
   const bus = new Bus(2, "鄂A22499", "宇通", 10, 120);
   const cost = bus.calTotalCost()
   console.log(`you need pay: ${cost} `);
   
   export default Bus;
   ```

   ```typescript
   //子类Truck，卡车类
   import Vehicle from "./vehicle";
   
   class Truck extends Vehicle {
       public load: number;
   
       constructor(vehicleID: number, vehicleNum: string, brand: string, rentDays: number, load: number) {
           super(vehicleID, vehicleNum, brand, rentDays);
           this.load = load;
           if (this.load > 20) {
               throw new Error("载重不可能大于20吨");
           }
       }
   
       calDeposit(): number {
           if (this.load < 5) {
               return 500
           } else if (this.load < 10) {
               return 800
           } else {
               return 1000
           }
       }
   
       calViolationCost(): number {
           return this.isViolation() ? 1000 : 0;
       }
   
       getPricePerDay(): number {
           if (this.load < 5) {
               return 300
           } else if (this.load < 10) {
               return 500
           } else {
               return 800
           }
       }
   
       isViolation(): boolean {
           return true;
       }
   }
   
   const truck = new Truck(3, "鄂A22566", "东风", 10, 8);
   const cost = truck.calTotalCost()
   console.log(`you need pay: ${cost} `);
   
   export default Truck;
   ```

#### 方法重写(override)

1. 应用场景：当父类中方法的实现不能满足子类功能需要或不能完全满足子类功能需要时，就需要在子类中进行重写。
2. 方法重写给继承带来的好处: 让所有的子类共用父类中方法已经实现了一部分功能的代码，增加了代码的复用性。 

3. **定义规则**：1. 和父类方法同名  2. 参数和父类相同，如果是引用类型的参数，需要依据具体类型来定义。

4. 父类方法的访问范围（访问修饰符）必须小于子类中方法重写的访问范围（访问修饰符），同时父类方法不能是private。

5. super关键字：一般用于子类方法中重写（override）继承自父类的方法。

#### super的两种用法

1. 在子类的构造函数中使用 super (子类传递给父类构造函数的参数) 就表示用来调用父类构造函数。super 编译成 JS 源码后 可以看到：就是采用 JS 原型中的借用构造函数来实现的。

2. 在子类重写的方法中调用父类同名方法，super.重写的方法()。

​	**错误用法**：当子类和父类有同名属性时，可以在子类中用 super 来获取父类同名属性吗？不能！一般要避免在子类，父类属性名同名。



### 深度剖析TS继承源码

#### 静态成员继承

静态成员(属性、方法)是定义在构造函数上的，比如：Parent.count = 123,  Parent.commonDescribe = function(){} 等。所谓静态成员继承，总的来说可以通过2种方式实现，一种是直接将Parent上的静态成员(注意：这里指的是自有属性和方法，不包括继承过来的)扩展到Son身上，另一种就是 Son.__proto__ = Parent。只要从Son可以访问到Parent身上的静态成员，我们就说实现了静态成员的继承。

```js
export let extendsStatic = (function () {
    //定义4种继承静态属性和方法的函数
    function extendsByForIn(Son, Parent) {
        for (let key in Parent) {
            if (Object.prototype.hasOwnProperty.call(Parent, key)) {
                Son[key] = Parent[key]
            }
        }
    }

    function extendsByObjectKeys(Son, Parent) {
        Object.keys(Parent).forEach((key) => {
            Son[key] = Parent[key];
        })
    }

    function extendsByProto(Son, Parent) {
        Son.__proto__ = Parent
    }

    function extendsBySetPrototypeOf(Son, Parent) {
        Object.setPrototypeOf(Son, Parent);
    }

    //下面是上面4种方式的综合体
    extendsStatic = function (Son, Parent) {
        extendsStatic = extendsBySetPrototypeOf || extendsByForIn || extendsByObjectKeys || extendsByProto;
        extendsStatic(Son, Parent);
    }
    return extendsStatic;
}());
```

#### TS继承源码分析

这里以之前举的汽车租赁案例为例，通过tsc命令将Vehicle类和Car类编译为ES5代码如下。

Vehicle类：

```js
//ts版本
abstract class Vehicle {
    public vehicleID: number
    public vehicleNum: string;
    public brand: string;
    public rentDays: number;

    constructor(vehicleID: number, vehicleNum: string, brand: string, rentDays: number) {
        this.vehicleID = vehicleID;
        this.vehicleNum = vehicleNum;
        this.brand = brand;
        this.rentDays = rentDays;
    }

    //计算押金
    public abstract calDeposit(): number;

    //获取单日价格
    public abstract getPricePerDay(): number;

    //判断是否违规
    public abstract isViolation(): boolean;

    //计算违规费用
    public abstract calViolationCost(): number;

    //计算总费用
    public calTotalCost() {
        return this.rentDays * this.getPricePerDay() + this.calViolationCost();
    };
}

export default Vehicle;

//-------------------------------------------------------------------------------------------------
//js版本
"use strict";
exports.__esModule = true;
var Vehicle = /** @class */ (function () {
    function Vehicle(vehicleID, vehicleNum, brand, rentDays) {
        this.vehicleID = vehicleID;
        this.vehicleNum = vehicleNum;
        this.brand = brand;
        this.rentDays = rentDays;
    }
    //计算总费用
    Vehicle.prototype.calTotalCost = function () {
        return this.rentDays * this.getPricePerDay() + this.calViolationCost();
    };
    ;
    return Vehicle;
}());
exports["default"] = Vehicle;
```

Car类：

```js
//ts版本
import Vehicle from "./vehicle";

class Car extends Vehicle {
    public type: string;

    constructor(vehicleID: number, vehicleNum: string, brand: string, rentDays: number, type: string) {
        super(vehicleID, vehicleNum, brand, rentDays);
        this.type = type;
    }

    calDeposit(): number {
        if (this.type === "宋") {
            return 500
        } else if (this.type === "唐") {
            return 800
        } else {
            return 300
        }
    }

    calViolationCost(): number {
        return this.isViolation() ? 500 : 0;
    }

    getPricePerDay(): number {
        if (this.type === "宋") {
            return 300
        } else if (this.type === "唐") {
            return 400
        } else {
            return 200
        }
    }

    isViolation(): boolean {
        return false;
    }
}

const car = new Car(1, "鄂A22487", "比亚迪", 10, "唐");
const cost = car.calTotalCost()
console.log(`you need pay: ${cost} `);

export default Car;

//-------------------------------------------------------------------------------------------------
//js版本
"use strict";
//定义一个实现了静态成员继承和实例成员继承的函数
var __extends = (this && this.__extends) || (function () {
    //定义一个静态成员的继承函数
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    //返回的函数内部调用了extendStatics，并且处理了原型链继承。
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

//Car类实现
exports.__esModule = true;
//引入Vehicle父类
var vehicle_1 = require("./vehicle");
var Car = /** @class */ (function (_super) {
    //调用__extend函数处理继承关系，按理说这一步书写顺序应该放到下面好一点，但是JS遵循"先定义后执行"的原则，关系也不大。
    __extends(Car, _super);
    function Car(vehicleID, vehicleNum, brand, rentDays, type) {
        var _this = _super.call(this, vehicleID, vehicleNum, brand, rentDays) || this;
        _this.type = type;
        return _this;
    }
    Car.prototype.calDeposit = function () {
        if (this.type === "宋") {
            return 500;
        }
        else if (this.type === "唐") {
            return 800;
        }
        else {
            return 300;
        }
    };
    Car.prototype.calViolationCost = function () {
        return this.isViolation() ? 500 : 0;
    };
    Car.prototype.getPricePerDay = function () {
        if (this.type === "宋") {
            return 300;
        }
        else if (this.type === "唐") {
            return 400;
        }
        else {
            return 200;
        }
    };
    Car.prototype.isViolation = function () {
        return false;
    };
    return Car;
}(vehicle_1["default"]));

//使用举例
var car = new Car(1, "鄂A22487", "比亚迪", 10, "唐");
var cost = car.calTotalCost();
console.log("you need pay: " + cost + " ");
exports["default"] = Car;
```

#### 手写TS继承

前面TS继承源码剖析，编译后的源码略显凌乱。下面自己再实现一版。

```js
var Vehicle = (function () {
    function Vehicle(vehicleID, vehicleNum, brand, rentDays) {
        this.vehicleID = vehicleID;
        this.vehicleNum = vehicleNum;
        this.brand = brand;
        this.rentDays = rentDays;
    }

    Vehicle.prototype.calTotalCost = function () {
        return this.rentDays * this.getPricePerDay() + this.calViolationCost();
    };
    return Vehicle;
}());

//给Vehicle定义2个静态成员用于后面检测静态成员是否继承成功
Vehicle.color = "vehicle color：black";
Vehicle.showNum = function () {
    console.log("vehicle number：鄂A12345");
}

var __extends = (function () {
    //静态成员继承
    var _extendStatics = (function () {
        //定义4种继承静态属性和方法的函数
        function extendsByForIn(Son, Parent) {
            for (let key in Parent) {
                if (Object.prototype.hasOwnProperty.call(Parent, key)) {
                    Son[key] = Parent[key]
                }
            }
        }

        function extendsByObjectKeys(Son, Parent) {
            Object.keys(Parent).forEach((key) => {
                Son[key] = Parent[key];
            })
        }

        function extendsByProto(Son, Parent) {
            Son.__proto__ = Parent
        }

        function extendsBySetPrototypeOf(Son, Parent) {
            Object.setPrototypeOf(Son, Parent);
        }

        //下面是上面4种方式的综合体
        _extendStatics = function (Son, Parent) {
            _extendStatics = extendsBySetPrototypeOf || extendsByForIn || extendsByObjectKeys || extendsByProto;
            _extendStatics(Son, Parent);
        }
        return _extendStatics;
    }());

    //寄生组合继承
    function _extends(Son, Parent) {
        function Middle() {
            this.constructor = Son;
        }

        Middle.prototype = Parent.prototype;
        return new Middle();
    }

    return function (Son, Parent) {
        //处理静态成员继承
        _extendStatics(Son, Parent);
        //处理实例成员继承
        var middle = null;
        if (Parent === null) {
            middle = Object.create(Parent);
            middle.constructor = Son;
        } else {
            middle = _extends(Son, Parent);
        }
        Son.prototype = middle;
    };
})();

var Car = (function (Vehicle) {
    __extends(Car, Vehicle);

    function Car(vehicleID, vehicleNum, brand, rentDays, type) {
        Vehicle.call(this, vehicleID, vehicleNum, brand, rentDays)
        this.type = type;
    }

    Car.prototype.calDeposit = function () {
        if (this.type === "宋") {
            return 500;
        } else if (this.type === "唐") {
            return 800;
        } else {
            return 300;
        }
    };

    Car.prototype.calViolationCost = function () {
        return this.isViolation() ? 500 : 0;
    };

    Car.prototype.getPricePerDay = function () {
        if (this.type === "宋") {
            return 300;
        } else if (this.type === "唐") {
            return 400;
        } else {
            return 200;
        }
    };

    Car.prototype.isViolation = function () {
        return false;
    };

    return Car;
}(Vehicle));

var car = new Car(1, "鄂A22487", "比亚迪", 10, "唐");
console.log(car);
console.log(Car.color);
Car.showNum();
var cost = car.calTotalCost();
console.log("you need pay: " + cost + " ");
```

**查看手写继承效果：** ![image-20220403181511669](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204031815539.png)

#### 彩蛋:立即执行函数

立即执行函数的两种语法格式：

```js
(function(){})()
(function(){}())
//eg.
(function hello(value) {
    console.log(value)
})(123)

(function hello(value) {
    console.log(value)
}(123))
```



## 深入类型守卫

### 技能大纲

- 【TS类型断言丶转换】  种类繁多的类型断言和多个重要细节+常见转换错误  【真实应用场景】
- 【TS类型断言丶转换】  种类繁多的类型断言和多个重要细节+常见转换错误 【真实应用场景】

- 【TS类型断言丶转换】  种类繁多的类型断言和多个重要细节+常见转换错误 【真实应用场景】

- 【 TS 类型守卫】  类型守卫准备：new 底层发生了什么？

- 【 TS 类型守卫】   运用大厂TS类型守卫晋级考核题熟练掌握TS类型守卫

- 【 TS 类型守卫】  typeof  有何局限性？如何解决？【高频面试题】

- 【 TS 类型守卫】从原理上深层掌握 instanceof 

- 【 TS 类型守卫  结合应用深层掌握 instanceof【真实应用场景】

- 【 TS 多态+类型守卫】 众多语言都有的多态给 TS 类带来了什么好处？前端同面试，说透者加更多分

- 【 TS 抽象类】理解抽象类【 abstract class 】

- 【 TS 自定义守卫】  深刻理解自定义守卫+自定义守卫好处

- 【 TS 自定义守卫】  结合 Vue3 源码提升综合运用自定义守卫的能力【Vue3 源码】

-  【 TS 自定义守卫】  结合 Vue3 源码提升综合运用自定义守卫的能力【Vue3 源码】

- 【 TypeScript4 新特性】  小技巧：const 为何也能被修改？如何解决

- 【 TypeScript4 新特性】  为什么要用可变元组+具体使用

- 【 TypeScript4 新特性】 深入可变元组

### TS类型断言和转换

#### 类型断言定义

把两种能有重叠关系的数据类型进行相互转换的一种 TS 语法，把其中的一种数据类型转换成另外一种数据类型。类型断言和类型转换产生的效果一样，但语法格式不同。

#### 类型断言语法

A 数据类型的变量  as  B 数据类型 。A 数据类型和 B 数据类型必须具有重叠关系。

```typescript
let people = new People()   
let stu = people as Stu      // 类型断言
let stu = <Student>people    // 类型转换
```

#### 类型断言细则

**下面的细则都是通过 class 或 interface 定义类型的，但这些细则也适用于通过 type 或 {} (自动推导) 定义类型的情况。**

1. **如果  A，B 都是类并且有继承关系**

   无论 A，B 谁是父类或子类， A 的对象变量可以断言成 B 类型，B 的对象变量可以断言成A类型 。但注意一般在绝大多数场景下都是把父类的对象变量断言成子类。

   ```typescript
   //断言子类和父类继承
   class People {
       name: string;
       age: number;
   
       constructor(name: string, age: number) {
           this.name = name;
           this.age = age;
       }
   }
   
   class Student extends People {
       stuId: number;
       school: string;
   
       constructor(name: string, age: number, stuId: number, school: string) {
           super(name, age);
           this.stuId = stuId;
           this.school = school;
           this.name = name;
           this.age = age;
       }
   }
   
   let people = new People('张三', 20);
   //类型断言
   let stu = people as Student;
   //类型转换
   let stu2 = <Student>people;
   console.log(stu);
   console.log(stu2);
   ```

2. **如果   A，B 都是类，但没有继承关系**    

   两个类中的任意一个类的所有的 public 实例属性【不包括静态属性】加上所有的 public 实例方法和另一个类的所有 public 实例属性加上所有的 public 实例方法完全相同或是另外一个类的子集，则这两个类可以相互断言，否则这两个类就不能相互断言。

   ```typescript
   //断言子类和父类没有继承
   class People {
       name: string;
       age: number;
   
       constructor(name: string, age: number) {
           this.name = name;
           this.age = age;
       }
   }
   
   class Student {
       stuId: number;
       school: string;
       name: string;
       age: number;
   
       constructor(name: string, age: number, stuId: number, school: string) {
           this.stuId = stuId;
           this.school = school;
           this.name = name;
           this.age = age;
       }
   }
   
   let people = new People('张三', 20);
   //类型断言
   let stu = people as Student;
   //类型转换
   let stu2 = <Student>people;
   ```

3. **如果 A 是类，B 是接口，并且 A 类实现了 B 接口【implements】**，则 A 的对象变量可以断言成 B 接口类型，同样 B 接口类型的对象变量也可以断言成A类型 。

   ```typescript
   //断言实现类和接口继承
   interface People {
       username: string,
       age: number,
       address: string,
       phone: string
   }
   
   class Stu implements People {
       public username!: string
       public age!: number;
       public address!: string// 类型 "Stu" 中缺少属性 "address"，但类型 "typestu2" 中需要该属性。t
       public phone!: string
   
       constructor(username: string, age: number, address: string) {
           this.address = address;
       }
   }
   
   
   let people: People = {username: "wangwu", age: 23, address: "11", phone: "111"}
   let stu1 = people as Stu;
   let stu2 = <Stu>people;
   
   let stu = new Stu("wangwu", 23, "北京")
   let p = stu as People;
   ```

4. **如果 A 是类，B 是接口，并且 A 类没有实现了 B 接口**，则断言关系和第2项的规则完全相同。

   ```typescript
   //断言实现类和接口没有继承
   interface People {
       username: string,
       age: number,
       address: string,
       phone: string
   }
   
   class Stu {
       public username!: string
       public age!: number;
       public address!: string;
       public phone!: string
   
       public hello() {
   
       }
   
       get value() {
           return this.username
       }
   
       set value(newVal) {
           this.username = newVal
       }
   
       constructor(username: string, age: number, address: string) {
           this.address = address;
       }
   }
   
   
   let people: People = {username: "wangwu", age: 23, address: "11", phone: "111"}
   let stu1 = people as Stu;
   let stu2 = <Stu>people;
   //value赋值
   stu1.value = "lisi";
   //value取值
   console.log(stu1.value);
   
   let stu = new Stu("wangwu", 23, "北京")
   let p = stu as People;
   ```

5. **如果 A 是类，B 是 type 定义的数据类型**【就是引用数据类型，例如 Array, 对象，不能是基本数据类型，例如 string，number,boolean】，并且有 A 类实现了 B type 定义的数据类型【 implements】，则 A 的对象变量可以断言成 B type 定义的对象数据类型，同样 B type 定义的对象数据类型的对象变量也可以断言成 A 类型 。

   ```typescript
   //断言实现类和type有继承
   type People = {
       username: string,
       age: number,
       address: string,
       phone: string
   }
   
   class Stu implements People {
       public username!: string
       public age!: number;
       public address!: string;
       public phone!: string;
   
       constructor(username: string, age: number, address: string) {
           this.address = address;
       }
   }
   
   let people: People = {username: "wangwu", age: 23, address: "11", phone: "111"}
   let stu1 = people as Stu;
   let stu2 = <Stu>people;
   let stu = new Stu("wangwu", 23, "北京")
   let p = stu as People;
   ```

6. **如果 A 是类，B 是 type 定义的数据类型，并且 A 类没有实现 B type定义的数据类型**，则断言关系和第2项的规则完全相同。

   ```typescript
   //断言实现类和type没有继承
   type People = {
       username: string,
       age: number,
       address: string,
       phone: string
   }
   
   class Stu {
       public username!: string
       public age!: number;
       public address!: string;
   
       constructor(username: string, age: number, address: string) {
           this.address = address;
       }
   }
   
   
   let people: People = {username: "wangwu", age: 23, address: "11", phone: "111"}
   let stu1 = people as Stu;
   let stu2 = <Stu>people;
   let stu = new Stu("wangwu", 23, "北京")
   let p = stu as People;
   ```

7. **如果 A 是一个函数上参数变量的联合类型**，例如 string |number，那么在函数内部可以断言成 string 或number 类型。

   ```typescript
   //联合类型在函数中的断言
   function selfMutiply(value: string | number) {
       let result = value as number + 3;
       console.log(result);
   }
   
   selfMutiply(1);
   ```

8. **多个类组成的联合类型如何断言？**例如：let vechile: Car | Bus | Trunck。 vechile 可以断言成其中任意一种数据类型。 例如 vechile as Car， vechile as Bus ， vechile as Trunck 。

   ```typescript
   //接前面的汽车租赁案例，新增加一个Cutomer（顾客）类。
   import Car from "./car";
   import Bus from "./bus";
   import Truck from "./truck";
   
   class Customer {
       rentVechile(vechile: Car | Bus | Truck) {
           //类型断言
           return (vechile as Car).calTotalCost();
           //类型转换
           // return (<Car>vechile).calTotalCost();
       }
   }
   
   const customer = new Customer();
   const car = new Car(1, "鄂A22487", "比亚迪", 10, "唐");
   const cost = customer.rentVechile(car);
   console.log(`you need pay: ${cost} `);
   ```

9. **任何数据类型都可以转换成 any 或 unknown 类型**，any 或 unknown 类型也可以转换成任何其他数据类型。

   ```typescript
   function add(one: string | number, two: string | number) {
       return one as any + two as any
   }
   
   console.log(add(3, 5))
   console.log(add("3", 5))
   
   //打印结果：8    35
   ```

#### 类型断言的意义和场景

1. 顾客在执行汽车租赁项目租赁价格计算方法中调用每一个类的独有方法时使用。

2. 对象中的 Symbol 数据类型取值问题。

3. 加法计算，巧用 as any。

### new 底层发生了什么？

1. 创建一个空的Object实例对象；
2. 将Object实例对象的__proto__属性指向构造函数的prototype原型对象空间；
3. 调用构造函数.apply(obj, [...args]) 为空实例对象初始化各个实例成员。

```js
function Person(phone, age) {
    this.age = age;
    this.phone = phone;
    this.showone = function () {
    }
}

Person.prototype.doEat = function () {
    console.log("电话：", this.phone);
}

let person = new Person("13388986989", 23);
// 1.创建一个 Object 对象
var obj = new Object();

// 2.让新创建的对象的 __proto__ 变量指向 Person 原型对象空间
obj.__proto__ = Person.prototype;

// 3.借用Person构造函数中的为 obj 对象变量增加 age 属性和 phone 属性
Person.apply(obj, ["13388986989", 23]);
```

### 类型守卫基本概念

**类型守卫定义：** 在语句的块级作用域【if语句内或条目运算符表达式内】缩小变量的一种类型推断的行为。

**类型守卫产生时机**：TS 条件语句中遇到下列条件关键字时，会在语句的块级作用域内缩小变量的类型，这种类型推断的行为称作类型守卫 ( Type Guard )。类型守卫可以帮助我们在块级作用域中获得更为需要的精确变量类型，从而减少不必要的类型断言。

- 类型判断：`typeof`
- 属性或者方法判断：`in`
- 实例判断：`instanceof`
- 字面量相等判断：`==`, `===`, `!=`, `!==`

### 深入理解typeof

#### typeof 作用

typeof 用来检测一个变量或一个对象的数据类型。

#### ypeof 检测的范围

typeof 检测变量的类型范围包括：  “string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" 等数据类型。

#### **typeof 的局限性**

typeof 检测变量并不完全准确。

1. typeof null 结果为 object，这其实设计者的一个 bug， 但后来一直没有被改过来，于是就此传下来了，但把 null 当成 object 的理由说成是 未来可能会拥有一个对象空间，这个理由很牵强（我们检测的是对象变量此刻的类型），null 本来即是数据类型，也是值。所以 typeof null 直接显示 null 最合适了。 

2. 使用 typeof 来检测一个数组变量，typeof [ ]  结果显示的是 object,  从 Array 创建的本质上来说确实是 object，正如我们在 2-29-1中所讲，但开发者期待看到的是 Array，这更符合预期。 Array 和我们定义的普通函数一样，具有双重性，当成函数类型时用来创建数组对象，但也是一个构造函数对象，拥有静态成员和prototype原型对象属性。

3. 使用 typeof 来检测一个 Set 变量，Map 变量，结果显示的是依然是 object。

#### typeof 的替代方案

Object.prototype.toString.call 

Object.prototype.toString.call ([ ]) 展示[ object Array ]  

Object.prototype.toString.call(null) 展示[ object null ] 

Object.prototype.toString.call(Set类型的变量)  展示[ object Set ]

Object.prototype.toString.call(Map类型的变量)  展示[ object Map ] 

#### 替代方案无法解决的问题

即使是使用typeof替代方案，也依然无法获取一个自定义的类的实例变量或构造函数的对象变量的真正创建类型，答案是使用 instanceof 来解决。

### 深入理解instanceof

**instanceof 格式**： 对象变量 instanceof  类名或函数名

**instanceof 的主要作用：** instanceof 帮助我们准确的判断一种自定义函数或类创建的对象变量的数据类型。

**instanceof 的判断依据：**

1. 对象变量.__proto__=类名或函数名.prototype。

   解释1：如果 instanceof  关键字 左边对象变量的 __proto__ 属性指向的原型对象空间=右边类名或函数名的 prototype 对象属性指向的原型对象空间，那么 返回 true。

2. 对象变量.__proto__.__proto__...._proto__=类名或函数名.prototype。__

   解释2： instanceof 左边对象变量 __proto__的1到多个上一级__proto__指向的原型对象空间，等于右边类名或函数名的 prototype 对象属性指向的原型对象空间，那么也返回 true，按照这个查找规律，会一直找到Object.prototype 对象属性指向的原型对象空间为止。

### 类型守卫应用场景

#### instanceof应用场景

```typescript
// 需求1:汽车租赁功能实现: 有小轿车,大巴,卡车三种类型的车,顾客可以租任意一种或多种不同类型的车,按照租用的天计算租金， 
// 同时为了响应国家对各类车安全的管理, 对在租赁期内有过各种超载，超乘客数，酒后驾车等违规的车需额外支付一定的费用。
// 需求2:计算退回费用：最终退回顾客的费用为押金扣除使用天数，如押金不足需额外支付不足部分。

// 思考小轿车,大巴,卡车共同属性: 品牌 brand 车牌号 vechileNo 租赁天数 days 支付的租赁总费用 total  押金 deposit
// 思考小轿车,大巴,卡车共同方法: 计算租赁车的价格 calculateRent 支付押金的方法 payDesposit 安全检测方法 safeShow

class Vechile {
  static count: number = 3;
  public brand: string;// 品牌
  public vechileNo: string;// 车牌号
  public days: number;// 租赁天数
  public total: number = 0;// 支付的租赁总费用
  public deposit: number;// 押金
  constructor(brand_: string, vechileNo_: string, days_: number, deposit_: number) {
    this.brand = brand_;
    this.vechileNo = vechileNo_;
    this.days = days_;
    this.deposit = deposit_;
    console.log("constructor Vechile=>this.brand:", this.brand)
  }
  // 计算租赁车的价格 ( calculateRent)
  public calculateRent() {
    console.log("calculateRent来自Vechile=>this.brand:", this.brand)
    console.log(this.brand + " 车牌号为:" + this.vechileNo + "开始被租");
    return 0;
  }
  //支付押金的方法( payDesposit)
  payDesposit() {
    console.log(this.brand + " 车牌号为:" + this.vechileNo + " 支付了:" + this.deposit);
  }

  //  安全检测方法（safeShow)
  public safeShow() {
    console.log("车规则....");
    console.log(this.brand + " 车牌号为:" + this.vechileNo + " 违规了:");
  }

}

// 子类Car类 独有属性为type_ 
class Car extends Vechile {
  // public brand: string = "nobrand"
  public type: string;//车的型号
  constructor(brand_: string, vechileNo_: string, days_: number,
    deposit_: number, type_: string) {
    //  Vechile.call(this,brand_, vechileNo_, days_, total_, deposit_)
    super(brand_, vechileNo_, days_, deposit_);
    this.type = type_;

  }
  // 根据车的型号来获取租用一天该型号车的租金
  public getPriceByType() {
    let rentMoneyByDay: number = 0;//每天的租金
    if (this.type === "普拉多巡洋舰") {
      rentMoneyByDay = 800;
    } else if (this.type === "凯美瑞旗舰版") {
      rentMoneyByDay = 400;
    } else if (this.type === "威驰智行版") {
      rentMoneyByDay = 200;
    }
    return rentMoneyByDay;
  }

  public calculateRent() {
    super.calculateRent();
    console.log("Car:", Car.count)
    console.log("this.brand:", this.brand)
    this.total += this.days * this.getPriceByType();
    return this.total;
  }
  public checkIsWeigui(isOverWeight: boolean) {
    if (isOverWeight) {
      this.total += this.total + 500;
    }
  }
}

class Bus extends Vechile {
  public seatNum: number // 座位数
  constructor(brand_: string, vechileNo_: string, days_: number,
    deposit_: number, seatNum_: number) {
    //  Vechile.call(this,brand_, vechileNo_, days_, total_, deposit_)
    super(brand_, vechileNo_, days_, deposit_);//使用父类的构造函数的好处
    this.seatNum = seatNum_;
    if (this.seatNum > 200) {
      throw new Error("座位数不能超过200");
    }
  }

  public getPriceBySeatNum() { //计算租赁价格
    let rentMoneyByDay: number = 0;//每天的租金
    if (this.seatNum <= 16) {
      rentMoneyByDay = 800;
    } else if (this.seatNum > 16) {
      rentMoneyByDay = 1600;
    }
    return rentMoneyByDay;
  }
  public calculateRent() {

    super.calculateRent();
    this.total += this.days * this.getPriceBySeatNum();
    return this.total;
  }

  public checkIsOverNum(isOverWeight: boolean) {
    if (isOverWeight) {
      this.total = this.total + 2000;
    }
  }
}

class Truck extends Vechile {
  ton!: number // 座位数
  constructor(brand_: string, type_: string,
    days_: number, deposit_: number, ton_: number) {
    super(brand_, type_, days_, deposit_);
    this.ton = ton_;
    if (this.ton < 300 || this.ton > 2000) {
      throw new Error("吨数在300-2000吨之间");
    }
  }

  checkIsOverWeight(isOverWeight: boolean) {
    if (isOverWeight) {
      console.log("超载了");
      this.total = this.total + 2000;
    }
  }
  CalRentPrice() {//计算租赁价格
    let rentMoneyByDay: number = 0;//每天的租金
    if (this.ton <= 500) {//500吨
      rentMoneyByDay = 750;
    } else if (this.ton > 500) {
      rentMoneyByDay = 1350;
    }
    return rentMoneyByDay;
  }
  public calRent() {
    return this.CalRentPrice() * this.days;
  }

  public calDesposit() {
    return this.deposit;

  }
}

class Customer {

  rentVechile(vechile: Bus | Truck | Car) {
    if (vechile instanceof Car) {
      vechile.checkIsWeigui(true);
    } else if (vechile instanceof Bus) {
      vechile.checkIsOverNum(true);
    } else if (vechile instanceof Truck) {
      vechile.checkIsOverWeight(true)
    }
    return vechile.calculateRent();
  }
}

let car = new Car("普拉多", "京3A556", 3, 100000, "凯美瑞旗舰版")
let cust = new Customer();
console.log("顾客最后的租金是:", cust.rentVechile(car));
// if (car instanceof Car) {
//   console.log("car是一个Car类的实例对象变量");
// }
// if (car instanceof Vechile) {
//   console.log("car是一个Vechile类的实例对象变量");
// }

// if (car instanceof Object) {
//   console.log("car是一个Object类的实例对象变量");
// }
// if (car instanceof Bus) {
//   console.log("car是一个Bus类的实例对象变量");
// }
//let cust = new Customer();
//let total = cust.rentVechile(new Car("普拉多", "京3A556", 3, 100000, "凯美瑞旗舰版"))


export { }
```

#### 综合应用场景

```typescript
//  大厂TS类型守卫晋级考核题【综合题】:
//  请编写一个操作对象方法和属性的函数实现以下功能
//   1. 当对象字符串属性有空格时就去掉空格后输出.
//   2. 当遇到对象方法时就执行,其他数据类型的属性一律直接输出
//   3.只有对象中包含allowoutput属性时,才允许输出。
//   4. 函数接收到外部传入的null,undefined,{}时，直接输出不是一个合法的对象。
//  考核点：1. 考核对类型守卫的熟练运用程度 2.静态方法
interface TestInter {
    username: string,
    age: number,
    eat(): void,
    allowinput?: 1
}

class StringUtil {//工具类
    public static trimSpace(str: string): string {
        return str.replace(/\s+/g, "")
    }
}

let testobj: TestInter = {
    username: " wan  g wu",
    age: 23,
    eat() {
        console.log(StringUtil.trimSpace(this.username) + " 吃饭")
    },
    allowinput: 1
}

function processObjOutput(obj: any) {
    // 判断allowinput属性或者方法在ojb对象中是否存在
    if (obj && "allowinput" in obj) {
        let value;
        Object.keys(obj).forEach((key) => {
            value = obj[key];
            //把变量的范围缩小为string类型在语句块内使用该数据类型
            if (typeof value === "string") {
                console.log(key + ":", StringUtil.trimSpace(value));
            } else if (typeof value === "function") {
                obj[key]();
            } else {
                console.log(key + ":", +value)
            }
        })
    } else {
        console.log("不是一个合法的对象。")
    }
}

processObjOutput(testobj)

export {}
```

![image-20220409100851551](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204091010063.png)

### TS中的多态

#### 多态的定义

父类的对象变量可以接受任何一个子类的对象 ，从而用这个父类的对象变量来调用子类中重写的方法而输出不同的结果。

#### 产生多态的条件

1. 必须存在继承关系；

2. 必须有方法重写。

#### 多态的好处

利于项目的扩展，从局部满足了 开闭原则--对修改关闭,对扩展开放。

#### 多态的局限性

无法直接调用子类独有方法，必须结合instanceof类型守卫来解决。

#### 应用举例

1. 多态简单示例

   ```typescript
   //简单的使用多态的例子
   class People {
       eat() {
       }
   }
   
   class AmericaPeople extends People {
       eat() {
           console.log("美国人用刀叉吃饭")
       }
   }
   
   class ChinesePeople extends People {
       eat() {
           console.log("中国人用筷子吃饭")
       }
   }
   
   let p1: People = new AmericaPeople();
   let p2: People = new ChinesePeople();
   
   p1.eat();
   p2.eat();
   
   //输出结果：
   //美国人用刀叉吃饭
   //中国人用筷子吃饭
   ```

2. 使用多态增加可扩展性示例。

   还是汽车租赁系统为例，原来有一段代码是这样的。对比一下，使用多态的好处是方便扩展。例如，后面又增加了一种车型“大货车”，则rentVehicle方法不用修改。

   ```typescript
   //使用联合类型
   class Customer {
   
       rentVechile(vechile: Car | Bus | Truck) {
           return vechile.calculateRent();
       }
   }
   
   //使用多态
   class Customer {
   
       rentVechile(vechile: Vechile) {
           return vechile.calculateRent();
       }
   }
   ```

   

### TS中的抽象类

#### 抽象类的定义

一个在任何位置都不能被实例化的类就是一个抽象类【abstract class 】。

什么样的类可以被定义为抽象类？

从宏观上来说，任何一个实例化后毫无意义的类都可以被定义为抽象类。 比如：我们实例化一个玫瑰花类的对象变量，可以得到一个具体的 玫瑰花实例对象，但如果我们实例化一个  Flower  类的对象变量，那世界上有一个叫 花 的对象吗？很明显没有，所以 Flower 类 可以定义为一个抽象类，但玫瑰花可以定义为具体的类。

#### 抽象类的特点

单纯从类的定义上来看和普通类没有区别，只是多了可以有 0 到多个抽象方法这一条，并且不能被实例化（只能通过子类来实例化）。

1. abstract class 类名{   }
2. 可以有 0 到多个抽象方法（只有方法声明没有方法实现的方法）；
3. 可以有 0 到多个具体方法；
4. 可以有构造器；
5. 可以有 0 到多个实例属性，0 到多个静态属性，0 到多个静态方法。   

#### 抽象的好处 

1. 提供统一名称的抽象方法，提高代码的可维护性。抽象类通常用来充当父类，当抽象类把一个方法定义为抽象方法，那么会强制在所有子类中实现它，防止不同子类的同功能的方法命名不相同，从而降低项目维护成本。

2. 防止实例化一个实例化后毫无意义的类。

#### 抽象类应用举例

1. 简单示例

   ```typescript
   //People是一个抽象类
   abstract class People {
       public name!: string;
       public age!: number;
   
       constructor() {
       }
   		//抽象方法，只有方法签名，没有方法实现
       public abstract eat(): void;
   }
   
   class ChinesePeople extends People {
   
       constructor(name: string, age: number) {
           super();
           this.name = name;
           this.age = age;
       }
   
       eat(): void {
           console.log(`${this.name}是中国人，今年${this.age}岁，用筷子吃饭！`)
       }
   }
   
   class AmericanPeople extends People {
   
       constructor(name: string, age: number) {
           super();
           this.name = name;
           this.age = age;
       }
   
       eat(): void {
           console.log(`${this.name} is American，he is ${this.age} yeas old now，and he is eat with fork！`)
       }
   }
   
   let p1: People = new ChinesePeople("张三", 20);
   let p2: People = new AmericanPeople("Tom", 22);
   p1.eat();
   p2.eat();
   
   export {}
   ```

   输出结果：

   ![image-20220411211805408](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204112118701.png)

2. 接口+抽象类+实现类综合示例

   当一个接口中包含很多抽象方法但常用的却并不多时，可以创建一个抽象类实现这个接口，然后将常用的方法定义为抽象方法，不常用的使用空实现，最后具体类继承这个抽象类，而不是直接去实现接口。

   ```typescript
   interface MouseListener {
       //常用
       mouseClicked(e: any): void     //鼠标按键在组件上单击（按下并释放）时调用。
       mouseExited(e: any): void      //鼠标离开组件时调用。
   
       //不常用
       mouseReleased(e: any): void    //鼠标按钮在组件上释放时调用。
       mousePressed(e: any): void     //鼠标按键在组件上按下时调用。
       mouseEntered(e: any): void     //鼠标进入到组件上时调用。
   }
   
   //抽象类实现接口
   abstract class BaseMouseListener implements MouseListener {
       mouseReleased(e: any): void {
       }
       mousePressed(e: any): void {
       }
       mouseEntered(e: any): void {
       }
       abstract mouseClicked(e: any): void;
   
       abstract mouseExited(e: any): void;
   }
   
   //具体类继承抽象类
   class MyMouseListener extends BaseMouseListener {
       mouseClicked(e: any): void {
           console.log("鼠标点击了！");
       }
   
       mouseExited(e: any): void {
           console.log("鼠标离开了！");
       }
   }
   ```

   

### 自定义类型守卫

#### 语法格式

```js
function  函数名( 形参：参数类型【参数类型大多为any】)  : 形参 is A类型 =boolean+类型守卫能力{

	return  true or false

}

//eg
function isString(value: any): value is string {
  return typeof value === "string"
}

function isFunction(value: any): value is Function {
  return typeof value === "function"
}
```

理解：返回布尔值的条件表达式赋予类型守卫的能力， 只有当函数返回 true 时，形参被确定为 A 类型

#### 应用举例

1. 宠物实例

   ```typescript
   interface Bird {
       fly(): void
   
       layEggs(): void
   }
   
   interface Fish {
       swim(): void
   
       layEggs(): void
   }
   
   function getSmallPet(): Fish | Bird {
       let pet: Fish | Bird;
       if (new Date().getTime() % 2 === 0) {
           pet = {
               fly: () => {},
               layEggs: () => {},
           }
       } else {
           pet = {
               swim: () => {},
               layEggs: () => {},
           }
       }
       return pet;
   }
   
   let pet = getSmallPet()
   // pet.layEggs() // ok
   // pet.swim()    // error
   
   //不使用自定义守卫
   if ((pet as Fish).swim) {
       // pet.swim()           // error
       (pet as Fish).swim()    //ok
   } else {
       (pet as Bird).fly()
   }
   
   //--------------------------------------------------------------------------------------
   //使用自定义守卫
   if (isFish(pet)) {
       pet.swim()
   } else {
       pet.fly();
   }
   
   //形参类型用any也可以
   function isFish(pet: Fish | Bird): pet is Fish { 
       return (pet as Fish).swim !== undefined
   }
   ```

2. Vue3源码实例

   ```typescript
   //==自定义守卫
   //  1.定义
   //   1.1 自定义守卫是通过 {形参 is 类型} 返回布尔值的赋予类型守卫的能力的条件表达式
   //   1.2 形参 is 类型中的类型可以是:
   //        接口  类  基础类型数据(string,number,boolean,null, undefined,void,symbol)
   
   //  2.Vue3源码中使用自定义守卫的场景:isRef中的自定义守卫
   //      r is Ref  中r是形参  is是关键字,固定不变  Ref是一种数据类型
   
   //  3.自定义守卫理解:
   //    3.1 如果unref方法中调用的if语句或条件运算符中的isRef(ref)方法返回true 
   //    那么if语句块或条件运算符:号后面的ref就被编译器解析为Ref类型的变量
   //       
   //    3.2 r is Ref 会 对r变量进行守卫【把类型的范围缩小 这里的r被缩小为Ref类型] 
   
   //export interface Ref<T = any> {// 泛型先不用管
   export interface Ref {
     value: any,
     // key为Symbol的属性做类型标识
     [RefSymbol]: true
     _shallow?: boolean
   }
   
   export function isRef(r: any): r is Ref {// r is Ref 效果等同于boolean
     return Boolean(r && r.__v_isRef === true)
   }
   
   // 没有用泛型的unref,泛型大家先不用管,接下来几章我们会非常详细的讲解
   export function unref(ref: unknown) {
     if (isRef(ref)) {
       return ref.value
     } else {
       return ref;
     }
     //return isRef(ref) ? (ref.value as any) : ref
   }
   ```

   

### TS4新特性

#### const数组+readonly

小技巧：const 为何也能被修改？如何解决？

```typescript
//const arr=[10,30,40,"abc"]
//arr=[100,30,40,"abc"]
//arr虽然是const，但是arr中的元素仍然可以被修改
//arr[0]=100

const arr = [10, 30, 40, "abc"] as const
// arr = [100, 30, 40, "abc"]   //TS2588: Cannot assign to 'arr' because it is a constant.
// arr[0] = 100; //TS2540: Cannot assign to '0' because it is a read-only property.

function showArr(arr: readonly any[]) {//类型“readonly any[]”中的索引签名仅允许读取。
    console.log(arr)
}

showArr(arr)
```

#### 可变元祖+元组标签

```typescript
// 普通元组
// let [username, age]: [string, number,string,string,string] = ["wangwu", 23, "海口海淀岛四东路3号", "133123333", "一路同行,一起飞"];

// 可变元组
// let [username, age]: [string, number, ...any[]] = ["wangwu", 23, "海口海淀岛四东路3号", "133123333", "一路同行,一起飞",23,"df"]

// 可变元组+rest
// let [username, age, ...rest]: [string, number, ...any[]] = ["wangwu", 23, "海口海淀岛四东路3号", "133123333", "一路同行,一起飞", 23, "df"]

// 元组标签
let [username, age, ...rest]: [name_: string, age_: number, ...rest: any[]] = ["wangwu", 23, "海口海淀岛四东路3号", "133123333", "一路同行,一起飞", 23, "df"]

console.log("username:", username)
console.log("age:", age)
console.log("rest:", rest)
```

#### 深入可变元组

```typescript
// const array: (string | number)[] = [10, 30, 40, "abc", 30] as const    //错误
// 类型 "readonly [10, 30, 40, "abc", 30]" 为 "readonly"，不能分配给可变类型 "(string | number)[]"
const array: readonly (string | number)[] = [10, 30, 40, "abc", 30] as const  //正确

let [x, ...y] = [10, 30, 40, 60, "abc"]
console.log("x:", x)
console.log("y:", y)

let constnum = [10, 30, 40, 60, "abc"]
let [x1, ...y1] = constnum
console.log("x1:", x1)
console.log("y1:", y1)

//下面的元组默认类型推断每个元素类型就是 string | number
let constnum2 = [10, 30, 40, 60, "abc"]
let [x2, ...y2]: (string | number)[] = constnum2
console.log("x2:", x2)
console.log("y2:", y2)

// let constnum2 = [10, 30, 40, 60, "abc"]
// //错误:不能将类型“(string | number)[]”分配给类型“[number, ...any[]]”。
// let [x2, ...y2]: [number, ...any[]] = constnum2// 错误
// console.log("x2:", x2)
// console.log("y2:", y2)

// let constnum2 = ["df", 30, 40, 60, "abc"]
// //  把元组退化成"数组"
// let [x2, ...y2]: [...any[]] = constnum2   //正确
// console.log("x2:", x2)
// console.log("y2:", y2)

let constnum3 = [10, 30, 40, 60, "abc"] as const
//  把元组退化成"数组"。注意由于constnum3声明时使用了as const，故下面接收时类型需要使用readonly来接收。
let [x3, ...y3]: readonly [any, ...any[]] = constnum3 //正确
console.log("x3:", x3)
console.log("y3:", y3)

let constnum4 = [10, 30, 40, 60, "abc"] as const
//  把元组退化成"数组"
let arr: readonly [any, ...any[]] = constnum4

//arr[0] = 100 //readonly 和 as const 都是表示固定不变的，包括数组和元组中每一个元素都不能改变
// readonly等效于as const
function tail1(arr: readonly [any, ...any[]]) {
    //arr[0] = 33
    let [first, ...rest] = arr;
    let array = arr;
}

function tail2(arr: readonly (string | number)[]) {
    //arr[0] = 33
    let [first, ...rest] = arr;
    let array = arr;
}

let constnum5 = [10, 30, 40, 60, "abc"] as const
tail1(constnum5);
tail2(constnum5);
```



# 第3章：深入掌握TS泛型

## TS 泛型的重要性

1. Vue3 源码充斥着大量的 TS 泛型。懂 TS 泛型是读懂 Vue3 源码不可逾越的环节。
2. 前端各种技术的声明文件【 d.ts 文件】 TS 泛型更是随处可见【例如：小到一个 Array，ES6 的 Set，Map，稍微复杂点的例如：Vue3应用的声明文件，Vuex 底层的声明文件，React 组件声明文件，axios 声明文件，这样的例子举不胜举。】
3. 现在采用 TS 整合前端框架的大中项目越来越多，而 TS 泛型必然成了你必须攻克的核心技能。如果你近几年在公司做过稍微大点的项目，你的感触会特别深刻。
4. 后端 Nodejs 和 TS 整合的频次也越来越高，优秀的 Nestjs 框架 就完全采用 TS 开发。
5. TS 语法是晋级高级前端工程师，拿更高薪水，面试加分不可逾越的学习环节，而泛型语法更是重重之重，一句我能熟练解说 Vue3 源码中的 TypeScript 语法 会为你的面试加分许多。



## 使用泛型的好处

1. 编译期对类上调用方法或属性时的泛型类型进行安全检查(类型安全检查)，不符合泛型实际参数类型(泛型实参类型) 就编译通不过，防止不符合条件的数据增加进来。

2. 一种泛型类型被具体化成某种数据类型后，该数据类型的变量获取属性和方法时会有自动提示，这无疑提高代码开发效率和减少出错率。	



## TS泛型重构ArrayList

1. 重构前的ArrayList

   ```typescript
   /**
    * 把Array数组改写重构提升为Java简易版的ArrayList
    * 1.对现有的数组进行封装，让数组增删改变得更加好用
    * 2.提供 add、remove、get 等方法，其中需求中的remove方法有两个，我们用方法重载来实现
    */
   
   class ArrayList {
       public element: Array<object>
       public index: number = 0;
   
       constructor() {
           this.element = [];
       }
   
       public add(ele: object) {
           this.checkIndex();
           this.element[this.index++] = ele;
       }
   
       public checkIndex() {
           if (this.index < 0) {
               throw new Error("数组下标不能为零");
           }
       }
   
       get(index: number): object {
           return this.element[index]
       }
   
       show() {
           this.element.forEach((ele) => {
               console.log(ele);
           })
       }
   
       remove(value: number): number
       remove(value: object): object
       remove(value: any): any {
           this.element = this.element.filter((ele, index) => {
               //如果是根据数字【元素索引】去删除元素，remove方法返回的是一个数字
               if (typeof value === "number") {
                   return value !== index
               } else {
                   // 如果是根据对象去删除元素，remove方法返回的是一个对象
                   return value !== ele
               }
           })
           return value;
       }
   
   }
   
   
   function test() {
       let stuOne = {stuname: "wnagwu", age: 23}
       let stuTwo = {stuname: "lisi", age: 39}
       let stuThree = {stuname: "liuqi", age: 31}
   
       //let arrayList = new ArrayList([stuOne, stuTwo, stuThree]);
       let arrayList = new ArrayList();
       arrayList.add(stuOne);
       arrayList.add(stuTwo);
       arrayList.add(stuThree);
   
       console.log("index为1的元素是：", arrayList.get(1));
   
       arrayList.show();
   }
   
   test();
   
   export {}
   ```
   ![image-20220420083530763](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204200853105.png)

2. 重构后的ArrayList

   ```typescript
   /**
    * 把Array数组改写重构提升为Java简易版的ArrayList
    * 1.对现有的数组进行封装，让数组增删改变得更加好用
    * 2.提供 add、remove、get 等方法，其中需求中的remove方法有两个，我们用方法重载来实现
    */
   
   class ArrayList<T> {
       public element: Array<T>
       public index: number = 0;
   
       constructor() {
           this.element = [];
       }
   
       public add(ele: T) {
           this.checkIndex();
           this.element[this.index++] = ele;
       }
   
       public checkIndex() {
           if (this.index < 0) {
               throw new Error("数组下标不能为零");
           }
       }
   
       get(index: number): T {
           return this.element[index]
       }
   
       show() {
           this.element.forEach((ele) => {
               console.log(ele);
           })
       }
   
       remove(value: number): number
       remove(value: object): object
       remove(value: any): any {
           this.element = this.element.filter((ele, index) => {
               //如果是根据数字【元素索引】去删除元素，remove方法返回的是一个数字
               if (typeof value === "number") {
                   return value !== index
               } else {
                   // 如果是根据对象去删除元素，remove方法返回的是一个对象
                   return value !== ele
               }
           })
           return value;
       }
   
   }
   
   
   function test() {
       type stuType = { stuname: string, age: number, address: string }
       let stuOne: stuType = {stuname: "wnagwu", age: 23, address: "beijing"}
       let stuTwo: stuType = {stuname: "lisi", age: 39, address: "shanghai"}
       let stuThree: stuType = {stuname: "liuqi", age: 31, address: "nanjing"}
   
       //1.添加一个对象(object)类型数据
       let arrayList = new ArrayList();
       arrayList.add({"username": "wangwu", "age": 23})
       console.log(arrayList.get(0));
       console.log('-------------------------------------------')
   
       //2.添加一个number类型数据
       let arrayList2 = new ArrayList();
       arrayList2.add(3)
       console.log(arrayList2.get(0));
       console.log('-------------------------------------------')
   
       //3.添加一个自定义类型数据
       //如果stuOne没有显示指定type类型，在泛型中也可以使用 <typeOf stuOne>来推导出来
       // let arrayList3 = new ArrayList<typeof stuOne>();
       let arrayList3 = new ArrayList<stuType>();
       arrayList3.add(stuOne)
       arrayList3.add(stuTwo)
       arrayList3.add(stuThree)
       console.log(arrayList3.get(0));
       console.log('-------------------------------------------')
   
       let arrayList5 = new ArrayList();//泛型如果在使用时没有具体化的类型,那么就会默认为unknown数据类型
       arrayList5.add(3);
       arrayList5.add("abc");
       arrayList5.add(stuOne);
       console.log(arrayList5.get(0));
       let stuObj2 = arrayList5.get(2);
       // stuObj2.stuname; //类型“unknown”上不存在属性“stuname”。
   }
   
   test();
   
   export {}
   ```

   ![image-20220420085407938](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204200854899.png)

3. TS泛型重构前与重构后相比，重构后的ArrayList更加灵活，可以作为任何数据类型的容器。



## TS泛型的精准定义

**泛型一种参数化数据类型，具有以下特点的数据类型叫泛型 ：**

**特点一**：定义时不明确使用时必须明确成某种具体数据类型的数据类型。【泛型的宽泛】

**特点二**：编译期间进行数据类型安全检查的数据类型。【泛型的严谨】

**特别注意:** 

1. 类型安全检查发生在编译期间    
2. 泛型是参数化的数据类型， 使用时明确化后的数据类型就是参数的值



## 泛型类的格式

```typescript
class 类名<泛型形参类型> 
//泛型形参类型一般有两种表示: 1. A-Z 任何一个字母 2. 语义化的单词来表示，绝大多数情况，泛型都是采用第一种形式表示，如下:	
class ArrayList<T>{  
  array: Array<T>
  add(data:T){}
  get(index:number):T{}
}
```



## 泛型类的默认值和any化

> 泛型的any化实际上就是泛型的默认值的一种特殊形式。

```typescript
/**
 * 把Array数组改写重构提升为Java简易版的ArrayList
 * 1.对现有的数组进行封装，让数组增删改变得更加好用
 * 2.提供 add、remove、get 等方法，其中需求中的remove方法有两个，我们用方法重载来实现
 * 泛型默认值：T={} 表示如果使用时不指明具体类型，则默认就是{}类型，但是实践发现非{}类型的数据仍然可以添加进去。
 *           但是如果使用具体的number、string、object等类型时，与之不匹配的元素就完全不能添加进去了，编译时
 *           就会报错。{}可能是一个特殊情况。
 * 泛型any化：T=any 实际上是泛型默认值的一种特殊形式，只不过它的默认值是any。
 */

class ArrayList<T = {}> {
    public element: Array<T>
    public index: number = 0;

    constructor() {
        this.element = [];
    }

    public add(ele: T) {
        this.checkIndex();
        this.element[this.index++] = ele;
    }

    public checkIndex() {
        if (this.index < 0) {
            throw new Error("数组下标不能为零");
        }
    }

    get(index: number): T {
        return this.element[index]
    }

    show() {
        this.element.forEach((ele) => {
            console.log(ele);
        })
    }

    remove(value: number): number
    remove(value: object): object
    remove(value: any): any {
        this.element = this.element.filter((ele, index) => {
            //如果是根据数字【元素索引】去删除元素，remove方法返回的是一个数字
            if (typeof value === "number") {
                return value !== index
            } else {
                // 如果是根据对象去删除元素，remove方法返回的是一个对象
                return value !== ele
            }
        })
        return value;
    }

}


function test() {
    type stuType = { stuname: string, age: number, address: string }
    let stuOne: stuType = {stuname: "wnagwu", age: 23, address: "beijing"}
    let stuTwo: stuType = {stuname: "lisi", age: 39, address: "shanghai"}
    let stuThree: stuType = {stuname: "liuqi", age: 31, address: "nanjing"}

    //1.添加一个对象(object)类型数据
    let arrayList = new ArrayList();
    arrayList.add({"username": "wangwu", "age": 23})
    console.log(arrayList.get(0));
    console.log('-------------------------------------------')

    //2.添加一个number类型数据
    let arrayList2 = new ArrayList();
    arrayList2.add(3)
    console.log(arrayList2.get(0));
    console.log('-------------------------------------------')

    //3.添加一个自定义类型数据
    //如果stuOne没有显示指定type类型，在泛型中也可以使用 <typeOf stuOne>来推导出来
    // let arrayList3 = new ArrayList<typeof stuOne>();
    let arrayList3 = new ArrayList<stuType>();
    arrayList3.add(stuOne)
    arrayList3.add(stuTwo)
    arrayList3.add(stuThree)
    console.log(arrayList3.get(0));
    console.log('-------------------------------------------')

    let arrayList5 = new ArrayList();//泛型如果在使用时没有具体化的类型,那么就会默认为unknown数据类型
    arrayList5.add(3);
    arrayList5.add("abc");
    arrayList5.add(stuOne);
    console.log(arrayList5.get(0));
    let stuObj2 = arrayList5.get(2);
    // stuObj2.stuname; //类型“unknown”上不存在属性“stuname”。
}

test();

export {}
```

1. **泛型T没有默认值时，元素类型为unknown**

   ![image-20220420092919661](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204200929471.png)

2. **泛型T默认值为{ }时，元素类型推导为{ }**

   ![image-20220420093142604](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204200931452.png)

3. **泛型T默认值为any时，元素类型推导为any**

   ![image-20220420093544719](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204200935429.png)



## 泛型与object、any

### object 不能替代泛型

1. **编译期间 object 无法进行类型安全检查，而泛型在编译期间可以进行类型安全检查**

   object 能接受所有的 object 类型的变量，比如有 Customer、Student、Dog 类的实例都是对象类型，(我们自定义的class类的实例对象，本质上也都是object类型的)，都可以传递给 object。但如果我们只希望添加Customer类的对象，当添加其他类的对象必须出现编译错误，则 object 无法做到，那就只能用泛型了。

2. **object 类型数据无法接受非 object 类型的变量，只能接受 object 类型的变量，泛型能轻松做到**

   正因为 object 只能接受所有的 object 类型的变量，那么如果有一个集合类[数组封装类]有一个 add 方法，允许每次添加指定类型的变量到 add 方法的参数，比如：我们第一轮的希望添加 10 次字符串类型的变量，第二轮的希望添加 10 次整数类型变量，第三轮的希望添加 10 次顾客类型的变量，泛型轻松做到。object 类型数据无法接受任意非 object 类型的变量，object 只能接受所有的 object 类型的变量。

3. **object 类型数据获取属性和方法时无自动提示，泛型有自动提示**

   一种泛型类型被具体化成某种数据类型后，该数据类型的变量获取属性和方法时会有自动提示，提高代码开发效率和减少出错率，但在 object 类型的变量无法获取数据类型的属性和方法，降低了体验感和开发效率。

### any 不能替代泛型

1. **编译期间 any 无法进行类型安全检查，而泛型在编译期间可以进行类型安全检查**
   我们学过: any 是所有类型的父类，也是所有类型的子类如果我们现在是一个宠物店类，希望只能添加 Dog 类，当调用 add 方法添加 Customer、Student 类必定出现编译错误，从而保证了类型安全检查，但是 any 类型无法保证类型安全检查，可以为任意类型，包括 string，number，boolean，null，undefined，never，void，unknown 基础数据类型和数组，类，接口类型， type 类型的变量全部能接受，不会进行无法进行类型安全检查。

2. **any 类型可以获取任意数据类型的任何属性和任意方法而不会出现编译错误导致潜在错误风险，而泛型却有效的避免了此类问题发生**
   any 类型可以获取任何属性和任意方法而不会出现编译错误，因为any可以代表任意数据类型来获取任意属性和任意方法，但是泛型类型被具体化成某种数据类型后，该数据类型的变量调用该数据类型之外的属性和方法时，出现编译错误，这也减少了代码隐藏潜在错误的风险。

3. **any 类型数据获取属性和方法时无自动提示，泛型有自动提示**

> any 类型可以代表任意数据类型来获取任何属性和任意方法而不会出现编译错误，但这个特性是一把双刃剑，当我们需要这么使用，它给我们带来方便，但是大多数情况下我们是不需要这么做的。

### 美团分页器泛型实例

需求描述：模拟从后端获取食物数据、顾客数据，然后将获取的数据分页显示。要求可以控制显示的页数、每页显示的数量等。

![image-20220421104322908](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204211043627.png)

1. **ArrayList工具类**

```typescript
//ArrayList工具类
class ArrayList<T = {}> {
    public element: Array<T>
    public length: number = 0;

    constructor()
    constructor(element: Array<T>)
    constructor(element: Array<T> = []) {
        this.element = element;
        this.length = element.length;
    }

    public add(ele: T) {
        this.checklength();
        this.element[this.length++] = ele;
    }

    public checklength() {
        if (this.length < 0) {
            throw new Error("数组长度不能小于零");
        }
    }

    get(index: number): T {
        return this.element[index]
    }

    show() {
        this.element.forEach((ele) => {
            console.log(ele);
        })
    }

    remove(value: number): number
    remove(value: object): object
    remove(value: any): any {
        this.element = this.element.filter((ele, index) => {
            //如果是根据数字【元素索引】去删除元素，remove方法返回的是一个数字
            if (typeof value === "number") {
                return value !== index
            } else {
                // 如果是根据对象去删除元素，remove方法返回的是一个对象
                return value !== ele
            }
        })
        //注意修改长度
        this.length = this.element.length;

        return value;
    }

    size(): number {
        return this.element.length;
    }

    slice(start: number): ArrayList<T>
    slice(start: number, end: number): ArrayList<T>
    slice(start: number, end: number | undefined = undefined): ArrayList<T> {
        if (end === undefined) {
            return new ArrayList<T>(this.element.slice(start));
        } else {
            return new ArrayList<T>(this.element.slice(start, end));
        }
    }
}

export default ArrayList;
```

2. **Entity实体类**

```typescript
//Entity实体类
export class Food {// 食物类
    constructor(public foodid: string, public shop: string, public foodName: string) {

    }

}

export class Flower {// 花类
    constructor(public name: string, price: number) {

    }

}

export class Customer {// 顾客类
    constructor(public custName: string, public custAge: number) {

    }
}
```

3. **Dao数据访问类**

```typescript
//Dao数据访问类（模拟从后端获取数据）
import {Food, Customer} from './Entity'
import ArrayList from './ArrayList'

// 美食DAO类
export class FoodDao {
    arrayList!: ArrayList<Food>;

    // 初始化数据-模拟数据表的数据
    init() {
        let foodFish = new Food("F100", "十八碗", "400克泡椒鱼头");
        let foodChafing = new Food("F101", "顶呱呱", "香辣哇哇火锅");
        let foodDatong = new Food("F102", "肯德基", "大桶炸鸡");
        let foodFour = new Food("F103", "麦当劳", "冰淇凌");
        let foodFive = new Food("F104", "华莱士", "冰淇凌2");
        let foodSix = new Food("F105", "成都小吃", "蚂蚁上树");
        let foodSeven = new Food("F106", "郭林家常菜", "大乱炖");
        let foodEight = new Food("F107", "韩正味", "石锅拌饭");
        this.arrayList = new ArrayList<Food>();
        this.arrayList.add(foodFish);
        this.arrayList.add(foodChafing);
        this.arrayList.add(foodDatong);
        this.arrayList.add(foodFour);
        this.arrayList.add(foodFive);
        this.arrayList.add(foodSix);
        this.arrayList.add(foodSeven);
        this.arrayList.add(foodEight);

        return this.arrayList
    }

    // 模拟从后端获取数据
    findAllFoods() {
        return this.init();
    }
}

// 顾客DAO类
export class CustomerDao {
    public arrayList: ArrayList<Customer>;

    constructor() {
        this.arrayList = new ArrayList<Customer>();
    }

    init() {
        let baiyanSong = new Customer("白岩松", 50);
        let sunwukong = new Customer("孙悟空", 500);
        let siteng = new Customer("司腾", 40);
        let zhouxingchi = new Customer("周星驰", 55);
        let zhengchengGong = new Customer("郑成功", 657);
        let chenZhen = new Customer("陈真", 135);
        let biergici = new Customer("比尔盖茨", 55);
        let guodegang = new Customer("郭德纲", 48);
        this.arrayList.add(baiyanSong)
        this.arrayList.add(sunwukong)
        this.arrayList.add(siteng)
        this.arrayList.add(zhouxingchi)
        this.arrayList.add(zhengchengGong);
        this.arrayList.add(chenZhen);
        this.arrayList.add(biergici);
        this.arrayList.add(guodegang);
        return this.arrayList
    }

    // 模拟从后端获取数据
    findAllCustomers() {
        return this.init();
    }
}
```

4. **Pager分页器类**

```typescript
//Pager分页器(手动分页)
import ArrayList from './ArrayList'

// 通用分页类
export default class Pager<M extends object> {
    /** 当前页码 */
    private currentPage: number = 1;
    /** 一页显示的记录数 */
    private numPerPage: number = 10;
    /** 记录总数 */
    private totalRows: number = 0;
    /** 总页数 */
    private totalPages: number = 0;
    /** 起始行数 */
    private startIndex: number = 0;
    /** 结束行数 */
    private lastIndex: number = 0;
    /** 指定类型结果列表 */
    private resultList!: ArrayList<M>;
    /** 全部数据列表 */
    private dataList!: ArrayList<M>;

    constructor()
    constructor(currentPage: number, numPerPage: number)
    constructor(currentPage: number, numPerPage: number, dataList: ArrayList<M>)
    constructor(currentPage: number = 1, numPerPage: number = 10, dataList: ArrayList<M> = new ArrayList<M>()) {
        this.currentPage = currentPage;
        this.numPerPage = numPerPage;
        this.dataList = dataList;
        this.init();
    }

    public init(): void {
        if (this.currentPage > 0 && this.numPerPage > 0 && this.dataList && this.dataList.size() > 0) {
            this.totalRows = this.dataList.size();
            this.totalPages = Math.ceil(this.totalRows / this.numPerPage);
            this.startIndex = this.numPerPage * (this.currentPage - 1);
            this.lastIndex = this.startIndex + this.numPerPage - 1 >= this.dataList.size() - 1 ? this.dataList.size() - 1 : this.startIndex + this.numPerPage - 1;
            this.resultList = this.dataList.slice(this.startIndex, this.lastIndex + 1);
        }
    }

    public setCurrentPage(val: number) {
        this.currentPage = val;
        this.init();
    }

    public setNumPerPage(val: number) {
        this.numPerPage = val;
        this.init();
    }

    public setDataList(val: ArrayList<M>) {
        this.dataList = val;
        this.init();
    }

    public getResultList(): ArrayList<M> {
        return this.resultList || new ArrayList<M>();
    }
}
```

5. **Test类**

```typescript
//Test类
import Pager from './Pager'
import {FoodDao, CustomerDao} from './Dao'
import {Food, Customer} from './Entity'

//获取全部美食数据
let foodDao = new FoodDao();
let allFoods = foodDao.findAllFoods();
//手动分页，显示第2页食物，每页3个
let foodPager = new Pager<Food>(2, 3, allFoods);
let foods = foodPager.getResultList();
foods.show();

//获取全部顾客数据
let customerDao = new CustomerDao();
let allCustomers = customerDao.findAllCustomers();
//手动分页，显示第3页顾客，每页3个
// let customerPager = new Pager<Customer>(3, 3, allCustomers);

// let customerPager = new Pager<Customer>(3, 3);
// customerPager.setDataList(allCustomers);

let customerPager = new Pager<Customer>();
customerPager.setCurrentPage(3);
customerPager.setNumPerPage(3);
customerPager.setDataList(allCustomers);
let customers = customerPager.getResultList();
customers.show();
```

![image-20220421105028430](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204211050158.png)



## 泛型约束

### T extends object 

T extends object 是泛型约束的一种表现。泛型约束简单点说就是把泛型的具体化数据类型范围缩小。extends 表示具体化的泛型类型只能是 object 类型，某个变量如果能断言成 object 类型【变量 as object】，那么这个变量的类型就符合 T extends object 。就是说该变量的类型可以是T的具体化类型。

还记得之前说的new底层发生了什么?  任何一个类或者构造函数的底层都是从 new Object ( )而来，这个 new Object ( )对象的类型就是 object 类型。这就是说任何类的对象或者构造函数的对象都符合T extends object。

**前面泛型实例中，分页类Pager使用 T extends object 的原因**：分页类中只添加对象数据，所以泛型要被具体化成一个对象类型才符合要求，例如多个顾客对象，多个美食对象，而拒绝添加 string，number，其他数据类型。

```typescript
class Container<T extends object>{
  t!: T;
  constructor(t_: T) {
    this.t = t_;
  }
  show(): T {
    console.log(this.t);
    return this.t;
  }
}


let obj2: object = { username: "lisi", age: 23 }
// object可以具体化T extends object,T就是object类型
let c = new Container<object>(obj2);
c.show();

type objtype = { username: string, age: number }
let obj: objtype = { username: "wangwu", age: 23 }
// obj是objtype类型的，但是可以类型断言(转换)为object类型，故满足泛型约束条件
// obj as object;  				
let obj3 = <object>obj;
//objtype可以具体化T extends object,具体化后T就是objtype类型
let c2 = new Container<objtype>(obj)
c2.show();

// js function Customer(){} new Object()
class Customer { 
  constructor(public name: string) {

  }
}
let cust = new Customer("wangwu");

let c3 = new Container<Customer>(cust)
c3.show();
```

### keyof基础使用

keyof  表示获取一个**类**或者一个**对象类型** 或者一个**接口类型**的所有属性名**key组成的联合类型**。[如果类或者对象类型或者接口上只有一个属性，那么就是一个单一的属性名的类型]。**简单点讲就是 keyof 后面必须跟类型，而不是跟值或实例对象。** 

```typescript
//比较语法
type t = type of stu;     //stu是Student类的1个实例

type t = keyof Student;   //Student是一个类
```

```typescript
//1.类
class Student {
    name: string;
    age: number

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    show() {
        console.log(`name: ${this.name}, age: ${this.age}`);
    }
}

let stu = new Student("张三", 30);
type stuType = typeof stu;
type keyStuType = keyof stuType;


//2.对象类型
let obj = {
    username: "zhangsan",
    age: 25,
    say() {
        console.log("hello")
    }
}
type objType = typeof obj;
type keyType = keyof objType;

// type keyType = keyof typeof obj;

let obj2: keyType = "username";


//3.接口
interface Person {
    cardId: number;
    name: string;
}

let person: Person = {cardId: 123456, name: "老王"};
type personType = typeof person;
type keyPersonType = keyof personType;

export {}
```



1. **keyof类类型**

   ![image-20220422084031764](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204220840901.png)

   ![image-20220422084259298](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204220843711.png)

   

   ![image-20220422090922629](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204220909406.png)

   

2. **keyof对象类型**

   ![image-20220422084559056](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204220846940.png)

   ![image-20220422084715272](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204220847581.png)


3. **keyof接口类型**

   ![image-20220422085054921](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204220850209.png)

   ![image-20220422085146398](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204220852252.png)

   ![image-20220422091044358](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204220911139.png)

3. **Vue3源码示例**

   ![image-20220422091428512](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204220914593.png)



### extends keyof 综合实例

1. 订单详情类

   ```typescript
   // 订单详情类
   export default class OrderDetail {
       public orderDetailId: number | undefined;
       public productname: string
       public price!: number
       public count!: number
   
       constructor(orderDetailId_: number, productname_: string, count_: number, price_: number) {
           this.orderDetailId = orderDetailId_;
           this.productname = productname_;
           this.price = price_;
           this.count = count_
       }
   
       public getTotal(): number {
           return this.price * this.count
       }
   }
   ```

   

2. 订单类

   ```typescript
   import OrderDetail from './OrderDetail'
   
   export default class Order {
       static count: number
   
       constructor(public orderId: number, public date: Date, public custname: string,
                   public phone: string, public orderDetailArray: Array<OrderDetail>) {
   
       }
   
       doEat() {
       }
   
   }
   
   type OrderDetailType = Order["orderDetailArray"]
   
   let orderDetailOne = new OrderDetail(10, "电视机", 5000, 3);
   let orderDetailTwo = new OrderDetail(11, "桌子", 2000, 2);
   var orderDate = new Date(2023, 10, 17, 5, 20, 0);
   let order = new Order(1, orderDate, "李武", "33333", [orderDetailOne, orderDetailTwo]);
   ```

   

3. extends keyof 使用类

   ```typescript
   import Order from './Order';
   import OrderDetail from './OrderDetail';
   
   class ObjectImpl<T extends object, K extends keyof T> {
       object!: T;
       key!: K
   
       constructor(object_: T, key_: K) {
           this.object = object_;
           this.key = key_;
       }
   
       getValue() {
           return this.object[this.key]
       }
   
       setValue(newVal: T[K]) {
           this.object[this.key] = newVal;
       }
   }
   
   let orderDetailOne = new OrderDetail(10, "电视机", 5000, 3);
   let orderDetailTwo = new OrderDetail(11, "桌子", 2000, 2);
   var orderDate = new Date(2023, 10, 17, 5, 20, 0);
   let order = new Order(1, orderDate, "李武", "33333", [orderDetailOne, orderDetailTwo]);
   let result = order.orderDetailArray;
   console.log("result:", result)
   
   //let objectImpl = new ObjectImpl<Order, "orderDetailArray">(order, "orderDetailArray");
   let objectImpl = new ObjectImpl(order, "orderDetailArray"); //泛型可以推断出来
   
   console.log("objectImpl.getValue():", objectImpl.getValue());
   objectImpl.getValue().forEach((orderDetail) => {
     	//如果ObjectImpl中没有使用合适的泛型，这里就不能自动提示productname，甚至还会编译报错
       console.log(orderDetail.productname);
   })
   
   let orderDetailThree = new OrderDetail(12, "空调", 2000, 3);
   let orderDetailFour = new OrderDetail(13, "笔记本", 6000, 4);
   let orderDetailArray: Array<OrderDetail> = [orderDetailThree, orderDetailFour];
   objectImpl.setValue(orderDetailArray);
   console.log("objectImpl.getValue():", objectImpl.getValue());
   ```

   ![image-20220422093450859](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204220934321.png)



## 泛型接口

1. 为什么要用接口丶泛型接口准备   

   ArrayList和LinkedList，ES6 的 Set 都属于功能相同但是实现方式不同的集合类

   **ArrayList 应用场景**：ArrayList ，Set 底层都是基于数组二次封装的类，所以查询效率很高，但插入，更新，删除数据的效率低 。

   **LinkedList 链表的应用场景**：基于链表结构，插入，删除数据的效率高（尤其是插入数据效率更高），但查询效率低，另外LinkedList 提供了 addFirst，addLast 等更多灵活添加数据的方法，如果addFirst 用 ArrayList 来实现，效率就很低，因为需要把数组每一个元素进行往后移动位置，但 LinkedList实现只需要改变首个节点的prev和新插入节点的 next 即可，效率比 ArrayList 高出许多。

   **如果某项目需要频繁插入，更新，添加操作，那么就需要使用 LinkedList，比如：新闻项目，股票系统；而对于查询量大，数据变化小的项目就要 ArrayList，比如人口普查系统。**

   **说个题外话**：如果要给LinkedList评出一个难度系数，那么我们就拿 Java 的 ConcurrentHashMap 底层高并发的源码+红黑树左旋，右旋，变色联合的难度系数来说，难度系数高达7颗星，属于有相当难度的技能之一；可以说90%以上的大厂面试官都说不太清楚或者说不太完整。那么这样下来，链表难度系数就能达到4.5到5颗星之间，也属于比较有难度的技能之一，日后写入简历，可增加简历含金量

2. 使用泛型接口的好处。

   **好处1：降低代码管理成本，提供统一属性和方法命名。**

   为实现了本接口的所有泛型类提供了统一的方法和属性，避免了不同的泛型类对于相同功能的方法和属性各自命名导致加大代码管理和测试的成本的问题。

   **好处2：可以从整体上快速通读类的共同方法和属性。**

   可以把接口当成一个书的目录，快速查看类的方法和属性，这对于首次了解项目的开发人员来说是大为有好处的。

   **好处3：新增相同功能类时，可以快速搭建类的方法。**

   **好处4：和多态结合增加了项目的扩展性和简洁度，对开发大中项目有好处**。

3. List和LinkedList实例

   ```typescript
   // 泛型接口
   export default interface List<T> {
     add(ele: T): void;
     get(index: number): T;
     size(): number;
     remove(value: T): T;
   }
   
   // LinkedList为List的实现类
   import List from './List'
   // 双向链表类中
   class LinkedList<T> implements List<T>{
     getArray(): T[] {
       throw new Error('Method not implemented.');
     }
     add(ele: T): void {
       throw new Error('Method not implemented.');
     }
     get(index: number): T {
       throw new Error('Method not implemented.');
     }
     size(): number {
       throw new Error('Method not implemented.');
     }
     remove(value: T): T {
       throw new Error('Method not implemented.');
     }
   }
   ```

   

## 泛型综合实例

### ArrayList和LinkedList封装

本实例涵盖知识点包括：泛型接口、泛型类、泛型any化(默认值)、多态、方法重载等。

1. List接口

   ```typescript
   export default interface List<E = any> {
       add(e: E): void;
   
       add(index: number, e: E): void
   
       remove(): E;
   
       remove(index: number): E;
   
       remove(e: E): E;
   
       set(index: number, e: E): E;
   
       get(index: number): E;
   
       getSize(): number;
   
       isEmpty(): boolean;
   
       toString(): string;
   }
   ```

   

2. ArrayList和LinkedList封装类【精华】

   ```typescript
   import List from "./List";
   
   export default class ArrayList<E = any> implements List<E> {
       public elements: Array<E>;
       public size: number = 0;
   
       constructor()
       constructor(elements: Array<E>)
       constructor(initial?: Array<E>) {
           if (initial === undefined) {
               this.elements = new Array<E>();
               this.size = 0;
           } else {
               this.elements = initial;
               this.size = initial.length;
           }
       }
   
       add(e: E): void;
       add(index: number, e: E): void;
       add(value: E | number, e?: E): void {
           if (typeof value === "number") {
               if (e === undefined) {
                   throw new Error("Add failed. Element can not be undefined.");
               }
               this.addElement(value, e);
           } else {
               this.addElement(this.size, value);
           }
       }
   
       private addElement(index: number, e: E): void {
           if (index < 0 || index > this.size) {
               throw new Error("Add failed. Illegal index.");
           }
           this.elements.splice(index, 0, e);
           this.size++;
       }
   
       get(index: number): E {
           if (index < 0 || index >= this.size) {
               throw new Error("Get failed. Illegal index.");
           }
           return this.elements[index];
       }
   
       getSize(): number {
           return this.size;
       }
   
       isEmpty(): boolean {
           return this.size === 0;
       }
   
       remove(): E;
       remove(index: number): E;
       remove(e: E): E;
       remove(value?: number | E): E {
           if (value === undefined) {
               return this.removeElement(this.size - 1);
           } else if (typeof value === "number") {
               return this.removeElement(value);
           } else {
               return this.removeObject(value);
           }
       }
   
       private removeElement(index: number): E {
           if (index < 0 || index >= this.size) {
               throw new Error("Remove failed. Index is illegal.");
           }
           let ret = this.elements[index];
           this.elements.splice(index, 1);
           this.size--;
           return ret;
       }
   
       private removeObject(e: E): E {
           let index = this.elements.findIndex(item => JSON.stringify(item) === JSON.stringify(e));
           if (index !== -1) {
               return this.removeElement(index);
           }
           return e;
       }
   
       set(index: number, e: E): E {
           if (index < 0 || index >= this.size) {
               throw new Error("Get failed. Illegal index.");
           }
           this.elements[index] = e;
           return e;
       }
   
       toString(): string {
           return JSON.stringify(this.elements);
       }
   }
   ```

   

   ```typescript
   import List from './List';
   
   class Node<E = any> {
       e: E | undefined;
       next: Node<E> | undefined;
   
       constructor()
       constructor(e: E)
       constructor(e: E, next: Node<E> | undefined)
       constructor(e?: E, next?: Node<E>) {
           this.e = e;
           this.next = next;
       }
   
       toString(): string {
           return JSON.stringify(this.e);
       }
   }
   
   export default class LinkedList<E = any> implements List<E> {
       private dummyHead: Node<E>;
       private size: number;
   
       constructor()
       constructor(elements: Array<E>)
       constructor(initial?: Array<E>) {
           this.dummyHead = new Node<E>();
           this.size = 0;
           if (initial !== undefined) {
               for (let i = 0; i < initial.length; i++) {
                   this.addFirst(initial[i]);
               }
           }
       }
   
       add(e: E): void;
       add(index: number, e: E): void;
       add(value: E | number, e?: E): void {
           if (typeof value === "number") {
               if (e === undefined) {
                   throw new Error("Add failed. Element can not be null.");
               }
               this.addElement(value, e);
           } else {
               this.addElement(this.size, value);
           }
       }
   
       addFirst(e: E): void {
           this.addElement(0, e);
       }
   
       addLast(e: E): void {
           this.addElement(this.size, e);
       }
   
       private addElement(index: number, e: E): void {
           if (index < 0 || index > this.size) {
               throw new Error("Add failed. Illegal index.");
           }
           let prev = this.dummyHead;
           for (let i = 0; i < index; i++) {
               prev = prev.next!;
           }
           prev.next = new Node(e, prev.next);
           this.size++;
       }
   
       get(index: number): E {
           if (index < 0 || index >= this.size) {
               throw new Error("Get failed. Illegal index.");
           }
           let cur = this.dummyHead.next;
           for (let i = 0; i < index; i++) {
               cur = cur?.next;
           }
           return (cur?.e as E);
       }
   
       isEmpty(): boolean {
           return this.size === 0;
       }
   
       remove(): E;
       remove(index: number): E;
       remove(e: E): E;
       remove(value?: number | E): E {
           if (value === undefined) {
               return this.removeElement(this.size - 1);
           } else if (typeof value === "number") {
               return this.removeElement(value);
           } else {
               return this.removeObject(value);
           }
       }
   
       removeFirst(): E {
           return this.removeElement(0);
       }
   
       removeLast(): E {
           return this.removeElement(this.size - 1);
       }
   
       private removeElement(index: number): E {
           if (index < 0 || index >= this.size) {
               throw new Error("Remove failed. Index is illegal.");
           }
           let prev = this.dummyHead;
           for (let i = 0; i < index; i++) {
               prev = prev.next!;
           }
           let retNode = prev.next;
           prev.next = retNode!.next;
           retNode!.next = undefined;
           this.size--;
           return <E>(retNode!.e);
       }
   
       private removeObject(e: E): E {
           let prev = this.dummyHead;
           while (prev.next !== undefined) {
               if (JSON.stringify(prev.next.e) === JSON.stringify(e)) {
                   break;
               }
               prev = prev.next;
           }
           if (prev.next !== undefined) {
               let delNode = prev.next;
               prev.next = delNode.next;
               delNode.next = undefined;
               this.size--;
           }
           return e;
       }
   
       set(index: number, e: E): E {
           if (index < 0 || index >= this.size) {
               throw new Error("Set failed. Illegal index.");
           }
           let cur = this.dummyHead.next;
           for (let i = 0; i < index; i++) {
               cur = cur!.next;
           }
           cur!.e = e;
           return e;
       }
   
       getSize(): number {
           return this.size;
       }
   
       toString(): string {
           let str: string = "";
           let cur = this.dummyHead.next;
           while (cur !== undefined) {
               str += JSON.stringify(cur.e) + "->";
               cur = cur.next;
           }
           str += JSON.stringify(undefined);
           return str;
       }
   }
   ```

   

3. Main测试类

   ```typescript
   //测试ArrayList
   import List from "./List";
   import ArrayList from "./ArrayList";
   
   class Student {
       constructor(public name: string, public age: number) {
       }
   
       show() {
           console.log(`name: ${this.name}, age: ${this.age}`);
       }
   }
   
   let list: List<Student> = new ArrayList<Student>();
   //增加
   list.add(new Student("张三", 20));
   list.add(new Student("李四", 24));
   list.add(new Student("王五", 26));
   list.add(new Student("赵六", 28));
   list.add(new Student("陈七", 30));
   list.add(0, new Student("钱二", 28));
   list.add(new Student("孙八", 32));
   console.log(list.toString());
   //查询
   let stu = list.get(3);
   console.log(stu);
   //修改
   list.set(3, new Student("王小五", 16));
   console.log(list.toString());
   //删除
   list.remove();
   console.log(list.toString());
   list.remove(3);
   console.log(list.toString());
   list.remove(new Student("陈七", 30));
   console.log(list.toString());
   list.remove(0);
   console.log(list.toString());
   list.remove();
   console.log(list.toString());
   
   
   export {};
   //---------------------------------------------------------------------------------------------------
   
   //测试LinkedList
   import List from "./List";
   import LinkedList from "./LinkedList";
   
   class Student {
       constructor(public name: string, public age: number) {
       }
   
       show() {
           console.log(`name: ${this.name}, age: ${this.age}`);
       }
   }
   
   let list: List<Student> = new LinkedList<Student>();
   //增加
   list.add(new Student("张三", 20));
   list.add(new Student("李四", 24));
   list.add(new Student("王五", 26));
   list.add(new Student("赵六", 28));
   list.add(new Student("陈七", 30));
   (<LinkedList>list).addFirst(new Student("钱二", 28));
   (<LinkedList>list).addLast(new Student("孙八", 32));
   console.log(list.toString());
   //查询
   let stu = list.get(3);
   console.log(stu);
   //修改
   list.set(3, new Student("王小五", 16));
   console.log(list.toString());
   //删除
   list.remove();
   console.log(list.toString());
   list.remove(3);
   console.log(list.toString());
   list.remove(new Student("陈七", 30));
   console.log(list.toString());
   (<LinkedList>list).removeFirst();
   console.log(list.toString());
   (<LinkedList>list).removeLast();
   console.log(list.toString());
   
   
   export {};
   ```

   


4. 执行结果

   ![image-20220423010853589](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204230109313.png)



### 汽车租赁实例

Vehicle类是父类，分别有3个子类：Car、Bus、Truck。还有一个顾客类Customer，现在需要一次租赁多辆车，并计算总费用。

1. 公共部分代码

   ```typescript
   class Vechile {
       static count: number = 3;
       public brand: string;// 品牌
       public vechileNo: string;// 车牌号
       public days: number;// 租赁天数
       public total: number = 0;// 支付的租赁总费用
       public deposit: number;// 押金
       constructor(brand_: string, vechileNo_: string, days_: number, deposit_: number) {
           this.brand = brand_;
           this.vechileNo = vechileNo_;
   
           this.days = days_;
           this.deposit = deposit_;
           console.log("constructor Vechile=>this.brand:", this.brand)
       }
   
       // 计算租赁车的价格 ( calculateRent)
       public calculateRent() {
           console.log("calculateRent来自Vechile=>this.brand:", this.brand)
   
           console.log(this.brand + " 车牌号为:" + this.vechileNo + "开始被租");
           return 0;
       }
   
       //支付押金的方法( payDesposit)
       payDesposit() {
           console.log(this.brand + " 车牌号为:" + this.vechileNo + " 支付了:" + this.deposit);
       }
   
       //  安全检测方法（safeShow)
       public safeShow() {
           console.log("车规则....");
           console.log(this.brand + " 车牌号为:" + this.vechileNo + " 违规了:");
       }
   
   }
   
   // 子类Car类 独有属性为type
   class Car extends Vechile {
       public type: string;//车的型号
       constructor(brand_: string, vechileNo_: string, days_: number, deposit_: number, type_: string) {
           super(brand_, vechileNo_, days_, deposit_);
           this.type = type_;
   
       }
   
       // 根据车的型号来获取租用一天该型号车的租金
       public getPriceByType() {
           let rentMoneyByDay: number = 0;//每天的租金
           if (this.type === "普拉多巡洋舰") {
               rentMoneyByDay = 800;
           } else if (this.type === "凯美瑞旗舰版") {
               rentMoneyByDay = 400;
           } else if (this.type === "威驰智行版") {
               rentMoneyByDay = 200;
           }
           return rentMoneyByDay;
       }
   
       public calculateRent() {
           super.calculateRent();
           console.log("Car:", Car.count)
           console.log("this.brand:", this.brand)
           this.total += this.days * this.getPriceByType();
           return this.total;
       }
   
       checkIsWeigui(isOverWeight: boolean) {
           if (isOverWeight) {
               this.total += this.total + 500;
           }
       }
   }
   
   class Bus extends Vechile {
       public seatNum: number // 座位数
       constructor(brand_: string, vechileNo_: string, days_: number, deposit_: number, seatNum_: number) {
           super(brand_, vechileNo_, days_, deposit_);
           this.seatNum = seatNum_;
           if (this.seatNum > 200) {
               throw new Error("座位数不能超过200");
           }
       }
   
       //计算租赁价格
       public getPriceBySeatNum() {
           let rentMoneyByDay: number = 0;//每天的租金
           if (this.seatNum <= 16) {
               rentMoneyByDay = 800;
           } else if (this.seatNum > 16) {
               rentMoneyByDay = 1600;
           }
           return rentMoneyByDay;
       }
   
       public calculateRent() {
           super.calculateRent();
           this.total += this.days * this.getPriceBySeatNum();
           return this.total;
       }
   
       checkIsOverNum(isOverWeight: boolean) {
           if (isOverWeight) {
               this.total += this.total + 2000;
           }
       }
   }
   
   class Truck extends Vechile {
       ton!: number // 座位数
       constructor(brand_: string, type_: string, days_: number, deposit_: number, ton_: number) {
           super(brand_, type_, days_, deposit_);
           this.ton = ton_;
           if (this.ton < 300 || this.ton > 2000) {
               throw new Error("吨数在300-2000吨之间");
           }
       }
   
       checkIsOverWeight(isOverWeight: boolean) {
           if (isOverWeight) {
               console.log("超载了");
               this.total += this.total + 2000;
           }
           return this.total;
       }
   
       //计算租赁价格
       getPriceByTon() {
           let rentMoneyByDay: number = 0;//每天的租金
           if (this.ton <= 500) {//500吨
               rentMoneyByDay = 750;
           } else if (this.ton > 500) {
               rentMoneyByDay = 1350;
           }
           return rentMoneyByDay;
       }
   
       public calculateRent() {
           this.total += this.getPriceByTon() * this.days;
           console.log("卡车:", this.total);
           return this.total;
       }
   
       public calDesposit() {
           return this.deposit;
       }
   }
   ```

   

2. 使用数组+多态

   ```typescript
   class Customer {
   
       //租1辆车
       public rentVechile(vechile: Vechile) {
           vechile.calculateRent();
       }
   
       //租多辆车
       //public rentVechiles(vechile: (Bus |Car )[]) {
       public rentVechiles(vechiles: Vechile[]) {
           let total: number = 0;
           vechiles.forEach((vechile) => {
               total += vechile.calculateRent()
           })
           return total
       }
   }
   
   let vechile0: Vechile = new Bus("大巴", "京3A556", 3, 50000, 67);
   let vechile1: Vechile = new Truck("大卡车", "京7A556", 2, 60000, 1500);
   let vechile2: Bus = new Bus("大巴", "京3A556", 3, 50000, 67);
   //一个父类数组对象变量的每一个元素都可以接受任何一个该父类的子类对象
   let vechileArray: Vechile[] = [vechile0, vechile1, vechile2];
   
   let cust = new Customer();
   let total = cust.rentVechiles(vechileArray);
   console.log("total:", total);
   ```

   

3. 使用泛型+多态+LinkedList（其中List、LinkedList使用上面例子中的即可）

   ```typescript
   import List from './List'
   import LinkedList from './LinkedList';
   
   class Customer {
   
       //租1辆车
       public rentVechile(vechile: Vechile) {
           vechile.calculateRent();
       }
   
       //租多辆车(写成泛型函数，除了可以租车，还可以租其它物品)
       public rent<T>(list: List<T>) {
           let total = 0;
           for (let i = 0; i < list.getSize(); i++) {
               let something = list.get(i);
               total += (something as any).calculateRent();
           }
           return total;
       }
   }
   
   let vechile0: Vechile = new Bus("大巴", "京3A556", 3, 50000, 67);
   let vechile1: Vechile = new Truck("大卡车", "京7A556", 2, 60000, 1500);
   let vechile2: Bus = new Bus("大巴", "京3A556", 3, 50000, 67);
   //一个父类数组对象变量的每一个元素都可以接受任何一个该父类的子类对象
   let list: List<Vechile> = new LinkedList();
   list.add(vechile0);
   list.add(vechile1);
   list.add(vechile2);
   
   let cust = new Customer();
   let total = cust.rent(list);
   console.log("total:", total);
   ```

   

4. 使用泛型+泛型约束+多态+LinkedList（其中List、LinkedList使用上面例子中的即可）

   ```typescript
   import List from './List'
   import LinkedList from './LinkedList';
   
   class Customer {
   
       //租1辆车
       public rentVechile(vechile: Vechile) {
           vechile.calculateRent();
       }
   
       //租多辆车
       //1.定义成泛型函数，除了可以租车，还可以租其它物品
       //2.使用泛型约束 T extends object，约束泛型类型只能是object子类，不能胡乱传参
       public rent<T extends object>(list: List<T>) {
           let total = 0;
           for (let i = 0; i < list.getSize(); i++) {
               let something = list.get(i);
               total += (something as any).calculateRent();
           }
           return total;
       }
   }
   
   let vechile0: Vechile = new Bus("大巴", "京3A556", 3, 50000, 67);
   let vechile1: Vechile = new Truck("大卡车", "京7A556", 2, 60000, 1500);
   let vechile2: Bus = new Bus("大巴", "京3A556", 3, 50000, 67);
   //一个父类数组对象变量的每一个元素都可以接受任何一个该父类的子类对象
   let list: List<Vechile> = new LinkedList();
   list.add(vechile0);
   list.add(vechile1);
   list.add(vechile2);
   
   let cust = new Customer();
   let total = cust.rent(list);
   console.log("total:", total);
   ```

   

# 第4章：深度掌握泛型函数

## 技能大纲

- 【泛型函数】—泛型函数+快速排序算法【比冒泡稍复杂】 【透彻理解泛型函数的好处】【共两节】
- 【泛型函数重载】泛型函数重载准备【经典复杂排序器】—自排序丶多数据类型丶中文排序【共三节】    
- 【泛型函数重载】泛型函数重载重构自排序丶多种数据类型丶中文排序 【彻底理解泛型函数重载带来的巨大好处】  
- 【泛型函数重载】 结合 Vue3 源码深度掌握泛型函数重载 【共一节】
- 【泛型工厂函数】——深入泛型工厂函数+泛型工厂函数的深度应用【不按“套路”出牌】

- 【TS交叉类型】 理解交叉类型和深入分析交叉类型的应用场景 

- 【泛型函数+TS交叉类型+类型断言+枚举】 深度理解泛型函数+交叉类型的综合应用 

## 泛型函数的好处

泛型函数可以在调用后得到返回值的具体数据类型，从而可以有自动方法和属性的提示和错误的编译提示。

## 泛型函数的格式

泛型函数格式1： 函数名<定义的泛型类型>(参数中可以使用泛型类型) :返回值也可以是泛型类型
泛型函数格式2： 函数名<定义的泛型类型1,定义的泛型类型2...>(参数中可以使用泛型类型...) :返回值也可以是泛型类型

## 泛型重载函数-复杂排序器实例

- 中文排序
- 字符串自排序
- 中文+英文、数字数组排序
- 中文+英文、数字数组 + 数组内部字符串自排序
- 字符串自排序+中文+英文、数字数组 + 数组内部字符串自排序

1. **快速排序示例，支持对number、string(英文)数组排序。**

   ```typescript
   // 泛型函数带来的好处：泛型函数可以在调用返回后得到返回值的具体数据类型，从而可以有自动方法和属性的提示和错误的编译提示
   function quickSort<T>(arr: Array<T>): Array<T> {
       if (arr.length < 2) {
           return arr
       }
   
       let left: Array<T> = [];
       let right: Array<T> = [];
       let mid = arr.splice(Math.floor(arr.length / 2), 1)[0];
       // console.log("mid:", mid)
       for (let i = 0; i < arr.length; i++) {
           if (arr[i] < mid) {
               left.push(arr[i]);
           } else {
               right.push(arr[i])
           }
       }
       return quickSort(left).concat(mid, quickSort(right))
   }
   
   
   let arr: Array<number> = [3, 1.8083, 8.9992, 9, 20, 15, 2, 7, 13, 11, 19, 18, 5, 6, 17, 4];
   let sortedArr = quickSort(arr)
   sortedArr.forEach((num) => {
       console.log(num.toFixed(2))
   })
   console.log("sortedArr:", sortedArr)
   
   
   let strArr: Array<string> = ["cba", "kkdf", "ndf", "bcdf", "dfd", "cdf"]
   let strArrSort = quickSort(strArr)
   console.log("strArrSort:", strArrSort)
   
   export {}
   ```

2. **中文数组排序示例**

   ```typescript
   //中文排序，localeCompare的第2个参数zh-CN可以省略.
   function sortChinese<T>(arr: Array<T>): T[] {
       return arr.sort((a, b) => {
           return (a as any).localeCompare(b, "zh-CN");
       });
   }
   
   let chineseArr = ["武汉", "郑州", "太原", "济南", "沈阳", "大连"];
   console.log(sortChinese(chineseArr));
   ```

3. **字符串自排序**

   ```typescript
   //字符串自排序
   function strSelfSort(str: string): string {
       let strArray = str.split('');
       let strSortArray = quickSort(strArray);
       return strSortArray.join('');
   }
   
   console.log(strSelfSort("dkeorjgojfshd"));
   ```

4. **中文、英文、数字数组混合排序（如果是英文字符串数组，每个元素还要自排序）**

   ```typescript
   // 快速排序：支持英文、数字数组排序
   function quickSort<T>(arr: Array<T>): Array<T> {
       if (arr.length < 2) {
           return arr
       }
       let left: Array<T> = [];
       let right: Array<T> = [];
       let mid = arr.splice(Math.floor(arr.length / 2), 1)[0];
       for (let i = 0; i < arr.length; i++) {
           if (arr[i] < mid) {
               left.push(arr[i]);
           } else {
               right.push(arr[i])
           }
       }
       return quickSort(left).concat(mid, quickSort(right))
   }
   
   // 中文排序
   function sortChinese<T>(arr: Array<T>): T[] {
       return arr.sort(function (a, b) {
           return (a as any).localeCompare(b, "zh-CN")
       })
   }
   
   // 判断数组中是否有中文元素
   function isChinese<T>(arr: Array<T>): boolean {
       //4e00~9fa5是中文在unicode编码表中的范围，大约20000多个汉字
       let pattern = /[\u4e00-\u9fa5]+/g;
       return arr.some((item) => {
           return pattern.test(item as any)
       })
   }
   
   // 中文+英文、数字数组排序混合方法
   function sort<T>(arr: Array<T>): T[] {
       if (isChinese(arr)) {//如果是中文数组
           return sortChinese(arr);
       }
       let newArr = arr.map((item) => {
           return typeof item === "string" ? strSelfSort(item) : item
       })
       //英文、数字数组排序
       return quickSort(newArr as any);
   }
   
   // 字符串自排序
   function strSelfSort(str: string): string {
       let strArray = str.split('');
       let strSortArray = quickSort(strArray);
       return strSortArray.join('');
   }
   
   let numArr = [3, 1, 8, 9, 20, 15, 2, 7, 13, 11, 19, 18, 5, 6, 17, 4];
   console.log(sort(numArr));
   
   let strArr: Array<string> = ["cba", "kkdf", "ndf", "bcdf", "dfd", "cdf"]
   console.log(sort(strArr));
   
   let chineseArr = ["武汉", "郑州", "太原", "济南", "沈阳", "大连"];
   console.log(sort(chineseArr));
   
   
   export {}
   ```
   
   > unicode编码参考资料链接: https://pan.baidu.com/s/1PsXgUAM9V7i_TF6WFSEEWQ 提取码: kfbo
   >
   > ![image-20220423144355309](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204231444661.png)

5. **字符串自排序+中文+英文、数字数组 + 数组内部字符串自排序。**

   ```typescript
   // 英文、数字数组排序
   function quickSort<T>(arr: Array<T>): Array<T> {
       if (arr.length < 2) {
           return arr
       }
   
       let left: Array<T> = [];
       let right: Array<T> = [];
       let mid = arr.splice(Math.floor(arr.length / 2), 1)[0];
       for (let i = 0; i < arr.length; i++) {
           if (arr[i] < mid) {
               left.push(arr[i]);
           } else {
               right.push(arr[i])
           }
       }
       return quickSort(left).concat(mid, quickSort(right))
   }
   
   // 中文排序
   function sortChinese<T>(arr: Array<T>): T[] {//Array<T>=T[]
       return arr.sort(function (firstnum, secondnum) {
           return (firstnum as any).localeCompare(secondnum, "zh-CN")
       })
   }
   
   // 判断数组中是否有中文元素
   function isChinese<T>(arr: Array<T>): boolean {
       let pattern1 = /[\u4e00-\u9fa5]+/g;
       return arr.some((item) => {
           return pattern1.test(item as any)
       })
   }
   
   // 中文+英文、数字数组排序混合方法
   function sort<T>(data: T): T[] | string {
       if (typeof data === "string") {
           return strSelfSort(data)
       }
       if (data instanceof Array) {//如果data是数组
           if (isChinese(data)) {//如果是中文数组
               return sortChinese(data);
           }
           let newArr = data.map((item) => {
               return typeof item === "string" ? strSelfSort(item) : item
           })
           //英文、数字数组排序
           return quickSort(newArr as any);
       }
       return [data]
   }
   
   // 字符串自排序
   function strSelfSort(str: string): string {
       let strArray = str.split('');
       let strSortArray = quickSort(strArray);
       return strSortArray.join('');
   }
   
   let str = "bdfaerafdfsd"
   let strResult = sort(str) as string
   console.log("长度为:", strResult.length, "字符串", strResult)
   
   let numArr = [3, 1, 8, 9, 20, 15, 2, 7, 13, 11, 19, 18, 5, 6, 17, 4];
   console.log(sort(numArr));
   
   let strArr: Array<string> = ["cba", "kkdf", "ndf", "bcdf", "dfd", "cdf"]
   console.log(sort(strArr));
   
   let chineseArr = ["武汉", "郑州", "太原", "济南", "沈阳", "大连"];
   console.log(sort(chineseArr));
   
   
   export {}
   ```

   **上面的代码中，我们用1个sort方法将字符串自排序和数组(中文、英文、数字)排序统一起来，虽然解决了编译错误（返回值变成了 T[]  | string 联合类型），但是调用sort方法后得到的结果数据的类型却发生了混乱，可能会导致严重不可用问题。**

   ![image-20220423152240528](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204231522158.png)

6. **泛型函数重载【终极版本】**

   ```typescript
   // 英文、数字数组排序
   function quickSort<T>(arr: Array<T>): T[] {
       if (arr.length < 2) {
           return arr
       }
       let left: Array<T> = [];
       let right: Array<T> = [];
       let mid = arr.splice(Math.floor(arr.length / 2), 1)[0];
       for (let i = 0; i < arr.length; i++) {
           if (arr[i] < mid) {
               left.push(arr[i]);
           } else {
               right.push(arr[i])
           }
       }
       return quickSort(left).concat(mid, quickSort(right))
   }
   
   // 中文排序
   function sortChinese<T>(arr: Array<T>): T[] {
       return arr.sort(function (a, b) {
           return (a as any).localeCompare(b, "zh-CN")
       })
   }
   
   // 判断数组中是否有中文元素
   function isChinese<T>(arr: Array<T>): boolean {
       let pattern = /[\u4e00-\u9fa5]+/g;
       return arr.some((item) => {
           return pattern.test(item as any)
       })
   }
   
   // 泛型函数重载【分工明确】
   // 中文+英文、数字数组排序混合方法
   function sort(data: string, count?: number): string  //[可有可无]
   function sort<T>(data: T, count?: number): T
   function sort(data: any, count: number = 5): any {
       //如果data是字符串就按照字符串自排序
       if (typeof data === "string") {
           return strSelfSort(data, count);
       }
       //如果data是数组则按照数组排序
       if (data instanceof Array) {
           if (isChinese(data)) {
               return sortChinese(data);
           }
           let newArr = data.map((item) => {
               return typeof item === "string" ? strSelfSort(item) : item
           })
           return quickSort(newArr as any);
       }
   }
   
   // 字符串自排序
   function strSelfSort(str: string, count: number = 5): string {
       let strArray = str.split('');
       let strSortArray = quickSort(strArray);
       let strResult = strSortArray.join('');
       return strResult.length > 10 ? strResult.substr(0, count) + "..." : strResult;
   }
   
   //1.字符串自排序
   let str = "bdfaerafdfsd"
   let strResult = sort(str, 6)
   console.log("长度为:", strResult.length, "字符串", strResult)
   
   //2.number数组排序
   let numArr = [3, 1.883332, 8, 9, 20, 15, 2, 7, 13, 11, 19, 18, 5, 6, 17, 4];
   console.log(sort(numArr));
   
   let result = sort<number[]>(numArr)
   result.forEach((item) => {
       console.log(item.toFixed(2));
   })
   
   //3.英文数组排序
   let strArr: Array<string> = ["cba", "kkdf", "ndf", "bcdf", "dfd", "cdf"]
   console.log(sort(strArr));
   
   //4.中文数组排序
   let chineseArr = ["武汉", "郑州", "太原", "济南", "沈阳", "大连"];
   console.log(sort(chineseArr));
   
   
   export {}
   ```

   

## Vue3源码泛型重载函数示例

![image-20220423153437704](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204231534883.png)



## 泛型工厂函数

### 通用函数类型

定义方式1：

```typescript
type FuncType = (...args: any) => any
```

定义方式2：

```typescript
interface FuncType {
    (...args: any): any
}
```

使用举例如下，可以看到任何函数的类型都可以用FuncType来表示。

```typescript
let func: FuncType = function () {

}

let func1: FuncType = function (val: number): number {
    return 0;
}

let func2: FuncType = function (from: object, to: object): boolean {
    return true;
}
```



### 通用工厂函数类型

**工厂函数类型定义：代表任意一个类的构造函数【等价JS的构造函数】的函数类型**。

注意细节：代表任意一个类的构造函数的类型，而不是代表类的实例对象或者类自身的类型。

思考：我们平时创建一个类的实例都采用如下写法：let stu = new Student()。那么为什么不是直接调用 new Student.constructor()，一是Student.constructor根本拿不到，二是即使拿到了ts内部也不允许 new function() 这样创建实例，因为这就失去了class存在的意义。而之所以可以使用 new Student() ，是因为在ts中规定了用类名来代替构造函数。new Student() 实际上调用的是Student类内部的构造函数constructor。

**通用工厂函数类型：注意这里的new不是创建对象的意思，仅仅代表后面跟的是一个构造函数**

定义方式1：

```typescript
type ConstructorType = new (...args: any) => any
```

定义方式2：

```typescript
interface ConstructorType {
    new(...args: any): any
}
```

使用举例如下，由于Student这个类名可以代表它这个类的构造函数，所以 `let constructor: ConstructorType = Student`完全没有任何问题。然后既然 constructor 指向了Student类的构造函数，那么 new constructor() 创建出来的就是Student的实例对象。

```typescript
let constructor: ConstructorType = Student;
let stu: Student = new constructor();
```

**实战应用：定义一个可以创建任何类的实例对象的工厂函数**

`缺陷：目前只支持调用空参构造函数创建对象，后面会讲解支持带参数的对象创建。`

```typescript
class Student {
    constructor(public name: string, public age: number) {
        console.log("创建了一个Student的实例对象");
    }

    show() {
        console.log(`name: ${this.name}, age: ${this.age}`);
    }
}

//括号内参数也可以写成：(Constructor: ConstructorType)
function createInstanceFactory(Constructor: { new(...args: any[]): any }) {
    return new Constructor();
}


let instance = createInstanceFactory(Student);
instance.show();
```

上面这个应用实例还有一个缺陷是创建出来的对象是any类型，这样得到instance实例后，无法自动提示。但是这是可以通过泛型来克服的。

![image-20220425094133561](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204250941143.png)



### 泛型工厂函数类型

上面的应用中，默认创建出来的实例对象是any类型的，导致编码过程中没有自动提示，我们可以通过增加泛型来解决。

**泛型工厂函数定义**：一个可以创建任意类对象的通用泛型函数。

定义方式1：

```typescript
type GenericConstructorType<T = any> = new (...args: any[]) => T
```

定义方式2：

```typescript
interface GenericConstructorType {
    new<T = any>(...args: any[]): T
}
```

**泛型工厂函数应用场景：** 

使用场景1：在一些不方便或者没有办法直接 new  类名（）格式来创建对象，例如：后面讲解的装饰器中就多次用到。 

使用场景2：在一些项目测试或者调试中简化代码使用。

通过工厂函数的学习，既可以加深对泛型函数的理解；同时也可以扩大技术视野，提升代码整合能力；还为一些优秀前端技术打下更雄厚的技术根基【例如：为理解装饰器中各种复杂代码打下技术根基】。

**应用举例：**

```typescript
class Student {
    constructor(public name: string, public age: number) {
        console.log("创建了一个Student的实例对象");
    }

    show() {
        console.log(`name: ${this.name}, age: ${this.age}`);
    }
}

//扩展为泛型工厂函数后，后就可以创建自定类型的实例对象。括号内参数也可以写成 (Constructor: GenericConstructorType)
function createInstanceFactory<T>(Constructor: { new(...args: any[]): T }) {
    return new Constructor();
}


let instance = createInstanceFactory<Student>(Student);
instance.show();
```

![image-20220425094604545](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204250946215.png)

### 装饰器ClassDecorator优化实例

下面是Controller中的一段代码，return 语句显得有些复杂。TS底层有一个ClassDecorator可以简化代码。

```typescript
function Controller(rootPath: string) {

    return function <T>(targetClass: { new(...args: any[]): T }) {
    }
}
```

1. TS底层写法，使用到了Function让事情变得复杂。

```typescript
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;

function Controller(rootPath: string): ClassDecorator {
		//tsconfig.json中"strict": true要注释掉
    return function <T>(targetClass) {
    }
}
```

2. 自己优化后的写法，使用到了通用泛型工厂函数类型

```typescript
//定义一个通用泛型工厂函数类型，替换掉 ClassDecorator
type MyClassDecorator = <T>(targetClass: { new(...args: any[]): T }) => any

function Controller(rootPath: string): MyClassDecorator {

    return function <T>(targetClass) {
    }
}
```



## 交叉类型与联合类型

### 定义和区别

**交叉类型定义：**将多个类型合并【多个类型属性和方法的并集】成的类型就是交叉类型。

```typescript
//定义一组类型
type objtype1 = { username: string, age: number }
type objtype2 = { custname: string, phone: number, age: number }
type objtype3 = { address: string }

//定义2个变量类型分别是objtype1,objtype2
let first: objtype1 = {username: "wangwu", age: 23}
let second: objtype2 = {custname: "lisi", phone: 111, age: 23}

//交叉类型一定是取并集，多了不行少了也不行。
let jiaochatype: objtype1 & objtype2 & objtype3 = {
    username: "wangwu", age: 23, custname: "lisi", phone: 111, address: "shanghai"
}

//下面都是错误举例
// let crossType1: objtype1 & objtype2 & objtype3 = {}
// let crossType2: objtype1 & objtype2 & objtype3 = {
//     username: "wangwu", age: 23
// }
// let crossType3: objtype1 & objtype2 & objtype3 = {
//     hello: 'hello'
// }
```

**联合类型定义：**只要符合多个类型中的某一种，并且多余的属性(或方法)必须在这些个类型的属性(或方法)范围内即可。

```typescript
//简单的联合类型，满足上述定义中的---符合多个类型中的一种
type messageType = number | string;
let msg: messageType = 1;
let msg2: messageType = "text"
```

```typescript
// 较复杂一些的联合类型
// 定义一组类型
type objtype1 = { username: string, age: number }
type objtype2 = { custname: string, phone: number, age: number, address: string }

// 正确示例
// 符合objtype1
let unionType1: objtype1 | objtype2 = {
    username: "wangwu", age: 20
}

// 符合objtype2
let unionType2: objtype1 | objtype2 = {
    username: "wangwu", age: 20, phone: 18883738373, address: "中国"
}

// 符合objtype1且多余的属性属于组成联合类型的这些个类型中的属性
let unionType: objtype1 | objtype2 = {
    username: "wangwu", age: 20, phone: 13394848474
}

// 错误示例
// 不符合任意一个类型
// let unionType1: objtype1 | objtype2 = {}

// 不符合任意一个类型
// let unionType2: objtype1 | objtype2 = {
//     username: "wangwu"
// }

// 虽然包含了objtype1的所有属性，但是多出了不属于组成联合类型的这些个类型中的属性hello
// let unionType3: objtype1 | objtype2 = {
//     username: "wangwu", age: 20, hello: 'hello'
// }
```

**赋值区别：**

**对于对象类型合成**的交叉类型是多个类型属性和方法的合并后的类型，属于多个类型的并集，必须是两个类型的全部属性和方法才能赋值给交叉类型变量。【可选属性和方法除外】

**对于对象类型合成**的联合类型变量可以接受联合类型中任意一种数据类型全部属性和方法，也可以是两个类型的全部属性和全部方法【可选属性和方法除外】，也可以是一种数据类型全部属性和方法+其他类型的某个属性和某个方法。

**取值区别：**

交叉类型变量可以获取两个类型的任意属性和任意方法，而联合类型的变量只能获取两个类型的共同属性和方法【交集属性和交集方法】



### 交叉类型应用场景

 通常用于多个对象合并的场景。比如：我们把用户信息，用户角色信息合并成一个对象然后输出。当然后端可以通过连接查询的 SQL 语句来完成到前端的多对象输出，但大多需要表的外键来支持，比如用户和角色就需要角色表有用户外键，对于现实生活中有必须关联在一起的实体【比如商品和库存信息】一般建议数据表用外键来支持前端多个对象的合并输出，虽然影响了效率，但也保证了表的数据合理性和完整性。

但如果我们临时需要随机把两个根本没有外键关联的数据表取出来的对象合并在一起输出，比如用户信息和日志信息，商品信息和日志信息，订单信息和日志信息，我们就可以用交叉类型来完成。因为我们不可能为了这个临时的对象合并需求把所有的这些表都建立起外键，须知外键太多不仅增加了数据表维护的负担，而且也有较大的影响了表操作效率。

可能没有数据表基础的同学不太理解，效率低到哪了呢？比如添加一个用户，必然要添加日志 id 【外键】信息，那就要判断这个日志 id 是否在日志表中是否存在，这就是需要时间，当用户访问量大时，某个时刻都要完成添加操作【高并发操作】，这个外键时间检查损耗就比较严重，尽管我们通过各种 SQL 优化来提高 SQL 效率, 【就像一个拖着一辆大卡车【 A 表】的大货车【 B 表】，无论如何调优，也不比空跑的大货车快】。

**所以综上所述：**

**交叉类型的应用场景1：可应用这些没有关联的对象合并上，因为这样会极大的方便前端页面的输出。合并如同打包，比单一的一个一个的筛选输出要方便很多，整体感要好很多。**

**交叉类型的应用场景2**： **一些 UI 库底层如果用到多个密切连接在一起的关联类型时，可以使用交叉类型来合并输出。**



### 泛型函数交叉类型实例

```typescript
interface Button {
    btntype: string
    text: string
}

interface Link {
    alt: string
    href: string
}

interface Href {
    linktype: string
    target: Openlocation
}

enum Openlocation {
    self = 0,
    _blank,
    parent
}

let button: Button = {
    btntype: 'normal',
    text: '跳转到百度',
}
let link: Link = {
    alt: 'goto baidu',
    href: 'http://www.baidu.com'
}
let href: Href = {
    linktype: "外网",
    target: Openlocation._blank
}

export function extend<T extends object, U extends object>(to: T, from: U): T & U {
    for (const key in from) {
        (to as T & U)[key] = from[key] as any
    }
    return to as T & U
}

function cross<T extends object, U extends object>(objOne: T, objTwo: U): T & U {
    let obj = {}
    let combine = obj as T & U
    Object.keys(objOne).forEach((key) => {
        // @ts-ignore
        combine[key] = objOne[key]
    })
    Object.keys(objTwo).forEach((key) => {
        if (!combine.hasOwnProperty(key)) {
            // @ts-ignore
            combine[key] = objTwo[key]
        }
    })
    return combine;
}

let combine = cross(button, link)
let combine2 = cross(combine, href)
console.log(combine);
console.log(combine2);

export {}
```



### 泛型重载函数交叉类型实例

```typescript
interface Button {
    btntype: string
    text: string
}

interface Link {
    alt: string
    href: string
}

interface Href {
    linktype: string
    target: Openlocation
}

enum Openlocation {
    self = 0,
    _blank,
    parent
}

let button: Button = {
    btntype: 'normal',
    text: '跳转到百度',
}
let link: Link = {
    alt: 'goto baidu',
    href: 'http://www.baidu.com'
}
let href: Href = {
    linktype: "外网",
    target: Openlocation._blank
}

function cross<T extends object, U extends object>(objOne: T, objTwo: U): T & U
function cross<T extends object, U extends object, V extends object>(objOne: T, objTwo: U, objThree: V): T & U & V
function cross<T extends object, U extends object, V extends object>(objOne: T, objTwo: U, objThree?: V) {
    let obj = {}
    let combine = obj as T & U

    Object.keys(objOne).forEach((key) => {
        // @ts-ignore
        combine[key] = objOne[key]
    })
    Object.keys(objTwo).forEach((key) => {
        if (!combine.hasOwnProperty(key)) {
            // @ts-ignore
            combine[key] = objTwo[key]
        }
    })
    //如果有第三个对象传递进来实现交叉
    if (objThree) {
        //let combine2=combine as T & U & V
        let combine2 = combine as typeof combine & V
        Object.keys(objThree).forEach((key) => {
            if (!combine2.hasOwnProperty(key)) {
                // @ts-ignore
                combine2[key] = objThree[key]
            }
        })
        return combine2// 三个对象交叉结果
    }
    return combine;// 两个对象交叉结果
}

let combine = cross(button, link)
console.log(combine)
let combine2 = cross(combine, link, href)
console.log(combine2);

export {}
```



# 第5章：深入理解TS高级类型

## 技能大纲

- 学习 infer + TS高级类型+TS泛型再进阶的价值和重要意义
- 【 infer 】  理解替换“神器” infer + infer和泛型的区别 【原理+使用案例】
- 【 infer 】构建带参数的工厂实例方法 +分清易混淆的概念【 泛型+infer综合面试题】
- 【 infer 】 联合 Vue3 源码 深入理解 infer   [ 透彻掌握infer带来的好处 ]
- 【TS 高级 type 类型】  详尽解说 Extract  不同场景下的不同理解+ 和类型断言的异同 
- 【TS 高级 type 类型】 详尽解说 Exclude   不同场景下的不同理解 【掌握 Omit 前 必会 】
- 【TS 高级 type 类型】 Record完成异步数据扁平化(轻量级 Map)【真实应用场景】 
- 【TS 高级 type 类型】 in keyof 简化实现轻量级Map【真实应用场景】 
- 【TS 高级 type 类型】 Pick 快速抓取数据 【真实应用场景】
- 【TS高级 type  类型】 Partial+Required+ReadOnly
- 【TS 高级 type 类型】 环环相扣掌握 Omit 反向抓取数据 【真实应用场景】



## 详解infer

### infer+TS高级类型的意义

TypeScript  提供了较多的高级类型，通过学习高级类型可以帮助提高 TS 代码的灵活运用能力，掌握好这些高级类型能进一步提升我们对泛型的理解和驾驭能力， 让 TS 功底更深厚，把我们的TS水平推向一个更高的层次，无论以后在项目中运用 TS 还是对理解源码的复杂 TS 泛型语法都有不小的帮助， 由于 TS 高级类型为我们提供了很多技巧性强的功能， 当我们在项目中遇到使用这些功能的应用场景时，会给项目带来更简洁，更轻量级的实现效果，比如：如果我们项目中只需要查询 key value 数据，那么 Record 类型 就是轻量级的 Map ，再比如 Omit 快捷爬取Todo列表中的数据，保证编辑和预览时的不同效果。



### infer和泛型的区别

#### infer的定义

infer 表示在  extends 条件语句中以占位符出现的用来修饰数据类型的关键字，被修饰的数据类型等到使用时才能被推断出来。

#### infer使用规则

**infer 占位符式的关键字通常出现在以下三个位置上：**

1. infer 出现在 extends 条件语句后的函数类型的**参数类型位置上**

   ```typescript
   interface Customer {
       custname: string
       buymoney: number
   }
   //infer 出现在 extends 条件语句后的函数类型的参数类型位置上
   type inferType<T> = T extends (param: infer P) => any ? P : T
   
   type custFuncType = (cust: Customer) => void
   
   type inferResultType = inferType<custFuncType>; // 结果为Customer
   //相当于 type inferResultType = (cust: Customer) => void extends (param: infer P) => any ? P : (cust: Customer) => void;
   
   const cust: inferResultType = {custname: "wangwdu", buymoney: 23}
   ```

   

2. infer 出现在 extends 条件语句后的函数类型的**返回值类型上**

   ```typescript
   // infer 出现在 extends 条件语句后的函数类型的返回值类型上
   interface Customer {
       custname: string
       buymoney: number
   }
   
   type custFuncType = (cust: Customer) => string
   
   type inferType<T> = T extends (params: any) => infer P ? P : T
   //type inferType<custFuncType>= (cust: Customer) => string extends (params: any) => infer P ? P : T
   
   // 输出函数的返回值类型string
   type inferResultType = inferType<custFuncType>
   ```

   

3. infer 出现在类型的**泛型具体化类型上**。

   ```typescript
   class Subject {
       constructor(public subid: number, public subname: string) {
       }
   }
   
   let chineseSubject = new Subject(100, "语文")
   let mathSubject = new Subject(101, "数学")
   let englishSubject = new Subject(101, "英语")
   
   let set = new Set<Subject>([chineseSubject, mathSubject, englishSubject]);
   
   // infer出现在类型的泛型具体化类型上
   type ElementOf0<T> = T extends Set<infer E> ? E : never
   
   type ElementResultType = ElementOf0<typeof set>; //输出Subject
   // 相当于 ElementOf0<Set<Subject>> ===> Set<Subject> extends Set<infer E> ? E : never
   
   let result: ElementResultType = new Subject(200, "物理");
   ```

   

### 构造函数类型4种表示

下面以ChinesePeople类为例：

1. new (name: string, sex: string, phone: string, national: string) => ChinesePeople，此时ChinesePeople表示一个函数对象变量。
2. typeof ChinesePeople，此时ChinesePeople表示一个函数对象变量。
3. new (...args: any[]) => any，通用构造函数类型，它可以表示任意类的构造函数类型。
4. new (...args: any[]) => T，4的泛型版本，也是通用构造函数类型，但通过它创建出的对象多了一个自动提示。

**重要！！！：对于ChinesePeople 和 typeof ChinesePeople 的理解。**

- ChinesePeople 可以用来表示一种类类型，比如：let cp: ChinesePeoplenew = new ChinesePeople()；左边的ChinesePeople用来表示 cp 这个实例对象的类型。【类名可用于表示通过它创建的实例对象的类型】。但是 new ChinesePeople() 中的ChinesePeople，就不是表示一个类型了，【TS中规定可以用类名作为引用变量指向它的构造函数（constructor）】 因此这里它是作为一个指向堆内存中的构造函数内存地址的引用变量而存在，我们假设 TS 规定要用 __类名来表示构造函数的话，那么我们可能就需要这么写了：new _ChinesePeople()。所以这里的 ChinesePeople 只是恰好和类名重复而已，但是它已经不再表示原来那个类类型了。**综上所述，ChinesePeople 根据其所处的位置，可以代表2种含义。一种是作为类型存在用于表示实例对象的类型，一种是作为值存在用于指向类的构造函数。**
- typeof ChinesePeople 中的 ChinesePeople 显然是一个值。我们通常这么用类型断言：if( typeof value === 'number' ){}。显然这里的 value 是一个值，对 ChinesePeople 也是同样的道理。那么 typeof ChinesePeople 显然表示的是 ChinesePeople 所指向的构造函数的类型，我们简称为构造器类型。

**简明总结：ChinesePeople 既可以表示类类型，又可以作为引用变量指向它的构造函数【可作类型可作值】。typeof ChinesePeople 只能表示构造器类型。**

```typescript
class ChinesePeople {
    public name: string
    public sex: string
    public phone: string
    public national: string

    constructor(name: string, sex: string, phone: string, national: string) {
        this.name = name;
        this.sex = sex
        this.phone = phone
        this.national = national
    }

    eat() {
        console.log(`${this.name}在吃饭!`);
    }
}

// 一个类的构造函数的类型表示1：new (name: string, sex: string, phone: string, national: string) => ChinesePeople;
// 这里ChinesePeople也是一个函数对象变量
let MyChinesePeople: new (name: string, sex: string, phone: string, national: string) => ChinesePeople = ChinesePeople;
//new MyChinesePeople(....); 等价于 new ChinesePeople(....);
let cp1 = new MyChinesePeople("zhangsan", "男", "1111", "汉族");
cp1.eat();

// 一个类的构造函数的类型表示2： typeof ChinesePeople
//  typeof ChinesePeople; 这里的ChinesePeople是一个构造函数对象变量
let MyChinesePeople2: typeof ChinesePeople = ChinesePeople;
//new MyChinesePeople2() 等价于 new ChinesePeople(....);
let cp2 = new MyChinesePeople2("lisi", "男", "1111", "汉族");
cp2.eat();

// 一个类的构造函数的类型表示3： new (...args: any[]) => any
let MyChinesePeople3: new (...args: any[]) => any = ChinesePeople
//new MyChinesePeople3() 等价于 new ChinesePeople(....);
let cp3 = new MyChinesePeople3("wangwu", "男", "1111", "汉族");
cp3.eat();

// 一个类的构造函数的类型表示4： new (...args: any[]) => T
type Constructor<T> = new (...args: any[]) => T
// ChinesePeople是为了具体化泛型T的一个类型
let MyChinesePeople4: Constructor<ChinesePeople> = ChinesePeople
//new MyChinesePeople4() 等价于 new ChinesePeople(....);
let cp4 = new MyChinesePeople4("zhaoliu", "男", "1111", "汉族");
cp4.eat();


export {}
```



### 构造函数参数类型

**1.	通用构造函数参数类型【以元组的形式返回，例如：[name: string, classno: number]】：**

type ConstructorParametersType<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any ? P : never

**2.	通用构造函数类型**【泛型T表示类类型，如：Student、ChinesePeople等】

type Constructor<T> = new (...args: any[]) => T

**3.	带参数的工厂函数（缺陷版）：**
function createInstance<T>(constructor: Constructor<T>, ...args: any[]) {
    return new constructor(args[0], args[1])
}

使用举例：createInstance(TestClass, "wangwu", 105).eat();

它的缺陷在于：1、参数个数不同时，编译不报错；2、参数类型不同时，编译也不报错。原因就在于参数类型用 any 来笼统表示的。

```typescript
class TestClass {
    public name: string
    public classno: number

    constructor(name: string, classno: number) {
        this.name = name;
        this.classno = classno
    }

    eat() {
        console.log("姓名为: " + this.name);
    }
}
// 通用构造函数参数类型
type ConstructorParametersType<T extends new (...args: any[]) => any>
    = T extends new (...args: infer P) => any ? P : never

// 获取到了 TestClass 构造函数的参数类型并放到一个元组中[name: string, classno: number]
// let constructorParameters: ConstructorParametersType<typeof TestClass>
// let constructorParameters: ConstructorParametersType<new (name: string, classno: number) => TestClass>

type Constructor<T> = new (...args: any[]) => T

// 带参数的工厂函数
function createInstance<T>(constructor: Constructor<T>, ...args: any[]) {
    return new constructor(args[0], args[1])
}

createInstance<TestClass>(TestClass, "wangwu", 105).eat();
// createInstance(TestClass, "wangwu", 105).eat();

export {}
```

**4.	带参数检测的泛型工厂函数：**

function createInstance<T, C extends new (...args: any[]) => any>(constructor: Constructor<T>, ...args: ConstructorParametersType<C>) {
    return new constructor(args[0], args[1]);
}

使用举例：createInstance<TestClass, typeof TestClass>(TestClass, "zhangsan", 100);

```typescript
class TestClass {
    public name: string
    public classno: number

    constructor(username: string, classno: number) {
        this.name = username;
        this.classno = classno
    }

    eat() {
        console.log("姓名为: " + this.name + "班级：" + this.classno);
    }
}

// 获取构造函数类型中的参数类型
type ConstructorParametersType<T extends new (...args: any[]) => any>
    = T extends new (...args: infer P) => any ? P : never

type Constructor<T> = new (...args: any[]) => T

function createInstance<T, C extends new (...args: any[]) => any>(constructor: Constructor<T>, ...args: ConstructorParametersType<C>) {
    //...args: ConstructorParametersType<typeof TestClass>) {
    //...args: [username: string, classno: number]) {
    return new constructor(...args);
}

// 带参数检测的泛型工厂函数实例方法的测试
createInstance<TestClass, typeof TestClass>(TestClass, "wangwu", 100).eat();
//下面语句正常编译通过
createInstance<TestClass, typeof TestClass>(TestClass, "zhangsan", 100);
// 下面语句会编译报错：应有3个参数，但传如了4个
// createInstance<TestClass,typeof TestClass>(TestClass, "wangwu", 105,23).eat();

export {}
```



### Vue3源码中infer使用举例

![image-20220427215256618](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204272153154.png)



## 详解Extract

Extract 是TS提供的一个TS高级type类型【简称TS高级类型】，它一般在3个地方使用：父子类、联合类型、函数。

### 使用规则

type Extract<T, U> = T extends U ? T : never

### 使用场景

1. Extract 在 父类和子类中应用。

   子类  extends 父类永远为true，即返回T类型。 父类  extends 子类一般为false，即返回 never 类型。因为父类继承子类本身不成立。但如果希望人为制造一个true 那只有子类实例属性或实例方法个数必须和父类一样多。

   ```typescript
   class People {
       public name!: string;
       public age!: number
       public address!: string
   
       eat() {
   
       }
   }
   
   class ChinesePeople extends People {
       private phone!: string
   
   }
   
   let cp = new ChinesePeople();
   
   type Extract<T, U> = T extends U ? T : never
   
   // Extract 在 父类和子类中应用
   // 定律：子类  extends 父类=>子类 extends 父类永远返回true=>返回T类型
   type extractType = Extract<ChinesePeople, People> // ChinesePeople
   
   // 定律: 父类  extends 子类=>父类 extends 子类返回false 因为父类继承子类本身不成立，所以一般都为false
   //  但如果希望人为制造一个true 获取到People
   // 那只有子类实例属性或实例方法个数必须和父类一样多
   type extractType2 = Extract<People, ChinesePeople> // never
   
   export {}
   ```

2. Extract在联合类型中使用

   ```typescript
   type Extract<T, U> = T extends U ? T : never
   
   // 联合类型中的Extract
   // 前少后多时很容易判断
   type extractType = Extract<string, string | number>;    //string
   type extractType2 = Extract<number, string | number>;   //number
   type extractType22 = Extract<string, number | boolean>; //never
   // 前多后少时，分步骤判断。
   // Extract<string | number, string> 分步判断：
   // 1、string extends string 满足，故返回string;
   // 2、number extends string 不满足，故返回 never；
   // 3、string | never 等价于 strnig，故最终结果为 sting.
   type extractType3 = Extract<string | number, string>;  //string
   type extractType4 = Extract<string | number, number>;  //number
   type extractType5 = Extract<string | number, string | number>; //string | number
   type extractType6 = Extract<string | number, boolean>; //never
   type extractType7 = Extract<string | boolean, string | number>; //string
   
   
   export {}
   ```

3. Extract在函数中使用

   ```typescript
   type func1 = (one: number, two: string) => string
   type func2 = (one: number) => string
   
   // 函数的泛型约束
   // 函数类型上的泛型约束 参数类型和返回值完全相同的情况下，
   //  参数少的函数类型 extends 参数多的函数类型 返回true
   //  参数多的函数类型 extends 参数少的函数类型 返回false
   type beginType1 = func1 extends func2 ? func1 : never// never
   type beginType2 = func2 extends func1 ? func2 : never// func2
   
   type extractType1 = Extract<func1, func2>//never
   type extractType2 = Extract<func2, func1>//= (one: number) => string
   
   
   export { }
   ```



### Extract真实应用场景

我们之前在交叉类型的章节讲过一个 cross 泛型重载函数。当时是这么写的：

function cross<T extends object, U extends object>(objOne: T, objTwo: U): T & U
function cross<T extends object, U extends object, V extends object>(objOne: T, objTwo: U, objThree: V): T & U & V
function cross<T extends object, U extends object, V extends object>(objOne: T, objTwo: U, objThree?: V) {

}

函数上的泛型写的比较复杂：<T extends object, U extends object, V extends object>， 而之所以这么做，是因为要约束传入的参数必须是object类型，否则如果传string、boolean 这样的类型，函数运行是就会报错。现在学了Extract就可以对上面的代码做一点优化了。

#### 优化V1.0

```typescript
type Extract<T, U> = T extends U ? T : never

function cross<T, U>(objOne: Extract<T, object>, objTwo: Extract<U, object>): T & U
function cross<T, U, V>(objOne: Extract<T, object>, objTwo: Extract<U, object>, objThree: Extract<V, object>): T & U & V
function cross<T, U, V>(objOne: Extract<T, object>, objTwo: Extract<U, object>, objThree?: Extract<V, object>) {

}

//编译报错
// cross("hello", 123);
//编译通过
cross({}, {});


export {};
```

![image-20220428095022052](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202204280950863.png)



#### 优化V2.0

上面已经简化函数上的泛型，但是参数里边的泛型还是稍显麻烦。还可以进一步优化：将 Extract<T, object> 单独抽出来，相当于定义一个别名。 type CrosTyp<T> = Extract<T, object>。

```typescript
type Extract<T, U> = T extends U ? T : never
type CrossType<T> = Extract<T, object>

function cross<T, U>(objOne: CrossType<T>, objTwo: CrossType<U>): T & U
function cross<T, U, V>(objOne: CrossType<T>, objTwo: CrossType<U>, objThree: CrossType<V>): T & U & V
function cross<T, U, V>(objOne: CrossType<T>, objTwo: CrossType<U>, objThree?: CrossType<V>) {

}

//编译报错
// cross("hello", 100);

//编译正常
cross({}, {});

export {};
```

显然经过再次优化，cross泛型重载函数变得比较简洁了。



## 详解Exclude

### 使用规则

type Exclude<T, U> = T extends U ? never : T;



### 应用举例

```typescript
interface Worker {
    name: string
    age: number
    email: string
    salary: number
}

interface Student {
    name: string
    age: number
    email: string
    grade: number
}

// 1、Extract，排除条件不成立的类型，保留符合泛型约束条件的类型
type Extract<T, U> = T extends U ? T : never;

// 2、Exclude，排除条件成立的类型，保留不符合泛型约束条件的类型
type Exclude<T, U> = T extends U ? never : T;

// eg1:用Extract来完成的获取Worker接口类型中的"age" | "email" | "salary"三个属性组成的联合类型
// type isResultType = Extract<"age" | "email" | "salary" | "xx", "name" | "age" | "email" | "salary">
//keyof Worker="name" |"age" | "email" |"salary"
type isResultType = Extract<"age" | "email" | "salary" | "xx", keyof Worker>

// eg2:用Exclude来完成的获取Worker接口类型中的"age" | "email" | "salary"三个属性组成的联合类型
type isResultType2 = Exclude<"age" | "email" | "salary" | "xx", keyof Worker>;  //xx
type isResultType22 = Exclude<"name" | "xx", keyof Worker>; //xx
type isResultType23 = Exclude<"name", keyof Worker>;    //never
type isResultType24 = Exclude<"name" | "age" | "email" | "salary", "name">; // "age" | "email" | "salary"
type isResultType26 = Exclude<keyof Worker, "name">;    //“age” | “email” | “salary”

// eg3:获取Woker接口类型中存在的属性，但是在学生接口类型中不存在的属性
type isResultType3 = Exclude<"name" | "age" | "email" | "salary", "name" | "age" | "email" | "grade">;  //salary
type isResultType31 = Exclude<keyof Worker, keyof Student>; //salary

export {}
```



## 详解Record

### K extends keyof T 

```typescript
type Worker = {
    custname: string
}
type Customer = {
    custname: string,
    age: number
}

type oneType<T, K> = K extends keyof T ? K : never

// 输出custname类型，注意这里输出的custname是类型不是值。PS:string、number等类型的值既可以做值又可以做类型(值类型).
type oneTypeResult = oneType<Customer, "custname">;
// type oneType<Customer,  "custname"> = "custname" extends "custname" |"age" ? "custname" : never

// 输出never
type oneTwoTypeResult = oneType<Customer, "xx">

type twoType<T, K> = K extends keyof T ? T[K] : never

type twoTypeResult = twoType<Customer, "age">;  // 输出number
// type twoType<Customer, "age"> = "age" extends keyof Customer ? Customer["age"] : never
//type valueType = Customer["age"]; //number


export { }
```

### K extends keyof any

**TS 规定 keyof any 等价于 string | number | symbol**

```typescript
type Worker = {
    custname: string
}
type Customer = {
    custname: string,
    age: number
}

type oneType<K> = K extends keyof any ? K : never
type oneAnyType = keyof any; // keyof any 等价于 string | number | symbol

//type oneResultType = oneType<Worker>;  //never
let count: number = 3;
type twoResultType = oneType<number>;    // number
let strName: string = "abc";
type threeResultType = oneType<typeof strName>; // string

type fourResultType = oneType<3>// 3被当成值类型 是一个类型 返回3也是一个值类型
let stuSymid: symbol = Symbol["stuid"]
type fiveResultType = oneType<typeof stuSymid>;  //symbol

export {}
```

###  P  in   K

```typescript
type Worker = {
    custname: string
}
type Customer = {
    custname: string,
    age: number
    phone: string
}

type Record<K extends keyof any, T> = {
    [P in "username" | "age"]: T  // username 和 age 分别和T组成键值对返回一个{key: value} 的类型
}
// S100输出的结果
// type resultRecord = {
//   username: Customer;
//   age: Customer;
// }
type resultRecord = Record<string, Customer>//S100

let obj: resultRecord = {
    "username": {custname: "wangwu", age: 23, phone: "111"},
    "age": {custname: "lisi", age: 33, phone: "23"}
}

export {}
```

```typescript
type Worker = {
    custname: string
}
type Customer = {
    custname: string,
    age: number
    phone: string
}

type Record<K extends keyof any, T> = {
    [P in K]: T
}

// 输出：{[p: string]: Customer}，[P in string]可以代表任意一个字符串的可索引类型
type resultRecord = Record<string, Customer>;
let obj: resultRecord = {
    "usernamed": {custname: "wangwu", age: 23, phone: "111"},
    "agde": {custname: "lisi", age: 33, phone: "23"}
}

// 输出：{[p: number]: Customer}，[P in number]可以代表任意一个数字的可索引类型，也就是数组。
type resultRecord2 = Record<number, Customer>;
let obj2: resultRecord2 = {
  0: {custname: "wangwu", age: 23, phone: "111"}, 
  1: {custname: "lisi", age: 33, phone: "23"}
}
let obj22: resultRecord2 = [
  {custname: "wangwu", age: 23, phone: "111"}, 
  {custname: "lisi", age: 33, phone: "23"}
]

export {}
```



### Record实现数据扁平化

PS：此处数据扁平化意思是将一个数组类型数据转换为{key: value}形式的数据。

1. **基础知识准备**

   Record<number, T>：得到一个数字索引签名类型，可以兼容数字、可转换为数字的字符串(除xxx.0这种外)；
   
   Record<string, T>：得到一个字符串索引签名类型，可以兼容字符串、数字、symbol、boolean等，但boolean基本不会用到；
   
   ```typescript
   //数字索引签名的特点：可以兼容数字、可转换为数字的字符串(除xxx.0这种外)
   type numSignature = {
       name: string,
       [x: number]: any
   }
   
   let numObj1: numSignature = {name: "zhangsan", 100: "hello"};      //正确
   let numObj2: numSignature = {name: "zhangsan", "100": "hello"};    //正确
   let numObj3: numSignature = {name: "zhangsan", "100.1": "hello"};  //正确
   // let numObj4: numSignature = {name: "zhangsan", "100.0": "hello"};  //错误(特殊)
   // let numObj5: numSignature = {name: "zhangsan", '100a': "hello"};   //错误(100a不能转换为纯数字)
   
   //字符串索引签名的特点：可以兼容字符串、数字、symbol、boolean，前3种用的多，boolean基本不会用到.
   type strSignature = {
       name: string,
       [x: string]: any
   }
   let strObj1: strSignature = {name: "zhangsan", 100: "hello"};       //正确
   let strObj2: strSignature = {name: "zhangsan", "100": "hello"};     //正确
   let strObj3: strSignature = {name: "zhangsan", "100.1": "hello"};   //正确
   let strObj4: strSignature = {name: "zhangsan", "100.0": "hello"};   //正确
   let strObj5: strSignature = {name: "zhangsan", '100a': "hello"};    //正确
   let strObj6: strSignature = {name: "zhangsan", [Symbol()]: "hello"}; //正确
   let strObj7: strSignature = {name: "zhangsan", true: "hello"};      //正确(但一般不这么干)
   
   
   //------------------------------------------------------------------------------------------------
   // 定义Goods接口
   const goodSymid = Symbol("goodid")
   
   interface Goods {
       [goodSymid]: number
       name: string
       price: number
   }
   
   // 实现数据扁平化 [准备]
   // Record类型
   type Record<K extends keyof any, T> = {
       [P in K]: T
   }
   let goodRecord: Record<number, Goods> = {}
   
   //定义一个good对象
   let good: Goods = {[goodSymid]: 101, "name": "苹果", "price": 9}
   // goodRecord[101] = good//0k
   goodRecord[good[goodSymid]] = good
   
   //输出结果:goodRecord: { '101': { name: '苹果', price: 9, [Symbol(goodid)]: 101 } }
   console.log("goodRecord:", goodRecord);
   
   export {}
   
   //-------------------------------------------------------------------------------------------------
   // 定义Goods接口
   const goodSymid = Symbol("goodid")
   
   interface Goods {
       [goodSymid]: number
       name: string
       price: number
   }
   
   // Record类型
   type Record<K extends keyof any, T> = {
       [P in K]: T
   }
   type resultGoodsType = Record<string, Goods>
   let goodRecord: Record<string, Goods> = {}
   let good: Goods = {[goodSymid]: 101, "name": "苹果", "price": 9}
   //{101: { [goodSymid]: 101, "name": "苹果", "price": 9 },
   //香蕉: { [goodSymid]: 101, "name": "苹果", "price": 9 },
   //}
   goodRecord[103] = good;
   goodRecord["香蕉"] = good
   goodRecord[good[goodSymid]] = good
   
   export {}
   ```

- ​		![image-20220501205126191](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205012051640.png)

​	

- ```typescript
  // 定义Goods接口
  const goodSymid = Symbol("goodid")
  
  interface Goods {
      [goodSymid]: number
      name: string
      price: number
  }
  
  // 实现数据扁平化
  // Record类型
  // // S100输出的结果: type Record<{
  //   name: T;
  //   price: T;
  //   [goodSymid]: T;
  // }
  // type Record<T> = {// S100
  //   [P in keyof Goods]: T
  // }
  
  type Record<T> = {
      [P in keyof any]: T
  }
  // 上面相当于：
  // type Record2<T> = {
  //   [x: string]: T,// 字符串索引可以是数字类型,可以是字符串类型，最终都会转换为字符串类型
  //   //[x: number]: T,// 字符串索引可以是数字类型 [x: number]可以最终合成一个数组的索引
  //  //[x:symbol]:T//索引签名参数类型必须为 "string" 或 "number"
  // }
  
  //resultGoodsType ==> {[p: string]: Goods, [p: number]: Goods, [p: symbol]: Goods}
  type resultGoodsType = Record<Goods>
  let goodRecord: Record<Goods> = {}
  let good: Goods = {[goodSymid]: 101, "name": "苹果", "price": 9}
  goodRecord[103] = good;
  goodRecord["香蕉"] = good
  goodRecord[good[goodSymid]] = good
  //输出结果:goodRecord: { '101': { name: '苹果', price: 9, [Symbol(goodid)]: 101 } }
  console.log("goodRecord:", goodRecord);
  
  export {}
  ```

2. **数据扁平化实现方式一：P in K**

   type Record<K extends keyof any, T> = {
   [P in K]: T
   }
   let goodRecord: Record<number, Goods> = {}

   ```typescript
   // 定义Goods接口
   const goodSymid = Symbol("goodid")
   
   interface Goods {
       [goodSymid]: number
       name: string
       price: number
   }
   
   // 模拟后台取出来的商品数据列表
   const goodsList: Goods[] = [
       {
           [goodSymid]: 101,
           "name": "苹果",
           "price": 9
       },
       {
           [goodSymid]: 102,
           "name": "香蕉",
           "price": 3
       },
       {
           [goodSymid]: 103,
           "name": "橘子",
           "price": 3
       }
   ]
   // 需求：把 goodsList扁平化成下面的对象格式
   //{ '101': { name: '苹果', price: 9, [Symbol(goodid)]: 101 }
   //'102': { name: '香蕉', price: 3, [Symbol(goodid)]: 101 },
   // '103': { name: '橘子', price: 3, [Symbol(goodid)]: 101 },
   // }
   
   // 实现数据扁平化
   // Record类型
   type Record<K extends keyof any, T> = {
       [P in K]: T
   }
   let goodRecord: Record<number, Goods> = {}
   goodsList.forEach((goods) => {
       goodRecord[goods[goodSymid]] = goods;
   })
   // 输出：
   // goodRecord: {
   //   '101': { name: '苹果', price: 9, [Symbol(goodid)]: 101 },
   //   '102': { name: '香蕉', price: 3, [Symbol(goodid)]: 102 },
   //   '103': { name: '橘子', price: 3, [Symbol(goodid)]: 103 }
   // }
   console.log("goodRecord:", goodRecord)
   for (let goodid in goodRecord) {
       console.log(goodid, ":", goodRecord[goodid])
   }
   
   export {}
   ```

3. **数据扁平化实现方式二：P in keyof any**

   type Record<T> = {

   [P in keyof any]: T

   }

   ```typescript
   // 定义Goods接口
   const goodSymid = Symbol("goodid")
   
   interface Goods {
       [goodSymid]: number
       name: string
       price: number
   }
   
   // 模拟后台取出来的商品数据列表
   const goodsList: Goods[] = [
       {
           [goodSymid]: 101,
           "name": "苹果",
           "price": 9
       },
       {
           [goodSymid]: 102,
           "name": "香蕉",
           "price": 3
       },
       {
           [goodSymid]: 103,
           "name": "橘子",
           "price": 3
       }
   ]
   // 需求：把 goodsList扁平化成下面的对象格式
   //{ '101': { name: '苹果', price: 9, [Symbol(goodid)]: 101 }
   //'102': { name: '香蕉', price: 3, [Symbol(goodid)]: 101 },
   // '103': { name: '橘子', price: 3, [Symbol(goodid)]: 101 },
   // }
   
   // 实现数据扁平化
   // Record类型
   type Record<T> = {
       [P in keyof any]: T
   }
   let goodRecord: Record<Goods> = {}
   goodsList.forEach((goods) => {
       goodRecord[goods[goodSymid]] = goods;
   })
   // 输出：
   // goodRecord: {
   //   '101': { name: '苹果', price: 9, [Symbol(goodid)]: 101 },
   //   '102': { name: '香蕉', price: 3, [Symbol(goodid)]: 102 },
   //   '103': { name: '橘子', price: 3, [Symbol(goodid)]: 103 }
   // }
   console.log("goodRecord:", goodRecord)
   for (let goodid in goodRecord) {
       console.log(goodid, ":", goodRecord[goodid])
   }
   
   export {}
   ```



### Record与object区别

1. Record 获取到是索引参数类型，所以可以赋初值为{}，而object是再次赋值，比如：goodRecord[103] = good2;

   否则会编译报错，提示103属性不存在于object类型的对象变量中。

2. Record是泛型，获取值可以有自动提示功能，而object无法实现自动提示。

```typescript
const goodSymid = Symbol("goodid")

interface Goods {
    [goodSymid]: number
    name: string
    price: number
}

let good1: Goods = {[goodSymid]: 101, "name": "苹果", "price": 9}
let good2: Goods = {[goodSymid]: 101, "name": "苹果", "price": 9}
// 编译报错，不能新增属性
// let goodRecord = {};
// goodRecord[103] = good2;

// 正确，只能修改属性
let goodRecord = {103: good1};
goodRecord[103] = good2;

// 编译报错，因为 object 类型身上并没有103属性。编译器尝试从object上查找103属性,但object什么属性和方法都没有，
// 只是单纯表示一个对象的类型，Object也不行，因为也没有103属性,直接抛出  类型“Object”上不存在属性“103”。ts(7053)。
// let goodRecord: object = {103: good1};
// goodRecord[103] = good2;
```

​	

### Record与Map的区别

1. Record有多种实现方式，比如：type Record<T> = { [P in keyof any]: T }。这种只有一个泛型的形式，Map如果想做到就需要改底层源码，但是一般不会这么做。

2. Record是属于一个轻量级的type类型，Map相对Record是重量级而且Map需要new出来的，所以要更加占用内存空间。如果读取数据和显示数据频繁，就应该采用Record，如果增删改比较多，那还是使用Map。

   ```typescript
   // 定义Goods接口
   const goodSymid = Symbol("goodid")
   
   interface Goods {
       [goodSymid]: number
       name: string
       price: number
   }
   
   type Record<T> = {
       [P in keyof any]: T
   }
   
   // 实际开发为什么我们在显示数据，数据扁平化时用Record
   //  原因1：是因为Record有多种实现方式，比如S100实现方式，Map就需要改底层源码才能做到【一般是不会改的】
   // // type Record<T> = {// S100
   //   [P in keyof any]: T
   // }
   // 原因2：Record是属于一个轻量级的type类型,Map相对Record是重量级而且Map需要new出来的，所以要更加占用内存空间。
   // 如果读取数据和显示数据频繁，就应该采用Record，如果增删改比较多，那还是使用Map。
   let goodMap = new Map<any, Goods>();
   let good: Goods = {[goodSymid]: 101, "name": "苹果", "price": 9}
   goodMap.set(103, good)
   goodMap.set("香蕉", good)
   goodMap.set(good[goodSymid], good);
   
   export {}
   ```



## 详解Pick

1. Pick快速抓取属性

   Pick 主要用于提取某种数据类型的属性，但实际工作中，主要用来提取接口或 type 定义的对象类型中的属性。常用的场景就是需要从一个接口或type定义的类型中，抽取某几个属性组成一个新的类型【如下面的示例】。为什么不用可选类型？因为抽取哪几个属性是不确定的，除非你所有属性全部定义为可选。为什么重新定义新接口？麻烦、冗余，不够优雅。

   ```typescript
   type Pick<T, K extends keyof T> = {
       [P in K]: T[P]
   }
   
   interface Book {
       ISBN: string
       book_name: string
       book_price: number
       book_store_count: string
       book_publish: string
   }
   
   //type tp = Book["ISBN"]//string
   type PickType = Pick<Book, "ISBN" | "book_name" | "book_price">
   let pickobj: PickType = {
       "ISBN": "101-101",
       "book_name": "解放大西南",
       "book_price": 23.4
   }
   type PickType2 = Pick<Book, "ISBN" | "book_name">
   let pickobj2: PickType2 = {
       "ISBN": "101-101",
       "book_name": "解放大西南"
   }
   
   
   export {}
   ```

   

2. Pick+ Record 综合应用

   ```typescript
   // 应用场景：Todo事项编辑或更新才需要填写描述信息,预览页面只提供标题和完成状态
   // 因为编辑有描述信息【description]信息, 所以不能设置成可选属性。
   // 预览时如何保证只提取 Todo 接口的两个属性呢?
   type Pick<T, K extends keyof T> = {
       // in是类型映射 =for...in 循环迭代所有的K的类型
       [P in K]: T[P]
   }
   
   type ReadOnly<T> = {
       readonly [P in keyof T]: T[P]
   }
   
   type Record<T> = {
       [P in keyof any]: T
   }
   
   interface Todo {
       title: string
       completed: boolean
       description: string
   }
   
   // 作业：怎样实现完成这个数组 只允许保留 title和completed这两个属性
   // 模拟异步从服务器中获取到数据
   let todoList: Todo[] = [
       {
           title: "开发权限管理模块",
           completed: true,
           description: "使用Vue3+typescript来开发"
       },
       {
           title: "年会",
           completed: false,
           description: "12月29号上午开心酒店1楼105"
       }
   ]
   
   //1.得到title、completed属性组成的PickType类型
   type PickType = Pick<Todo, "title" | "completed">;
   
   //2.将PickType的所有属性变为readonly(预览不可修改，编辑则不需要readonly)
   type ReadonlyPickType = ReadOnly<PickType>;
   
   //3.利用Record实现数据扁平化
   type todoRecordType = Record<ReadonlyPickType>;
   let todoRecord: todoRecordType = {}
   todoList.map((todo) => {
       //扁平化以todo的title为key，用todo的title、cmopleted属性组成新对象
       todoRecord[todo["title"]] = {title: todo.title, completed: todo.completed}
       //下面会报错，因为todoRecordType的中不包含description了
       // todoRecord[todo["title"]] = {title: todo.title, completed: todo.completed, description: "hello"}
   })
   console.log(todoRecord);
   
   for (let key in todoRecord) {
       const title = todoRecord[key].title;
       const completed = todoRecord[key].completed;
       console.log(`title:${title}, completed: ${completed}`);
   }
   
   export {}
   ```

   ![image-20220502071546604](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205020715734.png)



## 详解Readonly

**Readonly：将T中的所有属性都变成只读属性。**

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

interface Todo {
    title: string
    completed: boolean
    description: string
}

let todo: Todo = {
    title: "开发权限管理模块",
    completed: true,
    description: "使用Vue3+typescript来开发"
}
//可以修改todo的属性值
todo.title = "测试小姐姐";

type readonlyTodo = Readonly<Todo>;
let readTodo: readonlyTodo = {
    title: "开发权限管理模块",
    completed: true,
    description: "使用Vue3+typescript来开发"
};
//不可以修改readTodo的属性值，会报错：尝试给readonly属性赋值
readTodo.title = "hello world";

export {};
```

![image-20220502080721426](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205020807081.png)

## 详解Partial

**Partial ：一次性将T中的所有属性都变成可选属性。**

type Partial<T> = {
    [P in keyof T]?: T[P]
}

```typescript
interface Todo {
    title: string
    completed: boolean
    description: string
    other?: string//其他信息
    date?: Date// 日期
}

// Partial 一次性将T中的所有属性都变成可选属性
type Partial<T> = {
    [P in keyof T]?: T[P]
}

type pTodo = Partial<Todo>;

let todoItem1: Partial<Todo> = {};
let todoItem2: Partial<Todo> = {title: "hello"};
let todoItem3: Required<Todo> = {
    title: "df",
    completed: true,
    description: "Df",
    other: "all",
    date: new Date()
}

export {}
```

![image-20220502074048501](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205020740209.png)



## 详解Required

Required：将T中的所有属性都变成必选属性. -? 即去除?的意思

type Required<T> = {
    [P in keyof T]-?: T[P];
};

```typescript
interface Todo {
    title: string
    completed: boolean
    description: string
    other?: string//其他信息
    date?: Date// 日期
}

// Required: 将T中的所有属性都变成必选属性. -? 即去除?的意思
type Required<T> = {
    [P in keyof T]-?: T[P];
};

type RTodo = Required<Todo>
//错误
let todoItem1: Required<Todo> = {};
//错误
let todoItem2: Required<Todo> = {
    title: "df",
    completed: true,
    description: "Df",
}
//正确
let todoItem3: Required<Todo> = {
    title: "df",
    completed: true,
    description: "Df",
    other: "all",
    date: new Date()
}


export {}
```

![image-20220502074702208](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205020747827.png)



## 详解Omit

**Omit与Pick相对，主要用于反向抓取数据，它的定义里用到了Pick和Exclude。**

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

```typescript
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface Todo {
    title: string
    completed: boolean
    description: string
}

type TodoPreview = Omit<Todo, "description">;
// 下面3是Omit最终结果的推导过程：
// type TodoPreview = Pick<Todo, Exclude<keyof Todo, "description">>;  //keyof Todo ==> "title"|"completed"|"description"
// type TodoPreview = Pick<Todo, "title" | "completed">;  //Exclude后的结果 ==> "title"|"completed"
// type TodoPreview = { title: string, completed: boolean }; //Pick后的结果

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}

console.log(todo);

export {}
```



## TS高阶类型总结

**TS高级类型可以与React的高阶组件进行类比：**

**React高阶组件：一个返回React组件的函数；**

**TS高级类型：一个返回TS类型的函数（实际上不是函数，可以这么理解，把传入的具体泛型想象成传给函数的参数）；**

1、infer 主要用于函数类型的参数类型、返回值类型的推导，以及集合类型中泛型类型的推导；

2、Extract 主要用于将类型更加明确化，比如将一个父类型精确推断为其子类型、一个联合类型推断为另一个新的联合类型等；

3、Exclude 主要用于排除一些类型，在联合类型中使用时功能与Extract相反；

4、Record 主要用于数据扁平化{key1: value1, key2: value2,...}，类似于JS中的object类型;

5、Pick 主要用于在指定类型中抓取部分属性，组成一个新的类型；

6、Readonly 用于将给定类型的所有属性全部变成只读属性；

7、Partial 用于将给定类型的所有属性全部变成可选属性；

8、Required 用于将给定类型的所有属性全部变成必选属性；

9、Omit 与Pick相对主要用于在指定类型中排除部分属性，剩余属性组成一个新的类型；

**实际上，前面学过的所有高级类型，在TS中都有定义，开发使用时不需要我们再定义，直接拿来用即可。同时，还有一些高级属性这里没有涉及到，可以自行学习研究。**

![image-20220502075226433](../../Library/Application%20Support/typora-user-images/image-20220502075226433.png)



## 拓展1-函数类型extends

函数的继承关系与父子类继承刚好相反，参数少的可以 extends 参数多的(但是相同的参数必须类型一致)，反过来就错了。

```typescript
type func1Type = (one: number, two: string) => string
type func2Type = (one: number) => string

type resultType1 = func1Type extends func2Type ? func1Type : never;  //never
type resultType2 = Extract<func1Type, func2Type>;                    //never
type resultType3 = func2Type extends func1Type ? func2Type : never;  //func2Type
type resultType4 = Extract<func2Type, func1Type>;                    //func2Type
```

```typescript
// func1Type应包含2个参数one、two，但func1Type类型的func3的声明中却只给了一个参数，为什么编译不报错？
// 因为 (one: number) => string 满足 (one: number) => string extends (one: number, two: string) => string
type func1Type = (one: number, two: string) => string
type func2Type = (one: number) => string

let func: func1Type = function (one: number, tow: string): string {
    console.log(`one: ${one}, two: ${tow}`);
    return "abc";
}
func(123, "hello");

let func2: func2Type = function (one: number): string {
    console.log(`one: ${one}`);
    return "abc";
}
func2(123);

let func3: func1Type = function (one: number): string {
    console.log(`one: ${one}`);
    return "abc";
}
// 编译报错
// func3(123);
func3(123, "hello");
```



## 拓展2-Promise的基本架构

```typescript
//定义一组函数类型
type ResolveType = (success: any) => any;
type RejectType = (failed: any) => any;

class Promise {
    public resolveFunc!: ResolveType;
    public rejectFunc!: RejectType;

    constructor(excutor: (resolve: ResolveType, reject: RejectType) => any) {
        this.resolveFunc = (success: any) => {
            console.log("resolveFunc：", success);
        }
        this.rejectFunc = (failed: any) => {
            console.log("rejectFunc：", failed);
        }
        excutor(this.resolveFunc, this.rejectFunc);
    }
}

// 使用格式
new Promise((resolve: ResolveType, reject: RejectType): any => {
    resolve("成功了!");
    reject("失败了!");
});

export {};
```



## 拓展3-TS解构赋值

```typescript
// 3.1 TS 如何使用对象解构
type CustObjType = { custname: string, degree: number }
let custObj: CustObjType = {custname: "wangwu", degree: 123}
// 解构全部属性
let {custname: mycustname, degree: mydegree}: CustObjType = {custname: "wangwu", degree: 123}
console.log(mycustname)//wangwu
console.log(mydegree)//123
// 解构部分属性
let {custname}: CustObjType = {custname: "wangwu", degree: 123}
console.log("single:", custname)//single: wangwu

// 3.2 TS函数中的解构参数
// 接收全部属性
function func(custObj: CustObjType) {
    console.log("func:", custObj.custname)
}

func({custname: "wangwu", degree: 123})//func: wangwu

//  接收部分属性
function func2({custname}: CustObjType) {
    console.log("func2:", custname)
}

func2({custname: "wangwu", degree: 123})//func: wangwu

export {}


//-----------------------------------------------------------------------------------------------------
// 3.3 函数中的参数变量的类型如果是一个函数类型
type funcType = (one: number, two: string) => void

function func(custfunc: funcType) {
    custfunc(23, "abc");
}

// 下面这个函数执行输出的结果为：one: 23 two: abc
func(function (one: number, two: string) {
    console.log("one:", one, "two:", two)
})

// 函数定义类型的参数类型为定义对象类型
type CustObjType = { custname: string, degree: number }
type funcType2 = (one: CustObjType, two: string) => void

//  1
let func2: funcType2 = function (one: CustObjType, two: string) {
    console.log(one.custname, ":", two)
}
let func21: funcType2 = function ({degree}: CustObjType, two: string) {
    console.log(degree, ":", two)
}
func2({custname: "李逵", degree: 23}, "很好")// 李逵 : 很好
func21({custname: "李逵", degree: 23}, "很好")// 23 : 很好

//2
function func3(func2: funcType2) {
    func2({custname: "李逵", degree: 23}, "很好")
}

// func3: 李逵 : 很好
func3(function (one: CustObjType, two: string) {
    console.log("func3:", one.custname, ":", two)
})

// 3
function func4(func2: funcType2) {
    func2({custname: "李逵", degree: 23}, "很好")
}

func4(function ({degree}: CustObjType, two: string) {
    console.log("func4等级:", degree, ":", two)// func4等级: 23 : 很好
})


export {}
```



## 拓展4-class类型的实例

```typescript
class Student {
    public name: string;
    public age: number

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    show() {
        console.log(`name: ${this.name}, age: ${this.age}`);
    }
}

// TS类型推断. stu1 毫无悬念是 Student类型，stu2 是对象字面量类型。
let stu1 = new Student("zhangsan", 30);
let stu2 = {
    name: "lisi",
    age: 32,
    show() {
        console.log(`name: ${this.name}, age: ${this.age}`);
    }
}
console.log("stu1 instanceof Student: ", stu1 instanceof Student)
console.log("stu2 instanceof Student: ", stu2 instanceof Student)

//---------------------------------------------------------------------------------------------------------
// 显示声明类型，stu1、stu2 都是Student类型了。但是 instanceof 关键字判断stu2 instanceof Student不成立.
let stu1: Student = new Student("zhangsan", 30);
let stu2: Student = {
    name: "lisi",
    age: 32,
    show() {
        console.log(`name: ${this.name}, age: ${this.age}`);
    }
}
console.log("stu1 instanceof Student: ", stu1 instanceof Student)
console.log("stu2 instanceof Student: ", stu2 instanceof Student)
```

![image-20220502170506693](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205021705429.png)



显示声明类型后：

![image-20220502170550673](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205021705606.png)

![image-20220502171043309](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205021710418.png)

![image-20220502171142283](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205021711938.png)



虽然 stu2 不满足 instanceof 关键字。但是通过查看：type testType = Extract<typeof stu2, Student>; 的结果发现，testType 是Student，这说明 stu2 满足Student类型的约束条件(extends)，这也是编译不报错的原因。



# 第6章：深入理解装饰器

## 技能大纲

**10-1   本章概述，熟练透彻掌握装饰器对职业发展有何意义？**

**10-2   【装饰器概述】装饰器定义，分类，要解决的问题**

**10-3   【类装饰器】类装饰器的两种实现**

**10-4   【类装饰器底层源码】逐行深剖底层 JS 源码** 

**10-5   【泛型工厂类继承装饰器】 泛型工厂类继承装饰器实现和意义**

**10-6  【泛型工厂类继承装饰器底层源码】逐行深剖+优化底层 JS 源码**

**10-7   【泛型工厂类匿名类+继承装饰器】匿名类在装饰器中的实现**

**10-8  【方法装饰器】 拦截器意义，如何实现前置丶后置拦截器功能？【真实应用场景】**

**10-9  【方法装饰器底层源码】逐行深剖底层 JS 源码**

**10-10  【方法装饰器底层源码 】方法拦截功能功能为什么会失效？**

**10-11  【属性装饰器】属性装饰器应用——顾客等级说明实现 1**

**10-11 【属性装饰器底层源码】   逐行解析底层JS源码 2**

**10-12  【属性丶类丶方法装饰器综合应用】依赖注入+请求方法，控制器初步实现**

**10-13 【原型方法参数装饰器】参数装饰器实现**

**10-14 【参数装饰器底层源码】  逐行解析底层JS源码**

**10-15 【构造器参数装饰器】构造器参数装饰器注入实现**

**10-16  【多个装饰器组合执行】 类丶属性丶方法 丶参数装饰器组合+执行顺序**

**10-17 【元数据】 理解 reflect-metadata 和 常见元数据操作方法**

**10-18   [元数据]   3个重要且特殊的内置元数据key**

**10-19   【仿 Nestjs 装饰器实战准备】依赖注入和它的好处**

**10-20  【仿 Nestjs 装饰器实战准备】 项目分层**

**10-21  【仿 Nestjs 装饰器实战】 单件设计模式构建 Collection**

**10-22  【仿 Nestjs装饰器实战】控制器实现**

**10-23  【仿 Nestjs 装饰器实战】 业务逻辑层装饰器构建**

**10-24  【仿 Nestjs 装饰器实战】 依赖注入和自动装配装饰器构建**

**10-25  【仿 Nestjs 装饰器实战】 升级——函数重载+业务逻辑层装饰器组合实战**

**10-26  【仿 Nestjs 装饰器实战】优化： 元数据如何替换容器保存功能**

**10-27    【仿 Nestjs 装饰器实战】控制器装饰器+路由器功能实现**

**10-28  【仿 Nestjs装饰器实战】多种请求方法装饰器实现**

**10-29  【仿 Nestjs装饰器实战】中间件装饰器实现**

**10-30  【仿 Nestjs装饰器实战】多个方法多个中间件装饰器如何执行？**

**10-31  【仿 Nestjs装饰器实战】业务逻辑层装饰器+控制器装饰器 构建大中项目分层架构**

**10-32  【仿 Nestjs装饰器实战+深度思考题+作业】 数据模型层实现丶优化+优化依赖注入对象调用**



## 掌握装饰器的意义

装饰器是前端了不起的技术革命，弥补了只有后端语言才有 AOP【类似装饰器】的短板，学习装饰器好处有:

1. 较大提升前端架构思维和前端架构能力，装饰器底层蕴含的拦截器思想在 Java Spring, Nestjs框架，python 各种后端语言中都有广泛的应用，而拦截器展示的就是一种架构思维，通过学习装饰器能扩大技术视野，是作为一名前端架构师以及更高职位必会技能。

2. Nestjs 等相对新型的 Nodejs 框架大量运用了 TS 装饰器, 例如： @Controller @Service  @Get @Post 

3. 在面试中，如果告诉面试官，你精通装饰器，这也能成为你的大加分项，因为公司更需架构思维能力强的前端工程师，因为具有架构思维的前端开发人员在大中项目中一定能写出扩展性更好的代码。

纵观本章，囊括了装饰器应用，装饰器底层JS源码，装饰器实战。



## 装饰器概述

### 装饰器定义

装饰器就是一个方法或函数，可以注入到类、方法、属性、参数、对象上，扩展其功能。

**PS：React中的高阶组件本质上也采用了装饰器的思想。**

### 装饰器要解决的问题

装饰器就是解决在不修改原来类、方法、属性、参数的情况下，为其添加额外的功能。比如：为整个项目的所有业务类【假如50个类】的所有方法【假如6个方法】都增加日志信息，如果一个一个的增加，那要增加300次日志调用语句，假如日后日志文件格式发生了改变，也还需要修改300次。 如果有了装饰器，只需要修改一次就可以。这个属于项目中的通用功能，大家了解下即可，后面我们仿 Nestjs 实战时对装饰器的这个特性会有很深的体会。

在 Nestjs 中 装饰器可以解决依赖注入的问题，而依赖注入是 Java等后端语言拥有的非常优秀的编程思想，有了依赖注入，能大大降低项目的耦合度，大大提升项目的可扩展性。

使用和创建分离是依赖注入的核心思想。

### 装饰器分类

常见的装饰器：类装饰器、属性装饰器、方法装饰器、参数装饰器，元数据装饰器。

### 元数据装饰器初步理解

元数据装饰器：在定义类或者类方法或者对象的时候，可以设置一些元数据，我们可以获取到在类与类方法上添加的元数据，需要引入 reflect-metadata 第三方库  采用 @Reflect.metadata来实现。元数据指的是描述东西时用的数据，例如：Reflect.metadata("importinfo", "疫情期间用公筷,戴口罩")。

### 装饰器两种写法

1. 调用时（使用时） 不传递参数的装饰器。

   @Decorator

   class TestClass{

   }

2. 装饰器工厂（调用时 可以传递参数的装饰器）。

   @Decorator("hello")

   class TestClass{

   }



## 类装饰器的实现

### 环境搭建

1. 安装 concurrently 支持合并执行，即可以同时运行多个 script 命令：

   ```js
   npm  i  concurrently -S 或 yarn add  concurrently -S
   npm  i  nodemon -S 或 yarn add  nodemon -S
   ```

2. tsconfig.json 文件修改如下：

   ```js
    --编译输入输出目录	
        "outDir":"./dist",                             
        "rootDir":"./src", 
    -- 消除装饰器警告
    "experimentalDecorators": true,          
    "emitDecoratorMetadata": true,  
   ```

3. 配置 package.json 文件脚本信息

   ```js
   "scripts": {
   
    "dev:build": "tsc -w", 
        
     --监控 dist/teaching 目录中的 js 文件，变化时执行 node 命令     
    "dev:start":"nodemon --watch dist/teaching js --exec  node ./dist/teaching/1ClassDecorator.js",
        
     --合并启动，例如下面执行 npm start 时相当于执行 "dev:build" 和 "dev:start" 2条命令。      
    "start":  "concurrently npm:dev:*"
    
     --命令解决 typescript 编译装饰器类时出现的 bug 
     "tsc":"tsc src/teaching/1ClassDecorator.ts  --target ES5 -w --experimentalDecorators"
       
     --本章后面章节会用到，先配置上
    "ctrl":"ts-node src/controller/HomeController.ts",
   "beginapp": "nodemon --watch src/ -e ts --exec ts-node ./src/expressapp.ts",
    }
   ```

   

### 类装饰器两种实现

1. **类装饰器不带参数**

   ```typescript
   // 不带参数的类装饰器案例：
   function ClassDecorator(targetClass: any) {
       // targetClass 就是被装饰的类
       let target = new targetClass();
       target.buy();
   
       console.log(targetClass.prototype.constructor.name + "信息");
       Object.keys(targetClass.prototype).forEach((methodname) => {
           console.log("方法", methodname)
           let dataprop = Object.getOwnPropertyDescriptor(targetClass.prototype, methodname)
           console.log("方法数据属性:", dataprop);
       })
   }
   
   @ClassDecorator
   class CustomerService {
       name: string = "张三"
   
       constructor() {
   
       }
   
       buy() {
           console.log(this.name + "购买");
       }
   
       placeOrder() {
           console.log(this.name + "下单购买");
       }
   }
   ```

   ![image-20220502212630370](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205022126119.png)

2. **类装饰器带参数**

   ```typescript
   // 带参数类装饰器案例
   function ClassDecoratorWithParams(classinfo: string) {
       return function (targetClass: any) {
           // targetClass 就是被装饰的类
           let target = new targetClass();
           target.buy();
           //输出参数信息
           console.log("classinfo：", classinfo);
   
           console.log(targetClass.prototype.constructor.name + "信息");
           Object.keys(targetClass.prototype).forEach((methodname) => {
               console.log("方法", methodname)
               let dataprop = Object.getOwnPropertyDescriptor(targetClass.prototype, methodname)
               console.log("方法数据属性:", dataprop);
           })
       }
   }
   
   
   @ClassDecoratorWithParams("hello world")
   class CustomerService {
       name: string = "张三"
   
       constructor() {
   
       }
   
       buy() {
           console.log(this.name + "购买");
       }
   
       placeOrder() {
           console.log(this.name + "下单购买");
       }
   }
   ```

   ![image-20220502212514460](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205022125041.png)



### 类装饰器底层源码分析

用 tsc 命令将上一小节的ts代码编译成es5代码。

`"tsc": "tsc src/decorator/decorator01.ts  --target ES5 -w --experimentalDecorators"`

1. **使用时不带参数的类装饰器**

   ```typescript
   // 底层JS组合装饰器和目标类 __decorate函数
   var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
       // argsnum 参数个数
       var argsnum = arguments.length;
       // targetinfo 被装饰器修饰的目标【本案例为类】
       // argsnum=2 装饰器修饰的是类或者构造器参数，targetinfo=target[类名]
       // argsnum=4 装饰器修饰的是方法【第四个参数desc等于null] targetinfo=该方法的数据属性【desc = Object.getOwnPropertyDescriptor(target, key) 】
       // argsnum=3 装饰器修饰的是方法参数或者属性,targetinfo=undefined
       var targetinfo = argsnum < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;//S100
       // decorator保存装饰器数组元素
       var decorator;
       // 元数据信息,支持reflect-metadata元数据
       if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
           targetinfo = Reflect.decorate(decorators, target, key, desc);
       } else {
           //  装饰器循环,倒着循环,说明同一个目标上有多个装饰器，执行顺序是倒着执行
           for (var i = decorators.length - 1; i >= 0; i--) {
               var decorator = decorators[i]
               if (decorator) {
                   // 如果参数小于3【decorator为类装饰器或者构造器参数装饰器】执行decorator(targetinfo)直接执行decorator装饰器，并传递目标targetinfo，这里是类
                   // 如果参数大于3【decorator为方法装饰器】 直接执行 decorator(target, key, targetinfo)
                   // 如果参数等于3 【decorator为方法参数装饰器或者属性装饰器】 直接执行decorator(target, key)
                   // targetinfo最终为各个装饰器执行后的返回值,但如果没有返回值,直接返回第S100行的targetinfo
                   targetinfo = (argsnum < 3 ? decorator(targetinfo) : argsnum > 3 ?
                       decorator(target, key, targetinfo) : decorator(target, key)) || targetinfo;
                   console.log("targetinforesult:", targetinfo)
               }
           }
       }
       argsnum > 3 && targetinfo && Object.defineProperty(target, key, targetinfo);
   
       return targetinfo;
   }
   
   // 不带参数的类装饰器案例：
   function ClassDecorator(targetClass) {
       // targetClass 就是被装饰的类
       var target = new targetClass();
       target.buy();
       console.log(targetClass.prototype.constructor.name + "信息");
       Object.keys(targetClass.prototype).forEach(function (methodname) {
           console.log("方法", methodname);
           var dataprop = Object.getOwnPropertyDescriptor(targetClass.prototype, methodname);
           console.log("方法数据属性:", dataprop);
       });
   }
   
   var CustomerService = /** @class */ (function () {
       function CustomerService() {
           this.name = "张三";
       }
   
       CustomerService.prototype.buy = function () {
           console.log(this.name + "购买");
       };
       CustomerService.prototype.placeOrder = function () {
           console.log(this.name + "下单购买");
       };
     	// _decorator函数的第1个参数是由装饰器函数组成的数组，第2个参数是类名(构造器)
       CustomerService = __decorate([
           ClassDecorator
       ], CustomerService);
       return CustomerService;
   }());
   ```

   

2. **使用时带参数的类装饰器**

   ```typescript
     "use strict";
     var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
         // argsnum 参数个数
         var argsnum = arguments.length;
         // targetinfo 被装饰器修饰的目标【本案例为类】
         // argsnum=2 装饰器修饰的是类或者构造器参数，targetinfo=target[类名]
         // argsnum=4 装饰器修饰的是方法【第四个参数desc等于null] targetinfo=该方法的数据属性【desc = Object.getOwnPropertyDescriptor(target, key) 】
         // argsnum=3 装饰器修饰的是方法参数或者属性,targetinfo=undefined
         var targetinfo = argsnum < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;//S100
         // decorator保存装饰器数组元素
         var decorator;
         // 元数据信息,支持reflect-metadata元数据
         if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
             targetinfo = Reflect.decorate(decorators, target, key, desc);
         } else {
             //  装饰器循环,倒着循环,说明同一个目标上有多个装饰器，执行顺序是倒着执行
             for (var i = decorators.length - 1; i >= 0; i--) {
                 var decorator = decorators[i]
                 if (decorator) {
                     // 如果参数小于3【decorator为类装饰器或者构造器参数装饰器】执行decorator(targetinfo)直接执行decorator装饰器，并传递目标targetinfo，这里是类
                     // 如果参数大于3【decorator为方法装饰器】 直接执行 decorator(target, key, targetinfo)
                     // 如果参数等于3 【decorator为方法参数装饰器或者属性装饰器】 直接执行decorator(target, key)
                     // targetinfo最终为各个装饰器执行后的返回值,但如果没有返回值,直接返回第S100行的targetinfo
                     targetinfo = (argsnum < 3 ? decorator(targetinfo) : argsnum > 3 ?
                         decorator(target, key, targetinfo) : decorator(target, key)) || targetinfo;
                     console.log("targetinforesult:", targetinfo)
                 }
             }
         }
         argsnum > 3 && targetinfo && Object.defineProperty(target, key, targetinfo);
     
         return targetinfo;
     }
     
     Object.defineProperty(exports, "__esModule", {value: true});
     
     // 带参数类装饰器案例
     function ClassDecoratorWithParams(classinfo) {
         return function (targetClass) {
             // targetClass 就是被装饰的类
             var target = new targetClass();
             target.buy();
             //输出参数信息
             console.log("classinfo：", classinfo);
             console.log(targetClass.prototype.constructor.name + "信息");
             Object.keys(targetClass.prototype).forEach(function (methodname) {
                 console.log("方法", methodname);
                 var dataprop = Object.getOwnPropertyDescriptor(targetClass.prototype, methodname);
                 console.log("方法数据属性:", dataprop);
             });
         };
     }
     
     var CustomerService = /** @class */ (function () {
         function CustomerService() {
             this.name = "张三";
         }
     
         CustomerService.prototype.buy = function () {
             console.log(this.name + "购买");
         };
         CustomerService.prototype.placeOrder = function () {
             console.log(this.name + "下单购买");
         };
         // ClassDecoratorWithParams("hello world") 执行完的结果和前面使用时不带参数的装饰器函数一样，后面的逻辑也完全一样。
         CustomerService = __decorate([
             ClassDecoratorWithParams("hello world")
         ], CustomerService);
         return CustomerService;
     }());
   ```

   

## 泛型工厂类继承装饰器

需求：对已经开发好的项目中的任何一个类，创建实例时，打印日志信息，输出哪一个类被创建了，并输出传递了哪些参数信息。

分析：显然对于这样一个需求，不能使用挨个添加的方式，一是数量多，二是扩展性差。下面将使用泛型工厂类继承装饰器的方案来实现。

### 准备工作：一个易混淆的案例

```typescript
class Person {
    name!: string
    age!: number
}

class Student extends Person {
    stuNo!: number
  	
  	method() {
        console.log("method:", this.name, this.age, this.stuNo)
    }
}

// 错误：Person被认为是一个类而不是一个变量，所以不能赋值
Person = Student;

export {};


//----------------------------------------------------------------------------------------
class Person {
    name!: string
    age!: number
}

class Student extends Person {
    stuNo!: number

    method() {
        console.log("method:", this.name, this.age, this.stuNo)
    }
}

// 正确，instance 显然是一个变量，变量可以赋值，并且由于 Student 继承 Person，所以可以赋值成功。
let instance = Person;
instance = Student;

export {};


//----------------------------------------------------------------------------------------
class Person {
    name!: string
    age!: number
}

let targetClass: any = Person;

class Student extends targetClass {
    stuNo!: number

    method() {
        console.log("method:", this.name, this.age, this.stuNo)
    }
}

// 报错，虽然 targetClass 赋值为 Person，但是 extends targetClass 时只看其类型 any，
// 由于 any 类型身上没有 name、age，所以报错(见下图)。
let instance = Person;
instance = Student;

export {};


//----------------------------------------------------------------------------------------
class Person {
    name!: string
    age!: number
}
// targetClass 的类型修改为 new (...args: any) => any
let targetClass: new (...args: any) => any = Person;

class Student extends targetClass {
    stuNo!: number

    method() {
        console.log("method:", this.name, this.age, this.stuNo)
    }
}

// 报错，虽然 targetClass 的类型修改为 new (...args: any) => any ，但还是报一样的错。缺少 name、age 属性。
let instance = Person;
instance = Student;

export {};


//----------------------------------------------------------------------------------------
class Person {
    name!: string
    age!: number
}
// targetClass 的类型修改为 new (...args: any) => Person
let targetClass: new (...args: any) => Person = Person;

class Student extends targetClass {
    stuNo!: number

    method() {
        console.log("method:", this.name, this.age, this.stuNo)
    }
}

// 正确，明确了 targetClass 是一个构造函数，且最终返回的实例一定是 Person，故肯定有 name、age 等属性。
let instance = Person;
instance = Student;

export {};


//----------------------------------------------------------------------------------------
class Person {
    name!: string
    age!: number
}

function assign<T extends new (...args: any) => any>(targetClass: T) {
    return targetClass
}

// 通过函数给 targetClass 变量赋值
let targetClass = assign(Person);

class Student extends targetClass {
    stuNo!: number

    method() {
        console.log("method:", this.name, this.age, this.stuNo)
    }
}

// 正确，assign()执行完后返回的就是Person。
let instance = Person;
instance = Student;

export {};
```



![image-20220503101717410](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205031017461.png)



### 泛型工厂继承装饰器错误示例

报错原因跟上面的例子本质上差不多，extends any 导致。要知道装饰器函数执行完后，返回的结果(这里是 LoggerSonClass) 最终是要赋值给Test(也即被装饰的类)变量的【这段逻辑可以参考上一小节的底层源码分析】，由于这里 LoggerSonClass extends  targetClass 是 any类型，故找不到 name、age 等属性，故不能赋值给Test变量，从而导致编译报错。

```typescript
//  1.完成日志信息的装饰器
function LoggerInfoDecorator(targetClass: any) {
    class LoggerSonClass extends targetClass {
        constructor(...args: any) {
            super(...args)
            console.log("日志信息...targetClass:", targetClass.name);
        }
    }

    return LoggerSonClass
}

// 2. 目标类
// 编译报错，因为 LoggerInfoDecorator(targetClass: any) 参数targetClass是any，LoggerSonClass 继承的也是 any，报错如下：
// Types of construct signatures are incompatible.
// Type 'new (...args: any) => LoggerSonClass' is not assignable to type 'new (name: string) => Test'.
// Type 'LoggerSonClass' is missing the following properties from type 'Test': name, age, eat
@LoggerInfoDecorator
class Test {
    name!: string;
    age!: number

    // 1.先执行原来构造函数
    constructor(name: string) {
        this.name = name;

    }

    eat() {
        console.log(this.name, "吃饭");
    }
}

let test = new Test("wer");

export {}
```



### 泛型工厂继承装饰器正确示例

将 targetClass 的类型由 any 类型改为泛型，泛型的特点是定义时不明确但使用时明确，所以运行时 T 就是Test。因此 LoggerSonClass extends targetClass 就相当于 LoggerSonClass extends Test，故最后返回的 LoggerSonClass 可以赋值给 Test 变量。

```typescript
//  1.完成日志信息的装饰器
function LoggerInfoDecorator<T extends { new(...args: any): any }>(targetClass: T) {
    class LoggerSonClass extends targetClass {
        constructor(...args: any) {
            super(...args)
            console.log("日志信息...targetClass:", targetClass.name);
        }
    }

    return LoggerSonClass
}

// 2. 目标类
@LoggerInfoDecorator
class Test {
    name!: string;
    age!: number

    constructor(name: string) {
        this.name = name;
    }

    eat() {
        console.log(this.name, "吃饭");
    }
}

let test = new Test("wer");


export {}
```



### 泛型工厂类继承装饰器底层源码

TS源码如下，使用tsc命令编译为ES5代码。tsc decorator04.ts --target ES5 --experimentalDecorators

```typescript
// 需求：对已经开发好的项目中的任何一个类，创建实例时，打印日志信息，输出哪一个类被创建了,并输出传递了哪些参数信息

//  1.完成日志信息的装饰器
function LoggerInfoDecorator<T extends { new(...args: any): any }>(targetClass: T) {
    return class LoggerSonClass extends targetClass {
        constructor(...args: any) {
            super(...args)
            console.log("日志信息...targetClass:", (targetClass as any).name);
        }

        methodone() {
            console.log("methodone:", this.name);
        }
    }
}

// 2. 目标类
// @LoggerInfoDecorator
class Test {
    name!: string;
    age!: number

    constructor(name: string) {
        this.name = name;
    }

    eat() {
        console.log(this.name, "吃饭");
    }
}

// 这里我们 new Test() 中的Test是执行装饰器函数后返回的Test的子类LoggerSonClass
let test = new Test("李云龙");
(test as any).methodone();

// 上面2行代码执行后的效果相当于注释掉 @LoggerInfoDecorator 后，然后手动执行下面的代码。
// 为什么要注释掉呢？因为如不注释，则下面的Test已经不是原来的Test了，在@LoggerInfoDecorator的作用下，
// 此时Test的内涵已经变成子类(LoggerSonClass)，执行下面几行代码时，相当于又派生出了一个子类，等于是
// Test的孙子类了。验证这一点很简单，LoggerSonClass构造函数中有一个日志输出"日志信息...targetClass"，
// 注释掉 @LoggerInfoDecorator 只会输出1次，不注释掉则因为super(...args)的缘故会输出2次。
let LoggerSonClass = LoggerInfoDecorator<typeof Test>(Test);
let LoggerSonClassInstance = new LoggerSonClass("赵刚");
LoggerSonClassInstance.methodone();

export {}
```

编译后的ES5源码

```typescript
"use strict";
//  1.  拷贝第五章继承源码代码(相比真正编译后的代码可读性好一些)
let __extends = (function (Son, Parent) {

  function getStaticExtendsWithForIn (Son, Parent) {
    for (let key in Parent) {
      if (Object.prototype.hasOwnProperty.call(Parent, key)) {
        Son[key] = Parent[key]
      }
    }
  }

  function getStaticExtendsWithObjectkeys (Son, Parent) {
    Object.keys(Parent).forEach((key) => {
      Son[key] = Parent[key]
    })
  }

  function getStaticExtendsWithProto (Son, Parent) {
    Son.__proto__ = Parent;
  }

  let MyextendStatics = function (Son, Parent) {
    let MyextendStatics = Object.setPrototypeOf || getStaticExtendsWithForIn ||
      getStaticExtendsWithObjectkeys || getStaticExtendsWithProto
    return MyextendStatics(Son, Parent)
  }

  return function (Son, Parent) {
    MyextendStatics(Son, Parent)
    function Middle () {
      this.constructor = Son;
    }
    if (Parent) {//如果不为空 如果父类存在
      Middle.prototype = Parent.prototype;
      Son.prototype = new Middle()
    } else {// 如果父类不存在
      Son.prototype = Object.create(null)
    }
    console.log("Object.create(null):", Object.create(null));
  }
}())

// 2. 底层JS 组合装饰器和目标类 __decorate 函数
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  // argsnum 参数个数
  var argsnum = arguments.length;
  // targetinfo 被装饰器修饰的目标【类或属性或方法或方法参数，本案例为类】
  // argsnum=2 装饰器修饰的是类或者构造器参数，targetinfo=target[类名]
  // argsnum=4 装饰器修饰的是方法【第四个参数desc等于null] targetinfo=该方法的数据属性【desc = Object.getOwnPropertyDescriptor(target, key) 】
  // argsnum=3 装饰器修饰的是方法参数或者属性,targetinfo=undefined
  var targetinfo = argsnum < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;//S100
  // decorator保存装饰器数组元素
  var decorator;
  // 元数据信息,支持reflect-metadata元数据
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
    targetinfo = Reflect.decorate(decorators, target, key, desc);
  } else
    //  装饰器循环,倒着循环,说明同一个目标上有多个装饰器，执行顺序是倒着执行
    for (var i = decorators.length - 1; i >= 0; i--) {
      // 注意if语句里不是 === 而是 = ，这实际上是个赋值语句，相当于赋值给 decorator 变量后再判空。
      if (decorator = decorators[i]) {
        // 如果参数小于3【decorator为类装饰器或者构造器参数装饰器】执行decorator(targetinfo)直接执行decorator装饰器，并传递目标targetinfo，这里是类
        // 如果参数大于3【decorator为方法装饰器】 直接执行 decorator(target, key, targetinfo) 
        // 如果参数等于3 【decorator为方法参数装饰器或者属性装饰器】 直接执行decorator(target, key)
        // targetinfo最终为各个装饰器执行后的返回值,但如果没有返回值,直接返回第S100行的targetinfo
        targetinfo = (argsnum < 3 ? decorator(targetinfo) : argsnum > 3 ?
          decorator(target, key, targetinfo) : decorator(target, key)) || targetinfo;
        console.log("targetinforesult:", targetinfo)
      }
    }
  return argsnum > 3 && targetinfo && Object.defineProperty(target, key, targetinfo), targetinfo;
}

Object.defineProperty(exports, "__esModule", { value: true });

//  1.完成日志信息的装饰器
function LoggerInfoDecorator(targetClass) {
    return /** @class */ (function (_super) {
        __extends(LoggerSonClass, _super);
        function LoggerSonClass() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            console.log("日志信息...targetClass:", targetClass.name);
            return _this;
        }
        LoggerSonClass.prototype.methodone = function () {
            console.log("methodone:", this.name);
        };
        return LoggerSonClass;
    }(targetClass));
}

// 2. 目标类
var Test = /** @class */ (function () {
    function Test(name) {
        this.name = name;
    }
    Test.prototype.eat = function () {
        console.log(this.name, "吃饭");
    };
    Test = __decorate([
        LoggerInfoDecorator
    ], Test);
    return Test;
}());

// 这里我们 new Test() 中的Test是执行装饰器函数后返回的Test的子类LoggerSonClass
let test = new Test("李云龙");
(test as any).methodone();

// 上面2行代码执行后的效果相当于注释掉 @LoggerInfoDecorator 后，然后手动执行下面的代码。
// 为什么要注释掉呢？因为如不注释，则下面的Test已经不是原来的Test了，在@LoggerInfoDecorator的作用下，
// 此时Test的内涵已经变成子类(LoggerSonClass)，执行下面几行代码时，相当于又派生出了一个子类，等于是
// Test的孙子类了。验证这一点很简单，LoggerSonClass构造函数中有一个日志输出"日志信息...targetClass"，
// 注释掉 @LoggerInfoDecorator 只会输出1次，不注释掉则因为super(...args)的缘故会输出2次。
var LoggerSonClass = LoggerInfoDecorator(Test);
var LoggerSonClassInstance = new LoggerSonClass("赵刚");
LoggerSonClassInstance.methodone();
```



### 泛型工厂类匿名类+继承装饰器

这里的匿名类指的是装饰器函数返回的类，没有指定具体类名。但是JS底层会帮我们生成一个类名。

```typescript
//  1.完成日志信息的装饰器
function LoggerInfoDecorator<T extends { new(...args: any): any }>(targetClass: T) {
    // 返回一个匿名类
    return class extends targetClass {
        constructor(...args: any) {
            super(...args)
            console.log("日志信息...targetClass:", (targetClass as any).name);
        }

        methodone() {
            console.log("methodone:", this.name);
        }
    }
}

// 2. 目标类
@LoggerInfoDecorator
class Test {
    name!: string;
    age!: number

    constructor(name: string) {
        this.name = name;
    }

    eat() {
        console.log(this.name, "吃饭");
    }
}

let test = new Test("李云龙");
(test as any).methodone();

export {}
```

泛型工厂匿名类的ES5源码和上一小节非匿名类几乎完全一样，不同的是这里系统自动生成一个类名。

![image-20220503171458015](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205031714972.png)



## 方法装饰器

### 方法装饰器的实现

targetClassPrototype: any                   方法所在的原型对象空间

key: string                                               方法名  

methodDesc: PropertyDescriptor      方法属性描述对象

```typescript
interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}
```

```typescript
// 1.不带参数的方法装饰器
function MethodDecoratorWithoutParams(targetClassPrototype: any, key: string, methodDesc: PropertyDescriptor) {
    console.log("targetClassPrototype:", targetClassPrototype)
    console.log("key:", key);
    console.log("数据属性:", methodDesc);
    methodDesc.value();
}

// 2.带参数的方法装饰器
function MethodDecoratorWithParams(methodPath: string) {
    console.log("methodPath:", methodPath);
    return function (targetClassPrototype: any, key: string, methodDesc: PropertyDescriptor) {
        console.log("targetClassPrototype:", targetClassPrototype)
        console.log("key:", key);
        console.log("数据属性:", methodDesc);
        methodDesc.value();
    }
}

class RoleService {
    public roleName: string = "管理员"

    constructor() {
    }

    @MethodDecoratorWithoutParams
    distribRoles() {
        console.log("分配角色.....");
    }

    @MethodDecoratorWithParams("/role/manage")
    manageRoles() {
        console.log("管理角色.....");
    }
}

export {}
```

<img src="https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205031743789.png" alt="image-20220503174345340" style="zoom:50%;" />

<img src="https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205031744973.png" alt="image-20220503174438221" style="zoom:50%;" />



### 方法拦截器意义

在方法装饰器中拦截目标类的方法, 可以增强或修改目标类的方法的功能。

比如：增加一个日志信息，修改方法参数进行功能扩展处理。



### 拦截器的前置、后置功能实现

```typescript
// 增强目标类的方法功能的工具类
class StringUtil {
    public static trimSpace(str: string): string {
        return str.replace(/\s+/g, "")
    }
}

function MethodInterceptor(params: any) {
    console.log("params:", params);
    return function (targetClassPrototype: any, methodName: any, methodDesc: PropertyDescriptor) {
        console.log("进入方法装饰器：methodDesc:", methodDesc);
        // 1.1 先保存目标类的方法到targetMethodSave
        let targetMethodSave = methodDesc.value;
        console.log("targetMethodSave:", targetMethodSave);

        // 1.2.让value函数建立新的函数对象空间，value建立一个新的函数后, RoleService对象调用DistribRoles()
        // 会执行value指向的新函数并不会执行原来RoleService目标类中DistribRoles方法。
        methodDesc.value = function (...args: any[]) {
            console.log("this:", this);
            // 迭代所有参数，字符串参数去掉空格
            args = args.map((arg) => {
                if (typeof arg === "string") {
                    return StringUtil.trimSpace(arg);
                }
                return arg;
            })

            console.log("前置拦截args:", args);   //前置拦截
            targetMethodSave.apply(this, args);  //执行原来的逻辑
            console.log("后置拦截:", ".....");    //后置拦截
        }
    }
}

class RoleService {
    public roleName: string = "管理员"

    constructor() {
    }

    @MethodInterceptor("DistribRoles方法")
    DistribRoles(userName: string, isValid: boolean) {
        console.log("执行DistribRoles方法", "分配角色.....");
    }
}

let roleService = new RoleService();
roleService.DistribRoles("张三", true);

export {}
```

![image-20220503184201588](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205031842596.png)



### 方法装饰器底层源码分析

```typescript
"use strict";

// decorators：装饰器数组；target：被装饰的方法所在的类的原型对象空间；key：方法名；desc：方法属性描述器对象
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    // argsnum 参数个数
    var argsnum = arguments.length;
    // targetinfo 被装饰器修饰的目标【类或属性或方法或方法参数】
    // argsnum=2 装饰器修饰的是类或者构造器参数，targetinfo=target[类名]
    // argsnum=4 装饰器修饰的是方法【第四个参数desc等于null] targetinfo=该方法的数据属性【desc = Object.getOwnPropertyDescriptor(target, key) 】
    // argsnum=3 装饰器修饰的是方法参数或者属性,targetinfo=undefined
    var targetinfo = argsnum < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;//S100
    // decorator保存装饰器数组元素
    var decorator;
    // 元数据信息,支持reflect-metadata元数据
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        targetinfo = Reflect.decorate(decorators, target, key, desc);
    } else {
        //  装饰器循环,倒着循环,说明同一个目标上有多个装饰器，执行顺序是倒着执行
        for (var i = decorators.length - 1; i >= 0; i--) {
            if (decorator = decorators[i]) {
                // 如果参数小于3【decorator为类装饰器或者构造器参数装饰器】直接执行decorator(targetinfo)
                // 如果参数大于3【decorator为方法装饰器】 直接执行 decorator(target, key, targetinfo)
                // 如果参数等于3 【decorator为方法参数装饰器或者属性装饰器】 直接执行decorator(target, key)
                // targetinfo最终为各个装饰器执行后的返回值,但如果没有返回值,直接返回第S100行的targetinfo
                targetinfo = (argsnum < 3 ? decorator(targetinfo) : argsnum > 3 ?
                    decorator(target, key, targetinfo) : decorator(target, key)) || targetinfo;
                console.log("targetinforesult:", targetinfo)
            }
        }
    }

    // argsnum > 3 时要执行Object.defineProperty语句，因为调用 Object.getOwnPropertyDescriptor(target, key)
    // 每次都是创建新的对象空间，所以这里的targetinfo与原方法的desc实际上是2个不同的对象，需要重新设置回去。否则执行装饰器函数
    // decorator(target, key, targetinfo) 中的修改targetinfo.value逻辑不会生效。
    argsnum > 3 && targetinfo && Object.defineProperty(target, key, targetinfo);

    return targetinfo;
}

Object.defineProperty(exports, "__esModule", {value: true});

var StringUtil = /** @class */ (function () {
    function StringUtil() {
    }

    StringUtil.trimSpace = function (str) {
        return str.replace(/\s+/g, "");
    };
    return StringUtil;
}());

function MethodInterceptor(params) {
    console.log("params:", params);
    return function (targetClassPrototype, methodName, methodDesc) {
        console.log("进入方法装饰器：methodDesc:", methodDesc);
        // 1.1 先保存目标类的方法到targetMethodSave
        var targetMethodSave = methodDesc.value;
        console.log("targetMethodSave:", targetMethodSave);
        // 1.2.让value函数建立新的函数对象空间，value建立一个新的函数后, RoleService对象调用DistribRoles()
        // 会执行value指向的新函数并不会执行原来RoleService目标类中DistribRoles方法。
        methodDesc.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log("this:", this);
            // 迭代所有参数，字符串参数去掉空格
            args = args.map(function (arg) {
                if (typeof arg === "string") {
                    return StringUtil.trimSpace(arg);
                }
                return arg;
            });
            console.log("前置拦截args:", args); //前置拦截
            targetMethodSave.apply(this, args); //执行原来的逻辑
            console.log("后置拦截:", "....."); //后置拦截
        };
    };
}

var RoleService = /** @class */ (function () {
    function RoleService() {
        this.roleName = "管理员";
    }

    RoleService.prototype.DistribRoles = function (userName, isValid) {
        console.log("执行DistribRoles方法", "分配角色.....");
    };
    __decorate([
        MethodInterceptor("DistribRoles方法")
    ], RoleService.prototype, "DistribRoles", null);
    return RoleService;
}());

var roleService = new RoleService();
roleService.DistribRoles("张三", true);
```



## 属性装饰器

### 属性装饰器的实现

```typescript
// 属性装饰器
function loginProperty(params: any) {
    console.log("params:", params);
    // targetClassPrototype：属性所在类的原型对象空间；attrName：被装饰器修饰的属性名(本例就是custname)
    return function (targetClassPrototype: object, attrName: string | symbol) {
        console.log("targetClassPrototype：", targetClassPrototype);
        console.log("attrName：", attrName);
        // 给属性所在类扩展一个静态方法 custLevelDescri.
        (targetClassPrototype.constructor as any).custLevelDescri = function () {
            console.log("消费5000元升级为贵宾");
            console.log("消费10000元升级为贵宾,赠送微波炉一个");
        }
    }
}

// 顾客目标类
class CustomerService {
    public custname: string = "王五"

    @loginProperty("顾客登记")
    public degree!: string

    constructor() {
    }

    show() {
        console.log("顾客名:", this.custname)
    }
}

(CustomerService as any).custLevelDescri()
```



### 属性装饰器底层源码分析

```typescript
"use strict";

// decorators：装饰器数组；target：被装饰的方法所在的类的原型对象空间；key：方法名；desc：方法属性描述器对象
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    // argsnum 参数个数
    var argsnum = arguments.length;
    // targetinfo 被装饰器修饰的目标【类或属性或方法或方法参数】
    // argsnum=2 装饰器修饰的是类或者构造器参数，targetinfo=target[类名]
    // argsnum=3 装饰器修饰的是方法参数或者属性,targetinfo=undefined
    // argsnum=4 装饰器修饰的是方法或属性。【第四个参数desc等于null] targetinfo=该方法的数据属性【desc = Object.getOwnPropertyDescriptor(target, key) 】;
    // 注意：属性装饰器 若使用npm run tsc命令，则argsnum是3，若直接对单个文件使用tsc命令，则argsnum是4，但第4个参数是void 0【可以理解为undefined】。targetinfo=undefined
    var targetinfo = argsnum < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;//S100
    // decorator保存装饰器数组元素
    var decorator;
    // 元数据信息,支持reflect-metadata元数据
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        targetinfo = Reflect.decorate(decorators, target, key, desc);
    } else {
        //  装饰器循环,倒着循环,说明同一个目标上有多个装饰器，执行顺序是倒着执行
        for (var i = decorators.length - 1; i >= 0; i--) {
            if (decorator = decorators[i]) {
                // 如果参数小于3【decorator为类装饰器或者构造器参数装饰器】直接执行decorator(targetinfo)
                // 如果参数大于3【decorator为方法装饰器或者属性装饰器】 直接执行 decorator(target, key, targetinfo)，
                // 特殊地当为属性装饰器时，targetinfo=undefined，decorator(target, key, undefined) 和 decorator(target, key) 执行效果一样。
                // 如果参数等于3 【decorator为方法参数装饰器或者属性装饰器】 直接执行decorator(target, key)
                // targetinfo最终为各个装饰器执行后的返回值,但如果没有返回值,直接返回第S100行的targetinfo
                targetinfo = (argsnum < 3 ? decorator(targetinfo) : argsnum > 3 ?
                    decorator(target, key, targetinfo) : decorator(target, key)) || targetinfo;
                console.log("targetinforesult:", targetinfo)
            }
        }
    }
    // 属性装饰器的 targetinfo=undefined，故 Object.defineProperty 不会执行。
    argsnum > 3 && targetinfo && Object.defineProperty(target, key, targetinfo);

    return targetinfo;
}

Object.defineProperty(exports, "__esModule", {value: true});

// 属性装饰器
function loginProperty(params) {
    console.log("params:", params);
    // targetClassPrototype：属性所在类的原型对象空间；attrName：被装饰器修饰的属性名(本例就是custname)
    return function (targetClassPrototype, attrName) {
        console.log("targetClassPrototype：", targetClassPrototype);
        console.log("attrName：", attrName);
        // 给属性所在类扩展一个静态方法 custLevelDescri.
        targetClassPrototype.constructor.custLevelDescri = function () {
            console.log("消费5000元升级为贵宾");
            console.log("消费10000元升级为贵宾,赠送微波炉一个");
        };
    };
}

// 顾客目标类
var CustomerService = /** @class */ (function () {
    function CustomerService() {
        this.custname = "王五";
    }

    CustomerService.prototype.show = function () {
        console.log("顾客名:", this.custname);
    };
    // void 0 这里就理解为undefined
    __decorate([
        loginProperty("顾客登记")
    ], CustomerService.prototype, "degree", void 0);
    return CustomerService;
}());
CustomerService.custLevelDescri();
```



## 类、方法、属性装饰器综合案例

- 需使用第三方元数据库 reflect-metadata， npm install reflect-metadata -S。元数据是指为了帮助类，方法，属性实现一定的功能，而附加在其上的一些数据。可以分为：内置元数据和自定义元数据  [参考文档](https://www.npmjs.com/package/reflect-metadata)。
- 多个装饰器执行顺序：1.属性装饰器 ==> 2.方法参数装饰器 ==> 3.方法装饰器 ===> 4.类装饰器。

1. 集合类Collection

   ```typescript
   // 1 集合类---单例设计模式
   class Collection<T = any> {
       static collection: Collection
   
       public static getInstance() {
           if (!this.collection) {
               this.collection = new Collection();
           }
           return this.collection
       }
   
       private constructor() {
       }
   
       private containerMap = new Map<string | symbol, any>();
   
       public set(id: string | symbol, value: T): void {
           this.containerMap.set(id, value);
       }
   
       public get(id: string | symbol): T {
           return this.containerMap.get(id);
       }
   
       public has(id: string | symbol): Boolean {
           return this.containerMap.has(id);
       }
   }
   
   export default Collection.getInstance();
   ```

2. UserService 业务类

   ```typescript
   // 2 编写业务类
   export class UserService {
       pname: string = "人民"
   
       constructor() {
           console.log("创建UserService类对象");
       }
   
       public login() {
           console.log(this.pname + "登录....");
       }
   }
   ```

3. Inject属性装饰器

   ```typescript
   import 'reflect-metadata'
   
   type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void
   
   // 返回值类型指定好了后，返回的函数的参数类型就可以省略，提高代码可读性。
   export function Inject(injectid: string): MyPropDecorator {
       return (targetClassPrototype, propertyKey) => {
           console.log("进入属性装饰器.....");
           // PropClass=UserService类，design:type 是reflect-metadata库内置的元数据，通过getMetadata方法可以拿到propertyKey的类型。
           let PropClass = Reflect.getMetadata("design:type", targetClassPrototype, propertyKey);
   
           // PropClass 实际上就是 new UserService()
           let PropClassObj = new PropClass();
   
           // 在属性propertyKey上自定义元数据
           Reflect.defineMetadata("prop", "attr metadata", targetClassPrototype, propertyKey)
       }
   }
   ```

4. get方法装饰器

   ```typescript
   import 'reflect-metadata'
   
   type MyMethodDecoratorType = (targetClassPrototype: any, methodname: string, dataprops: PropertyDescriptor) => void
   
   // 指定返回值类型后，内部返回的匿名函数的参数的类型就可以省略了，会自动推断出来。
   export function get(reqPath: string): MyMethodDecoratorType {
       return function (targetClassPrototype, methodname, dataprops) {
           console.log("进入到方法饰器", "path:", reqPath);
           // TargetClass 本例就是 UserController.
           // let TargetClass = targetClassPrototype.constructor;
           // let TargetClassObj = new TargetClass();
   
           // 给methodname对应的方法添加自定义的元数据
           Reflect.defineMetadata("path", reqPath, targetClassPrototype, methodname);
       }
   }
   ```

5. controller类装饰器

   ```typescript
   import 'reflect-metadata'
   
   export default function ControllerDecorator(rootPath: string) {
       return function <T extends { new(...args: any[]): any }>(targetClass: T) {
           console.log("进入类装饰器.....");
           // Object.keys(targetClass.prototype) 得到的是targetClass类上的所有成员方法。
           Object.keys(targetClass.prototype).forEach((methodnamekey) => {
               // 请求路径
               let reqPath = Reflect.getMetadata("path", targetClass.prototype, methodnamekey);
               console.log("reqPath:", reqPath);
               // 完整路径
               let fullPath = rootPath.replace(/\/$/, "") + "/" + reqPath.replace(/^\//, "");
               console.log("fullPath:", fullPath);
   
               console.log("获取属性上的元数据", Reflect.getMetadata("prop", targetClass.prototype, "userService"));
           })
       }
   }
   ```

6. UserController控制器

   ```typescript
   import {UserService} from './userservice'
   import Collection from "./collection";
   import {Inject} from './injectdecorator'
   import {get} from './methoddecorator'
   import Controller from './controller'
   
   // 装饰器执行顺序：1.属性装饰器 ==> 2.方法参数装饰器 ==> 3.方法装饰器 ===> 4.类装饰器.
   @Controller("/home/user")
   class UserController {
       constructor() {
           console.log("UserController构造器函数....");
       }
   
       @Inject("userService")
       private userService!: UserService
   
       @get("/login")
       public login(): void {
           console.log("执行登录.....");
           // let userService = Collection.get("userService");
           // userService.login();
       }
   }
   
   console.log("=========================================");
   let controller = new UserController();
   controller.login();
   
   export {}
   ```

控制台输出：

![image-20220503230900875](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205032309546.png)



## 参数装饰器

### 参数装饰器的实现

```typescript
function UrlParam(params: any) {
    /**
     * targetClassPrototype：参数所在方法对应的原型对象空间
     * methodname：参数所在的方法名称
     * paramindex：参数的索引位置，从0开始
     */
    return function paramDecorator(targetClassPrototype: any, methodname: string, paramindex: number) {
        console.log("targetClassPrototype:", targetClassPrototype)
        console.log("methodname:", methodname);
        console.log("paramindex:", paramindex);
        targetClassPrototype.info = params
    }
}

class People {
    eat(@UrlParam("地址信息") address: string, who: string) {
        console.log("address:", address);
    }
}

export {}
```



### 参数装饰器底层源码分析

相比之前学过的类、方法、属性装饰器，方法参数装饰器在执行 __decorate方法之前，先将原装饰器函数封装了一层，目的是为了在编译期间就明确被装饰器修饰的参数的索引位置，然后封装到闭包函数中，运行时就可以直接使用。

```typescript
"use strict";
// 1. 底层JS 组合装饰器和目标类 __decorate函数
// decorators：装饰器数组；target：被装饰参数的方法所在的类的原型对象空间；key：方法名；desc：方法属性描述器对象
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    // argsnum 参数个数
    var argsnum = arguments.length;
    // targetinfo 被装饰器修饰的目标【类或属性或方法或方法参数】
    // argsnum=2 装饰器修饰的是类或者构造器参数，targetinfo=target[类名]
    // argsnum=3 装饰器修饰的是方法参数或者属性,targetinfo=undefined
    // argsnum=4 装饰器修饰的是方法或属性。【第四个参数desc等于null] targetinfo=该方法的数据属性【desc = Object.getOwnPropertyDescriptor(target, key) 】;
    // 注意：属性装饰器 若使用npm run tsc命令，则argsnum是3，若直接对单个文件使用tsc命令，则argsnum是4，但第4个参数是void 0【可以理解为undefined】。targetinfo=undefined
    var targetinfo = argsnum < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;//S100
    // decorator保存装饰器数组元素
    var decorator;
    // 元数据信息,支持reflect-metadata元数据
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        targetinfo = Reflect.decorate(decorators, target, key, desc);
    } else {
        //  装饰器循环,倒着循环,说明同一个目标上有多个装饰器，执行顺序是倒着执行
        for (var i = decorators.length - 1; i >= 0; i--) {
            if (decorator = decorators[i]) {
                // 如果参数小于3【decorator为类装饰器或者构造器参数装饰器】直接执行decorator(targetinfo)
                // 如果参数大于3【decorator为方法装饰器或者属性装饰器】 直接执行 decorator(target, key, targetinfo)，
                // 特殊地当为属性装饰器时，targetinfo=undefined，decorator(target, key, undefined) 和 decorator(target, key) 执行效果一样。
                // 如果参数等于3 【decorator为方法参数装饰器或者属性装饰器】 直接执行decorator(target, key)
                // targetinfo最终为各个装饰器执行后的返回值,但如果没有返回值,直接返回第S100行的targetinfo
                targetinfo = (argsnum < 3 ? decorator(targetinfo) : argsnum > 3 ?
                    decorator(target, key, targetinfo) : decorator(target, key)) || targetinfo;
                console.log("targetinforesult:", targetinfo)
            }
        }
    }
    // 如果是属性装饰器的 targetinfo=undefined，故 Object.defineProperty 不会执行。
    argsnum > 3 && targetinfo && Object.defineProperty(target, key, targetinfo);

    return targetinfo;
}

// 2. 带参数的装饰器
function UrlParam(params) {
    /**
     * targetClassPrototype：参数所在方法对应的原型对象空间
     * methodname：参数所在的方法名称
     * paramindex：参数的索引位置，从0开始
     */
    return function paramDecorator(targetClassPrototype, methodname, paramindex) {
        console.log("targetClassPrototype:", targetClassPrototype);
        console.log("methodname:", methodname);
        console.log("paramindex:", paramindex);
        targetClassPrototype.info = params;
    };
}

// 3. 封装带参数装饰器
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

Object.defineProperty(exports, "__esModule", { value: true });

var People = /** @class */ (function () {
    function People() {
    }
    People.prototype.eat = function (address, who) {
        console.log("address:", address);
    };
    __decorate([
        __param(0, UrlParam("地址信息"))
    ], People.prototype, "eat", null);
    return People;
}());
```



## 构造器参数装饰器

步骤  

1. 先安装 reflect-metadata 第三方元数据包
2. UserController 控制器类实现
3. UserService 业务类实现
4. 保存对象的集合类实现 【单件设计模式】
5. 构造参数装饰器实现



### 构造器参数装饰器案例

1. Collection工具类

   ```typescript
   // 单例设计模式
   export class Collection<T = any> {
       static collection: Collection = new Collection();
   
       private constructor() {
           console.log("Collection实例化.....");
       }
   
       private containerMap = new Map<string | symbol, any>();
   
       public set(id: string | symbol, value: T): void {
           this.containerMap.set(id, value);
       }
   
       public get(id: string | symbol): T {
           return this.containerMap.get(id);
       }
   
       public has(id: string | symbol): Boolean {
           return this.containerMap.has(id);
       }
   }
   
   export default Collection.collection;
   ```

2. UserService业务类

   ```typescript
   export default class UserService {
       constructor() {
           console.log("UserService构造器执行.....");
       }
   
       pname: string = "人民"
   
       public login() {
           console.log(this.pname + "登录....");
       }
   }
   ```

3. **InjectContructorDecorator 构造参数装饰器**

   ```typescript
   import 'reflect-metadata'
   import collectionInstance from './Collection'
   
   type MyParameterDecorator = (target: Object, paramname: string | symbol, parameterIndex: number) => void;
   
   export function InjectContructor(injectid?: string): MyParameterDecorator {
       /**
        * targetClass：类，不是类的原型对象空间。
        * paramname：构造参数名称
        * paramindex：构造参数的索引位置
        */
       return (targetClass, paramname, paramindex) => {
           console.log("targetClass:", targetClass)
           console.log("paramname:", paramname)
           console.log("paramindex:", paramindex)
           // design:paramtypes 是reflect-metadata 库内置的元数据，这里用于获取所有构造参数对应的数据类型组成的数组.
           const constructorParamArr = Reflect.getMetadata("design:paramtypes", targetClass);
           // 本例 paramindex 位置对应的参数类型就是 UserService。
           let constrParamArrObj = new constructorParamArr[paramindex]()
           console.log("constrParamArrObj:", constrParamArrObj);
           // 存储到容器中供外部使用
           collectionInstance.set(injectid!, constrParamArrObj);
       }
   }
   
   export {}
   ```

4. UserController控制器

   ```typescript
   import {InjectContructor} from './InjectContructorDecorator'
   import UserService from './UserService'
   import collectionInstance from './Collection'
   
   class UserController {
     	// 通过依赖注入的方式得到 userService 实例，达到对象使用和创建分离的目的，让代码松耦合。
       constructor(@InjectContructor("userService") private userService?: UserService,
                   private count?: string) {
       }
   
       public login() {
           let peopleServiceInstace = collectionInstance.get("userService");
           peopleServiceInstace && peopleServiceInstace.login();
       }
   }
   
   //创建控制器实例并调用login方法
   let controller = new UserController();
   controller.login();
   ```

   ![image-20220504084350854](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205040843752.png)



### 构造器参数装饰器底层源码

这里只截取了UserController 中的源码。通过下面一段代码可看出，传递给__decorate() 的只有2个参数，一个是装饰器数组，一个是类名UserController。

UserController = __decorate([
        __param(0, (0, InjectContructorDecorator_1.InjectContructor)("userService")),
        __metadata("design:paramtypes", [UserService_1.default, String])
    ], UserController);

```typescript
"use strict";

// 1. 底层JS 组合装饰器和目标类 __decorate函数
// decorators：装饰器数组；target：被装饰参数的方法所在的类的原型对象空间；key：方法名；desc：方法属性描述器对象
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    // argsnum 参数个数
    var argsnum = arguments.length;
    // targetinfo 被装饰器修饰的目标【类或属性或方法或方法参数】
    // argsnum=2 装饰器修饰的是类或者构造器参数，targetinfo=target[类名]
    // argsnum=3 装饰器修饰的是方法参数或者属性,targetinfo=undefined
    // argsnum=4 装饰器修饰的是方法或属性。【第四个参数desc等于null] targetinfo=该方法的数据属性【desc = Object.getOwnPropertyDescriptor(target, key) 】;
    // 注意：属性装饰器 若使用npm run tsc命令，则argsnum是3，若直接对单个文件使用tsc命令，则argsnum是4，但第4个参数是void 0【可以理解为undefined】。targetinfo=undefined
    var targetinfo = argsnum < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;//S100
    // decorator保存装饰器数组元素
    var decorator;
    // 元数据信息,支持reflect-metadata元数据
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        targetinfo = Reflect.decorate(decorators, target, key, desc);
    } else {
        //  装饰器循环,倒着循环,说明同一个目标上有多个装饰器，执行顺序是倒着执行
        for (var i = decorators.length - 1; i >= 0; i--) {
            if (decorator = decorators[i]) {
                // 如果参数小于3【decorator为类装饰器或者构造器参数装饰器】直接执行decorator(targetinfo)
                // 如果参数大于3【decorator为方法装饰器或者属性装饰器】 直接执行 decorator(target, key, targetinfo)，
                // 特殊地当为属性装饰器时，targetinfo=undefined，decorator(target, key, undefined) 和 decorator(target, key) 执行效果一样。
                // 如果参数等于3 【decorator为方法参数装饰器或者属性装饰器】 直接执行decorator(target, key)
                // targetinfo最终为各个装饰器执行后的返回值,但如果没有返回值,直接返回第S100行的targetinfo
                targetinfo = (argsnum < 3 ? decorator(targetinfo) : argsnum > 3 ?
                    decorator(target, key, targetinfo) : decorator(target, key)) || targetinfo;
                console.log("targetinforesult:", targetinfo)
            }
        }
    }
    // 如果是属性装饰器的 targetinfo=undefined，故 Object.defineProperty 不会执行。
    argsnum > 3 && targetinfo && Object.defineProperty(target, key, targetinfo);

    return targetinfo;
}


var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });

var InjectContructorDecorator_1 = require("./InjectContructorDecorator");
var UserService_1 = __importDefault(require("./UserService"));
var Collection_1 = __importDefault(require("./Collection"));

var UserController = /** @class */ (function () {
    function UserController(userService, count) {
        this.userService = userService;
        this.count = count;
    }
    UserController.prototype.login = function () {
        var peopleServiceInstace = Collection_1.default.get("userService");
        peopleServiceInstace && peopleServiceInstace.login();
    };
    
    UserController = __decorate([
        __param(0, (0, InjectContructorDecorator_1.InjectContructor)("userService")),
        __metadata("design:paramtypes", [UserService_1.default, String])
    ], UserController);
    return UserController;
}());

//创建控制器实例并调用login方法
var controller = new UserController();
controller.login();
```



## 多个装饰器组合执行

1. 类、属性、方法 、参数装饰器组合案例实现

2. 执行顺序

3. 底层源码

   

### 多个装饰器组合案例

**顺序：属性装饰器-->方法1参数装饰器-->方法1装饰器-->方法2参数装饰器-->方法2装饰器-->......-->构造器参数装饰器-->类装饰器。**

```typescript
// 多个装饰器组合执行顺序如下：
// 属性装饰器-->方法1参数装饰器-->方法1装饰器-->方法2参数装饰器-->方法2装饰器-->......-->构造器参数装饰器-->类装饰器.
// 1.  类丶属性丶方法 丶参数装饰器组合案例实现   2.  执行顺序
function firstMethodDecorator(targetClassPrototype: any, methodname: string) {
    console.log("=============执行第一个方法装饰器==============")
    console.log("类名:", targetClassPrototype)//  类原型对象变量   URLInfo { show: [Function] }
    console.log("方法名:", methodname);//key
}


function secondMethodDecorator(params: string) {
    return function (targetClassPrototype: any, methodname: string) {
        console.log("=============执行第二个方法装饰器==============")
        console.log("类名:", targetClassPrototype)//  类原型对象变量   URLInfo { show: [Function] }
        console.log("方法名:", methodname);//key
    }
}

function paramDecorator(targetClassPrototype: any, paramname: string, paramindex: number) {
    console.log("=============执行参数装饰器==============")
    console.log("targetClassPrototype:", targetClassPrototype);
    console.log("参数名:", paramname);
    console.log("参数索引:", paramindex);
}


function UrlPropDecorator(targetClassPrototype: any, attrname: any) {
    console.log("=============执行属性装饰器==============")
    console.log("targetClassPrototype:", targetClassPrototype);
    console.log("属性名:", attrname);
}


function URLInfoDecorator(targetClassPrototype: any) {
    console.log("==========类装饰器============")
    console.log("targetClassPrototype:", targetClassPrototype);
}

function constructorDecorator(params: any) {
    return function (targetClassPrototype: any, paramname: string, paramindex: number) {
        console.log("==========构造器参数装饰器============")
        console.log("构造器参数装饰器", targetClassPrototype);
        console.log("构造器参数名为:", paramname);
        console.log("构造器参数索引位置:", paramindex);
    }
}

@URLInfoDecorator
class URLInfo {
    constructor(@constructorDecorator("url") public uri: string) {

    }

    @UrlPropDecorator
    public url: string = "https://www.imooc.com"


    @firstMethodDecorator
    methodOne(@paramDecorator data: string) {
        console.log("this:", this);
        console.log("目标类:", this.uri)
    }

    @secondMethodDecorator("yes")
    methodTwo(@paramDecorator address: string) {
        console.log(address)
    }
}

export {}
```

![image-20220504173002266](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205041730830.png)



### 多个装饰器组合底层源码分析

```typescript
"use strict";

/**
 * decorators：装饰器数组
 * target：被装饰的目标----类(类装饰器或构造参数装饰器)；原型对象空间(方法装饰器、方法参数装饰器、属性装饰器)；
 * key：方法名或属性名-----方法名(方法装饰器、方法参数装饰器)；属性名(属性装饰器)；
 * desc：属性描述器对象----null(方法装饰器、方法参数装饰器)；void 0[等价于undefined]（属性装饰器）
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    // argsnum 参数个数
    var argsnum = arguments.length;
    // targetinfo 被装饰器修饰的目标【类或属性或方法或方法参数】
    // argsnum=2 装饰器修饰的是类或者构造器参数，targetinfo=target[类名]
    // argsnum=3 装饰器修饰的是方法参数或者属性,targetinfo=undefined
    // argsnum=4 装饰器修饰的是方法或属性。【第四个参数desc等于null] targetinfo=该方法的数据属性【desc = Object.getOwnPropertyDescriptor(target, key) 】;
    // 注意：属性装饰器 若使用npm run tsc命令，则argsnum是3，若直接对单个文件使用tsc命令，则argsnum是4，但第4个参数是void 0【可以理解为undefined】。targetinfo=undefined
    var targetinfo = argsnum < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;//S100
    // decorator保存装饰器数组元素
    var decorator;
    // 元数据信息,支持reflect-metadata元数据
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        targetinfo = Reflect.decorate(decorators, target, key, desc);
    } else {
        //  装饰器循环,倒着循环,说明同一个目标上有多个装饰器，执行顺序是倒着执行
        for (var i = decorators.length - 1; i >= 0; i--) {
            if (decorator = decorators[i]) {
                // 如果参数小于3【decorator为类装饰器或者构造器参数装饰器】直接执行decorator(targetinfo)
                // 如果参数大于3【decorator为方法装饰器或者属性装饰器】 直接执行 decorator(target, key, targetinfo)，
                // 特殊地当为属性装饰器时，targetinfo=undefined，decorator(target, key, undefined) 和 decorator(target, key) 执行效果一样。
                // 如果参数等于3 【decorator为方法参数装饰器或者属性装饰器】 直接执行decorator(target, key)
                // targetinfo最终为各个装饰器执行后的返回值,但如果没有返回值,直接返回第S100行的targetinfo
                targetinfo = (argsnum < 3 ? decorator(targetinfo) : argsnum > 3 ?
                    decorator(target, key, targetinfo) : decorator(target, key)) || targetinfo;
                console.log("targetinforesult:", targetinfo)
            }
        }
    }
    // 如果是属性装饰器的 targetinfo=undefined，故 Object.defineProperty 不会执行。
    argsnum > 3 && targetinfo && Object.defineProperty(target, key, targetinfo);

    return targetinfo;
}

var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    }
};
Object.defineProperty(exports, "__esModule", {value: true});

// 多个装饰器组合执行顺序如下：
// 属性装饰器-->方法1参数装饰器-->方法1装饰器-->方法2参数装饰器-->方法2装饰器-->......-->构造器参数装饰器-->类装饰器.
function firstMethodDecorator(targetClassPrototype, methodname) {
    console.log("=============执行第一个方法装饰器==============");
    console.log("类名:", targetClassPrototype); //  类原型对象变量   URLInfo { show: [Function] }
    console.log("方法名:", methodname); //key
}

function secondMethodDecorator(params) {
    return function (targetClassPrototype, methodname) {
        console.log("=============执行第二个方法装饰器==============");
        console.log("类名:", targetClassPrototype); //  类原型对象变量   URLInfo { show: [Function] }
        console.log("方法名:", methodname); //key
    };
}

function paramDecorator(targetClassPrototype, paramname, paramindex) {
    console.log("=============执行参数装饰器==============");
    console.log("targetClassPrototype:", targetClassPrototype);
    console.log("参数名:", paramname);
    console.log("参数索引:", paramindex);
}

function UrlPropDecorator(targetClassPrototype, attrname) {
    console.log("=============执行属性装饰器==============");
    console.log("targetClassPrototype:", targetClassPrototype);
    console.log("属性名:", attrname);
}

function URLInfoDecorator(targetClassPrototype) {
    console.log("==========类装饰器============");
    console.log("targetClassPrototype:", targetClassPrototype);
}

function constructorDecorator(params) {
    return function (targetClassPrototype, paramname, paramindex) {
        console.log("==========构造器参数装饰器============");
        console.log("构造器参数装饰器", targetClassPrototype);
        console.log("构造器参数名为:", paramname);
        console.log("构造器参数索引位置:", paramindex);
    };
}

var URLInfo = /** @class */ (function () {
    function URLInfo(uri) {
        this.uri = uri;
        this.url = "https://www.imooc.com";
    }

    URLInfo.prototype.methodOne = function (data) {
        console.log("this:", this);
        console.log("目标类:", this.uri);
    };
    URLInfo.prototype.methodTwo = function (address) {
        console.log(address);
    };

    // 属性装饰器
    __decorate([
        UrlPropDecorator
    ], URLInfo.prototype, "url", void 0);

    // 方法1装饰器(__decorate函数中遍历执行装饰器是倒序遍历的方式，故本数组中方法装饰器在方法参数装饰器的前面，而执行时恰好相反)
    __decorate([
        firstMethodDecorator,
        __param(0, paramDecorator)
    ], URLInfo.prototype, "methodOne", null);

    // 方法2装饰器(__decorate函数中遍历执行装饰器是倒序遍历的方式，故本数组中方法装饰器在方法参数装饰器的前面，而执行时恰好相反)
    __decorate([
        secondMethodDecorator("yes"),
        __param(0, paramDecorator)
    ], URLInfo.prototype, "methodTwo", null);

    // 类装饰器(__decorate函数中遍历执行装饰器是倒序遍历的方式，故本数组中类装饰器在构造参数装饰器的前面，而执行时恰好相反)
    URLInfo = __decorate([
        URLInfoDecorator,
        __param(0, constructorDecorator("url"))
    ], URLInfo);
    
    return URLInfo;
}());
```



## 元数据metadata

> 本小节所有元数据相关操作，都是是需要使用第三方库 reflect-metadata。故需要先安装该依赖： cnpm i reflect-metadata -S

1. 元数据定义、作用
2. 对象和对象属性上使用元数据
3. 直接在类，方法上定义元数据
4. 直接在类属性上定义元数据
5. 在装饰器内部为类，方法，属性定义或者获取元数据
6. metakey 相同，是否会覆盖？



### 元数据的定义和作用

**定义：元数据指附加在对象、类、方法、属性、参数上的数据。**

**作用：元数据用来帮助提供实现某种业务功能需要用到的数据。**



### 对象和对象属性上使用元数据

```typescript
import 'reflect-metadata'
// 1. 对象
let obj = {
  username: "罗斯福",
  age: 23,
  info() {
    console.log("信息");
  }
}
// 2. 使用 Reflect.defineMetadata 定义元数据。

// 2.1  Reflect.defineMetadata 是一个重载的方法
//  定义格式 
//  在类或者对象上定义元数据
 Reflect.defineMetadata(metakey,metavalue,targetClassOrObject)
//  在方法上定义元数据
 Reflect.defineMetadata(metakey,metavalue,targetprototype,methodname)
//  在属性上定义元数据
 Reflect.defineMetadata(metakey,metavalue,targetprototype,propkey)

// 说明：打开 d.ts 定义描述文件说明：Reflect 是命名空间，defineMetadata 是命名空间中的一个方法。

//  2.2 在对象上定义元数据
Reflect.defineMetadata('firstdescribe', '对象属性全部符合要求', obj);
Reflect.defineMetadata('seconddescribe', '对象不可删除', obj);

//  2.3 获取obj上metakey为 firstdescribe 的值
console.log(Reflect.getMetadata('firstdescribe', obj))// 输出"对象属性全部符合要求"

//  2.4 获取obj上metakey不存在的值
console.log(Reflect.getMetadata('threedescribe', obj))// 输出undefined

//  3  使用 Reflect.defineMetadata 在对象属性上定义元数据。
//  3.1 在对象属性上定义和获取元数据
Reflect.defineMetadata('usernamemetakey', '用户名合法', obj,"username");
Reflect.getMetadata('usernamemetakey', obj, "username"));// 输出用户名合法

//  3.2 使用 Reflect.hasMetadata 查看对象或对象属性上是否存在某个元数据
if (Reflect.hasMetadata('describe', obj)) {
  console.log("obj存在describe元数据");
}
```



### 直接在类、方法上定义元数据

**示例代码1：**

```typescript
import "reflect-metadata"

// 1. 在类上定义元数据
// 直接通过装饰器定义元数据时，可以省略 defineMetadata 后1或2个参数
@Reflect.metadata('decribe', '都是地球人')
class People {
    @Reflect.metadata("descible", "姓名不能包含非法汉字")
    username = "wangwu"

    @Reflect.metadata("importinfo", "去吃陶然居好吗")
    eat() {

    }
}

// 2 获取元数据
// 2.1 获取类上的元数据
console.log(Reflect.getMetadata('decribe', People));// 都是地球人

// 2.2 获取方法上的元数据 第二个参数是原型
console.log(Reflect.getMetadata('importinfo', People.prototype, 'eat'));//去吃陶然居好吗

// 2.3 判断People.prototype 原型上 eat 方法上是否存在importinfo元数据
if (Reflect.hasMetadata('importinfo', People.prototype, 'eat')) {
    console.log("hasMetadata=>People原型上存在eat方法的importinfo元数据");
}


// 3 定义子类
class ChinesePeople extends People {
    guoYear() {
    }
}

// 4 子类获取父类原型上的方法 ———— hasMetadata
// 由于ChinesePeople继承了People，故下面hasMetadata()返回true.
if (Reflect.hasMetadata('importinfo', ChinesePeople.prototype, 'eat')) {
    console.log("hasMetadata=>ChinesePeople原型上通过继承也获取到了eat方法和eat方法的importinfo元数据");
}

// 5获取自有元数据,但不能获取原型链上父类的元数据 ———— hasOwnMetadata
if (Reflect.hasOwnMetadata('importinfo', ChinesePeople.prototype, 'eat')) {
    console.log("hasOwnMetadata=>ChinesePeople原型上存在eat方法的importinfo元数据");
} else {
    console.log("hasOwnMetadata=>ChinesePeople原型上不存在eat方法的importinfo元数据");
}

export {}
```

**示例代码2：**

```typescript
import 'reflect-metadata'

// 为类定义元数据
@Reflect.metadata("info", "地球人")
class People {
    @Reflect.metadata('descible1', '居住地为主要城市')
    @Reflect.metadata('descible2', '上海')
    place: Array<string> = ["中国", "北京"]

    @Reflect.metadata('firstname', '第一个名字')
    @Reflect.metadata('lastname', '最后一个名字')
    getFullName(name: string, age: string): number {
        return 100
    }
}

// 获取元数据
console.log(Reflect.getMetadata('info', People));
console.log(Reflect.getMetadata("descible", People.prototype, 'place'));
console.log(Reflect.getMetadata('firstname', People.prototype, 'getFullName'));
console.log(Reflect.getMetadata('lastname', People.prototype, 'getFullName'));

// 获取People.prototype 上getFullName方法的全部元数据Key组成的数组
// 输出：
// [
//   'design:returntype',   eg. [Function: Number]
//   'design:paramtypes',   eg. [[Function: String], [Function: String]]
//   'design:type',         eg. 属性：[Function: UserService]，方法：[Function: Function]
//   'lastname',
//   'firstname'
// ]
console.log(Reflect.getMetadataKeys(People.prototype, "getFullName"));

// 获取People.prototype上所有元数据并遍历出来
Reflect.getMetadataKeys(People.prototype).forEach((item) => {
    console.log("all metadatakey:", item);
})

// 获取People.prototype中getFullName方法上所有元数据并遍历出来
Reflect.getMetadataKeys(People.prototype, 'getFullName').forEach((metakey) => {
    console.log("getFullName metadatakey:", metakey);
    console.log(Reflect.getMetadata(metakey, People.prototype, 'getFullName'));
})

// 获取People类上place方法的全部元数据Key组成的数组
// 输出
// [
//   'design:type',
//   'descible1',
//   'descible2'
// ]
console.log(Reflect.getMetadataKeys(People.prototype, "place"));

// 获取People.prototype中place属性上所有元数据并遍历出来
Reflect.getMetadataKeys(People.prototype, 'place').forEach((metakey) => {
    console.log("属性metadatakey:", metakey);
    console.log(Reflect.getMetadata(metakey, People.prototype, 'place'));
})


class ChinesePeople extends People {
    @Reflect.metadata("descible", "姓名不能包含非法汉字")
    guoYear(args: string) {

    }
}

console.log("getMetadataKeys==>查看父类上的方法...");
console.log(Reflect.getMetadataKeys(ChinesePeople.prototype, 'getFullName'));
console.log("getOwnMetadataKeys不能查看父类上的方法...");
console.log(Reflect.getOwnMetadataKeys(ChinesePeople.prototype, 'getFullName'));
```



### 在装饰器内部定义或获取元数据

**属性装饰器：**

在属性propertyKey上自定义元数据
Reflect.defineMetadata("prop", "attr metadata", targetClassPrototype, propertyKey)

```typescript
import 'reflect-metadata'

type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void

// 返回值类型指定好了后，返回的函数的参数类型就可以省略，提高代码可读性。
export function Inject(injectid: string): MyPropDecorator {
    return (targetClassPrototype, propertyKey) => {
        console.log("进入属性装饰器.....");
        // PropClass=UserService类，design:type 是reflect-metadata库内置的元数据，通过getMetadata方法可以拿到propertyKey的类型。
        let PropClass = Reflect.getMetadata("design:type", targetClassPrototype, propertyKey);

        // PropClass 实际上就是 new UserService()
        let PropClassObj = new PropClass();

        // 在属性propertyKey上自定义元数据
        Reflect.defineMetadata("prop", "attr metadata", targetClassPrototype, propertyKey)
    }
}
```

**方法装饰器：**

给methodname对应的方法添加自定义的元数据
Reflect.defineMetadata("path", reqPath, targetClassPrototype, methodname);

```typescript
import 'reflect-metadata'

type MyMethodDecoratorType = (targetClassPrototype: any, methodname: string, dataprops: PropertyDescriptor) => void

// 指定返回值类型后，内部返回的匿名函数的参数的类型就可以省略了，会自动推断出来。
export function get(reqPath: string): MyMethodDecoratorType {
    return function (targetClassPrototype, methodname, dataprops) {
        console.log("进入到方法饰器", "path:", reqPath);
        // TargetClass 本例就是 UserController.
        // let TargetClass = targetClassPrototype.constructor;
        // let TargetClassObj = new TargetClass();

        // 给methodname对应的方法添加自定义的元数据
        Reflect.defineMetadata("path", reqPath, targetClassPrototype, methodname);
    }
}
```

**类装饰器：**

获取请求路径
let reqPath = Reflect.getMetadata("path", targetClass.prototype, methodnamekey);

```typescript
import 'reflect-metadata'

export default function ControllerDecorator(rootPath: string) {
    return function <T extends { new(...args: any[]): any }>(targetClass: T) {
        console.log("进入类装饰器.....");
        // Object.keys(targetClass.prototype) 得到的是targetClass类上的所有成员方法。
        Object.keys(targetClass.prototype).forEach((methodnamekey) => {
            // 获取请求路径
            let reqPath = Reflect.getMetadata("path", targetClass.prototype, methodnamekey);
            console.log("reqPath:", reqPath);
            // 完整路径
            let fullPath = rootPath.replace(/\/$/, "") + "/" + reqPath.replace(/^\//, "");
            console.log("fullPath:", fullPath);

            console.log("获取属性上的元数据", Reflect.getMetadata("prop", targetClass.prototype, "userService"));
        })
    }
}
```



### metakey相同是否覆盖

1. 同一个类中，不同元素上定义的元数据具有相同metakey，不会覆盖，因为 defineMetadata(metakey, metavalue, ...) 除了key 、value外，还有其它参数，如类名、原型空间+方法名、原型空间+属性名等，可以想象成数据表中的联合主键，可以保证唯一性。
2. 同一个类中，相同元素上定义的元数据具有相同metakey，会覆盖，后者覆盖前者。
3. 父子类中，相同元素上定义的元数据具有相同metakey，会覆盖，子类覆盖父类。

```typescript
import "reflect-metadata"

@Reflect.metadata('decribe', '都是地球人')
class People {
    @Reflect.metadata("descible", "姓名不能包含非法汉字")
    @Reflect.metadata("descible", "姓名已存在")
    username = "wangwu"

    @Reflect.metadata("importinfo", "去吃陶然居好吗")
    eat() {

    }
}

class ChinesePeople extends People {
    @Reflect.metadata("descible", "子类username属性的元数据")
    username = "lisi"

    guoYear() {
    }
}

// 获取People类上的元数据
console.log(Reflect.getMetadata('decribe', People));// 都是地球人

// 获取username属性上的元数据
console.log(Reflect.getMetadata('descible', People.prototype, 'username'));//姓名不能包含非法汉字

// 获取子类的username属性上的元数据
console.log(Reflect.getMetadata('descible', ChinesePeople.prototype, 'username'));//子类username属性的元数据

export {}
```



### 3 个重要的内置元数据 key

**条件：**在当前装饰器修饰前提下执行下面元数据 key

1. design:paramtypes  a. 构造器所有参数数据类型组成的数组   b. 类方法中所有参数的数据类型组成的数组

2. design:type   a. 获取类属性的数据类型  b. 获取类方法的数据类型

3. design:returntype   a. 获取类方法返回值的数据类型

```typescript

import 'reflect-metadata'

// 1. 集合类
export class Collection<T = any> {
    static collection: Collection = new Collection();

    private constructor() {
    }

    private containerMap = new Map<string | symbol, any>();

    public set(id: string | symbol, value: T): void {
        this.containerMap.set(id, value);
    }

    public get(id: string | symbol): T {
        return this.containerMap.get(id);
    }

    public has(id: string | symbol): Boolean {
        return this.containerMap.has(id);
    }
}

// 2.业务逻辑层类
export class UserService {
    pname: string = "人民"

    public login() {
        console.log(this.pname + "登录....");
    }
}

// 3.属性装饰器
type MyPropertyDecorator = (target: any, propertyKey: string | symbol) => void;

export function InjectProperty(inject?: any): MyPropertyDecorator {

    return function (targetproperty, propertyKey) {

        console.log(" 进入属性装饰器....", targetproperty);

        console.log("获取类属性的数据类型");
        const propType = Reflect.getMetadata("design:type", targetproperty, propertyKey);
        console.log("design:type:", propType)
    }
}

// 4.方法装饰器
type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

export function get(injectid?: string): MethodDecorator {
    return (targetprototype, methodname, descriptor) => {
        console.log(" 进入方法装饰器....", targetprototype);

        const methodParamTypeArr = Reflect.getMetadata("design:paramtypes", targetprototype, methodname);
        console.log("design:paramtypes:", methodParamTypeArr)

        const methodReturnType = Reflect.getMetadata("design:returntype", targetprototype, methodname);
        console.log("design:returntype:", methodReturnType)

        const methodType = Reflect.getMetadata("design:type", targetprototype, methodname);
        console.log("design:type:", methodType)
    }
}

// 5.构造器参数装饰器
type MyParameterDecorator = (target: Object, paramname: string | symbol, parameterIndex: number) => void;

export function InjectContructor(injectid?: string): MyParameterDecorator {
    return (target, paramname, index) => {

        console.log(" 进入构造函数的参数装饰器....", target);
        console.log("获取类构造器参数类型组成的数组....")
        const constructorParamTypeArr = Reflect.getMetadata("design:paramtypes", target);
        console.log("design:paramtypes:", constructorParamTypeArr)

        let injectInstance = new constructorParamTypeArr[index]()
        Collection.collection.set(injectid!, injectInstance);
    }
}

// 6.控制器类
class UserController {

    @InjectProperty("userService")
    private userService!: UserService

    constructor(@InjectContructor("userService") private peopleService?: UserService, count?: number) {

    }

    @get("/path")
    public login(username: string, pwd: number): number {
        let peopleServiceInstace = Collection.collection.get("userService");
        peopleServiceInstace.login();
        console.log("进入login方法...")
        return 3
    }
}

let controller = new UserController();
controller.login("wangwu", 23);


export {}
```

![image-20220504184611607](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205041846461.png)



## 仿 Nestjs 装饰器实战

> 项目源代码：https://gitee.com/Allen_2017/ts-nestjs

### 项目准备

环境安装：yarn add express  express-session  reflect-metadata -S

项目分层：

1. service 业务逻辑层

2. controller 层    

3. 装饰器 decorator 层

4. 中间件 middleaware 层

5. 路由 router 层

6. collection集合层  【也是容器层】 

7. util 层

8. 启动文件

   

### 依赖注入实现准备-项目分层

代码：https://gitee.com/Allen_2017/ts-nestjs/commit/92b719fd9feabfcb807092045973392037c6b080

![image-20220505054819124](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205050548661.png)

 **1 UserService 类**

```js
export default class UserService {
  Login(username: string, pwd: string, role: string) {
    console.log("进入service ...Login,username:", username)

    if (username === "admin" && pwd === "123" && role === "admin") {
      return true;
    } else {
      return false;
    }
  }
  register() {
    console.log("usersevice...register")
  }
}
```

**2 控制器——UserController**

```js
import Autowired from '../decorator/autowireddecortator'
import UserService from '../service/UserService'
import CollectionInstance from '../collection/'
// 装饰器执行顺序： 1.属性装饰器==>2.方法参数装饰器==>3.方法装饰器===>4.类装饰器
class UserController {

  @Autowired("userService")//  修改Inject 为更专业的 Autowired 单词
  private userService!: UserService // 修改Inject 为更专业的 Autowired 单词


  public login(): void {
    // 增加....
  }
}
let controller = new UserController();
controller.login();
export { }
```

**3 为控制器属性注入对象的注入装饰器——autowireddecortator.ts**

```js
import 'reflect-metadata'
import collectionInstance from '../collection'

type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void
export default function Autowired(injectid: string): MyPropDecorator {
  return (targetClassPrototype, propertyKey) => {
    // PropClass=UserService类
    let PropClass = Reflect.getMetadata("design:type", targetClassPrototype, propertyKey)
    //  增加....
  }
}
```



### 依赖注入实现准备—优化存储

代码：https://gitee.com/Allen_2017/ts-nestjs/commit/4adf34f93a6bce34cbc23ffb416c201a64cf054a

```js
import 'reflect-metadata'
import collectionInstance from '../collection'

type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void
export default function Autowired(injectid: string): MyPropDecorator {
  return (targetClassPrototype, propertyKey) => {
    // PropClass=UserService类
    let PropClass = Reflect.getMetadata("design:type", targetClassPrototype, propertyKey);
    let PropClassObj = new PropClass();
    //collectionInstance.set(propertyKey, PropClassObj);
    // 对比:Object.defineProperty
    // 好处:由于targetClassPrototype原型+propertyKey一起是绝对不会被覆盖的,充分保证了数据属性中的value的对象的唯一性
    Reflect.defineProperty(targetClassPrototype, propertyKey, { value: PropClassObj });
  }
}
```



### 依赖注入实现和升级自动装配装饰器

代码：https://gitee.com/Allen_2017/ts-nestjs/commit/ac64bcee878d2ba0f0b923fb581d66f4b2ca8fc1

```js
// 	依赖注入实现和升级自动装配装饰器
//  实现步骤   1. 建立伪接口类 UserServiceInter
//            2. 修改UserService的名字为userServiceImpl类
//            3. 修改自动装配装饰器【Autowired】
//          最后别忘了修改UserController中的login方法中的S100中的属性名为userServiceImpl
```



### 依赖注入实现引发的深度思考

重点知识

1. 理解实战涉及到的主要专业术语    
2. 依赖注入中的单件模式实现方式1

#### 相关专业术语

 **@Controller** 控制器装饰器【@Controller】 修饰的类，是用来支持页面的各种请求的类。

 **@Service** 业务逻辑层类装饰器

 **@Autowired** 自动装配，一般是帮助把外部其他数据注入【简单理解为赋值】给当前类属性或方法参数的装饰器，这些数据可以是string，number等基本数据类型，也可以是一个对象。

 **dependencyid** [injectid]  依赖ID,一个唯一标识符变量， 作为@Autowired装饰器函数的实参，使用@Autowired 为 不同类属性，或方法参数注入数据时，**dependencyid** 用于区分这些不同的类。

 **singleton**   标注是否是单例注入的参数，可选。



#### 依赖注入中的单件模式实现1

代码：https://gitee.com/Allen_2017/ts-nestjs/commit/709ccc4f4c2c7b955c8b3f7a6bea9dce57d3dbbe

先看下面这个例子，userServiceImpl上使用了2次@Autowired：

```typescript
class UserController {

    @Autowired("userServiceImpl")
    @Autowired("userServiceImpl")
    private userServiceImpl!: UserServiceInter

    public login(): void {
        let userService = Reflect.getOwnPropertyDescriptor(UserController.prototype, "userServiceImpl")!.value;
        userService.register();
    }
}
```

在不使用单例设计模式的情况下：

![image-20220506072323195](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205060723095.png)

通过增加一个装饰器参数，控制是否需要使用单例设计模式，同时需要做如下修改：

```typescript
// UserController的修改：
@Autowired("userServiceImpl", true)
@Autowired("userServiceImpl", true)
private userServiceImpl!: UserServiceInter

//-----------------------------------------------------------------------------------------------
//autowireddecorator装饰器的修改：
import 'reflect-metadata'

type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void

//新增一个 singleton 参数，true-单例, false-多例
export default function Autowired(dependencyid?: string, singleton?: boolean): MyPropDecorator {
    return (targetClassPrototype, propertyKey) => {
        // PropServiceClass = UserServiceInter 为接口类
        let PropServiceClass = Reflect.getMetadata("design:type", targetClassPrototype, propertyKey);
        let ServiceImplClass = PropServiceClass.getServiceImplClass();
        let ServiceImplInstance;
        if(singleton){
            ServiceImplInstance = ServiceImplClass.getInstance();
        }else{
            ServiceImplInstance = new ServiceImplClass();
        }

        // 由于targetClassPrototype原型+propertyKey一起是绝对不会被覆盖的,充分保证了数据属性中的value的对象的唯一性
        Reflect.defineProperty(targetClassPrototype, propertyKey, {value: ServiceImplInstance});
    }
}

//--------------------------------------------------------------------------------------------------------
//UserServiceImpl的修改：单例设计模式
export default class UserServiceImpl {
    static userServiceImpl: UserServiceImpl;

    static getInstance(): UserServiceImpl {
        if (!this.userServiceImpl) {
            this.userServiceImpl = new UserServiceImpl();
        }
        return this.userServiceImpl;
    }

    constructor() {
        console.log("UserServiceImpl对象被创建了...")
    }

    Login(username: string, pwd: string, role: string) {
        console.log("进入service ...Login,username:", username)

        if (username === "admin" && pwd === "123" && role === "admin") {
            return true;
        } else {
            return false;
        }
    }

    register() {
        console.log("usersevice...register")
    }
}
```



![image-20220506073404022](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205060734485.png)



#### 依赖注入中的单件模式实现2

代码：https://gitee.com/Allen_2017/ts-nestjs/commit/c83a94fcf52e7c700ca55b9beb9596ee884cc6c3

**实现方式1中@Autowired 使用第2个参数singleton的缺点**

```typescript
@Autowired("userServiceImpl", true)
@Autowired("userServiceImpl", true)
private userServiceImpl!: UserServiceInter
 
//-----------------------------------------------------------------------------------------------------
//下面这种情况下，仍然会创建3个实例对象。
@Autowired("userServiceImpl", true)
@Autowired("userServiceImpl")
@Autowired("userServiceImpl")
private userServiceImpl!: UserServiceInter
```

依赖注入的单间设计模式实现方式1有2个缺陷：一是如果第一个1个@Autowired为true，其它不为true，仍然会创建了多个对象；二是职责不清，@Autowired的本意是从外部注入对象实例，现在还要判断是否单例，职责模糊。



**升级优化，单独引入一个 @singleton装饰器**

1. UserController

   ```typescript
   import "reflect-metadata";
   import Autowired from '../decorator/autowireddecorator'
   import Singleton from "../decorator/singletondecorator";
   import UserServiceInter from "../service/UserServiceInter";
   
   // 装饰器执行顺序：1.属性装饰器==>2.方法参数装饰器==>3.方法装饰器==>4.构造函数参数装饰器==>5.类装饰器
   class UserController {
   
       @Autowired("userServiceImpl")
       @Autowired("userServiceImpl")
       @Singleton(true)  //新增的Singleton装饰器
       private userServiceImpl!: UserServiceInter
   
       public login(): void {
           let userService = Reflect.getOwnPropertyDescriptor(UserController.prototype, "userServiceImpl")!.value;
           userService.register();
       }
   }
   
   let controller = new UserController();
   controller.login();
   
   export {}
   ```

   

2. Singleton装饰器

   ```typescript
   import 'reflect-metadata'
   
   type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void
   
   export default function Singleton(singleton: boolean): MyPropDecorator {
       return (targetClassPrototype, propertyKey) => {
           // PropServiceClass，如：UserServiceInter
           let PropServiceClass = Reflect.getMetadata("design:type", targetClassPrototype, propertyKey);
           // ServiceImplClass，如：UserServiceImpl
           let ServiceImplClass = PropServiceClass.getServiceImplClass();
   
           let ServiceImplInstanceOrClass;
           let metaSingleton = Reflect.getMetadata("singleton", targetClassPrototype, propertyKey);
           if (singleton) {
               if (!metaSingleton) { //第一次进入
                   Reflect.defineMetadata("singleton", singleton, targetClassPrototype, propertyKey);
                   ServiceImplInstanceOrClass = ServiceImplClass.getInstance();
               } else { // 第二次或以上次重复进来执行
                   console.log("单件模式创建,使用了上一次的对象");
               }
           } else {
               ServiceImplInstanceOrClass = ServiceImplClass;
           }
           //保存对象或类
           Reflect.defineMetadata("ServiceImplInstanceOrClass", ServiceImplInstanceOrClass, targetClassPrototype, propertyKey);
       }
   }
   ```



3. Autowired装饰器

   ```typescript
   import 'reflect-metadata'
   
   type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void
   
   export default function Autowired(dependencyid?: string): MyPropDecorator {
       return (targetClassPrototype, propertyKey) => {
           // PropServiceClass = UserServiceInter 为接口类
           let PropServiceClass = Reflect.getMetadata("design:type", targetClassPrototype, propertyKey);
           // 如使用了Singleton装饰器，则：单例--ServiceImplInstanceOrClass 和 metaSingleton 都有值；多例--ServiceImplInstanceOrClass有值.
           // 如果没有使用Singleton装饰器，则下面2个均不会有值
           let ServiceImplInstanceOrClass = Reflect.getMetadata("ServiceImplInstanceOrClass", targetClassPrototype, propertyKey);
           let metaSingleton = Reflect.getMetadata("singleton", targetClassPrototype, propertyKey);
   
           let ServiceImplInstance: any;
           if (metaSingleton) {
               console.log("我是Autowired装饰器,单件模式获取对象");
               ServiceImplInstance = ServiceImplInstanceOrClass
           } else {
               //如果没有使用Singleton装饰器，则ServiceImplInstanceOrClass没有值
               if (!ServiceImplInstanceOrClass) {
                   ServiceImplInstanceOrClass = PropServiceClass.getServiceImplClass();
               }
               ServiceImplInstance = new ServiceImplInstanceOrClass();
           }
           //保存对象
           Reflect.defineProperty(targetClassPrototype, propertyKey, {value: ServiceImplInstance});
       }
   }
   ```



**@Singleton(true) ==>单例**

![image-20220506083646010](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205060836290.png)



**@Singleton(false) ==>多例**

![image-20220506083738414](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205060837451.png)



**不使用@Singleton==>多例**

![image-20220506083925963](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205060839859.png)



### 数据访问层和实体层封装

代码：https://gitee.com/Allen_2017/ts-nestjs/commit/f2fe8a4cf58a38b08d2fee0b1311fec273123bb6

本小节代码改动较大。加入 dao层和entity层，并且模拟从后端查询数据，同时还优化了autowired等装饰器，使其支持对Dao的注入。

**1 DAO 层**

```js
// UserDaoInter类
export default abstract class UserDaoInter {
    public static getImplClass() {
        return UserDaoImpl;
    }

    public abstract findUser(username: string, pwd: string): UserInfo | null;
}

// UserDaoImpl类
import {userInfosDB} from '../entity/UserInfo'

export default class UserDaoImpl {
    static userDaoImpl: UserDaoImpl;

    static getInstance(): UserDaoImpl {
        if (!this.userDaoImpl) {
            this.userDaoImpl = new UserDaoImpl();
        }
        return this.userDaoImpl;
    }

    public findUser(username: string, pwd: string) {
        return userInfosDB.find((useinfo) => {
            return username === useinfo.username && pwd === useinfo.password
        })
    }

}
```



**2 实体层**

```js
export default interface UserInfo {
    username: string,
    password: string,
    phone: string,
    role: string
    mark: string
}

// 模拟UserInfo数据
export const userInfosDB: Array<UserInfo> =
    [{
        username: "admin",
        password: "123",
        phone: "1111",
        role: "admin",
        mark: "管理员"
    },
        {
            username: "lisi",
            password: "123",
            phone: "1111",
            role: "general",
            mark: "开发工程师"
        },
        {
            username: "liuwu",
            password: "123",
            phone: "1111",
            role: "manager",
            mark: "项目精力"
        },
    ]

```



**3 业务逻辑层**

```js
import UserDaoInter from "../dao/UserDaoInter";
import Autowired from "../decorator/autowireddecorator";
import Singleton from "../decorator/singletondecorator";
import UserInfo from "../entity/UserInfo";

export default class UserServiceImpl {
    static userServiceImpl: UserServiceImpl;

    static getInstance(): UserServiceImpl {
        if (!this.userServiceImpl) {
            this.userServiceImpl = new UserServiceImpl();
        }
        return this.userServiceImpl;
    }

    @Autowired("userDaoImpl")
    @Singleton(true)
    userDaoImpl!: UserDaoInter;

    constructor() {
        console.log("UserServiceImpl对象被创建了...")
    }

    register(username: string, pwd: string): boolean {
        console.log("usersevice...register")

        let userDao = Reflect.getOwnPropertyDescriptor(UserServiceImpl.prototype, "userDaoImpl")!.value;
        let userInfo: UserInfo = userDao.findUser(username, pwd);

        return !!userInfo;
    }

    login(username: string, pwd: string): UserInfo | null {
        console.log("进入service ...Login,username:", username);

        let userDao = Reflect.getOwnPropertyDescriptor(UserServiceImpl.prototype, "userDaoImpl")!.value;
        let userInfo: UserInfo = userDao.findUser(username, pwd);
        return userInfo || null
    }
}
```



**4 控制器层**

```typescript
import "reflect-metadata";
import Autowired from '../decorator/autowireddecorator'
import Singleton from "../decorator/singletondecorator";
import UserServiceInter from "../service/UserServiceInter";

// 装饰器执行顺序：1.属性装饰器==>2.方法参数装饰器==>3.方法装饰器==>4.构造函数参数装饰器==>5.类装饰器
class UserController {

    @Autowired("userServiceImpl")
    @Singleton(true)
    private userServiceImpl!: UserServiceInter

    public login(): void {
        let userService = Reflect.getOwnPropertyDescriptor(UserController.prototype, "userServiceImpl")!.value;
        let userInfo = userService.login("admin", "123");
        if (userInfo) {
            console.log(userInfo);
        } else {
            console.log("用户名或密码错误");
        }
    }

    public register(): void {
        let userService = Reflect.getOwnPropertyDescriptor(UserController.prototype, "userServiceImpl")!.value;
        let result = userService.register("admin", "123");
        if (result) {
            console.log("注册成功!");
        } else {
            console.log("注册失败!");
        }
    }
}


let controller = new UserController();
controller.register();
// controller.login();

export {}
```



### 控制器装饰器和请求方法装饰器

代码：https://gitee.com/Allen_2017/ts-nestjs/commit/a53cfa06f5cead3cac415b7da0b3113ddbe8f22f

#### 环境搭建

  **1.安装包**

```js
yarn add express -S
npm i express --save

yarn add @types/express -D
npm i @types/express --save-dev

yarn add express-session -S
npm i express-session --save

yarn add reflect-metadata -S
npm i reflect-metadata --save

yarn add typescript  -D
npm i typescript --save-dev

yarn add nodemon -D
npm i nodemon --save-dev
```

  **2. 配置 package.json  脚本**

```js
  "scripts": {
    "app": "nodemon --watch src/ -e ts --exec ts-node ./src/expressapp.ts",
    "ctrl": "ts-node src/controller/HomeController.ts"
  }
```

  **3.修改 tsconfig.json  脚本**

```js
  // "strict": true 屏蔽strict
   "experimentalDecorators": true, // 开启            
   "emitDecoratorMetadata": true, // 开启
	
```



####  编写工具类

```typescript
// SessionUtil.ts 工具类
import { Request } from 'express'
export function getSession(req: Request) {
  return (req as any).session
}
```



#### Controller 类

```js
import "reflect-metadata";
import {Autowired, Singleton, get, Controller} from '../decorator'
import {UserServiceInter, UserServiceImpl} from "../service";
import { Request, Response } from 'express'
import { getSession } from '../util/SessionUtil';
import UserInfo from "../entity/UserInfo";

// 装饰器执行顺序：1.属性装饰器==>2.方法参数装饰器==>3.方法装饰器==>4.构造函数参数装饰器==>5.类装饰器
@Controller("/user")
class UserController {

    @Autowired("userServiceImpl")
    @Singleton(true)
    private userServiceImpl!: UserServiceInter

    @get("/login")
    public login(req: Request, res: Response): void {
        // let userService = Reflect.getOwnPropertyDescriptor(UserController.prototype, "userServiceImpl")!.value;
        // let userInfo = userService.login("admin", "123");
        // if (userInfo) {
        //     console.log(userInfo);
        // } else {
        //     console.log("用户名或密码错误");
        // }
        let htmlstr = `<div><form method="post" action = "/loginprocess">
                          <div>用户名: <input type='text' name = 'username'/></div>
                          <div>密码: <input type='password' name = 'pwd'/></div>
                          <div><input type="submit" value = "提交" /> </div>
                        </form></div>`
        res.send(htmlstr);
    }

    // @post("/loginprocess")
    loginProcess(req: Request, res: Response): void {

        console.log("loginprocess=this:", this);
        let session = getSession(req);

        let userServiceImpl: UserServiceImpl =
            Reflect.getOwnPropertyDescriptor(UserController.prototype, "userServiceImpl").value//S100
        let userInfo: UserInfo = userServiceImpl.login(req.body.username, req.body.pwd)
        if (userInfo && userInfo.username){
            session.userInfo = userInfo
        }
        // 基础复习：req.send只能发送一次,如果想发送多次,就必须使用res.write
        res.setHeader("Content-Type", "text/html;charset=UTF-8")
        let outputhtml = "";
        if (userInfo.role === "admin") {
            outputhtml += `<div>管理员:${userInfo.role}</div>`
            outputhtml += `<div><a href="/rights">进入管理员权限页面</a></div>`
        }
        res.write(outputhtml);
        res.write(`<div>登录成功,欢迎你:${userInfo.username}</div>`);
        res.write(`<div><a  href="/">进入首页</a></div>`);
        res.end();
    }

    public register(): void {
        let userService = Reflect.getOwnPropertyDescriptor(UserController.prototype, "userServiceImpl")!.value;
        let result = userService.register("admin", "123");
        if (result) {
            console.log("注册成功!");
        } else {
            console.log("注册失败!");
        }
    }
}


// let controller = new UserController();
// controller.register();
// controller.login();

export {}
```



#### get 请求方法装饰器实现

```typescript
import 'reflect-metadata'
type MyMethodDecoratorType = (targetClassPrototype: any, methodname: string, dataprops: PropertyDescriptor) => void

export function get(reqPath: string): MyMethodDecoratorType {
    return function (targetClassPrototype, methodname, dataprops) {
        console.log("进入到方法饰器", "path:", reqPath);

        Reflect.defineMetadata("path", reqPath, targetClassPrototype, methodname)
    }
}
```



#### Controller 装饰器实现

```typescript
import { router } from "../router"

type MyClassDecorator = <T extends { new(...args: any): any }>(targetClass: T) => any

export function Controller(reqRootPath: string): MyClassDecorator {
    return function (targetClass): any {
        console.log("控制器装饰器执行...");

        //遍历控制器上所有的方法
        for (let methodname in targetClass.prototype) {
            let reqPath = Reflect.getMetadata("path", targetClass.prototype, methodname);
            // 拿到装饰器对应的方法
            const targetMethodfunc = targetClass.prototype[methodname];
            // S100理解：当执行对应routerpath时，会自动执行targetMethodfunc方法
            if (reqPath) {
                const routePath = `${reqRootPath.replace(/$\//, "")}/${reqPath.replace(/^\//, "")}`;
                router.get(routePath, targetMethodfunc);// S100
            }
        }
    }
}
```



#### 路由器提取

```js
import { Router } from 'express'
export const router: Router = Router();
```



#### 增加装饰器二次导出

```js
export * from './autowireddecortator'
export * from './reqmethoddecorator'
export * from './singletondecorator'
export * from './controllerdecorator'
```



#### 启动文件 app 实现

```typescript
import 'reflect-metadata'
import express from 'express'
import session from 'express-session'

// 引入控制器ts文件,会自动执行控制器中方法装饰器@get和类装饰器@Controller，
// 这一执行直接导致router增加了路由完成，就是controlldecorators的第S100行代码的执行
import './controller/UserController'

// 然后在引入路由器
import {router} from './router'

//Express4.16+已经在express包中加入了bodyParser,可直接作为express的方法使用.
const app = express();//Creates an Express application.

// 设置session关联的cookie信息
app.use(session({
    secret: "cookeid12345",
    name: "cookieinfo",
    resave: false,
    saveUninitialized: true,
}))

// Express4.16+后的 处理表单数据 url 集成到了express框架中
app.use(express.urlencoded({extended: false})); //处理表单数据 url
app.use(router)//添加路由到express应用对象-app对象中

let server = app.listen(5002, function () {
    console.log('node服务器启动,端口5002') //服务启动完成,输出日志
})
```



### 多种请求方法装饰器实现

代码：https://gitee.com/Allen_2017/ts-nestjs/commit/3082ace6312a0794d0f0b84f9bb824a7cbd575e7

#### 升级方法装饰器

```typescript
import 'reflect-metadata'
import {MethodType} from '../types';

// 封装方法装饰器
function reqMethodDecorator(methodType: MethodType) {
    return function (path: string) {
        return function (targetPrototype: any, methodname: string) {
            console.log("方法装饰器:执行的类是:", targetPrototype, " 方法是:", methodname);
            //将方法路径和方法类型保存到方法元数据中
            Reflect.defineMetadata('path', path, targetPrototype, methodname);
            Reflect.defineMetadata('methodtype', methodType, targetPrototype, methodname);
        }
    }
}

export const get = reqMethodDecorator("get");
export const post = reqMethodDecorator("post");
```



#### 升级控制器装饰器

```typescript
import {router} from "../router"
import {MethodType} from "../types";

type MyClassDecorator = <T extends { new(...args: any): any }>(targetClass: T) => any

export function Controller(reqRootPath: string): MyClassDecorator {
    return function (targetClass): any {
        console.log("控制器装饰器执行...");

        //遍历控制器上所有的方法
        for (let methodname in targetClass.prototype) {
            // 获取对应的方法
            const targetMethodfunc = targetClass.prototype[methodname];

            // 获取方法装饰器中保存的元数据
            let reqPath = Reflect.getMetadata("path", targetClass.prototype, methodname);
            let methodType: MethodType = Reflect.getMetadata("methodType", targetClass.prototype, methodname)

            // 路由映射。S100理解：当执行对应routePath时，会自动执行targetMethodfunc方法
            if (reqPath && methodType) {
                const routePath = `${reqRootPath.replace(/\/$/, "")}/${reqPath.replace(/^\//, "")}`;
                router[methodType](routePath, targetMethodfunc); // S100
            }
        }
    }
}
```



### 多页面请求+中间件装饰器

代码：https://gitee.com/Allen_2017/ts-nestjs/commit/61013fcba5c1c72749beea4ff782f2b3d64cf0d2

​	   	https://gitee.com/Allen_2017/ts-nestjs/commit/2ac8c8df768087a85640718a9a6873aa15f35d48

#### 新建主入口控制器类

```typescript
import "reflect-metadata";
import {get, Controller} from '../decorator'
import {Request, Response} from 'express'
import {getSession} from '../util/SessionUtil';

@Controller("/")
class MainController {

    @get('/')
    index(req: Request, res: Response): void {
        if (getSession(req).userInfo) {
            let htmlstr = `<div><a href='/food/searchFoodHistory' style='text-decoration:none;color:red'>搜索美食历史信息</a></div>
                           <div><a href = '/order/orderInfo' style='text-decoration:none;color:red'>订单信息</a></div>
                           <div><a href="/user/logout" style='text-decoration:none;color:red'>注销</a></div>`;
            res.send(htmlstr);
        } else {
            res.redirect("/user/login");
        }
    }
}
```



#### 新建权限控制器类

```typescript
import {Request, Response} from 'express'
import {get, Controller} from '../decorator'

@Controller("/rights")
export default class RightsController {

    @get("/rightsmanager")
    rightsShow(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write("管理员权限页面");
        res.write("<a href='javascript:history.back()'>返回</a>")
        res.send();
    }
}
```



#### 增加中间件装饰器

```typescript
import {RequestHandler} from 'express'
import 'reflect-metadata'

export function middleware(middleware: RequestHandler) {
    return function (targetPrototype: any, methodname: string) {
        Reflect.defineMetadata("middleware", middleware, targetPrototype, methodname);
    }
}
```



#### 增加 FoodController 类

```typescript
import {Request, Response} from 'express';
import {get, middleware, Controller} from '../decorator';
import {isValidUser} from '../middleaware/middlewarefunc';

@Controller("/food")
class FoodController {

    @get("/showfood")
    @middleware(isValidUser)
    showFood(req: Request, res: Response): void {
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.write("大混沌");
        res.write("一锅炖");
        res.end();
    }
}
```



#### 增加中间件函数

```typescript
import {Request, Response, NextFunction} from 'express'
import {getSession} from '../util/SessionUtil';

// express要求的router中间件的格式 (req: Request, res: Response, next: NextFunction) => any
export const isValidUser = (req: Request, res: Response, next: NextFunction) => {
    console.log("执行isValidUser中间件函数...");
    let session = getSession(req);
    // userInfo对象是在登录后保存到sesson里的.
    if (session.userInfo && session.userInfo.mark === "noallowlogin") {
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.write("您是被禁人士，被限制访问");
        res.end();
    } else {
        next();
    }
}
```



#### 修改 Controller 装饰器

```js
import {router} from "../router"
import {MethodType} from "../types";
import {RequestHandler} from "express";

type MyClassDecorator = <T extends { new(...args: any): any }>(targetClass: T) => any

export function Controller(reqRootPath: string): MyClassDecorator {
    return function (targetClass): any {
        console.log("执行控制器装饰器：执行的类是==>", targetClass);

        //遍历控制器上所有的方法
        for (let methodname in targetClass.prototype) {
            // 获取对应的方法
            const targetMethodfunc = targetClass.prototype[methodname];

            // 获取方法装饰器中保存的元数据
            let reqPath = Reflect.getMetadata("path", targetClass.prototype, methodname);
            let methodType: MethodType = Reflect.getMetadata("methodType", targetClass.prototype, methodname);
            let middleware: RequestHandler = Reflect.getMetadata("middleware", targetClass.prototype, methodname);

            // 路由映射。S100理解：当执行对应routePath时，会自动执行targetMethodfunc方法
            if (reqPath && methodType) {
                const routePath = `${reqRootPath.replace(/\/$/, "")}/${reqPath.replace(/^\//, "")}`;
                if (middleware) {
                    router[methodType](routePath, middleware, targetMethodfunc); // 有中间件先执行中间件
                } else {
                    router[methodType](routePath, targetMethodfunc); // S100
                }
            }
        }
    }
}
```



#### 修改app.js启动文件

```typescript
// 引入控制器ts文件,会自动执行控制器中各种装饰器，执行完毕后router中就增加了路由配置。
import './controller/MainController'
import './controller/UserController'
import './controller/RightsController'
import './controller/FoodController'
```



### 多个中间件装饰器实现

代码：https://gitee.com/Allen_2017/ts-nestjs/commit/9626e585cedc028bf21038d396f3d8b6cb391b9b

#### 新增中间件函数

```typescript
export const isVIPUser = (req: Request, res: Response, next: NextFunction) => {
    console.log("执行isVIPUser中间件函数...");
    let session = getSession(req);
    if (session.userInfo && session.userInfo.role === "vip") {
        console.log("vip用户上线...");
    }
    next();
}

export const isAdminUser = (req: Request, res: Response, next: NextFunction) => {
    console.log("执行isAdminUser中间件函数...");
    let session = getSession(req);
    if (session.userInfo && session.userInfo.username === "admin") {
        console.log("管理员用户上线...");
    }
    next();
}
```



#### 使用多个中间件装饰器

```typescript
import {Request, Response} from 'express';
import {get, middleware, Controller} from '../decorator';
import {isValidUser, isVIPUser, isAdminUser} from '../middleaware/middlewarefunc';

@Controller("/food")
class FoodController {

    @get("/showfood")
    @middleware(isAdminUser)
    @middleware(isVIPUser)
    @middleware(isValidUser)
    showFood(req: Request, res: Response): void {
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.write("大混沌");
        res.write("一锅炖");
        res.end();
    }
}
```



#### 修改中间件装饰器

```typescript
import {RequestHandler} from 'express'
import 'reflect-metadata'

export function middleware(middleware: RequestHandler) {
    return function (targetPrototype: any, methodname: string) {
        let middlewares = Reflect.getMetadata("middlewares", targetPrototype, methodname);
        if (!middlewares) {
            middlewares = [];
        }
        middlewares.push(middleware);
        Reflect.defineMetadata("middlewares", middlewares, targetPrototype, methodname);
    }
}
```



#### 修改控制器装饰器

```js
import {router} from "../router"
import {MethodType} from "../types";
import {RequestHandler} from "express";

type MyClassDecorator = <T extends { new(...args: any): any }>(targetClass: T) => any

export function Controller(reqRootPath: string): MyClassDecorator {
    return function (targetClass): any {
        console.log("执行控制器装饰器：执行的类是==>", targetClass);

        //遍历控制器上所有的方法
        for (let methodname in targetClass.prototype) {
            // 获取对应的方法
            const targetMethodfunc = targetClass.prototype[methodname];

            // 获取方法装饰器中保存的元数据
            let reqPath = Reflect.getMetadata("path", targetClass.prototype, methodname);
            let methodType: MethodType = Reflect.getMetadata("methodType", targetClass.prototype, methodname);
            let middlewares: RequestHandler[] = Reflect.getMetadata("middlewares", targetClass.prototype, methodname);

            // 路由映射。S100理解：当执行对应routePath时，会自动执行targetMethodfunc方法
            if (reqPath && methodType) {
                const routePath = `${reqRootPath.replace(/\/$/, "")}/${reqPath.replace(/^\//, "")}`;
                if (middlewares) {
                    router[methodType](routePath, ...middlewares, targetMethodfunc); // 有中间件先执行中间件
                } else {
                    router[methodType](routePath, targetMethodfunc); // S100
                }
            }
        }
    }
}
```



### Router底层源码片段解析

#### 研究入口

解析路由器和请求参数对象底层复杂泛型，以这里为入口，进入Router源码：

```typescript
import {Router} from 'express'

export const router: Router = Router();
```

```typescript
export function query(options: qs.IParseOptions | typeof qs.parse): Handler;

export function Router(options?: RouterOptions): core.Router;
```



#### core.Router

```typescript
export interface Router extends IRouter {}
```



#### IRouter

```typescript
export interface IRouter extends RequestHandler {
    /**
     * Map the given param placeholder `name`(s) to the given callback(s).
     *
     * Parameter mapping is used to provide pre-conditions to routes
     * which use normalized placeholders. For example a _:user_id_ parameter
     * could automatically load a user's information from the database without
     * any additional code,
     *
     * The callback uses the samesignature as middleware, the only differencing
     * being that the value of the placeholder is passed, in this case the _id_
     * of the user. Once the `next()` function is invoked, just like middleware
     * it will continue on to execute the route, or subsequent parameter functions.
     *
     *      app.param('user_id', function(req, res, next, id){
     *        User.find(id, function(err, user){
     *          if (err) {
     *            next(err);
     *          } else if (user) {
     *            req.user = user;
     *            next();
     *          } else {
     *            next(new Error('failed to load user'));
     *          }
     *        });
     *      });
     */
    param(name: string, handler: RequestParamHandler): this;

    /**
     * Alternatively, you can pass only a callback, in which case you have the opportunity to alter the app.param()
     *
     * @deprecated since version 4.11
     */
    param(callback: (name: string, matcher: RegExp) => RequestParamHandler): this;

    /**
     * Special-cased "all" method, applying the given route `path`,
     * middleware, and callback to _every_ HTTP method.
     */
    all: IRouterMatcher<this, 'all'>;
    get: IRouterMatcher<this, 'get'>;
    post: IRouterMatcher<this, 'post'>;
    put: IRouterMatcher<this, 'put'>;
    delete: IRouterMatcher<this, 'delete'>;
    patch: IRouterMatcher<this, 'patch'>;
    options: IRouterMatcher<this, 'options'>;
    head: IRouterMatcher<this, 'head'>;

    checkout: IRouterMatcher<this>;
    connect: IRouterMatcher<this>;
    copy: IRouterMatcher<this>;
    lock: IRouterMatcher<this>;
    merge: IRouterMatcher<this>;
    mkactivity: IRouterMatcher<this>;
    mkcol: IRouterMatcher<this>;
    move: IRouterMatcher<this>;
    'm-search': IRouterMatcher<this>;
    notify: IRouterMatcher<this>;
    propfind: IRouterMatcher<this>;
    proppatch: IRouterMatcher<this>;
    purge: IRouterMatcher<this>;
    report: IRouterMatcher<this>;
    search: IRouterMatcher<this>;
    subscribe: IRouterMatcher<this>;
    trace: IRouterMatcher<this>;
    unlock: IRouterMatcher<this>;
    unsubscribe: IRouterMatcher<this>;

    use: IRouterHandler<this> & IRouterMatcher<this>;

    route<T extends string>(prefix: T): IRoute<T>;
    route(prefix: PathParams): IRoute;
    /**
     * Stack of configured routes
     */
    stack: any[];
}
```

可以看到应用层获取到的 router对象的类型可以一路追溯，core.Router==>IRouter==>RequestHandler类型，而 router.get、router.post 实际上是如下类型：

```typescript
get: IRouterMatcher<this, 'get'>;
post: IRouterMatcher<this, 'post'>;
```

IRouterMatcher<this, 'get'> 中的 this 就是 IRouter，由于 IRouter extends RequestHander，也可以理解为 this 就是 RequestHander 的约束类型。



#### IRouterMatcher

IRouterMatcher 这个接口里有几个匿名方法，这样写的好处是可以用来表示重载方法。我们可以看到这几个方法的参数都是2个，path 和 ...handlers。所以我们在应用层使用router的时候，常常这么写：router.get(path, ...handlers);  原因就是这么来的。

```typescript
export interface IRouterMatcher<T, Method extends 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any> {
    <
        Route extends string,
        P = RouteParameters<Route>,
        ResBody = any,
        ReqBody = any,
        ReqQuery = ParsedQs,
        Locals extends Record<string, any> = Record<string, any>
    >(
        // tslint:disable-next-line no-unnecessary-generics (it's used as the default type parameter for P)
        path: Route,
        // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
        ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    <
        Path extends string,
        P = RouteParameters<Path>,
        ResBody = any,
        ReqBody = any,
        ReqQuery = ParsedQs,
        Locals extends Record<string, any> = Record<string, any>
    >(
        // tslint:disable-next-line no-unnecessary-generics (it's used as the default type parameter for P)
        path: Path,
        // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
        ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    <
        P = ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = ParsedQs,
        Locals extends Record<string, any> = Record<string, any>
    >(
        path: PathParams,
        // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
        ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    <
        P = ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = ParsedQs,
        Locals extends Record<string, any> = Record<string, any>
    >(
        path: PathParams,
        // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
        ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    (path: PathParams, subApplication: Application): T;
}
```

但是我们实际开发中除了使用 router.get(path, ...handlers);  还经常使用 router.get(path, ...handlers, targetMethod);  这是怎么回事呢？ targetMethod 这里指的是控制器中的方法。首先我们看一个 targetMethod 长什么样：

```typescript
public login(req: Request, res: Response): void {
    let htmlstr = `<div><form method="post" action = "/user/loginprocess">
                      <div>用户名: <input type='text' name = 'username'/></div>
                      <div>密码: <input type='password' name = 'pwd'/></div>
                      <div><input type="submit" value = "提交" /> </div>
                    </form></div>`
    res.send(htmlstr);
}
```

显然它是函数类型：**(req: Request, res: Response) => void**

然后我们再看下 RequestHandler 是啥样子：

> ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>

```typescript
export interface RequestHandler<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> {
    // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2)
    (
        req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
        res: Response<ResBody, Locals>,
        next: NextFunction,
    ): void;
}
```

为了简化我们忽略泛型提取骨架：**(req: Request, res: Response, next: NextFunction) => void**

对比一下：

**targetMethod: (req: Request, res: Response) => void**

**RequestHander: (req: Request, res: Response, next: NextFunction) => void**

**根据少参数的函数类型 extends 多参数的函数类型(前提是相同位置的参数类型保持一致)，可以得出结论：**

**targetMethod extends RequestHander**

所以，router.get(path, ...handlers, targetMethod) 是符合 router.get(path, ...handlers) 的，因为 targetMethod 也可以看做 ...handlers 解构出来的一个元素。



#### Response类

```typescript
import * as http from 'http';

export type Send<ResBody = any, T = Response<ResBody>> = (body?: ResBody) => T;

interface Response<
  ResBody = any,
  Locals extends Record<string, any> = Record<string, any>,
  StatusCode extends number = number> {

  status(code: StatusCode): this;//this就是当前函数所在的接口类型Response
  send?: Send<ResBody, this>;  //实际上就是 send(body?: ResBody): this
}

// 根据Response接口类型构造一个符合条件的对象
let response: Response = {
  status(code: number): Response {
    return response
  },
  send(body: any): Response {
    return response;
  }
}
response.status(200).status(300)
response.send("<div>one</div>").send("<div>two</div>")
```

**为什么Response接口中的函数类型的返回值要定义成 this 呢？好处就是可以实现链式调用。**以 status 方法为例（这里为了简化我去掉了所有泛型）：

```typescript
interface Response {
  status(code: number): this;
}

// 根据Response接口类型构造一个符合条件的对象，由于接口中规定 status()返回的是this，也就是接口Response本身，故这里也返回Response。response对象本身就是Response类型，status方法要求返回Response，故方法体中就可以直接返回response对象本身。 
let response: Response = {
  status(code: number): Response {
    return response
  }
}

// 下面就可以链式调用了
response.status(200).status(300).status(400); 
```



#### Route extends string的理解

```typescript
// 需要安装 express、@types/express 库
import {RouteParameters} from "express-serve-static-core"

type IRouterMatcher = <Route extends string, P = RouteParameters<Route>, ResBody = any, ReqBody = any,
    Locals extends Record<string, any> = Record<string, any>>( path: Route,) => void;

// IRouterMatcher 的泛型都有默认值，故这里创建符合 IRouterMatcher 类型约束条件的 get 函数时，可以不传递任何具体泛型。
let get: IRouterMatcher = (path) => {

}

// 调用get方法时仍然不给具体泛型，则IRouterMatcher里会根据传入的path参数的值来推导Route的具体类型。由于IRouterMatcher中规定了 Route extends string，"/showFood/:foodname/:price" 本身是符合这一条件的，故TS会将"/showFood/:foodname/:price"作为值类型推断给Route.
get("/showFood/:foodname/:price");
```

![image-20220508100206141](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205081002829.png)



可以看到确实是将 "/showFood/:foodname/:price" 作为类型传递给了 Route。当然，如果显示指定Route为string，则又有所变化。

![image-20220508100524699](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205081005846.png)



**如果不使用 Route extends string 会怎么样呢？**

```typescript
import {RouteParameters} from "express-serve-static-core"

// 将Route extends string 改默认值改为any
type IRouterMatcher = <Route = any,
    P = RouteParameters<any>,
    ResBody = any,
    ReqBody = any,
    Locals extends Record<string, any> = Record<string, any>>(
    path: Route,
) => void

let get: IRouterMatcher = (path) => {

}

get("/showFood/:foodname/:price");
```

![image-20220508100351046](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205081003354.png)



综上所述，Route extends string ，在不明确传递具体类型的前提下，可以得到具体的字符串值作为类型的泛型Route。



### 复杂嵌套泛型

#### 嵌套泛型类型实现去尾

```typescript
export type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;

// 源码中使用多层嵌套，刚开始可能看不明白，可先看下面的分步解析，回过头再看这里。
export type GetRouteParameter<S extends string> = RemoveTail<
    RemoveTail<RemoveTail<S, `/${string}`>, `-${string}`>,
    `.${string}`
    >;
```

嵌套泛型类型实现去尾分步解析：

```typescript
export type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;

//type testType='/showFood/:foodname/:price' extends `${infer P}${'foodname/:price'}`? P: number;

//1   "/showFood"
type removeTailFirstType1 = RemoveTail<'/showFood/:foodname/:price', '/:foodname/:price'>;
let removeTail: RemoveTail<'/showFood/:foodname/:price', '/:foodname/:price'>;

// 2 嵌套  "/showFood.beijing-china"
type removeTailFirstType2 = RemoveTail<'/showFood.beijing-china/:foodname/:price', '/:foodname/:price'>;
let removeTail2: RemoveTail<removeTailFirstType2, '-china'>;

// 3.再次嵌套  "/showFood.beijing"
type removeTailFirstType3 = RemoveTail<removeTailFirstType2, '-china'>;
let removeTail3: RemoveTail<removeTailFirstType3, '.beijing'>;

//----------------------------------------------------------------------------------------------------------

export type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;

//1  ":foodname.beijing-china"
type removeTailFirstType1 = RemoveTail<':foodname.beijing-china/:price/:shopname', '/:price/:shopname'>;
let removeTail: RemoveTail<':foodname.beijing-china/:price/:shopname', '/:price/:shopname'>;

// 2 嵌套 ":foodname.beijing"
type removeTailFirstType2 = RemoveTail<removeTailFirstType1, '-china'>;
let removeTail2: RemoveTail<removeTailFirstType1, '-china'>;

// 3.再次嵌套  ":foodname.beijing"
type removeTailFirstType3 = RemoveTail<removeTailFirstType2, '-china'>;
let removeTail3: RemoveTail<removeTailFirstType3, '.beijing'>;

//----------------------------------------------------------------------------------------------------------

export type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;

//1  ":foodname.beijing-china"
type removeTailFirstType1 = RemoveTail<':foodname.beijing-china/:price/:shopname', `/${string}`>;
let removeTail: RemoveTail<':foodname.beijing-china/:price/:shopname', '/:price/:shopname'>;

// 2 嵌套  ":foodname.beijing"
type removeTailFirstType2 = RemoveTail<removeTailFirstType1, `-${string}`>;
let removeTail2: RemoveTail<removeTailFirstType1, `-${string}`>;

// 3.再次嵌套  ":foodname"
type removeTailFirstType3 = RemoveTail<removeTailFirstType2, `.${string}`>;
let removeTail3: RemoveTail<removeTailFirstType3, `.${string}`>;
```

PS：假如 S 整个字符串都符合 `/${string}`，那么 S 会返回什么？

​	   type removeTailType = RemoveTail<'/:foodname.beijing-china/:price/:shopname', `/${string}`>; 

​		答案是：""



#### Route解析及泛型递归调用

首先看一个问题：

```typescript
@get("/searchfood/:foodname/:price/:shopname")
@middleware(isValidUser)
searchFood(req: Request, res: Response): void {
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.write(`foodname: ${req.params.foodname} \n`);
    res.write(`price: ${req.params.price} \n`);
    res.write(`shopname: ${req.params.shopname}`);
    res.end();
}
```

为什么使用 req.params.foodname 这样的用法不会报错？params 是如何具备 foodname、price、shopname 这些属性的？

首先，根据前面的源码分析，我们知道 get 是一个 IRouteMatcher 类型。

![image-20220508130051821](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205081300350.png)

**Route实际上会被推断为类似下面的字符串值类型：**

**"/food/searchfood/foodname/price/shopname"**

**"/food/searchfood/:foodname/:price/:shopname"**



接下来，我们看Route给谁在使用？从 IRouteMatcher里很显然是给 P = RouteParameters<Route> 中的RouteParameters在使用。我们先不管RouteParameters【因为RouteParameters<Route>相当于是P的默认值】，我们先看下P给谁在用？

![image-20220508130541517](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205081305162.png)



显然是给 RequestHander 使用。我们定位到 RequestHander，发现它也没有直接使用，而是给了 Request 使用。

![image-20220508130717589](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205081307047.png)



定位到 Request 接口，发现它有很多属性，其中就包含我们在上层应用中使用的 params!

```typescript
export interface Request<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> extends http.IncomingMessage,
        Express.Request {

		 method: string;

    params: P;  // P最后给到了params

    query: ReqQuery;

    route: any;

    url: string;

    baseUrl: string;
}
```

所以最后得出结论，  P = RouteParameters<Route> 最终是给 params 使用， params 的类型就是P。

下面我们将分析 RouteParameters<Route> 到底是个啥？

```typescript
export interface ParamsDictionary {
    [key: string]: string;
}

type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;
type GetRouteParameter<S extends string> = RemoveTail<
    RemoveTail<RemoveTail<S, `/${string}`>, `-${string}`>,
    `.${string}`
    >;

// 这里以 path = "/food/searchfood/:foodname/:price/:shopname" 为例进行说明。
export type RouteParameters<Route extends string> = string extends Route
    ? ParamsDictionary
    : Route extends `${string}(${string}`
        ? ParamsDictionary
        : Route extends `${string}:${infer Rest}`  // Rest ==> "foodname/:price/:shopname"
            ? (
            GetRouteParameter<Rest> extends never  //GetRouteParameter<Rest> ==> foodname
                ? ParamsDictionary
                : GetRouteParameter<Rest> extends `${infer ParamName}?`  // ParamName ==> foodname
                    ? { [P in ParamName]?: string }   // { [P in ParamName]?: string } ==> { foodname: string }
                    : { [P in GetRouteParameter<Rest>]: string }
            ) &		//交叉类型 &
            (Rest extends `${GetRouteParameter<Rest>}${infer Next}`  // Next ==> /:price/:shopname
                ? RouteParameters<Next> : unknown)  // 泛型递归，不断交叉
            : {};

// paramsType1: {}
type paramsType1 = RouteParameters<"">;

// paramsType2：{}
type paramsType2 = RouteParameters<"/food/searchfood/foodname/price/shopname">;

// paramsType3:   {foodname: string} & {price: string} & {shopname: string} & RouteParameters<"">
// 等价于: {foodname: string} & {price: string} & {shopname: string} & {}
// 等价于: {foodname: string, price: string, shopname: string}
type paramsType3 = RouteParameters<"/food/searchfood/:foodname/:price/:shopname">;
```



通过RouteParameters<Route> 的泛型递归调用，将我们的path中包含的动态路由参数解析为一个字面量对象形式。当然我们看到的是交叉类型：{foodname: string} & {price: string} & {shopname: string} & {}，但是效果是等价于：{foodname: string, price: string, shopname: string} 的。



# 第7章：运用 TS 手写 Promise 源码

## 技能大纲

**11-1   【准备】  Promise 的三种状态和注意细节 【会的同学略过】**   

**11-2  【 手写源码】  Promise 第一步—— Promise 回调 +then 初步 实现  **

**11-3  【手写源码】  resolve 方法 执行失败后的处理**

**11-4  【手写源码】  同步 级联 then 方法  实现  **

**11-5  【手写源码】   实现单级异步+单级 then 方法  ** 

**11-6  【手写源码】    实现单级异步+级联 then 方法  ** 

**11-7  【手写源码】   构建多异步+级联 then 【 第一种实现方式 】  ** 

**11-8  【手写源码】  构建多异步+级联 then 【 第二种实现方式 】  **

**11-9  【手写源码】 Promise.all  源码实现**



## Promise 基础知识准备

> 参考资料：https://note.youdao.com/s/PTWkebtw

**promise 的三种状态**：pending ，resolve，reject 。pending 就是 等待，resolve可以理解为成功，reject 可以理解为拒绝

**pending 状态 理解**： pending状态下，可能执行 resolve方法，也可能执行 reject方法。 但在执行 resolve或 reject前 为 pending 状态。

**resolve状态理解：**代表成功态，执行 resolve方法后的状态。

**reject 状态理解：**代表失败态，执行 reject方法后的状态。

**状态特性**：一旦成功了就不能失败，反过来也是一样。

**then方法**： 每个 promsie 都有一个 then 方法。

**其他也执行 reject 的 场景：** 正在执行 resolve方法报错了，也进入 reject 失败状态。



## Promise 回调 +then 初步实现

**重点知识：**  1. 实现 actiontype    2.  Promise 回调实现   3. 测试类实现

代码：https://gitee.com/Allen_2017/ts-promise/commit/6305cdab87e304ecc9c94fd87f5aa48c4b98262d

**1. 添加Promise相关类型** 

```typescript
export type ResolveType = (value: any) => void;

export type RejectType = (value: any) => void;

export type Executor = (resolve: ResolveType, reject: RejectType) => void;

// Promise的3种状态
export enum Status {
    PENDING = "pending",
    FULLFILLED = "fullfilled",
    REJECTED = "rejected",
}

```

**2.  Promise 回调实现**  

```typescript
import {ResolveType, RejectType, Executor, Status} from "../types";

class Promise {
    public resolve!: ResolveType;
    public reject!: RejectType;
    public status!: string;
    public resolveValue!: any;
    public rejectValue!: any;

    constructor(executor: Executor) {
        this.status = Status.PENDING;
        this.resolve = (value) => {
            if (this.status === Status.PENDING) {
                console.log("成功了!");
                this.status = Status.FULLFILLED;
                this.resolveValue = value;
            }
        };
        this.reject = (value) => {
            if (this.status === Status.PENDING) {
                console.log("失败了!");
                this.status = Status.REJECTED;
                this.rejectValue = value;
            }
        };
        executor(this.resolve, this.reject);
    }

    then(resolveFn: ResolveType, rejectFn: RejectType): void {
        if (this.status === Status.FULLFILLED) {
            resolveFn(this.resolveValue);
        }
        if (this.status === Status.REJECTED) {
            resolveFn(this.rejectValue);
        }
    }
}


export default Promise;
```

  **3. 测试类实现**

```typescript
import Promise from "../promise";

// 注意：此时还没涉及到异步，完全是纯同步执行的。
let promise = new Promise((resolve, reject) => {
    resolve("成功了！");
    // reject("失败了！");
});

promise.then((resolveData) => {
    console.log("resolveData:", resolveData);
}, (rejectData) => {
    console.log("rejectData:", rejectData);
});

export {}
```



## executor函数内部执行出错的处理

代码：https://gitee.com/Allen_2017/ts-promise/commit/3dd21816b488a541a774f2856e05f4c6497b3c9f

```typescript
// 例如：executor 执行器函数内部调用 resolve 传递的参数是字符串，但是resolve 函数内部却故意当做数组使用。
let promise = new Promise((resolve, reject) => {
    resolve("成功了！");
    // reject("失败了！");
});

//-----------------------------------------------------------------------------------------------------
import {ResolveType, RejectType, Executor, Status} from "../types";

class Promise {
    public resolve!: ResolveType;
    public reject!: RejectType;
    public status!: string;
    public resolveValue!: any;
    public rejectValue!: any;

    constructor(executor: Executor) {
        this.status = Status.PENDING;
        this.resolve = (value) => {
            // value 故意当做数组使用，编译时不会报错，因为 value 是any类型，但是运行时会报错，因为外部传入的是字符串。
            value[1] = 100;
            if (this.status === Status.PENDING) {
                console.log("成功了!");
                this.status = Status.FULLFILLED;
                this.resolveValue = value;
            }
        };
        this.reject = (value) => {
            if (this.status === Status.PENDING) {
                console.log("失败了!");
                this.status = Status.REJECTED;
                this.rejectValue = value;
            }
        };

        try {
            executor(this.resolve, this.reject);
        } catch (err) {
            // 必须修改状态，否则后面的 this.reject()不会执行.
            this.status = Status.PENDING;
            this.reject("executor执行出错!");
            throw new Error("程序终止!");
        }
    }

    then(resolveFn: ResolveType, rejectFn: RejectType): void {
        if (this.status === Status.FULLFILLED) {
            resolveFn(this.resolveValue);
        }
        if (this.status === Status.REJECTED) {
            resolveFn(this.rejectValue);
        }
    }
}


export default Promise;
```



## 同步级联 then 方法实现

代码：https://gitee.com/Allen_2017/ts-promise/commit/e32f41e750589225ef4fb36ca252bf2e6681be28

​           https://gitee.com/Allen_2017/ts-promise/commit/010bf13798096210e8bbe8066a808ed90595c1af

1. **修改type文件【返回值any】**

   ```typescript
   export type ResolveType = (value: any) => any;
   
   export type RejectType = (value: any) => any;
   
   export type Executor = (resolve: ResolveType, reject: RejectType) => any;
   
   // Promise的3种状态
   export enum Status {
       PENDING = "pending",
       FULLFILLED = "fullfilled",
       REJECTED = "rejected",
   }
   ```



2. **修改 Promise 类**

   ```typescript
   import {ResolveType, RejectType, Executor, Status} from "../types";
   
   class Promise {
       public resolve!: ResolveType;
       public reject!: RejectType;
       public status!: string;
       public resolveValue!: any;
       public rejectValue!: any;
   
       constructor(executor: Executor) {
           this.status = Status.PENDING;
           this.resolve = (value) => {
               if (this.status === Status.PENDING) {
                   this.status = Status.FULLFILLED;
                   this.resolveValue = value;
               }
           };
           this.reject = (value) => {
               if (this.status === Status.PENDING) {
                   this.status = Status.REJECTED;
                   this.rejectValue = value;
               }
           };
   
           try {
               executor(this.resolve, this.reject);
           } catch (err) {
               // 必须修改状态，否则后面的 this.reject()不会执行.
               this.status = Status.PENDING;
               this.reject("executor执行出错!");
               throw new Error("程序终止!");
           }
       }
   
       then(resolveFn: ResolveType, rejectFn: RejectType): Promise {
           return new Promise((resolve, reject) => {
               let result;
               if (this.status === Status.FULLFILLED) {
                   result = resolveFn(this.resolveValue);
                   resolve(result);
               }
               if (this.status === Status.REJECTED) {
                   result = resolveFn(this.rejectValue);
                   reject(result);
               }
           })
       }
   }
   
   
   export default Promise;
   ```

   

2. **修改测试类**

   ```typescript
   import Promise from "../promise";
   
   let promise = new Promise((resolve, reject) => {
       resolve("成功了！");
       // reject("失败了！");
   });
   
   promise.then((resolveData1) => {
       console.log("第1个then执行成功:", resolveData1);
       return "ok1";
   }, (rejectData1) => {
       console.log("第1个then执行失败:", rejectData1);
       return "failed1";
   }).then((resolveData2) => {
       console.log("第2个then执行成功:", resolveData2);
       return "ok2";
   }, (rejectData2) => {
       console.log("第2个then执行失败:", rejectData2);
       return "failed2";
   }).then((resolveData3) => {
       console.log("第3个then执行成功:", resolveData3);
   }, (rejectData3) => {
       console.log("第3个then执行失败:", rejectData3);
   })
   
   export {}
   ```

   

## 实现单级异步+单级 then 方法

代码：https://gitee.com/Allen_2017/ts-promise/commit/23c71d2f850f6571c3c4b23a6866def6cc297f4b

**1. Promise 类**

```typescript
import {ResolveType, RejectType, Executor, Status, Fn} from "../types";

class Promise {
    public resolve!: ResolveType;
    public reject!: RejectType;
    public status!: string;
    public resolveValue!: any;
    public rejectValue!: any;
    // 保存成功状态要执行的函数
    public resolveCallbacks: Array<Fn> = [];
    // 保存失败状态要执行的函数
    public rejectCallbacks: Array<Fn> = [];

    constructor(executor: Executor) {
        this.status = Status.PENDING;
        this.resolve = (value) => {
            if (this.status === Status.PENDING) {
                this.status = Status.FULLFILLED;
                this.resolveValue = value;
                // 执行回调函数，此时 this.resolveValue 已经有值
                this.resolveCallbacks.forEach(callback => callback());
            }
        };
        this.reject = (value) => {
            if (this.status === Status.PENDING) {
                this.status = Status.REJECTED;
                this.rejectValue = value;
                // 执行回调函数，此时 this.rejectValue 已经有值
                this.rejectCallbacks.forEach(callback => callback());
            }
        };

        try {
            executor(this.resolve, this.reject);
        } catch (err) {
            // 必须修改状态，否则后面的 this.reject()不会执行.
            this.status = Status.PENDING;
            this.reject("executor执行出错!");
            throw new Error("程序终止!");
        }
    }

    then(resolveFn: ResolveType, rejectFn: RejectType): Promise {
        return new Promise((resolve, reject) => {
            let result;
            if (this.status === Status.FULLFILLED) {
                result = resolveFn(this.resolveValue);
                resolve(result);
            } else if (this.status === Status.REJECTED) {
                result = rejectFn(this.rejectValue);
                reject(result);
            } else { //pending状态下先不执行回调函数，而是保存起来
                //注意：resolveFn来自于上一个promise.then()传递过来的参数，而resolve则来自本new Promise()里的executor执行器的参数.
                // 那executor的参数resolve哪来的呢？在 Promise 类的构造函数中创建的. 同样的道理对于 rejectFn 和 reject。
                this.resolveCallbacks.push(() => {
                    result = resolveFn(this.resolveValue);
                    resolve(result);
                });
                this.rejectCallbacks.push(() => {
                    result = rejectFn(this.rejectValue);
                    reject(result);
                });
            }
        })
    }
}


export default Promise;
```



**2. 修改测试类**

```typescript
import Promise from "../promise";

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("成功了！");
        // reject("失败了！");
    }, 1000)
});

// 1.promise 的 xxxCallbacks 里保存的是 then1() 返回的Promise对象的executor中的回调函数, xxxCallbacks.length = 1;
// 2.then1 的 xxxCallbacks 里保存的是 then2() 返回的Promise对象的executor中的回调函数, xxxCallbacks.length = 1;
// 3.then2 的 xxxCallbacks 里保存的是 then3() 返回的Promise对象的executor中的回调函数, xxxCallbacks.length = 1;
// 4.then3 的 xxxCallbacks 是空的, xxxCallbacks.length = 0;
promise.then((resolveData1) => {
    console.log("第1个then执行成功:", resolveData1);
    return "ok1";
}, (rejectData1) => {
    console.log("第1个then执行失败:", rejectData1);
    return "failed1";
}).then((resolveData2) => {
    console.log("第2个then执行成功:", resolveData2);
    return "ok2";
}, (rejectData2) => {
    console.log("第2个then执行失败:", rejectData2);
    return "failed2";
}).then((resolveData3) => {
    console.log("第3个then执行成功:", resolveData3);
}, (rejectData3) => {
    console.log("第3个then执行失败:", rejectData3);
})

export {}
```



## 构建多异步+级联 then实现方式1

本节实现  1. 升级 Promise 类 实现多级异步+级联 then    2. 修改测试类  

代码：https://gitee.com/Allen_2017/ts-promise/commit/3c64b56b34923039bd29fe8fa81e10783112fb5b



实现方式一：setTimeout 方式，这种方式很好理解，但是有缺陷，因为setTimeout 的延时时长不好确定，但必须要大于等于then里边的Promise里的异步操作执行的时间，这样 result.resolveValue、result.rejectValue 才有值。

**1. 升级Promise类**

```typescript
import {ResolveType, RejectType, Executor, Status, Fn} from "../types";

class Promise<T = any> {
    public resolve!: ResolveType;
    public reject!: RejectType;
    public status!: string;
    public resolveValue!: any;
    public rejectValue!: any;
    // 保存成功状态要执行的函数
    public resolveCallbacks: Array<Fn> = [];
    // 保存失败状态要执行的函数
    public rejectCallbacks: Array<Fn> = [];

    constructor(executor: Executor) {
        this.status = Status.PENDING;
        this.resolve = (value) => {
            if (this.status === Status.PENDING) {
                this.status = Status.FULLFILLED;
                this.resolveValue = value;
                // 执行回调函数，此时 this.resolveValue 已经有值
                this.resolveCallbacks.forEach(callback => callback());
            }
        };
        this.reject = (value) => {
            if (this.status === Status.PENDING) {
                this.status = Status.REJECTED;
                this.rejectValue = value;
                // 执行回调函数，此时 this.rejectValue 已经有值
                this.rejectCallbacks.forEach(callback => callback());
            }
        };

        try {
            executor(this.resolve, this.reject);
        } catch (err) {
            // 必须修改状态，否则后面的 this.reject()不会执行.
            this.status = Status.PENDING;
            this.reject("executor执行出错!");
            throw new Error("程序终止!");
        }
    }

    then(resolveFn: ResolveType, rejectFn: RejectType): Promise {
        return new Promise((resolve, reject) => {
            let result;
            if (this.status === Status.FULLFILLED) {
                result = resolveFn(this.resolveValue);
                resolve(result);
            } else if (this.status === Status.REJECTED) {
                result = rejectFn(this.rejectValue);
                reject(result);
            } else {
                //pending状态下先不执行回调函数，而是保存起来
                this.processPending(resolveFn, rejectFn, resolve, reject);
            }
        })
    }

    processPending(resolveFn: ResolveType, rejectFn: RejectType, resolve: ResolveType, reject: RejectType) {
        let result: any;
        //注意：resolveFn来自于上一个promise.then()传递过来的参数，而resolve则来自本new Promise()里的executor执行器的参数.
        // 那executor的参数resolve哪来的呢？在 Promise 类的构造函数中创建的. 同样的道理对于 rejectFn 和 reject。
        this.resolveCallbacks.push(() => {
            result = resolveFn(this.resolveValue);
            if (isPromise(result)) {
                // 由于result这个promise里执行的也是异步操作，故直接拿不到result.resolveValue，需要等异步操作执行完后
                // result.resolveValue才有值，所以这里也使用一个 setTimeout 等待一下。
                setTimeout(() => {
                    resolve(result.resolveValue);
                }, 1000);
            } else {
                resolve(result);
            }
        });
        this.rejectCallbacks.push(() => {
            result = rejectFn(this.rejectValue);
            if (isPromise(result)) {
                setTimeout(() => {
                    reject(result.rejectValue);
                }, 1000);
            } else {
                reject(result);
            }
        });
    }
}

function isObject(val: any): val is Record<any, any> {
    return val && typeof val === "object";
}

function isFunction(val: any): val is Function {
    return val && typeof val === "function";
}

function isPromise(val: any): val is Promise {
    return isObject(val) && isFunction(val.then);
}

export default Promise;
```

**2. 修改测试类**

```typescript
import Promise from "../promise";

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("成功了！");
        // reject("失败了！");
    }, 1000)
});

// 1.promise 的 xxxCallbacks 里保存的是 then1() 返回的Promise对象的executor中的回调函数, xxxCallbacks.length = 1;
// 2.then1 的 xxxCallbacks 里保存的是 then2() 返回的Promise对象的executor中的回调函数, xxxCallbacks.length = 1;
// 3.then2 的 xxxCallbacks 里保存的是 then3() 返回的Promise对象的executor中的回调函数, xxxCallbacks.length = 1;
// 4.then3 的 xxxCallbacks 是空的, xxxCallbacks.length = 0;
// promise.then((resolveData1) => {
//     console.log("第1个then执行成功:", resolveData1);
//     return "ok1";
// }, (rejectData1) => {
//     console.log("第1个then执行失败:", rejectData1);
//     return "failed1";
// }).then((resolveData2) => {
//     console.log("第2个then执行成功:", resolveData2);
//     return "ok2";
// }, (rejectData2) => {
//     console.log("第2个then执行失败:", rejectData2);
//     return "failed2";
// }).then((resolveData3) => {
//     console.log("第3个then执行成功:", resolveData3);
// }, (rejectData3) => {
//     console.log("第3个then执行失败:", rejectData3);
// })


promise.then((resolveData1) => {
    console.log("第1个then执行成功:", resolveData1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("第二个异步操作执行成功!");
        }, 1000);
    });
}, (rejectData1) => {
    console.log("第1个then执行失败:", rejectData1);
    return "failed1";
}).then((resolveData2) => {
    console.log("第2个then执行成功:", resolveData2);
    return "ok2";
}, (rejectData2) => {
    console.log("第2个then执行失败:", rejectData2);
    return "failed2";
}).then((resolveData3) => {
    console.log("第3个then执行成功:", resolveData3);
}, (rejectData3) => {
    console.log("第3个then执行失败:", rejectData3);
})

export {}
```



## 构建多异步+级联 then实现方式2

实现方式二：正统方式，可以完美避免实现方式一的缺陷，但是理解起来费劲一些。

**1 升级 Promise 类**

```typescript
import {ResolveType, RejectType, Executor, Status, Fn} from "../types";

class Promise<T = any> {
    public resolve!: ResolveType;
    public reject!: RejectType;
    public status!: string;
    public resolveValue!: any;
    public rejectValue!: any;
    // 保存成功状态要执行的函数
    public resolveCallbacks: Array<Fn> = [];
    // 保存失败状态要执行的函数
    public rejectCallbacks: Array<Fn> = [];

    constructor(executor: Executor) {
        this.status = Status.PENDING;
        this.resolve = (value) => {
            if (this.status === Status.PENDING) {
                this.status = Status.FULLFILLED;
                this.resolveValue = value;
                // 执行回调函数，此时 this.resolveValue 已经有值
                this.resolveCallbacks.forEach(callback => callback());
            }
        };
        this.reject = (value) => {
            if (this.status === Status.PENDING) {
                this.status = Status.REJECTED;
                this.rejectValue = value;
                // 执行回调函数，此时 this.rejectValue 已经有值
                this.rejectCallbacks.forEach(callback => callback());
            }
        };

        try {
            executor(this.resolve, this.reject);
        } catch (err) {
            // 必须修改状态，否则后面的 this.reject()不会执行.
            this.status = Status.PENDING;
            this.reject("executor执行出错!");
            throw new Error("程序终止!");
        }
    }

    then(resolveFn: ResolveType, rejectFn: RejectType): Promise {
        return new Promise((resolve, reject) => {
            let result;
            if (this.status === Status.FULLFILLED) {
                this.processResolve(resolveFn, resolve, reject);
            } else if (this.status === Status.REJECTED) {
                this.processReject(rejectFn, resolve, reject);
            } else {
                //pending状态下先不执行then的回调函数，而是保存起来.
                this.resolveCallbacks.push(() => {
                    this.processResolve(resolveFn, resolve, reject);
                });
                this.rejectCallbacks.push(() => {
                    this.processReject(rejectFn, resolve, reject);
                });
            }
        })
    }

    processResolve(resolveFn: ResolveType, resolve: ResolveType, reject: RejectType) {
        let result: any;
        //注意：resolveFn来自于上一个promise.then()传递过来的参数，而resolve、reject则来自本new Promise()里的executor执行器的参数.
        // 那executor的参数resolve、reject哪来的呢？在 Promise 类的构造函数中创建的。
        result = resolveFn(this.resolveValue);
        if (isPromise(result)) {
            // 由于result这个promise里执行的也是异步操作，故直接拿不到result.resolveValue，需要等异步操作执行完后result.resolveValue才有值，
            // 也就是在result.then()里才能拿到值。
            result.then((resolveData) => {
                resolve(resolveData);
            }, (rejectData) => {
                reject(rejectData);
            });
        } else {
            resolve(result);
        }
    }

    processReject(rejectFn: RejectType, resolve: ResolveType, reject: RejectType) {
        let result: any;
        //注意：rejectFn来自于上一个promise.then()传递过来的参数，而resolve、reject则来自本new Promise()里的executor执行器的参数.
        // 那executor的参数resolve、reject哪来的呢？在 Promise 类的构造函数中创建的。
        result = rejectFn(this.rejectValue);
        if (isPromise(result)) {
            // 由于result这个promise里执行的也是异步操作，故直接拿不到result.rejectValue，需要等异步操作执行完后result.rejectValue才有值，
            // 也就是在result.then()里才能拿到值。
            result.then((resolveData) => {
                resolve(resolveData);
            }, (rejectData) => {
                reject(rejectData);
            });
        } else {
            reject(result);
        }
    }
}

function isObject(val: any): val is Record<any, any> {
    return val && typeof val === "object";
}

function isFunction(val: any): val is Function {
    return val && typeof val === "function";
}

function isPromise(val: any): val is Promise {
    return isObject(val) && isFunction(val.then);
}

export default Promise;
```



**2. 修改测试类**

```typescript
import Promise from "../promise";

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("成功了！");
        // reject("失败了！");
    }, 1000);
    // 同步，实际开发中这种情况很少，Promise设计的初衷就是用来处理异步的.
    // resolve("成功了！");
    // reject("失败了！");
});

// 1.promise 的 xxxCallbacks 里保存的是 then1() 返回的Promise对象的executor中的回调函数, xxxCallbacks.length = 1;
// 2.then1 的 xxxCallbacks 里保存的是 then2() 返回的Promise对象的executor中的回调函数, xxxCallbacks.length = 1;
// 3.then2 的 xxxCallbacks 里保存的是 then3() 返回的Promise对象的executor中的回调函数, xxxCallbacks.length = 1;
// 4.then3 的 xxxCallbacks 是空的, xxxCallbacks.length = 0;
// promise.then((resolveData1) => {
//     console.log("第1个then执行成功:", resolveData1);
//     return "ok1";
// }, (rejectData1) => {
//     console.log("第1个then执行失败:", rejectData1);
//     return "failed1";
// }).then((resolveData2) => {
//     console.log("第2个then执行成功:", resolveData2);
//     return "ok2";
// }, (rejectData2) => {
//     console.log("第2个then执行失败:", rejectData2);
//     return "failed2";
// }).then((resolveData3) => {
//     console.log("第3个then执行成功:", resolveData3);
// }, (rejectData3) => {
//     console.log("第3个then执行失败:", rejectData3);
// })


promise.then((resolveData1) => {
    console.log("第1个then执行成功:", resolveData1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("第二个异步操作执行成功!");
            // reject("第二个异步操作执行失败!");
        }, 1000);
    });
}, (rejectData1) => {
    console.log("第1个then执行失败:", rejectData1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("第二个异步操作执行成功!");
            // reject("第二个异步操作执行失败!");
        }, 1000);
    });
}).then((resolveData2) => {
    console.log("第2个then执行成功:", resolveData2);
    return "ok2";
}, (rejectData2) => {
    console.log("第2个then执行失败:", rejectData2);
    return "failed2";
}).then((resolveData3) => {
    console.log("第3个then执行成功:", resolveData3);
}, (rejectData3) => {
    console.log("第3个then执行失败:", rejectData3);
})

export {}
```



## Promise.all  源码实现

代码：https://gitee.com/Allen_2017/ts-promise/commit/757573039795b965e8645e21c569b26c95c6357b



 **1. all 静态方法实现**

```typescript
static all(promises: Promise[]) {
    return new Promise((resolve, reject) => {
         let successResults: Array<any> = [];
            for (let i = 0; i < promises.length; i++) {
                // 使用立即执行函数解决i的问题
                (function (index: number) {
                    let promise = promises[index];
                    promise.then((resolveData) => {
                        successResults[index] = resolveData;
                        if (index === promises.length - 1) {
                            resolve(successResults);
                        }
                    }, (rejectData) => {
                        // 1个失败则全部失败
                        console.log(`第${index + 1}个promise执行失败，导致Promise.all执行失败!`);
                        reject(rejectData);
                    });
                })(i)
            }
     })
}
```



 **1. race 静态方法实现**

```typescript
static race(promises: Promise[]) {
   return new Promise((resolve, reject) => {
       let finished: boolean = false;
            for (let i = 0; i < promises.length; i++) {
                // 使用立即执行函数解决i的问题
                (function (index: number) {
                    let promise = promises[index];
                    promise.then((resolveData) => {
                        if (!finished) {
                            console.log(`第${index + 1}个promise率先改变状态，Promise.race执行完毕!`);
                            resolve(resolveData);
                            finished = true;
                        }
                    }, (rejectData) => {
                        if (!finished) {
                            console.log(`第${index + 1}个promise率先改变状态，Promise.race执行完毕!`);
                            reject(rejectData);
                            finished = true;
                        }
                    });
             })(i)
        }     
   })     
}
```



**2. 修改测试类**

```typescript
import Promise from "../promise";


// 用于测试Promise.all 和 Promise.race
let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("第1个异步操作成功了！");
    }, 1000);
});

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("第2个异步操作成功了！");
        // reject("第2个异步操作失败了！");
    }, 1000);
});

let promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("第3个异步操作成功了！");
    }, 1000);
});

// all: [p1,p2,p3] 全部成功才算成功，一个失败全部失败。成功的结果：全部执行成功的结果数组；失败结果：执行失败的那个结果
// Promise.all([promise1, promise2, promise3]).then((resolveData) => {
//     console.log(`resolveData: `, resolveData);
// }, (rejectData) => {
//     console.log(`rejectData: `, rejectData);
// });

// race: [p1,p2,p3] 有1个promise率先改变状态race执行完毕，then()的结果取决于这个率先改变状态的promise，可以是成功的也可以是失败的。
Promise.race([promise1, promise2, promise3]).then((resolveData) => {
    console.log(`resolveData: `, resolveData);
}, (rejectData) => {
    console.log(`rejectData: `, rejectData);
});

export {}
```



## catch方法实现及代码重构

1、then方法2个参数均支持可选；2、catch方法实现（内部调用then方法）；

代码：https://gitee.com/Allen_2017/ts-promise/commit/a39a35f604cf48a741929d4c7e578af0b18bdec9

**1. 升级Promise类**

```typescript
import {ResolveType, RejectType, Executor, Status, Fn} from "../types";

class Promise<T = any> {
    public resolve!: ResolveType;
    public reject!: RejectType;
    public status!: string;
    public resolveValue!: any;
    public rejectValue!: any;
    // 保存成功状态要执行的函数
    public resolveCallbacks: Array<Fn> = [];
    // 保存失败状态要执行的函数
    public rejectCallbacks: Array<Fn> = [];

    constructor(executor: Executor) {
        this.status = Status.PENDING;
        this.resolve = (value) => {
            if (this.status === Status.PENDING) {
                this.status = Status.FULLFILLED;
                this.resolveValue = value;
                // 执行回调函数，此时 this.resolveValue 已经有值
                this.resolveCallbacks.forEach(callback => callback());
            }
        };
        this.reject = (value) => {
            if (this.status === Status.PENDING) {
                this.status = Status.REJECTED;
                this.rejectValue = value;
                // 执行回调函数，此时 this.rejectValue 已经有值
                this.rejectCallbacks.forEach(callback => callback());
            }
        };

        try {
            executor(this.resolve, this.reject);
        } catch (err: any) {
            // 必须修改状态，否则后面的 this.reject()不会执行.
            this.status = Status.PENDING;
            this.reject("executor执行出错!");
            throw new Error("程序终止!");
        }
    }

    then(resolveFn?: ResolveType, rejectFn?: RejectType): Promise {
        return new Promise((resolve, reject) => {
            if (this.status === Status.FULLFILLED) {
                this.processResolve(resolveFn, resolve, reject);
            } else if (this.status === Status.REJECTED) {
                this.processReject(rejectFn, resolve, reject);
            } else {
                //pending状态下先不执行then的回调函数，而是保存起来.
                this.resolveCallbacks.push(() => {
                    this.processResolve(resolveFn, resolve, reject);
                });
                this.rejectCallbacks.push(() => {
                    this.processReject(rejectFn, resolve, reject);
                });
            }
        })
    }

    catch(rejectFn: RejectType): Promise {
        return this.then(undefined, rejectFn);
    }

    processResolve(resolveFn: ResolveType | undefined, resolve: ResolveType, reject: RejectType) {
        if (isFunction(resolveFn)) {
            let result = resolveFn(this.resolveValue);
            if (isPromise(result)) {
                result.then((resolveData) => {
                    resolve(resolveData);
                }, (rejectData) => {
                    reject(rejectData);
                });
            } else {
                resolve(result);
            }
        } else {
            resolve(undefined);
        }
    }

    processReject(rejectFn: RejectType | undefined, resolve: ResolveType, reject: RejectType) {
        if (isFunction(rejectFn)) {
            let result = rejectFn(this.rejectValue);
            if (isPromise(result)) {
                result.then((resolveData) => {
                    resolve(resolveData);
                }, (rejectData) => {
                    reject(rejectData);
                });
            } else {
                reject(result);
            }
        } else {
            reject(undefined);
        }
    }

    static all(promises: Promise[]) {
        return new Promise((resolve, reject) => {
            let successResults: Array<any> = [];
            for (let i = 0; i < promises.length; i++) {
                // 使用立即执行函数解决i的问题
                (function (index: number) {
                    let promise = promises[index];
                    promise.then((resolveData) => {
                        successResults[index] = resolveData;
                        if (index === promises.length - 1) {
                            resolve(successResults);
                        }
                    }, (rejectData) => {
                        // 1个失败则全部失败
                        console.log(`第${index + 1}个promise执行失败，导致Promise.all执行失败!`);
                        reject(rejectData);
                    });
                })(i)
            }
        })
    }

    static race(promises: Promise[]) {
        return new Promise((resolve, reject) => {
            let finished: boolean = false;
            for (let i = 0; i < promises.length; i++) {
                // 使用立即执行函数解决i的问题
                (function (index: number) {
                    let promise = promises[index];
                    promise.then((resolveData) => {
                        if (!finished) {
                            console.log(`第${index + 1}个promise率先改变状态，Promise.race执行完毕!`);
                            resolve(resolveData);
                            finished = true;
                        }
                    }, (rejectData) => {
                        if (!finished) {
                            console.log(`第${index + 1}个promise率先改变状态，Promise.race执行完毕!`);
                            reject(rejectData);
                            finished = true;
                        }
                    });
                })(i)
            }
        })
    }
}

function isObject(val: any): val is Record<any, any> {
    return val && typeof val === "object";
}

function isFunction(val: any): val is Function {
    return val && typeof val === "function";
}

function isPromise(val: any): val is Promise {
    return isObject(val) && isFunction(val.then);
}

export default Promise;
```



**2. 修改测试类**

```typescript
import Promise from "../promise";

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("成功了！");
        // reject("失败了！");
    }, 1000);
    // 同步，实际开发中这种情况很少，Promise设计的初衷就是用来处理异步的，但是我们框架里还是要支持同步的。
    // resolve("成功了！");
    // reject("失败了！");
});

// 用于测试catch方法
promise.then((resolveData1) => {
    console.log("第1个then执行成功:", resolveData1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve("第二个异步操作执行成功!");
            reject("第二个异步操作执行失败!");
        }, 1000);
    });
}, (rejectData1) => {
    console.log("第1个then执行失败:", rejectData1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve("第二个异步操作执行成功!");
            reject("第二个异步操作执行失败!");
        }, 1000);
    });
}).then((resolveData2) => {
    console.log("第2个then执行成功:", resolveData2);
    return "ok2";
}).catch((err) => { // catch一般放到末尾，如果放到中间则作用和then是一样的.
    console.log("执行catch:", err);
    return "catched"
}).then((resolveData3) => {
    console.log("第3个then执行成功:", resolveData3);
}, (rejectData3) => {
    console.log("第3个then执行失败:", rejectData3);
})
```



## 其它等静态方法实现

主要包括：resolve、reject。

代码：https://gitee.com/Allen_2017/ts-promise/commit/0a74283e786c72e8a2c98b5218dd155baa8b348c

**1. 升级Promise类**

```typescript
import {ResolveType, RejectType, Executor, Status, Fn} from "../types";

class Promise<T = any> {
    public resolve!: ResolveType;
    public reject!: RejectType;
    public status!: string;
    public resolveValue!: any;
    public rejectValue!: any;
    // 保存成功状态要执行的函数
    public resolveCallbacks: Array<Fn> = [];
    // 保存失败状态要执行的函数
    public rejectCallbacks: Array<Fn> = [];

    constructor(executor: Executor) {
        this.status = Status.PENDING;
        this.resolve = (value) => {
            if (this.status === Status.PENDING) {
                this.status = Status.FULLFILLED;
                this.resolveValue = value;
                // 执行回调函数，此时 this.resolveValue 已经有值
                this.resolveCallbacks.forEach(callback => callback());
            }
        };
        this.reject = (value) => {
            if (this.status === Status.PENDING) {
                this.status = Status.REJECTED;
                this.rejectValue = value;
                // 执行回调函数，此时 this.rejectValue 已经有值
                this.rejectCallbacks.forEach(callback => callback());
            }
        };

        try {
            executor(this.resolve, this.reject);
        } catch (err: any) {
            // 必须修改状态，否则后面的 this.reject()不会执行.
            this.status = Status.PENDING;
            this.reject("executor执行出错!");
            throw new Error("程序终止!");
        }
    }

    then(resolveFn?: ResolveType, rejectFn?: RejectType): Promise {
        return new Promise((resolve, reject) => {
            if (this.status === Status.FULLFILLED) {
                this.processResolve(resolveFn, resolve, reject);
            } else if (this.status === Status.REJECTED) {
                this.processReject(rejectFn, resolve, reject);
            } else {
                //pending状态下先不执行then的回调函数，而是保存起来.
                this.resolveCallbacks.push(() => {
                    this.processResolve(resolveFn, resolve, reject);
                });
                this.rejectCallbacks.push(() => {
                    this.processReject(rejectFn, resolve, reject);
                });
            }
        })
    }

    catch(rejectFn: RejectType): Promise {
        return this.then(undefined, rejectFn);
    }

    processResolve(resolveFn: ResolveType | undefined, resolve: ResolveType, reject: RejectType) {
        if (isFunction(resolveFn)) {
            let result = resolveFn(this.resolveValue);
            if (isPromise(result)) {
                result.then((resolveData) => {
                    resolve(resolveData);
                }, (rejectData) => {
                    reject(rejectData);
                });
            } else {
                resolve(result);
            }
        } else {
            resolve(undefined);
        }
    }

    processReject(rejectFn: RejectType | undefined, resolve: ResolveType, reject: RejectType) {
        if (isFunction(rejectFn)) {
            let result = rejectFn(this.rejectValue);
            if (isPromise(result)) {
                result.then((resolveData) => {
                    resolve(resolveData);
                }, (rejectData) => {
                    reject(rejectData);
                });
            } else {
                reject(result);
            }
        } else {
            reject(undefined);
        }
    }

    static all(promises: Promise[]): Promise {
        return new Promise((resolve, reject) => {
            let successResults: Array<any> = [];
            for (let i = 0; i < promises.length; i++) {
                // 使用立即执行函数解决i的问题
                (function (index: number) {
                    let promise = promises[index];
                    promise.then((resolveData) => {
                        successResults[index] = resolveData;
                        if (index === promises.length - 1) {
                            resolve(successResults);
                        }
                    }, (rejectData) => {
                        // 1个失败则全部失败
                        console.log(`第${index + 1}个promise执行失败，导致Promise.all执行失败!`);
                        reject(rejectData);
                    });
                })(i)
            }
        })
    }

    static race(promises: Promise[]): Promise {
        return new Promise((resolve, reject) => {
            let finished: boolean = false;
            for (let i = 0; i < promises.length; i++) {
                // 使用立即执行函数解决i的问题
                (function (index: number) {
                    let promise = promises[index];
                    promise.then((resolveData) => {
                        if (!finished) {
                            console.log(`第${index + 1}个promise率先改变状态，Promise.race执行完毕!`);
                            resolve(resolveData);
                            finished = true;
                        }
                    }, (rejectData) => {
                        if (!finished) {
                            console.log(`第${index + 1}个promise率先改变状态，Promise.race执行完毕!`);
                            reject(rejectData);
                            finished = true;
                        }
                    });
                })(i)
            }
        })
    }

    static resolve(data: any): Promise {
        return new Promise((resolve, reject) => {
            resolve(data);
        });
    }

    static reject(data: any): Promise {
        return new Promise((resolve, reject) => {
            reject(data);
        });
    }
}

function isObject(val: any): val is Record<any, any> {
    return val && typeof val === "object";
}

function isFunction(val: any): val is Function {
    return val && typeof val === "function";
}

function isPromise(val: any): val is Promise {
    return isObject(val) && isFunction(val.then);
}

export default Promise;
```



**2. 测试用例**

```typescript
import Promise from "../promise";

let promise = Promise.resolve({name: "zhangsan", age: 28});
promise.then((resolveData) => {
    console.log("then执行成功:", resolveData);
}, (rejectData) => {
    console.log("then执行失败:", rejectData);
});

let promise2 = Promise.reject({name: "lisi", age: 29});
promise2.then((resolveData) => {
    console.log("then执行成功:", resolveData);
}, (rejectData) => {
    console.log("then执行失败:", rejectData);
});

export {}
```



## 自定义Promise无法模拟微任务说明

原生的Promise， 当上一个Promise 对象的状态发生改变后，then、catch 的回调函数会执行，但是它是异步的，会放入到微队列中等待执行。而我们自定义的 Promise 的then、catch 的回调函数执行的时候是同步的，我也不知道如何模拟进入微队列，只能先这样啦！
关于宏任务、微任务参考这个资料：https://note.youdao.com/s/3tWGPLXT。



# 第8章：运用TS手写Vuex源码

## **技能大纲**

**12-1   【 理解 Vuex4  】 贴切比喻通俗形象理解 Vuex**  

**12-2   【  Vuex4  单模块丶多模块+Vue3 + TS 整合 上 +下  】** 

**12-3    【 store 切割 】 公司 切割 store 的设计方案有哪些不好？**

**12-4     【getter 自动推导】Vuex 为什么不能推导 getter 方法，又如何解决呢？**

**12-5   【 Vuex4 源码整体架构 】 TS  版的 Vuex4 源码架构详解**

**12-6+12-7    【 手写  TS 版 Vuex4 源码 】 构建 Store  架构及诸多相关**

**12-8   【 手写  TS 版 Vuex4 源码 】单模块源码和应用+Vue3组件整合输出**

**12-9   【 手写  TS 版 Vuex4 源码 】多模块源码和应用+Vue3组件整合输出**

**12-10  【 手写  TS 版 Vuex4 源码 】 为模块注册准备——多模块源码升级优化**

**12-11  【 手写  TS 版 Vuex4 源码 】 commit 和 dispatch 实现**

**12-12  【 手写  TS 版 Vuex4 源码 】  commit 和 dispatch  优化**

**12-13  【 手写  TS 版 Vuex4 源码 】模块注册—— 管理 state 源码实现**

**12-14  【 手写  TS 版 Vuex4 源码 】模块注册——注册 getters**

**12-15  【 手写  TS 版 Vuex4 源码 】模块注册——注册 mutations**  

**12-16  【 手写  TS 版 Vuex4 源码 】模块注册——注册 actions**  

**12-17  【 手写  TS 版 Vuex4 源码 】模块注册——ActionContext  对象实现**  

**12-18  【 手写  TS 版 Vuex4 源码 】模块注册——注册 子模块+解决模块重复问题**

**12-19  【 手写  TS 版 Vuex4 源码 】模块注册—— 挑战性有难度的作业—— 响应式实现** 

**12-20    【 手写  TS 版 Vuex4 源码 】 大功告成 ！ Vue3 +Vuex 4+TS   再次整体运行**



## 贴切比喻形象理解 Vuex 

### Vuex工作流程比喻

**用户下订单购物，快递小哥将包裹送到菜鸟驿站，老板放入仓库，通知用户取件。**

State：菜鸟驿站，菜鸟驿站的仓库相当于总的 state，包裹比喻成用户看到的数据，每一个包裹都是一个state。

Mutation：菜鸟驿站老板，只有老板才能更新仓库里的内容。

Action：快递小哥从某个地方拿到包裹（数据），然后送到菜鸟驿站交给老板，老板放入仓库更新State并通知用户取件。



下面对购物流程进行举例，为了便于理解简化了一些步骤。

1. 用户网上购物下了一个订单，相当于发出一个action（召唤快递小哥），它是异步的，因为不可能马上就能拿到包裹。

2. 快递小哥从商家处（服务端）拿到包裹（数据）后，马不停蹄跑到菜鸟驿站门口。
3. 菜鸟驿站老板接过快递小哥的包裹，登记系统入库。
4. 仓库（State）包裹增加1个的同时，一条短信发送到用户手机，通知取货。
5. 用户拿到新买的衣服穿上相当于UI更新。



### Vuex基础知识

**1**. **Vuex 官方解释**： Vue 应用程序开发的状态管理模式，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。小说明：【react 技术栈的同学理解 mutations 类似  reducer ，其他都好理解啦。】

**2. store 定义:**   Vuex 中的核心对象，是 一个 全局唯一的组件数据状态的提供和管理者，也是组件数据状态改变的方法提供者。

**3. 通俗理解 **Vuex ：Vuex 借助 store 用来管理项目中所有组件的数据以及所有组件的数据变化的模式【特定功能的代码集合就是一种模式】，借助 store 对象 来完成组件中数据管理的模式， store 对象主要完成2件事。

**3.1 第一件事**：通过 一个总的 state 对象或函数（一般为对象） 集中管理项目中所有组件在页面上呈现出来的所有数据。

**3.2** **第二件事：**管理项目中任何一个组件在页面上呈现出来的数据的变化。

**4. 理解 store的各个组成部分**

**actions  定义** ：提供任何组件完成页面业务功能（如：登录）需要调用的方法的一个对象。

**定义理解**：actions 中的 每一个方法都必须异步访问后端服务器提供的 API。

**mutations 定义**：接受 actions 对象方法传递过来的数据的对象。

**定义理解**：mutations  把接收到的数据【新数据即数据状态的改变】传递给 state 。尽管用户通过组件页面可以直接访问到 mutations 的方法，但由于是同步机制而放弃这么做。

**state 定义**：一个提供所有组件的渲染数据【指响应式数据】的对象或函数【一般为对象】

**定义理解：**

1.  state 接收到 mutations 的 数据变化后，会通知 Vue 组件，进行响应式的更新。
2.  组件只能读取 state，不能修改之。

**gettters 定义**：提供组件的获取响应式 state 数据 的对象。



**完整配合过程**：用户在组件渲染后的页面发出请求， 组件通过 store. dispatch 访问到 actions 方法的异步方法，然后异步访问后端服务器提供的 API，后端服务器把从数据表中取出来的数据返回给 actions的方法后，actions 再 commit (提交）给 mutations 对象中的对应的方法，mutations 对象中的该方法 把数据传递给   响应式 的 state, 通知 Vue 组件，响应式的更新页面。





