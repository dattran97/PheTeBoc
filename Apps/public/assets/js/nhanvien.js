$(document).ready(function () {
    // Storing data
    var DS_MatHang =[]
    var chosenProducts = []
    function item(id,quantity){
        this.id = id;
        this.quantity = quantity;
    }
    //Autofocus after being toggled
    $('#newOrder').on('shown.bs.modal', function () {
        $('#tenKH').focus();
    })
    //Toggle modal for testing
    $('#newOrder').modal('toggle');
    //
    $('.removeItem').on('click', function () {
        var tr = $(this).closest('tr');
        tr.remove();
    })
    $('#add2ProList').on('click',function(){
        var prod = $('#sel-prod').find(':selected');
        var quantity = $('#prod-quantity').find(':selected').attr('value');
        console.log(prod.attr('value') + '-' + quantity); //find value of selected item, a.k.a ID of product
    })
});