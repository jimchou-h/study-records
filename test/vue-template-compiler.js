const compiler = require('vue-template-compiler');
 
// 假设你有一个Vue模板字符串
const template = `<div v-if="1">{{ message }}</div><div v-else>2</div>`;
 
// 使用vue-template-compiler将template转换为AST
const ast = compiler.compile(template).ast;
 
// 输出AST
console.log(ast);