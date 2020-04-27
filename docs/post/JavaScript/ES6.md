---
title: ES6知识点
date: 2019-12-18
update_date: 2019-12-18
tags:
  - ES6
  - Js
category: 前端
---

### let 和常量

```js
let 是块级作用域 let val='1'
const 常量, 无法修改 const val='1', 如果是一个对象, 可以改对象里的值
// 常量不是对这个值本身的限制，而是对赋值的那个变量的限制。换句话说，这个值并没有因为 const 被锁定或者不可变，只是赋值本身不可变
// 如果这个值是复杂值，比如对象或者数组，其内容仍然是可以改的
```

### 解构数组 Array / 解构对象 Object

```js
function func() {
    return ['1','2','3']
}
let ['first','two','three'] = func();

console.log(first,two,three);

function func() {
    return {first:'1',two:'2',three:'3'};
}
let {first:first,two:two,three:three} = func();

console.log(first,two,three);
```

### 字符模板

```js
let first = 'first',
    two = 'two';
原：
let tree = '一是：' + first + '二是：' + two;
ES6：
let three = `一是: ${first} 二是: ${two}`;
// 使用了字符模板,可以直接换行
console.log(three);
```

### 带标签的模板字符串 (inTurn 就是标签)

```js
let first = 'first',
  two = 'two'

let three = inTurn`一是: 
    ${first} 二是: ${two}`

function inTurn(strings, ...values) {
  // console.log(strings);
  // console.log(values);

  // 可以用这个方法判断是否包含不要的字符串
  let result = ''
  for (var i = 0; i < values.length; i++) {
    result += strings[i]
    result += values[i]
  }
  result += strings[strings.length - 1]

  return result
}
console.log(three)
```

### 字符串方法(includes startsWith endsWith)

```js
'use strict'

let first = 'first',
  two = 'two'

let three = `一是: ${first} 二是: ${two}`

console.log(
  // three.startsWith('一是') // 检查是否'一是'开头，返回 true
  // three.endsWith('一是') // 检查是否'一是'开头，返回 true
  three.includes('一是') // 是否包含
)
```

### 给参数设置默认值

```js
function func(first = 1, two = 2) {
  return `${first} ${two}`
}
```

### 操作符

```js
'use strict'

let first = [1, 2]
console.log(first) // 输出数组 [1,2]
console.log(...first) // 输出值 1,2

let two = [3, ...first]
console.log(two) // 输出值 3,1,2
```

### rest 操作符

```js
// es6箭头函数内部不能使用arguments 为了弥补这个问题，rest参数应孕而生

function func(first, two, ...three) {
  console.log(first, two, three)
  // 验证three是不是数组？
  console.log(three instanceof Array) // true
  console.log(Object.prototype.toString.call(three)) // "[object Array]"
  console.log(Array.isArray(three)) // true es6中的新方法
}
func(1, 2, 3, 4) // 因为加了...所以3,4,5代表了就是three  // 1 2 [3, 4]
// 如果要展开数组则加上... console.log(first, two, ...three);

// 在ES5中判断变量是否为数组方法很多, 除了 Object.prototype.toString 外, 其它的都不能正确的判断变量类型, 因此可以 polyfill
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
}
```

### 解构参数

```js
function func(first, two, { three, four } = {}) {
  console.log(first, two, three, four)
}
func(1, 2, { three: '3', four: '4' })
```

### name 属性 (函数的名字)

```js
function func(argument) {
  console.log(first, two, three, four)
}
console.log(func.name) // func 函数的名字

// 或者

let func = function(argument) {} // func 变量的名字

let func = function superFunc(argument) {} // superFunc 声明的名字
```

### 箭头函数

```js
// 特点：不具备this, arguments, 所以找上一级的this
// 如何更改this的指向
// call apply bind
// var that = this
// =>
// 如何确定this是谁, 看谁调用的，前面是谁this就是谁
let func = first => first
// 相等于普通函数写法，把es6写法编译为es5可：babel script.js(根目录下你的JS文件) --watch --out-file script-compiled.js(指定编译后的文件位置)
var func = function func(first) {
  return first
}
// 或者
let func = (first, two) => {
  return first + two
}
// 没有大括号则直接是返回值，有大括号必须写return
let func = first => first + 10
```

### object literal(对象表达式)

```js
let first = 'first',
  two = 'two'
// 以前
let three = {
  first: 'first',
  two: 'two',
  method: function() {}
}
// 现在
let three = {
  first,
  two,
  method() {}
}
console.log(three)
```

### object prop name (对象属性名)

```js
let first = {}

first.name = '钟豪文'
// 添加带空格的属性用点报错，可
first['howe zhong'] = 'howe zhong'

// 或者用变量去表现
let age = 'howe zhong'
first[age] = '28'
console.log(first)
```

### object is 判断

```js
// 判断2个东西是否相同
// 以前
NaN == NaN // false
Object.is(NaN, NaN) // true
```

### object assign 把一个对象的属性复制到另外一个对象里面（浅拷贝）

```js
let first = {}
Object.assign(
  first, // 接受者
  { name: '豪' },
  { age: 30 }
)
console.log(first)
// 属性重复赋值，后面的会覆盖前面的
```

### object setPrototypeOf 可以在创建对象以后去改变改变对象的 setPrototypeOf

```js
let first = {
  getData() {
    return 'first'
  }
}

let two = {
  getData() {
    return 'two'
  }
}
// 创建一个对象
let three = Object.create(first)
console.log(three.getData()) // first
// 判断是否相等
console.log(Object.getPrototypeOf(three) === first) // true

// 重新设置first对象的PrototypeOf
Object.setPrototypeOf(three, two)
console.log(three.getData()) // two
```

### **proto** 得到或者设置对象里面的**proto** / super

```js
let first = {
  getData() {
    return 'name'
  }
}

let two = {
  getData() {
    return 'two'
  }
}
// 在对象表达式里设置
let o = {
  __proto__: first
}
console.log(o.getData()) // name 这样就有了first的方法

// 直接设置
o.__proto__ = two

// 如果要重新定义下这个方法，并得到前方法里的值，则用（super）
let o = {
  __proto__: first,
  getData() {
    return super.getData() + ' 钟豪文'
  }
}

console.log(o.getData())
```

### iterators 迭代器(轮流交换) / 生成器

```js
每次执行的时候会返回一个对象 {value: xx(返回来的值), done: ture/false(还有没有可以迭代的东西，没有就完成迭代(true))}
还应该要有一个next方法，每次执行会返回一个对象，里面有value 和 done ，如果没有迭代的东西话，执行next得到的值变成undefined，done会变成true；

在ES6里面有一种 Generator 它可以手动生成迭代器，如：

function func(foods) {
    let i = 0;

    return {
        next() {
            let done = (i >= foods.length);
            let value = !done ? foods[i++] : undefined;

            return {
                value: value,
                done: done
            }
        }
    }
}
let howe = func([1,2]);

console.log(howe.next()); // done false
console.log(howe.next()); // done false
console.log(howe.next()); // done true

生成迭代器：
function* func(foods) {
    for ( var i=0; i < foods.length; i++) {
        yield foods[i];
    }
}
let howe = func([1,2]);

console.log(howe.next());
```

### class get set (类可以被继承)

```js
class Func {
  constructor(food) {
    this.food = food
    this.dish = []
  }

  get menu() {
    return this.dish
  }

  set menu(dish) {
    this.dish.push(dish)
  }

  cook() {
    console.log(this.food)
  }
}
let howe = new Func(1)
howe.cook()

let howe = new Func()
console.log((howe.menu = '1'))
console.log((howe.menu = '2'))
console.log(howe.menu)
```

### staic(静态方法) 不需要实例化就能使用的定义方法

```js
static cook(food) {
    console.log(food);
}
Func.cook(1);
```

### Set 一堆东西的集合，里面不能包含重复的内容

```js
创建
let v = new Set('123')
添加
v.add('4')

console.log(v)
// 判断是否有
console.log(v.has('2'))

// 删除
v.delete('1')
// 循环处理
v.forEach(v => {
  console.log(v)
})
// 清空
v.clear()
console.log(v)
let set = new Set()
// Set转化为数组
let arr = Array.from(set)
let arr = [...set]
// 转成数组
const arr = Array.of(1)
console.log(arr) // [1]
// 实例属性（继承自Set）
set.constructor === Set
set.size
// 操作方法
set.add(1) // 添加一个值
set.delete(1) //删除一个值
set.has(1) //判断是否有这个值（Array中的indexOf）
set.clear() //清除所有值
// 获取用于遍历的成员方法(Set的遍历顺序就是插入顺序)
set.keys() // 返回键名的遍历器
set.values() // 返回键值得遍历器
set.entries() // 返回键值对的遍历器
set.forEach() // 循环遍历每个值(和Array的方法一致)
for (let key of set.keys()) {
}
for (let val of set.values()) {
}
for (let entry of set.entries()) {
}
// 使用数组方法来处理set值
set = new Set(arr)
set = new Set([...set].map(x => (x = x * 2)))
set = new Set([...set].filter(x => x > 2))
```

### Map

```js
let howe = new Map()

console.log(howe) // 空的

let zhong = {},
  func = function() {},
  params = '钟豪文'

howe.set(zhong(key), '2'(value))
howe.set(func)

// 得到值
howe.get(zhong)
// 删除
howe.delete(params)
// 循环
howe.forEach((value, key) => {
  console.log(`${key} = ${value}`)
})
// 清空
howe.clear()
let map = new Map()
// 实例属性(继承自Map)
map.constructor === Map
map.size
// 操作方法
map.set(1, 2)
map.get(1)
map.delete(1)
map.has(1)
map.clear()
// 遍历方法
map.keys()
map.values()
map.entries()
map.forEach()
// Map和数组的转换
map = new Map([
  ['key', 'val'],
  [2, 1]
]) // 要求双成员数组
let arr = [...map]
// 值得注意的是Map的键是跟内存绑定的
map.set([1], 's')
map.get([1])
let arr = [1]
let arr1 = [1]
map.set(arr, 's')
map.get(arr)
map.set(arr1, 's')
map.get(arr1)
```

### Module 定义模块 设置默认导出与导入的模块

```js
let first = 1;
// 导出
// 第一种
export let = first =1;
// 第二种
export {
    first,
    two,
    ....
    // 获者可以重命名
    first as name
}

// 导入
import {first, two} from '';
// 导入全部
import * as name from '';
// 获者可以重命名
import {first as name} from '';

// 设置默认导出的模块
export default function Func(x,z) {}
// 或者
function Func(x,z) {}
export {Func as default}

// 导入 默认的东西不需要加大括号
import Func from '';
```

### Promise(异步编程解决方案)

```js
// 特点
1、对象的状态不受外界影响 Promise对象代表一个异步操作，有三种状态：
pending     初始状态
fulfilled   操作成功完成
rejected    操作失败
// 只有异步操作的结果可以决定当前是哪一种状态，其他操作都不会影响状态改变，这也是Promise最本质的特性

2、一旦状态改变, 就不会再变(状态就固定了), 只有两种情况
// Pending(进行中) ==> Resolved(已完成)
// Pending(进行中) ==> Rejected(已失败)

优点：
有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数Promise
对象提供统一的接口，使得控制异步操作更加容易
缺点：
无法取消 Promise，一旦新建它就会立即执行，无法中途取消
如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始或者即将完成）

// Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的
// .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环

// 两个原型方法：
1. Promise.prototype.then()
2. Promise.prototype.catch() // 错误捕捉方法 Promise对象的错误具有"冒泡"性质，会一直向后传递，直到被捕获为止

// resolve和reject都返回一个新的Promise实例
let checkLogin =function () {
    // promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。
    // 或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值
    new Promise(function( resolve, reject)) {
        let flag = document.cookie.indexOf('userId')>-1?true:false;
        if(flag==true){
            resolve({
                status:0,
                result:true
            })
        } else {
            reject('error')
        }
    }
}

let getUserInfo = () => {
    return new Promise((resolve, reject) => {
        resolve({
            userId:'1'
        })
    })
}

checkLogin().then((res) => {
    if(res.status ==o){
        console.log(`success`)
        return getUserInfo();
    }.catch((error) => {
        console.log(`error: ${error}`)
    }).then((res2)=> {
        console.log(`userId: ${res2.userId}`);
    })
})
// 第三种方式
Promise.all([checkLogin(),getUserInfo()]).then(([
    // 前面几个，这里也几个
    res1, res2
])=>{})
```

### Symbol

```js
1. Symbol 是独一无二的值, 它是JS的第七种数据类型
2. 不能用new去调用, 因为它是原始类型的值, 不是对象
3. Symbol('这里可以接收一个字符串参数, 是它的描述, 可以拿去区分')
4. Symbol 只能能转成字符串和布尔值, 且不能做任何运算
5. 可以作为对象的属性名

const data = {
  [Symbo1()]: 123,
  a: 1,
  b: 2
};
console.log(data); // 打印不出键为 Symbo1 的值, 显示一个 undefined
console.log(data['Symbol()']); // 打印不出键为 Symbo1 的值, 会报错
// 不能被for..in循环遍历, 虽然不能被遍历, 但也不是私有的属性, 可以通过Object.getownPropertySymbols方法获得一个对象的所有的symbol属性
for (let i in data) {
  console.log(i);
}
console.log(object.getownPropertysymbo1s(data)); // [symbol()]
// 获取键为 Symbo1 的值
console.log(data[object.getownPropertysymbols(data)[0]]); // 123
```

### exports 和 module.exports 区别

```js
1. exports是指向 module.exports 的引用
2. module.exports 指向新的对象时，exports 就断开了与 module.exports 的引用, 通过exports = module.exports 可以重新指向 module.exports
3. 而模块导出的时候, 真正导出的执行是module.exports, 而不是exports
4. module.exports 初始值为一个空对象 {}
5. exports 是指向的 module.exports 的引用
6. require() 返回的是 module.exports 而不是 exports
```
