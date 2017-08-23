const Application = require('thinkjs');
const babel = require('think-babel');
const watcher = require('think-watcher');
const notifier = require('node-notifier');
// console.log(think);
const instance = new Application({
  ROOT_PATH: __dirname,
  watcher: watcher,
    //启动编译项目
  /*transpiler: [babel, {
    presets: ['think-node']
  }],*/
  notifier: notifier.notify.bind(notifier),
  env: 'development'
});

instance.run();
