const compiler = require('@vue/compiler-sfc');

const template = `<template><div v-if="message">{{ message }}</div></template>`;
 
const ast = compiler.parse(template);
 
console.log(ast);