const fs = require('fs');
const parser = require('xml2js');
var Cache = require('../cache');
var cacheData = Cache.CacheData;

login = (user) => {
  let { email, password } = user;
  
	return new Promise((resolve, reject) => {
    console.log(email)
    let user = cacheData.User().filter((user) => {
      console.log(user.Email)
      return user.Email === email && user.Password === password;
    });

    if (user.length < 1) reject({'error': 'Email or password is incorrect'})
    
    resolve(user[0])
	})
}

module.exports = {
  login
}