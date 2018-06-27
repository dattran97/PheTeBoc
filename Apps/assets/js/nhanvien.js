$(document).ready(function () {
    //Autofocus after being toggled
    $('#newOrder').on('shown.bs.modal', function () {
        $('#tenKH').focus();
    })
    //Toggle modal for testing
    $('#newOrder').modal('toggle');
    //
});