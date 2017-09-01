/**
 * Created by chencheng on 17-9-1.
 */
const Base = require('./base');
module.exports = class extends Base{

    thirdAPIAction(){
        this.body = "proxy--"+this.ctx.url;
    }

}