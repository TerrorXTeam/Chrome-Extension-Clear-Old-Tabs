chrome.runtime.sendMessage({popupOpen: true}, function(response) {
    /* process response */
    console.log(response)
    for(obj of response){
      $('#example tbody').append('<tr> <td> </td> <td>'+obj.TabName+'</td></tr>')
      console.log(obj.TabName+" "+obj.LastClicked)
    };
    
  });


  $(document).ready(function (){
    var table = $('#example').DataTable({
       'columnDefs': [
          {
             'targets': 0,
             'checkboxes': {
                'selectRow': true
             }
          }
       ],
       'select': {
          'style': 'multi'
       },
       'order': [[1, 'asc']]
    });
 
 
    // Handle form submission event
    $('#frm-example').on('submit', function(e){
       var form = this;
 
       var rows_selected = table.column(0).checkboxes.selected();
 
       // Iterate over all selected checkboxes
       $.each(rows_selected, function(index, rowId){
          // Create a hidden element
          $(form).append(
              $('<input>')
                 .attr('type', 'hidden')
                 .attr('name', 'id[]')
                 .val(rowId)
          );
       });
    });
 });