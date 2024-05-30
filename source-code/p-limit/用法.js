import pLimit from "p-limit"

const limit = pLimit(2)

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const asyncTask1 = async () => {
  await delay(5000)
  console.log("输出任务1")
}

const asyncTask2 = async () => {
  await delay(5000)
  console.log("输出任务2")
}

const asyncTask3 = async () => {
  await delay(5000)
  console.log("输出任务3")
}

const input = [limit(() => asyncTask1()), limit(() => asyncTask2()), limit(() => asyncTask3())]

const result = await Promise.all(input)

console.log(result)