const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if(isMainThread) {
  console.log('main thread start...');

  const worker = new Worker(__filename, {
    workerData: {
      prefix: 'Received message',
      timeInSecond: 1000
    }
  });

  worker.on('message', (msg) => {
    console.log(`Worker: ${msg}`);
  });

  worker.postMessage('Done with my work.');
  
  console.log("doing some random work in main thread..!!");

} else {
  parentPort.on('message', (msg) => {
    console.log(`${workerData.prefix}: ${msg}`);
  });

  parentPort.postMessage('hello from worker thread');
  cpuIntensiveTask(workerData.timeInSecond);
  parentPort.postMessage('i am working');
  cpuIntensiveTask(workerData.timeInSecond);
  parentPort.postMessage('task is done..!!');
}

function cpuIntensiveTask(timeInSecond) {
    const end = Date.now() + timeInSecond;
    while (Date.now() < end) { }
}
