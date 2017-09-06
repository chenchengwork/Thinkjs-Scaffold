/**
 * Created by chencheng on 17-9-1.
 */
const Base = require('./base');

module.exports = class extends Base{

    async doProxy(){
        const proxyConf = this.config('proxy')['proxyEtl'];
        const {status, data} = await think.service('proxy').proxy(this.ctx,proxyConf.targetHost,proxyConf.prefix);
        if(status) {
            this.success(data);
        }else{
            this.fail(500,JSON.stringify(data))
        }
    }

    /**
     * proxy get
     * @returns {Promise.<void>}
     */
	async getAction(){
        return this.doProxy();
    }

    /**
     * proxy post
     * @returns {Promise.<void>}
     */
    async postAction(){
        return this.doProxy();
    }

    async deleteAction(){
        return this.doProxy();
    }

    async putAction(){
        return this.doProxy();
    }

}