
//Clear local storage data when window is closed
chrome.windows.onRemoved.addListener(function Window(window) {
  chrome.storage.local.clear()
})

//When tab is selected update the tab stats stored in the local storage
chrome.tabs.onHighlighted.addListener(function tabID(tab) {
  let requestTab = Number(tab.tabIds);
  let uniqueTabID = "Tab" + requestTab
  var tabClickedTime = new Date();
  chrome.tabs.get(requestTab, function returnName(Tab) {
    let jsonTabData = {
      [uniqueTabID]: {
        tabID: requestTab,
        tabTitle: Tab.title,
        timeStampClick: tabClickedTime.toString()
      }
    };

    chrome.storage.local.set(jsonTabData);

  });

});

//When the tab is updated(html link is changed) update the tab stats stored in the local storage
chrome.tabs.onUpdated.addListener(function tabID(tab) {
  let requestTab = tab;
  let uniqueTabID = "Tab" + requestTab
  var tabClickedTime = new Date();
  chrome.tabs.get(requestTab, function returnName(Tab) {
    let jsonTabData = {
      [uniqueTabID]: {
        tabID: requestTab,
        tabTitle: Tab.title,
        timeStampClick: tabClickedTime.toString()
      }
    };

    chrome.storage.local.set(jsonTabData);

  });
})




