const app = require('http');
const dalPort = require('../DAL/config');
const svURL = 'http://localhost:' + dalPort.config;

CacheData = new class Cache {
    constructor() {
        this.CacheUser().then(result => {
            this.userCache = result;
            return this.userCache;
        })
        console.log("Cache is created");
    }

    async CacheUser() {
        return new Promise(function(resolve, reject) {
            app.get('http://localhost:3000/LoadUser', (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    resolve(data);
                });
            }).on("error", (err) => {
                console.log(`CACHE: ${err}`);
            });
        });
    }
}

module.exports {
    CacheData
}