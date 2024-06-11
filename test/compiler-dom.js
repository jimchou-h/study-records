const compiler = require('@vue/compiler-dom');

const template = `<div v-if="1">{{ message }}</div>`;
 
const ast = compiler.compile(template);
 
console.log(ast);