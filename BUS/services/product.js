var cache = require('../cache');
var cacheData = cache.CacheData;

class Product {
    constructor() {}

    //GET - /products
    list() {
        return cacheData.getListProduct();
    }

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
}

module.exports = new Product();