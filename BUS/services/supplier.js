const request = require('request');
var cache = require('../cache');
var cacheData = cache.CacheData;

let svURL = 'http://localhost:3001';

class Supplier {
    constructor() {}

    //GET - /suppliers
    list() {
        return cacheData.getListSupplier();
    }
}

module.exports = new Supplier();