/*
对象属性类型分为两种：数据属性和访问器属性
1.数据属性：包含一个保存数据值得位置
2.访问器属性不包含数据值，相反它包含一个获取(getter)函数和一个设置(setter)函数。可以使用Object.defineProperty()定义(纠正必须的错误)，也可以在对象内部单独定义！！如对象merge章节有介绍

Object.defineProperties()可以定义多个属性
Object.getOwnPropertyDescriptor()可以取得指定属性得属性描述符
*/

/*
合并对象(merge) 有时候也被称作(mixin)：把源对象得所有本地属性复制到目标对象上
Object.assign():将每个源对象中*可枚举*和*自有属性
*复制到目标对象。对于每个符合条件得属性，这个方法会使用源对象上得[[Get]]取得属性的值，然后使用目标对象上[[Set]]设置属性的值。如果合并期间出错Object.assign()没有回滚之前赋值的概念
*/


/*
对象标识以及相等判定
es6以前 是使用===操作符判断
es6增加了 Object.is()来解决(NaN,NaN) (+0,-0)的判定 true
*/

/*
增强的对象语法
1.属性名与变量名一致，只需简写变量名即可
2.可计算属性:如果可计算属性表达式中抛出任何错误都会中断对象的创建，但是之前完成的计算不能回滚了！！
3.简写方法名
*/
let name2 = 'hjx'
let person = {
    name2,
    age:2
}
console.log(person);
console.log(person["name2"]);


/*
对象解构:解构是在内部使用函数ToObject()把源数据结构转换成对象。
这意味着在对象结构的行下文中，原始值会被当作对象
!!如果是给事先声明的变量赋值，则赋值表达式必须包含在一对括号里面！！
嵌套解构
部分解构
*/
let{age=4} = person
console.log(age);

let {length} = "foobar"
console.log(length);

let name3
({name2:name3} = person) 
console.log(name3);

let pName,page
let p2 = {
    name:'asd',
    age:23,
    job:{
        title:'it'
    }
};
let p2Copy = {};

({name:pName,age:page,job:{title:ptitle}} = p2);
({name:p2Copy.name,age:p2Copy.age} = p2);
console.log(pName,page,ptitle);
console.log(p2Copy);

/*涉及多个属性的解构赋值是一个输出无关的顺序化操作。如果一个解构表达式涉及多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分*/
let pbar2,ptitle2;
try{
    ({name:pName,age:page,foo:{bar:pbar2},job:{title:ptitle2}} = p2);
    
}catch(e){}
console.log(pName,page,ptitle2,pbar2);

/*
在函数参数列表中也可以进行解构赋值，对参数的解构赋值不会影响arguments对象，但可以在函数签名中声明在函数体内使用局部变量
*/
function printPerson(foo,{name:name2,age},bar){
    console.log(arguments);
    console.log(name2,age);
}
printPerson('list',p2,'2nd')

/*
工厂模式可以解决创建多个类似对象的问题，但无法解决对象标识问题(即创建的对象是什么类型)
*/