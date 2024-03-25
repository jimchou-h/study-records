/**
 * 使用
 */
const fn1 = async () => {}
const fn = async () => {
  const res = await fn1()
  console.log(res)
}

/**
 * 实现原理
 */

// *号当async，yield当成await
function* read() {
  yield new Promise((res) => {
    setTimeout(() => res(1.5), 1000)
  })
  yield 2
  yield 3
  yield 4
}
// 除此之外，我们还需要一个能够自动执行generator的co函数
function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      console.log(data)
      const {
        value,
        done
      } = it.next(data)
      if (!done) {
        Promise.resolve(value).then(data => {
          next(data)
        })
      }
    }
    next()
  })
}
console.log(co(read()))