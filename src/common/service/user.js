/**
 * Created by chencheng on 2017/8/24.
 */

module.exports = class extends think.Service{
	constructor(){
		super();
		this.modelInstance = think.model('user');
	}

	/**
	 * 注册用户
	 *
	 * @param {Object} params
	 * @param {string} params.userEmail
	 * @param {string} params.userName
	 * @param {string} params.password
	 *
	 * @returns {Promise.<*>}
	 */
	async register(params) {

		Object.assign(params,{
			userStatus: 1,
			deletedAt: 0,
			createdA: parseInt(Date.now() / 1000),
			updatedAt: parseInt(Date.now() / 1000),
		})

		return await this.modelInstance.add(params).catch(err => {
			return think.isError(err) ? err : new Error(err)
		});
	}


}