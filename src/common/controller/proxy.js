/**
 * Created by chencheng on 17-9-1.
 */
const Base = require('./base');
module.exports = class extends Base{

    /**
     * 代理etl的所有请求
     * @returns {Promise.<void>}
     */
	// async etlAPIAction(){
	async getAction(){
	    const { targetHost, prefix } = this.config('proxy')['proxyEtl'];

        let msg = await think.service('proxy').proxy(this.ctx,targetHost,prefix);

        this.success(msg);
    }

    async postAction(){
        const { targetHost, prefix } = this.config('proxy')['proxyEtl'];

        let msg = await think.service('proxy').proxy(this.ctx,targetHost,prefix);

        this.success(111);
    }


}