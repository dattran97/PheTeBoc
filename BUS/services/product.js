var cache = require('../cache');
var cacheData = cache.CacheData;

class Product {
    constructor() {}

    //GET - /products
    list() {
        return cacheData.getListProduct();
    }
}

module.exports = new Product();