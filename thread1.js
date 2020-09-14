const { Worker, isMainThread, parentPort } = require('worker_threads');

if(isMainThread) {
    console.log('main thread start...');
    const worker = new Worker(__filename);
    worker.on('message', (msg) => {
        console.log(`Worker: ${msg}`);
      });

    console.log("doing some random work in main thread..!!");


}else{
    parentPort.postMessage('hello from worker thread');
    meDoingTimepass(1000);
    parentPort.postMessage('i am working');
    meDoingTimepass(1000);
    parentPort.postMessage('task is done..!!');
}

function meDoingTimepass(timeInSecond) {
    const end = Date.now() + timeInSecond;
    while (Date.now() < end) { }
  }