chrome.runtime.sendMessage({popupOpen: true}, function(response) {
    /* process response */
    console.log(response)
  });