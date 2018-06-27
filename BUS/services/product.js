const request = require('request');
var cache = require('../cache');
var cacheData = cache.CacheData;

let svURL = 'http://localhost:3001';

class Product {
    constructor() {}

    //GET - /products
    list() {
        return cacheData.getListProduct();
    }

    //GET - /products?supplierId=
    listBySupplier(supId) {
        return new Promise((resolve, reject) => {
            let data = JSON.parse(this.list()).MayAnh;
            var products = data.filter((prod) => {
                return prod.MaNCC == supId;
            });

            //Không tìm thấy
            if (products.length < 1) resolve({'error': 'Not found'})
            //Trả về mảng
            resolve({
                'MayAnh': products 
            });
        })
    }

    //POST - /addProduct
    add(params) {
        return new Promise((resolve, reject) => {
            //Gọi API
            var options = {
                uri: svURL + '/addProduct',
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
                    cacheData.updateListProduct(JSON.stringify(body));
                    return resolve(body);
                }
            });
        });
    }
}

module.exports = new Product();