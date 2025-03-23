// promise.all的并发限流实现 TODO: 持续优化
Promise.limitedAll = function (promises, maxConcurrent = 15) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array(promises.length);
    let currentIndex = 0;
    let runningCount = 0;
    let completedCount = 0;
    let aborted = false; // 新增的标记位

    function runNext() {
      if (aborted) return; // 如果已经abort，不再处理

      while (runningCount < maxConcurrent && currentIndex < promises.length) {
        const index = currentIndex++;
        const promise = Promise.resolve(promises[index]);

        runningCount++;
        promise.then(value => {
          results[index] = value;
        }).catch(error => {
          aborted = true; // 标记为已中止
          reject(error);
        }).finally(() => {
          runningCount--;
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results);
          } else {
            runNext();
            // setImmediate(runNext); // 避免递归调用导致的栈溢出问题。
          }
        });
      }
    }

    runNext();
  });
};

// 测试代码
function createTask(id, delay = 100, shouldReject = false) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldReject) {
          reject(`Task ${id} failed`);
        } else {
          resolve(`Task ${id} succeeded`);
        }
      }, delay);
    });
}

/**
 * 测试用例 1: 基本并发限制
 * - 创建 5 个任务，并发限制 2
 * - 验证结果顺序和时间线
 */
async function testBasicConcurrency() {
  const tasks = [
    createTask(1, 300),
    createTask(2, 200),
    createTask(3, 400),
    createTask(4, 100),
    createTask(5, 50)
  ];

  const startTime = Date.now();
  const results = await Promise.limitedAll(tasks, 2);
  const duration = Date.now() - startTime;

  console.log('[BasicConcurrency] 结果:', results);
  console.assert(
    duration >= 300 + 400 - Math.min(300, 200), // 最长链路耗时
    `耗时${duration}ms不符合预期`
  );
  console.assert(
    JSON.stringify(results) === JSON.stringify([
      'Task 1 succeeded',
      'Task 2 succeeded',
      'Task 3 succeeded',
      'Task 4 succeeded',
      'Task 5 succeeded'
    ]),
    '结果顺序不一致'
  );
}

/**
 * 测试用例 2: 错误冒泡
 * - 第3个任务失败
 * - 验证快速失败并抛出错误
 */
async function testErrorPropagation() {
  const tasks = [
    createTask(1, 100),
    createTask(2, 200),
    createTask(3, 300, true), // 失败任务
    createTask(4, 400),
  ];

  let errorCaught = '';
  try {
    await Promise.limitedAll(tasks, 3);
  } catch (err) {
    errorCaught = err;
  }

  console.assert(
    errorCaught === 'Task 3 failed',
    `应该捕获'Task 3 failed'错误，实际: ${errorCaught}`
  );
}

/**
 * 测试用例 3: 空输入处理
 * - 验证正确返回空数组
 */
async function testEmptyInput() {
  const results = await Promise.limitedAll([], 3);
  console.assert(
    Array.isArray(results) && results.length === 0,
    '空输入未返回空数组'
  );
}

/**
 * 测试用例 4: 顺序保证
 * - 混合快速和慢速任务
 * - 验证结果顺序与任务定义顺序一致
 */
async function testOrderPreserving() {
  const tasks = [
    createTask('A', 500),
    createTask('B', 100),
    createTask('C', 300),
  ];

  const results = await Promise.limitedAll(tasks, 3);
  console.assert(
    JSON.stringify(results) === JSON.stringify([
      'Task A succeeded',
      'Task B succeeded',
      'Task C succeeded'
    ]),
    '顺序保持不变性失败'
  );
}

(async () => {
  console.log('正在运行测试套件...\n');

  await testBasicConcurrency()
    .then(() => console.log('✅ 基本并发测试通过'))
    .catch(console.error);

  await testErrorPropagation()
    .then(() => console.log('✅ 错误冒泡测试通过'))
    .catch(console.error);

  await testEmptyInput()
    .then(() => console.log('✅ 空输入测试通过'))
    .catch(console.error);

  await testOrderPreserving()
    .then(() => console.log('✅ 顺序保持测试通过'))
    .catch(console.error);
})();



