const fs = require('fs');
const parser = require('xml2js');
var getMethod = require('./getMethod')

login = (user) => {
  console.log(user);
  let { email, password } = user;
  
	return new Promise((resolve, reject) => {
    let users = getMethod.getListUser();
    let user = users.filter((user) => {
      return user.Email === email && user.Password === password;
    });

    if (user.length < 1) reject({'error': 'Email or password is incorrect'})
    resolve(user[0])
	})
}

module.exports = {
  login
}