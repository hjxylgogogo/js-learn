/*
Es6增加了引用类型Promise。引用类型也可以叫Object类型。
创建Promise实例必须传入一个执行器函数作为参数，通过执行器函数来控制promise实例状态。执行器函数会有两个函数参数（resolve，reject），调用函数参数来改变实例状态

Promise实例有三种状态：
1.pending
2.fulfilled（也称为：resolved）
3.rejected

promise构造函数是同步执行的，then方法是异步执行的!!! promise异步执行队列(微列队)优先级比timer(宏队列)高！！
例子如下：
  new Promise(resolve=>{
      console.log(1);
      resolve(3);
  }).then(num=>{
      console.log(num);
  });
  console.log(2);
  //依次为 123

  promise实例状态只能改变一次！！
*/




/*
promise.resolve() 实例化一个解决状态的promise实例
与new promise((reslove,reject)=>reslove())一致

promise.reject()同理,注意promise实例抛出的错误不能通过try/catch捕获，而只能通过拒绝处理程序捕获

两者不同之处：
promise.resolve()是一个幂等方法
promise.reject()不是一个幂等方法

如果给promise.reject()传入promise实例，这个实例会成为他返回拒绝的理由!!!
如下代码：
const p1 = Promise.reject(Promise.resolve(2))
const p1 = Promise.reject(Promise.resolve(2))
const p2 = Promise.reject(Promise.reject(2))
const p3 = Promise.resolve(Promise.resolve(2))
const p4 = Promise.resolve(Promise.reject(2))
console.log(p1);//Promise { <rejected> Promise { 2 } }
console.log(p2);//Promise { <rejected> Promise { <rejected> 2 } }
console.log(p3);//Promise { 2 }
console.log(p4);//Promise { <rejected> 2 }
*/
// const p1 = Promise.reject(Promise.resolve(2))
// const p2 = Promise.reject(Promise.reject(2))
// const p3 = Promise.resolve(Promise.resolve(2))
// const p4 = Promise.resolve(Promise.reject(2))
// console.log(p1);
// console.log(p2);
// console.log(p3);
// console.log(p4);


/*
promise实例方法：
promise.prototype.then()
promise.prototype.catch()
promise.prototype.finally()

*/

/*
多个promise实例合成一个promise实例：
promise.all()//全部解决
promise.race()//第一个落定
*/

/*
利用Array.prototype.reduce()实现把任意多个函数作为处理程序合成一个连续传值的promise连锁：
*/
//方法1：不使用Array.prototype.reduce()
function addTwo(x) {
    return x+2
}
function addThree(x) {
    return x+3
}
function addFive(x) {
    return x+5
}
function addTen(x){
    return Promise.resolve(x)
        .then(addTwo)
        .then(addThree)
        .then(addFive)
}

addTen(8).then(console.log)

//方法2：使用Array.prototype.reduce()
//封装了一个compose通用合成函数

function compose(...fns){
    return (x) =>fns.reduce((promise,fn) =>promise.then(fn),Promise.resolve(x))
}
const addTen2 = compose(addTwo,addThree,addFive)
addTen2(8).then(console.log)

/*
异步函数：async/await 是ES8规范新增的
让以同步方式写的代码能够异步执行
用async声明的函数称为异步函数
在异步函数中抛出错误会返回拒绝状态的promise实例
不过异步函数中拒绝期约的错误不会被异步函数捕获
异步函数的返回值会被Promise.resolve()包装成promise实例

await用于暂停异步函数中代码的执行：
相当于把await后面的代码封装到then函数第一个参数函数里面，把await等待的值作为函数参数传递！！

await一个promise实例与await一个其他值执行顺序微妙不同！！

异步函数策略如下：
1.实现sleep()
2.利用平行执行
3.串行执行期约
4.栈追踪与内存管理
*/

//1.实现sleep()
function sleep(delay){
    return new Promise((reslove) =>setTimeout(reslove,delay))   
}
async function foo(){
    const t0 = Date.now()
    console.log(t0);
    await sleep(1500)
    console.log(Date.now()-t0);
}
// foo()

//2.利用平行执行
//需求：顺序等待5个随机定时器
function randomDelay(id){
    const delay = Math.random()*1000;
    return new Promise((resolve) =>setTimeout(() => { 
        console.log(`${id} ${delay} finished`);
        resolve(id)
     },
     delay)
     )
}

async function foo1(){
    const t0 = Date.now()
    await randomDelay(0)
    await randomDelay(1)
    await randomDelay(2)
    await randomDelay(3)
    await randomDelay(4)
    console.log(Date.now()-t0);
}
//foo1变种变种情况1：用for循环实现
async function foo2(){
    const t0 = Date.now()
    for(let i=0;i<5;i++){
        await randomDelay(i)
    }
    console.log(Date.now()-t0);
}

//foo1变种情况2：如果顺序不是必须保证的情况
async function foo3(){
    const t0 = Date.now()
    const promises = Array(5).fill(null).map((_,i) =>randomDelay(i))
    for(const p of promises){
        console.log(`awaited ${await p}`)     
    }
    console.log(Date.now()-t0);
}
// foo3()

//3.串行执行期约 异步函数版本
async function addTen3(x){
    for(const fn of [addTwo,addThree,addFive]){
        x = await fn(x)
    }
    return x
}
addTen3(9).then(console.log)

//4.栈追踪与内存管理