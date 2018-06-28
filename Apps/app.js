var webService = require('./webService');

app.listen(config.port, (err) => {
    if(err != null){
        console.log('ERROR' + err);
    }else {
        console.log('Server is starting at port '+ config.port);
    }
});