var cache = require('../cache');
var cacheData = cache.CacheData;

class Supplier {
    constructor() {}

    //GET - /suppliers
    list() {
        return cacheData.getListSupplier();
    }
}

module.exports = new Supplier();