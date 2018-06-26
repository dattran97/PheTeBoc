var cache = require('../cache');
var cacheData = cache.CacheData;

class Bill {
    constructor() {}

    //GET - /bills
    list() {
        return cacheData.getListBill();
    }

}

module.exports = new Bill();