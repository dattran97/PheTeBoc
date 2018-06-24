var fs = require('fs')
const parser = require('xml2json');

let { PROJECT_DIR } = require('../config');
let dataPath = PROJECT_DIR + '/Data/NhanVien.xml';

login = (user) => {
  let { email, password } = user;
  
	return new Promise((resolve, reject) => {
    let data = JSON.parse(parser.toJson(fs.readFileSync(dataPath, 'utf-8')));
    let users = data.DanhSachNhanVien.NhanVien;
    
    let user = users.filter((user) => {
      return user.Email === email && user.Password === password;
    });

    if (user.length < 1) reject({err: 'username or password in correct'})
    
    resolve(user[0])
	})
}

module.exports = {
  login
}