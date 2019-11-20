chrome.storage.local.clear()


chrome.tabs.onHighlighted.addListener(function tabID(tab) {
  let requestTab = Number(tab.tabIds);
  let uniqueTabID="Tab"+requestTab
  var tabClickedTime = new Date();
  console.log(tabClickedTime)
  chrome.tabs.get(requestTab, function returnName(Tab) {
    let jsonTabData = {
        [uniqueTabID]: {
        tabID: requestTab,
        tabTitle: Tab.title,
        timeStampClick: tabClickedTime.toString()
      }};

    chrome.storage.local.set(jsonTabData);

  });

});
