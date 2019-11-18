

tabsData=[];
chrome.tabs.onHighlighted.addListener(function tabID(tab) {
    
    let requestTab = Number(tab.tabIds)
    chrome.tabs.get(requestTab, function returnName(Tab) {
        let jsonTabData={ 'tabID': requestTab,
        'tabTitle': Tab.title,
        'timeStampClick': new Date() }

      tabsData.push(jsonTabData)
        chrome.storage.local.set(jsonTabData)
        // chrome.storage.local.set({ 'tabTitle': Tab.title })
        // chrome.storage.local.set({ 'timeStampClick': new Date() })


    })

    chrome.storage.local.get(null,function(data){
        console.log(data)
    })


})