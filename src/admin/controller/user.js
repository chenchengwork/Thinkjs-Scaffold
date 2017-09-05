/**
 * Created by chencheng on 2017/8/5.
 */

const Base = require('./base');
const path = require('path');
const fs = require('fs');
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
		const { userEmail, userName, password } = this.post();

		const result = await think.service('user').register({ userEmail, userName, password });
		// console.log(result);
		// this.ctx.throw(500,result);

		if (think.isError(result)) {
			// 这里将错误信息返回，或者返回格式化后的错误信息也都可以
			return this.fail(result.message);
		}

        this.body = result;

	}

    /**
	 * 测试文件上传
     * @returns {Promise.<void>}
     */
	async testUploadAction() {
		console.log(this.ctx.post());

		this.success(this.ctx.post())
	}

}