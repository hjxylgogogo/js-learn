/*
利用原型链的特性实现类继承
B类继承A类：通过将B.prototype值等于A类的一个实例达到继承A类的目的。
B的实例不仅能继承A的实例属性和方法，还与A的原型搭上了关系从而继承了A的静态方法和静态属性。

这样唯一的缺点是B.prototype没有constructor属性，B.prototype.constructor只能去原型链上找到A的constructor属性。
*/

function A() {
    this.a = 'a';
}
A.prototype.get_a = function () {
    return this.a
}

function B() {
    this.b = 'b'
}

B.prototype = new A()
let b = new B()
console.log(b.get_a());
console.log(b.a)

/*
此处纠正**红宝书**395页 关于instanceof符号的 描述：
书上这样描述：如果一个实例的原型链中出现过相应的构造函数，则instanceof返回true。
纠正：如果一个实例的原型链中出现过相应的构造函数的prototype属性，则instanceof返回true。
*/

/*
原型链实现继承的问题：
1.原型中包含的引用值会 在所有实例间共享
2.子类型在实例化时无法给父类型的构造函数传参

为了解决这两个问题，社区提出了一些方法：
1.盗用构造函数：此方法又叫做“对象伪装”或“经典继承”
基本思想：在子类构造函数中调用父类构造函数，可以利用apply()和call()方法为执行构造函数创建上下文。

缺点：子类无法访问父类原型上的属性和方法

2.组合继承/又叫伪经典继承：综合类原型链和盗用构造函数的优点，基本思想上：使用原型链继承原型上的属性和方法，然后通过盗用构造函数继承实例属性。是js中使用最多的继承模式
*/
function C(name) {
    this.name = name
    this.nums = [1, 2, 3]
}

C.prototype.say = function () {
    console.log(this.name);
}

function D(name, age) {
    C.call(this, name)
    this.age = age
}
D.prototype = new C()
D.prototype.sayAge = function () {
    console.log(this.age);
}

let d = new D('hjx', 25)
console.log(d);

/*
3.原型式继承
见红宝书400页-401页
es5通过增加Object.create()方法将这个方式规范化。
这种方式非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。但是切记，属性中包含的引用值始终会在相关对象间共享。
*/

let e = {
    name: "e"
}
let e2 = Object.create(e)
console.log(e2);

/*
3.寄生式继承：与方法3类似 多了点增强对象的方式
4.寄生式组合继承：
----组合继承存在效率问题：父类构造函数始终会被调用两次，一次是创建子类原型时调用，第二次时在子类构造函数中调用
----寄生式组合继承基本思路：不通过调用父类构造函数给予类原型赋值，而是取得父类原型的一个副本，然后把原型的constructor的值设置为子类构造函数的值。如下所示,只调用一次了
因此这个方法时 最佳方法！！！
*/

function inheritPrototype(sub, sup) {
    let prototype = Object.create(sup.prototype)
    prototype.constructor = sub
    sub.prototype = prototype
}

function C2(name) {
    this.name = name
    this.nums = [1, 2, 3]
}

C2.prototype.say = function () {
    console.log(this.name);
}

function D2(name, age) {
    C2.call(this, name)
    this.age = age
}
inheritPrototype(D2, C2)
D2.prototype.sayAge = function () {
    console.log(this.age);
}
let d2 = new D2('yl', 25)
console.log(d2);