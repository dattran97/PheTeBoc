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

    //POST - /addSupplier
    add(params) {
        return new Promise((resolve, reject) => {
            //Gọi API
            var options = {
                uri: svURL + '/addSupplier',
                json: params,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(options);
            request(options, (err, res, body) => {
                if (err) {
                    return reject(err);
                }else{
                    cacheData.updateListSupplier();
                    return resolve(this.list());
                }
            });
        });
    }
}

module.exports = new Supplier();