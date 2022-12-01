const { Worker, workerData, isMainThread } = require("worker_threads");

if (isMainThread) {
  console.log(`Main Thread! Process ID: ${process.pid}`);
  new Worker(__filename, {
    workerData: [1, 9, 3, 6, 0],
  });

  new Worker(__filename, {
    workerData: [2, 6, 3, 1],
  });
} else {
  console.log(`Worker! Process ID: ${process.pid}`);
  console.log(`${workerData} sorted is ${workerData.sort()}`);
}
