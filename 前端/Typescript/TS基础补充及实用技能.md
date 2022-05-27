# 	  TS 基础补充及实用技能

## TS  定义、环境搭建、6大优势

  **定义：** 融合了面向对象后端的思想的超级版的 javaScript  语言。

**环境搭建**

```powershell
npm init -y 

yarn  add typescript -D

tsc --init
```

**优势：**

**优势1：编译时静态类型检测**：函数或方法传参或变量赋值不匹配时，会出现编译错误提示 ，规避了开发期间的大量低级错误，省时，省力。

**优势2：能自动提示**：变量类型、变量属性，不用来回切换文件或不小心写错导致的编码隐患。

**优势3：** **引入了泛型**：让大中项目，前端框架底层源码具备了高可扩展性这个巨大的优势，同时也有类型安全检查的优势。

**优势4**： **强大的 d.ts 声明文件**：声明文件像一个书的目录一样，清晰直观展示了依赖库文件的接口，type类型，类，函数，变量等声明。

**优势5：轻松编译成 JS 文件**：即使 TS 文件有错误，绝大多数情况也能编译出 JS 文件。

**优势6：灵活性高：** 尽管 TS 是一门 强类型检查语言，但也提供了 any 类型 和 as any 断言，这提供了 TS的灵活度。



## tsconfig.json 常用配置详解

```js
{
  "compilerOptions": {
    "target": "es2020", // 指定 TS 编译成 JS 后的js版本
    "module": "commonjs", // TS 编译成 JS 后采用的模块规范 commonjs amd cmd  es等         
    "lib": ["DOM","ES2020"], /*  指定 TS 编码期间可以使用的库文件版本 比如：ES5就不支持Set集合 */
    "outDir": "./dist", //     指定 TS 文件编译成 JS 后的输出目录                 /* Redirect output structure to the directory. */
    "rootDir": "./src", // 指定 TS 文件源码目录
    "strict": true, // 启用严格检查模式
    "strictNullChecks":false,// null 和 undefined即是值，也是类型, null 和 undefined 值 只能赋值给 any ,unknown和它们各自的类型
    "noImplicitAny": true, // 一般是指表达式或函数参数上有隐含的 any类型时报错
    "experimentalDecorators": true, /* 启用ES7装饰器实验开启选项 */
    "emitDecoratorMetadata": true, /* 启用装饰器元数据开启选项 */
    "declaration": true, // 指定 TS 文件编译后生成相应的.d.ts文件
    "removeComments": false, // TS 文件编译后删除所有的注释
    
    "baseUrl": "src", /* 工作根目录  解析非相对模块的基地址*/
    "paths": {
        "@/datatype/*": ["datatype/*"],
        "@/131/*": ["131/*"],
        "@/132/*": ["132/*"]
      },    
    // 有些依赖库底层 为了兼容CommonJs规范、AMD规范这二者的规范中相互兼容，
    // 使用了 export =，将二者规范统一。
    // "esModuleInterop":true表示允许依赖库中出现export = 这种兼容规范导出的格式，
    //  TS 可以用import from导入 
    "esModuleInterop": true,  
  },
  "include": [ // 需要编译的ts文件一个*表示文件匹配**表示忽略文件的深度问题
    "./src/**/*.ts" // 匹配src下所有的ts文件
, "src/datatype/typepsenumts"  ],
   "exclude": [
    "./src/**/test",
    "./src/**/premit", 
  ]
}
```



##  类型注解和类型推断

```typescript
// 类型注解——ts 在编写代码期间就能确定变量的类型。
let price:number = 3

type UserType = {name: string, age: number};
let user: UserType = {name: "zhangsan", 30};

// 类型推断
let price = 3;
let user =  {name: "zhangsan", 30};
```

  

## any 和 unknown 的两个区别

```typescript
// 任何类型都可以赋值给any
let value: any;
value = "zhangsan";
value = 123;
value = true;

// any 也可以给任何类型
let name: string = value;
let age: number = value;
let married: boolean = value;
```

```typescript
// 任何类型都可以赋值给unknown
let value: unknown;
value = "zhangsan";
value = 123;
value = true;

// unknown 不可以赋值给除自身外的任何类型
let name: string = value;      //报错
let age: number = value;       //报错
let married: boolean = value;  //报错
let hello: unknown = value;    //正常
```

![image-20220511092008962](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205110920764.png)



## 函数和函数类型

1. 函数返回值可以自动推导

   ```typescript
   // 函数test没有显示指定返回值类型，但可以自动推导
   function test(name: string, age: number) {
       console.log(`name: ${name}, age: ${age}`);
       return 20
   }
   
   let res = test("zhangsan", 30);
   ```

   ![image-20220511092540821](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205110925081.png)

2. 函数类型也可以自动推导

   ```typescript
   let func = function (name: string, age: number): number {
       console.log(`name: ${name}, age: ${age}`);
       return 20;
   }
   
   // func 会自动推导为函数类型
   func("zhangsan", 30);
   
   
   // 也可以显示指定类型，这样参数和返回值就不能胡乱写了。
   // 函数类型定义方式
   let func1: (name: string, age: number) => number = function (name: string, age: number): number {
       console.log(`name: ${name}, age: ${age}`);
       return 20
   }
   
   func1("zhangsan", 30);
   
   // 接口定义方式
   let func2: { (name: string, age: number): number } = function (name: string, age: number): number {
       console.log(`name: ${name}, age: ${age}`);
       return 20
   }
   
   func2("zhangsan", 30);
   ```

   

## string 和 String 的比较



## BigInt 使用场景

**1. number 的极限值运算**

```js
// 获取最大的整数值，此处 max 的类型被推断为 number 类型。
const max = Number.MAX_SAFE_INTEGER;
console.log(max)
const maxBigOne = max + 1
console.log(maxBigOne)
const maxBigtwo = max + 2
console.log(maxBigtwo)

// 输出true，表示结果相同
console.log(maxBigOne === maxBigtwo);
```

![image-20220511093911515](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205110939821.png)



**2.  使用 BigInt** 

```typescript
// 方法1：
// 第一步：
// 修改 tsconfig.json 选项——"lib": ["DOM","ES2020"] + "target": "es5"

//第二步：此处max被推断为 bigint 类型。
const max = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max)
const maxBigOne = max + BigInt(1)
console.log(maxBigOne)
const maxBigtwo = max + BigInt(2)
console.log(maxBigtwo)
// 输出false
console.log(maxBigOne === maxBigtwo)

// 方法2：
// 第一步：
// 修改 tsconfig.json 选项——"lib": ["DOM","ES2020"] + "target": "es2020"

//第二步：此处max被推断为 bigint 类型。
const max = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max)
const maxBigOne = max + 1n
console.log(maxBigOne)
const maxBigtwo = max + 2n
console.log(maxBigtwo)
// 输出false
console.log(maxBigOne === maxBigtwo)
```

![image-20220511093955301](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205110939531.png)





## 看似简单的取值为何总抛错？

经典案例1：https://note.youdao.com/s/2HqTAjMK

```typescript
let user = {name: "zhangsan", age: 28}
let key = "name";
// 报错
user[key] = "lisi";

// let key = "name"; TS可以推断 key 为字符串类型，但是编译期间并不能推断出其值为"name"，因为我们这里使用的是 let ，let变量在代码中是可以修改的，所以只有到了运行期间，TS才知道 key 的值究竟是不是"name"。由于编译期间只能推断 key 变量的类型是string，而string的可能性太多了，故认为 user[key] 是字符串索引签名形式，除非 user 上真的有字符串索引签名，不然编译就会报错。
```

经典案例2：

```typescript
let user: object = {name: "zhangsan", age: 28}
// 报错
user.name = "lisi"

// user 显示声明为object，而 object 类型上本身是没有 name 属性的，故报错。解决办法2个：

// 方法一：不显示声明为 object 类型, ts 自动帮我们推导为对象字面量类型。
let user = {name: "zhangsan", age: 28}
user.name = "lisi"

// 方法二：使用 Record<string, any>
let user: Record<string, any> = {name: "zhangsan", age: 28};
user.name = "lisi"
```



## 什么场景 never 能被直接推导出来而不用定义？

```js

// dataFlowAnalysisWithNever 方法穷尽了 DataFlow 的所有可能类型。 
// 通过这个示例，我们可以得出一个结论：使用 never 避免出现未来扩展新的类没有对应类型的实现，目的就是写出类型绝对安全的代码。
type DataFlow = string | number
function dataFlowAnalysisWithNever(dataFlow: DataFlow) {
    if (typeof dataFlow === "string") {
        console.log("字符串类型：", dataFlow.length);
    } else if (typeof dataFlow === "number") {
        console.log("数值类型：", dataFlow.toFixed(2));
    } else {
      	// dataFlow 在这里是 never 
        let nothings = dataFlow;
    }
}

dataFlowAnalysisWithNever("免税店")


export { }
```



##  深入掌握枚举

1. 枚举的定义    2. 枚举分类    3. 枚举取值方式  4. 枚举底层   5. 枚举应用



### 为什么要用枚举?

解决多次 if /switch 判断中值的语义化的问题 

1. 常量解决       2. 常量解决带来的局限性

**1. 常量解决**   

```js
const Status = {
  MANAGER_ADUIT_FAIL: -1,
  NO_ADUIT: 0,
  MANAGER_ADUIT_SUCCESS: 1,
  FINAL_ADUIT_SUCCESS: 2
}
// 审核类
class MyAduit {

  getAduitStatus(status: number): void {
    if (status === Status.NO_ADUIT) {
      console.log("没有审核");
    } else if (status === Status.MANAGER_ADUIT_SUCCESS) {
      console.log("经理审核通过");
    } else if (status === Status.FINAL_ADUIT_SUCCESS) {
      console.log("财务审核通过");
    }
  }
}

const aduit = new MyAduit();
aduit.getAduitStatus(Status.MANAGER_ADUIT_FAIL);
export { }
```

 **2. 常量解决带来的局限性**

方法参数不能定义为具体类型，只能初级使用 number，string 基本类型替代，降低了代码的可读性和可维护性。



### 枚举的定义

定义:用来存放一组固定的常量的序列

 

### 枚举分类

```js
// 字符串枚举
enum EnumAuditStatus {
    MANAGER_ADUIT_FAIL = "项目经理审核失败",
    NO_ADUIT = "没有审核",
    MANAGER_ADUIT_SUCCESS = "项目经理审核成功",
    FINAL_ADUIT_SUCCESS = "财务审核成功",
}

//  字符串枚举
enum WeekEnd {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wensday = "Wensday",
  ThirsDay = "ThirsDay",
  Friday = "Friday",
  Sarturday = "Sarturday",
  Sunday = "Sunday"
}

```

```js
// 数字枚举
enum EnumAuditStatus {
  MANAGER_ADUIT_FAIL = -1,//第一个常量值设置为-1
  NO_ADUIT, // 第二个常量值自动递增1 就为0
  MANAGER_ADUIT_SUCCESS,// // // 第二个常量值自动递增2 就为1
  FINAL_ADUIT_SUCCESS // // // 第二个常量值自动递增3 就为2
}

// 数字枚举
enum Week {
  Monday = 1,
  Tuesday,
  Wensday,
  ThirsDay,
  Friday,
  Sarturday,
  Sunday
}
```



### 枚举取值方式

```js
export enum EnumAuditStatus {
  MANAGER_ADUIT_FAIL = -1,//第一个常量值设置为-1
  NO_ADUIT, // 第二个常量值自动递增1 就为0
  MANAGER_ADUIT_SUCCESS,// // // 第二个常量值自动递增2 就为1
  FINAL_ADUIT_SUCCESS // // // 第二个常量值自动递增3 就为2
}

// 取值方式1：枚举取值 根据枚举中常量名来取出常量值
console.log("EnumAuditStatus.FINAL_ADUIT_SUCCESS", EnumAuditStatus.FINAL_ADUIT_SUCCESS);  // 输出2

// 取值方式2：枚举反向取值 根据枚举中常量值来取出常量名
console.log("EnumAuditStatus[0]", EnumAuditStatus[0]);  // 输出 NO_ADUIT
console.log("EnumAuditStatus[1]", EnumAuditStatus[1]);  // 输出 MANAGER_ADUIT_SUCCESS
```



### 枚举底层

#### 数字类型枚举底层

```js
// 数字类型的枚举，是一个双向映射的对象。
var Week;
(function (Week) {
    Week[Week["Monday"] = 1] = "Monday";
    Week[Week["Tuesday"] = 2] = "Tuesday";
    Week[Week["Wensday"] = 3] = "Wensday";
    Week[Week["ThirsDay"] = 4] = "ThirsDay";
    Week[Week["Friday"] = 5] = "Friday";
    Week[Week["Sarturday"] = 6] = "Sarturday";
    Week[Week["Sunday"] = 7] = "Sunday";
})(Week || (Week = {}));
```



#### 字符串枚举底层

```js
// 字符串类型的枚举，是一个普通的key-value映射的对象。
var WeekEnd;
(function (WeekEnd) {
    WeekEnd["Monday"] = "Monday";
    WeekEnd["Tuesday"] = "Tuesday";
    WeekEnd["Wensday"] = "Wensday";
    WeekEnd["ThirsDay"] = "ThirsDay";
    WeekEnd["Friday"] = "Friday";
    WeekEnd["Sarturday"] = "Sarturday";
    WeekEnd["Sunday"] = "Sunday";
})(WeekEnd || (WeekEnd = {}));
```



### 枚举好处

 枚举带来的好处:

1. 有默认值和可以自增值，节省编码时间

2. 语义更清晰，可读性增强,

 因为枚举是一种值类型的数据类型，方法参数可以明确参数类型为枚举类型



### 枚举应用

```js
export enum EnumAuditStatus {
  MANAGER_ADUIT_FAIL = -1,//第一个常量值设置为-1
  NO_ADUIT, // 第二个常量值自动递增1 就为0
  MANAGER_ADUIT_SUCCESS,// // // 第二个常量值自动递增2 就为1
  FINAL_ADUIT_SUCCESS // // // 第二个常量值自动递增3 就为2
}


interface Expense {
  id: number,
  events: string,
  time: Date,
  enumAuditStatus: EnumAuditStatus
}

class ExpenseService {
  addExpense(expense: Expense) { }
}
let expenseService = new ExpenseService();

// 审核类
class MyAduit {
  getAduitStatus(status: EnumAuditStatus): void {
    let mystatus: EnumAuditStatus = 10;//定义枚举类型的变量
    let mystatus2: EnumAuditStatus = mystatus;
    mystatus2 = mystatus2 + 1;
    console.log("mystatus:", mystatus);//10
    console.log("mystatus2", mystatus2);//11

    if (status === EnumAuditStatus.NO_ADUIT) {//NO_ADUIT=0
      console.log("没有审核");
    } else if (status === EnumAuditStatus.MANAGER_ADUIT_SUCCESS) {
      console.log("经理审核通过");
      let expense: Expense = {
        id: 1,
        events: "飞机票报销",
        time: new Date(),
        enumAuditStatus: status
      }
      expenseService.addExpense(expense)
    } else if (status === EnumAuditStatus.FINAL_ADUIT_SUCCESS) {
      console.log("财务审核通过");
    } else {
      console.log("审核失败");
    }
  }
}

const aduit = new MyAduit();
aduit.getAduitStatus(EnumAuditStatus.FINAL_ADUIT_SUCCESS);
export { }
```



## 接口(interface)

### 接口的定义、实现、应用场景

 **定义** 

是为一系列同类对象或同类别的类提供属性定义和方法声明但没有任何赋值和实现的数据类型。

**接口实现**

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    count: number;
}

function calTotal(product: Product) {
    console.log("product总价：", product.price * product.count);
}

calTotal({id: 100, name: "电脑", price: 5000, count: 10})
```

**应用场景**

1  提供方法的对象类型的参数时使用 

2 为多个同类别的类提供统一的方法和属性声明



### 接口可选属性

实战开发中可有可无的属性可以定义为可选属性。

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    count: number;
    remark?: string;
}
```



### 可索引类型

属性未来可能会扩展，个数也不确定，类型也不确定，但是目前还不确定。

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    count: number;
    remark?: string;
		// 字符串索引签名
    [prop: string]: any;
}

function calTotal(product: Product) {
    console.log("product总价：", product.price * product.count);
}

// 使用了多个 Product 接口中没有定义的属性，但是编译不会报错。
calTotal({id: 100, name: "电脑", price: 5000, count: 10, remark: "hello", place: "武汉", quatity: "二手"})
```

```typescript
interface Getter{
    [key: string]: (state: any) => void;
}

let getter:Getter = {
    eat() => {},
    
    drink(state: string) => {}
}
```



### 函数类型

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    count: number;
    remark?: string;
    [prop: string]: any;  //字符串索引签名
    process(): void;      // 方法，函数类型
    transport?():void;    // 可选方法，函数类型
}
```



### 接口继承实现

**接口继承的使用场景：**

新的接口只是在原来接口继承之上增加了一些属性或方法，这时就用接口继承

```js
// 例子1：
// 开始定义了一个接口
interface  Point{
    x:number;
    y:number;
}

// 需求发生了变化，但是是在原来 Point 接口的基础之上增加了一个新的 z:number 属性。
interface Point3d extends Point{
    z:number;
}


// 例子2：Vue3源码中 稍复杂一点的接口继承
interface Error {
  name: string;
  message: string
}

interface CompilerError extends Error {
  code: number
}

const enum ErrorCodes {
  // parse errors
  ABRUPT_CLOSING_OF_EMPTY_COMMENT,
  CDATA_IN_HTML_CONTENT,
  DUPLICATE_ATTRIBUTE,
  END_TAG_WITH_ATTRIBUTES,
  END_TAG_WITH_TRAILING_SOLIDUS,
  EOF_BEFORE_TAG_NAME,
  EOF_IN_CDATA,
  EOF_IN_COMMENT,
  EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT,
  EOF_IN_TAG,
  INCORRECTLY_CLOSED_COMMENT
   ......
}
 
 interface CoreCompilerError extends CompilerError {
  code: ErrorCodes
}

//  其他应用比较少的场景:
//  1 接口也可以继承多个接口  2 接口可以继承类  3 类可以继承一个或多个接口
//  同学们可以
```



## type 定义类型和接口定义的区别

**type 和接口类似，都用来定义类型，但 type 和 interface 区别如下：**

 **1、定义类型范围不同**

interface 只能定义对象类型或接口当名字的函数类型。

type 可以定义任何类型，包括基础类型、联合类型 ，交叉类型，元组。

```typescript
// 接口定义对象类型
interface Product {
    id: number;
    name: string;
    price: number;
    count: number;
    remark?: string;

    getCost(): number;
    transport(): void;
}

let product: Product = {
    id: 10,
    name: "电脑",
    price: 5000,
    count: 10,
    getCost(): number {
        return this.price * this.count;
    },
    transport() {
        console.log("使用顺丰物流运输");
    }
}

console.log(product.getCost());
product.transport();


// 接口当名字的函数类型
interface Print {
    (content: string): void
}

let print: Print = (content: string): void => {
    console.log(`输出内容：`, content)
}

print("abc");

export {}
```

```typescript
// type 定义基础类型
type num = number

//  type 定义联合类型例子1：
type baseType = string | number | symbol

//  type 定义联合类型例子2：
interface Car {
    brandNo: string
}

interface Plane {
    No: string;
    brandNo: string
}

type TypVechile = Car | Plane

//  元组
interface Car {
    brandNo: string
}

interface Plane {
    No: string;
    brandNo: string
}

type TypVechile = [Car, Plane]


export {};
```



**2、接口可以extends 一个或者多个 接口或类， 也可以继承type，但type 类型没有继承功能**

但一般 接口继承类和 type 的应用场景很少见，我们只需要知道有这样的语法即可。



**3、用 type 交叉类型 & 可让类型中的成员合并成一个新的 type 类型，但接口不能交叉合并**

```js
type Group = { groupName: string, memberNum: number }
type GroupInfoLog = { info: string, happen: string }
type GroupMemeber = Group & GroupInfoLog// type 交叉类型合并

let data: GroupMemeber = {
  groupName: "001", memberNum: 10,
  info: "集体爬山", happen: "中途有组员差点滑落,有惊无险",
}

export { }
```



**4、接口可以合并声明**

定义两个相同名称的接口会合并声明，定义两个同名的type会出现编译错误。

```js
interface Error {
    name: string;
}

interface Error {
    message: string;
    stack?: string;
}

// 接口合并
let error: Error = {
    message: "空指针",
    name: "NullPointException"
}
```



## 增强布尔类型——联合类型的使用

假如我们想把0， 1 当布尔类型使用，JS中是默认可以的，但是TS需要处理一下类型问题才行。

```typescript
type IncreaseBoolean = Boolean | 1 | 0;

function mounted(isStartUp: IncreaseBoolean) {
    if (isStartUp) {
        console.log("yes");
    } else {
        console.log("no");
    }
}

mounted(true);     // yes
mounted(1);        // yes
mounted(false);    // no
mounted(0);        // no

export {}
```



## TS 声明文件

### 为什么要用声明文件？

如果文件使用 TS 编写，在编译时可以自动生成声明文件，并在发布的时候将 .d.ts  文件一起发布，我们无需编写声明文件。

当我们在 TS 文件中引入使用第三方库的类型或使用集成库时，比如：@types/jquery  库，ES6 库的 Map 类型 ，这些库用 JS 开发，不能获取 TS 一样的类型提示，需要一个声明文件来帮助库的使用者来获取库的类型提示。

**注意：声明文件中只对类型定义，不能进行赋值和实现。**



### 声明文件生成

**前提：**生成声明文件的前提之一就是必须要 export 出去，如果都不 export 出去，说明外部根本不会用到，那么也就不需要声明了。

```typescript
export const xxx = xxx;

export default class xxx

...........................................
```



**tsconfig.json 中下面的配置项：**

declaration：必须打开

declarationMap：打开或关闭都可以，打开时会额外生成一个 .d.ts.map 文件

skipLibCheck：必须关闭，否则会跳过 .d.ts 检查

```json
"declaration": true,            /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
// "declarationMap": true,         /* Create sourcemaps for d.ts files. */
// "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
```



使用 tsc 命令编译，查看编译后的文件，可以看到声明文件只有定义，没有实现。

![image-20220512093026706](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205120930102.png)

 

如果两个配置项全打开，则还会生成一个 .d.ts.map 文件。

![image-20220512092834766](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205120928072.png)





###  声明文件编写

1、js 文件 如何感知声明文件的作用

2、学会定义和使用声明文件

```js
// 关键字 declare 表示声明的意思,我们可以用它来做出各种声明:
declare let/const  // 声明全局变量
declare function   // 声明全局方法
declare class      // 声明全局类
declare enum       // 声明全局枚举类型 
declare namespace  // 声明（含有子属性的）全局对象
interface/type     // 声明全局类型

//----------------------------------------------------------------------------------------
// 以 jquery 为例编写几个方法对应的声明文件。 test.d.ts
declare type CssSelector = {
    css: (key: string, value: string) => CssSelector
}

declare function $(ready: () => void): void

declare function $(selector: any): CssSelector

// 在src目录下任意位置使用
$(function(){});
$("div");
$("div").css("color", "red");
```

Declare 声明后，全局范围内都可以使用（src目录下任意位置），并且不需要 import 。

只有 JS 能够识别的才需要加 declare，否则可以不加。比如 type、interface  JS不能识别，所以可以省略。

```typescript
// test.d.ts
type CssSelector = {
    css: (key: string, value: string) => CssSelector
}

interface Print {
    print(content: string): void
}

declare function $(ready: () => void): void

declare function $(selector: any): CssSelector
```



### 命名空间在声明文件中的使用

1、命名空间本质上可以看做一个全局对象(编译成JS后就是对象)，它的作用可以简单理解为防止类型名重名；

2、命名空间 + declare 属于顶级声明，命名空间内部不能再使用 declare 否则会报错，但是可以通过 export 导出，我们一般都这么做；

3、使用命名空间后，使用时要加上命名空间名称；

```typescript
declare namespace JQuery {
    type CssSelector = {
        css: (key: string, value: string) => CssSelector
    }

    export function $(ready: () => void): void

    export function $(selector: any): CssSelector
}
    
// 加上命名空间后，访问方式也要发生变化
JQuery.$(function () {
});

JQuery.$("div");

JQuery.$("div").css("color", "red"); 
```



4、命名空间里可以嵌套命名空间，但是访问的时候必须从顶级命名空间开始；

```typescript
declare namespace JQuery {
    type CssSelector = {
        css: (key: string, value: string) => CssSelector
    }

    export function $(ready: () => void): void

    export function $(selector: any): CssSelector

    export namespace $ {
        function ajax(url: string, options?: any): void;

        function get(url: string, options?: any): void;

        function post(url: string, options?: any): void;
    }
}

// 前面的 JQuery 不可以省略
JQuery.$(function () {
});

JQuery.$("div");

JQuery.$("div").css("color", "red");

JQuery.$.ajax("http:www.baidu.com");
```



### 模块声明

使用模块声明对比使用namespace的好处就是可以省略命名空间名称。但是需要使用 import 语句导入模块。

```typescript
declare module "JQuery" {
    type CssSelector = {
        css: (key: string, value: string) => CssSelector
    }

    function $(ready: () => void): void

    function $(selector: any): CssSelector

    namespace $ {
        function ajax(url: string, options?: any): void;

        function get(url: string, options?: any): void;

        function post(url: string, options?: any): void;
    }

    // 前一种导出方式也是可以的，但是为了兼容 commonJS、amd 规范，一般使用后一这种.
    // export default $;]
    export = $;
}

// 需要导入模块
import $ from "JQuery"

$(function () {
});

$("div");

$("div").css("color", "red");

$.ajax("http:www.baidu.com");
```



### 如何在 TS 中引入 js 文件

1、开启 tsconfig.json 中的 allowJs 配置项

```json
"allowJs": true,           /* Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files. */
```



2、ts 文件中引入js示例

```js
// student.js
export const add = (x, y) => {
    return x + y;
}

export class Student {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    show() {
        console.log(`name: ${this.name}, age: ${this.age}`);
    }
}


// index.ts
import {add, Student} from "./student";

console.log(add(100, 200));

let stu = new Student("zhangsan", 29);
stu.show();
```

