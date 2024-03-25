// 1.let和const
// 只作用当前作用域
// 没有作用域提升

// 2.数据解构
// const { a, b, c, d, e } = obj || {};

// 3.字符串模板
// console.log(`I live in ${city}`);

// 4.函数默认参数
// function defaultRest(name = "_island", age = 18) {
//   console.log("name is " + name);
//   console.log("age is " + age);
// }

// 5.扩展运算符 ...obj

// 6.includes
// arr.includes(type)

// 7.find findIndex
// arr.find arr.findIndex
// 找到符合条件的项之后就不会继续遍历

// 8.flat flatMap
// flat(Infinity) 全部拉平
// flatMap 只能拉平一层，并且执行类似map的回调函数

// 9.可选链（常用）
// const name = obj?.name;

// 10.空值合并运算符
// value ?? "" 如果value是null或者undefined就取后面的值

// 11.对象属性名使用表达式
// obj[`topic${index}`] = "话题内容"