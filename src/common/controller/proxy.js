/**
 * Created by chencheng on 17-9-1.
 */
const queryString = require('querystring');
const Base = require('./base');


module.exports = class extends Base{

	async etlAPIAction(){
        //http://10.0.3.179:9090/ws/v2/appPackages

        let msg = await this.fetch('http://10.0.3.179:9090/ws/v2/appPackages').then((resp) => {

            return resp.json();

        }).catch((e) => {

        })

        console.log(queryString.stringify({a:1,b:[21,2]}));

        this.success(msg);
    }

}