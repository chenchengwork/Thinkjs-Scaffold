/**
 * Created by chencheng on 2017/8/5.
 */

const Base = require('../base');
const path = require('path');
const fs = require('fs');
const rename = think.promisify(fs.rename, fs);

module.exports = class extends Base{
	async indexAction(ctx){

		const file = this.file('filename');

		// 如果上传的是 png 格式的图片文件，则移动到其他目录
		const filepath = path.join(think.ROOT_PATH, 'www/upload/a.png');
		think.mkdir(path.dirname(filepath));
		await rename(file.path, filepath);

		this.body = "this is userInfo";
	}

}