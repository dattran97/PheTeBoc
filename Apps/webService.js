var http = require('http');
var fs = require('fs');
var path = require('path');
// var xml2js = require('xml2js');
var mime = require('mime');
var queryString = require('query-string');
var config = require('./config');

var requestNPM = require('request');

//for Static file serving
function StaticFolder(){
    var folderPath = "";
}
StaticFolder.prototype.setStatic = function(folder) {
    this.folderPath = path.normalize(folder);
}
StaticFolder.prototype.file = function(url){
    return this.folderPath + url;
}

var static = new StaticFolder();
//

var getHeaderType = (ext) => {
    return {
        '/': 'text/html',
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.eot': 'appliaction/vnd.ms-fontobject',
        '.ttf': 'aplication/font-sfnt'
    }[ext]
}

var getFileType = (fPath) => {
    return mime.getType(path.extname(fPath).slice(1));
}
var getFileExtension = (type) => {
    return mime.getExtension(type);
}

///Parsing
var parse = function(reqURL){
    var parsed = queryString.parseUrl(reqURL);
    if(parsed.url === '/'){
        parsed.url = '/index.html';
    }
    else if (getFileType(parsed.url) === null){

    }
    parsed.url = path.normalize(parsed.url);
    return parsed;
}




var create = () => {

    var app = http.createServer((req, res) => {
        console.log(`${req.method} ${req.url}`);
        if (req.method === 'GET') {
          
            var request = parse(req.url);

            fs.readFile(static.file(request.url), (err, file) => {
                if (err) {
                    console.log('Error: File not found ' + request.url);
                    res.writeHead(404, 'Not found');
                    res.end();
                } else {
                    res.statusCode = 200;
                    res.setHeader('content-type', /*webServer.*/ getType(request.url));
                    res.end(file);
                }
            });
        } else if (req.method === 'POST') {
            // Make request with ajax form GUI to this route
            // This mechanic avoid using header Access-Controll-Al*low-Origin: *
            if (req.url === '/Request') {
                 // Make request to BUS here (use npm request)
                    /*
                     * example get request data with ajax (ajax always use POST method)
                     * data :JSON.stringify({
                     *      url: 'http://127.0.0.1:3001/GetAccountInfo?username=admin',
                     *      method: 'GET'
                     * })
                     * 
                     * example POST data
                     * data: {
                     *      url: 'http://127.0.0.1:3001/EditProduct',
                     *      method: 'POST',
                     *      form: {
                     *          productId: '12',
                     *          productName: 'Ryzen 7 2700x',
                     *          price: '9700000'
                     *      }
                     * }
                     */
                    let body = [];
                    req.on('data', chunk => {
                        body.push(chunk);
                    }).on('end', () => {
                        body = JSON.parse(Buffer.concat(body).toString());
                        for (let key in req.body) {
                            try {
                                req.body[key] = JSON.parse(req.body[key]);
                            } catch (e) {
                                
                            }
                        }
                        switch (body.type) {
                            case 'GET':
                                console.log('Make GET request with proxy --> ' + body.api);
                                requestNPM.get(body.api, (error, response, data) => {
                                    res.writeHeader(200, {'Content-Type': 'application/json'});
                                    res.end(data);
                                });
                            break;

                            case 'POST':
                                console.log('Make POST request with proxy --> ' + body.api);
                                var options = {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    form: body.param
                                };
                                requestNPM.post(body.api, options, (error, response, data) => {
                                    var headers = {
                                        'Content-Type': 'application/json'
                                    };
                                    if (response.headers['set-cookie'][0] !== undefined) {
                                        headers['Set-Cookie'] = response.headers['set-cookie'][0],
                                        headers['Access-Control-Allow-Credentials'] = 'true'
                                    }
                                    console.log(headers);
                                    res.writeHead(200, headers);
                                    res.end(data);
                                });
                            break;
                        }
                        
                    })
            }
        }
    });
    return app;
}
module.exports = {
    readFile: fs.readFile,
    getFileType: getFileType,
    getFileExtension: getFileExtension,
    setStaticFolder: setStatic,
    file: static.file,
    create
}