/*
类定义与函数定义不同的是：
1.函数声明可以提升，类定义不能
2.函数受函数作用域限制，而类受块作用域限制

类可以包含：构造函数方法，实例方法，获取函数，设置函数和静态方法

*/

/*类表达式的名称是可选的，在把类表达式赋值给变量后，可以通过name属性取得类表达式的名称字符串。但不能在类表达式作用域外部访问这个标识符*/
let P1 = class P2 {
    identify() {
        console.log(P1.name, P2.name);
    }
}
let p = new P1()
p.identify()
// console.log(P2);//error

/*
constructor关键字用于在函数定义块内部创建类的构造函数。方法名constructor会告诉解释器在使用new操作符创建类的新实例时，应该调用这个函数

使用new操作符实例化类会执行如下操作：
1.在内存中创建一个新对象
2.这个新对象内部的[[Prototype]]指针被赋值为构造函数的prototype属性
3.构造函数内部的this指向新对象
4.执行构造函数内部的代码
5.如果构造函数返回非空对象，则返回该对象；否则返回刚创建的新对象(this对象)
*/

/*
使用对类构造函数的引用创建一个新实例
如下：
*/
class Person {}
let p3 = new Person()
let p2 = new p3.constructor()
console.log(p2);

/*
把类当成特殊函数：
声明一个类之后，通过typeof操作符检测类标识符，表明它是一个函数 410页
*/

function a(root){
    
    
}

let root = {
    value:'1',
    next:null
}

a(root.next)