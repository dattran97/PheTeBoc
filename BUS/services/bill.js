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

    //POST - /addBill
    add(params) {
        return new Promise((resolve, reject) => {
            //Gọi API
            var options = {
                uri: svURL + '/addBill',
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
                    cacheData.updateListBill();
                    return resolve({'message': 'Add successfully'});
                }
            });
        });
    }

}

module.exports = new Bill();