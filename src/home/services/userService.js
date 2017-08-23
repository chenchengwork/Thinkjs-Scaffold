/**
 * Created by chencheng on 17-8-8.
 */

class userService{
    constructor(){
        console.log(think.app.models);

        this.userModel = think.model('user', {}, "home");
    }

    async register(params){
        let insertId = await this.userModel.add(params);

        return insertId;
    }
}

module.exports = new userService();