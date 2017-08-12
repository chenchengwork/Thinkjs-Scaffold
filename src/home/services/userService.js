/**
 * Created by chencheng on 17-8-8.
 */

class userService{
    constructor(){
        this.userModel = think.model('user', think.config('model'));
    }

    async register(params){
        let insertId = await this.userModel.add(params);

        return insertId;
    }
}

module.exports = new userService();