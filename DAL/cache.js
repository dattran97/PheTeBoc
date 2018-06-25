var app = require('http');

let getMethod = require('./services/getMethod');

CacheData = new class Cache {
    constructor() {
        this.listUserCache = this.getListUser();
        this.listCameraCache = this.getListCamera();
    }

    getListUser() {
        return getMethod.getListUser();
    }

    getListCamera() {
        return getMethod.getListCamera();
    }

    User() {
        if (this.listUserCache == "" || this.listUserCache == undefined) {
            this.listUserCache = this.getListUser();
            return this.listUserCache;
        }
        else {
            return this.listUserCache;
        }
    }

    Camera() {
        if (this.listCameraCache == "" || this.listCameraCache == undefined) {
            this.listCameraCache = this.getListCamera();
            return this.listCameraCache;
        }
        else {
            return this.listCameraCache;
        }
    }
}

module.exports = {
    CacheData
}