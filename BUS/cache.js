const http = require('http');
const request = require('request');
const dalPort = require('../DAL/config');
const svURL = 'http://localhost:' + dalPort.port;

const userPath = svURL + '/users'
const productPath = svURL + '/products'
const billPath = svURL + '/bills'
const supplierPath = svURL + '/suppliers'

const get = (url) => {
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
        get(userPath).then(result => {
            this.userCache = result;
            return this.userCache;
        })
        get(productPath).then(result => {
            this.productCache = result;
            return this.productCache;
        });
        get(billPath).then(result => {
            this.billCache = result;
            return this.billCache;
        });
        get(supplierPath).then(result => {
            this.supplierCache = result;
            return this.supplierCache;
        });
    }

    getListUser() {
        if (this.userCache == "" || this.userCache == undefined) {
            get(userPath).then(result => {
                this.userCache = result;
                return this.userCache;
            })
        }else {
            console.log(this.userCache);
            return this.userCache;
        }
    }

    updateListUser(list) {
        this.userCache = list;
    }

    getListProduct() {
        if (this.productCache == "" || this.productCache == undefined) {
            get(productPath).then(result => {
                this.productCache = result;
                return this.productCache;
            })
        }else {
            return this.productCache;
        }
    }

    updateListProduct(list) {
        this.productCache = list;
    }

    getListBill() {
        if (this.billCache == "" || this.billCache == undefined) {
            get(billPath).then(result => {
                this.billCache = result;
                return this.billCache;
            })
        }else {
            return this.billCache;
        }
    }

    updateListBill(list) {
        this.billCache = list;
    }

    getListSupplier() {
        if (this.supplierCache == "" || this.supplierCache == undefined) {
            get(supplierPath).then(result => {
                this.supplierCache = result;
                return this.supplierCache;
            })
        }else {
            return this.supplierCache;
        }
    }

    updateListSupplier(list) {
        this.supplierCache = list;
    }
}

module.exports = {
    CacheData
}