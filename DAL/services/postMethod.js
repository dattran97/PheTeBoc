const fs = require('fs');
const parser = require('xml2json');

var getMethod = require('./getMethod');

let { PROJECT_DIR } = require('../../config');
let userPath = PROJECT_DIR + '/Data/NhanVien.xml';
let cameraPath = PROJECT_DIR + '/Data/MayAnh.xml';
let billPath = PROJECT_DIR + '/Data/DonHang.xml';
let supplierPath = PROJECT_DIR + '/Data/NhaCungCap.xml';

let register = (params) => {
    return new Promise((resolve, reject) => {
        var users = fs.readFileSync(userPath, 'utf-8')
        let list = JSON.parse(parser.toJson(users)).DanhSachNhanVien.NhanVien;
        let lastId = parseInt(list[list.length - 1].id);
        var pos = users.lastIndexOf("</DanhSachNhanVien>");
        var xml = `\t<NhanVien id="${lastId + 1}" Email="${params.email}" Password="${params.password}" isManager="${params.isManager}"></NhanVien>\n</DanhSachNhanVien>`;
        console.log(xml);
        fs.open(userPath, "r+", function(error, fd) {
            if(error){
                reject({'error': error.message});
            }else{
                fs.writeSync(fd, xml, pos, "utf8");
                fs.close(fd); 
                let newData = getMethod.getListUser()
                console.log(newData);
                resolve(newData);
            }
        });
    });
};

module.exports = {
    register
}