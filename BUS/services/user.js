const request = require('request');
var cache = require('../cache');
var cacheData = cache.CacheData;

let svURL = 'http://localhost:3001';
var sessions = [];

class User {
    constructor() {}
    //GET - /users
    list() {
        return cacheData.getListUser();
    }
    //POST - /login
    login(user) {
        let { email, password } = user;
        //Kiếm tra nếu tài khoản đã đăng nhập ở device khác thì xóa session
        this.deleteSession(email);

        return new Promise((resolve, reject) => {
            let users = JSON.parse(this.list()).NhanVien;
            let user = users.filter((user) => {
                return user.Email === email && user.Password === password;
            });
            //Không tìm thấy user
            if (user.length < 1) reject({'error': 'Email or password is incorrect'})
            //Lưu session và trả về user object
            let token = this.generateUserToken()
            var result = user[0]
            result['accessToken'] = token
            sessions.push(result);
            console.log(sessions);
            resolve(user[0]);
        })
    }

    //POST - /logout
    logout(token) {
        let user = this.getUserByToken(token);
        if (user !== -1) {
            sessions.splice(user, 1);
        }
        console.log(sessions);
    }

    //POST - /register
    register(params) {
        return new Promise((resolve, reject) => {
            //Kiểm tra email đã tồn tại chưa

            //Gọi API register
            var options = {
                uri: svURL + '/register',
                json: params,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(options, (err, res, body) => {
                if (err) {
                    return reject(err);
                }else{
                    cacheData.updateListUser(JSON.stringify(body));
                    return resolve({'message': 'Register successfully'});
                }
            });
        });
    }

    //Support functions
    generateUserToken() {
        var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var token = '';
        for (var i = 0; i < 64; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            token += charSet.substring(randomPoz,randomPoz+1);
        }
        return token;
    }

    getUserByToken(token) {
        let user = sessions.find((user) => user.accessToken === token);
        if (user != null || user != undefined){
            return -1;
        }
        return user;
    }

    checkSession(email) {
        let user = sessions.find((user) => user.email === email);
        if (user != null || user != undefined){
            return -1;
        }
        return user;
    }
    
    deleteSession(email) {
        let user = this.checkSession(email);
        if (user !== -1) {
            sessions.splice(user, 1);
        }
    }
}

module.exports = new User();