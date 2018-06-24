var http = require('http');

let nhanVien = require('../BUS/NhanVienBUS');


//create a server object:
http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' }); // http header
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
					return
				case '/users':
					res.writeHead(200, headers);
					res.write('get all user');
					res.end();
					return
			}

			return
		case 'POST':
			switch (url) {
				case '/':
					res.writeHead(200, headers);
					res.write('index pots');
					res.end();
					return
				case '/login':
					res.writeHead(200, headers);
					nhanVien.loginHandler(req, res);
					
					return
			}
			return
	}

}).listen(3000, function () {
	console.log("server start at port 3000"); //the server object listens on port 3000
}); 

