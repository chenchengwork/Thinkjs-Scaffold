const path = require('path');
const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const socketio = require('think-websocket-socket.io');

const isDev = think.env === 'development';


/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    database: 'Thinkjs-demo',
    prefix: '',
    encoding: 'utf8',
    // host: '127.0.0.1',
    host: '10.0.5.166',
    port: '3306',
    user: 'root',
    password: '123456',
    dateStrings: true
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs'
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
};

/**
 * websocket adapter config
 * @type {{type: string, common: {}, socketio: {handle: *, allowOrigin: string, path: string, adapter: null, messages: [*]}}}
 */
exports.websocket = {
    type: 'socketio',
    common: {
        // common config
    },
    socketio: {
        handle: socketio,
        // allowOrigin: '127.0.0.1:8360',  // 默认所有的域名都允许访问
        path: '/socket.io',             // 默认 '/socket.io'
        adapter: null,                  // 默认无 adapter
        messages: [{
            open: '/websocket/open',
            addUser: '/websocket/addUser'
        }]
    }
}