// v-model是一个语法糖，实际上就是传入了value值以及监听了input事件

// 支持自定义事件
// vue2在子组件里定义
Vue.component('custom-input', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    >
  `
});

// vue3直接在语法糖后用冒号的形式定义
// v-model:text（父级） update:text（子级）