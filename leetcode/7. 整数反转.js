// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
// 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
// leetcode 80ms 35.8MB
var reverse = function(x) {
  let xArray = (x + "").split(""),
    num = "";
  if (x < 0) {
    num = xArray.shift();
  }
  let result = num + xArray.reverse().join("")
  return 2147483648 > result && -2147483649 < result ? result : 0
};
