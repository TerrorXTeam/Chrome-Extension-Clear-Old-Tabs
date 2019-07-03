
    chrome.runtime.sendMessage({popupOpen: true}, function(response) {
      /* process response */
      console.log(response)
      for(obj of response){
        $('#example tbody').append('<tr> <td> </td> <td>'+obj.TabName+'</td>'+
        '<td> </td> <td>'+obj.LastClicked+'</td></tr>')
        console.log(obj.TabName+" "+obj.LastClicked)
      };
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
         }
      });
    });