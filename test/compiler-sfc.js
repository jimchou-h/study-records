const compiler = require('@vue/compiler-sfc');

const template = `<template><div v-if="1">{{ message }}</div></template>`;
 
const ast = compiler.parse(template);
 
console.log(ast);