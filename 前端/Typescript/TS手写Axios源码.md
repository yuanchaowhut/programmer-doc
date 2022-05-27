# 项目初始化

## 需求分析

接下来的章节，我们会使用 TypeScript 来重构 axios，重构之前，我们需要简单地做一些需求分析，看一下我们这次重构需要支持哪些 feature。

### Features

- 在浏览器端使用 XMLHttpRequest 对象通讯
- 支持 Promise API
- 支持请求和响应的拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON 数据的自动转换
- 客户端防止 XSRF

此外，我们还会支持一些 axios 库支持的一些其它的 feature。这里要注意的，我们这次重构不包括 axios 在 Node 中的实现，因为这部分我们在平时项目中应用的很少，还涉及到很多 Node.js 的知识，如果都讲的话，一是比较占用时间，另一个可能会喧宾夺主了。

### XMLHttpRequest

由于 axios 底层使用的是XMLHttpRequest，故有必要了解一下相关知识，关于XMLHttpRequest基础知识参考[这里](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)。

```js
// 下面是2段示例代码片段，分别对一个老版本和新版本
// level1
function sendAjax(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'example.php');
　xhr.send();
  xhr.onreadystatechange = function(){
　　if ( xhr.readyState == 4 && xhr.status == 200 ) {
　　　　alert( xhr.responseText );
　　} else {
　　　　alert( xhr.statusText );
　　}
　};
}

// level2
function sendAjax() {
  //构造表单数据
  var formData = new FormData();
  formData.append('username', 'johndoe');
  formData.append('id', 123456);
  //创建xhr对象 
  var xhr = new XMLHttpRequest();
  //设置xhr请求的超时时间
  xhr.timeout = 3000;
  //设置响应返回的数据格式
  xhr.responseType = "text";
  //创建一个 post 请求，采用异步
  xhr.open('POST', '/server', true);
  //注册相关事件回调处理函数
  xhr.onload = function(e) { 
    if(this.status == 200||this.status == 304){
        alert(this.responseText);
    }
  };
  xhr.ontimeout = function(e) { ... };
  xhr.onerror = function(e) { ... };
  xhr.upload.onprogress = function(e) { ... };
  
  //发送数据
  xhr.send(formData);
}
```



## 初始化项目

### 创建代码仓库

接下来，我们开始初始化项目，首先我们先去 GitHub 上创建一个 repo，填好 repo 名称，以及写一下 README，对项目先做个简单的描述。

通常我们初始化一个项目，需要配置一大堆东西，比如 `package.json`、`.editorconfig`、`.gitignore` 等；还包括一些构建工具如 `rollup`、`webpack` 以及它们的配置。

当我们使用 TypeScript 去写一个项目的时候，还需要配置 TypeScript 的编译配置文件 `tsconfig.json` 以及
`tslint.json` 文件。

这些茫茫多的配置往往会让一个想从零开始写项目的同学望而却步，如果有一个脚手架工具帮我们生成好这些初始化文件该多好。好在确实有这样的工具，接下来我们的主角 `TypeScript library starter` 隆重登场。



### TypeScript library starter

它是一个开源的 TypeScript 开发基础库的脚手架工具，可以帮助我们快速初始化一个 TypeScript 项目，我们可以去它的[官网地址](https://github.com/alexjoverm/typescript-library-starter)学习和使用它。

#### 使用方式

```bash
git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios
cd ts-axios

npm install
```

先通过 `git clone` 把项目代码拉下来到我们的 `ts-axios` 目录，然后运行 `npm install` 安装依赖，并且给项目命名，我们仍然使用 `ts-axios`。

安装好依赖后，我们先来预览一下这个项目的目录结构。

#### 目录文件介绍

`TypeScript library starter` 生成的目录结构如下：

```
├── CONTRIBUTING.md
├── LICENSE 
├── README.md
├── code-of-conduct.md
├── node_modules
├── package-lock.json
├── package.json
├── rollup.config.ts // rollup 配置文件
├── src // 源码目录
├── test // 测试目录
├── tools // 发布到 GitHup pages 以及 发布到 npm 的一些配置脚本工具
├── tsconfig.json // TypeScript 编译配置文件
└── tslint.json // TypeScript lint 文件
```

#### 优秀工具集成

使用 `TypeScript library starter` 创建的项目集成了很多优秀的开源工具：

- 使用 [RollupJS](https://rollupjs.org/) 帮助我们打包。
- 使用 [Prettier](https://github.com/prettier/prettier) 和 [TSLint](https://palantir.github.io/tslint/) 帮助我们格式化代码以及保证代码风格一致性。
- 使用 [TypeDoc](https://typedoc.org/) 帮助我们自动生成文档并部署到 GitHub pages。
- 使用 [Jest](https://jestjs.io/)帮助我们做单元测试。
- 使用 [Commitizen](https://github.com/commitizen/cz-cli)帮助我们生成规范化的提交注释。
- 使用 [Semantic release](https://github.com/semantic-release/semantic-release)帮助我们管理版本和发布。
- 使用 [husky](https://github.com/typicode/husky)帮助我们更简单地使用 git hooks。
- 使用 [Conventional changelog](https://github.com/conventional-changelog/conventional-changelog)帮助我们通过代码提交信息自动生成 change log。

这里我们列举了很多工具，感兴趣的同学们可以点开他们的链接对这些工具做进一步学习。

#### Npm Scripts

`TypeScript library starter` 同样在 `package.json` 中帮我们配置了一些 `npm scripts`，接下来我们先列举一下我们开发中常用的 `npm scripts`，剩余的我们在之后学习中遇到的时候再来介绍。

 - `npm run lint`: 使用 TSLint 工具检查 `src` 和 `test` 目录下 TypeScript 代码的可读性、可维护性和功能性错误。
 - `npm start`: 观察者模式运行 `rollup` 工具打包代码。
 - `npm test`: 运行 `jest` 工具跑单元测试。
 - `npm run commit`: 运行 `commitizen` 工具提交格式化的 `git commit` 注释。
 - `npm run build`: 运行 `rollup` 编译打包 TypeScript 代码，并运行 `typedoc` 工具生成文档。



### 关联远程分支

 代码已经初始化好，接下来我们要把当前代码仓库关联我们的远程仓库，首先在命令行中运行命令查看远程分支：

```bash
git remote -v
```

这里我们不会得到任何输出，因为我们还没有关联远程分支，我们先去 GitHub 上找到我们仓库的地址，在命令行运行：

```bash
git remote add origin 仓库地址
```

关联后，远程库的名字就是 `origin`，这是 `Git` 默认的叫法，也可以改成别的，但是 `origin` 这个名字一看就知道是远程库。

接着你就可以继续运行 `git remote -v` 查看关联结果了。

#### 拉取代码

运行如下命令从远程仓库拉取 master 分支代码并合并：

```bash
git pull origin master
```

这个时候会报错：

```bash
error: The following untracked working tree files would be overwritten by merge:
	README.md
Please move or remove them before you merge.
Aborting
```

因为我们在使用 `typescript library starter` 初始化代码的时候也创建了 `README.md`，和远程仓库的 `README.md` 冲突了。我们把 `README.md` 文件删除，再次运行：

```bash
git pull origin master
```

这次代码就拉取成功了，并且在本地也创建了一个 `master` 分支。 


#### 提交代码

最后我们来提交代码，首先运行：

```bash
git add .
```

把提交的代码从工作区添加到暂存区，然后运行 `npm run commit` 这个 `npm` 脚本来提交代码，运行后它会依次询问你几个问题，比如你这次修改的范围包括哪些、提交的描述、是否有 break change、影响了哪些 issue 等等。

填写完毕，工具会帮我们运行 `git commit` 并且自动把我们提交的信息合成一条提交注释。接着运行命令把代码推送到远程 git 仓库中：

```bash
git push origin master
```

接着我们去 GitHub 仓库中就可以看到刚才这条提交记录了。

至此，我们项目已经初始化完毕，接下来我们就开始编写源码实现 axios 了。



## 编写基础请求代码

我们这节课开始编写 `ts-axios` 库，我们的目标是实现简单的发送请求功能，即客户端通过 `XMLHttpRequest` 对象把请求发送到 server 端，server 端能收到请求并响应即可。

我们实现 `axios` 最基本的操作，通过传入一个对象发送请求，如下：

```typescript
axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
```



### 创建入口文件

我们删除 `src` 目录下的文件，先创建一个 `index.ts` 文件，作为整个库的入口文件，然后我们先定义一个 `axios` 方法，并把它导出，如下：

```typescript
function axios(config) {

}

export default axios

```

这里 TypeScript 编译器会检查到错误，分别是 `config` 的声明上有隐含的 `any` 报错，以及代码块为空。代码块为空我们比较好理解，第一个错误的原因是因为我们给 TypeScript 编译配置的 `strict` 设置为 `true` 导致。

#### 编译配置文件 tsconfig.json

`tsconfig.json` 文件中指定了用来编译这个项目的根文件和编译选项，关于它的具体学习，我希望同学们去[官网](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)系统学习一下

我们在之前讲 TypeScript 的基础时，会运行 `tsc` 命令去编译 TypeScript 文件，编译器会从当前目录开始去查找 `tsconfig.json` 文件，作为编译时的一些编译选项。

我们来看一下 tsconfig.json 文件，它包含了很多编译时的配置，其中我们把 `strict` 设置为 `true`，它相当于启用所有严格类型的检查选项。启用 `--strict` 相当于启用 `--noImplicitAny`,`--noImplicitThis`,`--alwaysStrict`，`--strictNullChecks` 和 `--strictFunctionTypes` 和 `--strictPropertyInitialization`。

我们讲 TypeScript 的基础时提到了 `--strictNullChecks`，其它的编译配置我建议同学们都去查看它的[官网文档](https://www.typescriptlang.org/docs/handbook/compiler-options.html)，把它当做手册去查阅即可。

#### 定义 AxiosRequestConfig 接口类型

接下来，我们需要给 `config` 参数定义一种接口类型。我们创建一个 `types` 目录，在下面创建一个 `index.ts` 文件，作为我们项目中公用的类型定义文件。

接下来我们来定义 `AxiosRequestConfig` 接口类型：

```typescript
export interface AxiosRequestConfig {
  url: string
  method?: string
  data?: any
  params?: any
}
```

其中，`url` 为请求的地址，必选属性；而其余属性都是可选属性。`method` 是请求的 HTTP 方法；`data` 是 `post`、`patch` 等类型请求的数据，放到 `request body` 中的；`params` 是 `get`、`head` 等类型请求的数据，拼接到 `url` 的 `query string` 中的。

为了让 `method` 只能传入合法的字符串，我们定义一种字符串字面量类型 `Method`：

```typescript
export type Method = 'get' | 'GET'
  | 'delete' | 'Delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
```

接着我们把 `AxiosRequestConfig` 中的 `method` 属性类型改成这种字符串字面量类型：

```typescript
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
```

然后回到 `index.ts`，我们引入 `AxiosRequestConfig` 类型，作为 `config` 的参数类型，如下：

```typescript
import { AxiosRequestConfig } from './types'

function axios(config: AxiosRequestConfig) {
}

export default axios
```

那么接下来，我们就来实现这个函数体内部的逻辑——发送请求。



### 利用 XMLHttpRequest 发送请求

我们并不想在 `index.ts` 中去实现发送请求的逻辑，我们利用模块化的编程思想，把这个功能拆分到一个单独的模块中。

于是我们在 `src` 目录下创建一个 `xhr.ts` 文件，我们导出一个 `xhr` 方法，它接受一个 `config` 参数，类型也是 `AxiosRequestConfig` 类型。

```typescript
import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
}
```

接下来，我们来实现这个函数体逻辑，如下：

```typescript
export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
```

我们首先通过解构赋值的语法从 `config` 中拿到对应的属性值赋值给我的变量，并且还定义了一些默认值，因为在 `AxiosRequestConfig` 接口的定义中，有些属性是可选的。

接着我们实例化了一个 `XMLHttpRequest` 对象，然后调用了它的 `open` 方法，传入了对应的一些参数，最后调用 `send` 方法发送请求。

对于 `XMLHttpRequest` 的学习，我希望同学们去 [mdn](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 上系统地学习一下它的一些属性和方法，当做参考资料，因为在后续的开发中我们可能会反复查阅这些文档资料。

#### 引入 xhr 模块

编写好了 `xhr` 模块，我们就需要在 `index.ts` 中去引入这个模块，如下：

```typescript
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  xhr(config)
}

export default axios
```

那么至此，我们基本的发送请求代码就编写完毕了，接下来我们来写一个小 demo，来使用我们编写的 axios 库去发送请求。



### demo 编写

我们会利用 Node.js 的 [`express`](http://expressjs.com/) 库去运行我们的 demo，利用 [`webpack`](https://webpack.js.org/) 来作为 demo 的构建工具。

#### 依赖安装

我们先来安装一些编写 demo 需要的依赖包，如下：

```
"webpack": "^4.28.4",
"webpack-dev-middleware": "^3.5.0",
"webpack-hot-middleware": "^2.24.3",
"ts-loader": "^5.3.3",
"tslint-loader": "^3.5.4",
"express": "^4.16.4",
"body-parser": "^1.18.3"
```

其中，`webpack` 是打包构建工具，`webpack-dev-middleware` 和 `webpack-hot-middleware` 是 2 个 `express` 的 `webpack` 中间件，`ts-loader` 和 `tslint-loader` 是 `webpack` 需要的 TypeScript 相关 loader，`express` 是 Node.js 的服务端框架，`body-parser` 是 `express` 的一个中间件，解析 `body` 数据用的。

#### 编写 webpack 配置文件

在 `examples` 目录下创建 `webpack` 配置文件 `webpack.config.js`：

```javascript
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  /**
   * 我们会在 examples 目录下建多个子目录
   * 我们会把不同章节的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {}),

  /**
   * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
   */
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
```

#### 编写 server 文件

在 `examples` 目录下创建 `server.js` 文件：

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
```

#### 编写 demo 代码

首先在 `examples` 目录下创建 `index.html` 和 `global.css`，作为所有 `demo` 的入口文件已全局样式文件。

`index.html`：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>ts-axios examples</title>
    <link rel="stylesheet" href="/global.css">
  </head>
  <body style="padding: 0 20px">
    <h1>ts-axios examples</h1>
    <ul>
      <li><a href="simple">Simple</a></li>
    </ul>
  </body>
</html>
```

`global.css`：

```css
html, body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #2c3e50;
}

ul {
  line-height: 1.5em;
  padding-left: 1.5em;
}

a {
  color: #7f8c8d;
  text-decoration: none;
}

a:hover {
  color: #4fc08d;
}
```

然后在 `examples` 目录下创建 `simple` 目录，作为本章节的 demo 目录，在该目录下再创建 `index.html` 和 `app.ts` 文件

`index.html` 文件如下:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Simple example</title>
  </head>
  <body>
    <script src="/__build__/simple.js"></script>
  </body>
</html>
```

`app.ts` 文件如下：

```typescript
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
```

因为我们这里通过 `axios` 发送了请求，那么我们的 server 端要实现对应的路由接口，我们来修改 `server.js`，添加如下代码：

```javascript
const router = express.Router()

router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

app.use(router)
```

#### 运行 demo

接着我们在 `package.json` 中去新增一个 `npm script`：

```
"dev": "node examples/server.js"
```

然后我们去控制台执行命令

```bash
npm run dev
```

相当于执行了 `node examples/server.js`，会开启我们的 server。

接着我们打开 chrome 浏览器，访问 `http://localhost:8080/` 即可访问我们的 demo 了，我们点到 `Simple` 目录下，通过开发者工具的 network 部分我们可以看到成功发送到了一条请求，并在 response 中看到了服务端返回的数据。

至此，我们就实现了一个简单的请求发送，并编写了相关的 demo。但是现在存在一些问题：我们传入的 `params` 数据并没有用，也没有拼接到 `url` 上；我们对 request body 的数据格式、请求头 headers 也没有做处理；另外我们虽然从网络层面收到了响应的数据，但是我们代码层面也并没有对响应的数据做处理。那么下面一章，我们就来解决这些问题。



# 基础功能实现

## 处理请求 url 参数

### 需求分析

还记得我们上节课遗留了一个问题，再来看这个例子：

```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    a: 1,
    b: 2
  }
})
```

我们希望最终请求的 `url` 是 `/base/get?a=1&b=2`，这样服务端就可以通过请求的 url 解析到我们传来的参数数据了。实际上就是把 `params` 对象的 key 和 value 拼接到 `url` 上。

再来看几个更复杂的例子。

#### 参数值为数组

```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})
```

最终请求的 `url` 是 `/base/get?foo[]=bar&foo[]=baz'`。

#### 参数值为对象

```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})
```

最终请求的 `url` 是 `/base/get?foo=%7B%22bar%22:%22baz%22%7D`，`foo` 后面拼接的是 `{"bar":"baz"}` encode 后的结果。

#### 参数值为 Date 类型

```typescript
const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})
```

最终请求的 `url` 是 `/base/get?date=2019-04-01T05:55:39.030Z`，`date` 后面拼接的是 `date.toISOString()` 的结果。

#### 特殊字符支持

对于字符 `@`、`:`、`$`、`,`、` `、`[`、`]`，我们是允许出现在 `url` 中的，不希望被 encode。


```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})
```

最终请求的 `url` 是 `/base/get?foo=@:$+`，注意，我们会把空格 ` ` 转换成 `+`。

#### 空值忽略

对于值为 `null` 或者 `undefined` 的属性，我们是不会添加到 url 参数中的。

```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})
```

最终请求的 `url` 是 `/base/get?foo=bar`。

#### 丢弃 url 中的哈希标记

```typescript
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})
```

最终请求的 `url` 是 `/base/get?foo=bar`

#### 保留 url 中已存在的参数

```typescript
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})
```

最终请求的 `url` 是 `/base/get?foo=bar&bar=baz`



### buildURL 函数实现

根据我们之前的需求分析，我们要实现一个工具函数，把 `params` 拼接到 `url` 上。我们希望把项目中的一些工具函数、辅助方法独立管理，于是我们创建一个 `helpers` 目录，在这个目录下创建 `url.ts` 文件，未来会把处理 `url` 相关的工具函数都放在该文件中。

`helpers/url.ts`：

```typescript
import { isDate, isObject } from './util'

function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bulidURL (url: string, params?: any) {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach((key) => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
```

`helpers/util.ts`：

```typescript
const toString = Object.prototype.toString

export function isDate (val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject (val: any): val is Object {
  return val !== null && typeof val === 'object'
}

```



### 实现 url 参数处理逻辑

我们已经实现了 `buildURL` 函数，接下来我们来利用它实现 `url` 参数的处理逻辑。

在 `index.ts` 文件中添加如下代码：

```typescript
function axios (config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig (config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

function transformUrl (config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}
```

在执行 `xhr` 函数前，我们先执行 `processConfig` 方法，对 `config` 中的数据做处理，除了对 `url` 和 `params` 处理之外，未来还会处理其它属性。

在 `processConfig` 函数内部，我们通过执行 `transformUrl` 函数修改了 `config.url`，该函数内部调用了 `buildURL`。

那么至此，我们对 `url` 参数处理逻辑就实现完了，接下来我们就开始编写 demo 了。



### demo 编写

在 `examples` 目录下创建 `base` 目录，在 `base` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Base example</title>
  </head>
  <body>
    <script src="/__build__/base.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：

```typescript
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})
```

接着在 `server.js` 添加新的接口路由：

```typescript
router.get('/base/get', function(req, res) {
  res.json(req.query)
})
```

然后在命令行运行 `npm run dev`，接着打开 chrome 浏览器，访问 `http://localhost:8080/` 即可访问我们的 demo 了，我们点到 `Base` 目录下，通过开发者工具的 network 部分我们可以看到成功发送的多条请求，并可以观察它们最终请求的 url，已经如期添加了请求参数。

那么至此我们的请求 `url` 参数处理编写完了，下一小节我们会对 `request body` 数据做处理。



## 处理请求 body 数据

### 需求分析

我们通过执行 `XMLHttpRequest` 对象实例的 `send` 方法来发送请求，并通过该方法的参数设置请求 `body` 数据，我们可以去 [mdn](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send) 查阅该方法支持的参数类型。

我们发现 `send` 方法的参数支持 `Document` 和 `BodyInit` 类型，`BodyInit` 包括了 `Blob`, `BufferSource`, `FormData`, `URLSearchParams`, `ReadableStream`、`USVString`，当没有数据的时候，我们还可以传入 `null`。

但是我们最常用的场景还是传一个普通对象给服务端，例如：

```typescript
axios({
  method: 'post',
  url: '/base/post',
  data: { 
    a: 1,
    b: 2 
  }
})
```

这个时候 `data`是不能直接传给 `send` 函数的，我们需要把它转换成 JSON 字符串。



### transformRequest 函数实现

根据需求分析，我们要实现一个工具函数，对 request 中的 `data` 做一层转换。我们在 `helpers` 目录新建 `data.ts` 文件。

`helpers/data.ts`：

```typescript
import { isPlainObject } from './util'

export function transformRequest (data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
```

`helpers/util.js`：

```typescript
export function isPlainObject (val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
```

这里为什么要使用 `isPlainObject` 函数判断，而不用之前的 `isObject` 函数呢，因为 `isObject` 的判断方式，对于 `FormData`、`ArrayBuffer` 这些类型，`isObject` 判断也为 `true`，但是这些类型的数据我们是不需要做处理的，而 `isPlainObject` 的判断方式，只有我们定义的普通 `JSON` 对象才能满足。

`helpers/url.ts`：

```typescript
if (isDate(val)) {
  val = val.toISOString()
} else if (isPlainObject(val)) {
  val = JSON.stringify(val)
}
```

对于上节课我们对请求参数值的判断，我们也应该用 `isPlainObject` 才更加合理。

`helpers/util.js`

```typescript
// export function isObject (val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }
```

既然现在 `isObject` 方法不再使用，我们先将其注释。



### 实现请求 body 处理逻辑

`index.ts`：

```typescript
import { transformRequest } from './helpers/data'

function processConfig (config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformRequestData(config)
}

function transformRequestData (config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
```

我们定义了 `transformRequestData` 函数，去转换请求 `body` 的数据，内部调用了我们刚刚实现的的 `transformRequest` 方法。

然后我们在 `processConfig` 内部添加了这段逻辑，在处理完 url 后接着对 `config` 中的 `data` 做处理。



### 编写 demo

```typescript
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})
```

我们在 `examples/base/app.ts` 添加 2 段代码，第一个 post 请求的 `data` 是一个普通对象，第二个请求的 `data` 是一个 `Int32Array` 类型的数据，它是可以直接传给 `XMLHttpRequest` 对象的 `send` 方法的。

```javascript
router.post('/base/post', function(req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})
```

我们接着在 `examples/server.js` 中添加 2 个路由，分别针对这俩种请求，返回请求传入的数据。

然后我们打开浏览器运行 demo，看一下结果，我们发现 `/base/buffer` 的请求是可以拿到数据，但是 `base/post` 请求的 response 里却返回的是一个空对象，这是什么原因呢？

实际上是因为我们虽然执行 `send` 方法的时候把普通对象 `data` 转换成一个 `JSON` 字符串，但是我们请求`header` 的 `Content-Type` 是 `text/plain;charset=UTF-8`，导致了服务端接受到请求并不能正确解析请求 `body` 的数据。

知道这个问题后，下面一节课我们来实现对请求 `header` 的处理。



## 处理请求 header

### 需求分析

我们上节课遗留了一个问题：

```typescript
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})
```

我们做了请求数据的处理，把 `data` 转换成了 JSON 字符串，但是数据发送到服务端的时候，服务端并不能正常解析我们发送的数据，因为我们并没有给请求 `header` 设置正确的 `Content-Type `。

所以首先我们要支持发送请求的时候，可以支持配置 `headers` 属性，如下：

```typescript
axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  },
  data: {
    a: 1,
    b: 2
  }
})
```

并且在当我们传入的 `data` 为普通对象的时候，`headers` 如果没有配置 `Content-Type` 属性，需要自动设置请求 `header` 的 `Content-Type` 字段为：`application/json;charset=utf-8`。



### processHeaders 函数实现

根据需求分析，我们要实现一个工具函数，对 request 中的 `headers` 做一层加工。我们在 `helpers` 目录新建 `headers.ts` 文件。

`helpers/headers.ts`：

```typescript
import { isPlainObject } from './util'

function normalizeHeaderName (headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders (headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
```

这里有个需要注意的点，因为请求 `header` 属性是大小写不敏感的，比如我们之前的例子传入 `header` 的属性名 `content-type` 就是全小写的，所以我们先要把一些 `header` 属性名规范化。



### 实现请求 header 处理逻辑

在这之前，我们先修改一下 `AxiosRequestConfig` 接口类型的定义，添加 `headers` 这个可选属性：

`types/index.ts`

```typescript
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
}
```

`index.ts`：

```typescript
function processConfig (config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformHeaders (config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
```

因为我们处理 `header` 的时候依赖了 `data`，所以要在处理请求 `body` 数据之前处理请求 `header`。

`xhr.ts`：

```typescript
export default function xhr (config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach((name) => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
```

这里要额外判断一个逻辑，当我们传入的 `data` 为空的时候，请求 `header` 配置 `Content-Type` 是没有意义的，于是我们把它删除。



### demo 编写

```typescript
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;'
  },
  data: {
    a: 1,
    b: 2
  }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})
```

通过 demo 我们可以看到，当我们请求的数据是普通对象并且没有配置 `headers` 的时候，会自动为其添加 `Content-Type:application/json;charset=utf-8`；同时我们发现当 data 是某些类型如 `URLSearchParams` 的时候，浏览器会自动为请求 `header`加上合适的 `Content-Type`。

至此我们对于请求的处理逻辑暂时告一段落。目前我们的请求从网络层面是可以收到服务端的响应的，下一节课我们就从代码层面来处理服务端响应，并且让调用方可以拿到从服务端返回的数据。



## 获取响应数据

### 需求分析

在前面的章节中，我们发送的请求都可以从网络层面接收到服务端返回的数据，但是代码层面并没有做任何关于返回数据的处理。我们希望能处理服务端响应的数据，并支持 Promise 链式调用的方式，如下：

```typescript
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})
```

我们可以拿到 `res` 对象，并且我们希望该对象包括：服务端返回的数据 `data`，HTTP 状态码`status`，状态消息 `statusText`，响应头 `headers`、请求配置对象 `config` 以及请求的 `XMLHttpRequest` 对象实例 `request`。



### 定义接口类型

根据需求，我们可以定义一个 `AxiosResponse` 接口类型，如下：

```typescript
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
```

另外，`axios` 函数返回的是一个 `Promise` 对象，我们可以定义一个 `AxiosPromise` 接口，它继承于 `Promise<AxiosResponse>` 这个泛型接口：

```typescript
export interface AxiosPromise extends Promise<AxiosResponse> {
}
```

这样的话，当 `axios` 返回的是 `AxiosPromise` 类型，那么 `resolve` 函数中的参数就是一个 `AxiosResponse` 类型。

对于一个 AJAX 请求的 `response`，我们是可以指定它的响应的数据类型的，通过设置 `XMLHttpRequest` 对象的 [`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType) 属性，于是我们可以给 `AxiosRequestConfig` 类型添加一个可选属性：

```typescript
export interface AxiosRequestConfig {
  // ...
  responseType?: XMLHttpRequestResponseType
}
```

`responseType` 的类型是一个 `XMLHttpRequestResponseType` 类型，它的定义是 `"" | "arraybuffer" | "blob" | "document" | "json" | "text"` 字符串字面量类型。



### 实现获取响应数据逻辑

首先我们要在 `xhr` 函数添加 [`onreadystatechange`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange) 事件处理函数，并且让 `xhr` 函数返回的是 `AxiosPromise` 类型。

`xhr.ts`：

```typescript
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
```

注意，我们这里还判断了如果 `config` 中配置了 `responseType`，我们把它设置到 `request.responseType` 中。在 `onreadystatechange` 事件函数中，我们构造了 `AxiosResponse` 类型的 `reponse` 对象，并把它 `resolve` 出去。

修改了 `xhr` 函数，我们同样也要对应修改 `axios` 函数：

`index.ts`：

```typescript
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}
```

这样我们就实现了 `axios` 函数的 Promise 化。



### demo 编写

我们在 `examples/base/app.ts` 文件中添加 2 段代码：

```typescript
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then((res) => {
  console.log(res)
})
```

我们打开浏览器运行 demo，看一下结果，发现我们可以正常 log 出这个 `res` 变量，它包含 `AxiosResponse` 类型中定义的那些属性，不过我们发现 2 个小问题：第一个是 `headers` 属性是一个字符串，我们需要把它解析成对象类型；第二个是在第一个请求中，得到的数据是一个 JSON 字符串，我们也需要把它转换成对象类型。

那么下一小节，我们将来解决第一个问题，对于响应的 `header` 做处理。



## 处理响应 header

### 需求分析

我们通过 `XMLHttpRequest` 对象的 `getAllResponseHeaders` 方法获取到的值是如下一段字符串：

```
date: Fri, 05 Apr 2019 12:40:49 GMT
etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
connection: keep-alive
x-powered-by: Express
content-length: 13
content-type: application/json; charset=utf-8
```

每一行都是以回车符和换行符 `\r\n` 结束，它们是每个 `header` 属性的分隔符。对于上面这串字符串，我们希望最终解析成一个对象结构：

```json
{
  date: 'Fri, 05 Apr 2019 12:40:49 GMT'
  etag: 'W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"',
  connection: 'keep-alive',
  'x-powered-by': 'Express',
  'content-length': '13'
  'content-type': 'application/json; charset=utf-8'
}
```



### parseHeaders 函数实现及应用

根据需求分析，我们要实现一个 `parseHeaders` 工具函数。

`helpers/headers.ts`：

```typescript
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}
```

然后我们使用这个工具函数：

`xhr.ts`：

```typescript
const responseHeaders = parseHeaders(request.getAllResponseHeaders())
```

接着我们再去看刚才的 demo，发现我们已经把响应的 `headers` 字段从字符串解析成对象结构了。那么接下来，我们在解决之前遗留的第二个问题：对响应 `data` 字段的处理。



## 处理响应 data

### 需求分析

在我们不去设置 `responseType` 的情况下，当服务端返回给我们的数据是字符串类型，我们可以尝试去把它转换成一个 JSON 对象。例如：

```
data: "{"a":1,"b":2}"
```

我们把它转换成：

```json
data: {
  a: 1,
  b: 2
}
```



### transformResponse 函数实现及应用

根据需求分析，我们要实现一个 `transformResponse` 工具函数。

`helpers/data.ts`：

```typescript
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
```

`index.ts`：

```typescript
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
```

接着我们再去看刚才的 demo，发现我们已经把响应的 `data` 字段从字符串解析成 JSON 对象结构了。

那么至此，我们的 `ts-axios` 的基础功能已经实现完毕。不过到目前为止，我们都仅仅实现的是正常情况的逻辑，下面一章我们要处理各种异常情况的逻辑。



# 异常处理情况

## 错误处理

### 需求分析

在上一章节，我们实现了 `ts-axios` 的基础功能，但目前为止我们都是处理了正常接收请求的逻辑，并没有考虑到任何错误情况的处理，这对于一个程序的健壮性而言是远不够的，因此我们这一章需要对 AJAX 各种错误情况做处理。

并且我们希望程序也能捕获到这些错误，做进一步的处理。

```typescript
axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})
```

如果在请求的过程中发生任何错误，我们都可以在 `reject` 回调函数中捕获到。

我们把错误分成了几类，接下来我们就来分别处理这些错误情况。



### 处理网络异常错误

当网络出现异常（比如不通）的时候发送请求会触发 `XMLHttpRequest` 对象实例的 `error` 事件，于是我们可以在 [`onerror`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onerror) 的事件回调函数中捕获此类错误。

我们在 `xhr` 函数中添加如下代码：

```typescript
request.onerror = function handleError() {
  reject(new Error('Network Error'))
}
```



### 处理超时错误

我们可以设置某个请求的超时时间 [`timeout`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout)，也就是当请求发送后超过某个时间后仍然没收到响应，则请求自动终止，并触发 `timeout` 事件。

请求默认的超时时间是 0，即永不超时。所以我们首先需要允许程序可以配置超时时间：

```typescript
export interface AxiosRequestConfig {
  // ...
  timeout?: number
}
```

接着在 `xhr` 函数中添加如下代码：

```typescript
const { /*...*/ timeout } = config

if (timeout) {
  request.timeout = timeout
}

request.ontimeout = function handleTimeout() {
  reject(new Error(`Timeout of ${timeout} ms exceeded`))
}
```



### 处理非 200 状态码

对于一个正常的请求，往往会返回 200-300 之间的 HTTP 状态码，对于不在这个区间的状态码，我们也把它们认为是一种错误的情况做处理。

```typescript
request.onreadystatechange = function handleLoad() {
  if (request.readyState !== 4) {
    return
  }

  if (request.status === 0) {
    return
  }

  const responseHeaders = parseHeaders(request.getAllResponseHeaders())
  const responseData =
    responseType && responseType !== 'text' ? request.response : request.responseText
  const response: AxiosResponse = {
    data: responseData,
    status: request.status,
    statusText: request.statusText,
    headers: responseHeaders,
    config,
    request
  }
  handleResponse(response)
}

function handleResponse(response: AxiosResponse) {
  if (response.status >= 200 && response.status < 300) {
    resolve(response)
  } else {
    reject(new Error(`Request failed with status code ${response.status}`))
  }
}
```

我们在 `onreadystatechange` 的回调函数中，添加了对 [`request.status`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status) 的判断，因为当出现网络错误或者超时错误的时候，该值都为 0。

接着我们在 `handleResponse` 函数中对 `request.status` 的值再次判断，如果是 `2xx` 的状态码，则认为是一个正常的请求，否则抛错。



### demo 编写

在 `examples` 目录下创建 `error` 目录，在 `error` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Error example</title>
  </head>
  <body>
    <script src="/__build__/error.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：

```typescript
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e) => {
    console.log(e)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e.message)
})
```

接着在 `server.js` 添加新的接口路由：

```typescript
router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})
```

然后在命令行运行 `npm run dev`，接着打开 chrome 浏览器，访问 `http://localhost:8080/` 即可访问我们的 demo 了，我们点到 `Error` 目录下，通过开发者工具的 network 部分我们可以看到不同的错误情况。

至此我们对各种错误都做了处理，并把它们抛给了程序应用方，让他们对错误可以做进一步的处理。但是这里我们的错误都仅仅是简单的 Error 实例，只有错误文本信息，并不包含是哪个请求、请求的配置、响应对象等其它信息。那么下一节课，我们会对错误信息做增强。



## 错误信息增强

### 需求分析

上一节课我们已经捕获了几类 AJAX 的错误，但是对于错误信息提供的非常有限，我们希望对外提供的信息不仅仅包含错误文本信息，还包括了请求对象配置 `config`，错误代码 `code`，`XMLHttpRequest` 对象实例 `request`以及自定义响应对象 `response`。

```typescript
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.request)
  console.log(e.code)
})
```

这样对于应用方来说，他们就可以捕获到这些错误的详细信息，做进一步的处理。

那么接下来，我们就来对错误信息做增强。



### 创建 AxiosError 类

我们先来定义 `AxiosError` 类型接口，用于外部使用。

`types/index.ts`：

```typescript
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}
```

接着我们创建 `error.ts` 文件，然后实现 `AxiosError` 类，它是继承于 `Error` 类。

`helpers/error.ts`：

```typescript
import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)

  return error
}
```

`AxiosError` 继承于 `Error` 类，添加了一些自己的属性：`config`、`code`、`request`、`response`、`isAxiosError` 等属性。这里要注意一点，我们使用了 `Object.setPrototypeOf(this, AxiosError.prototype)`，这段代码的目的是为了解决 TypeScript 继承一些内置对象的时候的坑，[参考](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work)。

另外，为了方便使用，我们对外暴露了一个 `createError` 的工厂方法。



### createError 方法应用

修改关于错误对象创建部分的逻辑，如下：

`xhr.ts`：

```typescript
import { createError } from './helpers/error'

request.onerror = function handleError() {
  reject(createError(
    'Network Error',
    config,
    null,
    request
  ))
}

request.ontimeout = function handleTimeout() {
  reject(createError(
    `Timeout of ${config.timeout} ms exceeded`,
    config,
    'ECONNABORTED',
    request
  ))
}

function handleResponse(response: AxiosResponse) {
  if (response.status >= 200 && response.status < 300) {
    resolve(response)
  } else {
    reject(createError(
      `Request failed with status code ${response.status}`,
      config,
      null,
      request,
      response
    ))
  }
}
```



### 导出类型定义

在 demo 中，TypeScript 并不能把 `e` 参数推断为 `AxiosError` 类型，于是我们需要手动指明类型，为了让外部应用能引入 `AxiosError` 类型，我们也需要把它们导出。

我们创建 `axios.ts` 文件，把之前的 `index.ts` 的代码拷贝过去，然后修改 `index.ts` 的代码。

`index.ts`：

```typescript
import axios from './axios'

export * from './types'

export default axios
```

这样我们在 demo 中就可以引入 `AxiosError` 类型了。

`examples/error/app.ts`：

```typescript
import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.code)
})
```

至此，我们关于 `ts-axios` 的异常处理逻辑就告一段落。下面的章节，我们会对 `ts-axios` 的接口做扩展，让它提供更多好用和方便的 API。



# Axios 接口扩展

## 扩展接口

### 需求分析

为了用户更加方便地使用 axios 发送请求，我们可以为所有支持请求方法扩展一些接口：

- `axios.request(config)`

- `axios.get(url[, config])`

- `axios.delete(url[, config])`

- `axios.head(url[, config])`

- `axios.options(url[, config])`

- `axios.post(url[, data[, config]])`

- `axios.put(url[, data[, config]])`

- `axios.patch(url[, data[, config]])`

如果使用了这些方法，我们就不必在 `config` 中指定 `url`、`method`、`data` 这些属性了。

从需求上来看，`axios` 不再单单是一个方法，更像是一个混合对象，本身是一个方法，又有很多方法属性，接下来我们就来实现这个混合对象。



### 接口类型定义

根据需求分析，混合对象 `axios` 本身是一个函数，我们再实现一个包括它属性方法的类，然后把这个类的原型属性和自身属性再拷贝到 `axios` 上。

我们先来给 `axios` 混合对象定义接口：

`types/index.ts`：

```typescript
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}

export interface AxiosRequestConfig {
  url?: string
  // ...
}

```

首先定义一个 `Axios` 类型接口，它描述了 `Axios` 类中的公共方法，接着定义了 `AxiosInstance` 接口继承 `Axios`，它就是一个混合类型的接口。

另外 `AxiosRequestConfig` 类型接口中的 `url` 属性变成了可选属性。



### 创建 Axios 类

我们创建一个 `Axios` 类，来实现接口定义的公共方法。我们创建了一个 `core` 目录，用来存放发送请求核心流程的代码。我们在 `core` 目录下创建 `Axios.ts` 文件。

`core/Axios.ts`

```typescript
import { AxiosRequestConfig, AxiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
```

其中 `request` 方法的功能和我们之前的 `axios` 函数功能是一致。`axios` 函数的功能就是发送请求，基于模块化编程的思想，我们把这部分功能抽出一个单独的模块，在 `core` 目录下创建 `dispatchRequest` 方法，把之前 `axios.ts` 的相关代码拷贝过去。另外我们把 `xhr.ts` 文件也迁移到 `core` 目录下。

`core/dispatchRequest.ts`：

```typescript
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
```

回到 `Axios.ts` 文件，对于 `get`、`delete`、`head`、`options`、`post`、`patch`、`put` 这些方法，都是对外提供的语法糖，内部都是通过调用 `request` 方法实现发送请求，只不过在调用之前对 `config` 做了一层合并处理。



### 混合对象实现

混合对象实现思路很简单，首先这个对象是一个函数，其次这个对象要包括 `Axios` 类的所有原型属性和实例属性，我们首先来实现一个辅助函数 `extend`。

`helpers/util.ts`

```typescript
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
```

`extend` 方法的实现用到了交叉类型，并且用到了类型断言。`extend` 的最终目的是把 `from` 里的属性都扩展到 `to` 中，包括原型上的属性。

我们接下来对 `axios.ts` 文件做修改，我们用工厂模式去创建一个 `axios` 混合对象。

`axios.ts`：

```typescript
import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
```

在 `createInstance` 工厂函数的内部，我们首先实例化了 `Axios` 实例 `context`，接着创建`instance` 指向 `Axios.prototype.request` 方法，并绑定了上下文 `context`；接着通过 `extend` 方法把 `context` 中的原型方法和实例方法全部拷贝到 `instance` 上，这样就实现了一个混合对象：`instance` 本身是一个函数，又拥有了 `Axios` 类的所有原型和实例属性，最终把这个 `instance` 返回。由于这里 `TypeScript` 不能正确推断 `instance` 的类型，我们把它断言成 `AxiosInstance` 类型。

这样我们就可以通过 `createInstance` 工厂函数创建了 `axios`，当直接调用 `axios` 方法就相当于执行了 `Axios` 类的 `request` 方法发送请求，当然我们也可以调用 `axios.get`、`axios.post` 等方法。



### demo 编写

在 `examples` 目录下创建 `extend` 目录，在 `extend` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Extend example</title>
  </head>
  <body>
    <script src="/__build__/extend.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：

```typescript
import axios from '../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })
```

然后在命令行运行 `npm run dev`，接着打开 chrome 浏览器，访问 `http://localhost:8080/` 即可访问我们的 demo 了，我们点到 `Extend` 目录下，通过开发者工具的 network 部分我们可以看到每个请求的发送情况。

至此我们支持了对 `axios` API 的扩展，把它变成了一个混合对象。官方的 `axios` 实例除了支持了 `axios(config)`，还支持了传入 2 个参数 `axios(url, config)`，这里就涉及到函数重载的概念了，下一节我们来实现这个 feature。



## axios 函数重载

### 需求分析

目前我们的 axios 函数只支持传入 1 个参数，如下：

```typescript
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})
```

我们希望该函数也能支持传入 2 个参数，如下：

```typescript
axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})
```

第一个参数是 `url`，第二个参数是 `config`，这个函数有点类似 `axios.get` 方法支持的参数类型，不同的是如果我们想要指定 HTTP 方法类型，仍然需要在 `config` 传入 `method`。

这就用到我们之前所学的函数重载知识点了，接下来我们来实现它。



### 重载实现

首先我们要修改 `AxiosInstance` 的类型定义。

`types/index.ts`：

```typescript
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise

  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
```

我们增加一种函数的定义，它支持 2 个参数，其中 `url` 是必选参数，`config` 是可选参数。

由于 `axios` 函数实际上指向的是 `request` 函数，所以我们来修改 `request` 函数的实现。

`core/Axios.ts`：

```typescript
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }
```

我们把 `request` 函数的参数改成 2 个，`url` 和 `config` 都是 `any` 类型，`config` 还是可选参数。

接着在函数体我们判断 `url` 是否为字符串类型，一旦它为字符串类型，则继续对 `config` 判断，因为它可能不传，如果为空则构造一个空对象，然后把 `url` 添加到 `config.url` 中。如果 `url` 不是字符串类型，则说明我们传入的就是单个参数，且 `url` 就是 `config`，因此把 `url` 赋值给 `config`。

这里要注意的是，我们虽然修改了 `request` 的实现，支持了 2 种参数，但是我们对外提供的 `request` 接口仍然不变，可以理解为这仅仅是内部的实现的修改，与对外接口不必一致，只要保留实现兼容接口即可。



### 编写 demo

`examples/extend/app.ts`：

```typescript
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})
```

我们使用了 `axios` 2 种请求方式，打开页面运行 `demo`，通过 network 我们可以看到 2 种请求都是运行正常的。

至此我们实现了 `axios` 函数的重载。官方 axios 支持了一种能力，我们可以去定义返回数据的类型，并在请求的时候指定该类型，然后在响应数据中我们就可以获取到该数据类型。下一节课我们就来实现这个 feature。



## 响应数据支持泛型

### 需求分析

通常情况下，我们会把后端返回数据格式单独放入一个接口中：

```typescript
// 请求接口数据
export interface ResponseData<T = any> {
  /**
   * 状态码
   * @type { number }
   */
  code: number

  /**
   * 数据
   * @type { T }
   */
  result: T

  /**
   * 消息
   * @type { string }
   */
  message: string
}
```

我们可以把 API 抽离成单独的模块：

```typescript
import { ResponseData } from './interface.ts';

export function getUser<T>() {
  return axios.get<ResponseData<T>>('/somepath')
    .then(res => res.data)
    .catch(err => console.error(err))
}
```

接着我们写入返回的数据类型 `User`，这可以让 TypeScript 顺利推断出我们想要的类型：

```typescript
interface User {
  name: string
  age: number
}

async function test() {
  // user 被推断出为
  // {
  //  code: number,
  //  result: { name: string, age: number },
  //  message: string
  // }
  const user = await getUser<User>()
}
```



### 接口添加泛型参数

根据需求分析，我们需要给相关的接口定义添加泛型参数。

`types/index.ts`：

```typescript
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}

export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
```

这里我们先给 `AxiosResponse` 接口添加了泛型参数 `T`，`T=any` 表示泛型的类型参数默认值为 `any`。

接着我们为 `AxiosPromise`、`Axios` 以及 `AxiosInstance` 接口都加上了泛型参数。我们可以看到这些请求的返回类型都变成了 `AxiosPromise<T>`，也就是 `Promise<AxiosResponse<T>>`，这样我们就可以从响应中拿到了类型 `T` 了。



### demo 编写

`examples/extend/app.ts`：

```typescript
interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}


async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()
```

当我们调用 `getUser<User>` 的时候，相当于调用了 `axios<ResponseData<User>>`，也就是我们传入给 `axios` 函数的类型 `T` 为 `ResponseData<User>`；相当于返回值 `AxiosPromise<T>` 的 `T`，实际上也是 `Promise<AxiosResponse<T>>` 中的 `T` 的类型是 `ResponseData<User>`，所以响应数据中的 `data` 类型就是 `ResponseData<User>`，也就是如下数据结构：

```json
{
  code: number
  result: User
  message: string
}
```

这个也是 `const user = await getUser<User>()` 返回值 `user` 的数据类型，所以 TypeScript 能正确推断出 `user` 的类型。

至此，我们的 `ts-axios` 接口扩展章节就告一段落了，下一章我们来实现 `axios` 的一个非常好用的功能 —— 拦截器。



# 拦截器实现

## 拦截器设计与实现

### 需求分析

我们希望能对请求的发送和响应做拦截，也就是在发送请求之前和接收到响应之后做一些额外逻辑。

我们希望设计的拦截器的使用方式如下：

```typescript
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前可以做一些事情
  return config;
}, function (error) {
  // 处理请求错误
  return Promise.reject(error);
});
// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // 处理响应数据
  return response;
}, function (error) {
  // 处理响应错误
  return Promise.reject(error);
});
```

在 `axios` 对象上有一个 `interceptors` 对象属性，该属性又有 `request` 和 `response` 2 个属性，它们都有一个 `use` 方法，`use` 方法支持 2 个参数，第一个参数类似 Promise 的 `resolve` 函数，第二个参数类似 Promise 的 `reject` 函数。我们可以在 `resolve` 函数和 `reject` 函数中执行同步代码或者是异步代码逻辑。

并且我们是可以添加多个拦截器的，拦截器的执行顺序是链式依次执行的方式。对于 `request` 拦截器，后添加的拦截器会在请求前的过程中先执行；对于 `response` 拦截器，先添加的拦截器会在响应后先执行。

```typescript
axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
```

此外，我们也可以支持删除某个拦截器，如下：

```typescript
const myInterceptor = axios.interceptors.request.use(function () {/*...*/})
axios.interceptors.request.eject(myInterceptor)
```



### 整体设计

我们先用一张图来展示一下拦截器工作流程：

![image-20220514151720909](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205141517307.png)

整个过程是一个链式调用的方式，并且每个拦截器都可以支持同步和异步处理，我们自然而然地就联想到使用 Promise 链的方式来实现整个调用过程。

在这个 Promise 链的执行过程中，请求拦截器 `resolve` 函数处理的是 `config` 对象，而相应拦截器 `resolve` 函数处理的是 `response` 对象。

在了解了拦截器工作流程后，我们先要创建一个拦截器管理类，允许我们去添加
删除和遍历拦截器。



### 拦截器管理类实现

根据需求，`axios` 拥有一个 `interceptors` 对象属性，该属性又有 `request` 和 `response` 2 个属性，它们对外提供一个 `use` 方法来添加拦截器，我们可以把这俩属性看做是一个拦截器管理对象。`use` 方法支持 2 个参数，第一个是 `resolve` 函数，第二个是 `reject` 函数，对于 `resolve` 函数的参数，请求拦截器是 `AxiosRequestConfig` 类型的，而响应拦截器是 `AxiosResponse` 类型的；而对于 `reject` 函数的参数类型则是 `any` 类型的。

根据上述分析，我们先来定义一下拦截器管理对象对外的接口。

#### 接口定义

`types/index.ts`：

```typescript
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T=any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
```

这里我们定义了 `AxiosInterceptorManager` 泛型接口，因为对于 `resolve` 函数的参数，请求拦截器和响应拦截器是不同的。



#### 代码实现

```typescript
import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
```

我们定义了一个 `InterceptorManager` 泛型类，内部维护了一个私有属性 `interceptors`，它是一个数组，用来存储拦截器。该类还对外提供了 3 个方法，其中 `use` 接口就是添加拦截器到 `interceptors` 中，并返回一个 `id` 用于删除；`forEach` 接口就是遍历 `interceptors` 用的，它支持传入一个函数，遍历过程中会调用该函数，并把每一个 `interceptor` 作为该函数的参数传入；`eject` 就是删除一个拦截器，通过传入拦截器的 `id` 删除。



### 链式调用实现

> 本小节需要你对 Promise 掌握和理解，可以前往 [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 学习。

当我们实现好拦截器管理类，接下来就是在 `Axios` 中定义一个 `interceptors` 属性，它的类型如下：

```typescript
interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

export default class Axios {
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
}
```

`Interceptors` 类型拥有 2 个属性，一个请求拦截器管理类实例，一个是响应拦截器管理类实例。我们在实例化 `Axios` 类的时候，在它的构造器去初始化这个 `interceptors` 实例属性。

接下来，我们修改 `request` 方法的逻辑，添加拦截器链式调用的逻辑：

`core/Axios.ts`：

```typescript
interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

request(url: any, config?: any): AxiosPromise {
  if (typeof url === 'string') {
    if (!config) {
      config = {}
    }
    config.url = url
  } else {
    config = url
  }
	
  // 将真正发请求的核心方法也变成拦截器链中的一环
  const chain: PromiseChain[] = [{
    resolved: dispatchRequest,
    rejected: undefined
  }]

  this.interceptors.request.forEach(interceptor => {
    chain.unshift(interceptor)
  })

  this.interceptors.response.forEach(interceptor => {
    chain.push(interceptor)
  })

  let promise = Promise.resolve(config)

  while (chain.length) {
    const { resolved, rejected } = chain.shift()!
    promise = promise.then(resolved, rejected)
  }

  return promise
}
```

首先，构造一个 `PromiseChain` 类型的数组 `chain`，并把 `dispatchRequest` 函数赋值给 `resolved` 属性；接着先遍历请求拦截器插入到 `chain` 的前面；然后再遍历响应拦截器插入到 `chain` 后面。

接下来定义一个已经 resolve 的 `promise`，循环这个 `chain`，拿到每个拦截器对象，把它们的 `resolved` 函数和 `rejected` 函数添加到 `promise.then` 的参数中，这样就相当于通过 Promise 的链式调用方式，实现了拦截器一层层的链式调用的效果。

注意我们拦截器的执行顺序，对于请求拦截器，先执行后添加的，再执行先添加的；而对于响应拦截器，先执行先添加的，后执行后添加的。



### demo 编写

在 `examples` 目录下创建 `interceptor` 目录，在 `interceptor` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Interceptor example</title>
  </head>
  <body>
    <script src="/__build__/interceptor.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：

```typescript
import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})
```

该 demo 我们添加了 3 个请求拦截器，添加了 3 个响应拦截器并删除了第二个。运行该 demo 我们通过浏览器访问，我们发送的请求添加了一个 `test` 的请求 header，它的值是 `321`；我们的响应数据返回的是 `hello`，经过响应拦截器的处理，最终我们输出的数据是 `hello13`。

至此，我们给 `ts-axios` 实现了拦截器功能，它是一个非常实用的功能，在实际工作中我们可以利用它做一些需求如登录权限认证。

我们目前通过 `axios` 发送请求，往往会传入一堆配置，但是我们也希望 `ts-axios` 本身也会有一些默认配置，我们把用户传入的自定义配置和默认配置做一层合并。其实，大部分的 JS 库都是类似的玩法。下面一章我们就来实现这个 feature。



# 配置化实现

## 合并配置的设计与实现

### 需求分析

在之前的章节我们了解到，在发送请求的时候可以传入一个配置，来决定请求的不同行为。我们也希望 `ts-axios` 可以有默认配置，定义一些默认的行为。这样在发送每个请求，用户传递的配置可以和默认配置做一层合并。

和官网 `axios` 库保持一致，我们给 `axios` 对象添加一个 `defaults` 属性，表示默认配置，你甚至可以直接修改这些默认配置：

```typescript
axios.defaults.headers.common['test'] = 123
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 2000
```

其中对于 `headers` 的默认配置支持 `common` 和一些请求 `method` 字段，`common` 表示对于任何类型的请求都要添加该属性，而 `method` 表示只有该类型请求方法才会添加对应的属性。

在上述例子中，我们会默认为所有请求的 `header` 添加 `test` 属性，会默认为 `post` 请求的 `header` 添加 `Content-Type` 属性。



### 默认配置

#### 默认配置定义

接下来，我们先实现默认配置

`defaults.ts`：

```typescript
import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
```

我们定义了 `defaults` 常量，它包含默认请求的方法、超时时间，以及 `headers` 配置。

未来我们会根据新的需求添加更多的默认配置。

#### 添加到 axios 对象中

根据需求，我们要给 `axios` 对象添加一个 `defaults` 属性，表示默认配置：

```typescript
export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  // ...
}  
```

我们给 `Axios` 类添加一个 `defaults` 成员属性，并且让 `Axios` 的构造函数接受一个 `initConfig` 对象，把 `initConfig` 赋值给 `this.defaults`。

接着修改 `createInstance` 方法，支持传入 `config` 对象。

```typescript
import defaults from './defaults'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  // extend(instance, Axios.prototype, context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)
```

这样我们就可以在执行 `createInstance` 创建 `axios` 对象的时候，把默认配置传入了。



### 配置合并及策略

定义了默认配置后，我们发送每个请求的时候需要把自定义配置和默认配置做合并，它并不是简单的 2 个普通对象的合并，对于不同的字段合并，会有不同的合并策略。举个例子：

```typescript
config1 = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

config2 = {
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  },
  headers: {
    test: '321'
  }
}

merged = {
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  },
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
    test: '321'
  }
}
```

我们在 `core/mergeConfig.ts` 中实现合并方法。

#### 合并方法

```typescript
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
```

合并方法的整体思路就是对 `config1` 和 `config2` 中的属性遍历，执行 `mergeField` 方法做合并，这里 `config1` 代表默认配置，`config2` 代表自定义配置。

遍历过程中，我们会通过 `config2[key]` 这种索引的方式访问，所以需要给 `AxiosRequestConfig` 的接口定义添加一个字符串索引签名：

```typescript
export interface AxiosRequestConfig {
  // ...

  [propName: string]: any
}
```

在 `mergeField` 方法中，我们会针对不同的属性使用不同的合并策略。

#### 默认合并策略

这是大部分属性的合并策略，如下：

```typescript
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
```

它很简单，如果有 `val2` 则返回 `val2`，否则返回 `val1`，也就是如果自定义配置中定义了某个属性，就采用自定义的，否则就用默认配置。

#### 只接受自定义配置合并策略

对于一些属性如 `url`、`params`、`data`，合并策略如下：

```typescript
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})
```

因为对于 `url`、`params`、`data` 这些属性，默认配置显然是没有意义的，它们是和每个请求强相关的，所以我们只从自定义配置中获取。

#### 复杂对象合并策略

对于一些属性如 `headers`，合并策略如下：

```typescript
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})
```

`helpers/util.ts`：

```typescript
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
```

对于 `headers` 这类的复杂对象属性，我们需要使用深拷贝的方式，同时也处理了其它一些情况，因为它们也可能是一个非对象的普通值。未来我们讲到认证授权的时候，`auth` 属性也是这个合并策略。

最后我们在 `request` 方法里添加合并配置的逻辑：

```typescript
config = mergeConfig(this.defaults, config)
```



### flatten headers

经过合并后的配置中的 `headers` 是一个复杂对象，多了 `common`、`post`、`get` 等属性，而这些属性中的值才是我们要真正添加到请求 `header` 中的。

 举个例子：

```typescript
headers: {
  common: {
    Accept: 'application/json, text/plain, */*'
  },
  post: {
    'Content-Type':'application/x-www-form-urlencoded'
  }
}
```

我们需要把它压成一级的，如下：

```typescript
headers: {
  Accept: 'application/json, text/plain, */*',
 'Content-Type':'application/x-www-form-urlencoded'
}
```

这里要注意的是，对于 `common` 中定义的 `header` 字段，我们都要提取，而对于 `post`、`get` 这类提取，需要和该次请求的方法对应。

接下来我们实现 `flattenHeaders` 方法。


`helpers/header.ts`：

```typescript
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
```

我们可以通过 `deepMerge` 的方式把 `common`、`post` 的属性拷贝到 `headers` 这一级，然后再把 `common`、`post` 这些属性删掉。 

然后我们在真正发送请求前执行这个逻辑。

`core/dispatchRequest.ts`：

```typescript
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}
```

这样确保我们了配置中的 `headers` 是可以正确添加到请求 `header` 中的



### demo 编写

在 `examples` 目录下创建 `config` 目录，在 `config` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Config example</title>
  </head>
  <body>
    <script src="/__build__/config.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：

```typescript
import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})
```

这个例子中我们额外引入了 `qs` 库，它是一个查询字符串解析和字符串化的库。

比如我们的例子中对于 `{a:1}` 经过 `qs.stringify` 变成 `a=1`。

由于我们的例子给默认值添加了 `post` 和 `common` 的 `headers`，我们在请求前做配置合并，于是我们请求的 `header` 就添加了 `Content-Type` 字段，它的值是 `application/x-www-form-urlencoded`；另外我们也添加了 `test2` 字段，它的值是 `123`。

至此，我们合并配置的逻辑就实现完了。我们在前面的章节编写 `axios` 的基础功能的时候对请求数据和响应数据都做了处理，官方 `axios` 则把这俩部分逻辑也做到了默认配置中，意味这用户可以去修改这俩部分的逻辑，实现自己对请求和响应数据处理的逻辑。那么下一节我们就来实现这个 feature。



## 请求和响应配置化

### 需求分析

官方的 axios 库给默认配置添加了 `transformRequest` 和 `transformResponse` 两个字段，它们的值是一个数组或者是一个函数。

其中 `transformRequest` 允许你在将请求数据发送到服务器之前对其进行修改，这只适用于请求方法 `put`、`post` 和 `patch`，如果值是数组，则数组中的最后一个函数必须返回一个字符串或 `FormData`、`URLSearchParams`、`Blob` 等类型作为 `xhr.send` 方法的参数，而且在 `transform` 过程中可以修改  `headers` 对象。

而 `transformResponse` 允许你在把响应数据传递给 `then` 或者 `catch` 之前对它们进行修改。

当值为数组的时候，数组的每一个函数都是一个转换函数，数组中的函数就像管道一样依次执行，前者的输出作为后者的输入。

举个例子：

```typescript
axios({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...axios.defaults.transformRequest],
  transformResponse: [axios.defaults.transformResponse, function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
})
```



### 修改默认配置

先修改 `AxiosRequestConfig` 的类型定义，添加 `transformRequest` 和 `transformResponse` 俩个可选属性。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}
```

接着修改默认配置，如下：

`defaults.ts`：

```typescript
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  // ...
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}
```

我们把之前对请求数据和响应数据的处理逻辑，放到了默认配置中，也就是默认处理逻辑。



### transform 逻辑重构

接下来，我们就要重构之前写的对请求数据和响应数据的处理逻辑了。由于我们可能会编写多个转换函数，我们先定义一个 `transform` 函数来处理这些转换函数的调用逻辑。

`core/transform.ts`

```typescript
import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
```

`transform` 函数中接收 `data`、`headers`、`fns` 3 个参数，其中 `fns` 代表一个或者多个转换函数，内部逻辑很简单，遍历 `fns`，执行这些转换函数，并且把 `data` 和 `headers` 作为参数传入，每个转换函数返回的 `data` 会作为下一个转换函数的参数 `data` 传入。

接下来修改对请求数据和响应数据的处理逻辑。

`dispatchRequest.ts`：

```typescript
import transform from './transform'

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
```

我们把对请求数据的处理和对响应数据的处理改成使用 `transform` 函数实现，并把配置中的 `transformRequest` 及 `transformResponse` 分别传入。



### demo 编写

```typescript
axios({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
```

我们对 `transformRequest` 做了修改，在执行它默认的 `transformRequest` 之前，我们先用 `qs.stringify` 库对传入的数据 `data` 做了一层转换。同时也对 `transformResponse` 做了修改，在执行完默认的 `transformResponse` 后，会给响应的 `data` 对象添加一个 `data.b = 2`。

因为之前我们实现了配置的合并，而且我们传入的 `transformRequest` 和 `transformResponse` 遵循默认合并策略，它们会覆盖默认的值。

至此，我们就实现了请求和响应的配置化。到目前为止，我们的 axios 都是一个单例，一旦我们修改了 axios 的默认配置，会影响所有的请求。官网提供了一个 `axios.create` 的工厂方法允许我们创建一个新的 `axios` 实例，同时允许我们传入新的配置和默认配置合并，并做为新的默认配置。下面一节课我们就来实现这个 feature。



## 扩展 axios.create 静态接口

### 需求分析

目前为止，我们的 axios 都是一个单例，一旦我们修改了 axios 的默认配置，会影响所有的请求。我们希望提供了一个 `axios.create` 的静态接口允许我们创建一个新的 `axios` 实例，同时允许我们传入新的配置和默认配置合并，并做为新的默认配置。

举个例子：

```typescript
const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
})
```



### 静态方法扩展

由于 `axios` 扩展了一个静态接口，因此我们先来修改接口类型定义。

`types/index.ts`：

```typescript
export interface AxiosStatic extends AxiosInstance{
  create(config?: AxiosRequestConfig): AxiosInstance
}
```

`create` 函数可以接受一个 `AxiosRequestConfig` 类型的配置，作为默认配置的扩展，也可以接受不传参数。

接着我们来实现 `axios.create` 静态方法。

`axios.ts`：

```typescript
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}
```

内部调用了 `createInstance` 函数，并且把参数 `config` 与 `defaults` 合并，作为新的默认配置。注意这里我们需要 `createInstance` 函数的返回值类型为 `AxiosStatic`。



### demo 编写

```typescript
const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
```

我们对上节课的示例做了小小的修改，通过 `axios.create` 方法创建一个新的实例 `instance`，并传入了 `transformRequest` 和 `transformResponse` 的配置修改了默认配置，然后通过 `instance` 发送请求，效果和之前是一样的。

至此我们实现了 `axios.create` 静态接口的扩展，整个 `ts-axios` 的配置化也告一段落。官方 axios 库还支持了对请求取消的能力，在发送请求前以及请求发送出去未响应前都可以取消该请求。下一章我们就来实现这个 feature。



## 取消功能的设计与实现

### 需求分析

有些场景下，我们希望能主动取消请求，比如常见的搜索框案例，在用户输入过程中，搜索框的内容也在不断变化，正常情况每次变化我们都应该向服务端发送一次请求。但是当用户输入过快的时候，我们不希望每次变化请求都发出去，通常一个解决方案是前端用 debounce 的方案，比如延时 200ms 发送请求。这样当用户连续输入的字符，只要输入间隔小于 200ms，前面输入的字符都不会发请求。

但是还有一种极端情况是后端接口很慢，比如超过 1s 才能响应，这个时候即使做了 200ms 的 debounce，但是在我慢慢输入（每个输入间隔超过 200ms）的情况下，在前面的请求没有响应前，也有可能发出去多个请求。因为接口的响应时长是不定的，如果先发出去的请求响应时长比后发出去的请求要久一些，后请求的响应先回来，先请求的响应后回来，就会出现前面请求响应结果覆盖后面请求响应结果的情况，那么就乱了。因此在这个场景下，我们除了做 debounce，还希望后面的请求发出去的时候，如果前面的请求还没有响应，我们可以把前面的请求取消。

从 axios 的取消接口设计层面，我们希望做如下的设计：

```typescript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message);
  } else {
    // 处理错误
  }
});

// 取消请求 (请求原因是可选的)
source.cancel('Operation canceled by the user.');
```

我们给 `axios` 添加一个 `CancelToken` 的对象，它有一个 `source` 方法可以返回一个 `source` 对象，`source.token` 是在每次请求的时候传给配置对象中的 `cancelToken` 属性，然后在请求发出去之后，我们可以通过 `source.cancel` 方法取消请求。

我们还支持另一种方式的调用：

``` typescript
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

// 取消请求
cancel();
```

`axios.CancelToken` 是一个类，我们直接把它实例化的对象传给请求配置中的 `cancelToken` 属性，`CancelToken` 的构造函数参数支持传入一个 `executor` 方法，该方法的参数是一个取消函数 `c`，我们可以在 `executor` 方法执行的内部拿到这个取消函数 `c`，赋值给我们外部定义的 `cancel` 变量，之后我们可以通过调用这个 `cancel` 方法来取消请求。



### 异步分离的设计方案

通过需求分析，我们知道想要实现取消某次请求，我们需要为该请求配置一个 `cancelToken`，然后在外部调用一个 `cancel` 方法。

请求的发送是一个异步过程，最终会执行 `xhr.send` 方法，`xhr` 对象提供了 [`abort`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort) 方法，可以把请求取消。因为我们在外部是碰不到 `xhr` 对象的，所以我们想在执行 `cancel` 的时候，去执行 `xhr.abort` 方法。

现在就相当于我们在 `xhr` 异步请求过程中，插入一段代码，当我们在外部执行 `cancel` 函数的时候，会驱动这段代码的执行，然后执行 `xhr.abort` 方法取消请求。

我们可以利用 Promise 实现异步分离，也就是在 `cancelToken` 中保存一个 `pending` 状态的 Promise 对象，然后当我们执行 `cancel` 方法的时候，能够访问到这个 Promise 对象，把它从 `pending` 状态变成 `resolved` 状态，这样我们就可以在 `then` 函数中去实现取消请求的逻辑，类似如下的代码：

```typescript
if (cancelToken) {
  cancelToken.promise
    .then(reason => {
      request.abort()
      reject(reason)
    })
}
```



### CancelToken 类实现

接下来，我们就来实现这个 `CancelToken` 类，先来看一下接口定义：

#### 接口定义

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  cancelToken?: CancelToken
}

export interface CancelToken {
  promise: Promise<string>
  reason?: string
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

```

其中 `CancelToken` 是实例类型的接口定义，`Canceler` 是取消方法的接口定义，`CancelExecutor` 是 `CancelToken` 类构造函数参数的接口定义。

#### 代码实现

我们单独创建 `cancel` 目录来管理取消相关的代码，在 `cancel` 目录下创建 `CancelToken.ts` 文件：

```typescript
import { CancelExecutor } from '../types'

interface ResolvePromise {
  (reason?: string): void
}

export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = message
      resolvePromise(this.reason)
    })
  }
}
```

在 `CancelToken` 构造函数内部，实例化一个 `pending` 状态的 Promise 对象，然后用一个 `resolvePromise` 变量指向 `resolve` 函数。接着执行 `executor` 函数，传入一个 `cancel` 函数，在 `cancel` 函数内部，会调用 `resolvePromise` 把 Promise 对象从 `pending` 状态变为 `resolved` 状态。

接着我们在 `xhr.ts` 中插入一段取消请求的逻辑。

`core/xhr.ts`：

```typescript
const { /*....*/ cancelToken } = config

if (cancelToken) {
  cancelToken.promise.then(reason => {
    request.abort()
    reject(reason)
  })
}
```

这样就满足了第二种使用方式，接着我们要实现第一种使用方式，给 `CancelToken` 扩展静态接口。



### CancelToken 扩展静态接口

#### 接口定义

`types/index.ts`：

```typescript
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}
```

其中 `CancelTokenSource` 作为 `CancelToken` 类静态方法 `source` 函数的返回值类型，`CancelTokenStatic` 则作为 `CancelToken` 类的类类型。

#### 代码实现

`cancel/CancelToken.ts`：

```typescript
export default class CancelToken {
  // ...

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
```

`source` 的静态方法很简单，定义一个 `cancel` 变量实例化一个 `CancelToken` 类型的对象，然后在 `executor` 函数中，把 `cancel` 指向参数 `c` 这个取消函数。

这样就满足了我们第一种使用方式，但是在第一种使用方式的例子中，我们在捕获请求的时候，通过 `axios.isCancel` 来判断这个错误参数 e 是不是一次取消请求导致的错误，接下来我们对取消错误的原因做一层包装，并且把给 `axios` 扩展静态方法



### Cancel 类实现及 axios 的扩展

#### 接口定义

```typescript
export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new(message?: string): Cancel
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}
```

其中 `Cancel` 是实例类型的接口定义，`CancelStatic` 是类类型的接口定义，并且我们给 `axios` 扩展了多个静态方法。

#### 代码实现

我在 `cancel` 目录下创建 `Cancel.ts` 文件。

```typescript
export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
```

`Cancel` 类非常简单，拥有一个 `message` 的公共属性。`isCancel` 方法也非常简单，通过 `instanceof` 来判断传入的值是不是一个 `Cancel` 对象。

接着我们对 `CancelToken` 类中的 `reason` 类型做修改，把它变成一个 `Cancel` 类型的实例。

先修改定义部分。

`types/index.ts`：

```typescript
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
}
```

再修改实现部分：

```typescript
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }
}
```

接下来我们给 `axios` 扩展一些静态方法，供用户使用。

`axios.ts`：

```typescript
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
```



### 额外逻辑实现

除此之外，我们还需要实现一些额外逻辑，比如当一个请求携带的 `cancelToken` 已经被使用过，那么我们甚至都可以不发送这个请求，只需要抛一个异常即可，并且抛异常的信息就是我们取消的原因，所以我们需要给 `CancelToken` 扩展一个方法。

先修改定义部分。

`types/index.ts`：

```typescript
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}
```

添加一个 `throwIfRequested` 方法，接下来实现它：

`cancel/CancelToken.ts`：

```typescript
export default class CancelToken {
  // ...

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
```

判断如果存在 `this.reason`，说明这个 `token` 已经被使用过了，直接抛错。

接下来在发送请求前增加一段逻辑。

`core/dispatchRequest.ts`：

```typescript
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)

  // ...
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
```

发送请求前检查一下配置的 cancelToken 是否已经使用过了，如果已经被用过则不用法请求，直接抛异常。



### demo 编写

在 `examples` 目录下创建 `cancel` 目录，在 `cancel` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Cancel example</title>
  </head>
  <body>
    <script src="/__build__/cancel.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：

```typescript
import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 200)
```

我们的 demo 展示了 2 种使用方式，也演示了如果一个 token 已经被使用过，则再次携带该 token 的请求并不会发送。

至此，我们完成了 `ts-axios` 的请求取消功能，我们巧妙地利用了 Promise 实现了异步分离。目前官方 `axios` 库的一些大的 feature 我们都已经实现了，下面的章节我们就开始补充完善 `ts-axios` 的其它功能。



# 更多功能实现

## withCredentials

### 需求分析

有些时候我们会发一些跨域请求，比如 `http://domain-a.com` 站点发送一个 `http://api.domain-b.com/get` 的请求，默认情况下，浏览器会根据同源策略限制这种跨域请求，但是可以通过 [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) 技术解决跨域问题。

在同域的情况下，我们发送请求会默认携带当前域下的 cookie，但是在跨域的情况下，默认是不会携带请求域下的 cookie 的，比如 `http://domain-a.com` 站点发送一个 `http://api.domain-b.com/get` 的请求，默认是不会携带 `api.domain-b.com` 域下的 cookie，如果我们想携带（很多情况下是需要的），只需要设置请求的 `xhr` 对象的 `withCredentials` 为 true 即可。



### 代码实现

先修改 `AxiosRequestConfig` 的类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  withCredentials?: boolean
}
```

然后修改请求发送前的逻辑。

`core/xhr.ts`：

```typescript
const { /*...*/ withCredentials } = config

if (withCredentials) {
  request.withCredentials = true
}
```



### demo 编写

在 `examples` 目录下创建 `more` 目录，在 `cancel` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>More example</title>
  </head>
  <body>
    <script src="/__build__/more.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：

```typescript
import axios from '../../src/index'

document.cookie = 'a=b'

axios.get('/more/get').then(res => {
  console.log(res)
})

axios.post('http://127.0.0.1:8088/more/server2', { }, {
  withCredentials: true
}).then(res => {
  console.log(res)
})
```

这次我们除了给 `server.js` 去配置了接口路由，还创建了 `server2.js`，起了一个跨域的服务。

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

router.post('/more/server2', function(req, res) {
  res.set(cors)
  res.json(req.cookies)
})

router.options('/more/server2', function(req, res) {
  res.set(cors)
  res.end()
})

app.use(router)

const port = 8088
module.exports = app.listen(port)
```

这里需要安装一下 `cookie-parser` 插件，用于请求发送的 cookie。

通过 demo 演示我们可以发现，对于同域请求，会携带 cookie，而对于跨域请求，只有我们配置了 `withCredentials` 为 true，才会携带 cookie。

至此我们的 `withCredentials` feature 开发完毕，下一节课我们来实现 axios 对 XSRF
 的防御功能。



## XSRF 防御

### 需求分析

XSRF 又名 [CSRF](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security#Cross-Site_Request_Forgery_(CSRF))，跨站请求伪造，它是前端常见的一种攻击方式，我们先通过一张图来认识它的攻击手段。

![image-20220515095607433](https://yuanchaowhut.oss-cn-hangzhou.aliyuncs.com/images/202205150956385.png)

CSRF 的防御手段有很多，比如验证请求的 referer，但是 referer 也是可以伪造的，所以杜绝此类攻击的一种方式是服务器端要求每次请求都包含一个 `token`，这个 `token` 不在前端生成，而是在我们每次访问站点的时候生成，并通过 `set-cookie` 的方式种到客户端，然后客户端发送请求的时候，从 `cookie` 中对应的字段读取出 `token`，然后添加到请求 `headers` 中。这样服务端就可以从请求 `headers` 中读取这个 `token` 并验证，由于这个 `token` 是很难伪造的，所以就能区分这个请求是否是用户正常发起的。

对于我们的 `ts-axios` 库，我们要自动把这几件事做了，每次发送请求的时候，从 `cookie` 中读取对应的 `token` 值，然后添加到请求 `headers`中。我们允许用户配置 `xsrfCookieName` 和 `xsrfHeaderName`，其中 `xsrfCookieName` 表示存储 `token` 的 `cookie` 名称，`xsrfHeaderName` 表示请求 `headers` 中 `token` 对应的 `header` 名称。

```typescript
axios.get('/more/get',{
  xsrfCookieName: 'XSRF-TOKEN', // default
  xsrfHeaderName: 'X-XSRF-TOKEN' // default
}).then(res => {
  console.log(res)
})
```

我们提供 `xsrfCookieName` 和 `xsrfHeaderName` 的默认值，当然用户也可以根据自己的需求在请求中去配置 `xsrfCookieName` 和 `xsrfHeaderName`。



### 代码实现

先修改 `AxiosRequestConfig` 的类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  xsrfCookieName?: string
  xsrfHeaderName?: string
}
```

然后修改默认配置。

`defaults.ts`：

```typescript
const defaults: AxiosRequestConfig = {
  // ...
  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',
}
```

接下来我们要做三件事：

- 首先判断如果是配置 `withCredentials` 为 `true` 或者是同域请求，我们才会请求 `headers` 添加 `xsrf` 相关的字段。

- 如果判断成功，尝试从 cookie 中读取 `xsrf` 的 `token` 值。

- 如果能读到，则把它添加到请求 `headers` 的 `xsrf` 相关字段中。

我们先来实现同域请求的判断。

`helpers/url.ts`：

```typescript
interface URLOrigin {
  protocol: string
  host: string
}


export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}
```

同域名的判断主要利用了一个技巧，创建一个 a 标签的 DOM，然后设置 `href` 属性为我们传入的 `url`，然后可以获取该 DOM 的 `protocol`、`host`。当前页面的 `url` 和请求的 `url` 都通过这种方式获取，然后对比它们的 `protocol` 和 `host` 是否相同即可。

接着实现 cookie 的读取。

`helpers/cookie.ts`：

```typescript
const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
```

`cookie` 的读取逻辑很简单，利用了正则表达式可以解析到 `name` 对应的值。

最后实现完整的逻辑。

`core/xhr.ts`：

```typescript
const {
  /*...*/
  xsrfCookieName,
  xsrfHeaderName
} = config

if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName){
  const xsrfValue = cookie.read(xsrfCookieName)
  if (xsrfValue) {
    headers[xsrfHeaderName!] = xsrfValue
  }
}
```



### demo 编写

```typescript
const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => {
  console.log(res)
})
```

`examples/server.js`：

```javascript
app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))
```

在访问页面的时候，服务端通过 `set-cookie` 往客户端种了 `key` 为 `XSRF-TOKEN`，值为 `1234abc` 的 `cookie`，作为 `xsrf` 的 `token` 值。

然后我们在前端发送请求的时候，就能从 cookie 中读出 `key` 为 `XSRF-TOKEN` 的值，然后把它添加到 `key` 为 `X-XSRF-TOKEN` 的请求 `headers` 中。

至此，我们实现了 XSRF 的自动防御的能力，下节课我们来实现 ts-axios 对上传和下载请求的支持。



## 上传和下载的进度监控

### 需求分析

有些时候，当我们上传文件或者是请求一个大体积数据的时候，希望知道实时的进度，甚至可以基于此做一个进度条的展示。

我们希望给 `axios` 的请求配置提供 `onDownloadProgress` 和 `onUploadProgress` 2 个函数属性，用户可以通过这俩函数实现对下载进度和上传进度的监控。

```typescript
axios.get('/more/get',{
  onDownloadProgress(progressEvent) {
    // 监听下载进度
  }
})

axios.post('/more/post',{
  onUploadProgress(progressEvent) {
    // 监听上传进度
  }
})
```

`xhr` 对象提供了一个 [`progress`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event) 事件，我们可以监听此事件对数据的下载进度做监控；另外，[`xhr.uplaod`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload) 对象也提供了 [`progress`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event) 事件，我们可以基于此对上传进度做监控。



### 代码实现

首先修改一下类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
}
```

接着在发送请求前，给 `xhr` 对象添加属性。

`core/xhr.ts`：

```typescript
const {
  /*...*/
  onDownloadProgress,
  onUploadProgress
} = config

if (onDownloadProgress) {
  request.onprogress = onDownloadProgress
}

if (onUploadProgress) {
  request.upload.onprogress = onUploadProgress
}
```

另外，如果请求的数据是 `FormData` 类型，我们应该主动删除请求 `headers` 中的 `Content-Type` 字段，让浏览器自动根据请求数据设置 `Content-Type`。比如当我们通过 `FormData` 上传文件的时候，浏览器会把请求 `headers` 中的 `Content-Type` 设置为 `multipart/form-data`。

我们先添加一个判断 `FormData` 的方法。

`helpers/util.ts`：

```typescript
export function isFormData(val: any): boolean {
  return typeof val !== 'undefined' && val instanceof FormData
}
```

然后再添加相关逻辑。

`core/xhr.ts`：

```typescript
if (isFormData(data)) {
  delete headers['Content-Type']
}
```

我们发现，`xhr` 函数内部随着需求越来越多，代码也越来越臃肿，我们可以把逻辑梳理一下，把内部代码做一层封装优化。

```typescript
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }

        if (request.status === 0) {
          return
        }

        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData =
          responseType && responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(response)
      }

      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }

      request.ontimeout = function handleTimeout() {
        reject(
          createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
        )
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
```

我们把整个流程分为 7 步：

- 创建一个 `request` 实例。
- 执行 `request.open` 方法初始化。
- 执行 `configureRequest` 配置 `request` 对象。
- 执行 `addEvents` 给 `request` 添加事件处理函数。
- 执行 `processHeaders` 处理请求 `headers`。
- 执行 `processCancel` 处理请求取消逻辑。
- 执行 `request.send` 方法发送请求。

这样拆分后整个流程就会显得非常清晰，未来我们再去新增需求的时候代码也不会显得越来越臃肿。



### demo 编写

这节课的 demo 非常有意思，我们第一次给界面上增加了一些交互的按钮。

`examples/more/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>More example</title>
  <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"/>
</head>
<body>
<h1>file download</h1>
<div>
  <button id="download" class="btn btn-primary">Download</button>
</div>
<h1>file upload</h1>
<form role="form" class="form" onsubmit="return false;">
  <input id="file" type="file" class="form-control"/>
  <button id="upload" type="button" class="btn btn-primary">Upload</button>
</form>

<script src="/__build__/more.js"></script>
</body>
</html>
```

另外，我们为了友好地展示上传和下载进度，我们引入了一个开源库 [nprogress](https://github.com/rstacruz/nprogress)，它可以在页面的顶部展示进度条。

`examples/more/app.ts`：

```typescript
const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }

  const setupStopProgress = () => {
    instance.interceptors.response.use(response => {
      NProgress.done()
      return response
    }, error => {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl!.addEventListener('click', e => {
  instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
})

const uploadEl = document.getElementById('upload')

uploadEl!.addEventListener('click', e => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance.post('/more/upload', data)
  }
})
```

对于 `progress` 事件参数 `e`，会有 `e.total` 和 `e.loaded` 属性，表示进程总体的工作量和已经执行的工作量，我们可以根据这 2 个值算出当前进度，然后通过 `Nprogess.set` 设置。另外，我们通过配置请求拦截器和响应拦截器执行 `NProgress.start()` 和 `NProgress.done()`。

我们给下载按钮绑定了一个 `click` 事件，请求一张图片，我们可以看到实时的进度；另外我们也给上传按钮绑定了一个 `click` 事件，上传我们选择的文件，同样也能看到实时进度。

在服务端，我们为了处理上传请求，需要下载安装一个 `express` 的中间件 `connect-multiparty`，然后使用它。

`example/server.js`：

```javascript
const multipart = require('connect-multiparty')
app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))

router.post('/more/upload', function(req, res) {
  console.log(req.body, req.files)
  res.end('upload success!')
})
```

这里我们需要在 `examples` 目录下创建一个 `upload-file` 的空目录，用于存放上传的文件。

通过这个中间件，我们就可以处理上传请求并且可以把上传的文件存储在 `upload-file` 目录下。

为了保证代码正常运行，我们还需要在 `examples/webpack.config.js` 中添加 `css-loader` 和 `css-loader`，不要忘记先安装它们。

至此，`ts-axios` 支持了上传下载进度事件的回调函数的配置，用户可以通过配置这俩函数实现对下载进度和上传进度的监控。下一节课我们来实现 http 的认证授权功能。



## HTTP 授权

### 需求分析

HTTP 协议中的 [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) 请求 header 会包含服务器用于验证用户代理身份的凭证，通常会在服务器返回 401 Unauthorized 状态码以及 WWW-Authenticate 消息头之后在后续请求中发送此消息头。

axios 库也允许你在请求配置中配置 `auth` 属性，`auth` 是一个对象结构，包含 `username` 和 `password` 2 个属性。一旦用户在请求的时候配置这俩属性，我们就会自动往 HTTP 的 请求 header 中添加 `Authorization` 属性，它的值为 `Basic 加密串`。
这里的加密串是 `username:password` base64 加密后的结果。

```typescript
axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'Yee',
    password: '123456'
  }
}).then(res => {
  console.log(res)
})
```



### 代码实现

首先修改一下类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  auth?: AxiosBasicCredentials
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}
```

接着修改合并规则，因为 auth 也是一个对象格式，所以它的合并规则是 `deepMergeStrat`。

`core/mergeConfig.ts`：

```typescript
const stratKeysDeepMerge = ['headers', 'auth']
```

然后修改发送请求前的逻辑。

`core/xhr.ts`：

```typescript
const {
  /*...*/
  auth
} = config

if (auth) {
  headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
}
```



### demo 编写

```typescript
axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'Yee',
    password: '123456'
  }
}).then(res => {
  console.log(res)
})
```

另外，我们在 `server.js` 中对于这个路由接口写了一段小逻辑：

```javascript
router.post('/more/post', function(req, res) {
  const auth = req.headers.authorization
  const [type, credentials] = auth.split(' ')
  console.log(atob(credentials))
  const [username, password] = atob(credentials).split(':')
  if (type === 'Basic' && username === 'Yee' && password === '123456') {
    res.json(req.body)
  } else {
    res.end('UnAuthorization')
  }
})
```

注意，这里我们需要安装第三方库 `atob` 实现 base64 串的解码。

至此，`ts-axios` 支持了 HTTP 授权功能，用户可以通过配置 auth 对象实现自动在请求 header 中添加 `Authorization` 属性。下一节课我们来实现自定义合法状态码功能。



## 自定义合法状态码

### 需求分析

之前 `ts-axios` 在处理响应结果的时候，认为 HTTP [status](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status) 在 200 和 300 之间是一个合法值，在这个区间之外则创建一个错误。有些时候我们想自定义这个规则，比如认为 304 也是一个合法的状态码，所以我们希望 `ts-axios` 能提供一个配置，允许我们自定义合法状态码规则。如下：

```typescript
axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})
```

通过在请求配置中配置一个 `validateStatus` 函数，它可以根据参数 `status` 来自定义合法状态码的规则。



### 代码实现

首先修改一下类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  validateStatus?: (status: number) => boolean
}
```

然后我们来修改默认配置规则。

`defaults.ts`：

```typescript
validateStatus(status: number): boolean {
  return status >= 200 && status < 300
}
```

添加默认合法状态码的校验规则。然后再请求后对响应数据的处理逻辑。

`core/xhr.ts`：

```typescript
const {
  /*...*/
  validateStatus
} = config

function handleResponse(response: AxiosResponse): void {
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response)
  } else {
    reject(
      createError(
        `Request failed with status code ${response.status}`,
        config,
        null,
        request,
        response
      )
    )
  }
}
```

如果没有配置 `validateStatus` 以及 `validateStatus` 函数返回的值为 true 的时候，都认为是合法的，正常 `resolve(response)`，否则都创建一个错误。



### demo 编写

```typescript
axios.get('/more/304').then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})

axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})
```

`server.js` 中我们编写了这个路由接口

```javascript
router.get('/more/304', function(req, res) {
  res.status(304)
  res.end()
})
```

接口返回 304 状态码，对于默认的请求我们会输出一条错误信息。第二个请求中我们配置了自定义合法状态码规则，区间在 200 和 400 之间，这样就不会报错，而是可以正常输出响应对象。

至此 `ts-axios` 实现了自定义合法状态码功能，用户可以配置 `validateStatus` 自定义合法状态码规则。之前有同学会质疑 `ts-axios` 对于请求 `url` 参数的序列化处理规则，下一节课我们来实现自定义参数序列化规则功能。



## 自定义参数序列化

### 需求分析

在之前的章节，我们对请求的 url 参数做了处理，我们会解析传入的 params 对象，根据一定的规则把它解析成字符串，然后添加在 url 后面。在解析的过程中，我们会对字符串 encode，但是对于一些特殊字符比如 `@`、`+` 等却不转义，这是 axios 库的默认解析规则。当然，我们也希望自己定义解析规则，于是我们希望 `ts-axios` 能在请求配置中允许我们配置一个 `paramsSerializer` 函数来自定义参数的解析规则，该函数接受 `params` 参数，返回值作为解析后的结果，如下：

```typescript
axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  },
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
}).then(res => {
  console.log(res)
})
```



### 代码实现

首先修改一下类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  paramsSerializer?: (params: any) => string
}
```

然后修改 `buildURL` 函数的实现。

`helpers/url.ts`：

```typescript
export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) {
    return url
  }

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    Object.keys(params).forEach(key => {
      const val = params[key]
      if (val === null || typeof val === 'undefined') {
        return
      }
      let values = []
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }
      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
```

这里我们给 `buildURL` 函数新增了 `paramsSerializer` 可选参数，另外我们还新增了对 `params` 类型判断，如果它是一个 `URLSearchParams` 对象实例的话，我们直接返回它 `toString` 后的结果。

`helpers/util.ts`：

```typescript
export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}
```

最后我们要修改 `buildURL` 调用的逻辑。

`core/dispatchRequest.ts`：

```typescript
function transformURL(config: AxiosRequestConfig): string {
  const { url, params, paramsSerializer } = config
  return buildURL(url!, params, paramsSerializer)
}
```



### demo 编写

```typescript
axios.get('/more/get', {
  params: new URLSearchParams('a=b&c=d')
}).then(res => {
  console.log(res)
})

axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
})

const instance = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

instance.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
})
```

我们编写了 3 种情况的请求，第一种满足请求的 params 参数是 `URLSearchParams` 对象类型的。后两种请求的结果主要区别在于前者并没有对 `[]` 转义，而后者会转义。

至此，`ts-axios` 实现了自定义参数序列化功能，用户可以配置 `paramsSerializer` 自定义参数序列化规则。下一节课我们来实现 `ts-axios` 对 `baseURL` 的支持。



## baseURL

### 需求分析

有些时候，我们会请求某个域名下的多个接口，我们不希望每次发送请求都填写完整的 url，希望可以配置一个 `baseURL`，之后都可以传相对路径。如下：

```typescript
const instance = axios.create({
  baseURL: 'https://some-domain.com/api'
})

instance.get('/get')

instance.post('/post')
```

我们一旦配置了 `baseURL`，之后请求传入的 `url` 都会和我们的 `baseURL` 拼接成完整的绝对地址，除非请求传入的 `url` 已经是绝对地址。



### 代码实现

首先修改一下类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  baseURL?: string
}
```

接下来实现 2 个辅助函数。

`helpers/url.ts`：

```typescript
export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
```

最后我们来调用这俩个辅助函数。

`core/dispatchRequest.ts`：

```typescript
function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}
```



### demo 编写

```typescript
const instance = axios.create({
  baseURL: 'https://img.mukewang.com/'
})

instance.get('5cc01a7b0001a33718720632.jpg')

instance.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg')
```

这个 demo 非常简单，我们请求了慕课网的 2 张图片，注意当第二个请求 `url` 已经是绝对地址的时候，我们并不会再去拼接 `baseURL`。

至此，`ts-axios` 就实现了 `baseURL` 的配置功能，接下来我们来实现 `ts-axios` 的静态方法扩展。



## 静态方法扩展

### 需求分析

官方 axios 库实现了 `axios.all`、`axios.spread` 等方法，它们的用法如下：

```typescript
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
```

实际上，`axios.all` 就是 `Promise.all` 的封装，它返回的是一个 `Promise` 数组，`then` 函数的参数本应是一个参数为 `Promise resolves`（数组）的函数，在这里使用了 `axios.spread` 方法。所以 `axios.spread` 方法是接收一个函数，返回一个新的函数，新函数的结构满足 `then` 函数的参数结构。

个人认为 `axios` 这俩静态方法在目前看来很鸡肋，因为使用 `Promise` 一样可以完成这俩需求。

```typescript
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

Promise.all([getUserAccount(), getUserPermissions()])
  .then(([acct,perms]) {
    // Both requests are now complete
  }));
```

在 `Promise.all` 的 `resolve` 函数中，我们可以直接通过数组的解构拿到每个请求对应的响应对象。

但是为了保持与官网 axios API 一致，我们也在 `ts-axios` 库中实现这俩方法。

官方 axios 库也通过 `axios.Axios` 对外暴露了 `Axios` 类(感觉也没有啥使用场景，但为了保持一致，我们也会实现)。

另外对于 axios 实例，官网还提供了 `getUri` 方法在不发送请求的前提下根据传入的配置返回一个 url，如下：

```typescript
const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))
// https://www.baidu.com/user/12345?idClient=1&idTest=2&testString=thisIsATest
```



### 代码实现

首先修改类型定义。

`types/index.ts`：

```typescript
export interface AxiosClassStatic {
  new (config: AxiosRequestConfig): Axios
}

export interface AxiosStatic extends AxiosInstance {
  // ...

  all<T>(promises: Array<T | Promise<T>>): Promise<T[]>

  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R

  Axios: AxiosClassStatic
}

export interface Axios {
  // ...

  getUri(config?: AxiosRequestConfig): string
}
```

然后我们去实现这几个静态方法。

`axios.ts`：

```typescript
axios.all = function all(promises) {
  return Promise.all(promises)
}

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios
```

最后我们去给 Axios 添加实例方法 `getUri`。

`core/Axios.ts`：

```typescript
getUri(config?: AxiosRequestConfig): string {
  config = mergeConfig(this.defaults, config)
  return transformURL(config)
}
```

先和默认配置合并，然后再通过 `dispatchRequest` 中实现的 `transformURL` 返回一个新的 `url`。



### demo 编写

```typescript
function getA() {
  return axios.get('/more/A')
}

function getB() {
  return axios.get('/more/B')
}

axios.all([getA(), getB()])
  .then(axios.spread(function(resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
  }))


axios.all([getA(), getB()])
  .then(([resA, resB]) => {
    console.log(resA.data)
    console.log(resB.data)
  })

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))
```

这里我们通过 `axios.all` 同时发出了 2 个请求，返回了 `Promise` 数组，，我们可以在 `axios.spread` 的参数函数中拿到结果，也可以直接在 then 函数的参数函数中拿到结果。另外，我们可以根据 `axios.getUri` 方法在不发送请求的情况下根据配置得到最终请求的 url 结果。

至此，`ts-axios` 就实现了官网 axios 库在浏览器端的所有需求。如果你学到了这里，先为自己鼓个掌吧，因为我们已经获得了阶段性的学习成果了。

目前为止，我们对于所写代码的验证都是通过 demo 的方式，但是 demo 毕竟难以覆盖所有场景和代码分支，为了保证代码的正确性，我们还需要更科学的方式。从下一章开始，我们会学习编写单元测试，通过单元测试的方式来保证我们的代码正确性。



# 单元测试

## 前言

单元测试是前端一个很重要的方向，鉴别一个开源库是否靠谱的一个标准是它的单元测试是否完善。有了完整的单元测试，未来你去重构现有代码或者是增加新的需求都会有十足的把握不出现 regression bug。

在前面的章节，我们已经编写完成 ts-axios 库的代码，并通过 demo 的形式简单地对一些功能做了验证，但是 demo 可以走到的代码分支，覆盖的场景都是极其有限的。为了用更科学的手段保证我们代码的可靠性，我们需要去编写单元测试，并尽可能达到 99% 以上的测试覆盖率。

这门课我们会使用开源测试框架 [Jest](https://jestjs.io/en/)，它是 Facebook 出品的一个测试框架，相对其他测试框架，它的一大特点就是内置了常用的测试工具，比如自带断言、测试覆盖率工具，实现了开箱即用。

由于时间有限，我不会带大家一行行手敲测试代码，但我会把所有的知识点和测试代码都带大家过一遍，确保大家都能够学会。但是我希望你们在学习的过程中，能自己手敲这些测试代码，这样有助于你们学习和巩固。

通过这一章节的学习，我希望你们能够学会使用 Jest 去对 JS 库或者是 TS 库编写单元测试，并能把所学应用到你们的实际项目中。给自己的代码添加完整的测试代码也是一个非常好的开发习惯，虽然枯燥但十分实用，如果养成这些好习惯会有助于提升你的行业竞争力，所以希望大家虽然把代码实现了，也不要太骄傲，耐心把单元测试写好。

那么接下来就让我们开启单元测试之旅。



## Jest 安装和配置

### Jest 安装

由于我们的项目是使用 `typescript-library-starter` 初始化的，已经内置了 Jest 的安装，但是安装的版本却不是最新的，我们可以对 `package.json` 中的相关依赖版本做修改，重新安装。

```json
{
  "@types/jest": "^24.0.13",
  "jest": "^24.8.0",
  "jest-config": "^24.8.0",
  "ts-jest": "^24.0.2",
  "typescript": "^3.4.5"
}
```

> 注意，这里都是目前最新的版本，未来如果有版本升级的话，可以自行更新到最新版本。

更改版本后，在命令行再次执行 `npm install` 即可安装到相应版本。



### Jest 配置

在 `package.json` 文件中有 `jest` 字段，对应 Jest 配置：

```json
"jest": {
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "testEnvironment": "jsdom",
  "testRegex": "/test/.*\\.(test|spec)\\.(ts)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 90,
      "functions": 95,
      "lines": 95,
      "statements": 95
    }
  },
  "collectCoverageFrom": [
    "src/*.{js,ts}",
    "src/**/*.{js,ts}"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/test/boot.ts"
  ]
},
```

接下来，我们就分别来看这几个配置的含义。

- [transform](https://jestjs.io/docs/en/configuration#transform-object-string-string)

简单地说就是一种转换器配置，比如我们这里的 

```json
"transform": {
  ".(ts|tsx)": "ts-jest"
},
```

表示的就是使用 `ts-jest` 工具把 `.ts` 和 `.tsx` 文件内容转换成 JavaScript，因为我们也是使用 TypeScript 编写测试代码，而 Node.js 是不能直接支持 TypeScript 的，所以需要配置转换器。

- [testEnvironment](https://jestjs.io/docs/en/configuration#testenvironment-string)

测试环境。

```json
"testEnvironment": "jsdom"
```

表示它是一个类浏览器的测试环境，我们可以使用浏览器环境中的一些 API。

- [testRegex](https://jestjs.io/docs/en/configuration#testregex-string-array-string)

要测试文件的正则表达式。

```json
"testRegex": "/test/.*\\.(test|spec)\\.(ts)$"
```

表示 `test` 目录下所有以 `.test.ts` 和 `.spec.ts` 的文件都需要跑测试。

- [moduleFileExtensions](https://jestjs.io/docs/en/configuration#modulefileextensions-array-string)

模块文件扩展名，当你去引入一个模块并没有指定扩展名的时候，它会依次尝试去添加这些扩展名去找你引入的模块文件。

```json
"moduleFileExtensions": [
  "ts",
  "tsx",
  "js"
]
```

表示优先找 `.ts` 的模块、然后是 `.tsx`，最后是 `.js`。

- [coverageThreshold](https://jestjs.io/docs/en/configuration#coveragethreshold-object)

测试覆盖率的阈值设定，当我们的测试覆盖率达不到阈值的时候，测试会失败。

```json
"coverageThreshold": {
  "global": {
    "branches": 90,
    "functions": 95,
    "lines": 95,
    "statements": 95
  }
}
```

表示全局的代码分支覆盖率要达到 `90%`，方法覆盖率要达到 `95%`，代码行数覆盖率达到 `95%`，声明覆盖率达到 `95%`。

- [collectCoverageFrom](https://jestjs.io/docs/en/configuration#collectcoveragefrom-array)

收集指定文件的测试覆盖率(即使你没为这些文件编写测试)，它的值为 [glob patterns](https://github.com/jonschlinkert/micromatch) 类型。

```json
"collectCoverageFrom": [
  "src/*.{js,ts}",
  "src/**/*.{js,ts}"
]
```

表示收集 `src` 目录以及它的所有子目录中的 `js` 和 `ts` 文件的测试覆盖率。


- [setupFilesAfterEnv](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array)

测试框架安装后立即执行的代码文件列表。

```json
"setupFilesAfterEnv": [
  "<rootDir>/test/boot.ts"
]
```

表示每次跑具体测试代码之前会先运行 `<rootDir>/test/boot.ts` 中的代码，`<rootDir>` 表示当前项目的根目录。这个配置在之后的章节我们会具体介绍。

其他关于 Jest 的配置，感兴趣的同学可以去[官网](https://jestjs.io/docs/en/configuration)做扩展学习。

至此，我们学习了 Jest 的安装和配置，下节课我们就开始编写 `ts-axios` 库的单元测试。



## 辅助模块单元测试

### 准备工作

通常我们会优先为一个库的辅助方法编写测试，我们会优先为 `ts-axios` 库的 `helpers` 目录下的模块编写测试。我们在 `test` 目录下创建一个 `helpers` 目录，创建一个 `boot.ts` 空文件，这个是因为我们上节课给 Jest 配置了 `setupFilesAfterEnv` 指向了这个文件，后面的章节我们会编写这个文件。

然后我们可以在控制台运行 `npm test`，它实际上是执行了 `jest --coverage` 来跑单元测试，我们会发现它会报错，没有匹配的测试文件，那是因为我们还没有在 `test` 目录下编写任何一个 .spec.ts 结尾的测试文件。接下来我们就来为这些辅助模块编写相应的测试。



### util 模块测试

`test/helpers/util.spec.ts`：

```typescript
import {
  isDate,
  isPlainObject,
  isFormData,
  isURLSearchParams,
  extend,
  deepMerge
} from '../../src/helpers/util'

describe('helpers:util', () => {
  describe('isXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate PlainObject', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })

    test('should validate FormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })

    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy()
    })
  })

  describe('extend', () => {
    test('should be mutable', () => {
      const a = Object.create(null)
      const b = { foo: 123 }

      extend(a, b)

      expect(a.foo).toBe(123)
    })

    test('should extend properties', function() {
      const a = { foo: 123, bar: 456 }
      const b = { bar: 789 }
      const c = extend(a, b)

      expect(c.foo).toBe(123)
      expect(c.bar).toBe(789)
    })
  })

  describe('deepMerge', () => {
    test('should be immutable', () => {
      const a = Object.create(null)
      const b: any = { foo: 123 }
      const c: any = { bar: 456 }

      deepMerge(a, b, c)

      expect(typeof a.foo).toBe('undefined')
      expect(typeof a.bar).toBe('undefined')
      expect(typeof b.bar).toBe('undefined')
      expect(typeof c.foo).toBe('undefined')
    })

    test('should deepMerge properties', () => {
      const a = { foo: 123 }
      const b = { bar: 456 }
      const c = { foo: 789 }
      const d = deepMerge(a, b, c)

      expect(d.foo).toBe(789)
      expect(d.bar).toBe(456)
    })

    test('should deepMerge recursively', function() {
      const a = { foo: { bar: 123 } }
      const b = { foo: { baz: 456 }, bar: { qux: 789 } }
      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123,
          baz: 456
        },
        bar: {
          qux: 789
        }
      })
    })

    test('should remove all references from nested objects', () => {
      const a = { foo: { bar: 123 } }
      const b = {}
      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123
        }
      })

      expect(c.foo).not.toBe(a.foo)
    })

    test('should handle null and undefined arguments', () => {
      expect(deepMerge(undefined, undefined)).toEqual({})
      expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 })

      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })
    })
  })
})
```

其中 [`describe`](https://jestjs.io/docs/en/api#describename-fn) 方法用来定义一组测试，它可以支持嵌套，[`test`](https://jestjs.io/docs/en/api#testname-fn-timeout) 函数是用来定义单个测试用例，它是测试的最小单元。[`expect`](https://jestjs.io/docs/en/expect#expectvalue) 是断言函数，所谓"断言"，就是判断代码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。

测试文件编写好后，我们可以去控制台运行一次 `npm test`，看一下测试结果，我们可以看跑了几个测试文件，测试是否通过，测试覆盖率等。



### cookie 模块测试

`test/helpers/cookie.spec.ts`：

```typescript
import cookie from '../../src/helpers/cookie'

describe('helpers:cookie', () => {
  test('should read cookies', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
  })

  test('should return null if cookie name is not exist', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('bar')).toBeNull()
  })
})
```

这里我们可以通过 `document.cookie` 去设置 cookie，就像在浏览器里一样操作。



### data 模块测试

`test/helpers/data.spec.ts`：

```typescript
import { transformRequest, transformResponse } from '../../src/helpers/data'

describe('helpers:data', () => {
  describe('transformRequest', () => {
    test('should transform request data to string if data is a PlainObject', () => {
      const a = { a: 1 }
      expect(transformRequest(a)).toBe('{"a":1}')
    })

    test('should do nothing if data is not a PlainObject', () => {
      const a = new URLSearchParams('a=b')
      expect(transformRequest(a)).toBe(a)
    })
  })

  describe('transformResponse', () => {
    test('should transform response data to Object if data is a JSON string', () => {
      const a = '{"a": 2}'
      expect(transformResponse(a)).toEqual({ a: 2 })
    })

    test('should do nothing if data is a string but not a JSON string', () => {
      const a = '{a: 2}'
      expect(transformResponse(a)).toBe('{a: 2}')
    })

    test('should do nothing if data is not a string', () => {
      const a = { a: 2 }
      expect(transformResponse(a)).toBe(a)
    })
  })
})
```



### error 模块测试

`test/helpers/error.spec.ts`：

```typescript
import { createError } from '../../src/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/types'

describe('helpers::error', function() {
  test('should create an Error with message, config, code, request, response and isAxiosError', () => {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'post' }
    const response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' }
    }
    const error = createError('Boom!', config, 'SOMETHING', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('Boom!')
    expect(error.config).toBe(config)
    expect(error.code).toBe('SOMETHING')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
    expect(error.isAxiosError).toBeTruthy()
  })
})
```

该模块跑完我们会发现，分支覆盖率是在 `50%`，因为第十七行代码

```typescript
super(message)
```

这个是 `super` 继承对测试覆盖率支持的坑，目前没有好的解决方案，可以先忽略。



### headers 模块测试

`test/helpers/headers.spec.ts`：

```typescript
import { parseHeaders, processHeaders, flattenHeaders } from '../../src/helpers/headers'

describe('helpers:header', () => {
  describe('parseHeaders', () => {
    test('should parse headers', () => {
      const parsed = parseHeaders(
        'Content-Type: application/json\r\n' +
          'Connection: keep-alive\r\n' +
          'Transfer-Encoding: chunked\r\n' +
          'Date: Tue, 21 May 2019 09:23:44 GMT\r\n' +
          ':aa\r\n' +
          'key:'
      )

      expect(parsed['content-type']).toBe('application/json')
      expect(parsed['connection']).toBe('keep-alive')
      expect(parsed['transfer-encoding']).toBe('chunked')
      expect(parsed['date']).toBe('Tue, 21 May 2019 09:23:44 GMT')
      expect(parsed['key']).toBe('')
    })

    test('should return empty object if headers is empty string', () => {
      expect(parseHeaders('')).toEqual({})
    })
  })

  describe('processHeaders', () => {
    test('should normalize Content-Type header name', () => {
      const headers: any = {
        'conTenT-Type': 'foo/bar',
        'Content-length': 1024
      }
      processHeaders(headers, {})
      expect(headers['Content-Type']).toBe('foo/bar')
      expect(headers['conTenT-Type']).toBeUndefined()
      expect(headers['Content-length']).toBe(1024)
    })

    test('should set Content-Type if not set and data is PlainObject', () => {
      const headers: any = {}
      processHeaders(headers, { a: 1 })
      expect(headers['Content-Type']).toBe('application/json;charset=utf-8')
    })

    test('should set not Content-Type if not set and data is not PlainObject', () => {
      const headers: any = {}
      processHeaders(headers, new URLSearchParams('a=b'))
      expect(headers['Content-Type']).toBeUndefined()
    })

    test('should do nothing if headers is undefined or null', () => {
      expect(processHeaders(undefined, {})).toBeUndefined()
      expect(processHeaders(null, {})).toBeNull()
    })
  })

  describe('flattenHeaders', () => {
    test('should flatten the headers and include common headers', () => {
      const headers = {
        Accept: 'application/json',
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        post: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }

      expect(flattenHeaders(headers, 'get')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'commonHeaderValue',
        'X-GET-HEADER': 'getHeaderValue'
      })
    })

    test('should flatten the headers without common headers', () => {
      const headers = {
        Accept: 'application/json',
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        }
      }

      expect(flattenHeaders(headers, 'patch')).toEqual({
        Accept: 'application/json'
      })
    })

    test('should do nothing if headers is undefined or null', () => {
      expect(flattenHeaders(undefined, 'get')).toBeUndefined()
      expect(flattenHeaders(null, 'post')).toBeNull()
    })
  })
})
```

运行后，我们会发现 `parseHeaders` 测试组的 `should parse headers` 测试没通过，`expect(parsed['date']).toBe('Tue, 21 May 2019 09:23:44 GMT')` 我们期望解析后的 `date` 字段是 `Tue, 21 May 2019 09:23:44 GMT`，而实际的值是 `Tue, 21 May 2019 09`。

测试没通过，我们检查一下代码，发现我们 `parseHeaders` 的代码逻辑漏洞，我们只考虑了第一个 ":" 号，没考虑后半部分的字符串内部也可能有 ":"，按我们现有的逻辑就会把字符串中 ":" 后面部分都截断了。

因此我们修改 `parseHeaders` 的实现逻辑。

```typescript
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, ...vals] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    let val = vals.join(':').trim()
    parsed[key] = val
  })

  return parsed
}
```

这样我们再重新跑测试，就会通过了。



### url 模块测试

`test/helpers/url.spec.ts`：

```typescript
import { buildURL, isAbsoluteURL, combineURL, isURLSameOrigin } from '../../src/helpers/url'

describe('helpers:url', () => {
  describe('buildURL', () => {
    test('should support null params', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })

    test('should support params', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar'
        })
      ).toBe('/foo?foo=bar')
    })

    test('should ignore if some param value is null', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar',
          baz: null
        })
      ).toBe('/foo?foo=bar')
    })

    test('should ignore if the only param value is null', () => {
      expect(
        buildURL('/foo', {
          baz: null
        })
      ).toBe('/foo')
    })

    test('should support object params', () => {
      expect(
        buildURL('/foo', {
          foo: {
            bar: 'baz'
          }
        })
      ).toBe('/foo?foo=' + encodeURI('{"bar":"baz"}'))
    })

    test('should support date params', () => {
      const date = new Date()

      expect(
        buildURL('/foo', {
          date: date
        })
      ).toBe('/foo?date=' + date.toISOString())
    })

    test('should support array params', () => {
      expect(
        buildURL('/foo', {
          foo: ['bar', 'baz']
        })
      ).toBe('/foo?foo[]=bar&foo[]=baz')
    })

    test('should support special char params', () => {
      expect(
        buildURL('/foo', {
          foo: '@:$, '
        })
      ).toBe('/foo?foo=@:$,+')
    })

    test('should support existing params', () => {
      expect(
        buildURL('/foo?foo=bar', {
          bar: 'baz'
        })
      ).toBe('/foo?foo=bar&bar=baz')
    })

    test('should correct discard url hash mark', () => {
      expect(
        buildURL('/foo?foo=bar#hash', {
          query: 'baz'
        })
      ).toBe('/foo?foo=bar&query=baz')
    })

    test('should use serializer if provided', () => {
      const serializer = jest.fn(() => {
        return 'foo=bar'
      })
      const params = { foo: 'bar' }
      expect(buildURL('/foo', params, serializer)).toBe('/foo?foo=bar')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })

    test('should support URLSearchParams', () => {
      expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toBe('/foo?bar=baz')
    })
  })

  describe('isAbsoluteURL', () => {
    test('should return true if URL begins with valid scheme name', () => {
      expect(isAbsoluteURL('https://api.github.com/users')).toBeTruthy()
      expect(isAbsoluteURL('custom-scheme-v1.0://example.com/')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://example.com/')).toBeTruthy()
    })

    test('should return false if URL begins with invalid scheme name', () => {
      expect(isAbsoluteURL('123://example.com/')).toBeFalsy()
      expect(isAbsoluteURL('!valid://example.com/')).toBeFalsy()
    })

    test('should return true if URL is protocol-relative', () => {
      expect(isAbsoluteURL('//example.com/')).toBeTruthy()
    })

    test('should return false if URL is relative', () => {
      expect(isAbsoluteURL('/foo')).toBeFalsy()
      expect(isAbsoluteURL('foo')).toBeFalsy()
    })
  })

  describe('combineURL', () => {
    test('should combine URL', () => {
      expect(combineURL('https://api.github.com', '/users')).toBe('https://api.github.com/users')
    })

    test('should remove duplicate slashes', () => {
      expect(combineURL('https://api.github.com/', '/users')).toBe('https://api.github.com/users')
    })

    test('should insert missing slash', () => {
      expect(combineURL('https://api.github.com', 'users')).toBe('https://api.github.com/users')
    })

    test('should not insert slash when relative url missing/empty', () => {
      expect(combineURL('https://api.github.com/users', '')).toBe('https://api.github.com/users')
    })

    test('should allow a single slash for relative url', () => {
      expect(combineURL('https://api.github.com/users', '/')).toBe('https://api.github.com/users/')
    })
  })

  describe('isURLSameOrigin', () => {
    test('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })

    test('should detect different origin', () => {
      expect(isURLSameOrigin('https://github.com/axios/axios')).toBeFalsy()
    })
  })
})
```

这里要注意的是，我们使用了 [`jest.fn`](https://jestjs.io/docs/en/jest-object#jestfnimplementation) 去模拟了一个函数，这个也是在编写 Jest 测试中非常常用的一个 API。

至此，我们就实现了 `ts-axios` 库 `helpers` 目录下所有模块的测试，并把该目录下的测试覆盖率达到了近乎 100% 的覆盖率。下面的章节我们就开始测试 `ts-axios` 的核心流程，针对不同的 `feature` 去编写单元测试了。



## 请求模块单元测试

请求模块是 axios 最基础的模块，通过一个 axios 方法发送 Ajax 请求。

### jasmine-ajax

[Jasmine](https://jasmine.github.io/pages/getting_started.html) 是一个 BDD(行为驱动开发)的测试框架，它有很多成熟的插件，比如我们要用到的 [`jasmine-ajax`](https://github.com/jasmine/jasmine-ajax)，它会为我们发出的 Ajax 请求根据规范定义一组假的响应，并跟踪我们发出的Ajax请求，可以让我们方便的为结果做断言。

其实 Jest 也可以去写插件，但并没有现成的 Ajax 相关的 Jest 插件，但是 Jest 测试中我们仍然可以使用 Jasmine 相关的插件，只需要做一些小小的配置即可。

当然，未来我也会考虑去编写一个 Ajax 相关的 Jest 插件，目前我们仍然使用 `jasmine-ajax` 去配合我们编写测试。

`jasmine-ajax` 依赖 `jasmine-core`，因此首先我们要安装几个依赖包，`jasmine-ajax`、`jasmine-core` 和 `@types/jasmine-ajax`。

这个时候我们需要去修改 `test/boot.ts` 文件，因为每次跑具体测试代码之前会先运行该文件，我们可以在这里去初始化 `jasmine-ajax`。

```typescript
const JasmineCore = require('jasmine-core')
// @ts-ignore
global.getJasmineRequireObj = function() {
  return JasmineCore
}
require('jasmine-ajax')
```

这里为了让 `jasmine-ajax` 插件运行成功，我们需要手动添加全局的 `getJasmineRequireObj` 方法，参考 [issue](https://github.com/jasmine/jasmine-ajax/issues/178)。

接下来，我们就开始编写请求模块的单元测试。



### 测试代码编写

`test/requests.spec.ts`：

```typescript
import axios, { AxiosResponse, AxiosError } from '../src/index'
import { getAjaxRequest } from './helper'

describe('requests', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should treat single string arg as url', () => {
    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  test('should treat method value as lowercase string', done => {
    axios({
      url: '/foo',
      method: 'POST'
    }).then(response => {
      expect(response.config.method).toBe('post')
      done()
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })
    })
  })

  test('should reject on network errors', done => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })

    jasmine.Ajax.uninstall()

    axios('/foo')
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    function next(reason: AxiosResponse | AxiosError) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Network Error')
      expect(reason.request).toEqual(expect.any(XMLHttpRequest))

      jasmine.Ajax.install()

      done()
    }
  })

  test('should reject when request timeout', done => {
    let err: AxiosError

    axios('/foo', {
      timeout: 2000,
      method: 'post'
    }).catch(error => {
      err = error
    })

    getAjaxRequest().then(request => {
      // @ts-ignore
      request.eventBus.trigger('timeout')

      setTimeout(() => {
        expect(err instanceof Error).toBeTruthy()
        expect(err.message).toBe('Timeout of 2000 ms exceeded')
        done()
      }, 100)
    })
  })

  test('should reject when validateStatus returns false', done => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })

    axios('/foo', {
      validateStatus(status) {
        return status !== 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 500
      })
    })

    function next(reason: AxiosError | AxiosResponse) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Request failed with status code 500')
      expect((reason as AxiosError).response!.status).toBe(500)

      done()
    }
  })

  test('should resolve when validateStatus returns true', done => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })

    axios('/foo', {
      validateStatus(status) {
        return status === 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 500
      })
    })

    function next(res: AxiosResponse | AxiosError) {
      expect(resolveSpy).toHaveBeenCalled()
      expect(rejectSpy).not.toHaveBeenCalled()
      expect(res.config.url).toBe('/foo')

      done()
    }
  })

  test('should return JSON when resolved', done => {
    let response: AxiosResponse

    axios('/api/account/signup', {
      auth: {
        username: '',
        password: ''
      },
      method: 'post',
      headers: {
        Accept: 'application/json'
      }
    }).then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"a": 1}'
      })

      setTimeout(() => {
        expect(response.data).toEqual({ a: 1 })
        done()
      }, 100)
    })
  })

  test('should return JSON when rejecting', done => {
    let response: AxiosResponse

    axios('/api/account/signup', {
      auth: {
        username: '',
        password: ''
      },
      method: 'post',
      headers: {
        Accept: 'application/json'
      }
    }).catch(error => {
      response = error.response
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 400,
        statusText: 'Bad Request',
        responseText: '{"error": "BAD USERNAME", "code": 1}'
      })

      setTimeout(() => {
        expect(typeof response.data).toBe('object')
        expect(response.data.error).toBe('BAD USERNAME')
        expect(response.data.code).toBe(1)
        done()
      }, 100)
    })
  })

  test('should supply correct response', done => {
    let response: AxiosResponse

    axios.post('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"foo": "bar"}',
        responseHeaders: {
          'Content-Type': 'application/json'
        }
      })

      setTimeout(() => {
        expect(response.data.foo).toBe('bar')
        expect(response.status).toBe(200)
        expect(response.statusText).toBe('OK')
        expect(response.headers['content-type']).toBe('application/json')
        done()
      }, 100)
    })
  })

  test('should allow overriding Content-Type header case-insensitive', () => {
    let response: AxiosResponse

    axios
      .post(
        '/foo',
        { prop: 'value' },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      .then(res => {
        response = res
      })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Content-Type']).toBe('application/json')
    })
  })
})
```

我们要注意的一些点，在这里列出：

- beforeEach & afterEach

[beforeEach](https://jestjs.io/docs/en/api#beforeeachfn-timeout)表示每个测试用例运行前的钩子函数，在这里我们执行 `jasmine.Ajax.install()` 安装 `jasmine.Ajax`。

[afterEach](https://jestjs.io/docs/en/api#aftereachfn-timeout)表示每个测试用例运行后的钩子函数，在这里我们执行 `jasmine.Ajax.uninstall()` 卸载 `jasmine.Ajax`。

- `getAjaxRequest`

`getAjaxRequest` 是我们在 `test/helper.ts` 定义的一个辅助方法，通过 `jasmine.Ajax.requests.mostRecent()` 拿到最近一次请求的 `request` 对象，这个 `request` 对象是 `jasmine-ajax` 库伪造的 `xhr` 对象，它模拟了 `xhr` 对象上的方法，并且提供一些 `api` 让我们使用，比如 `request.respondWith` 方法返回一个响应。

- 异步测试

注意到我们这里大部分的测试用例不再是同步的代码了，几乎都是一些异步逻辑，Jest 非常好地支持[异步测试代码](https://jestjs.io/docs/en/asynchronous)。通常有 2 种解决方案。

第一种是利用 `done` 参数，每个测试用例函数有一个 `done` 参数，一旦我们使用了该参数，只有当 `done` 函数执行的时候表示这个测试用例结束。

第二种是我们的测试函数返回一个 Promise 对象，一旦这个 Promise 对象 `resolve` 了，表示这个测试结束。

- expect.any(constructor)

它表示匹配任意由 `constructor` 创建的对象实例。

- `request.eventBus.trigger`

由于 `request.responseTimeout` 方法内部依赖了 `jasmine.clock` 方法会导致运行失败，这里我直接用了 `request.eventBus.trigger('timeout')` 方法触发了 `timeout` 事件。因为这个方法不在接口定义中，所以需要加 `// @ts-ignore`。


另外，我们在测试中发现 2 个 case 没有通过。

第一个是 `should treat method value as lowercase string`，这个测试用例是我们发送请求的 ` method` 需要转换成小写字符串，这么做的目的也是为了之后 `flattenHeaders` 能正常处理这些 `method`，所以我们需要修改源码逻辑。

`core/Axios.ts`：

```typescript
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)
    config.method = config.method.toLowerCase()
    
    // ...
  }
```

在合并配置后，我们需要把 `config.method` 转成小写字符串。

另一个是 `should return JSON when rejecting`，这个测试用例是当我们发送请求失败后，也能把响应数据转换成 JSON 格式，所以也需要修改源码逻辑。

`core/dispatchRequest.ts`：

```typescript
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(
    res => {
      return transformResponseData(res)
    },
    e => {
      if (e && e.response) {
        e.response = transformResponseData(e.response)
      }
      return Promise.reject(e)
    }
  )
}
```

除了对正常情况的响应数据做转换，我们也需要对异常情况的响应数据做转换。

至此我们完成了 `ts-axios` 库对请求模块的测试，下一节课我们会从业务的角度来测试 `headers` 模块。



## headers 模块单元测试

之前我们测试了 `headers` 的基础方法模块，接下来我们会从业务角度测试 `headers` 的相关业务逻辑。

### 测试代码编写

`test/headers.spec.ts`：

```typescript
import axios from '../src/index'
import { getAjaxRequest } from './helper'

function testHeaderValue(headers: any, key: string, val?: string): void {
  let found = false

  for (let k in headers) {
    if (k.toLowerCase() === key.toLowerCase()) {
      found = true
      expect(headers[k]).toBe(val)
      break
    }
  }

  if (!found) {
    if (typeof val === 'undefined') {
      expect(headers.hasOwnProperty(key)).toBeFalsy()
    } else {
      throw new Error(key + ' was not found in headers')
    }
  }
}

describe('headers', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should use default common headers', () => {
    const headers = axios.defaults.headers.common

    axios('/foo')

    return getAjaxRequest().then(request => {
      for (let key in headers) {
        if (headers.hasOwnProperty(key)) {
          expect(request.requestHeaders[key]).toEqual(headers[key])
        }
      }
    })
  })

  test('should add extra headers for post', () => {
    axios.post('/foo', 'fizz=buzz')

    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })

  test('should use application/json when posting an object', () => {
    axios.post('/foo/bar', {
      firstName: 'foo',
      lastName: 'bar'
    })

    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', 'application/json;charset=utf-8')
    })
  })

  test('should remove content-type if data is empty', () => {
    axios.post('/foo')

    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', undefined)
    })
  })

  it('should preserve content-type if data is false', () => {
    axios.post('/foo', false)

    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })

  test('should remove content-type if data is FormData', () => {
    const data = new FormData()
    data.append('foo', 'bar')

    axios.post('/foo', data)

    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', undefined)
    })
  })
})
```

内部定义了 `testHeaderValue` 辅助函数，用于测试 `headers` 是否存在某个 `header name` 下的某个值。

至此我们完成了 `ts-axios` 库 `headers` 模块相关业务逻辑的测试，下一节课我们会对 `Axios` 的实例做测试。



## Axios 实例模块单元测试

`ts-axios` 提供了 `axios.create` 静态方法，返回一个 `instance` 实例，我们需要对这个模块做测试。

### 测试代码编写

`test/instance.spec.ts`：

```typescript
import axios, { AxiosRequestConfig, AxiosResponse } from '../src/index'
import { getAjaxRequest } from './helper'

describe('instance', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should make a http request without verb helper', () => {
    const instance = axios.create()

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })

  test('should make a http request', () => {
    const instance = axios.create()

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  test('should make a post request', () => {
    const instance = axios.create()

    instance.post('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('POST')
    })
  })

  test('should make a put request', () => {
    const instance = axios.create()

    instance.put('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PUT')
    })
  })

  test('should make a patch request', () => {
    const instance = axios.create()

    instance.patch('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PATCH')
    })
  })

  test('should make a options request', () => {
    const instance = axios.create()

    instance.options('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('OPTIONS')
    })
  })

  test('should make a delete request', () => {
    const instance = axios.create()

    instance.delete('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('DELETE')
    })
  })

  test('should make a head request', () => {
    const instance = axios.create()

    instance.head('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('HEAD')
    })
  })

  test('should use instance options', () => {
    const instance = axios.create({ timeout: 1000 })

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.timeout).toBe(1000)
    })
  })

  test('should have defaults.headers', () => {
    const instance = axios.create({ baseURL: 'https://api.example.com' })

    expect(typeof instance.defaults.headers).toBe('object')
    expect(typeof instance.defaults.headers.common).toBe('object')
  })

  test('should have interceptors on the instance', done => {
    axios.interceptors.request.use(config => {
      config.timeout = 2000
      return config
    })

    const instance = axios.create()

    instance.interceptors.request.use(config => {
      config.withCredentials = true
      return config
    })

    let response: AxiosResponse
    instance.get('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })

      setTimeout(() => {
        expect(response.config.timeout).toEqual(0)
        expect(response.config.withCredentials).toEqual(true)
        done()
      }, 100)
    })
  })

  test('should get the computed uri', () => {
    const fakeConfig: AxiosRequestConfig = {
      baseURL: 'https://www.baidu.com/',
      url: '/user/12345',
      params: {
        idClient: 1,
        idTest: 2,
        testString: 'thisIsATest'
      }
    }
    expect(axios.getUri(fakeConfig)).toBe(
      'https://www.baidu.com/user/12345?idClient=1&idTest=2&testString=thisIsATest'
    )
  })
})
```

至此我们完成了 `ts-axios` 库 `Axios` 实例模块相关业务逻辑的测试，下一节课我们会对拦截器模块做测试。



## 拦截器模块单元测试

拦截器是 `ts-axios` 库一个非常实用的功能，接下来我们来编写它的测试代码。

### 测试代码编写

`test/interceptor.spec.ts`：

```typescript
import axios, { AxiosRequestConfig, AxiosResponse } from '../src/index'
import { getAjaxRequest } from './helper'

describe('interceptors', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should add a request interceptor', () => {
    const instance = axios.create()

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers.test = 'added by interceptor'
      return config
    })

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders.test).toBe('added by interceptor')
    })
  })

  test('should add a request interceptor that returns a new config object', () => {
    const instance = axios.create()

    instance.interceptors.request.use(() => {
      return {
        url: '/bar',
        method: 'post'
      }
    })

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('POST')
      expect(request.url).toBe('/bar')
    })
  })

  test('should add a request interceptor that returns a promise', done => {
    const instance = axios.create()

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return new Promise(resolve => {
        setTimeout(() => {
          config.headers.async = 'promise'
          resolve(config)
        }, 10)
      })
    })

    instance('/foo')

    setTimeout(() => {
      getAjaxRequest().then(request => {
        expect(request.requestHeaders.async).toBe('promise')
        done()
      })
    }, 100)
  })

  test('should add multiple request interceptors', () => {
    const instance = axios.create()

    instance.interceptors.request.use(config => {
      config.headers.test1 = '1'
      return config
    })
    instance.interceptors.request.use(config => {
      config.headers.test2 = '2'
      return config
    })
    instance.interceptors.request.use(config => {
      config.headers.test3 = '3'
      return config
    })

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders.test1).toBe('1')
      expect(request.requestHeaders.test2).toBe('2')
      expect(request.requestHeaders.test3).toBe('3')
    })
  })

  test('should add a response interceptor', done => {
    let response: AxiosResponse
    const instance = axios.create()

    instance.interceptors.response.use(data => {
      data.data = data.data + ' - modified by interceptor'
      return data
    })

    instance('/foo').then(data => {
      response = data
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() => {
        expect(response.data).toBe('OK - modified by interceptor')
        done()
      }, 100)
    })
  })

  test('should add a response interceptor that returns a new data object', done => {
    let response: AxiosResponse
    const instance = axios.create()

    instance.interceptors.response.use(() => {
      return {
        data: 'stuff',
        headers: null,
        status: 500,
        statusText: 'ERR',
        request: null,
        config: {}
      }
    })

    instance('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() => {
        expect(response.data).toBe('stuff')
        expect(response.headers).toBeNull()
        expect(response.status).toBe(500)
        expect(response.statusText).toBe('ERR')
        expect(response.request).toBeNull()
        expect(response.config).toEqual({})
        done()
      }, 100)
    })
  })

  test('should add a response interceptor that returns a promise', done => {
    let response: AxiosResponse
    const instance = axios.create()

    instance.interceptors.response.use(data => {
      return new Promise(resolve => {
        // do something async
        setTimeout(() => {
          data.data = 'you have been promised!'
          resolve(data)
        }, 10)
      })
    })

    instance('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() => {
        expect(response.data).toBe('you have been promised!')
        done()
      }, 100)
    })
  })

  test('should add multiple response interceptors', done => {
    let response: AxiosResponse
    const instance = axios.create()

    instance.interceptors.response.use(data => {
      data.data = data.data + '1'
      return data
    })
    instance.interceptors.response.use(data => {
      data.data = data.data + '2'
      return data
    })
    instance.interceptors.response.use(data => {
      data.data = data.data + '3'
      return data
    })

    instance('/foo').then(data => {
      response = data
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() => {
        expect(response.data).toBe('OK123')
        done()
      }, 100)
    })
  })

  test('should allow removing interceptors', done => {
    let response: AxiosResponse
    let intercept
    const instance = axios.create()

    instance.interceptors.response.use(data => {
      data.data = data.data + '1'
      return data
    })
    intercept = instance.interceptors.response.use(data => {
      data.data = data.data + '2'
      return data
    })
    instance.interceptors.response.use(data => {
      data.data = data.data + '3'
      return data
    })

    instance.interceptors.response.eject(intercept)
    instance.interceptors.response.eject(5)

    instance('/foo').then(data => {
      response = data
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() => {
        expect(response.data).toBe('OK13')
        done()
      }, 100)
    })
  })
})
```

运行测试后我们发现在测试用例 `should add a request interceptor that returns a new config object` 报错了，是代码运行的报错，而不是测试期望结果的报错，顺着报错信息，我们可以找到报错原因。

在 `core/xhr.ts` 中，执行到 `processHeaders` 中的 `Object.keys(headers).forEach` 代码报错，因为我们在拦截器对请求配置做了修改，导致 `headers` 为空，所以报错。

于是我们在解构赋值 `headers` 的时候，给它添加默认值即可。

```typescript
const {
  // ...
  headers = {}
} = config
```

再次运行测试，发现全部测试通过。

至此，我们完成了 `ts-axios` 库对拦截器模块的单元测试，下节课我们来测试 `mergeConfig` 模块的业务逻辑。



## mergeConfig 模块单元测试

合并配置是 `ts-axios` 核心流程中非常重要的一个环节，我们需要为它的各种情况去编写测试。

### 测试代码编写

`test/mergeConfig.spec.ts`：

```typescript
import axios from '../src/index'
import mergeConfig from '../src/core/mergeConfig'

describe('mergeConfig', () => {
  const defaults = axios.defaults

  test('should accept undefined for second argument', () => {
    expect(mergeConfig(defaults, undefined)).toEqual(defaults)
  })

  test('should accept an object for second argument', () => {
    expect(mergeConfig(defaults, {})).toEqual(defaults)
  })

  test('should not leave references', () => {
    const merged = mergeConfig(defaults, {})
    expect(merged).not.toBe(defaults)
    expect(merged.headers).not.toBe(defaults.headers)
  })

  test('should allow setting request options', () => {
    const config = {
      url: '__sample url__',
      params: '__sample params__',
      data: { foo: true }
    }
    const merged = mergeConfig(defaults, config)
    expect(merged.url).toBe(config.url)
    expect(merged.params).toBe(config.params)
    expect(merged.data).toEqual(config.data)
  })

  test('should not inherit request options', () => {
    const localDefaults = {
      url: '__sample url__',
      params: '__sample params__',
      data: { foo: true }
    }
    const merged = mergeConfig(localDefaults, {})
    expect(merged.url).toBeUndefined()
    expect(merged.params).toBeUndefined()
    expect(merged.data).toBeUndefined()
  })

  test('should return default headers if pass config2 with undefined', () => {
    expect(
      mergeConfig(
        {
          headers: 'x-mock-header'
        },
        undefined
      )
    ).toEqual({
      headers: 'x-mock-header'
    })
  })

  test('should merge auth, headers with defaults', () => {
    expect(
      mergeConfig(
        {
          auth: undefined
        },
        {
          auth: {
            username: 'foo',
            password: 'test'
          }
        }
      )
    ).toEqual({
      auth: {
        username: 'foo',
        password: 'test'
      }
    })
    expect(
      mergeConfig(
        {
          auth: {
            username: 'foo',
            password: 'test'
          }
        },
        {
          auth: {
            username: 'baz',
            password: 'foobar'
          }
        }
      )
    ).toEqual({
      auth: {
        username: 'baz',
        password: 'foobar'
      }
    })
  })

  test('should overwrite auth, headers with a non-object value', () => {
    expect(
      mergeConfig(
        {
          headers: {
            common: {
              Accept: 'application/json, text/plain, */*'
            }
          }
        },
        {
          headers: null
        }
      )
    ).toEqual({
      headers: null
    })
  })

  test('should allow setting other options', () => {
    const merged = mergeConfig(defaults, {
      timeout: 123
    })
    expect(merged.timeout).toBe(123)
  })
})
```

运行测试后我们发现 `mergeConfig.ts` 文件的分支覆盖率并未达到 100%，提示是 23 行，打开文件后发现最后一个 `else` 逻辑并未走到，也就是 `val1` 为 `undefined` 的情况。但实际上即使 `val1` 为 `undefined`，我们也是返回 `undefined`，也就是返回 `val1`，所以这块代码的逻辑可以优化。

```typescript
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else {
    return val1
  }
}
```

2 个分支可以合并到一个分支，这样我们再次跑测试，分支覆盖率就可以达到 100% 了。

至此我们完成了 `ts-axios` 库对 `mergeConfig` 模块的测试，下一节课我们来测试取消模块相关代码。



## 请求取消模块单元测试

请求取消模块是 `ts-axios` 库核心流程其中一个分支，也是非常重要的模块，我们将从基础库和业务流程模块 2 个方面去编写单元测试。

### Cancel 类单元测试

`cancel/Cancel.spec.ts`：

```typescript
import Cancel, { isCancel } from '../../src/cancel/Cancel'

describe('cancel:Cancel', () => {
  test('should returns correct result when message is specified', () => {
    const cancel = new Cancel('Operation has been canceled.')
    expect(cancel.message).toBe('Operation has been canceled.')
  })

  test('should returns true if value is a Cancel', () => {
    expect(isCancel(new Cancel())).toBeTruthy()
  })

  test('should returns false if value is not a Cancel', () => {
    expect(isCancel({ foo: 'bar' })).toBeFalsy()
  })
})
```



### CancelToken 类单元测试

`cancel/CancelToken.spec.ts`：

```typescript
import CancelToken from '../../src/cancel/CancelToken'
import Cancel from '../../src/cancel/Cancel'
import { Canceler } from '../../src/types'

describe('CancelToken', () => {
  describe('reason', () => {
    test('should returns a Cancel if cancellation has been requested', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled.')
    })

    test('should has no side effect if call cancellation for multi times', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled.')
      cancel!('Operation has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled.')
    })

    test('should returns undefined if cancellation has not been requested', () => {
      const token = new CancelToken(() => {
        // do nothing
      })
      expect(token.reason).toBeUndefined()
    })
  })

  describe('promise', () => {
    test('should returns a Promise that resolves when cancellation is requested', done => {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      token.promise.then(value => {
        expect(value).toEqual(expect.any(Cancel))
        expect(value.message).toBe('Operation has been canceled.')
        done()
      })
      cancel!('Operation has been canceled.')
    })
  })

  describe('throwIfRequested', () => {
    test('should throws if cancellation has been requested', () => {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled.')
      try {
        token.throwIfRequested()
        fail('Expected throwIfRequested to throw.')
      } catch (thrown) {
        if (!(thrown instanceof Cancel)) {
          fail('Expected throwIfRequested to throw a Cancel, but test threw ' + thrown + '.')
        }
        expect(thrown.message).toBe('Operation has been canceled.')
      }
    })

    test('should does not throw if cancellation has not been requested', () => {
      const token = new CancelToken(() => {
        // do nothing
      })
      token.throwIfRequested()
    })
  })

  describe('source', () => {
    test('should returns an object containing token and cancel function', () => {
      const source = CancelToken.source()
      expect(source.token).toEqual(expect.any(CancelToken))
      expect(source.cancel).toEqual(expect.any(Function))
      expect(source.token.reason).toBeUndefined()
      source.cancel('Operation has been canceled.')
      expect(source.token.reason).toEqual(expect.any(Cancel))
      expect(source.token.reason!.message).toBe('Operation has been canceled.')
    })
  })
})
```

注意，这里我们使用了 `fail` 函数表示一个测试的失败，这个并未在 Jest 文档中体现，但它是一个可以用的 API。



### Cancel 业务逻辑单元测试

`cancel.spec.ts`：

```typescript
import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('cancel', () => {
  const CancelToken = axios.CancelToken
  const Cancel = axios.Cancel

  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  describe('when called before sending request', () => {
    test('should rejects Promise with a Cancel object', () => {
      const source = CancelToken.source()
      source.cancel('Operation has been canceled.')

      return axios
        .get('/foo', {
          cancelToken: source.token
        })
        .catch(reason => {
          expect(reason).toEqual(expect.any(Cancel))
          expect(reason.message).toBe('Operation has been canceled.')
        })
    })
  })

  describe('when called after request has been sent', () => {
    test('should rejects Promise with a Cancel object', done => {
      const source = CancelToken.source()
      axios
        .get('/foo/bar', {
          cancelToken: source.token
        })
        .catch(reason => {
          expect(reason).toEqual(expect.any(Cancel))
          expect(reason.message).toBe('Operation has been canceled.')
          done()
        })

      getAjaxRequest().then(request => {
        source.cancel('Operation has been canceled.')
        setTimeout(() => {
          request.respondWith({
            status: 200,
            responseText: 'OK'
          })
        }, 100)
      })
    })

    test('calls abort on request object', done => {
      const source = CancelToken.source()
      let request: any
      axios
        .get('/foo/bar', {
          cancelToken: source.token
        })
        .catch(() => {
          expect(request.statusText).toBe('abort')
          done()
        })

      getAjaxRequest().then(req => {
        source.cancel()
        request = req
      })
    })
  })

  describe('when called after response has been received', () => {
    test('should not cause unhandled rejection', done => {
      const source = CancelToken.source()
      axios
        .get('/foo', {
          cancelToken: source.token
        })
        .then(() => {
          window.addEventListener('unhandledrejection', () => {
            done.fail('Unhandled rejection.')
          })
          source.cancel()
          setTimeout(done, 100)
        })

      getAjaxRequest().then(request => {
        request.respondWith({
          status: 200,
          responseText: 'OK'
        })
      })
    })
  })
})
```

注意这里我们使用了 `done.fail` 表示了一个异常的结束，这个并未在 Jest 文档中体现，但它是一个可以用的 API。

至此，我们完成了取消模块相关业务逻辑的单元测试，我们测试覆盖率达到了阈值，测试已经通过了。但是扔未达到我们的目标，还有很多 feature 是没有覆盖到的。接下来我们就完成剩余 feature 的编写单元测试。



## 剩余模块单元测试

### defaults 模块单元测试

`defaults` 模块为请求配置提供了一些默认的属性和方法，我们需要为其编写单元测试。

`test/defaults.spec.ts`：

```typescript
import axios, { AxiosTransformer } from '../src/index'
import { getAjaxRequest } from './helper'
import { deepMerge } from '../src/helpers/util'

describe('defaults', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should transform request json', () => {
    expect((axios.defaults.transformRequest as AxiosTransformer[])[0]({ foo: 'bar' })).toBe('{"foo":"bar"}')
  })

  test('should do nothing to request string', () => {
    expect((axios.defaults.transformRequest as AxiosTransformer[])[0]('foo=bar')).toBe('foo=bar')
  })

  test('should transform response json', () => {
    const data = (axios.defaults.transformResponse as AxiosTransformer[])[0]('{"foo":"bar"}')

    expect(typeof data).toBe('object')
    expect(data.foo).toBe('bar')
  })

  test('should do nothing to response string', () => {
    expect((axios.defaults.transformResponse as AxiosTransformer[])[0]('foo=bar')).toBe('foo=bar')
  })

  test('should use global defaults config', () => {
    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })

  test('should use modified defaults config', () => {
    axios.defaults.baseURL = 'http://example.com/'

    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('http://example.com/foo')
      delete axios.defaults.baseURL
    })
  })

  test('should use request config', () => {
    axios('/foo', {
      baseURL: 'http://www.example.com'
    })

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('http://www.example.com/foo')
    })
  })

  test('should use default config for custom instance', () => {
    const instance = axios.create({
      xsrfCookieName: 'CUSTOM-XSRF-TOKEN',
      xsrfHeaderName: 'X-CUSTOM-XSRF-TOKEN'
    })
    document.cookie = instance.defaults.xsrfCookieName + '=foobarbaz'

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[instance.defaults.xsrfHeaderName!]).toBe('foobarbaz')
      document.cookie =
        instance.defaults.xsrfCookieName +
        '=;expires=' +
        new Date(Date.now() - 86400000).toUTCString()
    })
  })

  test('should use GET headers', () => {
    axios.defaults.headers.get['X-CUSTOM-HEADER'] = 'foo'
    axios.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-CUSTOM-HEADER']).toBe('foo')
      delete axios.defaults.headers.get['X-CUSTOM-HEADER']
    })
  })

  test('should use POST headers', () => {
    axios.defaults.headers.post['X-CUSTOM-HEADER'] = 'foo'
    axios.post('/foo', {})

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-CUSTOM-HEADER']).toBe('foo')
      delete axios.defaults.headers.post['X-CUSTOM-HEADER']
    })
  })

  test('should use header config', () => {
    const instance = axios.create({
      headers: {
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        post: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }
    })

    instance.get('/foo', {
      headers: {
        'X-FOO-HEADER': 'fooHeaderValue',
        'X-BAR-HEADER': 'barHeaderValue'
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders).toEqual(
        deepMerge(axios.defaults.headers.common, axios.defaults.headers.get, {
          'X-COMMON-HEADER': 'commonHeaderValue',
          'X-GET-HEADER': 'getHeaderValue',
          'X-FOO-HEADER': 'fooHeaderValue',
          'X-BAR-HEADER': 'barHeaderValue'
        })
      )
    })
  })

  test('should be used by custom instance if set before instance created', () => {
    axios.defaults.baseURL = 'http://example.org/'
    const instance = axios.create()

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('http://example.org/foo')
      delete axios.defaults.baseURL
    })
  })

  test('should not be used by custom instance if set after instance created', () => {
    const instance = axios.create()
    axios.defaults.baseURL = 'http://example.org/'

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })
})
```



### transform 模块单元测试

`transform` 模块用来定义请求和响应的转换方法，我们需要为其编写单元测试。

```typescript
import axios, { AxiosResponse, AxiosTransformer } from '../src/index'
import { getAjaxRequest } from './helper'

describe('transform', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should transform JSON to string', () => {
    const data = {
      foo: 'bar'
    }

    axios.post('/foo', data)

    return getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"bar"}')
    })
  })

  test('should transform string to JSON', done => {
    let response: AxiosResponse

    axios('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo": "bar"}'
      })

      setTimeout(() => {
        expect(typeof response.data).toBe('object')
        expect(response.data.foo).toBe('bar')
        done()
      }, 100)
    })
  })

  test('should override default transform', () => {
    const data = {
      foo: 'bar'
    }

    axios.post('/foo', data, {
      transformRequest(data) {
        return data
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.params).toEqual({ foo: 'bar' })
    })
  })

  test('should allow an Array of transformers', () => {
    const data = {
      foo: 'bar'
    }

    axios.post('/foo', data, {
      transformRequest: (axios.defaults.transformRequest as AxiosTransformer[]).concat(function(
        data
      ) {
        return data.replace('bar', 'baz')
      })
    })

    return getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"baz"}')
    })
  })

  test('should allowing mutating headers', () => {
    const token = Math.floor(Math.random() * Math.pow(2, 64)).toString(36)

    axios('/foo', {
      transformRequest: (data, headers) => {
        headers['X-Authorization'] = token
        return data
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-Authorization']).toEqual(token)
    })
  })
})
```



### xsrf 模块单元测试

`xsrf` 模块提供了一套防御 `xsrf` 攻击的解决方案，我们需要为其编写单元测试。

`test/xsrf.spec.ts`：

```typescript
import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('xsrf', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
    document.cookie =
      axios.defaults.xsrfCookieName + '=;expires=' + new Date(Date.now() - 86400000).toUTCString()
  })

  test('should not set xsrf header if cookie is null', () => {
    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header if cookie is set', () => {
    document.cookie = axios.defaults.xsrfCookieName + '=12345'

    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })

  test('should not set xsrf header for cross origin', () => {
    document.cookie = axios.defaults.xsrfCookieName + '=12345'

    axios('http://example.com/')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header for cross origin when using withCredentials', () => {
    document.cookie = axios.defaults.xsrfCookieName + '=12345'

    axios('http://example.com/', {
      withCredentials: true
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })
})
```

注意在 `afterEach` 函数中我们清空了 `xsrf` 相关的 cookie。



### 上传下载模块单元测试

上传下载模块允许我们监听上传和下载的进度，我们需要为其编写单元测试。

`test/progress.spec.ts`：

```typescript
import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should add a download progress handler', () => {
    const progressSpy = jest.fn()

    axios('/foo', { onDownloadProgress: progressSpy })

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo": "bar"}'
      })
      expect(progressSpy).toHaveBeenCalled()
    })
  })

  test('should add a upload progress handler', () => {
    const progressSpy = jest.fn()

    axios('/foo', { onUploadProgress: progressSpy })

    return getAjaxRequest().then(request => {
      // Jasmine AJAX doesn't trigger upload events.Waiting for jest-ajax fix
      // expect(progressSpy).toHaveBeenCalled()
    })
  })
})
```

注意，由于 `jasmine-ajax` 插件不会派发 `upload` 事件，这个未来可以通过我们自己编写的 `jest-ajax` 插件来解决，目前不写断言的情况它会直接通过。



### HTTP 授权模块单元测试

HTTP 授权模块为我们在请求头中添加 `Authorization` 字段，我们需要为其编写单元测试。

`test/auth.spec.ts`：

```typescript
import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('auth', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should accept HTTP Basic auth with username/password', () => {
    axios('/foo', {
      auth: {
        username: 'Aladdin',
        password: 'open sesame'
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Authorization']).toBe('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==')
    })
  })

  test('should fail to encode HTTP Basic auth credentials with non-Latin1 characters', () => {
    return axios('/foo', {
      auth: {
        username: 'Aladßç£☃din',
        password: 'open sesame'
      }
    })
      .then(() => {
        throw new Error(
          'Should not succeed to make a HTTP Basic auth request with non-latin1 chars in credentials.'
        )
      })
      .catch(error => {
        expect(/character/i.test(error.message)).toBeTruthy()
      })
  })
})
```



### 静态方法模块单元测试

静态方法模块为 `axios` 对象添加了 2 个静态方法，我们需要为其编写单元测试。

`test/static.spec.ts`：

```typescript
import axios from '../src/index'

describe('promise', () => {
  test('should support all', done => {
    let fulfilled = false

    axios.all([true, false]).then(arg => {
      fulfilled = arg[0]
    })

    setTimeout(() => {
      expect(fulfilled).toBeTruthy()
      done()
    }, 100)
  })

  test('should support spread', done => {
    let sum = 0
    let fulfilled = false
    let result: any

    axios
      .all([123, 456])
      .then(
        axios.spread((a, b) => {
          sum = a + b
          fulfilled = true
          return 'hello world'
        })
      )
      .then(res => {
        result = res
      })

    setTimeout(() => {
      expect(fulfilled).toBeTruthy()
      expect(sum).toBe(123 + 456)
      expect(result).toBe('hello world')
      done()
    }, 100)
  })
})
```



### 补充未覆盖的代码测试

我们发现，跑完测试后，仍有一些代码没有覆盖到测试，其中 `core/xhr.ts` 文件的第 43 行：

```typescript
if (responseType) {
  request.responseType = responseType
}
```

我们并未在测试中设置过 `responseType`，因此我们在 `test/requests.spect.ts` 文件中补充相关测试：

```typescript
test('should support array buffer response', done => {
  let response: AxiosResponse

  function str2ab(str: string) {
    const buff = new ArrayBuffer(str.length * 2)
    const view = new Uint16Array(buff)
    for (let i = 0; i < str.length; i++) {
      view[i] = str.charCodeAt(i)
    }
    return buff
  }

  axios('/foo', {
    responseType: 'arraybuffer'
  }).then(data => {
    response = data
  })

  getAjaxRequest().then(request => {
    request.respondWith({
      status: 200,
      // @ts-ignore
      response: str2ab('Hello world')
    })

    setTimeout(() => {
      expect(response.data.byteLength).toBe(22)
      done()
    }, 100)
  })
})
```

另外我们发现 `core/xhr.ts` 文件的第 13 行：

```typescript
method = 'get'
```

分支没有测试完全。因为实际上代码执行到这的时候 `method` 是一定会有的，所以我们不必为其指定默认值，另外还需要在 `method!.toUpperCase()` 的时候使用非空断言。

同时`core/xhr.ts` 文件的第 66 行：

```typescript
const responseData = responseType !== 'text' ? request.response : request.responseText
```

分支也没有测试完全。这里我们应该先判断存在 `responseType` 存在的情况下再去和 `text` 做对比，需要修改逻辑：

```typescript
const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
```

这样再次跑测试，就覆盖了所有的分支。

到此为止，除了我们之前说的 `helpers/error.ts` 模块中对于 `super` 的测试的分支覆盖率没达到 100%，其它模块均达到 100% 的测试覆盖率。

有些有强迫症的同学可能会觉得，能不能通过某种手段让它的覆盖率达到 100% 呢，这里其实有一个奇技淫巧，在 `helpers/error.ts` 文件的 `constructor` 函数上方加一个 `/* istanbul ignore next */` 注释，这样其实相当于忽略了整个构造函数的测试，这样我们就可以达到 100% 的覆盖率了。

`/* istanbul ignore next */` 在我们去阅读一些开源代码的时候经常会遇到，主要用途就是用来忽略测试用的，这个技巧不可滥用，除非你明确的知道这段代码不需要测试，否则你不应该使用它。滥用就失去了单元测试的意义了。

至此，我们就完成了整个 `ts-axios` 库的测试了，我们也成功地让测试覆盖率达到目标 99% 以上。下一章我会教大家如果打包构建和发布我们的 `ts-axios` 库。
