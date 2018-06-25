var Cache = require('./Cache');
const xml2js = require('xml2js');
const xmldom = require('xmldom');
var app = require('http');
const request = require('request')

var cacheData = Cache.CacheData;
var session = [];

class User {
    constructor() {
        console.log("UserHandle is created");
    }

    checkSession(id) {
        console.log(session);
        var obj = session.find((obj) => obj.Id === id);

        if (obj == null || obj == undefined) {
            return -1;
        }
        else {
            return obj.Role;
        }
    }

    GetAll() {
        return Data.User();
    }

    Auth(id, password) {
        return new Promise((resolve, reject) => {
            var result = false;
            if (this.checkSession(id) !== -1) {
                console.log('The user session had not been deleted yet');
                resolve(true);
            }
            else {
                xml2js.Parser().parseString(this.GetAll(), (err, result) => {
                    if (!err) {
                        var tmp = result.Danh_sach.Nhan_vien.find((member) => member.$.Id == id && member.$.Mat_khau == password)
                        if (tmp != null && tmp != undefined) {
                            var json = JSON.parse(`{"Id": "${tmp.$.Id}", "Role": ${tmp.$.Chuc_vu}}`);
                            session.push(json);
                            console.log('Log in successfully');
                            resolve(true);
                        }
                        else {
                            console.log('Log in unsuccessfully');
                            reject(Error('Invalid information'));
                        }
                    }
                    else {
                        console.log(`AuthERROR: ${err}`);
                        reject(Error(`AuthERROR: ${err}`));
                    }
                })
            }
            return result;
        });
    }

    async LogOut(body) {
        var json = JSON.parse(body);
        for (var i = 0; i < session.length; i++) {
            if (session[i].Id == json.UserId) {
                session.splice(i, 1);
                console.log('Log out successfully');
            }
        }
    }
}
