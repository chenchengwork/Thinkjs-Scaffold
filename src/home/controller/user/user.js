/**
 * Created by chencheng on 2017/8/5.
 */

const Base = require('../base');
const path = require('path');
const fs = require('fs');
// const userService = require('../../services/userService');
const rename = think.promisify(fs.rename, fs);

module.exports = class extends Base{
	async indexAction(){

		console.log(think.config('workers'));
		console.log(think.app.validators);
		console.log(think.uuid('v1').length);

		//文件上传
		// const file = this.file('filename');
		//
		// // 如果上传的是 png 格式的图片文件，则移动到其他目录
		// const filepath = path.join(think.ROOT_PATH, 'www/upload/a.png');
		// think.mkdir(path.dirname(filepath));
		// await rename(file.path, filepath);

		this.body = "this is userInfo";
	}

    /**
	 * 注册用户
     * @returns {Promise.<void>}
     */
	async registerAction(){
		// const userModel = this.model('user');
		const userModel = think.model('user',{},"home");

        /*let insertId = userService.register({
            userEmail: 'cheng.chen@tianjishuju.com',
            userName: 'chencheng',
            password: '123456',
            deletedAt:0,
            createdAt: parseInt(Date.now()/1000),
            updatedAt: parseInt(Date.now()/1000),
        });*/

        // this.body = insertId;

		const userId = await userModel.add({
			userEmail: 'cheng.chen@tianjishuju.com',
			userName: 'chencheng',
			password: '123456',
			deletedAt:0,
			createdAt: parseInt(Date.now()/1000),
			updatedAt: parseInt(Date.now()/1000),
		});

        this.body = userId;

	}

}