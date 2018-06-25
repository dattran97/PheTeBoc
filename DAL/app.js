var http = require('http');
var config = require('./config');

let getMethod = require('./services/getMethod');
let postMethod = require('./services/postMethod');

//create a server object:
http.createServer(function (req, res) {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		"Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
		'Access-Control-Allow-Headers': 'X-Requested-With',
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"
	};
	var url = req.url;
	var method = req.method;

	switch (method) {
		case 'GET':
			switch (url) {
				case '/':
					res.writeHead(200, headers);
					res.write('index');
					res.end();
					break
				case '/users':
					res.writeHeader(200, {'Content-Type': 'text/json'})
					var data = getMethods.getListUser();
					res.end(data);
				default: break
			}
			return
		case 'POST':
			body = '';
            req.on('data', chunk => {
				console.log(chunk);
                body += JSON.parse(chunk);
            });
			switch (url) {
				case '/login':
                    req.on('end', () => {
						console.log(body);
                        postMethod.login(body)
                        .then(data => {
							res.writeHeader(200, {'Content-Type': 'text/json'})
							res.write(JSON.stringify(data));
							res.end();
                        })
                        .catch(err => {
							res.writeHeader(400, {'Content-Type': 'text/json'})
							res.write(JSON.stringify(err));
							res.end();
                        })
                    });
                    break
				default: break
			}
			return
		default: break
	}

}).listen(config.port, err => {
    if (err != null) {
        console.log('Error: ', err);
    } else {
        console.log('Server is starting at port ' + config.port);
    }
}) 

