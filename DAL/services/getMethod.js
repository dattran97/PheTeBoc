const fs = require('fs');
const parser = require('xml2json');

let { PROJECT_DIR } = require('../../config');
let userPath = PROJECT_DIR + '/Data/NhanVien.xml';
let cameraPath = PROJECT_DIR + '/Data/MayAnh.xml';
let billPath = PROJECT_DIR + '/Data/DonHang.xml';
let supplierPath = PROJECT_DIR + '/Data/NhaCungCap.xml';

let getListUser = () => {
    let temp = parser.toJson(fs.readFileSync(userPath, 'utf-8'));
    return JSON.stringify(JSON.parse(temp).DanhSachNhanVien);
}

let getListProduct = () => {
    let temp = parser.toJson(fs.readFileSync(cameraPath, 'utf-8'));
    return JSON.stringify(JSON.parse(temp).DanhSachMayAnh);
}

let getListBill = () => {
    let temp = parser.toJson(fs.readFileSync(billPath, 'utf-8'));
    return JSON.stringify(JSON.parse(temp).DanhSachDonHang);
}

let getListSupplier = () => {
    let temp = parser.toJson(fs.readFileSync(supplierPath, 'utf-8'));
    return JSON.stringify(JSON.parse(temp).DanhSachNhaCungCap);
}

module.exports = {
    getListUser,
    getListProduct,
    getListBill,
    getListSupplier
}