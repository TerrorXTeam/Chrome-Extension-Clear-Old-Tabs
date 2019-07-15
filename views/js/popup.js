//Generate HTML with clicked/opened tabs
//Calculate the last time the tab was open (current_time - last clicked/opened time)
//Initilize dataTables

chrome.runtime.sendMessage({ popupOpen: true }, function (response) {
  currentDate = new Date();
  tabsToClose = [];
  activeTabs = response;

  for (obj of response) {
    clickedTime = new Date(obj.LastClicked);
    deltaClickTime = currentDate.getTime() - clickedTime.getTime();
    $('#example tbody').append('<tr> <td id="checkBox"> </td> <td id="tabName">' + obj.TabName + '</td>' +
      '<td>' + msToTime(deltaClickTime) + '</td></tr>')
  };
  generateDataTable();


});

//Add to a list clicked rows from HTML table, which reperesent tabs that will be closed.

$('#example').on('click', 'tbody tr', function (e) {
  clickedTab = $(e.target).closest("td").next('td').text()
  if (tabsToClose.includes(clickedTab)) {
    indexTab = tabsToClose.indexOf(clickedTab)
    tabsToClose.splice(indexTab, 1)
  }
  else {
    tabsToClose.push(clickedTab)
  }
})


//Generating dataTables
//Configuring button function to close selected tabs
function generateDataTable() {
  table = $('#example').DataTable({
    columnDefs: [{
      orderable: false,
      className: 'select-checkbox',
      targets: 0,
    },
],
    select: {
      style: 'multi',
      selector: 'td:first-child'
    },
    searching: false,
    paging: false,
    info: false,
    ordering: false,
    autoWidth: false,
    dom: 'Bfrtip',
    buttons: [
      {
        text: 'Close Tabs',
        action: function () {
          closeTabs = []
          for (obj of activeTabs) {
            if (tabsToClose.includes(obj.TabName)) {
              closeTabs.push(obj.TabID)
            }
          }
          chrome.tabs.remove(closeTabs)
          $('.even.selected').addClass('strikeout')
          $('.odd.selected').addClass('strikeout')
        }
      }
    ]
  })
  table.buttons().containers().appendTo('body')
}



function formatDate(date) {

  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  var hh = date.getHours();
  var ss = date.getSeconds();
  if (dd < 10) { dd = '0' + dd }
  if (mm < 10) { mm = '0' + mm }
  date = yyyy + mm + dd;
  time = hh + ":" + ss;
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

  return hours + ":" + minutes + ":" + seconds;
}