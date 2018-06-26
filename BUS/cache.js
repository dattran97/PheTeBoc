const app = require('http');
const request = require('request');
const dalPort = require('../DAL/config');
const svURL = 'http://localhost:' + dalPort.config;

const userPath = svURL + '/users'
const productPath = svURL + '/products'
const billPath = svURL + '/bills'
const supplierPath = svURL + '/suppliers'

const headers = {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Headers': 'X-Requested-With',
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"
};

const getData = (url) => {
    return new Promise((resolve, reject) => {
        var options = {
            uri: url,
            method: 'GET',
            headers: headers
        }
        request(options, (err, res, body) => {
          if (err) {
            return reject(err);
          }else{
            console.log(body);
            resolve(JSON.parse(body));   
          }
        });
    });
}

CacheData = new class Cache {
    constructor() {
        getData(userPath).then(result => {
            console.log(JSON.parse(data));
            this.userCache = JSON.parse(data);
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