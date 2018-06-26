const http = require('http');
const request = require('request');
const dalPort = require('../DAL/config');
const svURL = 'http://localhost:' + dalPort.port;

const userPath = svURL + '/users'
const productPath = svURL + '/products'
const billPath = svURL + '/bills'
const supplierPath = svURL + '/suppliers'

const getData = (url) => {
    return new Promise((resolve, reject) => {
        var options = {
            uri: url,
            method: 'GET'
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
            this.userCache = result;
            return this.userCache;
        })
        getData(productPath).then(result => {
            this.productCache = result;
            return this.productCache;
        });
        getData(billPath).then(result => {
            this.billCache = result;
            return this.billCache;
        });
        getData(supplierPath).then(result => {
            this.supplierCache = result;
            return this.supplierCache;
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

    getListBill() {
        if (this.billCache == "" || this.billCache == undefined) {
            getData(billPath).then(result => {
                this.billCache = result;
                return this.billCache;
            })
        }else {
            return this.billCache;
        }
    }

    getListSupplier() {
        if (this.supplierCache == "" || this.supplierCache == undefined) {
            getData(supplierPath).then(result => {
                this.supplierCache = result;
                return this.supplierCache;
            })
        }else {
            return this.supplierCache;
        }
    }
}

module.exports = {
    CacheData
}