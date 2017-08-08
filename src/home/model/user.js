module.exports = class extends think.Model {
    constructor(...args) {
        super(...args);
        this.tableName = 'users';
        this.pk = 'userId'; //设置唯一主键
    }

    insert(){

    }
};
