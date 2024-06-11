// 闭包就是函数以及它被创建时所在的词法环境的组合体
// 词法环境即函数声明时的作用域链
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 输出 1
console.log(counter()); // 输出 2


// 闭包不一定要返回一个函数
function outerFunction() {
  let outerVar = 'I am outer';

  function innerFunction() {
    console.log(outerVar);
  }

  innerFunction(); // 在闭包中调用 innerFunction
}
outerFunction(); // 输出 'I am outer'