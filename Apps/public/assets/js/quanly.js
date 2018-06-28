$(document).ready(function () {
    //Check Nhap ten SP
    $('#prodName').on('input',function(){
        var option = $('#datalistProd option[value="'+$(this).val()+'"');
        if(option.length){
            console.log('Option choosen: '+option.attr('id'));
        }
        else{
            console.log('User typed: '+$(this).val());
        }
    });
    //Check Nhap nha cung cap
    //Check
    $('#myModal').modal('toggle');
});
/*
Flow:
- Chọn tên mặt hàng có sẵn trong db -> Tự động set tất cả các thông tin còn lại của mặt hàng đó
hiển thị số lượng của mặt hàng đó đang tồn lại và ô "Số lượng nhập".

- ID sp sẽ tự cấp , trước mắt +1 so vs end() của list
- Tương tự đối với id NCC
*/