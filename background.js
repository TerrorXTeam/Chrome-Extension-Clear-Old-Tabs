console.log("bckg works");

var tabsAndTimes=[];

chrome.tabs.query({},function(tabs){
    for (tab of tabs){
        //console.log(tab.title)
    }
});

//Event listener which adds/updates an array of objects.
//Objects=dictionary with tabID,TabName,LastClicked time
chrome.tabs.onHighlighted.addListener(function tabID(tab){
    reqTab=Number(tab.tabIds)
    chrome.tabs.get(reqTab,function returnName(Tab){
       tabTitle=Tab.title;
       timeStampClick= new Date("YYYY-MM");
       for (timeStamps of tabsAndTimes){
       if(reqTab === timeStamps["TabID"]){
           timeStamps["TabName"]=tabTitle
           timeStamps["LastClicked"]=timeStampClick
           var STOP="Yes"
       }}
       if(STOP!="Yes"){
       tabsAndTimes.push({
            TabID:reqTab,
            TabName:tabTitle,
            LastClicked:timeStampClick
       })}
       console.log(tabsAndTimes)
    })

})
//Event listener which removes objects from the tabsAndTimes array when a matching tab is closed
chrome.tabs.onRemoved.addListener(function XtabID(tabID){
    for(var i=0; i<tabsAndTimes.length; i++){
        if (tabsAndTimes[i].TabID === tabID){
            tabsAndTimes.splice(i,1)
        }
    }
})

//Sorts objects in an array
function sortObjects(a,b){
    const aClicked=a.LastClicked;
    const bClicked=b.LastClicked;

    let comparison=0;
    if (aClicked > bClicked){
        comparison=1;
    }
    else if (aClicked < bClicked){
        comparison=-1;
    }
    return comparison;
};




chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.popupOpen) {
      tabsAndTimes.sort(sortObjects)
      console.log(tabsAndTimes)
      sendResponse(tabsAndTimes);
    }
  });