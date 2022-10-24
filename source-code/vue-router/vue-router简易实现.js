// 1.实现一个插件
// 2.router-link和router-view

// Vue插件怎么写
// function/对象
// 要求必须要有一个install方法，将来会被Vue调用

let Vue; // 保存Vue的构造函数，在插件中要使用

class VueRouter {
  constructor(options) {
    this.$options = options;

    // 把this.current变为响应式的数据
    // 将来数据一旦发生变化，router-view的render函数能够重新执行
    let initial = window.location.hash.slice(1) || "/"
    Vue.util.defineReactive(this, "current", initial)

    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1) || "/";
    });
  }
}

VueRouter.install = (_Vue) => {
  Vue = _Vue;

  // 1.挂载$router属性
  // this.$router.push()
  // 全局混入（延迟下面的逻辑到router创建完毕并且附加到选项上才执行）
  Vue.mixin({
    beforeCreate() {
      // 注意此钩子在每个组件创建实例的时候都会被调用
      // 根实例才有该选项
      if (this.$options.router) {
        // 后面的每个组件都将会有该属性
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 实现两个组件：router-link、router-view
  // <router-link to="/"></router-link> => <a href="/">Home</a>
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      return h(
        "a",
        {
          attrs: {
            href: `#${this.to}`,
          },
        },
        this.$slots.default
      );
    },
  });
  Vue.component("router-view", {
    render(h) {
      let component = null;

      // 获取当前路由所对应的组件并将它渲染出来
      // 因为已经通过mixin混入了，所以是可以拿到的
      const current = this.$router.current;

      const route = this.$router.$options.routes.find(
        (route) => route.path === current
      );

      if (route) {
        component = route.component;
      }

      console.log(component);

      return h(component);
    },
  });
};

export default VueRouter;
