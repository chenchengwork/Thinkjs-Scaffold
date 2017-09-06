/**
 * Created by chencheng on 2017/9/2.
 */
module.exports = class extends think.Service{

    constructor(){
        super();
        this.restfulClient = think.service('restfulClient');
    }

	/**
	 * 反向代理请求
	 * @param {Object} ctx
	 * @param {String} targetHost	目标主机
	 * @param {String} proxyPrefix	代理前缀
	 * @returns {Promise.<void>}
	 */
	async proxy(ctx,targetHost,proxyPrefix){

        targetHost = targetHost + ctx.url.replace('/'+proxyPrefix,'');

        if(ctx.isGet){

           return await this.restfulClient.get(targetHost);

		}else if(ctx.isPost){

			if(ctx.is('application/json','text/plain')){

			    return this.restfulClient.postJson(targetHost,ctx.post());

            }else if(ctx.is('application/x-www-form-urlencoded')){

                return this.restfulClient.post(targetHost,ctx.post());

            }
			else if(ctx.is('multipart/form-data')){
                let params = {};
                const fileKeys = Object.keys(ctx.file());
                //加载file参数
                fileKeys.map((fieldName) => {
                    params[fieldName] = ctx.file(fieldName).path;
                });

                //加载post参数
                Object.keys(ctx.post()).map((fieldName) => {
                    params[fieldName] = ctx.post(fieldName);
                });

                //TODO 注意：这是为了ETL(Apex)上传ETL应用包做的特殊处理
                if(targetHost.indexOf('/ws/v2/appPackages') !== -1){
                    return await this.restfulClient.uploadBinary(targetHost,ctx.file()[fileKeys[0]].path);
                }

                return await this.restfulClient.upload(targetHost,params);

            }
		}else if(ctx.method === 'DELETE'){

            return await this.restfulClient.del(targetHost,ctx.post(),{
                "Content-Type":ctx.headers['content-type']
            });

        }else if(ctx.method === 'PUT'){
            return await this.restfulClient.put(targetHost,ctx.post(),{
                "Content-Type":ctx.headers['content-type']
            });
        }
	}
}