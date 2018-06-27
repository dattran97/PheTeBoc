const request = require('request');
var cache = require('../cache');
var cacheData = cache.CacheData;

let svURL = 'http://localhost:3001';

class Bill {
    constructor() {}

    //GET - /bills
    list() {
        return cacheData.getListBill();
    }

}

module.exports = new Bill();