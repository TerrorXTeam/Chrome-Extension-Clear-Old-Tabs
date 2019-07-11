$(document).ready(function() {
$('#example').DataTable( {
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0
    } ],
    select: {
        style:    'multi',
        selector: 'td:first-child'
    },
    dom: 'Bfrtip',
    buttons: [
       {
           text: 'My button',
           action: function(){
             console.log("SSSSS")
             //var x = document.getElementsByClassName('odd selected')
             var x = document.querySelectorAll('.odd.selected,.even.selected')
             console.log(x)
           }
           }
   ]
} )
});