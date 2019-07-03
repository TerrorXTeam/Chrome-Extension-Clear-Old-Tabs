
    chrome.runtime.sendMessage({popupOpen: true}, function(response) {
       currentDate= new Date()
      /* process response */
      console.log(response)
      for(obj of response){
         deltaClickTime=currentDate-obj.LastClicked;
        $('#example tbody').append('<tr> <td> </td> <td>'+obj.TabName+'</td>'+
        '<td> </td> <td>'+deltaClickTime+'</td></tr>')
        console.log(obj.TabName+" "+formatDate(obj.LastClicked)+"   "+ deltaClickTime);
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



    function formatDate(date){

      //var dd = date.getDate();
      var mm = date.getMonth()+1;
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var ss = date.getSeconds();
      if(dd<10) {dd='0'+dd}
      if(mm<10) {mm='0'+mm}
      date = yyyy+mm+dd;
      time=hh+ss;
      return time
   }