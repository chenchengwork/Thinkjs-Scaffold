const path = require('path');
const isDev = think.env === 'development';

module.exports = [
    {
        handle: 'cors',
        options:{
            origin:"http://localhost:8180", //允许跨域的域名
            credentials:true,               //允许携带跨域的cookie
        },
    },

    {
        handle: 'meta',
        options: {
            logRequest: isDev,
            sendResponseTime: isDev,
            requestTimeout: 10 * 1000, //请求超时时间，单位是"秒"
        }
    },

    //配置静态资源
    {
        handle: 'resource',
        enable: isDev,              //是否开启该中间件
        options: {
            root: path.join(think.ROOT_PATH, 'www'),
            publicPath: /^\/(static|favicon\.ico)/
        }
    },

    //错误信息处理
    {
        handle: 'trace',
        enable: !think.isCli,       //是否开启该中间件
        options: {
            debug: isDev,
            error(err){

            }
        }
    },


    //解析post参数
    {
        handle: 'payload',

        options: {
            limit: "8mb",          //限定post数据的大小
            encoding: "utf-8",     //数据编码
            keepExtensions: true,  //是否保持上传文件的扩展
            // uploadDir:path.join(think.ROOT_PATH,'storage/tmp/upload/')
            extendTypes:{
                json:['text/plain']
            }
        }
    },

    //路由操作
    {
        handle: 'router',
        options: {}
    },


    //业务逻辑,数据验证
    'logic',

    //业务逻辑
    'controller'
];
