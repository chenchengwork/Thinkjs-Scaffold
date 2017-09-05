/**
 * Created by chencheng on 2017/9/2.
 */
const { URLSearchParams } = require('url');
const { createReadStream } = require('fs');
const FormData = require('form-data');
const axios = require('axios');

module.exports = class extends think.Service{

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

            return await this.fetch(targetHost)
                .then(res => res.json())
				.catch((e) => {
            		return e;
				});

		}else if( ctx.isPost){

			if(ctx.is('application/json','text/plain')){
                return await this.fetch(targetHost, {
                    method: 'POST',
                    body:    JSON.stringify(ctx.post()),
                    headers: { 'Content-Type': ctx.headers['content-type'] },
                })
                    .then(res => res.json())
                    .catch((e) => {
                        return e;
                    });


            }else if(ctx.is('application/x-www-form-urlencoded')){
                const params = new URLSearchParams();

                //加载post参数
                Object.keys(ctx.post()).map((fieldName) => {
                    params.append(fieldName,ctx.post(fieldName));
                });

				return await this.fetch(targetHost, {
					method: 'POST',
					body: params,
					headers: { 'Content-Type': ctx.headers['content-type'] }
				})
                    .then(res =>res.json())
                    .catch((e) => {
                        return e;
                    });
            }
			//可能存在文件上传
			else if(ctx.is('multipart/form-data')){

                /*const form = new FormData();

				//加载文件参数
                Object.keys(ctx.file()).map((fieldName) => {
                	form.append(fieldName,createReadStream(ctx.file(fieldName).path));
				});

				//加载post参数
				Object.keys(ctx.post()).map((fieldName) => {
                	form.append(fieldName,ctx.post(fieldName));
				});

                return await this.fetch(targetHost, { method: 'POST', body: form, headers: form.getHeaders() })
                    .then(res => res.json())
                    .catch((e) => {
                        return e;
                    });*/

                const fileNames = Object.keys(ctx.file())

                return await axios({
                    method: 'post',
                    url:targetHost,
                    headers: {
                        "Content-Type": 'application/java-archive'
                    },
                    data: createReadStream(ctx.file(fileNames[0]).path)
                }).then((resp) => {
                    console.log(" upload success ")
                }, (resp) => {
                    console.log(resp)
                })

                return  111;

            }

		}


	}
}