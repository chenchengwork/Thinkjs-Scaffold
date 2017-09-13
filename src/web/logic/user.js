/**
 * Created by chencheng on 2017/8/24.
 */

module.exports = class extends think.Logic{

	registerAction(){
		this.allowMethods = 'POST';

		const rules = {
			userEmail:{
				required:true,
				email:true,
			},

			userName:{
				required:true,
			},

			password:{
				required:true,
				equals:"confirmPassword"
			}

		}

		const messages = {
			required:"{name}不能为空",
			email:"{name}不是email格式",
			password:{
				equals:"两次输入的密码不一致",
			},
		}

		if(!this.validate(rules, messages)){

			return this.fail('validate error',this.validateErrors);
		}

	}


}