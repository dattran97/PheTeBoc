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
                console.log("Ghi User");
                fs.writeSync(fd, xml, pos, "utf8");
                fs.close(fd); 
                let newData = getMethod.getListUser()
                console.log(newData);
                resolve(newData);
            }
        });
    });
};

let addProduct = (params) => {
    return new Promise((resolve, reject) => {
        var prods = fs.readFileSync(cameraPath, 'UTF-8')
        console.log(prods)
        let list = JSON.parse(parser.toJson(prods)).DanhSachMayAnh.MayAnh;
        let lastId = parseInt(list[list.length - 1].id);
        var pos = prods.lastIndexOf("</DanhSachMayAnh>")
        console.log(pos);
        var xml = `\t<MayAnh id='${lastId + 1}' Ten='${params.name}' DonGia='${params.price}' HinhAnh='${params.imgUrl}' MaNCC='${params.supId}' SoLuongTon='${params.amount}' SoLuongBan='0'></MayAnh>\n</DanhSachMayAnh>`;
        console.log(xml);
        fs.open(cameraPath, "r+", function(error, fd) {
            if(error){
                reject({'error': error.message});
            }else{
                console.log("Ghi Product");
                fs.writeSync(fd, xml, pos, "utf8");
                fs.close(fd); 
                let newData = getMethod.getListProduct()
                console.log(newData);
                resolve(newData);
            }
        });
    });
};

let addBill = (params) => {
    return new Promise((resolve, reject) => {
        var sups = fs.readFileSync(supplierPath, 'UTF-8')
        console.log(sups)
        let list = JSON.parse(parser.toJson(bills)).DanhSachDonHang.DonHang;
        let lastId = parseInt(list[list.length - 1].id);
        var pos = sups.lastIndexOf("</DanhSachDonHang>")
        console.log(pos);
        var xml = `\t<DonHang id="${lastId + 1}" Ngay="${params.date}" TongTien="${params.billTotal}">\n\t\t<GioHang>\n`;
        console.log(xml);
        fs.open(supplierPath, "r+", function(error, fd) {
            if(error){
                reject({'error': error.message});
            }else{
                console.log("Ghi Supplier");
                fs.writeSync(fd, xml, pos, "utf8");
                fs.close(fd); 
                let newData = getMethod.getListSupplier()
                console.log(newData);
                resolve(newData);
            }
        });
    });
};

let addSupplier = (params) => {
    return new Promise((resolve, reject) => {
        var sups = fs.readFileSync(supplierPath, 'UTF-8')
        console.log(sups)
        let list = JSON.parse(parser.toJson(sups)).DanhSachNhaCungCap.NhaCungCap;
        let lastId = parseInt(list[list.length - 1].id);
        var pos = sups.lastIndexOf("</DanhSachNhaCungCap>")
        console.log(pos);
        var xml = `\t<NhaCungCap id='${lastId + 1}' Ten='${params.name}' DiaChi='${params.address}' SoDienThoai='${params.phone}'></NhaCungCap>\n</DanhSachNhaCungCap>`;
        console.log(xml);
        fs.open(supplierPath, "r+", function(error, fd) {
            if(error){
                reject({'error': error.message});
            }else{
                console.log("Ghi Product");
                fs.writeSync(fd, xml, pos, "utf8");
                fs.close(fd); 
                let newData = getMethod.getListSupplier()
                console.log(newData);
                resolve(newData);
            }
        });
    });
};

module.exports = {
    register,
    addProduct,
    addBill,
    addSupplier
}