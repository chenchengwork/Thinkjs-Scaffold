/**
 * Created by chencheng on 17-8-23.
 */

module.exports = class extends think.Service{
    get() {
        return this.fetch("http://www.sina.com.cn/").then(resp => resp.text())
    }
}