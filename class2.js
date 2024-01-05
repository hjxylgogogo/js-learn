/*
es6之前创建对象的方式：
1.工厂模式
2.构造函数模式
--与工厂模式的区别：
----1.没有显示地创建对象
----2.属性和方法直接赋值给了this
----3.没有return
++按照惯例构造函数名称首字母要大写的
++使用构造函数实例化应该使用new操作符。以这种方式调用构造函数会执行如下操作：
----1.在内存中创建一个新对象
----2.这个新对象内部的[[Prototype]]指针被赋值为构造函数的prototype属性
----3.构造函数内部的this指向新对象
----4.执行构造函数内部的代码
----5.如果构造函数返回非空对象，则返回该对象；否则返回刚创建的新对象(this对象)

实例的constructor属性指向构造函数。
constructor属性本来是用来标识对象类型的，不过，一般认为instanceof操作符是确定对象类型更可靠的方式。

任何函数只要使用new操作符调用就是构造函数，而不使用new操作符调用的就是普通函数

构造函数的问题：其定义的方法会在每个实例上都创建一遍，效率低。如果要解决这个问题，可以把函数定义转移到构造函数外部，但这样this指向被搞乱了

3.原型模式
--每个函数都会创建一个prototype属性，这个属性是一个对象，这个对象拥有的属性和方法由该函数创建的所有实例共享

--理解原型
----1.只要创建函数，这个函数就有一个prototype属性指向一个对象，这个对象叫做原型对象，并且这个原型对象自动获得一个名为constructor属性，指向该函数。
----2.调用构造函数创建新的实例时，这个实例内部的prototype会指向构造函数的原型对象(构造函数的prototype值赋值给实例的prototype)，但是js不允许直接访问实例的prototype，只允许通过实例的__proto__属性访问！！

总结：每个个实例都有一个__proto__属性指向构造函数的prototype属性指向的对象也可以叫做实例（原型对象）

instanceof检查实例的原型链中是否包含指定构造函数的原型

isPrototypeOf()方法检查实例的__proto__是否指向调用此方法的对象

Object.getPrototypeOf()可以返回实例的__proto__值

Object.setPrototypeOf()方法可以设置实例的__proto__值。这样就可以重写一个对象的原型继承关系。
警告：Object.setPrototypeOf()可能严重影响代码性能和出现其他潜在的问题，为了避免，可以通过Object.create()来新创建一个新对象，同时为其指定原型。
*/

/*
delete可以删除实例属性
hasOwnProperty()方法用于确定某个属性是在实例上还是在原型对象上。
getOwnPropertyDescriptor()方法只对实例属性有效。要取得原型属性的描述符，就必须在原型对象上调用这个方法
*/

let a = {
    name1: 'a'
}
let b = {
    name2: 'b'
}
let c = {
    name3: 'c'
}
Object.defineProperty(c,"name3",{
    enumerable:false
})
Object.setPrototypeOf(c, b)
Object.setPrototypeOf(b, a)
console.log(c.name1);

/*
in操作符：
1.单独使用
--单独使用时，in操作符会在可以通过对象访问指定属性时返回true，无论该属性时在实例上还是在原型上
2.在for-in循环中使用,返回实例的所有属性和方法，不包括不可枚举的

Object.keys() 只返回属于实例的属性和方法
Object.getOwnPropertyNames()返回实例的所有属性和方法包括不可枚举的

*/
let d = {
    name1:1,
    name2:2,
    name3:3
}
Object.setPrototypeOf(d, c)
for(let i in d){
    console.log(i);
}

/*
由于以**符号**为键的属性没有名称的概念，因此Object.getOwnPropertySymbols()方法出现了，返回所有符号为键的属性和方法
*/

/*对象迭代
es2017增加了两个静态方法
Object.values()返回对象值得数组
Object.entries()返回对象键/值对数组
符号属性会被忽略
*/

function P(){}
P.prototype = {}
let f = new P()
console.log(f);