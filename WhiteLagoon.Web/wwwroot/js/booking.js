//var dataTable;

//$(document).ready(function () {
//    loadDataTable();

//});

//function loadDataTable() {
//    dataTable = $('#tblBooking').DataTable({
//        "ajax": {
//            url: '/booking/getall'
//        },
//        "columns": [
//            { data: 'id', width: "5%" },
//            { data: 'name', width: "5%" },
//            { data: 'phone', width: "5%" },
//            { data: 'email', width: "5%" },
//            { data: 'status ', width: "5%" },
//            { data: 'checkindate', width: "5%" },
//            { data: 'nights', width: "5%" },
//        ]
//    });
//}


//function loadDataTable(status) {
//    dataTable = $('#tblBookings').DataTable({
//        "ajax": {
//            url: '/booking/getall'
//        },
//        error: function (xhr, error, thrown) {
//            console.error('Error fetching data:', thrown);
//        },
//        "columns": [
//            { data: 'Id', "width": "5%" },
//            { data: 'Name', "width": "15%" },
//            { data: 'Phone', "width": "10%" },
//            { data: 'Email', "width": "15%" },
//            { data: 'Status', "width": "10%" },
//            { data: 'CheckInDate', "width": "10%" },
//            { data: 'Nights', "width": "10%" },
//        ]
//    });
//}

//let table = new DataTable('#tblBookings');

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    loadDataTable(status);    

});



function loadDataTable(status) {

    $('#tblBookings').DataTable({
        "ajax": {
            url: '/booking/getall?status=' + status
        },
        "columns": [
            { data: 'id', "width": "5%" },
            { data: 'name', "width": "15%" },
            { data: 'phone', "width": "10%" },
            { data: 'email', "width": "15%" },
            { data: 'status', "width": "10%" },
            { data: 'checkInDate', "width": "12%" },
            { data: 'nights', "width": "10%" },
            { data: 'totalCost', render: $.fn.dataTable.render.number(',', '.', 2), "width": "10%" },
            {
                data: 'id',
                "render": function (data) {
                    return `<div class="w-75 btn-group">
                        <a href="/booking/bookingDetails?bookingId=${data}" class="btn btn-outline-warning mx-2">
                            <i class="bi bi-pencil-square"></i> Details
                        </a>
                    </div>`
                }
            }
        ]
    });
}




