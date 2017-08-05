const path = require('path');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
    //解析post参数
  {
    handle: 'payload',
    options: {
        limit:"8mb",
		encoding:"utf-8",
		keepExtensions:true,
		// uploadDir:path.join(think.ROOT_PATH,'storage/tmp/upload/')
    }
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
