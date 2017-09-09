// default config
module.exports = {
	port: 8360, 			// 服务端口号
	//host: '127.0.0.1', 		// 服务段主机地址
	workers: 1, 			// 服务worker进程的数据量，如果为0则取所在主机的cpu数量作为worker进程的数据量
	createServer: undefined, // create server function
	startServerTimeout: 3000, // before start server time
	reloadSignal: 'SIGUSR2', // reload process signal
	onUnhandledRejection: err => think.logger.error(err), // unhandledRejection handle
	onUncaughtException: err => think.logger.error(err), // uncaughtException handle
	processKillTimeout: 10 * 1000, // process kill timeout, default is 10s
	enableAgent: false, // enable agent worker
	jsonpCallbackField: 'callback', // jsonp callback field
	jsonContentType: 'application/json', // json content type
	errnoField: 'code', // errno field
	errmsgField: 'msg', // errmsg field
	defaultErrno: 'error', // default errno
	validateDefaultErrno: 1001, // validate default errno
    stickyCluster:true,		//用于开启websocket服务时,确保给定客户端请求命中相同的 worker，否则其握手机制将无法正常工作


	/*
	 |-------------------------------------------------------------------
	 | 以下是自定义配置
	 |-------------------------------------------------------------------
	 */
	appModules:{
		'web':"home",	//
	},

	proxy:{
        proxyEtl:{
            targetHost:"http://10.0.3.179:9090",        //目标主机
            // targetHost:"http://localhost:8360",        //目标主机
            prefix:'proxyEtl',                          //代理前缀
        },
    }
};
