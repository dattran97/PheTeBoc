const fs = require('fs');
const parser = require('xml2json');

let { PROJECT_DIR } = require('../../config');
let userPath = PROJECT_DIR + '/Data/NhanVien.xml';
let cameraPath = PROJECT_DIR + '/Data/MayAnh.xml';

let getListUser = () => {
    let data = parser.toJson(fs.readFileSync(userPath, 'utf-8'));
    return data
}

let getListProduct = () => {
    var data = parser.toJson(fs.readFileSync(cameraPath, 'utf-8'));
    return data
}

module.exports = {
    getListUser,
    getListProduct
}