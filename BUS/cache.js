const app = require('http');
const dalPort = require('../DAL/config');
const svURL = 'http://localhost:' + dalPort.config;

const userPath = svURL + '/users'
const productPath = svURL + '/products'
const billPath = svURL + '/bills'
const supplierPath = svURL + '/suppliers'

const getData = (url) => {
    return new Promise((resolve, reject) => {
        var options = {
            uri: url,
            method: "GET"
        }
        request(options, (err, res, body) => {
          if (err) {
            return reject(err);
          }else{
            return resolve(body);
          }
        });
    });
}

CacheData = new class Cache {
    constructor() {
        getData(userPath).then(result => {
            console.log(result);
            this.userCache = result;
            return this.userCache;
        });
        getData(productPath).then(result => {
            console.log(result);
            this.productCache = result;
            return this.productCache;
        });
    }

    getListUser() {
        if (this.userCache == "" || this.userCache == undefined) {
            getData(userPath).then(result => {
                this.userCache = result;
                return this.userCache;
            })
        }else {
            return this.userCache;
        }
    }

    getListProduct() {
        if (this.productCache == "" || this.productCache == undefined) {
            getData(productPath).then(result => {
                this.productCache = result;
                return this.productCache;
            })
        }else {
            return this.productCache;
        }
    }
}

module.exports = {
    CacheData
}