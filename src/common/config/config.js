// default config
module.exports = {
	port: 8360, 			// 服务端口号
	host: '127.0.0.1', 		// server host
	workers: 1, // server workers num, if value is 0 then get cpus num
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


	/*
	 |-------------------------------------------------------------------
	 | 以下是自定义配置
	 |-------------------------------------------------------------------
	 */
	proxyEtlHost:"http://10.0.3.179:9090",	//代理ETL服务的主机端口

};
