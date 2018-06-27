
var http = require('http');
var config = require('./config/config');

exports.logOut = (req, res, token) => {
    var options = {
        host: config.host,
        port: config.port,
        path:'/logout',
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "accessToken":token
        }
    }
    var body = '';
    httpReq = http.get(options,function(response){
        response.on('data',function(chunk){
            body+=chunk;
        });
        response.on('error',function(){
            console.log('ERR: Can\'t POST logout');
            response.writeHead(404,{'Content-Type':'text/plain'});
            response.end('Request was not supported!');
            return;
        })
        response.on('end',function(){
            console.log('Logout success');
            response.writeHead(200,{'Content-Type':'application/json'});
            var res = JSON.parse(response);
            response.end(res.message);
        })
    });

    //Khong ket noi voi server
    httpReq.on('error',(response)=>{
        console.log("Can't connect to BUS Server")
    	response.writeHead(404, 'Not found')
	    response.end("404 NOT FOUND")
	    return;
    });
};

//Login 

exports.logIn = (req, res, token) => {
    var options = {
        host: config.host,
        port: config.port,
        path:'/login',
        method: 'POST',
        headers:{}
    }
}