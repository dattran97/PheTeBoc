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
        fs.open(userPath, "r+", function(error, fd) {
            if(error){
                reject({'error': error.message});
            }else{
                fs.writeSync(fd, xml, pos, "utf-8");
                fs.close(fd, function(err){
                    if (err) reject({'error': error.message});
                    let newData = getMethod.getListUser()
                    resolve(newData);
                })
            }
        });
    });
};

let addProduct = (params) => {
    return new Promise((resolve, reject) => {
        var prods = fs.readFileSync(cameraPath, 'utf-8')
        let list = JSON.parse(parser.toJson(prods)).DanhSachMayAnh.MayAnh;
        let lastId = parseInt(list[list.length - 1].id);
        var pos = prods.lastIndexOf("</DanhSachMayAnh>")
        var xml = `\t<MayAnh id='${lastId + 1}' Ten='${params.name}' DonGia='${params.price}' HinhAnh='${params.imgUrl}' MaNCC='${params.supId}' SoLuongTon='${params.amount}' SoLuongBan='0' />\n</DanhSachMayAnh>`;
        fs.open(cameraPath, "r+", function(error, fd) {
            if(error){
                reject({'error': error.message});
            }else{
                fs.writeSync(fd, xml, pos, "utf-8");
                fs.close(fd, function(err){
                    if (err) reject({'error': error.message});
                    resolve({'message': 'Add successfully'});
                });
            }
        });
    });
};

let addBill = (params) => {
    return new Promise((resolve, reject) => {
        var bills = fs.readFileSync(billPath, 'utf-8')
        let list = JSON.parse(parser.toJson(bills)).DanhSachDonHang.DonHang;
        let lastId = parseInt(list[list.length - 1].id);
        var pos = bills.lastIndexOf("</DanhSachDonHang>")
        var xml = `\t<DonHang id="${lastId + 1}" Ngay="${params.date}" TongTien="${params.billTotal}">\n\t\t<GioHang>\n`;
        for (let i = 0; i < params.cart.length; i++) {
            xml += `\t\t\t<MayAnh id='${params.cart[i].id}' Ten='${params.cart[i].name}' DonGia='${params.cart[i].price}' SoLuong='${params.cart[i].amount}' Tong='${params.cart[i].total}' />\n`;
        }
        xml += "\t\t</GioHang>\n\t</DonHang>\n</DanhSachDonHang>";
        fs.open(billPath, "r+", function(error, fd) {
            if(error){
                reject({'error': error.message});
            }else{
                fs.writeSync(fd, xml, pos, "utf-8");
                fs.close(fd, function(err){
                    if (err) reject({'error': error.message});
                    let newData = getMethod.getListBill()
                    resolve(newData);
                });
            }
        });
    });
};

let addSupplier = (params) => {
    return new Promise((resolve, reject) => {
        var sups = fs.readFileSync(supplierPath, 'utf-8')
        let list = JSON.parse(parser.toJson(sups)).DanhSachNhaCungCap.NhaCungCap;
        let lastId = parseInt(list[list.length - 1].id);
        var pos = sups.lastIndexOf("</DanhSachNhaCungCap>")
        var xml = `\t<NhaCungCap id='${lastId + 1}' Ten='${params.name}' DiaChi='${params.address}' SoDienThoai='${params.phone}' />\n</DanhSachNhaCungCap>`;
        fs.open(supplierPath, "r+", function(error, fd) {
            if(error){
                reject({'error': error.message});
            }else{
                fs.writeSync(fd, xml, pos, "utf-8");
                fs.close(fd, function(err){
                    if (err) reject({'error': error.message});
                    let newData = getMethod.getListSupplier()
                    resolve(newData);
                });
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