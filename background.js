console.log("bckg works");

//var tabsAndTimes = [];
var tabsAndTimes=LoadocalStorage();
console.log(tabsAndTimes);
chrome.tabs.query({}, function (tabs) {
    for (tab of tabs) {
        //console.log(tab.title)
    }
});


function SaveLocalStorage(tabsToSave){
    localStorage.setItem('TabStatus', JSON.stringify(tabsToSave));
   //console.log(tabsToSave)
}

function LoadocalStorage(){
    StoredData= localStorage.getItem('TabStatus');
 //   for (x of StoredData){
 //   console.log(x)
 //   }
    //console.log(StoredData)
    return JSON.parse(StoredData)
}

//Event listener which adds/updates an array of objects.
//Objects=dictionary with tabID,TabName,LastClicked time
chrome.tabs.onHighlighted.addListener(function tabID(tab) {
    testvar=LoadocalStorage()
    console.log(testvar);
    var reqTab = Number(tab.tabIds)
    chrome.tabs.get(reqTab, function returnName(Tab) {
        var tabTitle = Tab.title;
        var timeStampClick = new Date();
        for (timeStamps of tabsAndTimes) {
            if (reqTab === timeStamps["TabID"]) {
                timeStamps["TabName"] = tabTitle
                timeStamps["LastClicked"] = timeStampClick
                var STOP = "Yes"
            }
        }
        if (STOP != "Yes") {
            tabsAndTimes.push({
                TabID: reqTab,
                TabName: tabTitle,
                LastClicked: timeStampClick
            })
        }
        SaveLocalStorage(tabsAndTimes)
    })

})
//Event listener which removes objects from the tabsAndTimes array when a matching tab is closed
chrome.tabs.onRemoved.addListener(function XtabID(tabID) {
    for (var i = 0; i < tabsAndTimes.length; i++) {
        if (tabsAndTimes[i].TabID === tabID) {
            tabsAndTimes.splice(i, 1)
        }
    }
})


//Event listener which adds/change a tab when the URL is updated
chrome.tabs.onUpdated.addListener(function tabID(tab) {
    var reqTab = tab
    chrome.tabs.get(reqTab, function returnName(Tab) {
        var tabTitle = Tab.title;
        var timeStampClick = new Date();
        for (timeStamps of tabsAndTimes) {
            if (reqTab === timeStamps["TabID"]) {
                timeStamps["TabName"] = tabTitle
                timeStamps["LastClicked"] = timeStampClick
                var STOP = "Yes"
            }
        }
        if (STOP != "Yes") {
            tabsAndTimes.push({
                TabID: reqTab,
                TabName: tabTitle,
                LastClicked: timeStampClick
            })
        }

        SaveLocalStorage(tabsAndTimes)
    })
})








//Sorts objects in an array
function sortObjects(a, b) {
    const aClicked = a.LastClicked;
    const bClicked = b.LastClicked;

    let comparison = 0;
    if (aClicked > bClicked) {
        comparison = 1;
    }
    else if (aClicked < bClicked) {
        comparison = -1;
    }
    return comparison;
};




chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.popupOpen) {
        tabsAndTimes.sort(sortObjects)
        
        sendResponse(tabsAndTimes);
    }
});