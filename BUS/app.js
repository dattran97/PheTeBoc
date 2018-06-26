const app = require('http');
const url = require('url');
const request = require('request');
var config = require('./config');
var User = require('./services/user');
var Product = require('./services/product');
var Bill = require('./services/bill');
var Supplier = require('./services/supplier');

let dalURL = 'http://localhost:3001';

let sessions = [];

// function checkSession(userId) {
//     console.log(session)
//     let user = sessions.find((user) => user.id === userId);

//     return (user != null || user != undefined) ? -1 : user.role;
// }

// function deleteSession(userId) {
//     let user = checkSession(userId);
//     if (user !== -1) {
//         sessions.splice(user, 1);
//     }
// }

app.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(`${req.method} ${req.url}`);
    switch (req.method) {
        case 'GET':
            res.writeHead(200, {
                'Content-Type': 'text/json'
            });
            switch (req.url) {
                case '/users':
                    res.end(User.list());
                    break
                case '/products':
                    res.end(Product.list());
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
                req.body = chunk;
            });
            switch (req.url) {
                case '/login':
                // var options = {
                //     uri: dalURL + req.url,
                //     json: req.body,
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     }
                // }
                // request(options, (err,resp,data) => {
                //     if (!err && resp.statusCode == 200) {
                //         res.writeHeader(200, {'Content-Type': 'text/json'})
                //         console.log(resp);
                //         console.log(data);
                //         res.write(JSON.stringify(data));
                //         res.end();
                //     }else{
                //         res.writeHeader(400, {'Content-Type': 'text/json'})
                //         res.write(JSON.stringify(err));
                //         res.end();
                //     }
                // });
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
}).on('error', function(err) { console.log(err); });