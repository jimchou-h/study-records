/**
 * 无限滚动列表
 */

import { throttle } from 'throttle-debounce';

// 判断是不是 html 原生节点
function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}

const isUndefined = (val)=> {
  return val === void 0;
};

const isDefined = (val) => {
  return val !== undefined && val !== null;
};

const entries = (obj) => {
  return Object.keys(obj || {})
    .map(key => ([key, obj[key]]));
};

const getPositionSize = (el, prop) => {
  return el === window || el === document
    ? document.documentElement[prop]
    : el[prop];
};

const getOffsetHeight = el => {
  return getPositionSize(el, 'offsetHeight');
};

const getClientHeight = el => {
  return getPositionSize(el, 'clientHeight');
};

const scope = 'ElInfiniteScroll';

// 配置属性 map
const attributes = {
  delay: {
    type: Number,
    default: 200
  },
  distance: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  immediate: {
    type: Boolean,
    default: true
  }
};

// 获取用户配置相关属性
const getScrollOptions = (el, vm) => {
  if (!isHtmlElement(el)) return {};

  return entries(attributes).reduce((map, [key, option]) => {
    const { type, default: defaultValue } = option;
    let value = el.getAttribute(`infinite-scroll-${key}`);
    value = isUndefined(vm[value]) ? value : vm[value];
    switch (type) {
      case Number:
        value = Number(value);
        value = Number.isNaN(value) ? defaultValue : value;
        break;
      case Boolean:
        value = isDefined(value) ? value === 'false' ? false : Boolean(value) : defaultValue;
        break;
      default:
        value = type(value);
    }
    map[key] = value;
    return map;
  }, {});
};

const handleScroll = function(cb) {
  const { el, vm, container, observer } = this[scope];
  const { distance, disabled } = getScrollOptions(el, vm);

  if (disabled) return;

  const containerInfo = container.getBoundingClientRect();
  if (!containerInfo.width && !containerInfo.height) return;

  let shouldTrigger = false;

  if (container === el) {
    // 滚动容器内距离底部的距离
    // distance = el.scrollHeight - (el.scrollTop + el.clientHeight)
    const scrollBottom = container.scrollTop + getClientHeight(container);
    shouldTrigger = container.scrollHeight - scrollBottom <= distance
  } else {
    // 另一种用法
    // 如果指令绑定在滚动容器内的元素上
    // 那就是当滚动容器滚动到了当前绑定元素时（可见）
    // 或者已经滚动过了
    // 就会触发回调
    // heightBelowTop -> 当前绑定元素距离滚动容器顶部的距离
    // const heightBelowTop = getOffsetHeight(el) + getElementTop(el) - getElementTop(container);
    // const offsetHeight = getOffsetHeight(container);
    // borderBottom 会影响可视区域的显示，所以也需要计算在内
    // const borderBottom = Number.parseFloat(getStyleComputedProperty(container, 'borderBottomWidth'));

    // 距离滚动容器底部的距离 heightBelowTop - offsetHeight + borderBottom ，如果在可视范围之内或之上，那么相减的值肯定是负值
    // distance 默认为 0 ，如果 heightBelowTop - offsetHeight + borderBottom <= distance
    // 说明至少已经在可视范围之内了，这个时候就触发回调
    // shouldTrigger = heightBelowTop - offsetHeight + borderBottom <= distance;
  }

  // isFunction(cb)
  if (shouldTrigger) {
    cb.call(vm)
  } else if (observer) {
    // 如果有，说明是立即调用
    // 只需执行一次，所以执行完去掉
    observer.disconnect();
    this[scope].observer = null;
  }
}

export default {
  name: 'InfiniteScroll',
  inserted(el, binding, vnode) {
    // 用户设置的回调函数
    const cb = binding.value
    // 获取当前 vm 实例，因为后面调用回调函数要以当前实例为指向
    const vm = vnode.context

    // element 的 getScrollContainer 方法是为了向上找到可以滚动的容器
    // 关系到另一种用法
    // 一般都是直接绑定到滚动容器上
    // const container = getScrollContainer(el, true)
    // 为了简便我们直接使用当前 el 就行
    const container = el

    // 获取用户配置相关属性
    const { delay, immediate } = getScrollOptions(el, vm);

    // 定义滚动回调函数（防抖）
    const onScroll = throttle(delay, handleScroll.bind(el, cb));

    // 将对应的参数放在绑定的 el 上，方便后面其他函数获取
    el[scope] = { el, vm, container, onScroll };

    if (container) {
      container.addEventListener('scroll', onScroll);

      // immediate属性 立即执行加载方法
      // 使用 MutationObserver 监听 DOM 元素改变并手动执行滚动函数
      if (immediate) {
        const observer = el[scope].observer = new MutationObserver(onScroll);
        observer.observe(container, { childList: true, subtree: true });
        onScroll();
      }
    }
  },
  unbind(el) {
    const { container, onScroll } = el[scope];
    if (container) {
      container.removeEventListener('scroll', onScroll);
    }
  }
}

// 扩展
// MutationObserver
// http://javascript.ruanyifeng.com/dom/mutationobserver.html#toc1