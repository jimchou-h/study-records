/**
 * el-dialog 长按头部可以跟着鼠标移动
 */

import { throttle } from 'throttle-debounce';

export default {
  name: 'DialogMove',
  inserted(el, binding, vnode) {
    const dialog = el.querySelector('.el-dialog')
    const dialogHeader = el.querySelector('.el-dialog__header')
    dialogHeader.style.cursor = 'move'

    let offsetLeft = dialog.offsetLeft,
     offsetTop = dialog.offsetTop

    Object.assign(dialog.style, {
      position: 'absolute',
      top: offsetTop + 'px',
      left: offsetLeft + 'px',
      margin: '0px'
    })
    
    dialogHeader.onmousedown = function (e) {
      let disX = e.clientX,
        disY = e.clientY
      // 使用 document.onmousemove 是因为 mousemove 调用有事件间隔
      // 鼠标速度快的话容易超出界面
      // 这样体验不是很好
      document.onmousemove = throttle(10, function (e) {
        // dialog 移动的位置 + 鼠标移动的距离
        dialog.style.top = `${offsetTop + (e.clientY - disY)}px`
        dialog.style.left = `${offsetLeft + (e.clientX - disX)}px`
      })
      dialogHeader.onmouseup = function() {
        offsetLeft = parseInt(dialog.style.left)
        offsetTop = parseInt(dialog.style.top)
        document.onmousemove = null
        dialogHeader.onmouseup = null
      }
    }
  },
}