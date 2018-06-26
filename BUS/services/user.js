var cache = require('../cache');
var cacheData = cache.CacheData;

class User {
    constructor() {}

    //GET - /users
    list() {
        return cacheData.getListUser();
    }
    //POST - /login
    login() {}

    //POST - /register
    register() {}
}

module.exports = new User();