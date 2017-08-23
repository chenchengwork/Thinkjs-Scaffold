const path = require('path');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev,
		requestTimeout:10 * 1000, //请求超时时间，单位是"秒"
    }
  },

    //配置静态资源
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
        limit:"8mb",          //限定post数据的大小
		encoding:"utf-8",     //数据编码
		keepExtensions:true,  //是否保持上传文件的扩展
		// uploadDir:path.join(think.ROOT_PATH,'storage/tmp/upload/')
    }
  },
    //路由操作
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
