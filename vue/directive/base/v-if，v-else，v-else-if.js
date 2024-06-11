// 根据表达式的值来条件性地渲染元素
// 在ast中是一个IF类型的AST节点
// complier转化后在render函数使用三元表达式判断
const render = (h) => {
  return h('div', this.showMessage ? 'Hello, World!' : null);
}