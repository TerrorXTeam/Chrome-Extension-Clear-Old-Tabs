
    chrome.runtime.sendMessage({popupOpen: true}, function(response) {
       currentDate= new Date();
      
       console.log("Curr Time is: "+currentDate)
      /* process response */
      console.log(response)
      for(obj of response){
         clickedTime= new Date(obj.LastClicked);
         deltaClickTime=currentDate.getTime()-clickedTime.getTime();
        $('#example tbody').append('<tr> <td> </td> <td>'+obj.TabName+'</td>'+
        '<td> </td> <td>'+msToTime(deltaClickTime)+'</td></tr>')
        console.log(msToTime(deltaClickTime));
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

      var dd = date.getDate();
      var mm = date.getMonth()+1;
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var ss = date.getSeconds();
      if(dd<10) {dd='0'+dd}
      if(mm<10) {mm='0'+mm}
      date = yyyy+mm+dd;
      time=hh+":"+ss;
      return time
   }


   function msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
    
      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }