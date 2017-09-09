/**
 * Created by chencheng on 17-9-8.
 */

const socketClient = require('socket.io-client');

module.exports = class extends think.Controller {

    constructor(...arg) {
        super(...arg);
    }

    openAction() {
        this.emit('opend', 'This client opened successfully!')
        // this.broadcast('joined', 'There is a new client joined successfully!')
    }

    addUserAction() {
        console.log('获取客户端 addUser 事件发送的数据', this.wsData);

        //TODO socket client 连接本地的socket服务是可以的,要验证与apex的socket服务的连接情况
        //可用于反向代理socket,到其他服务器
        /*const socket = socketClient('ws://127.0.0.1:8360',{
            path: '/socket.io',
        });

        socket.on('connect',(data)=>{
            console.log("连接ws://127.0.0.1:8360/socket.io -- 成功")
        })*/

        // console.log(11111,socket)
        // console.log('获取客户端 addUser 事件发送的数据', this.wsData);
        // console.log('获取当前 WebSocket 对象', this.websocket);
        // console.log('判断当前请求是否是 WebSocket 请求', this.isWebsocket);
    }
}