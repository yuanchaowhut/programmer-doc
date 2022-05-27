import print from '../js/print';
import '../css/index.less';

console.log('index.js文件被加载了~');

print();

function add(x, y) {
    return x + y;
}

console.log(add(1, 5));


if (module.hot) {
    //一旦有hot属性，就说明开启了HMR功能
    module.hot.accept('./print.js', function () {
        //方法会监听print.js的变化，一旦发生变化，其它模块不会重新打包构建。会执行后面的回调函数
    });
}
