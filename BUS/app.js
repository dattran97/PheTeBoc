const app = require('http');
const url = require('url');
var config = require('./config');

var cache = require('./cache');
var cacheData = cache.CacheData;

var User = require('./services/user');
var Product = require('./services/product');
var Bill = require('./services/bill');
var Supplier = require('./services/supplier');

let dalURL = 'http://localhost:3001';

app.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    switch (req.method) {
        case 'GET':
            res.writeHead(200, {
                'Content-Type': 'text/json'
            });
            const { pathname, query } = url.parse(req.url, true);
            console.log(pathname);
            console.log(query);
            switch (pathname) {
                case '/users':
                    res.end(User.list());
                    break
                case '/products':
                    // var url_parts = url.parse(req.url, true);
                    // var query = url_parts.query;
                    let supId = query.supplierId;
                    console.log(supId);
                    if (supId == undefined || supId == ''){
                        res.end(Product.list());
                    }else{
                        Product.listBySupplier(supId).then(data => {
                            var data = {};
                            res.write(JSON.stringify(data));
                            res.end();
                        }).catch(err => {
                            res.write(JSON.stringify(err));
                            res.end();
                        })
                    }
                    // res.end();
                    break
                case '/bills':
                    res.end(Bill.list());
                    break
                case '/suppliers':
                    res.end(Supplier.list());
                    break
                default: break
            }
        case 'POST':
            req.on('data', chunk => {
                req.body = JSON.parse(chunk);
            });
            switch (req.url) {
                case '/login':
                req.on('end', () => {
                    console.log(req.body);
                    User.login(req.body).then(data => {
                        res.writeHeader(200, {'Content-Type': 'text/json'})
                        res.write(JSON.stringify(data));
                        res.end();
                    }).catch(err => {
                        res.writeHeader(400, {'Content-Type': 'text/json'})
                        res.write(JSON.stringify(err));
                        res.end();
                    })
                });
                break
                case '/register':
                req.on('end', () => {
                    User.register(req.body).then(data => {
                        res.writeHeader(200, {'Content-Type': 'text/json'})
                        res.write(JSON.stringify({'message': 'Register successfully'}));
                        res.end();
                    }).catch(err => {
                        res.writeHeader(400, {'Content-Type': 'text/json'})
                        res.write(JSON.stringify(err));
                        res.end();
                    })
                });
                break
                case '/logout':
                req.on('end', () => {
                    let token = req.headers.acccesstoken;
                    console.log(token);
                    User.logout(token);
                    res.writeHeader(200, {'Content-Type': 'text/json'})
                    res.write(JSON.stringify({'message': 'Logout successfully'}));
                    res.end();
                });
                break
                default: break
            }
        case 'PUT':
            break;
        case 'DELETE':
            break;
        default: break;
    }
}).listen(config.port, err => {
    if (err != null) {
        console.log('Error: ', err);
    } else {
        console.log('Server is starting at port ' + config.port);
    }
})