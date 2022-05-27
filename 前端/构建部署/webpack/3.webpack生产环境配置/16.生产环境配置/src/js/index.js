// import '@babel/polyfill';
import '../style/a.css';
import '../style/b.css';
import '../style/index.less';

const add = (x, y) => x + y;
console.log(add(1, 2));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了');
    resolve();
  }, 1000);
}, () => {
  console.log('出错啦!');
});

console.log(promise);
